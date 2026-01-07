'use client'

import { useEffect, useRef, useState } from 'react'

export default function Landing() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [needsTap, setNeedsTap] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const tryPlay = async () => {
      try {
        await v.play()
        setNeedsTap(false)
      } catch {
        setNeedsTap(true)
      }
    }

    const t = setTimeout(tryPlay, 50)
    return () => clearTimeout(t)
  }, [])

  const handleStart = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      await v.play()
      setNeedsTap(false)
    } catch {
      setNeedsTap(true)
    }
  }

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
              fontWeight: 500,
              letterSpacing: -0.4,
            }}
          >
            Fund<span style={{ color: '#6741ff' }}>U</span>
          </div>
        </div>

        {/* Video */}
        <div
          style={{
            width: 'min(92vw, 520px)',
            margin: '0 auto',
            borderRadius: 24,
            overflow: 'hidden',
            background: '#000',
            boxShadow: '0 16px 52px rgba(0,0,0,0.18)',
            border: '2px solid #fff',
            position: 'relative',
          }}
          onClick={needsTap ? handleStart : undefined}
        >
          <video
            ref={videoRef}
            src="/demo.mp4"
            poster="/demo-poster.jpg"
            autoPlay
            muted={true}
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            onPlay={(e) => {
              const v = e.currentTarget
              v.muted = false
              v.volume = 1
            }}
            style={{
              width: '101%',
              height: '101%',
              marginLeft: '-0.5%',
              marginTop: '-0.5%',
              display: 'block',
              pointerEvents: needsTap ? 'auto' : 'none',
              userSelect: 'none',
            }}
          />

          {needsTap && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(0,0,0,0.25)',
                color: '#fff',
                fontWeight: 800,
                letterSpacing: 0.2,
              }}
            >
              Tap to play
            </div>
          )}
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
