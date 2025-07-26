import React from 'react';
import image1 from '../../../assets/reltedProducts/image1.jpeg';
import image2 from '../../../assets/reltedProducts/image2.jpeg';
import image3 from '../../../assets/reltedProducts/image3.jpeg';
import image4 from '../../../assets/reltedProducts/image4.jpeg';

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
          <div
            key={product.id}
            className="min-w-[300px] max-w-[320px] bg-[var(--color-white)] rounded-lg shadow hover:shadow-lg transition flex-shrink-0 flex flex-col"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-t-lg"
              />
              {product.badge && (
                <span className="absolute left-3 top-3 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col gap-2">
              {product.section && (
                <div className="uppercase text-xs font-bold text-[var(--color-medium-gray)] tracking-widest mb-1">
                  {product.section}
                </div>
              )}
              <div className="font-semibold text-[var(--color-dark-gray)]">{product.name}</div>
              <div className="text-[var(--color-dark-gray)] text-base font-medium">{product.priceText}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
