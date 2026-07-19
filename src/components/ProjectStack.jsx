import { useState } from 'react';
import { motion as Motion } from 'framer-motion';

const ProjectStack = ({ projects }) => {
  const [index, setIndex] = useState(0);
  const count = projects.length;

  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  return (
    <div className="project-stack">
      <div className="project-stack-cards">
        {projects.map((project, i) => {
          const offset = (i - index + count) % count;
          if (offset > 2) return null;
          return (
            <Motion.div
              key={project.title}
              className="project-card project-stack-card"
              style={{ zIndex: count - offset }}
              animate={{
                scale: 1 - offset * 0.05,
                y: offset * 18,
                rotate: offset === 0 ? 0 : (i % 2 === 0 ? -1 : 1) * offset * 3,
                opacity: offset === 0 ? 1 : 0.55,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-image"></div>
              <span className="project-badge">{project.badge}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </Motion.div>
          );
        })}
      </div>
      <div className="project-stack-controls">
        <button type="button" className="project-stack-arrow" onClick={() => go(-1)} aria-label="Previous project">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="project-stack-dots">
          {projects.map((project, i) => (
            <button
              key={project.title}
              type="button"
              className={`project-stack-dot ${i === index ? 'project-stack-dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show ${project.title}`}
            />
          ))}
        </div>
        <button type="button" className="project-stack-arrow" onClick={() => go(1)} aria-label="Next project">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectStack;
