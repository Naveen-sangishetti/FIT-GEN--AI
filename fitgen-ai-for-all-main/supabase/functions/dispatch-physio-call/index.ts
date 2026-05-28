// Omnidimension outbound call dispatcher
// Triggers an AI agent call to a user-provided phone number.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const AGENT_ID = 3155;
const OMNIDIM_BASE = "https://backend.omnidim.io/api/v1";

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("OMNIDIMENSION_API_KEY");
    if (!apiKey) {
      return jsonResponse(
        {
          success: false,
          error: {
            error: "configuration_error",
            error_description: "OMNIDIMENSION_API_KEY is not configured",
          },
          fallback: true,
        },
        500,
      );
    }

    const url = new URL(req.url);

    if (req.method === "GET" && url.searchParams.get("debug") === "agents") {
      const response = await fetch(`${OMNIDIM_BASE}/agent/list`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      const text = await response.text();
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }

      return jsonResponse(
        {
          success: response.ok,
          status: response.status,
          data,
        },
        response.ok ? 200 : 200,
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawPhone = (body?.phone ?? "").toString().trim();

    let toNumber = rawPhone;
    const digits = rawPhone.replace(/\D/g, "");
    if (!toNumber.startsWith("+")) {
      if (digits.length === 10) toNumber = `+91${digits}`;
      else if (digits.length > 10) toNumber = `+${digits}`;
    }

    if (!/^\+\d{10,15}$/.test(toNumber)) {
      return jsonResponse(
        {
          success: false,
          error: {
            error: "invalid_phone_number",
            error_description: "Phone number must be in E.164 format.",
          },
          fallback: false,
        },
        400,
      );
    }

    console.log("Dispatching Omnidimension call", {
      agent_id: AGENT_ID,
      to_number: toNumber,
    });

    const omniRes = await fetch(`${OMNIDIM_BASE}/calls/dispatch`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: AGENT_ID,
        to_number: toNumber,
        call_context: {
          source: "fitgen_physio_lead_form",
          timestamp: new Date().toISOString(),
        },
      }),
    });

    const text = await omniRes.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!omniRes.ok) {
      console.error("Omnidimension dispatch failed", omniRes.status, data);
      return jsonResponse({
        success: false,
        status: omniRes.status,
        error: data,
        fallback: true,
        message: omniRes.status === 404
          ? "Agent not found or access denied. Check that the internal Omnidimension agent ID belongs to the same workspace as this API key."
          : "Omnidimension call dispatch failed.",
      });
    }

    console.log("Omnidimension dispatch success", data);
    return jsonResponse({ success: true, data });
  } catch (err) {
    console.error("dispatch-physio-call error", err);
    const message = err instanceof Error ? err.message : "Unknown error";

    return jsonResponse({
      success: false,
      error: {
        error: "service_failed",
        error_description: message,
      },
      fallback: true,
    });
  }
});
