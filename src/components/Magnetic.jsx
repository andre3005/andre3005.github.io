import { motion as Motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const Magnetic = ({ children, className = '', strength = 0.35, ...rest }) => {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        ...(prefersReducedMotion ? {} : { x: springX, y: springY }),
      }}
      {...rest}
    >
      {children}
    </Motion.div>
  );
};

export default Magnetic;
