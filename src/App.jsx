import { useEffect, useRef, useState } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import './App.css';
import profileSrc from './assets/profilbild.jpeg';
import TiltCard from './components/TiltCard';
import Magnetic from './components/Magnetic';
import KineticText from './components/KineticText';
import Accordion from './components/Accordion';
import ProjectStack from './components/ProjectStack';
import { fadeUp, staggerContainer, viewportOnce } from './lib/motion';

const NAV_SECTIONS = [
  { id: 'about', label: "That's Me!" },
  { id: 'focus', label: 'Focus' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const FOCUS_ITEMS = [
  {
    title: 'Data Science',
    content: 'Statistical modeling, machine learning, and analysis that turns data into decisions.',
  },
  {
    title: 'UX Research',
    content: 'Qualitative and quantitative research that keeps design grounded in real user needs.',
  },
  {
    title: 'Human-AI Interaction',
    content: 'Studying and designing how people and AI systems work together — trust, transparency, and usability at that boundary.',
  },
];

const TOOL_TAGS = ['Python', 'R', 'SQL', 'Figma', 'Tableau', 'Power BI', 'SAP'];
const BUSINESS_TAGS = ['Strategic Analysis', 'Stakeholder Communication', 'Product Demonstration'];

const PROJECTS = [
  {
    title: 'ML Project 01',
    badge: 'Coming soon',
    description: 'A full write-up is on its way, from data ingestion through modeling to measured results.',
  },
  {
    title: 'ML Project 02',
    badge: 'Coming soon',
    description: 'Another case study currently in progress — check back soon for the details.',
  },
];

// Header Component
const Header = ({ scrolled, activeSection, scrollProgress }) => {
  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header-container">
        <h1 className="header-logo">André Schmidt</h1>
        <nav className="header-nav">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`nav-link ${activeSection === section.id ? 'nav-link--active' : ''}`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
      <Motion.div className="header-progress" style={{ scaleX: scrollProgress }} />
    </header>
  );
};

// Main App Component
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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

    const elements = NAV_SECTIONS.map((section) => document.getElementById(section.id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Header */}
      <Header scrolled={scrolled} activeSection={activeSection} scrollProgress={scrollYProgress} />
      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section ref={heroRef} className="section hero-section">
          <Motion.div className="hero-content" style={{ y: heroY }}>
            <h1 className="hero-title">
              <KineticText text="I build with data, and design for people." />
            </h1>
            <p className="hero-subtitle">
              As a Master's Student in Business Analytics and Econometrics at the University of Cologne,
              I am passionate about leveraging data to drive business insights and decisions.
            </p>
            <Magnetic>
              <button className="cta-button" onClick={scrollToId('skills')}>
                Explore My Work
              </button>
            </Magnetic>
          </Motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <Motion.div
            className="section-content"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <Motion.h2 className="section-title" variants={fadeUp}>
              That's me!
            </Motion.h2>
            <div className="about-grid">
              <TiltCard className="about-card" variants={fadeUp}>
                <div className="about-text">
                  <p>
                    I hold a BSc in Digital Media Marketing (combining computer science and marketing, with a specialism in UX/UI).
                    The focus of my bachelor's thesis, titled
                    "On the Relevance of AI Tools for UX Design: An Analysis of AI-powered Prototyping Software"
                    examined the use of AI in the field of prototyping.
                  </p>
                  <p>
                    In October 2025, I started an MSc in Business Analytics & Econometrics at the University of Cologne to deepen my quantitative skills.
                    I specialise in machine learning and statistical methods for shaping business and economic decisions,
                    and design solutions that combine user research with measurable outcomes.
                  </p>
                  <p>
                    I see myself somewhere between a data scientist and a UX researcher — with a growing focus
                    on Human-AI Interaction: how people and intelligent systems can work together well.
                  </p>
                </div>
              </TiltCard>
              <TiltCard className="photo-card" variants={fadeUp}>
                <div className="photo-card__inner">
                  <img
                    src={profileSrc}
                    alt="Portrait of André Schmidt"
                    className="photo-card__img"
                    loading="lazy"
                  />
                </div>
              </TiltCard>
            </div>
          </Motion.div>
        </section>

        {/* Focus Areas Section */}
        <section id="focus" className="section focus-section">
          <Motion.div
            className="section-content"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <Motion.h2 className="section-title" variants={fadeUp}>
              Focus Areas
            </Motion.h2>
            <TiltCard className="focus-panel" variants={fadeUp} maxTilt={3}>
              <div className="focus-grid">
                <div className="focus-intro">
                  <p>Somewhere between a data scientist, a UX researcher, and someone fascinated by how humans and AI work together.</p>
                </div>
                <Accordion items={FOCUS_ITEMS} />
              </div>
            </TiltCard>
          </Motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section skills-section">
          <Motion.div
            className="skills-reveal"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <Motion.h2 className="section-title" variants={fadeUp}>
              Skills
            </Motion.h2>
            <TiltCard className="skills-panel" variants={fadeUp} maxTilt={3}>
              <div className="skills-columns">
                <div>
                  <h3>Data Science & Analytics</h3>
                  <p>
                    Machine Learning <br />
                    Statistical Analysis & Econometrics <br />
                    Data Wrangling & Preprocessing <br />
                    Quantitative Research <br />
                    Programming: Python, R, SQL
                  </p>
                </div>
                <div>
                  <h3>UX & Product Design</h3>
                  <p>
                    User Research (Qualitative & Quantitative) <br />
                    UX/UI Design <br />
                    Interaction Design <br />
                    Prototyping & Wireframing <br />
                    Usability Testing
                  </p>
                </div>
              </div>
              <div className="skills-divider"></div>
              <div className="foundation-column">
                <h4>Tools & Technologies</h4>
                <div className="skills-list">
                  {TOOL_TAGS.map((tag) => (
                    <span className="skill-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="foundation-column">
                <h4>Business & Communication</h4>
                <div className="skills-list">
                  {BUSINESS_TAGS.map((tag) => (
                    <span className="skill-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <Motion.div
            className="section-content"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <Motion.h2 className="section-title" variants={fadeUp}>
              My Projects
            </Motion.h2>
            <Motion.p className="contact-intro" variants={fadeUp}>
              Machine learning project write-ups are on their way — case studies from my MSc coursework and
              independent work, complete with problem framing, approach, and measured results.
            </Motion.p>
            <Motion.div variants={fadeUp}>
              <ProjectStack projects={PROJECTS} />
            </Motion.div>
          </Motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <Motion.div
            className="section-content"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <Motion.h2 className="section-title" variants={fadeUp}>
              Get In Touch
            </Motion.h2>
            <Motion.p className="contact-intro" variants={fadeUp}>
              I'm always interested in new opportunities, and collaborations.
            </Motion.p>
            <Motion.div className="contact-form" variants={fadeUp}>
              <div className="form-row">
                <input type="text" placeholder="Your Name" className="form-input" />
                <input type="email" placeholder="Your Email" className="form-input" />
              </div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="form-textarea"
              ></textarea>
              <Magnetic>
                <button className="submit-button">Send Message</button>
              </Magnetic>
            </Motion.div>

            <div className="form-spacer"></div>

            <div className="footer-separator">
              <div>
                <Magnetic>
                  <a
                    href="https://www.linkedin.com/in/andré-schmidt1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="social-link social-link--linkedin"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340a53.72 53.72 0 1 1 53.72-53.72 53.72 53.72 0 0 1-53.72 53.72zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.6V448h-92.6V148.9h88.9v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.4 61.9 111.4 142.3V448z"/>
                    </svg>
                  </a>
                </Magnetic>
              </div>
              <p className="footer-text">
                &copy; 2025 André Schmidt. All rights reserved.
              </p>
            </div>
          </Motion.div>
        </section>
      </main>
    </div>
  );
};

export default App;
