import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Calculator, User, Ruler, Weight, ArrowLeft, Activity, Target } from 'lucide-react';

const FoodPlanner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    activityLevel: 'moderate',
    fitnessGoal: 'muscle_gain'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.age || !formData.height || !formData.weight) {
      alert('Please fill in all fields');
      return;
    }

    // Calculate BMI
    const heightInMeters = parseFloat(formData.height) / 100;
    const weight = parseFloat(formData.weight);
    const age = parseFloat(formData.age);
    const heightCm = parseFloat(formData.height);
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let bmicategory = '';
    
    if (bmi < 18.5) {
      bmicategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      bmicategory = 'Normal';
    } else if (bmi >= 25 && bmi < 30) {
      bmicategory = 'Overweight';
    } else {
      bmicategory = 'Obese';
    }

    const fitnessGoal = formData.fitnessGoal;

    // Calculate BMR using Mifflin–St Jeor Equation
    let bmr: number;
    if (formData.gender === 'male') {
      bmr = (10 * weight) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * heightCm) - (5 * age) - 161;
    }

    // Activity multipliers for TDEE
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[formData.activityLevel];

    // Calculate target calories based on user-selected fitness goal
    let targetCalories: number;
    let calorieAdjustment: string;
    if (fitnessGoal === 'muscle_gain') {
      targetCalories = tdee * 1.20; // 20% surplus
      calorieAdjustment = 'TDEE + 20% surplus';
    } else if (fitnessGoal === 'lean_gain') {
      targetCalories = tdee * 1.10; // 10% surplus
      calorieAdjustment = 'TDEE + 10% surplus';
    } else if (fitnessGoal === 'fat_loss') {
      targetCalories = tdee * 0.80; // 20% deficit
      calorieAdjustment = 'TDEE - 20% deficit';
    } else {
      targetCalories = tdee; // maintenance
      calorieAdjustment = 'TDEE (maintenance)';
    }

    // Apply safety floors
    const minCalories = formData.gender === 'male' ? 1500 : 1200;
    targetCalories = Math.max(targetCalories, minCalories);

    // Round to nearest 50
    targetCalories = Math.round(targetCalories / 50) * 50;

    const analysisData = {
      ...formData,
      bmi: bmi.toFixed(1),
      bmicategory,
      fitnessGoal,
      calorieAdjustment,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories)
    };

    navigate('/food-results', { state: { data: analysisData } });
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
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Personalized Gym Nutrition Planner
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about yourself to get customized meal recommendations that fit your budget and goals
            </p>
          </div>

          {/* Form */}
          <Card className="card-shadow border-border bg-card p-8 relative z-10 pointer-events-auto">
            <form onSubmit={handleSubmit} className="space-y-6 pointer-events-auto">
              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Age (years)
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  min="16"
                  max="80"
                  required
                  className="pointer-events-auto relative z-10"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Gender
                </Label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger className="pointer-events-auto relative z-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="pointer-events-auto z-[100] bg-popover">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Height */}
              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height in centimeters"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  min="120"
                  max="250"
                  required
                  className="pointer-events-auto relative z-10"
                />
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Weight className="h-4 w-4" />
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight in kilograms"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  min="30"
                  max="200"
                  step="0.1"
                  required
                  className="pointer-events-auto relative z-10"
                />
              </div>

              {/* Activity Level */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Activity Level
                </Label>
                <Select 
                  value={formData.activityLevel} 
                  onValueChange={(value) => handleInputChange('activityLevel', value)}
                >
                  <SelectTrigger className="pointer-events-auto relative z-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="pointer-events-auto z-[100] bg-popover">
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                    <SelectItem value="veryActive">Very Active (2x/day or physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fitness Goal */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Fitness Goal
                </Label>
                <Select 
                  value={formData.fitnessGoal} 
                  onValueChange={(value) => handleInputChange('fitnessGoal', value)}
                >
                  <SelectTrigger className="pointer-events-auto relative z-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="pointer-events-auto z-[100] bg-popover">
                    <SelectItem value="muscle_gain">Muscle Gain (20% calorie surplus)</SelectItem>
                    <SelectItem value="lean_gain">Lean Muscle Gain (10% calorie surplus)</SelectItem>
                    <SelectItem value="maintenance">Maintenance (maintain current weight)</SelectItem>
                    <SelectItem value="fat_loss">Fat Loss (20% calorie deficit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full btn-primary h-12 text-base font-medium hover-scale transition-smooth"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Generate My Nutrition Plan
              </Button>
            </form>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Card className="p-4 text-center space-y-2 bg-card border-border">
              <Calculator className="h-6 w-6 mx-auto text-primary" />
              <h3 className="font-medium text-foreground">BMI & TDEE Analysis</h3>
              <p className="text-sm text-muted-foreground">Scientific calorie calculation</p>
            </Card>
            <Card className="p-4 text-center space-y-2 bg-card border-border">
              <Activity className="h-6 w-6 mx-auto text-primary" />
              <h3 className="font-medium text-foreground">Activity Based</h3>
              <p className="text-sm text-muted-foreground">Personalized to your lifestyle</p>
            </Card>
            <Card className="p-4 text-center space-y-2 bg-card border-border">
              <Brain className="h-6 w-6 mx-auto text-primary" />
              <h3 className="font-medium text-foreground">AI Powered</h3>
              <p className="text-sm text-muted-foreground">Smart nutrition recommendations</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPlanner;