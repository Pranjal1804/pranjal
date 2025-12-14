import React, { useEffect, useState } from 'react';
import './App.css';
import Lenis from '@studio-freight/lenis';
import { Analytics } from "@vercel/analytics/react"
import { motion } from 'framer-motion';
import {
  Download, ArrowUpRight, Folder, Terminal,
  Database, Shield, Cpu, Cloud, Globe, Activity, Sun, Moon
} from 'lucide-react';

const App = () => {
  // Initialize Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3.5, // Extremely smooth, long glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1.5, // Less physical effort required
      touchMultiplier: 2.5,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    // Check if browser supports View Transitions API
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      });
    } else {
      // Fallback for browsers without View Transitions support
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <Analytics />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* --- HERO SECTION --- */}
      <section className="full-screen container">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ height: '8px', width: '8px', background: 'red' }}></span>
            <span style={{ color: 'red', letterSpacing: '4px', fontSize: '0.8rem' }}>IDENTITY: PRANJAL MITRA</span>
          </div>

          <h1 className="hero-title">
            PRANJAL<br />
            <span className="gradient-text">MITRA</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            marginTop: '50px',
            borderTop: '1px solid #222',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <p className="hero-desc" style={{ maxWidth: '600px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Computer Science Undergraduate specializing in <strong>Cyber-Physical Systems</strong>. <br />
            Backend Engineer, Cloud Infrastructure, and AI-Driven Solutions.
          </p>

          <a href="/resume.pdf" download className="btn-glitch">
            Download Resume
          </a>
        </motion.div>
      </section>

      {/* --- DOMAIN BANNER --- */}
      <div className="banner-wrapper">
        <div className="domain-banner">
          <div className="marquee-content">
            <span className="marquee-item">FULL STACK DEVELOPMENT</span>
            <span className="marquee-item">///</span>
            <span className="marquee-item">CYBERSECURITY</span>
            <span className="marquee-item">///</span>
            <span className="marquee-item">ARTIFICIAL INTELLIGENCE</span>
            <span className="marquee-item">///</span>
            <span className="marquee-item">CLOUD ARCHITECTURE</span>
            <span className="marquee-item">///</span>
            <span className="marquee-item">CYBER-PHYSICAL SYSTEMS</span>
          </div>
        </div>
      </div>

      {/* --- CLASSIFIED PROJECTS (Data from Resume) --- */}
      <section className="container" style={{ paddingBottom: '150px' }}>
        <h2 className="section-title" style={{ fontSize: '3rem', marginBottom: '60px' }}>
          <span style={{ color: 'red', fontSize: '1rem', display: 'block', marginBottom: '10px' }}>// DATABASE_ACCESS</span>
          DEPLOYED SYSTEMS
        </h2>

        <div className="project-grid">

          {/* Project 1 */}
          <TerminalCard
            id="SYS_001"
            title="Agentic Cold Emailing System"
            desc="Automated lead outreach using LLM agents for email generation, scheduling, and tracking."
            stats={[
              "Generated 200+ personalized emails/hour via Python + Gemini API",
              "Managed 5,000+ leads in SQLite with industry filters",
              "Achieved 97% delivery rate with SMTP automation"
            ]}
            tags={["Python", "Gemini API", "SQLite", "Automation"]}
          />

          {/* Project 2 */}
          <TerminalCard
            id="SYS_002"
            title="Medical VLM Chatbot"
            desc="Fine-tuned Gemma 3n for medical Q&A with visual input support."
            stats={[
              "Trained on 20,000+ medical Q&A pairs, boosting accuracy to 91%",
              "Enabled X-ray/MRI analysis with 85% precision",
              "Deployed FastAPI backend handling 150+ concurrent reqs @ 1.2s"
            ]}
            tags={["GenAI", "Gemma 3n", "Computer Vision", "FastAPI"]}
          />

          {/* Project 3 */}
          <TerminalCard
            id="SYS_003"
            title="Patient Health Deterioration Prediction"
            desc="Predictive model to identify patients at risk of health decline within 90 days."
            stats={[
              "Achieved 94% AUC using XGBoost on EHR data",
              "Engineered 50+ features from 10,000+ patient records",
              "Implemented SHAP analysis for interpretable predictions"
            ]}
            tags={["XGBoost", "Pandas", "Machine Learning", "EHR"]}
          />

        </div>
      </section>

      {/* --- SKILLS MATRIX (Data from Resume) --- */}
      <section className="container skills-section">
        <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>
          <span style={{ color: 'red', fontSize: '1rem', display: 'block', marginBottom: '10px' }}>// CAPABILITIES</span>
          TECHNICAL ARSENAL
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

          <SkillCategory
            title="Development Stack"
            icon={<Globe size={18} />}
            skills={["React.js", "Next.js", "TypeScript", "MongoDB", "PostgreSQL", "MySQL"]}
          />

          <SkillCategory
            title="Programming Languages"
            icon={<Terminal size={18} />}
            skills={["Java", "Python", "C", "C++", "JavaScript"]}
          />

          <SkillCategory
            title="Cloud & DevOps"
            icon={<Cloud size={18} />}
            skills={["AWS", "Docker", "Linux"]}
          />

          <SkillCategory
            title="Cyber Security"
            icon={<Shield size={18} />}
            skills={["Nmap", "Maltego", "Wireshark", "Burp Suite", "OpenSSH", "OSINT", "Binwalk"]}
          />

          <SkillCategory
            title="Data & AI"
            icon={<Activity size={18} />}
            skills={["R", "Matlab", "GenAI", "LLM Fine-tuning", "Computer Vision"]}
          />

        </div>
      </section>

      {/* --- EXPERIENCE (Data from Resume) --- */}
      <section className="experience-section">
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>
            <span style={{ color: 'red', fontSize: '1rem', display: 'block', marginBottom: '10px' }}>// CAREER_LOGS</span>
            OPERATIONS
          </h2>

          <ExperienceItem
            role="Cybersecurity Lead"
            company="Microsoft Innovations Club, VITC"
            date="June 2025 - Present"
            desc="Conducted 5+ workshops/CTFs (OSINT, Web Security); built toolkit used by 50+ students."
          />
          <ExperienceItem
            role="AI Intern"
            company="Wiremetrics Solutions"
            date="Aug 2025 - Sept 2025"
            desc="Developed and fine-tuned a GenAI-based medical chatbot leveraging Gemma 3n LLM, improving domain-specific response accuracy by 10%."
          />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 className="footer-text" style={{ fontSize: '5vw', lineHeight: 1, marginBottom: '40px', fontFamily: 'Syne' }}>
          SYSTEM_HALTED <span className="blinking-cursor">_</span>
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
          <SocialLink href="https://github.com/Pranjal1804" label="GITHUB" />
          <SocialLink href="https://linkedin.com/in/pranjalmitra" label="LINKEDIN" />
          <SocialLink href="mailto:mitrapranjal2004@gmail.com" label="EMAIL" />
        </div>
        <div style={{ marginTop: '60px', color: '#444', fontSize: '0.8rem' }}>
          © 2025 PRANJAL MITRA.
        </div>
      </footer>
    </div>
  );
};



