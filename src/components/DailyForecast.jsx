import React from 'react'
import { WeatherIcon } from './WeatherIcon'
import { getCondition } from '../hooks/useWeather'
import { Droplets } from 'lucide-react'

export function DailyForecast({ forecast }) {
  const max = Math.max(...forecast.map(d => d.high))
  const min = Math.min(...forecast.map(d => d.low))
  const range = max - min || 1

  return (
    <div style={{ animation: 'fadeUp 0.5s 0.2s ease both', opacity: 0, animationFillMode: 'forwards' }}>
      <p style={{
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        7-Day Forecast
      </p>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
      }}>
        {forecast.map((day, i) => {
          const cond = getCondition(day.code)
          const barStart = ((day.low - min) / range) * 100
          const barWidth = ((day.high - day.low) / range) * 100

          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '70px 28px 1fr auto',
              alignItems: 'center',
              gap: 12,
              padding: '13px 18px',
              borderBottom: i < forecast.length - 1 ? '1px solid var(--border)' : 'none',
              animation: `fadeUp 0.4s ${i * 0.04}s ease both`,
              animationFillMode: 'forwards',
              opacity: 0,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              {/* Day */}
              <span style={{
                fontSize: 13,
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? 'var(--accent)' : 'var(--text-primary)',
                letterSpacing: '0.01em',
              }}>
                {day.day}
              </span>

              {/* Icon */}
              <WeatherIcon type={cond.icon} size={22} />

              {/* Temp bar */}
              <div style={{ position: 'relative', height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute',
                  left: `${barStart}%`,
                  width: `${barWidth || 4}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #60A5FA, #FBBF24)',
                  borderRadius: 2,
                }} />
              </div>

              {/* Temps */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-display)' }}>
                  {day.low}°
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                  {day.high}°
                </span>
                {day.precip > 20 && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, color: '#60A5FA' }}>
                    <Droplets size={9} /> {day.precip}%
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
