import React from 'react'
import Navbar from '../../components/(Shop)/home/Navbar'
import Hero from '../../components/(Shop)/home/Hero'
import BestSellers from '../../components/(Shop)/home/BestSellers';
import CategoriesBento from '../../components/(Shop)/CategoriesBento'
import FeaturedProducts from '../../components/(Shop)/featuredProducts'
import Footer from '../../components/(Shop)/Footer'
import CallToAction from '../../components/(Shop)/CallToAction'
import HeroProducts from '../../components/(Shop)/HeroProducts'
import InfiniteScroller from '../../components/(Shop)/InfiniteScroller'
import PromoSplit from '../../components/(Shop)/home/PromoSplit'
import ShopNewReleases from '../../components/(Shop)/home/ShopNewRelease';

const Home = () => {
  return (
    <div className='min-h-screen bg-white text-dark-gray'>
      <Navbar />
      <Hero />
      <BestSellers />
      {/* Home page intentionally left empty for redesign */}

      <PromoSplit />
      <InfiniteScroller />
      <ShopNewReleases />
    </div>
  )
}

export default Home