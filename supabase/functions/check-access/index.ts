import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, deviceId, deviceName } = await req.json();

    if (!userId || !deviceId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check subscription status
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!subscription || subscription.status !== "active") {
      return new Response(
        JSON.stringify({
          allowed: false,
          reason: "subscription_inactive",
          message: "Your subscription is not active. Please renew your plan to continue.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check device access - get all devices for this user
    const { data: devices } = await supabase
      .from("devices")
      .select("*")
      .eq("user_id", userId);

    // Find active device
    const activeDevice = devices?.find(d => d.is_active);

    // If this is the same device, update last_active and allow
    if (activeDevice?.device_id === deviceId) {
      await supabase
        .from("devices")
        .update({ last_active: new Date().toISOString() })
        .eq("id", activeDevice.id);

      return new Response(
        JSON.stringify({
          allowed: true,
          message: "Access granted",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If there's a different active device, deny access
    if (activeDevice && activeDevice.device_id !== deviceId) {
      return new Response(
        JSON.stringify({
          allowed: false,
          reason: "device_conflict",
          message: "Your account is currently active on another device. Only one device may be online at the same time.",
          activeDevice: activeDevice.device_name,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // No active device, or first time - activate this device
    // First, deactivate all other devices
    if (devices && devices.length > 0) {
      await supabase
        .from("devices")
        .update({ is_active: false })
        .eq("user_id", userId);
    }

    // Check if device record exists
    const existingDevice = devices?.find(d => d.device_id === deviceId);
    
    if (existingDevice) {
      // Update existing device
      await supabase
        .from("devices")
        .update({ 
          is_active: true, 
          last_active: new Date().toISOString(),
          device_name: deviceName 
        })
        .eq("id", existingDevice.id);
    } else {
      // Create new device record
      await supabase
        .from("devices")
        .insert({
          user_id: userId,
          device_id: deviceId,
          device_name: deviceName,
          is_active: true,
          last_active: new Date().toISOString(),
        });
    }

    return new Response(
      JSON.stringify({
        allowed: true,
        message: "Device activated successfully",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in check-access function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});