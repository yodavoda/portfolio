// Hero.tsx
// The first thing visitors see — full-screen intro section.
// Shows name, title, a short bio, and two call-to-action buttons.

import React from 'react'

export default function Hero() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(232,168,56,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container fade-up" style={{ width: '100%' }}>
        {/* Greeting tag */}
        <p className="section-label" style={{ marginBottom: '20px' }}>
          👋 Hello, I'm
        </p>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          lineHeight: 1.05,
          marginBottom: '16px',
          color: 'var(--text)',
        }}>
          Sriram<br />
          <span style={{ color: 'var(--accent)' }}>Karthik</span>
        </h1>

        {/* Title */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'var(--text-muted)',
          marginBottom: '24px',
          fontWeight: 300,
        }}>
          Computer Science Student · MIT Manipal · Class of 2026
        </p>

        {/* Bio */}
        <p style={{
          maxWidth: '520px',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '40px',
          lineHeight: 1.8,
        }}>
          I build things — from embedded security systems in ARM Assembly to
          cross-platform mobile apps in Flutter. Passionate about systems
          programming, software engineering, and turning ideas into working products.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              background: 'var(--accent)',
              color: '#0f0f0f',
              padding: '12px 28px',
              borderRadius: 'var(--radius)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View Projects
          </a>
          <a
            href="#chat"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '12px 28px',
              borderRadius: 'var(--radius)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            Chat with AI ✦
          </a>
        </div>
      </div>
    </section>
  )
}