/* --- SUB-COMPONENTS --- */

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button className="theme-toggle" onClick={toggleTheme}>
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    <span className="toggle-label">{theme === 'dark' ? 'LIGHT_MODE' : 'DARK_MODE'}</span>
  </button>
);

const SocialLink = ({ href, label }) => (
  <a href={href} target="_blank" rel="noreferrer" className="social-link">
    {label}
  </a>
);

const TerminalCard = ({ id, title, desc, stats, tags }) => (
  <motion.div
    className="terminal-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {/* Corner Accents */}
    <div className="corner-accent top-left"></div>
    <div className="corner-accent top-right"></div>
    <div className="corner-accent bottom-left"></div>
    <div className="corner-accent bottom-right"></div>

    <div className="scan-line"></div>

    <div className="card-header">
      <div className="folder-name">
        <Folder size={14} />
        <span>root/projects/{id}</span>
      </div>
      <div className="status-indicator">
        <span className="blink-dot"></span> OPERATIONAL
      </div>
    </div>

    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{desc}</p>

      <div className="project-stats">
        {stats.map((stat, i) => (
          <div key={i} className="stat-row">
            <span className="prompt">&gt;</span> {stat}
          </div>
        ))}
      </div>

      <div className="tags-container">
        {tags.map(tag => (
          <span key={tag} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="card-footer-deco">
      <span style={{ fontSize: '0.7rem', color: '#444' }}>ACCESS_LEVEL: ADMIN</span>
      <ArrowUpRight size={18} className="arrow-icon" />
    </div>
  </motion.div>
);

const SkillCategory = ({ title, icon, skills }) => (
  <div className="skill-category">
    <div className="skill-title">
      {icon} {title}
    </div>
    <div className="skill-grid">
      {skills.map(skill => (
        <div key={skill} className="skill-chip">{skill}</div>
      ))}
    </div>
  </div>
);

const ExperienceItem = ({ role, company, date, desc }) => (
  <div style={{ borderBottom: '1px solid #222', padding: '30px 0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
      <h4 className="role-title" style={{ fontSize: '1.4rem' }}>{role}</h4>
      <span className="date-text" style={{ fontFamily: 'monospace' }}>{date}</span>
    </div>
    <div style={{ color: 'var(--primary)', marginBottom: '10px' }}>{company}</div>
    <p className="role-desc" style={{ maxWidth: '800px' }}>{desc}</p>
  </div>
);

export default App;