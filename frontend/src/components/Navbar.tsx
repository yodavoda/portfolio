// Navbar.tsx
// Fixed navigation bar at the top of the page.
// Clicking a link smoothly scrolls to that section.

import React, { useState, useEffect } from 'react'

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Chat',       href: '#chat' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  // Add a subtle background when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled ? 'rgba(15,15,15,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #2a2a2a' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <span style={{
        fontFamily: 'var(--font-head)',
        fontSize: '1.2rem',
        color: 'var(--accent)',
        letterSpacing: '0.5px',
      }}>
        SK
      </span>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
