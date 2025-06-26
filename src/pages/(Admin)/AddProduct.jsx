import React, { useContext, useState } from 'react';
import Sidebar from '../../components/(Admin)/Sidebar';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const sizeOptions = ['S', 'M', 'L', 'XL'];



const initialState = {
  name: '',
  description: '',
  category: '',
  basePrice: '',
  variants: [], // Array of { size, price, stock, sku }
  images: [''], // Start with one image URL field
};

const AddProduct = () => {
  const { backendUrl } = useContext(AppContext);
  const [form, setForm] = useState(initialState);
  const [selectedSizes, setSelectedSizes] = useState([]); // Track selected sizes
  const [variantInputs, setVariantInputs] = useState({}); // { S: { price, stock }, ... }
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name === 'sizes') {
      let updatedSizes;
      if (checked) {
        updatedSizes = [...selectedSizes, value];
        if (!variantInputs[value]) {
          setVariantInputs({ ...variantInputs, [value]: { price: '', stock: '' } });
        }
      } else {
        updatedSizes = selectedSizes.filter(s => s !== value);
        const newVariantInputs = { ...variantInputs };
        delete newVariantInputs[value];
        setVariantInputs(newVariantInputs);
      }
      setSelectedSizes(updatedSizes);
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
    } else if (name.startsWith('price-')) {
      const size = name.split('-')[1];
      setVariantInputs({
        ...variantInputs,
        [size]: {
          ...variantInputs[size],
          price: value,
        },
      });
    } else if (name.startsWith('stock-')) {
      const size = name.split('-')[1];
      setVariantInputs({
        ...variantInputs,
        [size]: {
          ...variantInputs[size],
          stock: value,
        },
      });
    } else if (name.startsWith('image-url-')) {
      // name: image-url-0, image-url-1, etc.
      const idx = parseInt(name.split('-')[2], 10);
      const newImages = [...form.images];
      newImages[idx] = value;
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddImageField = () => {
    setForm({ ...form, images: [...form.images, ''] });
  };

  const handleRemoveImageField = (idx) => {
    const newImages = form.images.filter((_, i) => i !== idx);
    setForm({ ...form, images: newImages.length ? newImages : [''] });
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
    // Validate at least one image URL
    const validImages = form.images.filter(url => url.trim() !== '');
    if (validImages.length === 0) {
      setError('Please provide at least one image URL.');
      return;
    }
    // Prepare data
    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      basePrice: form.basePrice,
      images: validImages,
      variants,
    };
    try {
      const res = await axios.post(`http://localhost:5001/api/products`, payload);
      if (!res.data.success) {
        throw new Error(res.data.message || 'Failed to add product');
      }
      setSuccess(true);
      setForm(initialState);
      setSelectedSizes([]);
      setVariantInputs({});
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
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
            >
              <option value="" disabled>Select category</option>
              <option value="International">International</option>
              <option value="Womens">Womens</option>
              <option value="Retro kits">Retro kits</option>
              <option value="Seasonal clubs">Seasonal clubs</option>
            </select>
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
            {selectedSizes.length > 0 && (
              <div className="space-y-4 mt-4">
                {selectedSizes.map(size => (
                  <div key={size} className="flex gap-4 items-end bg-black/30 p-3 rounded-lg">
                    <span className="text-white font-semibold w-8">{size}</span>
                    <input
                      type="number"
                      name={`price-${size}`}
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
                      name={`stock-${size}`}
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
            <label className="block text-white mb-2">Product Images (Cloudinary URLs)</label>
            {form.images.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  name={`image-url-${idx}`}
                  value={url}
                  onChange={handleChange}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full bg-black/40 border border-white/20 rounded px-4 py-2 text-white focus:outline-none"
                  required={idx === 0}
                />
                {form.images.length > 1 && (
                  <button type="button" onClick={() => handleRemoveImageField(idx)} className="text-red-400 px-2 py-1 rounded hover:bg-red-900/30">Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddImageField} className="mt-2 bg-[#00FF99] text-black rounded px-4 py-2 font-semibold hover:bg-[#00E589]">Add Image</button>
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