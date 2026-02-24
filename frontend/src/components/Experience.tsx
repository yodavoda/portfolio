// Experience.tsx
// Shows education timeline and key strengths.
// Simple timeline layout — no libraries needed.

import React from 'react'

const education = [
  {
    degree: 'B.Tech — Computer Science',
    institution: 'Manipal Institute of Technology',
    period: 'Sept 2022 – June 2026',
    detail: 'Coursework: DSA, OOP, DBMS, OS, Networks, Embedded Systems, Compiler Design',
  },
  {
    degree: 'CBSE Senior Secondary',
    institution: 'Bright Riders School, Abu Dhabi',
    period: 'Graduated 2022',
    detail: 'Score: 86.4%',
  },
]

const strengths = [
  { icon: '🧠', label: 'Problem Solving',     desc: 'Breaks down complex problems into clear, creative solutions.' },
  { icon: '🤝', label: 'Team Collaboration',  desc: 'Effective communicator who contributes actively to group goals.' },
  { icon: '⚡', label: 'Learning Agility',    desc: 'Quick to adapt and pick up new technologies in fast-changing environments.' },
  { icon: '🎨', label: 'Creativity',          desc: 'Designs intuitive interfaces balancing function and aesthetics.' },
]

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg-card)' }}>
      <div className="container">
        <p className="section-label">Background</p>
        <h2 className="section-title">Education</h2>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {education.map((edu, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '24px', paddingBottom: '40px' }}>

              {/* Timeline dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: '12px', height: '12px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  marginTop: '6px',
                }} />
                {idx < education.length - 1 && (
                  <div style={{ width: '1px', flexGrow: 1, background: 'var(--border)', marginTop: '8px' }} />
                )}
              </div>

              {/* Content */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', marginBottom: '4px' }}>
                  {edu.degree}
                </h3>
                <p style={{ color: 'var(--accent)', fontSize: '14px', marginBottom: '4px' }}>
                  {edu.institution}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>
                  {edu.period}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  {edu.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <h2 className="section-title" style={{ marginTop: '40px' }}>Key Strengths</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}>
          {strengths.map(s => (
            <div key={s.label} style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '20px',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{s.icon}</div>
              <h4 style={{ marginBottom: '6px', fontSize: '15px' }}>{s.label}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
