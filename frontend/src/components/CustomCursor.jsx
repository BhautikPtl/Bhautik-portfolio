import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outlinePos, setOutlinePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const followCursor = () => {
      setOutlinePos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15
      }));
      requestAnimationFrame(followCursor);
    };
    const frameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(frameId);
  }, [position]);

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`
        }} 
      />
      <div 
        className="cursor-outline" 
        style={{ 
          left: `${outlinePos.x}px`, 
          top: `${outlinePos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          borderColor: isHovering ? 'var(--primary)' : 'rgba(255,255,255,0.3)',
          backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
        }} 
      />
    </>
  );
};

export default CustomCursor;
