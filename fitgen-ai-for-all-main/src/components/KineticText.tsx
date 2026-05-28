import React, { useEffect, useState } from 'react';

interface KineticTextProps {
  text: string;
  className?: string;
  animation?: 'fadeUp' | 'slideIn' | 'zoomIn' | 'typewriter' | 'glitch';
  delay?: number;
  staggerDelay?: number;
  children?: React.ReactNode;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  staggerDelay = 50,
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`kinetic-${text.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [text, delay]);

  useEffect(() => {
    if (!isVisible || animation !== 'typewriter') return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, staggerDelay);

    return () => clearInterval(timer);
  }, [isVisible, words.length, staggerDelay, animation]);

  const getAnimationClass = (index: number) => {
    if (!isVisible) return 'opacity-0 translate-y-8 blur-sm';
    
    const baseDelay = index * staggerDelay;
    
    switch (animation) {
      case 'fadeUp':
        return 'opacity-100 translate-y-0 blur-none transition-all duration-700 ease-out';
      case 'slideIn':
        return 'opacity-100 translate-x-0 blur-none transition-all duration-500 ease-out';
      case 'zoomIn':
        return 'opacity-100 scale-100 blur-none transition-all duration-600 ease-out';
      case 'typewriter':
        return index <= currentIndex ? 'opacity-100' : 'opacity-0';
      case 'glitch':
        return `opacity-100 translate-y-0 transition-all duration-300 ease-out ${
          isVisible ? 'animate-pulse' : ''
        }`;
      default:
        return 'opacity-100 translate-y-0';
    }
  };

  const getInitialClass = (index: number) => {
    switch (animation) {
      case 'fadeUp':
        return 'opacity-0 translate-y-8 blur-sm';
      case 'slideIn':
        return 'opacity-0 -translate-x-8 blur-sm';
      case 'zoomIn':
        return 'opacity-0 scale-75 blur-sm';
      case 'typewriter':
        return 'opacity-0';
      case 'glitch':
        return 'opacity-0 translate-y-4';
      default:
        return 'opacity-0';
    }
  };

  if (children) {
    return (
      <div
        id={`kinetic-${text.replace(/\s+/g, '-').toLowerCase()}`}
        className={`${className} ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-8 blur-sm'} transition-all duration-700 ease-out`}
        style={{ 
          transitionDelay: `${delay}ms`,
          textShadow: isVisible ? '0 0 20px hsl(var(--primary) / 0.3)' : 'none'
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      id={`kinetic-${text.replace(/\s+/g, '-').toLowerCase()}`}
      className={className}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block mr-2 ${getInitialClass(index)} ${getAnimationClass(index)}`}
          style={{
            transitionDelay: `${delay + index * staggerDelay}ms`,
            textShadow: isVisible ? '0 0 15px hsl(var(--primary) / 0.2)' : 'none'
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export const GlowText: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <span 
      className={`relative ${className}`}
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--protein)) 50%, hsl(var(--carbs)) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))'
      }}
    >
      {children}
    </span>
  );
};