import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5001/api/products');
        if (res.data.success) {
          // Filter for isFeatured === true
          setProducts(res.data.data.filter(p => p.isFeatured));
        } else {
          setError(res.data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-16 px-4" id="bestsellers">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center font-sans tracking-tight">Best Sellers</h2>
      {loading ? (
        <div className="text-white text-center py-12">Loading featured products...</div>
      ) : error ? (
        <div className="text-red-400 text-center py-12">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-white/60 text-center py-12">No featured products yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product._id} className="bg-black/60 rounded-2xl shadow-lg p-4 flex flex-col items-center transition hover:scale-105 hover:shadow-2xl">
              <img src={product.images && product.images.length > 0 ? product.images[0] : ''} alt={product.name} className="w-full h-64 object-cover rounded-xl mb-4 opacity-90" />
              <h3 className="text-lg font-semibold text-white mb-2 text-center">{product.name}</h3>
              <p className="text-[#00FF99] font-bold text-base mb-4">${product.basePrice}</p>
              <Link
                to={`/product/${product._id}`}
                className="bg-[#00FF99] text-black font-semibold rounded-full px-6 py-2 text-sm shadow hover:bg-[#00e68a] transition text-center"
              >
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default BestSellers 