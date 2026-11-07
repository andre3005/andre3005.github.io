import { useMemo, useState } from 'react';
import { useCopy } from '../lib/prefs';

// Three normal curves on one shared axis (methods → people).
// Human-AI interaction sits where data science and UX research overlap.
const FIELDS = [
  { key: 'blue', mu: 0.3, sigma: 0.13, peak: 0.9 },
  { key: 'violet', mu: 0.5, sigma: 0.09, peak: 0.66 },
  { key: 'peach', mu: 0.7, sigma: 0.13, peak: 0.84 },
];

const W = 600;
const H = 260;
const BASE = H - 1;
const yOf = (v) => BASE - v * (H - 24);

const pathFor = ({ mu, sigma, peak }) => {
  const pts = [];
  for (let s = 0; s <= 120; s++) {
    const x = s / 120;
    const v = peak * Math.exp(-(((x - mu) / sigma) ** 2) / 2);
    pts.push(`${(x * W).toFixed(1)},${yOf(v).toFixed(1)}`);
  }
  const line = `M${pts.join(' L')}`;
  return { line, area: `${line} L${W},${BASE} L0,${BASE} Z` };
};

const FieldChart = () => {
  const { t } = useCopy();
  const [active, setActive] = useState(null);
  const paths = useMemo(() => FIELDS.map((f) => ({ ...f, ...pathFor(f) })), []);
  const current = FIELDS.find((f) => f.key === active);

  return (
    <div className="fields" data-active={active ?? 'none'} onMouseLeave={() => setActive(null)}>
      <ul className="fields-list">
        {FIELDS.map(({ key }) => (
          <li key={key}>
            <button
              type="button"
              className={`field-item ${active === key ? 'is-active' : ''}`}
              style={{ '--c': `var(--${key})` }}
              aria-pressed={active === key}
              onMouseEnter={() => setActive(key)}
              onFocus={() => setActive(key)}
              onClick={() => setActive((a) => (a === key ? null : key))}
            >
              <span className="field-item-dot" />
              <span className="field-item-title">{t.focus.items[key].title}</span>
              <span className="field-item-text">{t.focus.items[key].text}</span>
            </button>
          </li>
        ))}
      </ul>

      <figure className="fields-chart" aria-hidden="true">
        <div className="fields-plot">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <defs>
              {FIELDS.map(({ key }) => (
                <linearGradient key={key} id={`fc-${key}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" style={{ stopColor: `var(--${key})`, stopOpacity: 0.4 }} />
                  <stop offset="1" style={{ stopColor: `var(--${key})`, stopOpacity: 0.02 }} />
                </linearGradient>
              ))}
            </defs>
            {paths.map((p) => (
              <g key={p.key} className={`fc-curve fc-curve--${p.key}`}>
                <path d={p.area} fill={`url(#fc-${p.key})`} />
                <path d={p.line} className="fc-line" style={{ stroke: `var(--${p.key})` }} vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </svg>
          {current && (
            <div
              className="fc-marker"
              style={{ left: `${current.mu * 100}%`, top: `${(yOf(current.peak) / H) * 100}%`, '--c': `var(--${current.key})` }}
            >
              <span>{t.focus.items[current.key].title}</span>
            </div>
          )}
        </div>
        <figcaption className="fields-axis">
          <span>← {t.focus.axisLeft}</span>
          <span>{t.focus.axisRight} →</span>
        </figcaption>
      </figure>
    </div>
  );
};

export default FieldChart;
