// Case studies. To publish one: fill in the fields and set status to 'published'.
//
// Any text field can be a plain string (shown in both languages)
// or { en: '...', de: '...' } for separate translations.
//
// status    'draft' shows the card as "In progress" and keeps the write-up closed.
//           (In `npm run dev` drafts still open, so you can preview while writing.)
// field     'blue' (data science), 'violet' (human-AI) or 'peach' (UX research): sets the card color
// visual    'scatter', 'curves' or 'bars' for a generated preview,
//           or an image path like '/projects/thesis.png' (put the file in /public/projects)
// metric    the one number that sums up the result, shown big on the card
// sections  the write-up, always in this order. Leave a section '' to skip it.
// links     e.g. [{ label: 'Code on GitHub', href: 'https://github.com/...' }]

export const PROJECTS = [
  {
    slug: 'thesis-ai-prototyping',
    status: 'draft',
    field: 'violet',
    visual: 'curves',
    year: '2025',
    title: {
      en: 'AI tools in UX prototyping',
      de: 'KI-Tools im UX-Prototyping',
    },
    summary: {
      en: 'Bachelor thesis: how relevant are AI-powered prototyping tools for UX design work?',
      de: 'Bachelorarbeit: Wie relevant sind KI-gestützte Prototyping-Tools für die UX-Gestaltung?',
    },
    tags: ['UX research', 'Human-AI interaction'],
    metric: null, // e.g. { value: '12', label: { en: 'tools evaluated', de: 'Tools evaluiert' } }
    sections: {
      problem: '',
      data: '',
      approach: '',
      result: '',
      reflection: '',
    },
    links: [],
  },
  {
    slug: 'ml-project-01',
    status: 'draft',
    field: 'blue',
    visual: 'scatter',
    year: '2026',
    title: 'ML project 01',
    summary: {
      en: 'Write-up in progress, from data ingestion through modeling to measured results',
      de: 'Ausarbeitung folgt: von der Datenaufbereitung über die Modellierung bis zu messbaren Ergebnissen',
    },
    tags: ['Machine learning', 'Python'],
    metric: null,
    sections: { problem: '', data: '', approach: '', result: '', reflection: '' },
    links: [],
  },
  {
    slug: 'ml-project-02',
    status: 'draft',
    field: 'peach',
    visual: 'bars',
    year: '2026',
    title: 'ML project 02',
    summary: {
      en: 'Another case study in progress, from problem framing to measured results',
      de: 'Eine weitere Fallstudie in Arbeit, von der Problemstellung bis zu messbaren Ergebnissen',
    },
    tags: ['Statistics', 'R'],
    metric: null,
    sections: { problem: '', data: '', approach: '', result: '', reflection: '' },
    links: [],
  },
];
