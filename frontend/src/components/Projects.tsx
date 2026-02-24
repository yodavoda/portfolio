// Projects.tsx
// Displays all of Sriram's projects as cards.
// Each card shows: title, description, tech stack tags.
// To add a new project, just add an object to the `projects` array below.

import React, { useState } from 'react'

const projects = [
  {
    title: 'Campus Connect',
    tech: ['Flutter', 'Firebase'],
    description:
      'Mobile app connecting students and faculty with real-time event updates, location-based services, and peer reviews. Built with Flutter and Firebase real-time database.',
    highlight: true, // shown with accent border
  },
  {
    title: 'Bank ATM Simulator',
    tech: ['JavaFX', 'MySQL'],
    description:
      'Fully functional ATM simulator supporting withdrawals, deposits, and bill payments. JavaFX handles the UI; MySQL manages account and transaction data securely.',
    highlight: false,
  },
  {
    title: 'Security System',
    tech: ['ARM Assembly', 'LPC 1768'],
    description:
      'Hardware security system on an LPC 1768 microcontroller. Interfaces with sensors for real-time monitoring and triggers alarms on unauthorized access.',
    highlight: false,
  },
  {
    title: 'BlackJack Simulator',
    tech: ['Java', 'OOP'],
    description:
      'Interactive card game simulator mimicking real-world BlackJack gameplay. Reinforced object-oriented design patterns and game loop logic.',
    highlight: false,
  },
  {
    title: 'Tridel Technology (Internship)',
    tech: ['Java', 'JUnit'],
    description:
      'Conducted JUnit testing for company software. Validated ATTide software features and built a module to interpret and analyze ocean tide readings.',
    highlight: false,
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <p className="section-label">What I've built</p>
        <h2 className="section-title">Projects & Experience</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {projects.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Project Card ─────────────────────────────────────────────────────────────
// Separated into its own component so it's easy to read and reuse.

type ProjectCardProps = {
  title: string
  tech: string[]
  description: string
  highlight: boolean
}

function ProjectCard({ title, tech, description, highlight }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${highlight || hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: '24px',
        transition: 'border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Project title */}
      <h3 style={{
        fontFamily: 'var(--font-head)',
        fontSize: '1.2rem',
        color: 'var(--text)',
      }}>
        {title}
      </h3>

      {/* Tech stack tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tech.map(t => (
          <span key={t} style={{
            background: 'rgba(232,168,56,0.12)',
            color: 'var(--accent)',
            fontSize: '12px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: '6px',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '14px',
        color: 'var(--text-muted)',
        lineHeight: 1.7,
        flexGrow: 1,
      }}>
        {description}
      </p>
    </div>
  )
}
