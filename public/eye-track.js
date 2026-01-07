(() => {
  const svgObj = document.getElementById("funduLogo");
  const motionBtn = document.getElementById("motionBtn");
  let usingMotion = false;

  if (!svgObj || !motionBtn) return;

  // Helpers
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function init() {
    const svg = svgObj.contentDocument?.documentElement;
    if (!svg) return false;

    // Grab your pupils by Illustrator IDs
    const L = svg.getElementById("LEye");
    const R = svg.getElementById("REye");
    if (!L || !R) {
      console.warn("LEye/REye not found in SVG");
      return true; // init ran; IDs are the issue if this logs
    }

    function makeMover(node) {
      const tag = node.tagName.toLowerCase();

      if (tag === "circle") {
        const base = {
          cx: parseFloat(node.getAttribute("cx") || "0"),
          cy: parseFloat(node.getAttribute("cy") || "0"),
          r: parseFloat(node.getAttribute("r") || "0"),
        };
        return function move(dx, dy) {
          const vb = svg.viewBox.baseVal || {
            width: svg.clientWidth,
            height: svg.clientHeight,
          };
          const travel =
            vb.width *
              (parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--pupil-travel-pct"
                )
              ) /
                100) ||
            vb.width * 0.018;

          node.setAttribute("cx", base.cx + clamp(dx, -1, 1) * travel);
          node.setAttribute("cy", base.cy + clamp(dy, -1, 1) * travel);
        };
      } else {
        const baseT = node.getAttribute("transform") || "";
        return function move(dx, dy) {
          const vb = svg.viewBox.baseVal || {
            width: svg.clientWidth,
            height: svg.clientHeight,
          };
          const travel =
            vb.width *
              (parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--pupil-travel-pct"
                )
              ) /
                100) ||
            vb.width * 0.018;

          const x = clamp(dx, -1, 1) * travel;
          const y = clamp(dy, -1, 1) * travel;
          node.setAttribute("transform", `${baseT} translate(${x} ${y})`);
        };
      }
    }

    const moveL = makeMover(L);
    const moveR = makeMover(R);

    function applyLook(dx, dy) {
      moveL(dx, dy);
      moveR(dx, dy);
    }

    // Mouse tracking
    function onMouseMove(e) {
      const rect = svgObj.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      applyLook(dx, dy);
    }

    // Device tilt
    function onTilt(evt) {
      const gamma = (evt.gamma || 0) / 30; // left-right
      const beta = (evt.beta || 0) / 40; // front-back
      applyLook(gamma, beta);
    }

    function enableMotion() {
      const D = window.DeviceOrientationEvent;
      if (D && typeof D.requestPermission === "function") {
        // iOS 13+
        D.requestPermission()
          .then((state) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", onTilt, true);
              usingMotion = true;
              motionBtn.hidden = true;
            }
          })
          .catch(() => {});
      } else if ("ondeviceorientation" in window || D) {
        // Other mobile browsers
        window.addEventListener("deviceorientation", onTilt, true);
        usingMotion = true;
        motionBtn.hidden = true;
      }
    }

    // === Only show motion button on mobile/tablet with sensors (and HTTPS) ===
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const supportsMotion =
      "DeviceOrientationEvent" in window || "ondeviceorientation" in window;
    const isSecure = window.isSecureContext === true;

    if (!isDesktop && supportsMotion && isSecure) {
      motionBtn.hidden = false;
      motionBtn.addEventListener("click", enableMotion);
    } else {
      motionBtn.hidden = true; // keep hidden on desktop or unsupported
    }

    // Keep mouse fallback active when motion isn't in use
    window.addEventListener("mousemove", (e) => {
      if (!usingMotion) onMouseMove(e);
    });

    applyLook(0, 0); // center on load
    return true;
  }

  // If the SVG already loaded before we attached the listener, init now.
  // Otherwise wait for the object's load event.
  if (!init()) {
    svgObj.addEventListener("load", () => init(), { once: true });
  }
})();
