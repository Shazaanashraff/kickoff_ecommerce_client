import React, { useRef, useEffect, useState } from "react";


const gradientTextStyle = {
  color: "#525252", // Tailwind neutral-600
  fontWeight: 700,
  fontSize: "7vw",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  display: "inline-block",
  lineHeight: 1,
  transition: "color 0.2s",
};


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

const marqueeContent = (
  <span style={{ display: "flex", alignItems: "center" }}>
    <span style={gradientTextStyle}>Kickoff</span>
    <span className="dot"></span>
    <span style={gradientTextStyle}>Kickoff</span>
    <span className="dot"></span>
    <span style={gradientTextStyle}>Kickoff</span>
    <span className="dot"></span>
  </span>
);

const InfiniteScroller = () => {
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const speed = 100; // px/sec

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

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
        }}
      >
        <div ref={contentRef} style={{ display: "flex" }}>{marqueeContent}</div>
        <div style={{ display: "flex" }}>{marqueeContent}</div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${contentWidth}px); }
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
