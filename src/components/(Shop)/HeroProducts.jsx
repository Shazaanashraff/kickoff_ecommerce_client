import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import jerseyFront from '../../assets/travis.jpg'; // Front image
import jerseyBack from '../../assets/yamal.jpg';   // Back image

const HeroProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-28 px-6 flex flex-col items-center">
      {/* Top horizontal line */}
      <div className="w-[80%] md:w-[60%] h-0.5 bg-zinc-700 rounded-full mb-12" />
      <motion.div
        className="max-w-7xl w-full text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[480px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Image Container */}
        <div className="relative md:w-1/2 w-full group overflow-hidden">
          <motion.img
            src={jerseyFront}
            alt="Travis Scott Jersey Front"
            className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <motion.img
            src={jerseyBack}
            alt="Travis Scott Jersey Back"
            className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 w-full p-12 flex flex-col justify-center min-h-[400px]">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Travis Scott Jersey
          </motion.h2>

          <motion.p
            className="text-zinc-300 text-md mb-6 leading-relaxed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Limited edition Travis Scott x Football Club collaboration jersey.
            Designed for style and performance. Premium quality and exclusive design.
          </motion.p>

          <motion.button
            className="self-start bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
            onClick={() => navigate('/product/travis-scott-jersey')}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Buy Item
          </motion.button>
        </div>
      </motion.div>
      {/* Bottom horizontal line */}
      <div className="w-[80%] md:w-[60%] h-0.5 bg-zinc-700 rounded-full mt-12" />
    </section>
  );
};

export default HeroProducts;
