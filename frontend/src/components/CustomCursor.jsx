import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const outlinePosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef(null);
  const isTouchDeviceRef = useRef(false);

  useEffect(() => {
    // Check if device is touch-based or small screen
    const isTouchDevice = () => {
      return (
        (typeof window !== 'undefined' && 
         ('ontouchstart' in window || 
          navigator.maxTouchPoints > 0 || 
          navigator.msMaxTouchPoints > 0)) ||
        window.matchMedia('(max-width: 1024px)').matches
      );
    };

    isTouchDeviceRef.current = isTouchDevice();

    // If touch device, don't render cursor
    if (isTouchDeviceRef.current) {
      return;
    }

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const isClickable = e.target.tagName === 'A' || 
                          e.target.tagName === 'BUTTON' || 
                          e.target.closest('a') || 
                          e.target.closest('button');
      isHoveringRef.current = isClickable;
    };

    const updateCursor = () => {
      const dot = cursorDotRef.current;
      const outline = cursorOutlineRef.current;
      
      if (dot) {
        dot.style.left = `${posRef.current.x}px`;
        dot.style.top = `${posRef.current.y}px`;
        dot.style.transform = `translate(-50%, -50%) scale(${isHoveringRef.current ? 2 : 1})`;
      }

      if (outline) {
        outlinePosRef.current = {
          x: outlinePosRef.current.x + (posRef.current.x - outlinePosRef.current.x) * 0.2,
          y: outlinePosRef.current.y + (posRef.current.y - outlinePosRef.current.y) * 0.2
        };

        outline.style.left = `${outlinePosRef.current.x}px`;
        outline.style.top = `${outlinePosRef.current.y}px`;
        outline.style.transform = `translate(-50%, -50%) scale(${isHoveringRef.current ? 1.5 : 1})`;
        outline.style.borderColor = isHoveringRef.current ? 'var(--primary)' : 'rgba(255,255,255,0.3)';
        outline.style.backgroundColor = isHoveringRef.current ? 'rgba(6, 182, 212, 0.1)' : 'transparent';
      }

      rafRef.current = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Don't render on touch devices or tablets
  if (isTouchDeviceRef.current) {
    return null;
  }

  return (
    <>
      <div 
        ref={cursorDotRef}
        className="cursor-dot" 
        style={{ 
          willChange: 'transform',
          pointerEvents: 'none'
        }} 
      />
      <div 
        ref={cursorOutlineRef}
        className="cursor-outline" 
        style={{ 
          willChange: 'transform',
          pointerEvents: 'none'
        }} 
      />
    </>
  );
};

export default CustomCursor;
