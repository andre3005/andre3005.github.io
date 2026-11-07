import { useEffect, useState } from 'react';
import { motion as Motion, useScroll } from 'framer-motion';
import './App.css';
import profileSrc from './assets/Profilbild.jpeg';
import TileHistogram from './components/TileHistogram';
import FieldChart from './components/FieldChart';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import { SITE } from './content/site';
import { TOOL_TAGS } from './content/copy';
import { LangContext, useCopy, useLangState, useTheme } from './lib/prefs';
import { fadeUp, staggerContainer, viewportOnce } from './lib/motion';

const NAV_SECTIONS = ['about', 'focus', 'skills', 'projects'];
const HAS_FORM = Boolean(SITE.web3formsKey || SITE.email);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ICONS = {
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340a53.72 53.72 0 1 1 53.72-53.72 53.72 53.72 0 0 1-53.72 53.72zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.6V448h-92.6V148.9h88.9v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.4 61.9 111.4 142.3V448z" />
    </svg>
  ),
  github: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  ),
  email: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  cv: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  ),
};

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);

const Mark = () => (
  <span className="mark" aria-hidden="true">
    <i style={{ background: 'var(--blue)' }} />
    <i style={{ background: 'var(--violet)' }} />
    <i style={{ background: 'var(--peach)' }} />
  </span>
);

const SectionHead = ({ index, label, title, children }) => (
  <Motion.header className="section-head" variants={fadeUp}>
    <p className="eyebrow">
      <span>{index}</span>
      {label}
    </p>
    <h2 className="section-title">{title}</h2>
    {children}
  </Motion.header>
);

