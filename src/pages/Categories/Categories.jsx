import React from 'react';
import International from './International';
import Seasonal from './Seasonal';
import Retro from './Retro';
import Womens from './Womens';

const Categories = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* International Section */}
            <International />
            
            {/* Seasonal Section */}
            <Seasonal />
            
            {/* Retro Section */}
            <Retro />
            
            {/* Womens Section */}
            <Womens />
        </div>
    );
};

export default Categories; 