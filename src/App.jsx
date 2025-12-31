import React from 'react'
import './App.css'
import profileSrc from "./assets/profilbild.jpeg";
import CustomCursor from './components/CustomCursor';



// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo">André Schmidt</h1>
        <nav className="header-nav">
          <a href="#about" className="nav-link">That's Me!</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app">
      <CustomCursor />
      {/* Fixed Background */}
      <div className="background-fixed"></div>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="section hero-section">
          <div className="section-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">UzK Business Analytics and Econometrics Master's Student</h1>
            <p className="hero-subtitle"> 
              As a Master's Student in Business Analytics and Econometrics at the University of Cologne,
              I am passionate about leveraging data to drive business insights and decisions. 
            </p>
            {/* <button className="cta-button">Explore My Work</button> */}
          </div>
        </section>



        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="section-overlay"></div>
          <div className="section-content">
            <h2 className="section-title">That's me!</h2>
            <div className="about-grid">
              <div className="about-card">
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
                  Seeking roles at the intersection 
                   of UX and data: product design, data‑informed UX research, or growth experiments.
                </p>
              </div>
              </div>
              <div className="photo-card">
                <div className="photo-card__inner">
                    <img
                        src={profileSrc}  /* import profileSrc from './assets/profile.jpg' */
                        alt="Portrait of Your Name"
                        className="photo-card__img"
                        loading="lazy"
                    />
                </div>
             </div>
            </div>
          </div>
        </section>

        
        <section id="skills" className="section skills-section">
          <h2 className="section-title">Skills</h2>
            <div className="skills-pillars-container">
              <div className="skills-card">
                <h3>Data Science & Analytics</h3>
                <p>
                  Machine Learning <br />
                  Statistical Analysis & Econometrics <br />
                  Data Wrangling & Preprocessing <br />
                  Quantitative Research <br />
                  Programming: Python, R, SQL
                </p>
              </div>
              <div className="skills-card">
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
            <div className="section-padding"></div>
            <div className="skills-foundation-container">
              <div className="skills-card-down">
                <div className="foundation-column">
                  <h4>Tools & Technologies</h4>
                  <p>Python | R | SQL | Figma | Tableau | Power BI | SAP</p>
                  </div>
                <div className="foundation-column">
                  <h4>Business & Communication</h4>
                  <p>Strategic Analysis | Stakeholder Communication | Product Demonstration</p>
                </div>
              </div>
            </div>
        </section> 

        {/* Projects Section 
        <section id="projects" className="section projects-section">
          <div className="section-overlay"></div>
          <div className="section-content">
            <h2 className="section-title">My Projects</h2>
            <div className="projects-grid">
              {[1, 2, 3].map(project => (
                <div key={project} className="project-card">
                  <div className="project-image"></div>
                  <h3 className="project-title">Project {project}</h3>
                  <p className="project-description">
                    A brief description of this amazing project and the technologies used to build it.
                  </p>
                  <div className="project-links">
                    <button className="project-link demo">View Demo</button>
                    <button className="project-link source">Source Code</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="section-overlay"></div>
          <div className="section-content">
            <h2 className="section-title">Get In Touch</h2>
            <p className="contact-intro">
              I'm always interested in new opportunities, challenges, and collaborations.
            </p>
            <div className="contact-form">
              <div className="form-row">
                <input type="text" placeholder="Your Name" className="form-input" />
                <input type="email" placeholder="Your Email" className="form-input" />
              </div>
              <textarea 
                placeholder="Your Message"
                rows={4}
                className="form-textarea"
              ></textarea>
              <button className="submit-button">Send Message</button>
            </div>

            <div className="form-spacer"></div>
            
            <div className="footer-separator">
              <div>
                <a
                href="www.linkedin.com/in/andré-schmidt1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="social-link social-link--linkedin"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340a53.72 53.72 0 1 1 53.72-53.72 53.72 53.72 0 0 1-53.72 53.72zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.6V448h-92.6V148.9h88.9v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.4 61.9 111.4 142.3V448z"/>
                </svg>
                </a>
              </div>
              <p className="footer-text">
              &copy; 2025 André Schmidt. All rights reserved.
            </p>
            </div>
          </div>
        </section>



      </main>
    </div>
  );
};


export default App
