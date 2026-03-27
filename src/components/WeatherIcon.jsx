import React from 'react'

const iconStyles = {
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

// Animated SVG weather icons
export function WeatherIcon({ type, size = 48, style = {} }) {
  const s = size
  const stroke = Math.max(1.2, size / 36)

  const icons = {
    sun: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" style={{ animation: 'float 4s ease-in-out infinite', ...style }}>
        <circle cx="24" cy="24" r="9" fill="#FBBF24" opacity="0.9"/>
        <circle cx="24" cy="24" r="9" stroke="#F59E0B" strokeWidth={stroke}/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <line key={i}
            x1={24 + 13 * Math.cos(deg * Math.PI/180)}
            y1={24 + 13 * Math.sin(deg * Math.PI/180)}
            x2={24 + 18 * Math.cos(deg * Math.PI/180)}
            y2={24 + 18 * Math.sin(deg * Math.PI/180)}
            stroke="#F59E0B" strokeWidth={stroke} strokeLinecap="round"
          />
        ))}
      </svg>
    ),

    'cloud-sun': (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" style={{ animation: 'float 4s ease-in-out infinite', ...style }}>
        <circle cx="30" cy="16" r="7" fill="#FBBF24" opacity="0.8"/>
        <circle cx="30" cy="16" r="7" stroke="#F59E0B" strokeWidth={stroke}/>
        {[0,60,120,180,240,300].map((deg, i) => (
          <line key={i}
            x1={30 + 10 * Math.cos(deg * Math.PI/180)}
            y1={16 + 10 * Math.sin(deg * Math.PI/180)}
            x2={30 + 14 * Math.cos(deg * Math.PI/180)}
            y2={16 + 14 * Math.sin(deg * Math.PI/180)}
            stroke="#F59E0B" strokeWidth={stroke} strokeLinecap="round"
          />
        ))}
        <path d="M8 33a8 8 0 0 1 8-8 7 7 0 0 1 13.5-2.5A6 6 0 1 1 34 34H10a6 6 0 0 1-2-1z"
          fill="white" stroke="#CBD5E1" strokeWidth={stroke} strokeLinejoin="round"/>
      </svg>
    ),

    cloud: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" style={{ animation: 'float 5s ease-in-out infinite', ...style }}>
        <path d="M10 32a8 8 0 0 1 8-8 9 9 0 0 1 17.5-3A7 7 0 1 1 37 35H12a6 6 0 0 1-2-3z"
          fill="white" stroke="#CBD5E1" strokeWidth={stroke} strokeLinejoin="round"/>
      </svg>
    ),

    'cloud-rain': (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" style={{ animation: 'float 4s ease-in-out infinite', ...style }}>
        <path d="M8 26a8 8 0 0 1 8-8 9 9 0 0 1 17.5-3A7 7 0 1 1 35 29H10a5.97 5.97 0 0 1-2-3z"
          fill="white" stroke="#CBD5E1" strokeWidth={stroke} strokeLinejoin="round"/>
        {[[15,35,13,41],[22,35,20,41],[29,35,27,41],[36,35,34,41]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#60A5FA" strokeWidth={stroke} strokeLinecap="round"
            style={{ animationDelay: `${i * 0.15}s` }}/>
        ))}
      </svg>
    ),

    'cloud-drizzle': (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" style={{ animation: 'float 4s ease-in-out infinite', ...style }}>
        <path d="M8 24a8 8 0 0 1 8-8 9 9 0 0 1 17.5-3A7 7 0 1 1 35 27H10a5.97 5.97 0 0 1-2-3z"
          fill="white" stroke="#CBD5E1" strokeWidth={stroke} strokeLinejoin="round"/>
        {[[15,33,17,39],[22,33,24,39],[29,33,31,39]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#93C5FD" strokeWidth={stroke} strokeLinecap="round"/>
        ))}
      </svg>
    ),

    'cloud-snow': (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" style={{ animation: 'float 5s ease-in-out infinite', ...style }}>
        <path d="M8 26a8 8 0 0 1 8-8 9 9 0 0 1 17.5-3A7 7 0 1 1 35 29H10a5.97 5.97 0 0 1-2-3z"
          fill="white" stroke="#CBD5E1" strokeWidth={stroke} strokeLinejoin="round"/>
        {[14,21,28,35].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={38} r={2} fill="#BAE6FD"/>
            <circle cx={x} cy={44} r={1.5} fill="#BAE6FD" opacity="0.6"/>
          </g>
        ))}
      </svg>
    ),

    'cloud-lightning': (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" style={{ animation: 'float 3s ease-in-out infinite', ...style }}>
        <path d="M8 24a8 8 0 0 1 8-8 9 9 0 0 1 17.5-3A7 7 0 1 1 35 27H10a5.97 5.97 0 0 1-2-3z"
          fill="#94A3B8" stroke="#64748B" strokeWidth={stroke} strokeLinejoin="round"/>
        <path d="M27 30L21 39h6l-4 9 10-13h-6l4-5z"
          fill="#FDE047" stroke="#EAB308" strokeWidth={0.5} strokeLinejoin="round"/>
      </svg>
    ),

    moon: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" style={{ animation: 'float 6s ease-in-out infinite', ...style }}>
        <path d="M32 24a14 14 0 1 1-14-14 10 10 0 0 0 14 14z"
          fill="#E2E8F0" stroke="#CBD5E1" strokeWidth={stroke} strokeLinejoin="round"/>
        <circle cx="30" cy="14" r="2" fill="#F1F5F9" opacity="0.6"/>
        <circle cx="35" cy="20" r="1.5" fill="#F1F5F9" opacity="0.4"/>
      </svg>
    ),
  }

  return (
    <span style={iconStyles.wrapper}>
      {icons[type] || icons['cloud']}
    </span>
  )
}
