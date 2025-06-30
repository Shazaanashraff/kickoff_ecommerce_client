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

      // Text layer slides up to cover hero
      tl.to(textRef.current, {
        y: '0%',
        ease: 'power2.inOut',
      }, 0);

      // Shrink hero image slightly more
      tl.to(heroImageRef.current, {
        scale: 0.8,
        ease: 'power2.inOut'
      }, 0.05);

      // Text scales in
      tl.fromTo(textRef.current.querySelector('h2'),
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Video layer slides up to cover text
      tl.to(videoRef.current, {
        y: '0%',
        ease: 'power2.inOut',
      }, 0.5);
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
            <h1 className="text-4xl md:text-6xl font-bold">From Paper to Production, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                we breathe life to your vision.
              </span>
            </h1>
            <p className="text-lg">No drama, just quality production — unless you want cinematic drama.</p>
          </div>
        </div>
      </div>

      {/* Text Cloth */}
<div
  ref={textRef}
  className="absolute top-0 left-0 w-full h-screen bg-black flex items-start justify-center translate-y-full z-20"
>
  <h2
    className="uppercase font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-gray-400 text-[clamp(16rem,38vw,28rem)] text-center pt-0 mt-[-6vh] leading-none"
    style={{
      fontFamily: 'Bebas Neue, sans-serif',
      width: '100%',
    }}
  >
    INNOVATIVE
  </h2>
</div>



      {/* Video Cloth */}
      <div
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-screen bg-black flex items-center justify-center translate-y-full z-30"
      >
        <div className="w-[80vw] max-w-[1000px] aspect-video overflow-hidden rounded-3xl shadow-2xl">
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
