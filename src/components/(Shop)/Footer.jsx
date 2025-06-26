import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => (
  <footer className="bg-black border-t border-white/10 py-8 px-4 mt-16">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-white/80 text-sm">&copy; {new Date().getFullYear()} Kickoff Ecommerce. All rights reserved.</div>
      <div className="flex gap-6 items-center">
        <a href="#" className="text-white/60 hover:text-[#00FF99] transition"><Instagram size={20} /></a>
        <a href="#" className="text-white/60 hover:text-[#00FF99] transition"><Twitter size={20} /></a>
        <a href="#" className="text-white/60 hover:text-[#00FF99] transition"><Facebook size={20} /></a>
      </div>
      <div className="flex gap-6 text-white/60 text-sm">
        <a href="#" className="hover:text-[#00FF99] transition">Privacy Policy</a>
        <a href="#" className="hover:text-[#00FF99] transition">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;