import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.8,
  className
}) => {
  const directionOffset = {
    left: { x: -80, y: 0 },
    right: { x: 80, y: 0 },
    up: { x: 0, y: -80 },
    down: { x: 0, y: 80 }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Cute, soft easing curve
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

// Preset component for alternating reveals
export const AlternatingReveal: React.FC<{ 
  children: React.ReactNode; 
  index: number;
  className?: string;
}> = ({ children, index, className }) => {
  const direction = index % 2 === 0 ? 'left' : 'right';
  
  return (
    <ScrollReveal 
      direction={direction} 
      delay={0.1}
      duration={0.9}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
};
