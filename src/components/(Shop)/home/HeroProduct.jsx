import React from 'react';
import { Link } from 'react-router-dom';
import YamalImg from '../../../assets/HeroProduct/Yamal.jpg';
import WomanCacImg from '../../../assets/HeroProduct/woman-cac.jpeg';
import TravisImg from '../../../assets/HeroProduct/Travis.jpg';

const HeroProduct = () => {
  return (
    <div className="w-full bg-white px-4 py-12 md:px-16 relative z-30">
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
        {/* Left Product Section */}
        <div className="flex flex-col justify-between h-full">
          {/* Top: Two products horizontally */}
          <div className="flex flex-row gap-6">
            <Link to="/product/1" className="bg-white p-0 max-w-xs w-full flex-1 flex flex-col justify-end group cursor-pointer">
              <div className="w-full aspect-[3/4] h-72 flex items-center justify-center overflow-hidden">
                <img src={YamalImg} alt="Yamal Shirt" className="w-full h-full object-cover mb-4" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-dark-gray group-hover:underline">FC Barcelona X Cactus Jack Mens Jersey</h3>
                <p className="text-sm text-medium-gray">Rs 69,917</p>
              </div>
            </Link>
            <Link to="/product/2" className="bg-white p-0 max-w-xs w-full flex-1 flex flex-col justify-end group cursor-pointer">
              <div className="w-full aspect-[3/4] h-72 flex items-center justify-center overflow-hidden">
                <img src={WomanCacImg} alt="Fisherman Pants" className="w-full h-full object-cover mb-4" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-dark-gray group-hover:underline">FC Barcelona X Cactus Jack Womens Jersey</h3>
                <p className="text-sm text-medium-gray">Rs 83,410</p>
              </div>
            </Link>
          </div>
          {/* Bottom: Text fills the gap below */}
          <div className="mt-8 max-w-full bg-white p-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-dark-gray mb-4">FC Barcelona X Cactus Jack</h2>
            <p className="text-base text-medium-gray leading-relaxed mb-6">
              Featuring the "Cactus Jack" logo. The jersey, Which retains the traditional Blaugrana design, Incoporates distinctive visual elements from Travis Scott's creative universe and will be available for purchase
            </p>
            <a href="#" className="inline-block text-dark-gray text-lg font-medium underline underline-offset-4 hover:text-medium-gray transition-colors duration-200">
              SHOP COLLECTION
            </a>
          </div>
        </div>

        {/* Right Pattern Illustration */}
        <div className="flex items-stretch h-full">
          <img src={TravisImg} alt="Kratom Print Pattern" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default HeroProduct;