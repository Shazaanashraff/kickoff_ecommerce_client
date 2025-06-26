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
      <Footer />
    </div>
  )
}

export default Home