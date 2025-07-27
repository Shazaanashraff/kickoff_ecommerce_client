import React from 'react';
import relatedProducts from '../../data/relatedProducts';
import psgImage from '../../assets/bestSellers/psg.jpeg';

const Seasonal = () => {
    return (
        <div className="bg-white flex flex-col py-16 px-8">
            {/* Seasonal Section */}
            <div>
                {/* PSG Image */}
                <div className="w-full h-64 md:h-96 overflow-hidden mb-8">
                    <img
                        src={psgImage}
                        alt="PSG Seasonal"
                        className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Seasonal</h2>
                {/* Product List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {relatedProducts.slice(0, 8).map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-contain rounded-lg mb-4"
                            />
                            <h2 className="text-lg font-medium text-gray-700 mb-2">{product.name}</h2>
                            <p className="text-sm text-gray-500 mb-4">Rs {product.price.toLocaleString()}</p>
                            <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-black transition">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Seasonal; 