const Header = ({ scrolled, activeSection, scrollProgress, theme, onTheme, onLang }) => {
  const { lang, t } = useCopy();
  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header-bar">
        <a href="#top" className="logo">
          <Mark />
          {SITE.name}
        </a>
        <nav className="header-nav" aria-label="Sections">
          {NAV_SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? 'nav-link--active' : ''}`}>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button type="button" className="icon-btn icon-btn--text" onClick={onLang} aria-label={t.ui.switchLang} title={t.ui.switchLang}>
            {lang === 'en' ? 'DE' : 'EN'}
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={onTheme}
            aria-label={theme === 'dark' ? t.ui.toLight : t.ui.toDark}
            title={theme === 'dark' ? t.ui.toLight : t.ui.toDark}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <a href="#contact" className="btn btn--small">{t.nav.contact}</a>
        <Motion.div className="header-progress" style={{ scaleX: scrollProgress }} />
      </div>
    </header>
  );
};

const ContactLinks = () => {
  const { t } = useCopy();
  const links = [
    SITE.email && { key: 'email', href: `mailto:${SITE.email}`, label: t.contact.email },
    SITE.linkedin && { key: 'linkedin', href: SITE.linkedin, label: t.contact.linkedin, external: true },
    SITE.github && { key: 'github', href: SITE.github, label: t.contact.github, external: true },
    SITE.cv && { key: 'cv', href: SITE.cv, label: t.contact.cv, download: true },
  ].filter(Boolean);

  return (
    <ul className="contact-links">
      {links.map((l) => (
        <li key={l.key}>
          <a
            href={l.href}
            className="contact-link"
            {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...(l.download ? { download: '' } : {})}
          >
            {ICONS[l.key]}
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Page = ({ theme, onTheme, onLang }) => {
  const { t } = useCopy();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    [...NAV_SECTIONS, 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const reveal = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: viewportOnce,
    variants: staggerContainer,
  };

  return (
    <div className="app" id="top">
      <Header
        scrolled={scrolled}
        activeSection={activeSection}
        scrollProgress={scrollYProgress}
        theme={theme}
        onTheme={onTheme}
        onLang={onLang}
      />

      <main>
        {/* Hero */}
        <section className="hero">
          <Motion.div className="hero-copy" initial="hidden" animate="visible" variants={staggerContainer}>
            <Motion.p className="hero-meta" variants={fadeUp}>
              {t.hero.meta}
            </Motion.p>
            <Motion.h1 className="hero-title" variants={fadeUp}>
              {t.hero.titleA} <em className="hl hl--blue">{t.hero.titleData}</em>
              {t.hero.titleB} <em className="hl hl--peach">{t.hero.titlePeople}</em>
            </Motion.h1>
            <Motion.p className="hero-sub" variants={fadeUp}>
              {t.hero.sub}
            </Motion.p>
            <Motion.div className="hero-actions" variants={fadeUp}>
              <a href="#projects" className="btn">
                {t.hero.primary}
                <ArrowIcon />
              </a>
              <a href="#contact" className="btn btn--ghost">{t.hero.secondary}</a>
            </Motion.div>
          </Motion.div>
          <TileHistogram />
        </section>

        {/* About */}
        <section id="about" className="section">
          <Motion.div className="container" {...reveal}>
            <SectionHead index="01" label={t.about.label} title={t.about.title} />
            <div className="about-grid">
              <Motion.div className="about-text" variants={fadeUp}>
                <p className="lead">{t.about.lead}</p>
                <p>
                  {t.about.p1A}
                  <q>{t.about.thesis}</q>
                  {t.about.p1B}
                </p>
                <p>{t.about.p2}</p>
                <ol className="timeline">
                  {t.about.timeline.map((item) => (
                    <li key={item.what}>
                      <span className="timeline-dot" style={{ background: item.color }} />
                      <span className="timeline-when">{item.when}</span>
                      <span className="timeline-what">{item.what}</span>
                    </li>
                  ))}
                </ol>
              </Motion.div>
              <Motion.div className="portrait" variants={fadeUp}>
                <div className="portrait-frame">
                  <img src={profileSrc} alt={t.about.portraitAlt} loading="lazy" />
                </div>
              </Motion.div>
            </div>
          </Motion.div>
        </section>

        {/* Focus */}
        <section id="focus" className="section">
          <Motion.div className="container" {...reveal}>
            <SectionHead index="02" label={t.focus.label} title={t.focus.title}>
              <p className="section-intro">{t.focus.intro}</p>
            </SectionHead>
            <Motion.div variants={fadeUp}>
              <FieldChart />
            </Motion.div>
          </Motion.div>
        </section>

        {/* Skills */}
        <section id="skills" className="section">
          <Motion.div className="container" {...reveal}>
            <SectionHead index="03" label={t.skills.label} title={t.skills.title} />
            <Motion.div className="panel skills-panel" variants={fadeUp}>
              <div className="skills-columns">
                {t.skills.groups.map((group) => (
                  <div key={group.title} className="skill-group">
                    <h3 className="skill-group-title">
                      <span className="dot" style={{ background: group.color }} />
                      {group.title}
                    </h3>
                    <ul className="skill-list">
                      {group.items.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="skills-foot">
                <div>
                  <h4 className="label">{t.skills.tools}</h4>
                  <div className="chips">
                    {TOOL_TAGS.map((tag) => (
                      <span className="chip chip--tool" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="label">{t.skills.business}</h4>
                  <div className="chips">
                    {t.skills.businessTags.map((tag) => (
                      <span className="chip" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <Motion.div className="container" {...reveal}>
            <SectionHead index="04" label={t.projects.label} title={t.projects.title}>
              <p className="section-intro">{t.projects.intro}</p>
            </SectionHead>
            <Projects />
          </Motion.div>
        </section>

        {/* Contact */}
        <section id="contact" className="section section--contact">
          <Motion.div className={`container ${HAS_FORM ? 'split' : ''}`} {...reveal}>
            <SectionHead index="05" label={t.contact.label} title={t.contact.title}>
              <p className="section-intro">{t.contact.intro}</p>
              <ContactLinks />
            </SectionHead>
            {HAS_FORM && <ContactForm />}
          </Motion.div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-bar">
          <a href="#top" className="logo logo--small">
            <Mark />
            {SITE.name}
          </a>
          <p>
            © {new Date().getFullYear()} {SITE.name} · {t.footer}
          </p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const [theme, toggleTheme] = useTheme();
  const [lang, toggleLang] = useLangState();
  return (
    <LangContext.Provider value={lang}>
      <Page theme={theme} onTheme={toggleTheme} onLang={toggleLang} />
    </LangContext.Provider>
  );
};

export default App;
