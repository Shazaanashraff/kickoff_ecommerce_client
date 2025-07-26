import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import CallToAction from '../../components/(Shop)/CallToAction';

const heroImg = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80'; // placeholder
const jerseyImg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'; // placeholder
const shopSoonImg = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80'; // placeholder

const socialLinks = [
  { name: 'Instagram', url: '#', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg> },
  { name: 'Twitter', url: '#', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1s-4.18 2.13-6.29 2.13A4.48 4.48 0 0 0 3 6.29c0 .35.04.7.1 1.03A12.94 12.94 0 0 1 1 2.13s-4.18 2.13-6.29 2.13A4.48 4.48 0 0 0 3 6.29c0 .35.04.7.1 1.03A12.94 12.94 0 0 1 1 2.13z" /></svg> },
  { name: 'Facebook', url: '#', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z" /></svg> },
];

const About = () => {
  // Parallax effect for hero image
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 100]);
  const y2 = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Premium Football Jerseys"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ y: y1 }}
        />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-white via-[#00FF99] to-white bg-clip-text text-transparent drop-shadow-lg"
          >
            Crafted for Champions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8"
          >
            Where passion for football meets the art of premium jersey craftsmanship.
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto py-24 px-4 flex flex-col md:flex-row items-center gap-16">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#00FF99]">Our Story</h2>
          <p className="text-white/90 text-lg mb-6">
            At <span className="font-bold text-[#00FF99]">Kickoff</span>, we believe every jersey tells a story. Our collection is curated for those who live and breathe football, and who demand nothing but the best in quality and design. Each piece is crafted with precision, using premium fabrics and authentic details, so you can wear your passion on and off the pitch.
          </p>
          <p className="text-white/70 text-base">
            Whether you're a die-hard supporter or a collector, our jerseys are made to inspire greatness. Experience the difference of true craftsmanship and celebrate the beautiful game with us.
          </p>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={jerseyImg}
            alt="Jersey Detail"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-[#00FF99]/30"
            style={{ y: y2 }}
          />
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-black via-[#00FF99]/10 to-black text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Ready to Wear Your Passion?
        </motion.h2>
        <motion.a
          href="/products"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-block bg-[#00FF99] text-black font-semibold rounded-full px-10 py-4 text-xl shadow-lg hover:bg-[#00e68a] transition"
        >
          Shop the Collection
        </motion.a>
      </section>

      {/* Shop Opening Soon Section */}
      <section className="relative py-24 flex flex-col items-center justify-center overflow-hidden">
        <motion.img
          src={shopSoonImg}
          alt="Shop Opening Soon"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ y: y1 }}
        />
        <div className="relative z-10 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-[#00FF99]"
          >
            Our Shop is Opening Soon!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/80 text-lg mb-6"
          >
            Stay tuned for exclusive launches and limited editions. Follow us on social media for updates!
          </motion.p>
        </div>
      </section>

      {/* Social Media Links */}
      <CallToAction id="calltoaction" />
      <footer className="py-10 bg-black/80 border-t border-white/10 flex flex-col items-center">
        <div className="flex gap-8 mb-4">
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#00FF99] transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="text-white/60 text-sm">&copy; {new Date().getFullYear()} Kickoff. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default About;
