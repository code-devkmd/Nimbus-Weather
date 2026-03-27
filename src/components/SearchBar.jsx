import React, { useState, useRef } from 'react'
import { Search, MapPin, X } from 'lucide-react'

export function SearchBar({ onSearch, loading }) {
  const [val, setVal] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (val.trim()) onSearch(val.trim())
  }

  const clear = () => { setVal(''); inputRef.current?.focus() }

  const suggestions = ['New Delhi', 'Tokyo', 'New York', 'London', 'Paris', 'Sydney']

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--surface)',
          border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          boxShadow: focused ? '0 0 0 3px var(--accent-soft)' : 'var(--shadow-sm)',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(12px)',
        }}>
          <Search size={16} color="var(--text-secondary)" strokeWidth={2.2} style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={val}
            onChange={e => setVal(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search city…"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--text-primary)',
              letterSpacing: '0.01em',
            }}
          />
          {val && (
            <button onClick={clear} type="button" style={{
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              borderRadius: 4,
              transition: 'color 0.15s',
            }}>
              <X size={14} />
            </button>
          )}
          <button type="submit" disabled={loading || !val.trim()} style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            opacity: loading || !val.trim() ? 0.5 : 1,
            transition: 'opacity 0.2s, transform 0.1s',
            letterSpacing: '0.03em',
            flexShrink: 0,
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.currentTarget.style.transform = ''}
          >
            {loading ? '…' : 'Go'}
          </button>
        </div>
      </form>

      {/* Quick suggestions */}
      <div style={{
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        marginTop: 10,
      }}>
        {suggestions.map(s => (
          <button key={s} onClick={() => { setVal(s); onSearch(s) }} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 100,
            padding: '4px 11px',
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <MapPin size={9} /> {s}
          </button>
        ))}
      </div>
    </div>
  )
}
