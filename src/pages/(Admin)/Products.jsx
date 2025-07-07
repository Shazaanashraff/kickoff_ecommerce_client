import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/(Admin)/Sidebar';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const sizeOptions = ['S', 'M', 'L', 'XL'];

const Products = () => {
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, product: null, input: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${backendUrl}/api/products`);
        console.log("products :", res)
        if (res.data.success) {
          setProducts(res.data.data);
        } else {
          setError(res.data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/products/${id}`);
      if (res.data.success) {
        setProducts(products.filter(p => p._id !== id));
        if (selected && selected._id === id) setSelected(null);
      } else {
        setError(res.data.message || 'Failed to delete product');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    setDeleteConfirm({ show: false, product: null, input: '' });
  };

  const handleEdit = (product) => {
    // Build a map of size -> { price, stock } from variants
    const sizeMap = {};
    if (product.variants) {
      product.variants.forEach(v => {
        sizeMap[v.size] = { price: String(v.price), stock: String(v.stock) };
      });
    }
    setSelected(product);
    setEditForm({
      name: product.name,
      price: product.basePrice,
      category: product.category,
      description: product.description,
      images: product.images && product.images.length > 0 ? [...product.images] : [''],
      sizes: Object.keys(sizeMap), // checked sizes
      sizeData: sizeMap, // { S: { price, stock }, ... }
      isFeatured: !!product.isFeatured,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('image-url-')) {
      // name: image-url-0, image-url-1, etc.
      const idx = parseInt(name.split('-')[2], 10);
      const newImages = [...editForm.images];
      newImages[idx] = value;
      setEditForm({ ...editForm, images: newImages });
    } else if (name.startsWith('size-')) {
      // Checkbox for size
      const size = name.split('-')[1];
      let newSizes = [...editForm.sizes];
      let newSizeData = { ...editForm.sizeData };
      if (checked) {
        if (!newSizes.includes(size)) newSizes.push(size);
        if (!newSizeData[size]) newSizeData[size] = { price: '', stock: '' };
      } else {
        newSizes = newSizes.filter(s => s !== size);
        delete newSizeData[size];
      }
      setEditForm({ ...editForm, sizes: newSizes, sizeData: newSizeData });
    } else if (name.startsWith('price-')) {
      const size = name.split('-')[1];
      setEditForm({
        ...editForm,
        sizeData: {
          ...editForm.sizeData,
          [size]: {
            ...editForm.sizeData[size],
            price: value,
          },
        },
      });
    } else if (name.startsWith('stock-')) {
      const size = name.split('-')[1];
      setEditForm({
        ...editForm,
        sizeData: {
          ...editForm.sizeData,
          [size]: {
            ...editForm.sizeData[size],
            stock: value,
          },
        },
      });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
    if (name === 'isFeatured') {
      setEditForm({ ...editForm, isFeatured: checked });
    }
  };

  const handleAddImageField = () => {
    setEditForm({ ...editForm, images: [...editForm.images, ''] });
  };

  const handleRemoveImageField = (idx) => {
    const newImages = editForm.images.filter((_, i) => i !== idx);
    setEditForm({ ...editForm, images: newImages.length ? newImages : [''] });
  };

  const handleEditSave = async (id) => {
    // Build variants array from sizes and sizeData
    const variants = editForm.sizes.map(size => ({
      size,
      price: Number(editForm.sizeData[size]?.price || 0),
      stock: Number(editForm.sizeData[size]?.stock || 0),
    }));
    const images = editForm.images.filter(url => url.trim() !== '');
    const updatedProduct = {
      name: editForm.name,
      description: editForm.description,
      category: editForm.category,
      basePrice: parseFloat(editForm.price),
      images,
      variants,
      isFeatured: !!editForm.isFeatured,
    };
    try {
      const res = await axios.put(`${backendUrl}/api/products/${id}`, updatedProduct);
      if (res.data.success) {
        setProducts(products.map(p =>
          p._id === id ? res.data.data : p
        ));
        setSelected(null);
        setEditForm(null);
      } else {
        setError(res.data.message || 'Failed to update product');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const openDeleteConfirm = (product) => {
    setDeleteConfirm({ show: true, product, input: '' });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({ show: false, product: null, input: '' });
  };

  const handleDeleteInputChange = (e) => {
    setDeleteConfirm({ ...deleteConfirm, input: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 px-6 py-10 flex items-center justify-center">
          <div className="text-white text-xl">Loading products...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 px-6 py-10 flex items-center justify-center">
          <div className="text-red-400 text-xl">{error}</div>
        </main>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen bg-black flex">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 px-6 py-10">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-white/70 hover:text-[#00FF99] mb-6">
            <ArrowLeft size={18} /> Back to Products
          </button>
          <div className="max-w-xl bg-white/5 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Edit Product</h2>
            <form onSubmit={e => { e.preventDefault(); handleEditSave(selected._id); }}>
              <div className="mb-6 flex flex-col items-center">
                <>
                  {editForm.images.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2 w-full">
                      <img src={url} alt={editForm.name} className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                      <input
                        type="text"
                        name={`image-url-${idx}`}
                        value={url}
                        onChange={handleEditChange}
                        placeholder="Image URL"
                        className="w-full bg-black/40 border border-white/20 rounded px-4 py-2 text-white focus:outline-none"
                        required={idx === 0}
                      />
                      {editForm.images.length > 1 && (
                        <button type="button" onClick={() => handleRemoveImageField(idx)} className="text-red-400 px-2 py-1 rounded hover:bg-red-900/30">Remove</button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={handleAddImageField} className="mt-2 bg-[#00FF99] text-black rounded px-4 py-2 font-semibold hover:bg-[#00E589]">Add Image</button>
                </>
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">Product Name</label>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange} required className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none" />
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">Description</label>
                <textarea name="description" value={editForm.description} onChange={handleEditChange} required rows={3} className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none" />
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">Price</label>
                <input type="number" name="price" value={editForm.price} onChange={handleEditChange} required min={0} step="0.01" className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none" />
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">Category</label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
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
                <label className="block text-white mb-2">Sizes</label>
                <div className="flex flex-col gap-2">
                  {sizeOptions.map(size => (
                    <div key={size} className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="checkbox"
                          name={`size-${size}`}
                          value={size}
                          checked={editForm.sizes.includes(size)}
                          onChange={handleEditChange}
                          className="accent-[#00FF99] w-5 h-5"
                        />
                        {size}
                      </label>
                      {editForm.sizes.includes(size) && (
                        <>
                          <input
                            type="number"
                            name={`price-${size}`}
                            placeholder="Price"
                            value={editForm.sizeData[size]?.price || ''}
                            onChange={handleEditChange}
                            required
                            min={0}
                            step="0.01"
                            className="bg-black/40 border border-white/20 rounded px-2 py-1 text-white w-24"
                          />
                          <input
                            type="number"
                            name={`stock-${size}`}
                            placeholder="Stock"
                            value={editForm.sizeData[size]?.stock || ''}
                            onChange={handleEditChange}
                            required
                            min={0}
                            className="bg-black/40 border border-white/20 rounded px-2 py-1 text-white w-20"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={editForm.isFeatured}
                  onChange={handleEditChange}
                  className="accent-[#00FF99] w-5 h-5"
                  id="isFeatured-edit"
                />
                <label htmlFor="isFeatured-edit" className="text-white select-none cursor-pointer">Featured Product</label>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="bg-[#00FF99] text-black font-semibold rounded-full py-3 px-8 text-lg hover:bg-[#00E589] transition">Save</button>
                <button type="button" onClick={() => setSelected(null)} className="bg-white/10 text-white font-semibold rounded-full py-3 px-8 text-lg hover:bg-white/20 transition">Cancel</button>
                <button type="button" onClick={() => openDeleteConfirm(selected)} className="bg-red-500 text-white font-semibold rounded-full py-3 px-8 text-lg hover:bg-red-600 transition flex items-center gap-2"><Trash2 size={18}/>Delete</button>
              </div>
            </form>
          </div>
          {deleteConfirm.show && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
                <h3 className="text-lg font-bold mb-4 text-black">Confirm Delete</h3>
                <p className="mb-2 text-black">Type <span className="font-mono bg-gray-200 px-2 py-1 rounded">{deleteConfirm.product?.name}</span> to confirm deletion.</p>
                <input
                  type="text"
                  value={deleteConfirm.input}
                  onChange={handleDeleteInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="Type product name..."
                  autoFocus
                />
                <div className="flex gap-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
                    disabled={deleteConfirm.input !== deleteConfirm.product?.name}
                    onClick={() => handleDelete(deleteConfirm.product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-200 text-black px-4 py-2 rounded font-semibold"
                    onClick={closeDeleteConfirm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Update / Delete Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product._id} className="bg-white/5 rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <img src={product.images && product.images.length > 0 ? product.images[0] : ''} alt={product.name} className="w-24 h-24 object-cover rounded-xl mb-4 border border-white/10" />
              <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
              <div className="text-[#00FF99] font-semibold mb-1">${product.basePrice}</div>
              <div className="text-white/70 text-sm mb-2">{product.category}</div>
              {product.isFeatured && <div className="text-[#00FF99] text-xs font-bold mb-2">★ Featured</div>}
              <div className="text-white/60 text-xs mb-4">Sizes: {product.variants ? product.variants.map(v => v.size).join(', ') : ''}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-4 py-1 rounded font-semibold flex items-center gap-1 hover:bg-blue-600 transition"><Pencil size={16}/>Edit</button>
                <button onClick={() => openDeleteConfirm(product)} className="bg-red-500 text-white px-4 py-1 rounded font-semibold flex items-center gap-1 hover:bg-red-600 transition"><Trash2 size={16}/>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products; 