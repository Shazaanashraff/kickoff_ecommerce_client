import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BestSellers from '../components/BestSellers'
import CategoriesBento from '../components/CategoriesBento'
import FeaturedProducts from '../components/featuredProducts'


const Home = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <Hero />
      <BestSellers />
      <CategoriesBento />
      <FeaturedProducts />
    </div>
  )
}

export default Home