'use client'

export default function Landing() {
  return (
    <main
      style={{
        height: '100svh',
        display: 'grid',
        placeItems: 'center',
        padding: 'clamp(16px, 3vw, 36px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 780,
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          alignItems: 'center',
          gap: 'clamp(14px, 3vh, 22px)',
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 'clamp(22px, 4vw, 34px)',
              fontWeight: 500, // medium weight
              letterSpacing: -0.4,
            }}
          >
            Fund<span style={{ color: '#6741ff' }}>U</span>
          </div>
        </div>

        {/* Video */}
        <div
          style={{
            width: '80%',
margin: '0 auto',
            borderRadius: 24,
            overflow: 'hidden',
            background: '#000',
            boxShadow: '0 16px 52px rgba(0,0,0,0.18)',
          }}
        >
          <video
            src="https://add5n0anh5ufktpp.public.blob.vercel-storage.com/demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            style={{
              width: '105%',
              height: '105%',
              display: 'block',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        </div>

        {/* Copy + CTA */}
        <div style={{ textAlign: 'center', display: 'grid', gap: 10 }}>
          <div style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 700 }}>
            AI-powered fundraising assistant for startups & student organizations.
          </div>
 <div style={{ opacity: 0.7, fontSize: 'clamp(13px, 1.8vw, 16px)' }}>
            Watch the demo. Join early access to help shape the platform.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a
              href="mailto:info@funduhub.com?subject=FundU%20Early%20Access"
              style={{
                textDecoration: 'none',
                padding: '12px 20px',
                borderRadius: 14,
                background: '#6741ff',
                color: '#fff',
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              Request Early Access
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
