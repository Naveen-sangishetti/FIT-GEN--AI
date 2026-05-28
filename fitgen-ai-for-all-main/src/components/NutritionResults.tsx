import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Target, 
  Apple, 
  Droplets, 
  Scale,
  ChefHat,
  RotateCcw,
  Share2,
  Save,
  History,
  Check
} from 'lucide-react';
import { useMealHistory } from '@/hooks/useMealHistory';
import { useNavigate } from 'react-router-dom';

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionResults {
  status: string;
  food: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface NutritionResultsProps {
  results: NutritionResults;
  onStartOver: () => void;
}

const NutritionResults: React.FC<NutritionResultsProps> = ({ results, onStartOver }) => {
  const { total, food } = results;
  const { saveMeal, isAuthenticated } = useMealHistory();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const totalMacros = total.protein + total.carbs + total.fat;
  const proteinPercentage = (total.protein / totalMacros) * 100;
  const carbsPercentage = (total.carbs / totalMacros) * 100;
  const fatsPercentage = (total.fat / totalMacros) * 100;

  const handleSaveMeal = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setIsSaving(true);
    const success = await saveMeal(results);
    if (success) {
      setIsSaved(true);
    }
    setIsSaving(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="card-shadow border-border bg-card">
        <div className="p-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Zap className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Nutrition Analysis Complete</h2>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Target className="mr-1 h-3 w-3" />
              {food.length} Food Items Detected
            </Badge>
          </div>
        </div>
      </Card>

      {/* Total Calories Card */}
      <Card className="card-shadow border-border bg-card">
        <div className="p-8 text-center space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">Total Calories</h3>
          <div className="text-6xl font-bold text-primary">
            {total.calories}
          </div>
          <p className="text-muted-foreground">Complete meal analysis</p>
        </div>
      </Card>

      {/* Macronutrients Breakdown */}
      <Card className="card-shadow border-border bg-card">
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-center text-foreground">Macronutrient Breakdown</h3>
          
          <div className="space-y-4">
            {/* Protein */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-nutrition-protein"></div>
                  <span className="font-medium text-foreground">Protein</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{total.protein}g ({proteinPercentage.toFixed(0)}%)</span>
              </div>
              <Progress value={proteinPercentage} className="h-2" />
            </div>

            {/* Carbs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-nutrition-carbs"></div>
                  <span className="font-medium text-foreground">Carbohydrates</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{total.carbs}g ({carbsPercentage.toFixed(0)}%)</span>
              </div>
              <Progress value={carbsPercentage} className="h-2" />
            </div>

            {/* Fats */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-nutrition-fats"></div>
                  <span className="font-medium text-foreground">Fats</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{total.fat}g ({fatsPercentage.toFixed(0)}%)</span>
              </div>
              <Progress value={fatsPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Food Items Detail */}
      <Card className="card-shadow border-border bg-card">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Detected Food Items</h3>
          </div>
          
          <div className="grid gap-4">
            {food.map((item, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.quantity}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {item.calories} cal
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-nutrition-protein">{item.protein}g</div>
                    <div className="text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-nutrition-carbs">{item.carbs}g</div>
                    <div className="text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-nutrition-fats">{item.fat}g</div>
                    <div className="text-muted-foreground">Fat</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          onClick={onStartOver}
          variant="outline"
          size="lg"
          className="btn-secondary h-12 px-8 text-base font-medium"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Analyze Another
        </Button>
        
        <Button
          onClick={handleSaveMeal}
          variant="default"
          size="lg"
          className="btn-primary h-12 px-8 text-base font-medium"
          disabled={isSaved || isSaving}
        >
          {isSaved ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Saved
            </>
          ) : isSaving ? (
            "Saving..."
          ) : (
            <>
              <Save className="mr-2 h-5 w-5" />
              {isAuthenticated ? "Save to History" : "Sign In to Save"}
            </>
          )}
        </Button>

        {isAuthenticated && (
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base font-medium"
            onClick={() => navigate('/meal-history')}
          >
            <History className="mr-2 h-5 w-5" />
            View History
          </Button>
        )}
      </div>
    </div>
  );
};

export default NutritionResults;