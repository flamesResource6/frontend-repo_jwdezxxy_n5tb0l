import React from 'react'

export default function PaletteProvider({ children }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-soft)',
      color: 'var(--text-primary)'
    }}>
      {children}
    </div>
  )
}
