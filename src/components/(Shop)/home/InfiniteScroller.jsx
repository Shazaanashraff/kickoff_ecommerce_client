import React, { useRef, useEffect, useState } from "react";

const gradientTextClass =
  "marquee-text text-neutral-600 font-bold uppercase inline-block leading-none transition-colors duration-200";

const dotClass =
  "inline-block bg-yellow-300 rounded-full mx-[2vw]";

const fadeMaskStyle = {
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 2,
  background: "linear-gradient(90deg, transparent 0%, transparent 10%, transparent 90%, transparent 100%)",
};

const MarqueeContent = () => (
  <span className="flex items-center">
    <span className={gradientTextClass}>Kickoff</span>
    <span className={dotClass} style={{ width: '1vw', height: '1vw' }}></span>
    <span className={gradientTextClass}>Store</span>
    <span className={dotClass} style={{ width: '1vw', height: '1vw' }}></span>
    <span className={gradientTextClass}>Kickoff</span>
    <span className={dotClass} style={{ width: '1vw', height: '1vw' }}></span>
  </span>
);

const InfiniteScroller = () => {
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [ready, setReady] = useState(false);
  const speed = 100; // px/sec

  // Recalculate width on resize and font size change
  useEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    };
    measure();
    setReady(false);
    window.addEventListener('resize', measure);
    // Listen for font size changes (e.g., orientationchange, zoom)
    const fontResize = setInterval(measure, 500);
    return () => {
      window.removeEventListener('resize', measure);
      clearInterval(fontResize);
    };
  }, []);

  // Fade in after width is measured
  useEffect(() => {
    if (contentWidth > 0) {
      setTimeout(() => setReady(true), 50);
    }
  }, [contentWidth]);

  // Animation duration based on content width
  const duration = contentWidth ? contentWidth / speed : 10;

  return (
    <div
      style={{
        width: "100vw",
        overflow: "hidden",
        background: "none",
        padding: "2vw 0",
        position: "relative",
      }}
    >
      <div style={fadeMaskStyle} />
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          willChange: "transform",
          animation: contentWidth
            ? `marquee ${duration}s linear infinite`
            : "none",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <div ref={contentRef} style={{ display: "flex" }}><MarqueeContent /></div>
        <div style={{ display: "flex" }}><MarqueeContent /></div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${contentWidth}px); }
        }
        .marquee-text {
          font-size: 7vw;
        }
        @media (max-width: 600px) {
          .marquee-text {
            font-size: 12vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InfiniteScroller;
