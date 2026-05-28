import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Exercise } from '@/data/exercises';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Repeat, 
  CheckCircle2, 
  Flame,
  Dumbbell
} from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
}

const difficultyColors = {
  beginner: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  advanced: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

const categoryIcons = {
  strength: Dumbbell,
  cardio: Flame,
  flexibility: Target,
  bodyweight: CheckCircle2,
  equipment: Dumbbell,
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const CategoryIcon = categoryIcons[exercise.category];

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-card relative z-10 pointer-events-auto">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <CategoryIcon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl">{exercise.name}</CardTitle>
          </div>
          <Badge className={difficultyColors[exercise.difficulty]}>
            {exercise.difficulty}
          </Badge>
        </div>
        
        <CardDescription className="text-sm leading-relaxed">
          {exercise.description}
        </CardDescription>

        <div className="flex flex-wrap gap-2 mt-3">
          {exercise.muscleGroups.slice(0, 3).map((muscle) => (
            <Badge key={muscle} variant="outline" className="text-xs">
              {muscle}
            </Badge>
          ))}
          {exercise.muscleGroups.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{exercise.muscleGroups.length - 3} more
            </Badge>
          )}
        </div>

        {exercise.caloriesBurnedPerMinute && (
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-orange-500" />
            <span>~{exercise.caloriesBurnedPerMinute} cal/min</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-primary" />
            <div>
              <p className="font-medium text-foreground">{exercise.recommendedSets}</p>
              <p className="text-xs text-muted-foreground">Sets</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <p className="font-medium text-foreground">{exercise.recommendedReps}</p>
              <p className="text-xs text-muted-foreground">Reps</p>
            </div>
          </div>
        </div>

        {exercise.equipment.length > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground mb-2">Equipment Needed:</p>
            <div className="flex flex-wrap gap-1">
              {exercise.equipment.map((item) => (
                <Badge key={item} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
              {isExpanded ? 'Hide Details' : 'View Full Details'}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              {/* Proper Form */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <h4 className="font-semibold text-sm">Proper Form & Technique</h4>
                </div>
                <ol className="space-y-1.5 text-sm text-muted-foreground pl-6">
                  {exercise.properForm.map((step, index) => (
                    <li key={index} className="list-decimal">{step}</li>
                  ))}
                </ol>
              </div>

              {/* Common Mistakes */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h4 className="font-semibold text-sm">Common Mistakes to Avoid</h4>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground pl-6">
                  {exercise.commonMistakes.map((mistake, index) => (
                    <li key={index} className="list-disc">{mistake}</li>
                  ))}
                </ul>
              </div>

              {/* Variations */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-sm">Exercise Variations</h4>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground pl-6">
                  {exercise.variations.map((variation, index) => (
                    <li key={index} className="list-disc">{variation}</li>
                  ))}
                </ul>
              </div>

              {/* Safety Tips */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-rose-500" />
                  <h4 className="font-semibold text-sm">Safety Guidelines</h4>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground pl-6">
                  {exercise.safetyTips.map((tip, index) => (
                    <li key={index} className="list-disc">{tip}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
