// ChatWidget.tsx
// This is the AI chat section of the portfolio.
// It sends user messages to our Python backend (POST /chat)
// and displays the AI's replies in a clean chat UI.
//
// How it works:
//   1. User types a question and hits Enter or Send
//   2. We POST { message: "..." } to http://localhost:8000/chat
//   3. Backend calls OpenRouter AI with Sriram's resume as context
//   4. AI reply comes back and is displayed in the chat
//   5. Both messages are saved to SQLite by the backend

import React, { useState, useRef, useEffect } from 'react'

// Backend URL for deployed frontend (override in Vercel env vars).
const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-production-1c40.up.railway.app'

// TypeScript type for a single chat message
type Message = {
  role: 'user' | 'assistant'
  content: string
}

// Suggested questions shown as quick-tap buttons
const suggestions = [
  "What projects has Sriram built?",
  "What programming languages does Sriram know?",
  "Tell me about his internship experience",
  "What is Sriram studying?",
]

export default function ChatWidget() {
  const [messages, setMessages]   = useState<Message[]>([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const bottomRef                 = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Send a message to the backend
  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      })

      if (!response.ok) {
        let message = `Server error: ${response.status}`
        try {
          const errorBody = await response.json()
          if (typeof errorBody?.detail === 'string') {
            message = errorBody.detail
          }
        } catch {
          // Ignore JSON parse failures and use status-based fallback
        }
        throw new Error(message)
      }

      const data = await response.json()
      const aiMessage: Message = { role: 'assistant', content: data.reply }
      setMessages(prev => [...prev, aiMessage])

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not reach the server. Make sure the backend is running on port 8000.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="chat">
      <div className="container">
        <p className="section-label">AI Powered</p>
        <h2 className="section-title">Ask Me Anything</h2>

        {/* Chat box */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          maxWidth: '720px',
        }}>

          {/* Chat header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 700, color: '#0f0f0f',
            }}>
              SK
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600 }}>Sriram's AI Assistant</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Powered by OpenRouter · Knows Sriram's resume</p>
            </div>
            {/* Online dot */}
            <div style={{
              marginLeft: 'auto',
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: '#4ade80',
            }} />
          </div>

          {/* Messages area */}
          <div style={{
            height: '400px',
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>

            {/* Welcome message if no chat yet */}
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                <p style={{ fontSize: '2rem', marginBottom: '12px' }}>✦</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px' }}>
                  Ask me anything about Sriram's background, skills, or projects.
                </p>
                {/* Suggestion chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        color: 'var(--text)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Render each message */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'var(--accent)'
                    : 'var(--bg)',
                  color: msg.role === 'user' ? '#0f0f0f' : 'var(--text)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', gap: '4px', padding: '4px 0' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    background: 'var(--text-muted)',
                    animation: `bounce 1s ease ${i * 0.15}s infinite`,
                  }} />
                ))}
              </div>
            )}

            {/* Error message */}
            {error && (
              <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center' }}>
                ⚠ {error}
              </p>
            )}

            {/* Invisible div to scroll into view */}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '10px',
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about Sriram's skills, projects, education..."
              style={{
                flexGrow: 1,
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px 16px',
                color: 'var(--text)',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? 'var(--bg-hover)' : 'var(--accent)',
                color: loading || !input.trim() ? 'var(--text-muted)' : '#0f0f0f',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                fontFamily: 'var(--font-body)',
              }}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Small footnote */}
        <p style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '12px' }}>
          This AI has been trained on Sriram's resume. Questions outside the resume will be politely redirected.
        </p>
      </div>

      {/* Bounce animation for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  )
}
