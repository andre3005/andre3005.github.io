import { useEffect, useState } from 'react';
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const checkHover = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'IMG' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hoverable');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [x, y]);

  return (
    <Motion.div
      className={`custom-cursor ${isHovering ? 'custom-cursor--hovering' : ''}`}
      style={{ left: springX, top: springY }}
    >
      <div className="custom-cursor__circle" />
    </Motion.div>
  );
};

export default CustomCursor;
