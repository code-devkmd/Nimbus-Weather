import React, { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { SearchBar } from './components/SearchBar'
import { CurrentWeather } from './components/CurrentWeather'
import { HourlyForecast } from './components/HourlyForecast'
import { DailyForecast } from './components/DailyForecast'
import { SkeletonLoader } from './components/SkeletonLoader'
import { useWeather } from './hooks/useWeather'

// Dynamic background gradient per weather condition
function getBg(code, isNight) {
  if (isNight) return 'linear-gradient(135deg, #0c0e1a 0%, #111827 50%, #0c1220 100%)'
  if (!code && code !== 0) return 'linear-gradient(135deg, #dbeafe 0%, #f0f4ff 50%, #e0f2fe 100%)'
  if ([0,1].includes(code)) return 'linear-gradient(135deg, #dbeafe 0%, #fef9c3 60%, #fde68a 100%)'
  if ([2,3,45,48].includes(code)) return 'linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 60%, #dde4ed 100%)'
  if ([51,53,55,61,63,65,80,81,82].includes(code)) return 'linear-gradient(135deg, #bfdbfe 0%, #dde8f5 60%, #c7d7ea 100%)'
  if ([71,73,75].includes(code)) return 'linear-gradient(135deg, #e8f0fb 0%, #f8fafc 60%, #dde7f5 100%)'
  if ([95,96,99].includes(code)) return 'linear-gradient(135deg, #c7c9ce 0%, #9ca3af 50%, #6b7280 100%)'
  return 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)'
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const { data, loading, error, fetchWeather } = useWeather()

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'night' : '')
  }, [darkMode])

  // Load default city
  useEffect(() => {
    fetchWeather('London')
  }, [])

  const bgGradient = data ? getBg(data.code, data.isNight || darkMode) : getBg(null, darkMode)

  return (
    <div style={{
      minHeight: '100vh',
      background: bgGradient,
      transition: 'background 1s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '32px 16px 60px',
    }}>
      {/* Subtle noise texture overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Main panel */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 440,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}>

        {/* Top bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 22,
              fontWeight: 400,
              color: darkMode ? '#f1f5f9' : '#0f1117',
              letterSpacing: '-0.01em',
            }}>
              Nimbus
            </h1>
            <p style={{ fontSize: 11, color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Weather
            </p>
          </div>
          <button
            onClick={() => setDarkMode(d => !d)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
              border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            {darkMode
              ? <Sun size={15} color="#FBBF24" strokeWidth={2.2} />
              : <Moon size={15} color="#374151" strokeWidth={2.2} />
            }
          </button>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 24 }}>
          <SearchBar onSearch={fetchWeather} loading={loading} />
        </div>

        {/* Content card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '28px 24px',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}>

          {/* Loading */}
          {loading && <SkeletonLoader />}

          {/* Error */}
          {!loading && error && (
            <div style={{
              textAlign: 'center',
              padding: '40px 0',
              animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
              <p style={{ fontWeight: 600, marginBottom: 6 }}>{error}</p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Try another city name.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && !data && (
            <div style={{
              textAlign: 'center',
              padding: '48px 0',
              animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌤</div>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.2rem', marginBottom: 8 }}>
                Where to?
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Search for any city to see weather
              </p>
            </div>
          )}

          {/* Data */}
          {!loading && data && (
            <>
              <CurrentWeather data={data} />
              <HourlyForecast hourly={data.hourly} />
              <DailyForecast forecast={data.forecast} />
            </>
          )}
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontSize: 10,
          color: darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)',
          marginTop: 20,
          letterSpacing: '0.05em',
          fontWeight: 500,
        }}>
          Data from Open-Meteo · No API key required
        </p>
      </div>
    </div>
  )
}
