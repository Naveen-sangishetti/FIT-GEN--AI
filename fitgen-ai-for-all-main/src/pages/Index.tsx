import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KineticText, GlowText } from '@/components/KineticText';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Brain, Zap, Clock, Target, Camera, TrendingUp, Users, CheckCircle, ChefHat, Sparkles, BarChart3, Utensils, Activity, Dumbbell, Flame, Heart } from 'lucide-react';
import heroImage from '@/assets/gym-food-hero.jpg';
import heroGym from '@/assets/hero-gym.jpg';
import gymNutritionAnimation from '@/assets/gym-nutrition-animation.jpg';
import mealPrepAnimation from '@/assets/meal-prep-animation.jpg';
import nutritionAnalysis from '@/assets/nutrition-analysis.jpg';
import animatedGymHero from '@/assets/animated-gym-hero.jpg';
import animatedMealPrep from '@/assets/animated-meal-prep.jpg';
import animatedNutritionScan from '@/assets/animated-nutrition-scan.jpg';
import smartGymHero from '@/assets/smart-gym-hero.jpg';
import aiNutrition from '@/assets/ai-nutrition.jpg';
import workoutAnalytics from '@/assets/workout-analytics.jpg';
import smartEquipment from '@/assets/smart-equipment.jpg';
import { GlassmorphicCard } from '@/components/GlassmorphicCard';
import { DataVisualization, CircularMetric } from '@/components/DataVisualization';
import { ScrollReveal, AlternatingReveal } from '@/components/ScrollReveal';
import { UserProfile } from '@/components/UserProfile';
import { PhoneCollectionSection } from '@/components/PhoneCollectionSection';
import { LogoTicker } from '@/components/LogoTicker';
import { StaggeredMenu, type StaggeredMenuItem } from '@/components/StaggeredMenu';
import { WorkoutTracker } from '@/components/WorkoutTracker';

