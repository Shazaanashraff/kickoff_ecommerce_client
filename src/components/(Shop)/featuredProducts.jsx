import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import realMadrid from "../../assets/realMadrid.jpg";
import shoe from "../../assets/womens.jpg";
import perfume from "../../assets/images.jpg";
import glass from "../../assets/womens.jpg";

gsap.registerPlugin(ScrollTrigger);

const featuredProducts = [
  {
    title: "Luxury Reimagined",
    brand: "Jetwing",
    image: realMadrid,
    gradient: "from-pink-300 via-pink-500 to-red-500",
  },
  {
    title: "Recharged All Day, Everyday",
    brand: "Nestle",
    image: perfume,
    gradient: "from-yellow-200 via-yellow-400 to-yellow-600",
  },
  {
    title: "Comfort in Style",
    brand: "Nike",
    image: shoe,
    gradient: "from-teal-200 via-teal-400 to-blue-500",
  },
  {
    title: "Fresh Morning Brew",
    brand: "Starbucks",
    image: glass,
    gradient: "from-green-200 via-green-400 to-green-700",
  },
  {
    title: "Walk in style",
    brand: "Addidas",
    image: realMadrid,
    gradient: "from-green-200 via-green-400 to-green-700",
  },
];

const FeaturedProducts = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  const cardWidth = 420; // px
  const leftOffset = window.innerWidth - cardWidth;

  useEffect(() => {
    const panels = gsap.utils.toArray(".panel");
    const cardWidthWithGap = cardWidth + 20;
    const totalScrollLength = (panels.length - 1) * cardWidthWithGap;

    const animation = gsap.to(horizontalRef.current, {
      x: -totalScrollLength,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalScrollLength}`,
        scrub: 3,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
      animation.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full overflow-hidden relative bg-black text-white"
      style={{ scrollbarWidth: "none" }}
    >
      <style>
        {`
          /* Hide scrollbars for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
      <div className="pl-6 md:pl-12 pt-16 pb-8">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-left tracking-normal text-white"
          style={{ fontFamily: 'Figtree, Arial, sans-serif' }}
        >
          Featured Products eggs in the basket
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-gray-400 text-left mt-2"
        >
          Our handpicked collection
        </motion.p>
      </div>

      <div
        ref={horizontalRef}
        className="flex hide-scrollbar"
        style={{
          height: "60vh",
          width: `calc(${featuredProducts.length} * ${cardWidth}px + ${leftOffset}px)`,
          gap: "20px",
          marginLeft: `${leftOffset}px`,
        }}
      >
        {featuredProducts.map((item, index) => (
          <motion.div
            key={index}
            className="panel flex-shrink-0 w-[400px] h-full rounded-3xl overflow-hidden relative shadow-2xl"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-3xl"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;