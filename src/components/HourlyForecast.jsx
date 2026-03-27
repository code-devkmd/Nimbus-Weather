import React from 'react'
import { WeatherIcon } from './WeatherIcon'
import { getCondition } from '../hooks/useWeather'

export function HourlyForecast({ hourly }) {
  return (
    <div style={{ animation: 'fadeUp 0.5s 0.1s ease both', opacity: 0, animationFillMode: 'forwards' }}>
      <p style={{
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        Hourly
      </p>
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 4,
        scrollbarWidth: 'none',
      }}>
        {hourly.map((h, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '12px 14px',
            background: i === 0 ? 'var(--accent)' : 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            minWidth: 64,
            flexShrink: 0,
            backdropFilter: 'blur(12px)',
            transition: 'all 0.15s',
            animation: `fadeUp 0.4s ${i * 0.05}s ease both`,
            animationFillMode: 'forwards',
            opacity: 0,
          }}
          onMouseEnter={e => { if (i > 0) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' } }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = '' }}
          >
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: i === 0 ? 'rgba(255,255,255,0.85)' : 'var(--text-tertiary)',
              textTransform: 'uppercase',
            }}>
              {i === 0 ? 'Now' : h.time}
            </span>
            <WeatherIcon type={getCondition(h.code).icon} size={24} />
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: i === 0 ? 'white' : 'var(--text-primary)',
            }}>
              {h.temp}°
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
