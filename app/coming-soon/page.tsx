"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ComingSoon() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/eye-track.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="coming-root">
      <div className="top">
        We’re building the Future of Crowdfunding.
      </div>

      <div className="logo-wrap">
        <object
          id="funduLogo"
          className="logo-obj"
          type="image/svg+xml"
          data="/penny_eye_tracking.svg"
          aria-label="FundU logo"
        />
      </div>

      {/* NEW: pulsing CTA under the eyes */}
      <div className="cta-wrap">
        <Link href="/landing" className="demo-btn" prefetch>
          View Demo
        </Link>
      </div>

      <div className="bottom">
        Fund<span className="u">U</span>
      </div>

      <button className="motion-btn" id="motionBtn" hidden>
        Enable device tilt
      </button>
    </div>
  );
}
