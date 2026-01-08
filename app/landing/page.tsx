"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Landing() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const IOS_VIDEO_URL =
    "https://add5n0anh5ufktpp.public.blob.vercel-storage.com/demo_ios.mp4";
  const WEB_VIDEO_URL =
    "https://add5n0anh5ufktpp.public.blob.vercel-storage.com/demo_web.mp4";

  const [videoSrc, setVideoSrc] = useState(IOS_VIDEO_URL);
  const [needsTapToPlay, setNeedsTapToPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Pick the right encode once (iOS vs everything else)
    const ua = navigator.userAgent || "";
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" &&
        (navigator as any).maxTouchPoints > 1);

    setVideoSrc(isIOS ? IOS_VIDEO_URL : WEB_VIDEO_URL);

    // Start muted for autoplay compatibility
    v.muted = true;
    setIsMuted(true);

    const tryAutoPlay = async () => {
      try {
        await v.play();
        setNeedsTapToPlay(false);
      } catch {
        setNeedsTapToPlay(true);
      }
    };

    const t = setTimeout(tryAutoPlay, 80);
    return () => clearTimeout(t);
  }, []);

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = true;
      setIsMuted(true);
      await v.play();
      setNeedsTapToPlay(false);
    } catch {
      setNeedsTapToPlay(true);
    }
  };

  const handleToggleSound = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = !v.muted;
      v.volume = 1;
      setIsMuted(v.muted);
      if (v.paused) await v.play();
    } catch {
      v.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <main
      style={{
        minHeight: "100svh",
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
          gap: "clamp(12px, 2.4vh, 18px)",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        {/* Brand */}
        <div
          style={{
            fontSize: "clamp(32px, 5vw, 44px)",
            fontWeight: 500,
            letterSpacing: -0.4,
            lineHeight: 1,
          }}
        >
          Fund<span style={{ color: "#6741ff" }}>U</span>
        </div>

        {/* Video */}
        <div
          style={{
            width: "min(86%, 460px)", // avoids vw rounding overflow
            aspectRatio: "9 / 16", // stable sizing across devices
            maxHeight: "min(52svh, 460px)", // keeps it from getting too tall
            borderRadius: 24,
            overflow: "hidden",
            background: "#000",
            boxShadow: "0 16px 52px rgba(0,0,0,0.18)",
            position: "relative",
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster="/demo-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "contain",
              backgroundColor: "#fff",
              transform: "translateZ(0)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          {/* Tap-to-play overlay */}
          {needsTapToPlay && (
            <button
              type="button"
              onClick={handlePlay}
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

          {/* Sound toggle */}
          {!needsTapToPlay && (
            <button
              type="button"
              onClick={handleToggleSound}
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

        {/* Copy */}
        <div style={{ display: "grid", gap: 10 }}>
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
