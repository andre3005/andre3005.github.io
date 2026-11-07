// The three field colors. Each one means something across the site:
// blue = data science, violet = human-AI interaction, peach = UX research.
export const FIELD = {
  blue: [111, 134, 242],
  violet: [176, 106, 232],
  peach: [247, 149, 90],
};

const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

// Position 0..1 along the data → people axis to an rgb() string
export const mixField = (x) => {
  const rgb = x < 0.5 ? lerp(FIELD.blue, FIELD.violet, x / 0.5) : lerp(FIELD.violet, FIELD.peach, (x - 0.5) / 0.5);
  return `rgb(${rgb.join(' ')})`;
};
