import React, { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('button, a, [role="button"], .cursor-pointer, input, textarea, select');
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'auto';

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Simple Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1}) ${isClicking ? 'scale(0.8)' : ''}`,
        }}
      >        
        {/* Simple Core */}
        <div className={`absolute rounded-full transition-all duration-150 ${
          isHovering ? 'w-4 h-4' : 'w-3 h-3'
        }`}
        style={{
          background: isClicking 
            ? 'hsl(var(--primary))' 
            : isHovering 
            ? 'hsl(var(--primary))' 
            : 'hsl(var(--foreground))',
          transform: 'translate(-50%, -50%)',
          boxShadow: isHovering 
            ? '0 0 15px hsl(var(--primary) / 0.4)' 
            : '0 0 8px hsl(var(--primary) / 0.2)'
        }} />
      </div>

      {/* Simple Click Ripple */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9997] rounded-full animate-ping"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            width: '30px',
            height: '30px',
            background: 'transparent',
            border: '2px solid hsl(var(--primary))',
            boxShadow: '0 0 10px hsl(var(--primary) / 0.3)',
          }}
        />
      )}
    </>
  );
};