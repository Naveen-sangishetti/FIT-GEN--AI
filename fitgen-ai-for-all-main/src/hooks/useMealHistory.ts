import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionData {
  status: string;
  food: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface MealHistoryItem {
  id: string;
  food: FoodItem[];
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  image_url: string | null;
  created_at: string;
}

export const useMealHistory = () => {
  const [meals, setMeals] = useState<MealHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
      if (user) {
        fetchMeals();
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserId(session?.user?.id || null);
      if (session?.user) {
        fetchMeals();
      } else {
        setMeals([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchMeals = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('meal_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const formattedMeals = (data || []).map(meal => ({
        ...meal,
        food: meal.food as unknown as FoodItem[]
      }));
      
      setMeals(formattedMeals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMeal = async (nutritionData: NutritionData, imageUrl?: string) => {
    if (!userId) {
      return false;
    }

    try {
      const { error } = await supabase.from('meal_history').insert([{
        user_id: userId,
        food: JSON.parse(JSON.stringify(nutritionData.food)),
        total_calories: Math.round(nutritionData.total.calories),
        total_protein: nutritionData.total.protein,
        total_carbs: nutritionData.total.carbs,
        total_fat: nutritionData.total.fat,
        image_url: imageUrl || null
      }]);

      if (error) throw error;

      toast({
        title: "Meal Saved",
        description: "Your meal has been added to your history.",
      });

      fetchMeals();
      return true;
    } catch (error) {
      console.error('Error saving meal:', error);
      toast({
        title: "Save Failed",
        description: "Could not save meal to history.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteMeal = async (mealId: string) => {
    try {
      const { error } = await supabase
        .from('meal_history')
        .delete()
        .eq('id', mealId);

      if (error) throw error;

      toast({
        title: "Meal Deleted",
        description: "Meal removed from history.",
      });

      setMeals(prev => prev.filter(m => m.id !== mealId));
      return true;
    } catch (error) {
      console.error('Error deleting meal:', error);
      return false;
    }
  };

  return {
    meals,
    isLoading,
    isAuthenticated: !!userId,
    saveMeal,
    deleteMeal,
    refetch: fetchMeals
  };
};
