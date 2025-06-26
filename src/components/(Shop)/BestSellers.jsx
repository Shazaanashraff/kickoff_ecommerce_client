import React from 'react'

const bestSellers = [
  {
    id: 1,
    name: 'Classic Home Jersey',
    price: '$79.99',
    image: 'https://via.placeholder.com/300x400?text=Jersey+1',
  },
  {
    id: 2,
    name: 'Away Jersey 2024',
    price: '$84.99',
    image: 'https://via.placeholder.com/300x400?text=Jersey+2',
  },
  {
    id: 3,
    name: 'Limited Edition Kit',
    price: '$99.99',
    image: 'https://via.placeholder.com/300x400?text=Jersey+3',
  },
  {
    id: 4,
    name: 'Retro Throwback',
    price: '$69.99',
    image: 'https://via.placeholder.com/300x400?text=Jersey+4',
  },
]

const BestSellers = () => {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4" id="bestsellers">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center font-sans tracking-tight">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {bestSellers.map(product => (
          <div key={product.id} className="bg-black/60 rounded-2xl shadow-lg p-4 flex flex-col items-center transition hover:scale-105 hover:shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-xl mb-4 opacity-90" />
            <h3 className="text-lg font-semibold text-white mb-2 text-center">{product.name}</h3>
            <p className="text-[#00FF99] font-bold text-base mb-4">{product.price}</p>
            <button className="bg-[#00FF99] text-black font-semibold rounded-full px-6 py-2 text-sm shadow hover:bg-[#00e68a] transition">Shop Now</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BestSellers 