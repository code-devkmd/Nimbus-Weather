# 🌤 Nimbus — Weather App

A clean, minimalist weather app built with **React + Vite**.

## Features
- 🌡 **Real-time weather** via Open-Meteo API (no API key required)
- 🔍 City search with quick-pick suggestions
- ⏱ Hourly forecast strip
- 📅 7-day forecast with temperature range bars
- 🌙 Dark / Light mode toggle
- 🎨 Dynamic background gradient that changes with weather conditions
- 💨 Animated SVG weather icons
- 📱 Fully responsive

## Tech Stack
- React 18
- Vite 5
- Lucide React (icons)
- Open-Meteo API (free, no key needed)
- Open-Meteo Geocoding API

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Then open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── components/
│   ├── WeatherIcon.jsx     # Animated SVG weather icons
│   ├── SearchBar.jsx       # Search input + city suggestions
│   ├── CurrentWeather.jsx  # Main weather display
│   ├── HourlyForecast.jsx  # Hourly strip
│   ├── DailyForecast.jsx   # 7-day forecast
│   └── SkeletonLoader.jsx  # Loading skeleton
├── hooks/
│   └── useWeather.js       # Data fetching + WMO code mapping
├── App.jsx                 # Root layout, theme, background
├── main.jsx                # Entry point
└── index.css               # Global styles, CSS variables, animations
```

## Customization

- **Theme colors** — edit CSS variables in `src/index.css`
- **Default city** — change `fetchWeather('London')` in `App.jsx`
- **Quick suggestions** — edit the array in `SearchBar.jsx`
"# Nimbus-Weather" 
