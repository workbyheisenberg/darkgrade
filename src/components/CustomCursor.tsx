import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<'default' | 'hover' | 'project'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isProject = target.closest('[data-cursor="project"]');
        const isInteractive = target.closest('a, button, [role="button"], input, [data-cursor="interactive"]');

        if (isProject) {
          setHoverState('project');
        } else if (isInteractive) {
          setHoverState('hover');
        } else {
          setHoverState('default');
        }
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    // Smooth lerp for lagging ring
    const render = () => {
      // Lerp ~0.15
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  // If touch or fine pointer not active, don't render
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  const ringClass =
    hoverState === 'project'
      ? 'cursor-project'
      : hoverState === 'hover'
      ? 'cursor-hover'
      : '';

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${ringClass}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
