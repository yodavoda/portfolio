// App.tsx
// Root component. Assembles all sections in order.
// Think of this as the "table of contents" of the page.
//
// Page structure:
//   Navbar      ← fixed top bar
//   Hero        ← full screen intro (#about)
//   Skills      ← technical skills (#skills)
//   Projects    ← project cards (#projects)
//   Experience  ← education + strengths (#experience)
//   ChatWidget  ← AI chat with resume (#chat)
//   Footer      ← contact links

import React from 'react'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import Skills     from './components/Skills'
import Projects   from './components/Projects'
import Experience from './components/Experience'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <hr className="divider" />
        <Skills />
        <hr className="divider" />
        <Projects />
        <hr className="divider" />
        <Experience />
        <hr className="divider" />
        <ChatWidget />
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-head)',
          fontSize: '1.5rem',
          color: 'var(--accent)',
          marginBottom: '16px',
        }}>
          Let's connect
        </p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '24px' }}>
          <a href="mailto:eunnisriram@gmail.com"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>
            eunnisriram@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/sriram-karthik-49a78722a/" target="_blank" rel="noreferrer"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>
            LinkedIn ↗
          </a>
          <a href="tel:+916309130380"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>
            +91 6309130380
          </a>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          © 2024 Sriram Karthik Eunni · Built with React + Python
        </p>
      </footer>
    </>
  )
}
