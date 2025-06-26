import React, { useState } from 'react';
import Sidebar from '../../components/(Admin)/Sidebar';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

const sizeOptions = ['S', 'M', 'L', 'XL'];



const initialState = {
  name: '',
  description: '',
  category: '',
  basePrice: '',
  variants: [], // Array of { size, price, stock, sku }
  image: null,
};

const AddProduct = () => {
  const { backendUrl } = useAppContext();
  const [form, setForm] = useState(initialState);
  const [selectedSizes, setSelectedSizes] = useState([]); // Track selected sizes
  const [variantInputs, setVariantInputs] = useState({}); // { S: { price, stock, sku }, ... }
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (name === 'sizes') {
      let updatedSizes;
      if (checked) {
        updatedSizes = [...selectedSizes, value];
      } else {
        updatedSizes = selectedSizes.filter(s => s !== value);
      }
      setSelectedSizes(updatedSizes);
      // Remove variantInputs for unchecked size
      if (!checked) {
        const newVariantInputs = { ...variantInputs };
        delete newVariantInputs[value];
        setVariantInputs(newVariantInputs);
      }
    } else if (name.startsWith('variant-')) {
      // name: variant-S-price, variant-M-stock
      const [, size, field] = name.split('-');
      setVariantInputs({
        ...variantInputs,
        [size]: {
          ...variantInputs[size],
          [field]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // Build variants array
    const variants = selectedSizes.map(size => ({
      size,
      price: Number(variantInputs[size]?.price || 0),
      stock: Number(variantInputs[size]?.stock || 0),
    }));
    // Validate at least one variant
    if (variants.length === 0) {
      setError('Please select at least one size and fill its details.');
      return;
    }
    // Validate image
    if (!form.image) {
      setError('Please upload a product image.');
      return;
    }
    // Prepare FormData
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('basePrice', form.basePrice);
    formData.append('image', form.image);
    formData.append('variants', JSON.stringify(variants));
    try {
      const res = await axios.post(`${backendUrl}/api/products`, formData)
      if (!res.data.success) {
        throw new Error(res.data.message || 'Failed to add product');
      }
      setSuccess(true);
      setForm(initialState);
      setSelectedSizes([]);
      setVariantInputs({});
      setImagePreview(null);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Add Product</h1>
        <form onSubmit={handleSubmit} className="max-w-xl bg-white/5 rounded-2xl p-8 shadow-lg">
          {success && <div className="mb-4 text-[#00FF99] font-semibold">Product added successfully!</div>}
          {error && <div className="mb-4 text-red-400 font-semibold">{error}</div>}
          <div className="mb-6">
            <label className="block text-white mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Base Price</label>
            <input
              type="number"
              name="basePrice"
              value={form.basePrice}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
              className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Sizes & Variants</label>
            <div className="flex gap-4 mb-2">
              {sizeOptions.map(size => (
                <label key={size} className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={handleChange}
                    className="accent-[#00FF99] w-5 h-5"
                  />
                  {size}
                </label>
              ))}
            </div>
            {/* For each selected size, show inputs for price, stock, sku */}
            {selectedSizes.length > 0 && (
              <div className="space-y-4 mt-4">
                {selectedSizes.map(size => (
                  <div key={size} className="flex gap-4 items-end bg-black/30 p-3 rounded-lg">
                    <span className="text-white font-semibold w-8">{size}</span>
                    <input
                      type="number"
                      name={`variant-${size}-price`}
                      placeholder="Price"
                      value={variantInputs[size]?.price || ''}
                      onChange={handleChange}
                      required
                      min={0}
                      step="0.01"
                      className="bg-black/40 border border-white/20 rounded px-2 py-1 text-white w-24"
                    />
                    <input
                      type="number"
                      name={`variant-${size}-stock`}
                      placeholder="Stock"
                      value={variantInputs[size]?.stock || ''}
                      onChange={handleChange}
                      required
                      min={0}
                      className="bg-black/40 border border-white/20 rounded px-2 py-1 text-white w-20"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-white"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-xl border border-white/10" />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#00FF99] text-black font-semibold rounded-full py-3 text-lg hover:bg-[#00E589] transition"
          >
            Add Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProduct; 