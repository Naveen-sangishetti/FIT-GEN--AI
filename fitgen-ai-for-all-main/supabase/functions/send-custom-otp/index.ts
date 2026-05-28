import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate a cryptographically secure random 6-digit OTP
function generateOTP(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return ((array[0] % 900000) + 100000).toString();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SendOtpRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: SendOtpRequest = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedEmail.length > 255 || !EMAIL_REGEX.test(normalizedEmail)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    console.log(`Generating OTP for email: ${normalizedEmail.substring(0, 3)}***`);

    // Generate unique OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Delete any existing OTPs for this email
    await supabase
      .from("otp_codes")
      .delete()
      .eq("email", normalizedEmail);

    // Insert new OTP
    const { error: insertError } = await supabase
      .from("otp_codes")
      .insert({
        email: normalizedEmail,
        otp_code: otp,
        expires_at: expiresAt.toISOString(),
        verified: false
      });

    if (insertError) {
      console.error("Error inserting OTP:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to generate OTP" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`OTP generated successfully, sending email...`);

    // Send email with OTP
    const emailResponse = await resend.emails.send({
      from: "GymFuel <onboarding@resend.dev>",
      to: [normalizedEmail],
      subject: "Your Login Code - GymFuel",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f0f0f; margin: 0; padding: 40px 20px;">
          <div style="max-width: 400px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border-radius: 16px; padding: 40px; border: 1px solid #333;">
            <h1 style="color: #00ff88; font-size: 24px; margin: 0 0 10px 0; text-align: center;">GymFuel</h1>
            <p style="color: #888; font-size: 14px; margin: 0 0 30px 0; text-align: center;">Your Fitness Journey Starts Here</p>

            <p style="color: #fff; font-size: 16px; margin: 0 0 20px 0; text-align: center;">Your login code is:</p>

            <div style="background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
              <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #000;">${otp}</span>
            </div>

            <p style="color: #888; font-size: 13px; text-align: center; margin: 0 0 10px 0;">This code expires in 10 minutes.</p>
            <p style="color: #666; font-size: 12px; text-align: center; margin: 0;">If you didn't request this code, please ignore this email.</p>
          </div>
        </body>
        </html>
      `,
    });

    if ((emailResponse as any)?.error) {
      console.error("Email send failed:", (emailResponse as any).error);

      // Clean up stored OTP so users can't try to verify a code they never received
      await supabase.from("otp_codes").delete().eq("email", normalizedEmail);

      return new Response(
        JSON.stringify({
          error:
            "Failed to send OTP email. If you're using a testing email sender, you may need to verify a sending domain before sending to other recipients.",
        }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Email sent successfully:", (emailResponse as any)?.data ?? emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-custom-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
