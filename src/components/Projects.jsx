import { useCallback, useEffect, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { PROJECTS } from '../content/projects';
import { pick, useCopy } from '../lib/prefs';
import { fadeUp } from '../lib/motion';

const SECTION_ORDER = ['problem', 'data', 'approach', 'result', 'reflection'];
const HASH_PREFIX = '#work/';

// Drafts stay closed on the live site but open in `npm run dev` for previewing
const canOpen = (p) => p.status === 'published' || import.meta.env.DEV;

// Generated preview charts. Points are fixed so the render is stable.
const SCATTER = [
  [8, 70], [14, 62], [19, 66], [24, 55], [30, 58], [34, 47], [40, 50], [45, 41],
  [50, 44], [55, 35], [61, 38], [66, 29], [71, 31], [76, 23], [82, 26], [88, 17], [93, 20],
];
const BARS = [22, 34, 48, 62, 70, 64, 52, 40, 30, 22, 16];

export const ProjectVisual = ({ project }) => {
  const { visual } = project;
  if (visual?.startsWith('/')) {
    return <img className="project-image" src={visual} alt="" loading="lazy" />;
  }
  if (visual === 'scatter') {
    return (
      <div className="project-visual" aria-hidden="true">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none">
          <path d="M4 74 L96 14" className="pv-fit" vectorEffect="non-scaling-stroke" />
        </svg>
        {SCATTER.map(([x, y], i) => (
          <span key={i} className="pv-dot" style={{ left: `${x}%`, top: `${(y / 80) * 100}%` }} />
        ))}
      </div>
    );
  }
  if (visual === 'bars') {
    return (
      <div className="project-visual pv-bars" aria-hidden="true">
        {BARS.map((h, i) => (
          <span key={i} style={{ height: `${h + 20}%` }} />
        ))}
      </div>
    );
  }
  return (
    <svg className="project-visual" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 70 C 20 70, 26 22, 40 22 S 58 68, 100 70" className="pv-line pv-line--violet" vectorEffect="non-scaling-stroke" />
      <path d="M0 72 C 34 72, 48 34, 62 34 S 80 70, 100 72" className="pv-line pv-line--peach" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ProjectCard = ({ project, onOpen }) => {
  const { lang, t } = useCopy();
  const openable = canOpen(project);
  const isDraft = project.status !== 'published';
  const Tag = openable ? 'button' : 'div';

  return (
    <Motion.article className={`project-card project-card--${project.field}`} variants={fadeUp}>
      <Tag
        className="project-card-inner"
        {...(openable ? { type: 'button', onClick: () => onOpen(project.slug) } : {})}
      >
        <div className="project-plot">
          <ProjectVisual project={project} />
          {project.metric && (
            <p className="project-metric">
              <strong>{project.metric.value}</strong>
              <span>{pick(project.metric.label, lang)}</span>
            </p>
          )}
        </div>
        <div className="project-body">
          <p className="project-status">
            {isDraft && <span className="status-dot" />}
            {isDraft ? t.projects.draft : project.year}
          </p>
          <h3 className="project-title">{pick(project.title, lang)}</h3>
          <p className="project-text">{pick(project.summary, lang)}</p>
          {project.tags?.length > 0 && (
            <ul className="project-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          <p className="project-cta">
            {isDraft && !import.meta.env.DEV ? t.projects.soon : t.projects.read}
            {openable && <ArrowIcon />}
          </p>
        </div>
      </Tag>
    </Motion.article>
  );
};

const CaseStudy = ({ project, onClose }) => {
  const { lang, t } = useCopy();
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
    document.documentElement.classList.toggle('no-scroll', Boolean(project));
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="case"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {project && (
        <div className={`case-inner project-card--${project.field}`}>
          <button type="button" className="case-close" onClick={onClose} aria-label={t.ui.close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {project.status !== 'published' && <p className="case-draft">{t.projects.draftNote}</p>}
          <p className="project-status">{project.year}</p>
          <h2 id="case-title" className="case-title">{pick(project.title, lang)}</h2>
          <p className="case-summary">{pick(project.summary, lang)}</p>

          <div className="project-plot case-plot">
            <ProjectVisual project={project} />
            {project.metric && (
              <p className="project-metric">
                <strong>{project.metric.value}</strong>
                <span>{pick(project.metric.label, lang)}</span>
              </p>
            )}
          </div>

          {project.tags?.length > 0 && (
            <ul className="project-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          <div className="case-sections">
            {SECTION_ORDER.map((key) => {
              const body = pick(project.sections?.[key], lang);
              if (!body && project.status === 'published') return null;
              return (
                <section key={key} className="case-section">
                  <h3>{t.projects.sections[key]}</h3>
                  {body ? (
                    body.split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)
                  ) : (
                    <p className="case-empty">{t.projects.empty}</p>
                  )}
                </section>
              );
            })}
          </div>

          {project.links?.length > 0 && (
            <div className="case-links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  {pick(link.label, lang)}
                  <ArrowIcon />
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
};

const slugFromHash = () => {
  const { hash } = window.location;
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const slug = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  const project = PROJECTS.find((p) => p.slug === slug);
  return project && canOpen(project) ? slug : null;
};

const Projects = () => {
  const [openSlug, setOpenSlug] = useState(slugFromHash);

  // Back/forward buttons and pasted links open the matching case study
  useEffect(() => {
    const sync = () => setOpenSlug(slugFromHash());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const open = useCallback((slug) => {
    window.history.pushState(null, '', `${HASH_PREFIX}${slug}`);
    setOpenSlug(slug);
  }, []);

  const close = useCallback(() => {
    if (window.location.hash.startsWith(HASH_PREFIX)) {
      window.history.replaceState(null, '', '#projects');
    }
    setOpenSlug(null);
  }, []);

  const project = PROJECTS.find((p) => p.slug === openSlug) ?? null;

  return (
    <>
      <div className="project-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={open} />
        ))}
      </div>
      <CaseStudy project={project} onClose={close} />
    </>
  );
};

export default Projects;
