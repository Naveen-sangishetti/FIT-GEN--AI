import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Home, Activity, Heart, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
  data?: PhysioResponse;
};

type PhysioResponse = {
  status: string;
  injury: {
    location: string;
    pain_level: number;
    type: string;
  };
  warmups: Array<{
    name: string;
    description: string;
    reps?: string;
    duration?: string;
  }>;
  rehab: Array<{
    name: string;
    hold?: string;
    reps?: number;
    sets: number;
  }>;
  remedies: string[];
  dos_and_donts: {
    do: string[];
    dont: string[];
  };
  return_to_play: {
    phase_1: string;
    phase_2: string;
    phase_3: string;
    phase_4: string;
  };
};

const PhysioAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm PhysioAI, your friendly Fitness coach. I'm here to help with Fitnees and workouts , and athletic performance. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getPhysioResponse = async (userMessage: Message) => {
    try {
      const { data, error } = await supabase.functions.invoke("physio-chat", {
        body: { message: userMessage.content },
      });

      if (error) throw error;

      // n8n typically returns either an array [{ output: {...} }] or a plain object
      const payload = Array.isArray(data) ? data[0]?.output ?? data[0] : data?.output ?? data;

      if (payload && (payload.status === "success" || payload.injury)) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Here's your personalized physiotherapy plan:",
          data: payload as PhysioResponse,
        }]);
      } else if (typeof payload === "string") {
        setMessages(prev => [...prev, { role: "assistant", content: payload }]);
      } else if (payload?.message || payload?.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: payload.message ?? payload.reply }]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error getting response:", error);
      toast.error("Failed to get response. Please try again.");
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I couldn't process your request. Please try again."
      }]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await getPhysioResponse(userMessage);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-4xl mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Fitness Coach</h1>
              <p className="text-sm text-muted-foreground">Your Fitness Coach Assistant</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <Card className="flex-1 mb-4 overflow-hidden">
          <ScrollArea className="h-full p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {message.data && (
                    <div className="mt-3 ml-11 space-y-4">
                      {/* Injury Info */}
                      <Card className="p-4 bg-card border-l-4 border-l-destructive">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">Injury Assessment</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p><span className="font-medium">Location:</span> {message.data.injury.location}</p>
                              <p><span className="font-medium">Type:</span> {message.data.injury.type}</p>
                              <p><span className="font-medium">Pain Level:</span> {message.data.injury.pain_level}/10</p>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Warm-ups */}
                      <Card className="p-4 bg-card">
                        <div className="flex items-start gap-3">
                          <Activity className="w-5 h-5 text-primary mt-0.5" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-2">Warm-up Exercises</h3>
                            <div className="space-y-3">
                              {message.data.warmups.map((warmup, i) => (
                                <div key={i} className="text-sm">
                                  <p className="font-medium text-foreground">{warmup.name}</p>
                                  <p className="text-muted-foreground">{warmup.description}</p>
                                  <p className="text-xs text-primary mt-1">
                                    {warmup.reps && `${warmup.reps}`}
                                    {warmup.duration && `${warmup.duration}`}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Rehab Exercises */}
                      <Card className="p-4 bg-card">
                        <div className="flex items-start gap-3">
                          <Heart className="w-5 h-5 text-primary mt-0.5" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-2">Rehabilitation Exercises</h3>
                            <div className="space-y-3">
                              {message.data.rehab.map((exercise, i) => (
                                <div key={i} className="text-sm">
                                  <p className="font-medium text-foreground">{exercise.name}</p>
                                  <p className="text-xs text-primary mt-1">
                                    {exercise.hold && `Hold: ${exercise.hold}`}
                                    {exercise.reps && ` • Reps: ${exercise.reps}`}
                                    {` • Sets: ${exercise.sets}`}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Remedies */}
                      <Card className="p-4 bg-card">
                        <h3 className="font-semibold text-foreground mb-2">Remedies</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {message.data.remedies.map((remedy, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{remedy}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>

                      {/* Do's and Don'ts */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 bg-card border-l-4 border-l-green-500">
                          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Do
                          </h3>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {message.data.dos_and_donts.do.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </Card>
                        <Card className="p-4 bg-card border-l-4 border-l-destructive">
                          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-destructive" />
                            Don't
                          </h3>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {message.data.dos_and_donts.dont.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </Card>
                      </div>

                      {/* Return to Play */}
                      <Card className="p-4 bg-card">
                        <h3 className="font-semibold text-foreground mb-2">Return to Play Plan</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <span className="font-medium text-primary">Phase 1:</span>
                            <span className="text-muted-foreground">{message.data.return_to_play.phase_1}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-medium text-primary">Phase 2:</span>
                            <span className="text-muted-foreground">{message.data.return_to_play.phase_2}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-medium text-primary">Phase 3:</span>
                            <span className="text-muted-foreground">{message.data.return_to_play.phase_3}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-medium text-primary">Phase 4:</span>
                            <span className="text-muted-foreground">{message.data.return_to_play.phase_4}</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your pain or ask for exercise advice..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhysioAI;
