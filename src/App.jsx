import React from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import BestSellers from './components/BestSellers'
import CategoriesBento from './components/CategoriesBento'
import FeaturedProducts from './components/FeaturedProducts'

const App = () => {
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

export default App;
