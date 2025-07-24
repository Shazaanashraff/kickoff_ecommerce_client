import React, { useEffect, useRef } from 'react';
import heroVideo from '../../../assets/hero.mp4';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import YamalImg from '../../../assets/Yamal.jpg';
import WomanCacImg from '../../../assets/woman-cac.jpeg';
import TravisImg from '../../../assets/Travis.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  const textRef = useRef(null);
  const belowRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    const below = belowRef.current;
    if (text && below) {
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
      gsap.to(below, {
        y: '-50%',
        ease: 'none',
        scrollTrigger: {
          trigger: below,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
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
      {/* Below Section Placeholder */}
      <div
  ref={belowRef}
  className="relative z-20 min-h-screen w-full bg-white px-4 py-12 md:px-16"
>
  {/* Product Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
    {/* Left Product Section */}
    <div className="flex flex-col justify-between h-full">
      {/* Top: Two products horizontally */}
      <div className="flex flex-row gap-6">
        <Link to="/product/1" className="bg-white p-0 max-w-xs w-full flex-1 flex flex-col justify-end group cursor-pointer">
          <div className="w-full aspect-[3/4] h-72 flex items-center justify-center overflow-hidden">
            <img src={YamalImg} alt="Yamal Shirt" className="w-full h-full object-cover mb-4" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-dark-gray group-hover:underline">FC Barcelona X Cactus Jack Mens Jersey</h3>
            <p className="text-sm text-medium-gray">Rs 69,917</p>
          </div>
        </Link>
        <Link to="/product/2" className="bg-white p-0 max-w-xs w-full flex-1 flex flex-col justify-end group cursor-pointer">
          <div className="w-full aspect-[3/4] h-72 flex items-center justify-center overflow-hidden">
            <img src={WomanCacImg} alt="Fisherman Pants" className="w-full h-full object-cover mb-4" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-dark-gray group-hover:underline">FC Barcelona X Cactus Jack Womens Jersey</h3>
            <p className="text-sm text-medium-gray">Rs 83,410</p>
          </div>
        </Link>
      </div>
      {/* Bottom: Text fills the gap below */}
      <div className="mt-8 max-w-full bg-white p-6">
    <h2 className="text-2xl md:text-3xl font-semibold text-dark-gray mb-4">FC Barcelona X Cactus Jack</h2>
        <p className="text-base text-medium-gray leading-relaxed mb-6">
          Featuring the "Cactus Jack" logo. The jersey, Which retains the traditional Blaugrana design, Incoporates distinctive visual elements from Travis Scott's creative universe and will be available for purchase
        </p>
        <a href="#" className="inline-block text-dark-gray text-lg font-medium underline underline-offset-4 hover:text-medium-gray transition-colors duration-200">
          SHOP COLLECTION
        </a>
      </div>
    </div>

    {/* Right Pattern Illustration */}
    <div className="flex items-stretch h-full">
      <img src={TravisImg} alt="Kratom Print Pattern" className="w-full h-full object-cover" />
    </div>
  </div>
</div>

    </div>
  );
};

export default Hero;
