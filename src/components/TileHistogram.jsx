import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { mixField } from '../lib/palette';
import { useCopy } from '../lib/prefs';

const ROWS = 7;

// Density along the data → people axis, in tile units (0..ROWS).
// One peak for data work, one for people work, a smaller bump for human-AI in between.
const density = (x) =>
  6.2 * Math.exp(-(((x - 0.24) / 0.13) ** 2)) +
  2.6 * Math.exp(-(((x - 0.5) / 0.07) ** 2)) +
  5.7 * Math.exp(-(((x - 0.77) / 0.12) ** 2)) +
  0.6;

const columnsForWidth = (w) => {
  if (w < 480) return 14;
  if (w < 800) return 20;
  if (w < 1120) return 28;
  return 36;
};

const EASE = [0.22, 1, 0.36, 1];

// Which field a position on the axis belongs to, for the label highlight
const fieldAt = (x) => (x < 0.38 ? 'blue' : x < 0.62 ? 'violet' : 'peach');

const LABELS = [
  { key: 'blue', at: 24 },
  { key: 'violet', at: 50 },
  { key: 'peach', at: 77 },
];

const TileHistogram = () => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState(null);
  const [field, setField] = useState(null);
  const { t } = useCopy();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const cols = columnsForWidth(width || 1200);
  const gap = width < 600 ? 4 : 6;
  const tile = width ? (width - gap * (cols - 1)) / cols : 0;
  const step = tile + gap;
  const height = ROWS * tile + (ROWS - 1) * gap;

  // Each bar is the density averaged over its bin, rounded to whole tiles
  const bars = useMemo(
    () =>
      Array.from({ length: cols }, (_, i) => {
        let sum = 0;
        for (let s = 0; s < 8; s++) sum += density((i + (s + 0.5) / 8) / cols);
        const x = (i + 0.5) / cols;
        return { h: Math.min(ROWS, Math.max(1, Math.round(sum / 8))), color: mixField(x), field: fieldAt(x) };
      }),
    [cols]
  );

  // The same density drawn as a curve in pixel space, so it lines up with the tile tops.
  // A value of v tiles sits at the top edge of the v-th tile.
  const curve = useMemo(() => {
    if (!width) return '';
    const yOf = (v) => height - (v * step - gap);
    const pts = [];
    for (let s = 0; s <= 160; s++) {
      const x = s / 160;
      pts.push(`${(x * width).toFixed(1)},${yOf(density(x)).toFixed(1)}`);
    }
    return `M${pts.join(' L')}`;
  }, [width, height, step, gap]);

  return (
    <figure
      className={`histo ${field ? 'histo--focus' : ''}`}
      onMouseLeave={() => {
        setHover(null);
        setField(null);
      }}
    >
      <div ref={ref} className="histo-plot" style={{ height: height || undefined }}>
        {width > 0 &&
          bars.map((bar, i) => {
            const dist = hover === null ? 99 : Math.abs(i - hover);
            const lift = Math.max(0, 1 - dist / 3) * 6;
            return (
              <div
                key={`${cols}-${i}`}
                className={`histo-col ${field && bar.field === field ? 'is-lit' : ''}`}
                onMouseEnter={() => setHover(i)}
                style={{
                  left: i * step,
                  width: tile,
                  '--c': bar.color,
                  transform: `translateY(${-lift}px)`,
                }}
              >
                {Array.from({ length: bar.h }, (_, r) => (
                  <Motion.span
                    key={r}
                    className="histo-tile"
                    style={{ width: tile, height: tile, bottom: r * step, borderRadius: Math.min(12, tile * 0.28) }}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1 - (r / ROWS) * 0.72, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.016 + r * 0.045, ease: EASE }}
                  />
                ))}
              </div>
            );
          })}
        {width > 0 && (
          <svg className="histo-curve" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
            <Motion.path
              d={curve}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            />
          </svg>
        )}
      </div>
      <div className="histo-axis">
        {LABELS.map(({ key, at }) => (
          <button
            key={key}
            type="button"
            className={`histo-label ${field === key ? 'is-active' : ''}`}
            style={{ left: `${at}%` }}
            aria-pressed={field === key}
            onMouseEnter={() => setField(key)}
            onFocus={() => setField(key)}
            onBlur={() => setField(null)}
            onClick={() => setField((f) => (f === key ? null : key))}
          >
            <i style={{ background: `var(--${key})` }} />
            {t.hero.axis[key]}
          </button>
        ))}
      </div>
    </figure>
  );
};

export default TileHistogram;
