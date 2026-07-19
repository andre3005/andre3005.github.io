import { motion as Motion, useReducedMotion } from 'framer-motion';

const word = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const KineticText = ({ text, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <Motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline' }}
    >
      {words.map((w, i) => (
        <Motion.span
          key={i}
          variants={word}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </Motion.span>
      ))}
    </Motion.span>
  );
};

export default KineticText;
