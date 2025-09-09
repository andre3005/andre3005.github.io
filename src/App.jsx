import React from 'react'
import './App.css'


// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo">André Schmidt</h1>
        <nav className="header-nav">
          <a href="#cv" className="nav-link">CV</a>
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
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="about-card">
              <div className="about-text">
                <p>
                  I'm a passionate web developer with expertise in modern technologies. 
                  I love creating beautiful, functional websites that provide excellent user experiences.
                </p>
                <p>
                  My journey in web development started several years ago, and I've been 
                  constantly learning and growing ever since.
                </p>
              </div>
              </div>
              <div className="skills-card">
                <h3>Skills</h3>
                <div className="skills-list">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">CSS</span>
                  <span className="skill-tag">HTML</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Python</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
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

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="section-overlay"></div>
          <div className="section-content">
            <h2 className="section-title">Get In Touch</h2>
            <p className="contact-intro">
              I'm always interested in new opportunities and collaborations.
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
          </div>
        </section>
      </main>
    </div>
  );
};


export default App
