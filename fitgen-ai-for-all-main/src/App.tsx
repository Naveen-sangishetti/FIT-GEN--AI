import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor } from "@/components/CustomCursor";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import FoodPlanner from "./pages/FoodPlanner";
import FoodResults from "./pages/FoodResults";
import Exercises from "./pages/Exercises";
import PhysioAI from "./pages/PhysioAI";
import ProfileSettings from "./pages/ProfileSettings";
import Auth from "./pages/Auth";
import MealHistory from "./pages/MealHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/results" element={<Results />} />
          <Route path="/food-planner" element={<FoodPlanner />} />
          <Route path="/food-results" element={<FoodResults />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/physio-ai" element={<ProtectedRoute><PhysioAI /></ProtectedRoute>} />
          <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
          <Route path="/meal-history" element={<ProtectedRoute><MealHistory /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
