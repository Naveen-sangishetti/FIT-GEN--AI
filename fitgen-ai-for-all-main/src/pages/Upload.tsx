import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PhotoUpload from '@/components/PhotoUpload';
import { Brain } from 'lucide-react';

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

const Upload = () => {
  const navigate = useNavigate();

  const handleAnalysisComplete = (results: NutritionData) => {
    navigate('/results', { state: { results } });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">Hill Calories AI</span>
            </div>
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="hover:bg-primary/10"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Upload Your Meal</h1>
            <p className="text-muted-foreground">
              Take a photo or upload an image for instant nutrition analysis
            </p>
          </div>

          <PhotoUpload onAnalysisComplete={handleAnalysisComplete} />
        </div>
      </div>
    </div>
  );
};

export default Upload;