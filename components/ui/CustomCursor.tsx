'use client';

import { useEffect, useRef } from 'react';
import { lerp } from '@/lib/utils';

/**
 * CustomCursor — dot + ring cursor with smooth lerp following
 * Only visible on desktop (pointer: fine devices)
 * Expands when hovering interactive elements
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't initialize on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const handleMouseEnterInteractive = () => {
      ringRef.current?.classList.add('hovering');
      dotRef.current?.style.setProperty('transform', 'translate(-50%, -50%) scale(0)');
    };

    const handleMouseLeaveInteractive = () => {
      ringRef.current?.classList.remove('hovering');
      dotRef.current?.style.setProperty('transform', 'translate(-50%, -50%) scale(1)');
    };

    // Ring follows with lerp delay
    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      animFrameId = requestAnimationFrame(animate);
    };

    // Attach listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    window.addEventListener('mousemove', handleMouseMove);
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        aria-hidden="true"
      />
    </>
  );
}