const Index = () => {
  const navigate = useNavigate();
  const [activeHeroTab, setActiveHeroTab] = useState('analysis');
  const handleStartAnalysis = () => {
    navigate('/upload');
  };
  const handleFoodPlanner = () => {
    navigate('/food-planner');
  };

  const menuItems: StaggeredMenuItem[] = [
    { label: 'Home', ariaLabel: 'Go to homepage', link: '/' },
    { label: 'Analyze Meal', ariaLabel: 'Analyze a meal photo', link: '/upload' },
    { label: 'Food Planner', ariaLabel: 'Open the food planner', link: '/food-planner' },
    { label: 'Exercises', ariaLabel: 'Browse exercises', link: '/exercises' },
    { label: 'Physio AI', ariaLabel: 'Talk to Physio AI', link: '/physio-ai' },
    { label: 'Meal History', ariaLabel: 'View your meal history', link: '/meal-history' },
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'YouTube', link: 'https://youtube.com' },
  ];

  return <div className="min-h-screen bg-background relative z-10">
      {/* Sticky utility bar (brand + profile) */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md relative z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-protein rounded-lg flex items-center justify-center animate-pulse-glow">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <KineticText text="Hill Calories AI" animation="fadeUp" className="text-xl font-semibold text-foreground hover-glow" />
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex futuristic-btn">
                <Zap className="mr-1 h-3 w-3" />
                Powered by AI
              </Badge>
              <UserProfile />
            </div>
          </div>
        </div>
      </header>

      {/* GSAP Staggered Navigation Overlay */}
      <StaggeredMenu
        isFixed
        position="right"
        items={menuItems}
        socialItems={socialItems}
        accentColor="#3b82f6"
        colors={['#0a0a0a', '#1a1a1b', '#ffffff']}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#0a0a0a"
        logo={null}
        onItemClick={(item) => navigate(item.link)}
      />

      {/* Modern Hero Section with Interactive Cards */}
      <section className="hero-bg min-h-screen flex items-center py-12 sm:py-20 relative overflow-hidden z-10">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroGym}
            alt="Athlete training in modern gym with motivational discipline builds freedom sign"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Overlay Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/95" />
          {/* Neon Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(hsl(220, 100%, 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0, 100%, 50%) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'pulse 4s ease-in-out infinite'
          }} />
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary to-protein rounded-full animate-float" style={{
          animationDelay: '0s'
        }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-carbs to-fats rounded-full animate-float" style={{
          animationDelay: '1s'
        }} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-tr from-primary/30 to-protein/30 rounded-full animate-float" style={{
          animationDelay: '2s'
        }} />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Top Badge */}
            <div className="text-center mb-8 animate-bounce-in">
              <Badge className="futuristic-btn bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 animate-glow-intense">
                <Dumbbell className="mr-2 h-4 w-4 animate-wiggle" />
                
              </Badge>
            </div>

            {/* Main Hero Title */}
            <div className="text-center mb-12">
              <KineticText text="Unlock Your Ultimate Physique" animation="zoomIn" className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-down">
                  <GlowText className="gradient-text">FitGen AI</GlowText>
                  <br />
                  <span className="text-foreground animate-shimmer">Your Body,Your Fuel,Your AI</span>
                </h1>
              </KineticText>
              
              {/* Stats Counter */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-8 stagger-fade">
                <div className="text-center card-3d">
                  <div className="text-3xl font-bold text-primary data-glow animate-scale-up">
                    
                  </div>
                  
                </div>
                <div className="text-center card-3d">
                  <div className="text-3xl font-bold text-protein data-glow animate-scale-up">
                    <AnimatedCounter end={24} suffix="/7" delay={1000} />
                  </div>
                  <p className="text-sm text-muted-foreground">Access</p>
                </div>
                
              </div>
            </div>

            {/* Interactive Hero Cards */}
            

            {/* Central Stats Dashboard */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up" style={{
            animationDelay: '0.6s'
          }}>
              
              <div className="text-center space-y-2 animate-bounce-in interactive-card p-4 rounded-xl card-3d" style={{
              animationDelay: '1s'
            }}>
                <div className="text-3xl font-bold text-foreground data-glow">
                  
                </div>
                
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Partner / Trust Logo Ticker */}
      <LogoTicker />

      {/* Clean Features Section */}
      <AlternatingReveal index={0}>
        <section className="py-20 sm:py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Why Choose Hill Calories AI?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Advanced AI technology meets intuitive design for the ultimate nutrition tracking experience
              </p>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-shadow border-border bg-card p-6 space-y-4 hover:elevated-shadow transition-smooth hover-scale animate-fade-in" style={{
              animationDelay: '0.1s'
            }}>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get comprehensive nutrition analysis in under 2 seconds with our optimized AI engine.
              </p>
            </Card>

            <Card className="card-shadow border-border bg-card p-6 space-y-4 hover:elevated-shadow transition-smooth hover-scale animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Highly Accurate</h3>
              <p className="text-muted-foreground leading-relaxed">
                85%+ accuracy in nutritional analysis with advanced computer vision and machine learning.
              </p>
            </Card>

            <Card className="card-shadow border-border bg-card p-6 space-y-4 hover:elevated-shadow transition-smooth hover-scale animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
              <div className="w-12 h-12 bg-nutrition-protein rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Detailed Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete macro breakdown, ingredient detection, and portion size estimation.
              </p>
            </Card>
          </div>
        </div>
      </section>
      </AlternatingReveal>

      {/* Stats Section - Count-up on scroll */}
      <section className="py-20 sm:py-28 relative overflow-hidden border-y border-border/50 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-14 sm:mb-20">
              <Badge variant="secondary" className="mb-4">
                <BarChart3 className="w-4 h-4 mr-2" />
                By the Numbers
              </Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Trusted by a <GlowText>Growing Community</GlowText>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Real impact, measured in real time.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            <ScrollReveal direction="up" delay={0}>
              <div className="text-center space-y-3">
                <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">
                  <AnimatedCounter end={50000} suffix="+" duration={2200} />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground font-medium uppercase tracking-wider">
                  Meals Analyzed
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              <div className="text-center space-y-3">
                <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-br from-protein to-carbs bg-clip-text text-transparent">
                  <AnimatedCounter end={98} suffix="%" duration={2200} delay={150} />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground font-medium uppercase tracking-wider">
                  Accuracy Rate
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="text-center space-y-3">
                <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-br from-carbs to-fats bg-clip-text text-transparent">
                  <AnimatedCounter end={12000} suffix="+" duration={2200} delay={300} />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground font-medium uppercase tracking-wider">
                  Active Users
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.45}>
              <div className="text-center space-y-3">
                <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-br from-fats to-primary bg-clip-text text-transparent">
                  <AnimatedCounter end={24} suffix="/7" duration={2000} delay={450} />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground font-medium uppercase tracking-wider">
                  AI Coaching
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Clean How It Works */}
      <AlternatingReveal index={1}>
      <section className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden">
        {/* Animated Gym Equipment Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-[10%] w-20 h-20 animate-float" style={{
            animationDelay: '0s'
          }}>
            <Dumbbell className="w-full h-full text-primary" />
          </div>
          <div className="absolute top-40 right-[15%] w-16 h-16 animate-float" style={{
            animationDelay: '1.5s'
          }}>
            <Activity className="w-full h-full text-protein" />
          </div>
          <div className="absolute bottom-32 left-[20%] w-24 h-24 animate-float" style={{
            animationDelay: '3s'
          }}>
            <Target className="w-full h-full text-carbs" />
          </div>
          <div className="absolute top-1/2 right-[25%] w-18 h-18 animate-float" style={{
            animationDelay: '2s'
          }}>
            <Flame className="w-full h-full text-fats" />
          </div>
          <div className="absolute bottom-40 right-[10%] w-20 h-20 animate-float" style={{
            animationDelay: '4s'
          }}>
            <Dumbbell className="w-full h-full text-primary rotate-45" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Three simple steps to unlock your meal's nutritional profile
              </p>
            </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4 animate-slide-in-right" style={{
              animationDelay: '0.1s'
            }}>
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground hover-scale transition-smooth">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Take a Photo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Snap a picture of your meal using your device's camera or upload an existing image.
              </p>
            </div>

            <div className="text-center space-y-4 animate-slide-in-right" style={{
              animationDelay: '0.2s'
            }}>
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground hover-scale transition-smooth">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our advanced AI processes your image to identify ingredients and calculate nutrition.
              </p>
            </div>

            <div className="text-center space-y-4 animate-slide-in-right" style={{
              animationDelay: '0.3s'
            }}>
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground hover-scale transition-smooth">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive detailed nutritional breakdown with calories, macros, and portion information.
              </p>
            </div>
          </div>
        </div>
      </section>
      </AlternatingReveal>

      {/* Enhanced Food Suggestion Section */}
      <AlternatingReveal index={2}>
        <section className="py-20 sm:py-32 bg-muted/20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full animate-pulse" style={{
            animationDelay: '0s'
          }} />
          <div className="absolute top-40 right-20 w-24 h-24 bg-nutrition-protein rounded-full animate-pulse" style={{
            animationDelay: '1s'
          }} />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-nutrition-carbs rounded-full animate-pulse" style={{
            animationDelay: '2s'
          }} />
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-nutrition-fat rounded-full animate-pulse" style={{
            animationDelay: '3s'
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 animate-scale-in">
              <TrendingUp className="mr-2 h-3 w-3" />
              Personalized Nutrition Plans
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground animate-fade-in" style={{
              animationDelay: '0.1s'
            }}>
              Personalized Gym Nutrition Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
              Get customized meal recommendations based on your body metrics, fitness goals, and budget
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Content Side */}
            <div className="space-y-8 animate-slide-in-right" style={{
              animationDelay: '0.3s'
            }}>
              <Card className="card-shadow border-border bg-card p-8 hover:elevated-shadow transition-smooth hover-scale">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center space-y-3 animate-fade-in" style={{
                    animationDelay: '0.4s'
                  }}>
                    <div className="w-14 h-14 bg-nutrition-protein rounded-lg flex items-center justify-center mx-auto pulse">
                      <Users className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Body Analysis</h3>
                    <p className="text-sm text-muted-foreground">BMI calculation & goal determination</p>
                  </div>
                  <div className="text-center space-y-3 animate-fade-in" style={{
                    animationDelay: '0.5s'
                  }}>
                    <div className="w-14 h-14 bg-nutrition-carbs rounded-lg flex items-center justify-center mx-auto pulse">
                      <Target className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Smart Planning</h3>
                    <p className="text-sm text-muted-foreground">Budget-friendly meal suggestions</p>
                  </div>
                  <div className="text-center space-y-3 animate-fade-in" style={{
                    animationDelay: '0.6s'
                  }}>
                    <div className="w-14 h-14 bg-nutrition-fat rounded-lg flex items-center justify-center mx-auto pulse">
                      <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Macro Focused</h3>
                    <p className="text-sm text-muted-foreground">Protein-rich gym nutrition</p>
                  </div>
                </div>

                <Button size="lg" onClick={() => navigate('/food-planner')} className="w-full btn-primary h-12 px-8 text-base font-medium hover-scale transition-smooth animate-scale-in" style={{
                  animationDelay: '0.7s'
                }}>
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Get My Nutrition Plan
                </Button>
              </Card>
            </div>

            {/* Image Side */}
            <div className="relative animate-scale-in" style={{
              animationDelay: '0.4s'
            }}>
              <div className="relative rounded-2xl overflow-hidden card-shadow bg-card hover-scale transition-smooth group">
                <img src={animatedGymHero} alt="Dynamic gym nutrition scene with person lifting weights surrounded by healthy foods" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-primary/10 transition-all duration-500 group-hover:from-black/20" />
                
                {/* Floating Animation Elements */}
                <div className="absolute top-6 left-6 animate-bounce" style={{
                  animationDelay: '0s'
                }}>
                  <div className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Dumbbell className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="absolute top-20 right-8 animate-bounce" style={{
                  animationDelay: '1s'
                }}>
                  <div className="w-10 h-10 bg-protein/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Utensils className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="absolute bottom-20 left-8 animate-bounce" style={{
                  animationDelay: '2s'
                }}>
                  <div className="w-14 h-14 bg-carbs/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <BarChart3 className="h-7 w-7 text-primary-foreground" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-white/90 text-foreground hover:bg-white animate-pulse">
                    <Brain className="mr-2 h-3 w-3" />
                    AI-Powered Recommendations
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </AlternatingReveal>

      {/* New Instant Meal Analysis Section */}
      <AlternatingReveal index={3}>
        <section className="py-20 sm:py-32 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image Side */}
            <div className="relative animate-slide-in-right" style={{
              animationDelay: '0.2s'
            }}>
              <div className="relative rounded-2xl overflow-hidden card-shadow bg-card hover-scale transition-smooth group">
                <img src={animatedNutritionScan} alt="Fitness enthusiast analyzing nutrition data with healthy foods and technology" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-protein/10 transition-all duration-500 group-hover:from-primary/20" />
                
                {/* Floating Tech Elements */}
                <div className="absolute top-8 right-8 animate-pulse">
                  <div className="w-16 h-16 bg-primary/80 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Camera className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="absolute bottom-16 right-6 animate-bounce" style={{
                  animationDelay: '0.5s'
                }}>
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-primary/20">
                    <div className="text-xs font-semibold text-primary">Calories: 450</div>
                    <div className="text-xs text-muted-foreground">Protein: 35g</div>
                  </div>
                </div>
                
                <div className="absolute top-6 left-6">
                  <Badge className="bg-primary text-primary-foreground animate-pulse">
                    <Zap className="mr-2 h-3 w-3" />
                    Live Analysis
                  </Badge>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-8 animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 animate-scale-in">
                  <Camera className="mr-2 h-3 w-3" />
                  Instant Analysis
                </Badge>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Instant Meal Nutrition Analysis
                  <br />
                  <span className="text-primary">for Gym Rats</span>
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transform your phone into a nutrition powerhouse. Get instant macro breakdowns, 
                  calorie counts, and gym-focused insights from any meal photo.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 space-y-2 bg-card border-border hover-scale transition-smooth animate-fade-in" style={{
                  animationDelay: '0.4s'
                }}>
                  <div className="text-2xl font-bold text-foreground">85%+</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </Card>
                <Card className="p-4 space-y-2 bg-card border-border hover-scale transition-smooth animate-fade-in" style={{
                  animationDelay: '0.5s'
                }}>
                  <div className="text-2xl font-bold text-foreground">&lt;2s</div>
                  <div className="text-sm text-muted-foreground">Analysis Time</div>
                </Card>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={handleStartAnalysis} className="btn-primary h-12 px-8 text-base font-medium hover-scale transition-smooth animate-scale-in" style={{
                  animationDelay: '0.6s'
                }}>
                  <Camera className="mr-2 h-5 w-5" />
                  Analyze Your Meal
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/exercises')} className="h-12 px-8 text-base font-medium hover-scale transition-smooth animate-scale-in" style={{
                  animationDelay: '0.7s'
                }}>
                  <Dumbbell className="mr-2 h-5 w-5" />
                  View Exercises
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/physio-ai')} className="h-12 px-8 text-base font-medium hover-scale transition-smooth animate-scale-in border-primary/30 hover:bg-primary/10" style={{
                  animationDelay: '0.8s'
                }}>
                  <Heart className="mr-2 h-5 w-5" />
                  Fitness Coach
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </AlternatingReveal>

      {/* Enhanced Meal Prep Section */}
      <AlternatingReveal index={4}>
        <section className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full animate-pulse" style={{
            animationDelay: '0s'
          }} />
          <div className="absolute top-40 right-20 w-24 h-24 bg-nutrition-protein rounded-full animate-pulse" style={{
            animationDelay: '1s'
          }} />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-nutrition-carbs rounded-full animate-pulse" style={{
            animationDelay: '2s'
          }} />
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-nutrition-fat rounded-full animate-pulse" style={{
            animationDelay: '3s'
          }} />
        </div>
        
        
      </section>
      </AlternatingReveal>

      {/* Why Choose Calorie AI Section */}
      <AlternatingReveal index={5}>
        <section className="py-20 sm:py-32 bg-background relative overflow-hidden">
        {/* Parallax Background Particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-[10%] w-16 h-16 animate-float" style={{
            animationDelay: '0s'
          }}>
            <Dumbbell className="w-full h-full text-primary" />
          </div>
          <div className="absolute top-32 right-[15%] w-12 h-12 animate-float" style={{
            animationDelay: '1s'
          }}>
            <Utensils className="w-full h-full text-protein" />
          </div>
          <div className="absolute bottom-40 left-[20%] w-20 h-20 animate-float" style={{
            animationDelay: '2s'
          }}>
            <BarChart3 className="w-full h-full text-carbs" />
          </div>
          <div className="absolute top-1/2 right-[25%] w-14 h-14 animate-float" style={{
            animationDelay: '3s'
          }}>
            <Activity className="w-full h-full text-fats" />
          </div>
          <div className="absolute bottom-20 right-[10%] w-18 h-18 animate-float" style={{
            animationDelay: '4s'
          }}>
            <Flame className="w-full h-full text-primary" />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-6">
              <KineticText text="Why Choose Calorie AI?" animation="fadeUp" className="text-4xl sm:text-5xl font-bold">
                <h2 className="text-4xl sm:text-5xl font-bold">
                  <GlowText>Why Choose Calorie AI?</GlowText>
                </h2>
              </KineticText>
              
              <KineticText text="The ultimate fitness nutrition platform designed specifically for gym enthusiasts and athletes" animation="fadeUp" delay={300} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" />
            </div>

            {/* Feature Cards - Sliding from Left */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Card 1 - AI-Powered Analysis */}
              <div className="group animate-slide-in-left interactive-card" style={{
                animationDelay: '0.2s'
              }}>
                <Card className="p-8 h-full bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-protein rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Brain className="h-8 w-8 text-primary-foreground" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        AI-Powered Analysis
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Advanced computer vision analyzes your meals with 95%+ accuracy, identifying ingredients and calculating precise nutrition data in under 2 seconds.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Real-time ingredient recognition
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Precise macro calculations
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 2 - Gym-Focused Nutrition */}
              <div className="group animate-slide-in-left interactive-card" style={{
                animationDelay: '0.4s'
              }}>
                <Card className="p-8 h-full bg-card border-border hover:border-protein/30 transition-all duration-300 hover:shadow-2xl hover:shadow-protein/20">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-protein to-carbs rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Dumbbell className="h-8 w-8 text-primary-foreground" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-protein transition-colors duration-300">
                        Gym-Focused Nutrition
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Tailored specifically for fitness enthusiasts with protein-focused analysis, pre/post workout optimization, and muscle-building meal suggestions.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-protein" />
                        Protein prioritization
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-protein" />
                        Workout timing optimization
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 3 - Smart Meal Planning */}
              <div className="group animate-slide-in-left interactive-card" style={{
                animationDelay: '0.6s'
              }}>
                <Card className="p-8 h-full bg-card border-border hover:border-carbs/30 transition-all duration-300 hover:shadow-2xl hover:shadow-carbs/20">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-carbs to-fats rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ChefHat className="h-8 w-8 text-primary-foreground" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-carbs transition-colors duration-300">
                        Smart Meal Planning
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Budget-conscious meal prep with BMI-based portions, macro-optimized recipes, and personalized nutrition plans that fit your lifestyle.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-carbs" />
                        Budget-friendly planning
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-carbs" />
                        BMI-based portions
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{
              animationDelay: '0.8s'
            }}>
              
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-protein">
                  
                </div>
                
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-carbs">
                  <AnimatedCounter end={24} suffix="/7" delay={1400} />
                </div>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-fats">
                  <AnimatedCounter end={0} prefix="$" delay={1600} />
                </div>
                <p className="text-sm text-muted-foreground">Cost to Start</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Gym System Hero Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src={smartGymHero} alt="Smart Gym System with holographic interfaces" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
          
          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 h-full gap-px">
              {Array.from({
                length: 144
              }).map((_, i) => <div key={i} className="bg-primary/30 animate-pulse" style={{
                animationDelay: `${i * 0.05}s`
              }} />)}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 space-y-6 animate-fade-in">
              <Badge className="futuristic-btn bg-primary/10 text-primary border-primary/20 animate-glow-intense">
                <Sparkles className="mr-2 h-4 w-4 animate-wiggle" />
                Next-Gen Fitness Technology
              </Badge>
              
              <h2 className="text-4xl sm:text-6xl font-bold gradient-text animate-shimmer">
                Smart Gym System
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience the future of fitness with AI-powered analytics, real-time performance tracking, 
                and personalized insights that adapt to your every move.
              </p>
            </div>

            {/* Feature Grid with Glassmorphism */}
            <div className="grid md:grid-cols-3 gap-6 animate-slide-up" style={{
              animationDelay: '0.2s'
            }}>
              <GlassmorphicCard className="p-6 hover:scale-105 transition-all duration-500" glow>
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                    <Brain className="h-7 w-7 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">AI Analytics</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Real-time performance analysis with predictive insights and personalized recommendations.
                  </p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard className="p-6 hover:scale-105 transition-all duration-500" glow>
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                    <Activity className="h-7 w-7 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Live Tracking</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Motion-tracked avatars and biomechanics data displayed on holographic panels.
                  </p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard className="p-6 hover:scale-105 transition-all duration-500" glow>
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                    <Zap className="h-7 w-7 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Smart Sync</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Seamless integration with all gym equipment through advanced IoT connectivity.
                  </p>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* AI Nutrition Planner Section */}
      <section className="py-24 sm:py-32 bg-muted/30 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative animate-slide-in-left group">
                <div className="relative rounded-3xl overflow-hidden">
                  <img src={aiNutrition} alt="AI Nutrition Planner with glowing data cards" className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Floating Metrics */}
                  <div className="absolute top-6 right-6 animate-bounce-in">
                    <GlassmorphicCard className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                        <div>
                          <div className="text-xs text-primary font-bold">AI Active</div>
                          <div className="text-xs text-muted-foreground">Analyzing...</div>
                        </div>
                      </div>
                    </GlassmorphicCard>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="space-y-8 animate-slide-in-right">
                <div className="space-y-4">
                  <Badge className="futuristic-btn bg-primary/10 text-primary border-primary/20">
                    <ChefHat className="mr-2 h-4 w-4" />
                    AI-Powered Nutrition
                  </Badge>
                  
                  <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                    Personalized Meal Plans
                    <br />
                    <span className="gradient-text">That Adapt to You</span>
                  </h2>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our AI analyzes your body metrics, fitness goals, and dietary preferences to create 
                    custom meal plans with glowing data cards and real-time nutritional insights.
                  </p>
                </div>

                {/* Data Visualization */}
                <DataVisualization title="Your Daily Macros" data={[{
                  label: 'Protein',
                  value: 35,
                  color: 'hsl(220, 100%, 60%)'
                }, {
                  label: 'Carbs',
                  value: 45,
                  color: 'hsl(200, 90%, 55%)'
                }, {
                  label: 'Fats',
                  value: 20,
                  color: 'hsl(180, 85%, 50%)'
                }]} />

                <Button size="lg" onClick={handleFoodPlanner} className="futuristic-btn h-12 px-8 text-base font-medium group">
                  <Sparkles className="mr-2 h-5 w-5 animate-wiggle" />
                  Generate My Plan
                  <Zap className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </AlternatingReveal>

      {/* Workout Analytics Dashboard */}
      <AlternatingReveal index={6}>
        <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(220, 100%, 50%) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'pulse 3s ease-in-out infinite'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className="space-y-8 animate-slide-in-left">
                <div className="space-y-4">
                  <Badge className="futuristic-btn bg-primary/10 text-primary border-primary/20">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Real-Time Analytics
                  </Badge>
                  
                  <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                    Track Every Rep,
                    <br />
                    <span className="gradient-text">Perfect Every Form</span>
                  </h2>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    3D motion-tracked avatars analyze your biomechanics in real-time, displaying performance 
                    graphs and metrics on futuristic holographic panels.
                  </p>
                </div>

                {/* Circular Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <CircularMetric label="Reps Today" value={247} max={300} color="hsl(220, 100%, 60%)" icon={<Activity className="h-5 w-5" />} />
                  <CircularMetric label="Form Score" value={94} max={100} color="hsl(200, 90%, 55%)" icon={<Target className="h-5 w-5" />} />
                  <CircularMetric label="Calories" value={650} max={800} color="hsl(180, 85%, 50%)" icon={<Flame className="h-5 w-5" />} />
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={handleStartAnalysis} className="futuristic-btn h-12 px-8 text-base font-medium">
                    <Activity className="mr-2 h-5 w-5" />
                    Start Tracking
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium border-primary/20 hover:bg-primary/10">
                    View Demo
                  </Button>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative animate-slide-in-right group">
                <div className="relative rounded-3xl overflow-hidden">
                  <img src={workoutAnalytics} alt="Workout Analytics Dashboard with 3D avatar" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/40" />
                  
                  {/* Animated Data Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center space-y-2">
                      <div className="text-6xl font-bold gradient-text animate-shimmer">LIVE</div>
                      <div className="text-sm text-muted-foreground">Analytics Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Equipment Integration */}
      <section className="py-24 sm:py-32 bg-muted/30 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 space-y-6 animate-fade-in">
              <Badge className="futuristic-btn bg-primary/10 text-primary border-primary/20">
                <Zap className="mr-2 h-4 w-4 animate-wiggle" />
                IoT Connectivity
              </Badge>
              
              <h2 className="text-4xl sm:text-6xl font-bold gradient-text">
                Every Machine, Connected
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Seamlessly sync with every piece of gym equipment through advanced 3D synchronization 
                and AI-powered data streams.
              </p>
            </div>

            {/* Equipment Network Visualization */}
            <div className="relative animate-scale-in">
              <div className="relative rounded-3xl overflow-hidden group">
                <img src={smartEquipment} alt="Smart Equipment Network with IoT connections" className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Connection Nodes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-4xl mx-auto px-8">
                    <div className="grid grid-cols-3 gap-8">
                      {[{
                        icon: Dumbbell,
                        label: 'Strength',
                        delay: '0s'
                      }, {
                        icon: Activity,
                        label: 'Cardio',
                        delay: '0.3s'
                      }, {
                        icon: Target,
                        label: 'Precision',
                        delay: '0.6s'
                      }].map((item, i) => <GlassmorphicCard key={i} className="p-6 text-center animate-bounce-in" style={{
                        animationDelay: item.delay
                      }}>
                          <item.icon className="h-8 w-8 text-primary mx-auto mb-3 animate-pulse" />
                          <div className="text-sm font-semibold text-foreground">{item.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">Connected</div>
                        </GlassmorphicCard>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {[{
                value: '100%',
                label: 'Equipment Sync'
              }, {
                value: '<1ms',
                label: 'Latency'
              }, {
                value: '24/7',
                label: 'Monitoring'
              }, {
                value: '∞',
                label: 'Data Points'
              }].map((stat, i) => <GlassmorphicCard key={i} className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </GlassmorphicCard>)}
            </div>
          </div>
        </div>
      </section>
      </AlternatingReveal>

      {/* Clean CTA Section */}
      <AlternatingReveal index={7}>
        <section className="py-20 sm:py-32">
        <div className="container mx-auto px-6">
          <Card className="hero-bg card-shadow border-border overflow-hidden max-w-4xl mx-auto animate-scale-in hover-scale transition-smooth">
            <div className="p-12 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Ready to Transform Your Nutrition Tracking?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Join thousands of fitness enthusiasts who trust Hill Calories AI for accurate, 
                  instant meal analysis.
                </p>
              </div>

              <Button size="lg" onClick={handleStartAnalysis} className="btn-primary h-12 px-8 text-base font-medium hover-scale transition-smooth">
                <Camera className="mr-2 h-5 w-5" />
                Start Free Analysis
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">No registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Instant results</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      </AlternatingReveal>

      {/* Workout Tracker */}
      <WorkoutTracker />

      {/* Phone Collection Section */}
      <PhoneCollectionSection />

      {/* Clean Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Hill Calories AI</span>
            </div>
            
            {/* AI Physio Call Number */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Call AI Physio for Personalized Support</p>
              <a href="tel:+19124467854" className="inline-block text-4xl md:text-5xl font-bold text-primary hover:text-primary/80 transition-colors">
                +1 912 446 7854
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">© 2025 Hill Calories AI. Transforming nutrition tracking with AI.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;