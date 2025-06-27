import React from 'react'
import Navbar from '../../components/(Shop)/Navbar'
import Hero from '../../components/(Shop)/Hero'
import BestSellers from '../../components/(Shop)/BestSellers'
import CategoriesBento from '../../components/(Shop)/CategoriesBento'
import FeaturedProducts from '../../components/(Shop)/featuredProducts'
import Footer from '../../components/(Shop)/Footer'

const Home = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <Hero />
      <BestSellers />
      <CategoriesBento />
      <FeaturedProducts />
      <CallToAction />
      <SignupForDeals />
      <Footer />
    </div>
  )
}

// Call to Action component
const CallToAction = () => (
  <section className="py-16 bg-gradient-to-r from-black via-[#00FF99]/10 to-black text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Unleash Your Passion for Football</h2>
    <p className="text-white/80 text-lg mb-8">Shop the latest premium jerseys and exclusive drops.</p>
    <a
      href="/products"
      className="inline-block bg-[#00FF99] text-black font-semibold rounded-full px-10 py-4 text-xl shadow-lg hover:bg-[#00e68a] transition"
    >
      Shop Now
    </a>
  </section>
);

// Signup for Deals component
const SignupForDeals = () => (
  <section className="py-16 bg-black text-center border-t border-white/10">
    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#00FF99]">Get Notified About New Drops & Deals</h3>
    <p className="text-white/80 text-lg mb-8">Sign up to be the first to know about new arrivals and exclusive offers.</p>
    <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        required
        className="px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00FF99] w-full md:w-2/3"
      />
      <button
        type="submit"
        className="bg-[#00FF99] text-black font-semibold rounded-full px-8 py-3 text-lg hover:bg-[#00e68a] transition"
      >
        Sign Up
      </button>
    </form>
  </section>
);

export default Home