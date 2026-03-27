import React from 'react'

const skeletonBase = {
  background: 'linear-gradient(90deg, var(--border) 0%, var(--surface-hover) 50%, var(--border) 100%)',
  backgroundSize: '400px 100%',
  animation: 'shimmer 1.4s ease infinite',
  borderRadius: 8,
}

export function SkeletonLoader() {
  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Header skeleton */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ ...skeletonBase, height: 12, width: 120, marginBottom: 10 }} />
        <div style={{ ...skeletonBase, height: 36, width: 200, marginBottom: 6 }} />
        <div style={{ ...skeletonBase, height: 14, width: 80 }} />
      </div>

      {/* Temp skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ ...skeletonBase, height: 96, width: 180, borderRadius: 12 }} />
        <div style={{ ...skeletonBase, height: 96, width: 96, borderRadius: '50%' }} />
      </div>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }} />

      {/* Stats skeleton */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ ...skeletonBase, flex: 1, height: 72, borderRadius: 12 }} />
        ))}
      </div>

      {/* Hourly skeleton */}
      <div style={{ marginTop: 32 }}>
        <div style={{ ...skeletonBase, height: 12, width: 60, marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ ...skeletonBase, width: 64, height: 90, borderRadius: 12, flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* Daily skeleton */}
      <div style={{ marginTop: 32 }}>
        <div style={{ ...skeletonBase, height: 12, width: 100, marginBottom: 14 }} />
        <div style={{ ...skeletonBase, height: 350, borderRadius: 20 }} />
      </div>
    </div>
  )
}
