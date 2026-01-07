"use client";

import { useEffect, useRef, useState } from "react";

export default function Landing() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [needsTapToPlay, setNeedsTapToPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const IOS_VIDEO_URL =
    "https://add5n0anh5ufktpp.public.blob.vercel-storage.com/demo_ios.mp4";

  const WEB_VIDEO_URL =
    "https://add5n0anh5ufktpp.public.blob.vercel-storage.com/demo_web.mp4";

  const [videoSrc, setVideoSrc] = useState(IOS_VIDEO_URL);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Always start muted for autoplay compatibility
    v.muted = true;
    setIsMuted(true);

    const tryAutoPlay = async () => {
      try {
        await v.play();
        setNeedsTapToPlay(false);
        setIsPlaying(true);
      } catch {
        setNeedsTapToPlay(true);
        setIsPlaying(false);
      }
    };

    const t = setTimeout(tryAutoPlay, 80);
    return () => clearTimeout(t);
  }, []);

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    const ua = navigator.userAgent || "";
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" &&
        (navigator as any).maxTouchPoints > 1);

    setVideoSrc(isIOS ? IOS_VIDEO_URL : WEB_VIDEO_URL);

    try {
      // iOS likes it when we ensure muted before starting
      v.muted = true;
      setIsMuted(true);

      await v.play();
      setNeedsTapToPlay(false);
      setIsPlaying(true);
    } catch {
      setNeedsTapToPlay(true);
      setIsPlaying(false);
    }
  };

  const handleToggleSound = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      // User gesture -> iOS will allow unmute now
      v.muted = !v.muted;
      v.volume = 1;
      setIsMuted(v.muted);

      // If it wasn't playing, start it
      if (v.paused) {
        await v.play();
        setIsPlaying(true);
      }
    } catch {
      // If iOS still blocks, keep muted
      v.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <main
      style={{
        height: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "clamp(16px, 3vw, 36px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 780,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          alignItems: "center",
          gap: "clamp(12px, 2.4vh, 18px)",
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "clamp(32px, 4vw, 34px)",
              fontWeight: 500,
              letterSpacing: -0.4,
            }}
          >
            Fund<span style={{ color: "#6741ff" }}>U</span>
          </div>
        </div>

        {/* Video (viewport-height constrained + centered) */}
        <div
          style={{
            width: "min(92vw, 520px)",
            justifySelf: "center",
            margin: "0 auto",
            borderRadius: 24,
            overflow: "hidden",
            background: "#000",
            boxShadow: "0 16px 52px rgba(0,0,0,0.18)",
            position: "relative",

            // Keeps it from being "wrong size" on short screens
            maxHeight: "calc(52svh, 420px)",
          }}
          onClick={needsTapToPlay ? handlePlay : undefined}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster="/demo-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{
              // Kill the “1px seam”
              width: "100%",
              height: "100%",
              marginLeft: "0%",
              marginTop: "-0.5%",
              display: "block",

              // Keep it cinematic; adjust if you prefer contain
              objectFit: "contain",
              backgroundColor: "#000",
              // Prevent pause/scrub
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          {/* Tap-to-play overlay (only if autoplay blocked) */}
          {needsTapToPlay && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePlay();
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                background: "rgba(0,0,0,0.28)",
                color: "#fff",
                fontWeight: 900,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Tap to play
            </button>
          )}

          {/* Sound toggle (iOS-safe: user controlled) */}
          {!needsTapToPlay && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleSound();
              }}
              style={{
                position: "absolute",
                right: 12,
                bottom: 12,
                padding: "10px 12px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(0,0,0,0.35)",
                color: "#fff",
                fontWeight: 800,
                cursor: "pointer",
                backdropFilter: "blur(6px)",
              }}
            >
              {isMuted ? "Tap for sound" : "Sound on"}
            </button>
          )}
        </div>

        {/* Copy + CTA */}
        <div style={{ textAlign: "center", display: "grid", gap: 10 }}>
          <div style={{ fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 700 }}>
            AI-powered fundraising assistant for startups & student
            organizations.
          </div>

          <div style={{ opacity: 0.7, fontSize: "clamp(13px, 1.8vw, 16px)" }}>
            Watch the demo. Join early access to help shape the platform.
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="mailto:info@funduhub.com?subject=FundU%20Early%20Access"
              style={{
                textDecoration: "none",
                padding: "12px 20px",
                borderRadius: 14,
                background: "#6741ff",
                color: "#fff",
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
  );
}
