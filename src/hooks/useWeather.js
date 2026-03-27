import { useState, useCallback } from 'react'

const WMO_CODES = {
  0:  { label: 'Clear Sky',           icon: 'sun' },
  1:  { label: 'Mainly Clear',        icon: 'sun' },
  2:  { label: 'Partly Cloudy',       icon: 'cloud-sun' },
  3:  { label: 'Overcast',            icon: 'cloud' },
  45: { label: 'Foggy',               icon: 'cloud' },
  48: { label: 'Icy Fog',             icon: 'cloud' },
  51: { label: 'Light Drizzle',       icon: 'cloud-drizzle' },
  53: { label: 'Drizzle',             icon: 'cloud-drizzle' },
  55: { label: 'Heavy Drizzle',       icon: 'cloud-drizzle' },
  61: { label: 'Light Rain',          icon: 'cloud-rain' },
  63: { label: 'Rain',                icon: 'cloud-rain' },
  65: { label: 'Heavy Rain',          icon: 'cloud-rain' },
  71: { label: 'Light Snow',          icon: 'cloud-snow' },
  73: { label: 'Snow',                icon: 'cloud-snow' },
  75: { label: 'Heavy Snow',          icon: 'cloud-snow' },
  80: { label: 'Rain Showers',        icon: 'cloud-rain' },
  81: { label: 'Rain Showers',        icon: 'cloud-rain' },
  82: { label: 'Heavy Showers',       icon: 'cloud-rain' },
  95: { label: 'Thunderstorm',        icon: 'cloud-lightning' },
  96: { label: 'Thunderstorm + Hail', icon: 'cloud-lightning' },
  99: { label: 'Thunderstorm + Hail', icon: 'cloud-lightning' },
}

function getCondition(code) {
  return WMO_CODES[code] || { label: 'Unknown', icon: 'cloud' }
}

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export function useWeather() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const fetchWeather = useCallback(async (city) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      // 1. Geocode city → coords
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      )
      const geoJson = await geoRes.json()

      if (!geoJson.results?.length) {
        throw new Error(`City "${city}" not found.`)
      }

      const { latitude, longitude, name, country } = geoJson.results[0]

      // 2. Fetch weather
      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,visibility` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
        `&hourly=temperature_2m,weather_code` +
        `&wind_speed_unit=kmh&temperature_unit=celsius&forecast_days=7&timezone=auto`
      )
      const wJson = await wRes.json()

      const cur = wJson.current
      const daily = wJson.daily
      const hourly = wJson.hourly

      // Current hour index for hourly
      const now = new Date()
      const hIdx = hourly.time.findIndex(t => new Date(t) >= now)
      const hourlySlice = Array.from({ length: 6 }, (_, i) => {
        const idx = (hIdx + i) < hourly.time.length ? hIdx + i : hIdx
        return {
          time: new Date(hourly.time[idx]).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
          temp: Math.round(hourly.temperature_2m[idx]),
          code: hourly.weather_code[idx],
        }
      })

      const forecast = daily.time.map((t, i) => ({
        day: i === 0 ? 'Today' : DAYS[new Date(t).getDay()],
        high: Math.round(daily.temperature_2m_max[i]),
        low:  Math.round(daily.temperature_2m_min[i]),
        code: daily.weather_code[i],
        precip: daily.precipitation_probability_max[i],
      }))

      setData({
        city: name,
        country,
        temp: Math.round(cur.temperature_2m),
        feels: Math.round(cur.apparent_temperature),
        humidity: cur.relative_humidity_2m,
        wind: Math.round(cur.wind_speed_10m),
        precip: Math.round(cur.precipitation * 10) / 10,
        visibility: cur.visibility ? Math.round(cur.visibility / 1000) : null,
        code: cur.weather_code,
        condition: getCondition(cur.weather_code),
        forecast,
        hourly: hourlySlice,
        isNight: (() => {
          const h = now.getHours()
          return h >= 20 || h < 6
        })(),
      })
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchWeather }
}

export { getCondition }
