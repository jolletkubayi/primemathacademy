import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Brain, Send, Upload, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NavLink } from "@/components/NavLink";
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  image_url?: string;
}

const Tutor = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      } else {
        setTimeout(() => {
          checkAccess(session.user.id);
        }, 0);
      }
    });

    return () => authSubscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkAccess = async (userId: string) => {
    try {
      const { data: subData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();
      
      setSubscription(subData);

      // Create or get existing chat session
      const { data: sessions } = await supabase
        .from("chat_sessions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (sessions && sessions.length > 0) {
        setSessionId(sessions[0].id);
        // Load messages
        const { data: msgs } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("session_id", sessions[0].id)
          .order("created_at", { ascending: true });
        
        if (msgs) {
          setMessages(msgs.map(m => ({
            id: m.id,
            role: m.role as "user" | "assistant" | "system",
            content: m.content,
            image_url: m.image_url || undefined
          })));
        }
      } else {
        // Create new session
        const { data: newSession } = await supabase
          .from("chat_sessions")
          .insert({ user_id: userId, title: "New Chat" })
          .select()
          .single();
        
        if (newSession) {
          setSessionId(newSession.id);
        }
      }
    } catch (error) {
      console.error("Error checking access:", error);
      toast({
        title: "Error",
        description: "Failed to load chat session",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !sessionId) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('math-problems')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('math-problems')
        .getPublicUrl(filePath);

      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content: "[Uploaded image for analysis]",
        image_url: publicUrl
      };

      setMessages(prev => [...prev, userMessage]);

      // Save to database
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage.content,
        image_url: publicUrl
      });

      // Send to AI for processing
      handleSendMessage(publicUrl);

    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSendMessage = async (imageUrl?: string) => {
    if ((!input.trim() && !imageUrl) || !user || !sessionId) return;

    // Check subscription
    if (subscription?.status !== "active") {
      toast({
        title: "Subscription Required",
        description: "Please activate your subscription to use the AI tutor.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = imageUrl 
      ? messages[messages.length - 1]
      : {
          id: uuidv4(),
          role: "user",
          content: input,
        };

    if (!imageUrl) {
      setMessages(prev => [...prev, userMessage]);
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: input,
      });
    }

    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-tutor', {
        body: { 
          messages: [...messages, userMessage],
          sessionId,
          imageUrl 
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.message,
      };

      setMessages(prev => [...prev, assistantMessage]);

      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: data.message,
      });

    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response from AI tutor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <NavLink to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </NavLink>
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-semibold">AI Maths Tutor</span>
            </div>
          </div>
          {subscription?.status !== "active" && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>Subscription Inactive</span>
            </div>
          )}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <Card className="p-12 text-center">
            <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Welcome to Your AI Maths Tutor</h2>
            <p className="text-muted-foreground mb-6">
              Upload a maths problem or ask a question to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Problem
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('message-input')?.focus()}>
                <Send className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
            </div>
          </Card>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card
              className={`max-w-[80%] p-4 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card"
              }`}
            >
              {message.image_url && (
                <img
                  src={message.image_url}
                  alt="Uploaded problem"
                  className="rounded-lg mb-2 max-w-full"
                />
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>
            </Card>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <Card className="p-4 bg-card">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-6">
        <div className="flex gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            disabled={loading || uploadingImage || subscription?.status !== "active"}
          >
            {uploadingImage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
          <Input
            id="message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask a maths question..."
            disabled={loading || subscription?.status !== "active"}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={loading || !input.trim() || subscription?.status !== "active"}
            className="bg-gradient-hero"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {subscription?.status !== "active" && (
          <p className="text-sm text-destructive mt-2 text-center">
            Please activate your subscription to use the AI tutor
          </p>
        )}
      </div>
    </div>
  );
};

export default Tutor;