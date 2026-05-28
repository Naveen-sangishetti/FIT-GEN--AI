import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ExerciseCard } from '@/components/ExerciseCard';
import { exercises, categories, difficulties, muscleGroupOptions } from '@/data/exercises';
import { 
  Search, 
  Filter, 
  Dumbbell, 
  Brain, 
  TrendingUp,
  Target,
  Flame,
  ChevronLeft
} from 'lucide-react';
import { KineticText } from '@/components/KineticText';

const Exercises = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All Muscle Groups');

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
      const matchesMuscleGroup = selectedMuscleGroup === 'All Muscle Groups' || 
        exercise.muscleGroups.includes(selectedMuscleGroup);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesMuscleGroup;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedMuscleGroup]);

  const stats = useMemo(() => {
    return {
      total: exercises.length,
      strength: exercises.filter(e => e.category === 'strength').length,
      cardio: exercises.filter(e => e.category === 'cardio').length,
      bodyweight: exercises.filter(e => e.category === 'bodyweight').length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative z-10">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="pointer-events-auto relative z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-protein rounded-lg flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-primary-foreground" />
              </div>
              <KineticText 
                text="Exercise Library" 
                animation="fadeUp" 
                className="text-xl font-semibold text-foreground"
              />
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              <Brain className="mr-1 h-3 w-3" />
              {filteredExercises.length} Exercises
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary to-protein rounded-full animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-carbs to-fats rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Target className="mr-2 h-3 w-3" />
              Comprehensive Exercise Guide
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Master Your Form, Maximize Your Results
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive library of exercises with detailed form instructions, safety tips, and variations for all fitness levels
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border">
              <div className="text-2xl font-bold text-primary mb-1">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Exercises</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border">
              <div className="text-2xl font-bold text-protein mb-1">{stats.strength}</div>
              <div className="text-sm text-muted-foreground">Strength</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border">
              <div className="text-2xl font-bold text-carbs mb-1">{stats.cardio}</div>
              <div className="text-sm text-muted-foreground">Cardio</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border">
              <div className="text-2xl font-bold text-fats mb-1">{stats.bodyweight}</div>
              <div className="text-sm text-muted-foreground">Bodyweight</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-border bg-card/30 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative pointer-events-auto relative z-10">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search exercises by name, muscle group, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pointer-events-auto relative z-10"
              />
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span className="font-medium">Filters:</span>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] pointer-events-auto relative z-10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="pointer-events-auto relative z-50">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[180px] pointer-events-auto relative z-10">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="pointer-events-auto relative z-50">
                  {difficulties.map((diff) => (
                    <SelectItem key={diff.value} value={diff.value}>
                      {diff.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
                <SelectTrigger className="w-[200px] pointer-events-auto relative z-10">
                  <SelectValue placeholder="Muscle Group" />
                </SelectTrigger>
                <SelectContent className="pointer-events-auto relative z-50">
                  {muscleGroupOptions.map((muscle) => (
                    <SelectItem key={muscle} value={muscle}>
                      {muscle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedMuscleGroup !== 'All Muscle Groups') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSelectedMuscleGroup('All Muscle Groups');
                  }}
                  className="text-muted-foreground hover:text-foreground pointer-events-auto relative z-10"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Exercises Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {filteredExercises.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Dumbbell className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No exercises found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSelectedMuscleGroup('All Muscle Groups');
                  }}
                  className="pointer-events-auto relative z-10"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-lg text-muted-foreground">
              Combine these exercises with our AI-powered nutrition tracking for optimal results
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/upload')}
                className="pointer-events-auto relative z-10"
              >
                <Flame className="mr-2 h-5 w-5" />
                Track Your Nutrition
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/food-planner')}
                className="pointer-events-auto relative z-10"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Plan Your Meals
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exercises;
