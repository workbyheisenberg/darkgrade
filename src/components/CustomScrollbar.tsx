import { useEffect, useState } from 'react';

export default function CustomScrollbar() {
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(60);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight <= 0) return;

      const progress = Math.min(Math.max(scrollY / totalDocHeight, 0), 1);
      const viewportHeight = window.innerHeight;

      // Dynamic thumb height based on viewport ratio, min 50px
      const calculatedHeight = Math.max((viewportHeight / document.documentElement.scrollHeight) * viewportHeight, 50);
      setThumbHeight(calculatedHeight);

      const maxTop = viewportHeight - calculatedHeight;
      setThumbTop(progress * maxTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="custom-scrollbar-track" aria-hidden="true">
      <div
        className="custom-scrollbar-thumb"
        style={{
          height: `${thumbHeight}px`,
          transform: `translate3d(0, ${thumbTop}px, 0)`,
        }}
      />
    </div>
  );
}
