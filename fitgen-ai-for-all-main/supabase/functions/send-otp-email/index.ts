import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type AnyRecord = Record<string, unknown>;

const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "(invalid-email)";
  const safeName = name.length <= 2 ? `${name[0]}*` : `${name.slice(0, 2)}***`;
  return `${safeName}@${domain}`;
};

const extractEmailAndOtp = (payload: AnyRecord) => {
  // Supported payload shapes (we accept multiple because auth email hooks can differ by provider):
  // 1) { email, otp }
  // 2) { email, token }
  // 3) { user: { email }, email_data: { token } }
  // 4) { user: { email }, email_data: { token_new } }
  const email =
    (typeof payload.email === "string" && payload.email) ||
    (typeof (payload.user as AnyRecord | undefined)?.email === "string" &&
      ((payload.user as AnyRecord).email as string)) ||
    "";

  const emailData = payload.email_data as AnyRecord | undefined;

  const otp =
    (typeof payload.otp === "string" && payload.otp) ||
    (typeof payload.token === "string" && payload.token) ||
    (typeof emailData?.token === "string" && (emailData.token as string)) ||
    (typeof emailData?.token_new === "string" && (emailData.token_new as string)) ||
    "";

  return { email, otp };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as AnyRecord;
    const { email, otp } = extractEmailAndOtp(payload);

    // Log minimal, non-sensitive info to help debug delivery without leaking OTPs.
    console.log("send-otp-email: received payload keys:", Object.keys(payload));
    if (payload.email_data && typeof payload.email_data === "object") {
      console.log(
        "send-otp-email: email_data keys:",
        Object.keys(payload.email_data as AnyRecord)
      );
    }
    console.log(
      "send-otp-email: extracted",
      JSON.stringify({
        email: email ? maskEmail(email) : "(missing)",
        otpLength: otp ? otp.length : 0,
      })
    );

    if (!email || !otp) {
      throw new Error(
        "Missing email/otp in request payload (check email hook payload format)."
      );
    }

    const emailResponse = await resend.emails.send({
      from: "FitLife <onboarding@resend.dev>",
      to: [email],
      subject: "Your One-Time Password (OTP)",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your OTP Code</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f7;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 480px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #8B5CF6, #6366F1); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 28px;">🔐</span>
                      </div>
                      <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #1f2937;">Your Verification Code</h1>
                      <p style="margin: 12px 0 0; font-size: 15px; color: #6b7280;">Use this code to complete your sign-in</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 20px 40px;">
                      <div style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border-radius: 12px; padding: 24px; text-align: center; border: 2px dashed #d1d5db;">
                        <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">One-Time Password</p>
                        <p style="margin: 0; font-size: 40px; font-weight: 800; letter-spacing: 8px; color: #1f2937; font-family: 'Courier New', monospace;">${otp}</p>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #6b7280; line-height: 1.6;">
                          <li>This code expires soon</li>
                          <li>Requesting a new code invalidates the previous one</li>
                          <li>Never share this code with anyone</li>
                        </ul>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="background-color: #f9fafb; border-radius: 0 0 16px 16px; padding: 24px 40px; text-align: center;">
                      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                        This is an automated message from FitLife.<br>
                        Please do not reply to this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("send-otp-email: resend accepted", {
      id: (emailResponse as any)?.data?.id,
      error: (emailResponse as any)?.error ?? null,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("send-otp-email: error", {
      message: error?.message ?? String(error),
    });

    return new Response(JSON.stringify({ error: error?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);

