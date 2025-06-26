import React, { useState } from 'react';
import Sidebar from '../../components/(Admin)/Sidebar';

const sizeOptions = ['S', 'M', 'L', 'XL'];

const initialState = {
  name: '',
  description: '',
  price: '',
  category: '',
  sizes: [],
  image: null,
};

const AddProduct = () => {
  const [form, setForm] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (name === 'sizes') {
      if (checked) {
        setForm({ ...form, sizes: [...form.sizes, value] });
      } else {
        setForm({ ...form, sizes: form.sizes.filter(s => s !== value) });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    setSuccess(true);
    setForm(initialState);
    setImagePreview(null);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Add Product</h1>
        <form onSubmit={handleSubmit} className="max-w-xl bg-white/5 rounded-2xl p-8 shadow-lg">
          {success && <div className="mb-4 text-[#00FF99] font-semibold">Product added successfully!</div>}
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
            <label className="block text-white mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
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
            <label className="block text-white mb-2">Sizes</label>
            <div className="flex gap-4">
              {sizeOptions.map(size => (
                <label key={size} className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    checked={form.sizes.includes(size)}
                    onChange={handleChange}
                    className="accent-[#00FF99] w-5 h-5"
                  />
                  {size}
                </label>
              ))}
            </div>
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