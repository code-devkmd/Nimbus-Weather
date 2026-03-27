import React from 'react'
import { WeatherIcon } from './WeatherIcon'
import { Droplets, Wind, Eye, Thermometer } from 'lucide-react'

export function CurrentWeather({ data }) {
  const statStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '14px 20px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    backdropFilter: 'blur(12px)',
    flex: 1,
    minWidth: 0,
    transition: 'border-color 0.2s',
  }

  const stats = [
    { icon: <Droplets size={14} color="var(--accent)" strokeWidth={2.2}/>, label: 'Humidity', value: `${data.humidity}%` },
    { icon: <Wind size={14} color="var(--accent)" strokeWidth={2.2}/>, label: 'Wind', value: `${data.wind} km/h` },
    { icon: <Thermometer size={14} color="var(--accent)" strokeWidth={2.2}/>, label: 'Feels like', value: `${data.feels}°` },
    ...(data.visibility != null ? [{ icon: <Eye size={14} color="var(--accent)" strokeWidth={2.2}/>, label: 'Visibility', value: `${data.visibility} km` }] : []),
  ]

  return (
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      {/* Location */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 32,
      }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            Current Weather
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 400, fontFamily: 'var(--font-display)', fontStyle: 'italic', lineHeight: 1.1 }}>
            {data.city}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
            {data.country}
          </p>
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--text-tertiary)',
          textAlign: 'right',
          lineHeight: 1.5,
        }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          <br/>
          {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </div>
      </div>

      {/* Main temp display */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
          <span style={{
            fontSize: 'clamp(4rem, 12vw, 7rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            {data.temp}
          </span>
          <span style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'var(--text-secondary)',
            marginTop: 8,
            fontFamily: 'var(--font-display)',
          }}>°C</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <WeatherIcon type={data.isNight ? 'moon' : data.condition.icon} size={72} />
          <p style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            marginTop: 8,
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}>
            {data.condition.label}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }} />

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {stats.map(({ icon, label, value }) => (
          <div key={label} style={statStyle}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {icon}
            <span style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
              {value}
            </span>
            <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
