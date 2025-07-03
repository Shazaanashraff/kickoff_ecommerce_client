import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hero from '../../assets/hero.jpg';
import sampleVideo from '../../assets/sample.mp4';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef();
  const heroRef = useRef();
  const textRef = useRef();
  const videoRef = useRef();
  const heroImageRef = useRef();
  const videoFrameRef = useRef();
  const showreelRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(textRef.current, {
        y: '-15vh',
        ease: 'power2.inOut',
      }, 0);

      tl.to(textRef.current.querySelector('h2'), {
        fontSize: '8vw',
        ease: 'power2.inOut',
      }, 0.2);

      tl.to(heroImageRef.current, {
        scale: 0.7,
        ease: 'power2.inOut'
      }, 0.05);

      tl.to(showreelRef.current, {
        y: '-5vh',
        scale: 0.5,
        opacity: 0,
        ease: 'power2.inOut',
      }, 0);

      tl.fromTo(
        videoFrameRef.current,
        { scale: 0.2, y: '0vh' },
        { scale: 1.2, y: '-5vh', ease: 'power2.inOut' },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] overflow-hidden">
      {/* Hero Cloth */}
      <div ref={heroRef} className="absolute top-0 left-0 w-full h-screen z-10">
        <div ref={heroImageRef} className="w-full h-full overflow-hidden">
          <img src={hero} alt="Hero" className="w-full h-full object-cover transition-transform duration-500" />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              From Paper to Production, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                we breathe life to your vision.
              </span>
            </h1>
            <p className="text-lg">No drama, just quality production — unless you want cinematic drama.</p>
          </div>
        </div>
      </div>

      {/* Text Cloth (SHOWREEL Section) */}
      <div
        ref={textRef}
        className="absolute top-0 left-0 w-full h-screen flex items-start justify-center translate-y-full z-20"
      >
        {/* Top gradient fade */}
        <div
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{
            height: '18vh',
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)',
            zIndex: 10,
          }}
        />
        {/* Solid black below the gradient */}
        <div
          className="absolute left-0 w-full"
          style={{
            top: '18vh',
            height: 'calc(100% - 18vh)',
            background: 'black',
            zIndex: 5,
          }}
        />
        <h2
          className="uppercase font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-gray-400 text-[32vw] text-center leading-none whitespace-nowrap mt-[18vh] relative z-20"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '-0.04em',
          }}
        >
          SHOWREEL
        </h2>
      </div>

      {/* Video Cloth */}
      <div
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-screen bg-transparent flex items-center justify-center translate-y-full z-30"
      >
        <div
          ref={videoFrameRef}
          className="w-[80vw] max-w-[1000px] aspect-video overflow-hidden rounded-3xl shadow-2xl will-change-transform"
        >
          <video
            src={sampleVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
