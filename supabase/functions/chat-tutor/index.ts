import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are SAMaths AI Tutor, an expert mathematics tutor for South African Grade 10, 11, and 12 students following the CAPS curriculum.

Your responsibilities:
1. Analyze uploaded math problems and provide step-by-step solutions
2. Generate topic notes aligned with CAPS curriculum
3. Create personalized learning paths
4. Provide friendly, patient tutoring support

When solving problems:
- Restate the question clearly
- Identify the topic, grade, and difficulty
- Provide numbered, step-by-step solutions
- Give a concept summary
- List common mistakes
- Provide a practice question with hints

For exams or tests:
- Only provide hints and methods, not complete solutions
- Focus on teaching the approach

Be encouraging, adapt to the student's level, and keep explanations simple and clear.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId, imageUrl } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    console.log("Processing chat request for session:", sessionId);

    // Prepare messages for AI
    const aiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: any) => {
        if (m.image_url) {
          return {
            role: m.role,
            content: [
              { type: "text", text: m.content },
              { type: "image_url", image_url: { url: m.image_url } }
            ]
          };
        }
        return { role: m.role, content: m.content };
      })
    ];

    // Call Lovable AI Gateway with vision-capable model
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: aiMessages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error("AI Gateway request failed");
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    console.log("Successfully generated response for session:", sessionId);

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in chat-tutor function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});