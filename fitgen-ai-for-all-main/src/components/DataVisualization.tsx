import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface DataVisualizationProps {
  title: string;
  data: DataPoint[];
  animated?: boolean;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({ 
  title, 
  data,
  animated = true 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <GlassmorphicCard className="p-6" glow>
      <h3 className="text-lg font-semibold text-foreground mb-6 gradient-text">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="text-foreground font-semibold">{item.value}%</span>
            </div>
            
            <div className="relative h-3 bg-muted/20 rounded-full overflow-hidden">
              {/* Animated progress bar */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                  boxShadow: `0 0 20px ${item.color}40`
                }}
                initial={animated ? { width: 0 } : { width: `${(item.value / maxValue) * 100}%` }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ 
                  duration: 1.5, 
                  delay: index * 0.2,
                  ease: "easeOut" 
                }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-y-0 right-0 w-8 blur-xl opacity-60"
                style={{ background: item.color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.2 + 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassmorphicCard>
  );
};

interface CircularMetricProps {
  label: string;
  value: number;
  max: number;
  color: string;
  icon?: React.ReactNode;
}

export const CircularMetric: React.FC<CircularMetricProps> = ({ 
  label, 
  value, 
  max,
  color,
  icon 
}) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <GlassmorphicCard className="p-6 flex flex-col items-center justify-center space-y-4">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
            opacity="0.2"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 10px ${color})` }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && <div className="text-primary mb-1">{icon}</div>}
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">of {max}</span>
        </div>
      </div>
      
      <p className="text-sm text-center text-muted-foreground font-medium">{label}</p>
    </GlassmorphicCard>
  );
};
