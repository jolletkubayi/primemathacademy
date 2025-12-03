import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, CheckCircle, XCircle, Shield, Loader2 } from "lucide-react";

interface SubscriptionWithProfile {
  id: string;
  user_id: string;
  status: string;
  plan_type: string | null;
  start_date: string | null;
  end_date: string | null;
  profile: {
    full_name: string | null;
    grade: string | null;
  } | null;
}

const AdminPanel = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      // Fetch all subscriptions
      const { data: subs, error: subsError } = await supabase
        .from("subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (subsError) throw subsError;

      // Fetch profiles for each subscription
      const subsWithProfiles = await Promise.all(
        (subs || []).map(async (sub) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, grade")
            .eq("user_id", sub.user_id)
            .maybeSingle();

          return {
            ...sub,
            profile,
          };
        })
      );

      setSubscriptions(subsWithProfiles);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast({
        title: "Error",
        description: "Failed to load subscriptions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (subscriptionId: string, newStatus: string) => {
    setUpdating(subscriptionId);
    try {
      const { error } = await supabase
        .from("subscriptions")
        .update({
          status: newStatus,
          start_date: newStatus === "active" ? new Date().toISOString() : null,
          end_date: newStatus === "active" 
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
            : null,
          plan_type: newStatus === "active" ? "monthly" : null,
        })
        .eq("id", subscriptionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Subscription ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
      });

      // Refresh data
      fetchSubscriptions();
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Loading subscriptions...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-muted-foreground">Manage user subscriptions</p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">User Subscriptions ({subscriptions.length})</span>
          </div>
        </div>

        <div className="divide-y divide-border">
          {subscriptions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No subscriptions found
            </div>
          ) : (
            subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      sub.status === "active" ? "bg-green-500" : "bg-muted-foreground"
                    }`}
                  />
                  <div>
                    <p className="font-medium">
                      {sub.profile?.full_name || "Unknown User"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sub.profile?.grade ? `Grade ${sub.profile.grade}` : "No grade set"} • 
                      Status: <span className={sub.status === "active" ? "text-green-600" : "text-muted-foreground"}>
                        {sub.status}
                      </span>
                    </p>
                    {sub.end_date && (
                      <p className="text-xs text-muted-foreground">
                        Expires: {new Date(sub.end_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {sub.status !== "active" ? (
                    <Button
                      size="sm"
                      onClick={() => updateSubscriptionStatus(sub.id, "active")}
                      disabled={updating === sub.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {updating === sub.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateSubscriptionStatus(sub.id, "inactive")}
                      disabled={updating === sub.id}
                    >
                      {updating === sub.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-1" />
                          Deactivate
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;