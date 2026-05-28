-- Create meal_history table
CREATE TABLE public.meal_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  food JSONB NOT NULL,
  total_calories INTEGER NOT NULL,
  total_protein NUMERIC(10,2) NOT NULL,
  total_carbs NUMERIC(10,2) NOT NULL,
  total_fat NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.meal_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own meals"
ON public.meal_history
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meals"
ON public.meal_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meals"
ON public.meal_history
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_meal_history_user_id ON public.meal_history(user_id);
CREATE INDEX idx_meal_history_created_at ON public.meal_history(created_at DESC);