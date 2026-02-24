// Skills.tsx
// Displays Sriram's technical skills in grouped tag pills.
// Simple, readable, and easy to update by modifying the skillGroups array.

import React from 'react'

// Each group has a title and a list of skill tags
const skillGroups = [
  {
    title: 'Languages',
    skills: ['C', 'Python', 'Java', 'ARM Assembly'],
  },
  {
    title: 'Web',
    skills: ['HTML', 'CSS', 'JavaScript', 'Adobe XD'],
  },
  {
    title: 'Database',
    skills: ['MySQL', 'Firebase', 'SQLite'],
  },
  {
    title: 'Tools & Frameworks',
    skills: ['Flutter', 'JavaFX', 'JUnit', 'After Effects', 'Premiere Pro'],
  },
  {
    title: 'Core CS Subjects',
    skills: ['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'OS', 'Computer Networks', 'Embedded Systems', 'Compiler Design'],
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--bg-card)' }}>
      <div className="container">
        <p className="section-label">What I know</p>
        <h2 className="section-title">Technical Skills</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {skillGroups.map(group => (
            <div key={group.title}>
              {/* Group title */}
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                {group.title}
              </p>

              {/* Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '6px 16px',
                      fontSize: '14px',
                      color: 'var(--text)',
                      fontWeight: 400,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
