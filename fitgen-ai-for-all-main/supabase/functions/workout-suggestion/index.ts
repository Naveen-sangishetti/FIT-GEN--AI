const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WorkoutSummary {
  exercise_type: string;
  duration: number;
  reps?: number | null;
  calories?: number | null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latest, recent } = await req.json() as {
      latest: WorkoutSummary;
      recent: WorkoutSummary[];
    };

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const summary = recent
      .slice(0, 7)
      .map((w) => `- ${w.exercise_type} for ${w.duration}min${w.reps ? `, ${w.reps} reps` : ""}${w.calories ? `, ${w.calories} kcal` : ""}`)
      .join("\n");

    const prompt = `The user just logged: ${latest.exercise_type} for ${latest.duration} minutes${latest.reps ? `, ${latest.reps} reps` : ""}${latest.calories ? `, ${latest.calories} kcal` : ""}.\n\nRecent activity:\n${summary || "(no prior workouts)"}\n\nGive 2-3 short, motivating tips: what to do next workout, recovery suggestion, or improvement focus. Keep it under 80 words, friendly, and specific.`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an encouraging fitness coach. Be concise, specific, and positive." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in workspace settings." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI gateway error:", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const suggestion = data.choices?.[0]?.message?.content ?? "Keep up the great work!";

    return new Response(JSON.stringify({ suggestion }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("workout-suggestion error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
