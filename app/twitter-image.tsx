import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Free Gold IRA Calculators 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 52, fontWeight: 900, color: 'white', fontFamily: 'serif' }}>Au</span>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Free Gold IRA Calculators 2026
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.80)',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 800,
          }}
        >
          Project your retirement growth with precious metals. 6 free gold IRA calculators.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', '2026 Updated', 'Private', 'No Signup'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.30)',
                borderRadius: 100,
                padding: '8px 22px',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
