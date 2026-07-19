import { useId } from 'react';

const PATHS = {
  circle: 'M6,52 C2,30 18,6 52,4 C88,2 98,26 96,48 C94,74 70,92 46,90 C18,88 4,72 6,52 Z',
  underline: 'M4,14 C40,2 90,2 130,12 C150,17 165,10 176,6',
};

const VIEWBOX = {
  circle: '0 0 100 96',
  underline: '0 0 180 22',
};

const Squiggle = ({ variant = 'circle', className = '' }) => {
  const gradientId = useId();

  return (
    <svg
      className={className}
      viewBox={VIEWBOX[variant]}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--pastel-coral)" />
          <stop offset="45%" stopColor="var(--pastel-amber)" />
          <stop offset="75%" stopColor="var(--pastel-blue)" />
          <stop offset="100%" stopColor="var(--pastel-lavender)" />
        </linearGradient>
      </defs>
      <path
        d={PATHS[variant]}
        stroke={`url(#${gradientId})`}
        strokeWidth={variant === 'circle' ? 3.5 : 4}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Squiggle;
