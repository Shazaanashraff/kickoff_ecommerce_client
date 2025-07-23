import React from 'react'
import Navbar from '../../components/(Shop)/home/Navbar'
import Hero from '../../components/(Shop)/home/Hero'
import BestSellers from '../../components/(Shop)/BestSellers'
import CategoriesBento from '../../components/(Shop)/CategoriesBento'
import FeaturedProducts from '../../components/(Shop)/featuredProducts'
import Footer from '../../components/(Shop)/Footer'
import CallToAction from '../../components/(Shop)/CallToAction'
import HeroProducts from '../../components/(Shop)/HeroProducts'

const Home = () => {
  return (
    <div className='min-h-screen bg-white text-dark-gray'>
      <Navbar />
      <Hero />
      {/* Home page intentionally left empty for redesign */}
    </div>
  )
}

// Signup for Deals component (smaller version)
const SignupForDeals = () => (
  <section className="py-6 bg-black text-center border-t border-white/10">
    <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#00FF99]">Get Notified About New Drops & Deals</h3>
    <form className="flex flex-col md:flex-row justify-center items-center gap-2 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        required
        className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00FF99] w-full md:w-2/3 text-sm"
      />
      <button
        type="submit"
        className="bg-[#00FF99] text-black font-semibold rounded-full px-6 py-2 text-base hover:bg-[#00e68a] transition"
      >
        Sign Up
      </button>
    </form>
  </section>
);

export default Home