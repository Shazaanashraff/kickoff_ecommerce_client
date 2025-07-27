import React from 'react'
import Hero from '../../components/(Shop)/home/Hero'
import BestSellers from '../../components/(Shop)/home/BestSellers';
import InfiniteScroller from '../../components/(Shop)/home/InfiniteScroller'
import PromoSplit from '../../components/(Shop)/home/PromoSplit'
import ShopNewReleases from '../../components/(Shop)/home/ShopNewRelease';
import HeroProduct from '../../components/(Shop)/home/HeroProduct';

const Home = () => {
  return (
    <div className='min-h-screen bg-white text-dark-gray'>
      <Hero />
      <HeroProduct/>
      <ShopNewReleases />
      <PromoSplit />
      <BestSellers />
      <InfiniteScroller />
    </div>
  )
}

export default Home