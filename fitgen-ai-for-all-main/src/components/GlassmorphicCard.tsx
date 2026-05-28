import React from 'react';
import { cn } from '@/lib/utils';
interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}
export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className,
  glow = false,
  style
}) => {
  return <div className={cn("relative group", "backdrop-blur-xl bg-card/10 border border-border/30", "rounded-2xl overflow-hidden", "transition-all duration-500", "hover:bg-card/20 hover:border-primary/30", "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]", glow && "shadow-[0_0_50px_rgba(0,170,255,0.2)]", className)} style={style}>
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
      
      {/* Neon border glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accents */}
      
      
    </div>;
};