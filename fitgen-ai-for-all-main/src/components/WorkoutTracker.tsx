import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dumbbell,
  Flame,
  Clock,
  Activity,
  Sparkles,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Workout = {
  id: string;
  name: string;
  phone: string | null;
  exercise_type: string;
  duration: number;
  reps: number | null;
  calories: number | null;
  date: string;
};

const workoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number"),
  exercise_type: z.string().min(1, "Pick an exercise type"),
  duration: z.coerce.number().int().min(1, "Duration must be > 0").max(1440),
  reps: z.coerce.number().int().min(0).max(10000).optional().or(z.literal("")),
  calories: z.coerce.number().int().min(0).max(20000).optional().or(z.literal("")),
});

const EXERCISE_TYPES = ["Pushups", "Squats", "Running", "Gym", "Custom"];

const formatDay = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short" });

export const WorkoutTracker = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    exercise_type: "",
    duration: "",
    reps: "",
    calories: "",
  });

  // Auth state
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
      setCheckingAuth(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Pre-fill name from profile
  useEffect(() => {
    if (!userId) return;
    supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.full_name) setForm((f) => ({ ...f, name: f.name || data.full_name! }));
      });
  }, [userId]);

  // Fetch workouts
  const fetchWorkouts = async (uid: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", uid)
      .order("date", { ascending: false })
      .limit(100);
    setLoading(false);
    if (error) {
      toast.error("Failed to load workouts");
      return;
    }
    setWorkouts((data as Workout[]) ?? []);
  };

  useEffect(() => {
    if (userId) fetchWorkouts(userId);
    else setWorkouts([]);
  }, [userId]);

  // Stats
  const stats = useMemo(() => {
    const totalWorkouts = workouts.length;
    const totalMinutes = workouts.reduce((s, w) => s + (w.duration || 0), 0);
    const totalCalories = workouts.reduce((s, w) => s + (w.calories || 0), 0);

    // Streak — consecutive days ending today/yesterday
    const days = new Set(
      workouts.map((w) => new Date(w.date).toISOString().slice(0, 10))
    );
    let streak = 0;
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    while (days.has(cursor.toISOString().slice(0, 10))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return { totalWorkouts, totalMinutes, totalCalories, streak };
  }, [workouts]);

  // 7-day chart
  const chartData = useMemo(() => {
    const out: { day: string; minutes: number; calories: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const dayWorkouts = workouts.filter(
        (w) => new Date(w.date).toISOString().slice(0, 10) === key
      );
      out.push({
        day: formatDay(d),
        minutes: dayWorkouts.reduce((s, w) => s + (w.duration || 0), 0),
        calories: dayWorkouts.reduce((s, w) => s + (w.calories || 0), 0),
      });
    }
    return out;
  }, [workouts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Please sign in to save workouts");
      navigate("/auth");
      return;
    }

    const parsed = workoutSchema.safeParse(form);
    if (!parsed.success) {
      const firstErr = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast.error(firstErr ?? "Please check the form");
      return;
    }

    setSubmitting(true);
    const v = parsed.data;
    const insertRow = {
      user_id: userId,
      name: v.name,
      phone: v.phone,
      exercise_type: v.exercise_type,
      duration: v.duration,
      reps: v.reps === "" || v.reps === undefined ? null : Number(v.reps),
      calories:
        v.calories === "" || v.calories === undefined ? null : Number(v.calories),
      date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("workouts")
      .insert(insertRow)
      .select()
      .single();
    setSubmitting(false);

    if (error) {
      console.error(error);
      toast.error("Could not save workout");
      return;
    }

    toast.success("Workout saved!");
    setForm((f) => ({
      ...f,
      exercise_type: "",
      duration: "",
      reps: "",
      calories: "",
    }));
    setWorkouts((prev) => [data as Workout, ...prev]);

    // Trigger AI suggestion
    setAiLoading(true);
    setAiSuggestion(null);
    try {
      const { data: aiData, error: aiErr } = await supabase.functions.invoke(
        "workout-suggestion",
        {
          body: {
            latest: insertRow,
            recent: [insertRow, ...workouts].slice(0, 7),
          },
        }
      );
      if (aiErr) throw aiErr;
      setAiSuggestion(aiData?.suggestion ?? null);
    } catch (err) {
      console.error(err);
      toast.error("AI tip unavailable right now");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <section
      id="start-tracking"
      className="container mx-auto px-6 py-20 relative z-10"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">
            Start Tracking
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          Log Your Workout
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track sessions, monitor progress, and get AI-powered tips after every
          workout.
        </p>
      </div>

      {!userId && !checkingAuth ? (
        <Card className="p-8 max-w-xl mx-auto text-center">
          <Dumbbell className="w-10 h-10 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Sign in to start tracking</h3>
          <p className="text-muted-foreground mb-6">
            Your workouts are private and tied to your account.
          </p>
          <Button onClick={() => navigate("/auth")}>Sign in</Button>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Form */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">New Workout</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wt-name">Name *</Label>
                  <Input
                    id="wt-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="wt-phone">Phone *</Label>
                  <Input
                    id="wt-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 555 123 4567"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Exercise Type *</Label>
                  <Select
                    value={form.exercise_type}
                    onValueChange={(v) =>
                      setForm({ ...form, exercise_type: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXERCISE_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="wt-duration">Duration (min) *</Label>
                  <Input
                    id="wt-duration"
                    type="number"
                    min={1}
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    placeholder="30"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wt-reps">Reps</Label>
                  <Input
                    id="wt-reps"
                    type="number"
                    min={0}
                    value={form.reps}
                    onChange={(e) => setForm({ ...form, reps: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label htmlFor="wt-cal">Calories Burned</Label>
                  <Input
                    id="wt-cal"
                    type="number"
                    min={0}
                    value={form.calories}
                    onChange={(e) =>
                      setForm({ ...form, calories: e.target.value })
                    }
                    placeholder="Optional"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full"
                size="lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Workout"
                )}
              </Button>
            </form>

            {(aiLoading || aiSuggestion) && (
              <div className="mt-6 p-4 rounded-lg border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                  <Sparkles className="w-4 h-4" />
                  AI Coach Tip
                </div>
                {aiLoading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating personalized advice...
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{aiSuggestion}</p>
                )}
              </div>
            )}
          </Card>

          {/* Dashboard */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Total Workouts
                  </span>
                  <Dumbbell className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold mt-1">
                  {stats.totalWorkouts}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Total Minutes
                  </span>
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold mt-1">
                  {stats.totalMinutes}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Calories
                  </span>
                  <Flame className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold mt-1">
                  {stats.totalCalories}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Day Streak
                  </span>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold mt-1">{stats.streak}🔥</div>
              </Card>
            </div>

            <Card className="p-4">
              <h4 className="text-sm font-semibold mb-3">Last 7 Days</h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11 }}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      className="text-muted-foreground"
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="minutes"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="text-sm font-semibold mb-3">Recent Workouts</h4>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading...</div>
              ) : workouts.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No workouts yet. Log your first one!
                </div>
              ) : (
                <ul className="space-y-2 max-h-52 overflow-y-auto">
                  {workouts.slice(0, 8).map((w) => (
                    <li
                      key={w.id}
                      className="flex items-center justify-between p-2 rounded-md bg-muted/40 text-sm"
                    >
                      <div>
                        <div className="font-medium">{w.exercise_type}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(w.date).toLocaleDateString()} •{" "}
                          {w.duration} min
                          {w.reps ? ` • ${w.reps} reps` : ""}
                        </div>
                      </div>
                      {w.calories ? (
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <Flame className="w-3 h-3" />
                          {w.calories}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      )}
    </section>
  );
};
