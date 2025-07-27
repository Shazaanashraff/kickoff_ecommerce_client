import React from 'react';
import image1 from '../../../assets/reltedProducts/image1.jpeg';
import image2 from '../../../assets/reltedProducts/image2.jpeg';
import image3 from '../../../assets/reltedProducts/image3.jpeg';
import image4 from '../../../assets/reltedProducts/image4.jpeg';
import ProductCard from './ProductCard';

const relatedProducts = [
  {
    id: 1,
    name: 'Spotify Camp Nou Barça Sweatshirt',
    priceText: '58,99 EUR',
    image: image1,
    badge: 'BARÇA EXCLUSIVE',
    section: 'CLAIM COLLECTION',
  },
  {
    id: 2,
    name: 'T-shirt beige Barça',
    priceText: '29,99 EUR',
    image: image2,
    badge: 'BARÇA EXCLUSIVE',
  },
  {
    id: 3,
    name: 'Ecru tee',
    priceText: '29,99 EUR',
    image: image3,
  },
  {
    id: 4,
    name: 'Gift bag',
    priceText: '5,99 EUR',
    image: image4,
  },
];

const RelatedProducts = () => {
  return (
    <section className="bg-[var(--color-white)] py-10 px-4 md:px-12 mt-12 rounded-xl">
      <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-dark-gray)] mb-6">Related Products</h2>
      <div className="flex gap-8 overflow-x-auto pb-2">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={parseFloat(product.priceText.replace(/,/, '.'))}
            badge={product.badge}
            image={product.image}
            onClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
