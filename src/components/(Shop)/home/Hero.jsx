import React, { useEffect, useRef } from 'react';
import heroVideo from '../../../assets/Hero video/hero.mp4';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      gsap.to(text, {
        y: '-100%',
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: false,
        },
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Fixed Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          style={{ minHeight: '100vh', minWidth: '100vw' }}
        />
      </div>
      {/* Parallax Text Overlay */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-start justify-start min-h-screen px-2 md:px-8 pt-24 md:pt-32"
        style={{ background: 'rgba(255,255,255,0.0)' }}
      >
        <h1 className="text-2xl md:text-4xl font-bold leading-tight text-dark-gray mb-4 md:mb-6 max-w-xl text-left">
          WE CREATE EXPERT<br />
          JERSEYS FOR MASS<br />
          CUSTOMER SERVICE
        </h1>
        <p className="text-base md:text-lg text-medium-gray font-medium text-left">We work, You enjoy life.</p>
      </div>
    </div>
  );
};

export default Hero;
