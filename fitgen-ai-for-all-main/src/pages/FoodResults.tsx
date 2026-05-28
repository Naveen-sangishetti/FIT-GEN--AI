import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Brain, ArrowLeft, Calculator, Target, Utensils, Clock, Droplet, Zap, Bell, BellOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UserData {
  age: string;
  height: string;
  weight: string;
  gender: string;
  activityLevel: string;
  fitnessGoal: string;
  calorieAdjustment: string;
  bmi: string;
  bmicategory: string;
  bmr: number;
  tdee: number;
  targetCalories: number;
}

const FoodResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.data as UserData;
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  const handleBackToPlanner = () => {
    navigate('/food-planner');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Calculate creatine recommendation based on BMI
  const getCreatineRecommendation = () => {
    const bmi = parseFloat(userData.bmi);
    const weight = parseFloat(userData.weight);
    
    let dailyDose = '3-5g'; // Standard maintenance dose
    let loadingPhase = false;
    
    if (userData.bmicategory === 'Underweight' || userData.fitnessGoal.includes('muscle gain')) {
      dailyDose = '5g';
      loadingPhase = true;
    } else if (userData.bmicategory === 'Normal' && userData.fitnessGoal.includes('maintenance')) {
      dailyDose = '3-5g';
    } else {
      dailyDose = '3g';
    }
    
    return {
      dailyDose,
      loadingPhase,
      loadingDose: loadingPhase ? '20g (5g × 4 times daily for 5-7 days)' : null,
      timing: 'Post-workout or with a meal',
      benefits: [
        'Increases muscle strength and power output',
        'Enhances muscle mass growth',
        'Improves high-intensity exercise performance',
        'Supports faster recovery between sets'
      ]
    };
  };

  // Calculate water intake based on weight-specific formula
  const getWaterRecommendation = () => {
    const weight = parseFloat(userData.weight);
    const bmi = parseFloat(userData.bmi);
    
    // Base water intake: 30-35ml per kg of body weight
    let baseWater = weight * 0.033; // 33ml per kg (liters)
    
    // Additional water for creatine supplementation (+500-1000ml)
    const creatineExtra = 0.75; // 750ml extra for creatine
    
    // Adjust for BMI and activity level
    let activityMultiplier = 1.0;
    if (userData.fitnessGoal.includes('muscle gain') || userData.fitnessGoal.includes('fat loss')) {
      activityMultiplier = 1.3; // Higher activity level
    } else {
      activityMultiplier = 1.15; // Moderate activity level
    }
    
    const totalWater = (baseWater * activityMultiplier) + creatineExtra;
    
    // Calculate hourly intake (assuming 14 waking hours)
    const hourlyIntake = totalWater / 14;
    
    return {
      totalDaily: totalWater.toFixed(1),
      baseAmount: (baseWater * activityMultiplier).toFixed(1),
      creatineExtra: creatineExtra.toFixed(1),
      hourlyIntake: (hourlyIntake * 1000).toFixed(0), // Convert to ml
      glassesPerDay: Math.ceil(totalWater / 0.25), // Assuming 250ml glasses
      tips: [
        `Drink ${(hourlyIntake * 1000).toFixed(0)}ml every hour during waking hours`,
        'Start your day with 500ml of water upon waking',
        'Drink 500ml before, during, and after workouts',
        'Monitor urine color - aim for pale yellow',
        'Increase intake during hot weather or intense exercise'
      ]
    };
  };

  const creatineRec = getCreatineRecommendation();
  const waterRec = getWaterRecommendation();

  const handleToggleReminders = (enabled: boolean) => {
    setRemindersEnabled(enabled);
    if (enabled) {
      toast({
        title: "Water Reminders Activated! 💧",
        description: `You'll be reminded to drink ${waterRec.hourlyIntake}ml every hour.`,
      });
    } else {
      toast({
        title: "Reminders Paused",
        description: "Water intake reminders have been turned off.",
      });
    }
  };

  // Redirect if no data
  if (!userData) {
    navigate('/food-planner');
    return null;
  }

  // Enhanced meal generation based on target calories
  const getMealPlan = () => {
    const targetCal = userData.targetCalories;
    const goal = userData.fitnessGoal;

    // Calculate macro targets based on target calories
    // Muscle building: 30% protein, 40% carbs, 30% fat
    const proteinCal = targetCal * 0.30;
    const carbsCal = targetCal * 0.40;
    const fatCal = targetCal * 0.30;
    
    const proteinGrams = Math.round(proteinCal / 4);
    const carbsGrams = Math.round(carbsCal / 4);
    const fatGrams = Math.round(fatCal / 9);

    // Enhanced meal suggestions based on BMI category and budget
    const getMealsByCategory = () => {
      if (goal === 'muscle_gain' || goal === 'lean_gain') {
        return {
          breakfast: "Protein pancakes with whey (35g), oats (50g), banana, topped with nuts and maple syrup (750 cal, 45g protein, 70g carbs, 28g fat)",
          lunch: "Grilled chicken (200g) with quinoa (70g dry), roasted vegetables and avocado (750 cal, 55g protein, 60g carbs, 25g fat)",
          dinner: "Salmon fillet (200g) with quinoa (70g dry), roasted vegetables and butter (800 cal, 50g protein, 60g carbs, 32g fat)",
          snacks: "Greek yogurt (150g) with nuts (35g), honey, and protein bar (550 cal, 35g protein, 45g carbs, 25g fat)"
        };
      } else if (goal === 'fat_loss') {
        return {
          breakfast: "Greek yogurt (200g) with berries, chia seeds + 3 boiled eggs (450 cal, 38g protein, 30g carbs, 18g fat)",
          lunch: "Grilled fish (200g) with steamed vegetables, brown rice (50g dry) and avocado (1/2) (550 cal, 50g protein, 40g carbs, 18g fat)",
          dinner: "Grilled salmon (180g) with roasted vegetables and cauliflower rice (500 cal, 48g protein, 25g carbs, 22g fat)",
          snacks: "Protein shake (30g whey) with berries and walnuts (15g) (280 cal, 32g protein, 18g carbs, 10g fat)"
        };
      } else { // maintenance
        return {
          breakfast: "Oats (70g) with milk, banana, peanut butter (2 tbsp) and 2 eggs (550 cal, 28g protein, 60g carbs, 22g fat)",
          lunch: "Chicken breast (180g) with rice (80g dry), vegetables and olive oil (650 cal, 48g protein, 65g carbs, 15g fat)",
          dinner: "Grilled chicken thigh (200g) with brown rice (60g dry), mixed salad and olive oil (700 cal, 48g protein, 55g carbs, 25g fat)",
          snacks: "Mixed nuts (35g), apple, and milk (250ml) (400 cal, 15g protein, 35g carbs, 22g fat)"
        };
      }
    };

    const meals = getMealsByCategory();
    
    return { 
      ...meals, 
      totalCalories: targetCal.toLocaleString(), 
      totalProtein: `${proteinGrams}g`, 
      totalCarbs: `${carbsGrams}g`, 
      totalFat: `${fatGrams}g` 
    };
  };

  const mealPlan = getMealPlan();

  const getRecommendations = () => {
    if (userData.bmicategory === 'Underweight') {
      return [
        "Focus on calorie-dense foods like nuts, seeds, and healthy oils",
        "Increase meal frequency - eat 5-6 smaller meals throughout the day",
        "Add protein shakes between meals for muscle building"
      ];
    } else if (userData.bmicategory === 'Overweight' || userData.bmicategory === 'Obese') {
      return [
        "Prioritize lean proteins and reduce refined carbohydrates",
        "Include more fiber-rich vegetables to feel full with fewer calories",
        "Stay hydrated and consider intermittent fasting"
      ];
    } else {
      return [
        "Maintain current calorie intake while focusing on muscle building",
        "Time protein intake around workouts for optimal recovery",
        "Balance macros: 40% carbs, 30% protein, 30% healthy fats"
      ];
    }
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
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleBackToPlanner}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Planner
              </Button>
              <Button
                variant="outline"
                onClick={handleBackToHome}
                className="hover:bg-primary/10"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Your Personalized Nutrition Plan</h1>
            <p className="text-muted-foreground">Based on your body metrics and fitness goals</p>
          </div>

          {/* User Stats */}
          <Card className="p-6 bg-card border-border">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <Calculator className="h-6 w-6 mx-auto text-primary" />
                <div className="text-2xl font-bold text-foreground">{userData.bmi}</div>
                <div className="text-sm text-muted-foreground">BMI</div>
                <Badge variant={userData.bmicategory === 'Normal' ? 'default' : 'secondary'}>
                  {userData.bmicategory}
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <Target className="h-6 w-6 mx-auto text-primary" />
                <div className="text-lg font-semibold text-foreground">Goal</div>
                <div className="text-sm text-muted-foreground capitalize">{userData.fitnessGoal.replace('_', ' ')}</div>
              </div>
              <div className="text-center space-y-2">
                <Utensils className="h-6 w-6 mx-auto text-primary" />
                <div className="text-lg font-semibold text-foreground">{mealPlan.totalCalories}</div>
                <div className="text-sm text-muted-foreground">Daily Calories</div>
              </div>
            </div>
          </Card>

          {/* Calorie Calculation Breakdown */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              How Your Calories Were Calculated
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-foreground">{userData.bmr}</div>
                <div className="text-sm text-muted-foreground">BMR (Basal Metabolic Rate)</div>
                <p className="text-xs text-muted-foreground mt-1">Calories burned at rest</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-foreground">{userData.tdee}</div>
                <div className="text-sm text-muted-foreground">TDEE (Total Daily Energy)</div>
                <p className="text-xs text-muted-foreground mt-1">BMR × activity multiplier</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg text-center border border-primary/20">
                <div className="text-2xl font-bold text-primary">{userData.targetCalories}</div>
                <div className="text-sm text-muted-foreground">Target Calories</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {userData.calorieAdjustment}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Formula:</strong> Mifflin–St Jeor Equation • 
              <strong> Activity:</strong> {userData.activityLevel} • 
              <strong> Gender:</strong> {userData.gender}
            </p>
          </Card>

          {/* Meal Plan */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Utensils className="h-6 w-6" />
              Daily Meal Plan
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Breakfast
                  </h3>
                  <p className="text-muted-foreground">{mealPlan.breakfast}</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Lunch
                  </h3>
                  <p className="text-muted-foreground">{mealPlan.lunch}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Dinner
                  </h3>
                  <p className="text-muted-foreground">{mealPlan.dinner}</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Snacks
                  </h3>
                  <p className="text-muted-foreground">{mealPlan.snacks}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-primary/5 to-nutrition-protein/5 rounded-lg border border-primary/10">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-foreground animate-scale-in">{mealPlan.totalCalories}</div>
                  <div className="text-sm text-muted-foreground">Daily Calories</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-nutrition-protein animate-scale-in" style={{animationDelay: '0.1s'}}>{mealPlan.totalProtein}</div>
                  <div className="text-sm text-muted-foreground">Total Protein</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-nutrition-carbs animate-scale-in" style={{animationDelay: '0.2s'}}>{mealPlan.totalCarbs}</div>
                  <div className="text-sm text-muted-foreground">Total Carbs</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-nutrition-fat animate-scale-in" style={{animationDelay: '0.3s'}}>{mealPlan.totalFat}</div>
                  <div className="text-sm text-muted-foreground">Total Fat</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Hydration & Supplementation */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Water Intake Card */}
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Droplet className="h-6 w-6 text-blue-500" />
                    Daily Hydration
                  </h2>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {waterRec.totalDaily}L
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-blue-600">{waterRec.totalDaily}L</div>
                        <div className="text-sm text-muted-foreground">Total Daily</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-600">{waterRec.hourlyIntake}ml</div>
                        <div className="text-sm text-muted-foreground">Per Hour</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base water (weight-based)</span>
                      <span className="font-semibold text-foreground">{waterRec.baseAmount}L</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Creatine supplementation</span>
                      <span className="font-semibold text-foreground">+{waterRec.creatineExtra}L</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-border pt-2">
                      <span className="text-muted-foreground">Glasses per day (250ml)</span>
                      <span className="font-semibold text-foreground">{waterRec.glassesPerDay} glasses</span>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/50 rounded-lg border border-accent">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="reminders" className="text-sm font-semibold flex items-center gap-2">
                        {remindersEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                        Hourly Reminders
                      </Label>
                      <Switch
                        id="reminders"
                        checked={remindersEnabled}
                        onCheckedChange={handleToggleReminders}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {remindersEnabled 
                        ? `Drink ${waterRec.hourlyIntake}ml every hour during waking hours`
                        : 'Turn on to receive hydration reminders'
                      }
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-foreground">Hydration Tips:</h3>
                    {waterRec.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Droplet className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Creatine Recommendation Card */}
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Zap className="h-6 w-6 text-amber-500" />
                    Creatine Protocol
                  </h2>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {creatineRec.dailyDose}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-amber-600">{creatineRec.dailyDose}</div>
                      <div className="text-sm text-muted-foreground">Daily Maintenance Dose</div>
                      {creatineRec.loadingPhase && (
                        <Badge variant="secondary" className="mt-2">
                          Loading Phase Recommended
                        </Badge>
                      )}
                    </div>
                  </div>

                  {creatineRec.loadingPhase && (
                    <div className="p-3 bg-accent/50 rounded-lg border border-accent">
                      <h3 className="font-semibold text-sm text-foreground mb-1">Loading Phase (Optional):</h3>
                      <p className="text-sm text-muted-foreground">{creatineRec.loadingDose}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Then continue with {creatineRec.dailyDose} daily
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Best timing</span>
                      <span className="font-semibold text-foreground">{creatineRec.timing}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Form</span>
                      <span className="font-semibold text-foreground">Creatine Monohydrate</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mix with</span>
                      <span className="font-semibold text-foreground">Water or juice</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-foreground">Key Benefits:</h3>
                    {creatineRec.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Zap className="h-3 w-3 text-amber-500 mt-1 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 mt-3">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Important:</strong> Increase water intake to {waterRec.totalDaily}L daily when using creatine to support optimal absorption and prevent dehydration.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Personalized Recommendations
            </h2>
            
            <div className="space-y-3">
              {getRecommendations().map((rec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleBackToPlanner}
              className="btn-primary h-12 px-8"
            >
              Create New Plan
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleBackToHome}
              className="h-12 px-8"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodResults;