import React, { useState } from 'react';
import AdminSidebar from '../../components/(Admin)/Sidebar';
import { SidebarProvider } from '../../context/SidebarContext';
import { useSidebarContext } from '../../context/SidebarContext';
import { motion } from 'framer-motion';

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const genderOptions = ['Men', 'Woman', 'Unisex'];
const categoryOptions = [
  'International',
  'Womens', 
  'Seasonal',
  'Retro',
  'Kids',
  'Accessories',
  'Special Edition',
  'Customized Jersey'
];

const initialState = {
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  discount: '',
  discountType: 'percentage',
  gender: '',
  sizes: [],
  image: '',
  additionalImages: '',
  featured: false,
};

const AddProductContent = () => {
  const { isOpen } = useSidebarContext();
  const [form, setForm] = useState(initialState);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    
    if (name === 'featured') {
      setForm({ ...form, featured: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSizes([...selectedSizes, value]);
    } else {
      setSelectedSizes(selectedSizes.filter(size => size !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!form.name || !form.description || !form.category || !form.price || !form.stock || !form.gender) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (selectedSizes.length === 0) {
      setError('Please select at least one size.');
      return;
    }
    
    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      discount: form.discount ? parseFloat(form.discount) : 0,
      discountType: form.discountType,
      gender: form.gender,
      sizes: selectedSizes,
      image: form.image,
      additionalImages: form.additionalImages,
      featured: form.featured,
    };
    
    try {
      console.log('Submitting product:', payload);
      setSuccess(true);
      setForm(initialState);
      setSelectedSizes([]);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

      return (
      <div className="min-h-screen bg-[#d4d4d4]">
        <AdminSidebar />
        <motion.main
          className="transition-all duration-150 ease-out"
          animate={{
            marginLeft: isOpen ? "280px" : "70px"
          }}
          style={{
            marginLeft: isOpen ? "280px" : "70px"
          }}
        >
          <div className="px-6 py-10 bg-white rounded-tl-3xl min-h-screen shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-dark-gray">Add New Product</h1>
                          <div className="flex gap-4">
                <button className="bg-white text-dark-gray px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 border border-gray-200">
                  Save Draft
                </button>
                <button 
                  onClick={handleSubmit}
                  className="bg-[#2B2B2B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1a1a1a]"
                >
                  Add Product
                </button>
              </div>
          </div>

          {success && <div className="mb-4 text-dark-gray font-semibold">Product added successfully!</div>}
          {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* General Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-dark-gray mb-4">General Information</h2>
                
                <div className="mb-4">
                  <label className="block text-dark-gray mb-2">Name Product</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder=""
                    required
                    className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-dark-gray mb-2">Description Product</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder=""
                    required
                    rows={4}
                    className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Size & Gender */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-dark-gray mb-4">Size & Gender</h2>
                
                <div className="mb-6">
                  <label className="block text-dark-gray mb-2">Size</label>
                  <p className="text-gray-500 text-sm mb-3">Pick Available Size</p>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          if (selectedSizes.includes(size)) {
                            setSelectedSizes(selectedSizes.filter(s => s !== size));
                          } else {
                            setSelectedSizes([...selectedSizes, size]);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]'
                            : 'bg-gray-100 text-dark-gray border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-dark-gray mb-2">Gender</label>
                  <p className="text-gray-500 text-sm mb-3">Pick Available Gender</p>
                  <div className="space-y-2">
                    {genderOptions.map(gender => (
                      <label key={gender} className="flex items-center gap-3 text-dark-gray cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={form.gender === gender}
                          onChange={handleChange}
                          className="accent-[#2B2B2B] w-4 h-4"
                        />
                        {gender}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing And Stock */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-dark-gray mb-4">Pricing And Stock</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-gray mb-2">Base Pricing</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="$47.55"
                      required
                      min={0}
                      step="0.01"
                      className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-gray mb-2">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="77"
                      required
                      min={0}
                      className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-gray mb-2">Discount</label>
                    <input
                      type="text"
                      name="discount"
                      value={form.discount}
                      onChange={handleChange}
                      placeholder="10%"
                      className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-gray mb-2">Discount Type</label>
                    <select
                      name="discountType"
                      value={form.discountType}
                      onChange={handleChange}
                      className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray"
                    >
                      <option value="">Select discount type</option>
                      <option value="Chinese New Year Discount">Chinese New Year Discount</option>
                      <option value="Summer Sale">Summer Sale</option>
                      <option value="Holiday Special">Holiday Special</option>
                      <option value="Clearance">Clearance</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Upload Img */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-dark-gray mb-4">Upload Img</h2>
                
                <div className="mb-4">
                  <div className="w-full h-64 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-dark-gray">
                      <div className="text-4xl mb-2">📷</div>
                      <p>Main Product Image</p>
                      <p className="text-sm text-gray-500">Upload your main product image here</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    <div className="aspect-square bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-dark-gray">
                        <div className="text-2xl mb-1">+</div>
                        <p className="text-xs">Add Image</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cloudinary URLs Section */}
                <div>
                  <label className="block text-dark-gray mb-2">Cloudinary URLs</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="https://res.cloudinary.com/..."
                      className="flex-1 bg-gray-100 border border-gray-200 rounded px-4 py-2 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-dark-gray mb-4">Category</h2>
                
                <div className="mb-4">
                  <label className="block text-dark-gray mb-2">Product Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray"
                  >
                    <option value="" disabled>Select category</option>
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  type="button" 
                  className="bg-[#2B2B2B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1a1a1a]"
                >
                  Add Category
                </button>
              </div>

              {/* Featured Product Checkbox */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="accent-[#2B2B2B] w-5 h-5"
                    id="featured"
                  />
                  <label htmlFor="featured" className="text-dark-gray select-none cursor-pointer">
                    Add to Featured Product Section
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

const AddProduct = () => {
  return (
    <SidebarProvider>
      <AddProductContent />
    </SidebarProvider>
  );
};

export default AddProduct; 