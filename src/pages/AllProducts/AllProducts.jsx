import React from 'react';
import relatedProducts from '../../data/relatedProducts'; // Import related products data
import neymarImage from '../../assets/Neymar.jpeg'; // Import Neymar image
import psgImage from '../../assets/bestSellers/psg.jpeg'; // Import PSG image

const AllProducts = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col pt-20 px-8">
            {/* International Section */}
            <div className="flex flex-col md:flex-row items-start mt-12">
                {/* Neymar Image */}
                <div className="w-full md:w-1/3 h-64 md:h-auto mb-6 md:mb-0">
                    <img
                        src={neymarImage}
                        alt="Neymar"
                        className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                </div>
                {/* Products List */}
                <div className="flex-1 md:pl-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">International</h2>
                    {/* First Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                        {relatedProducts.slice(0, 3).map((product) => (
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
                    {/* Second Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {relatedProducts.slice(0, 2).map((product) => (
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
                        {/* Show More Button */}
                        <div className="flex items-center justify-center">
                            <button className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-black transition">
                                Show More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Seasonal Section */}
            <div className="mt-12">
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

export default AllProducts;
