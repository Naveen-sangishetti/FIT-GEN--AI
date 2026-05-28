import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Trash2, Calendar, Flame, Beef, Wheat, Droplet } from 'lucide-react';
import { useMealHistory } from '@/hooks/useMealHistory';
import { format } from 'date-fns';

const MealHistory = () => {
  const navigate = useNavigate();
  const { meals, isLoading, isAuthenticated, deleteMeal } = useMealHistory();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">Hill Calories AI</span>
              </div>
              <Button variant="ghost" onClick={() => navigate('/')}>
                ← Back to Home
              </Button>
            </div>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">Please sign in to view your meal history.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">Hill Calories AI</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/upload')}>
                Analyze New Meal
              </Button>
              <Button variant="ghost" onClick={() => navigate('/')}>
                ← Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Meal History</h1>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your meals...</p>
            </div>
          ) : meals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No meals tracked yet.</p>
                <Button onClick={() => navigate('/upload')}>Analyze Your First Meal</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {meals.map((meal) => (
                <Card key={meal.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(meal.created_at), 'PPp')}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteMeal(meal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Calories</p>
                          <p className="font-semibold">{Math.round(meal.total_calories)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Beef className="h-4 w-4 text-red-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Protein</p>
                          <p className="font-semibold">{meal.total_protein}g</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wheat className="h-4 w-4 text-amber-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Carbs</p>
                          <p className="font-semibold">{meal.total_carbs}g</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Fat</p>
                          <p className="font-semibold">{meal.total_fat}g</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {meal.food.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                        >
                          {item.name} ({item.quantity})
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealHistory;
