import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/(Admin)/Sidebar';
import { SidebarProvider } from '../../context/SidebarContext';
import { useSidebarContext } from '../../context/SidebarContext';
import { motion } from 'framer-motion';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const sizeOptions = ['S', 'M', 'L', 'XL'];

const ProductsContent = () => {
  const { backendUrl } = useContext(AppContext);
  const { isOpen } = useSidebarContext();
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
      <div className="min-h-screen bg-white">
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
          <div className="px-6 py-10 bg-white rounded-tl-3xl min-h-screen flex items-center justify-center">
            <div className="text-dark-gray text-xl">Loading products...</div>
          </div>
        </motion.main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
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
          <div className="px-6 py-10 bg-white rounded-tl-3xl min-h-screen flex items-center justify-center">
            <div className="text-red-600 text-xl">{error}</div>
          </div>
        </motion.main>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen bg-gray-50">
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
          <div className="px-6 pt-10 pb-0 bg-white rounded-tl-3xl shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-medium-gray hover:text-dark-gray">
                <ArrowLeft size={18} /> Back to Products
              </button>
              <h1 className="text-2xl font-bold text-dark-gray">Edit Product</h1>
              <div className="flex gap-4">
                <button className="bg-white text-dark-gray px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 border border-gray-200">
                  Save Draft
                </button>
                <button 
                  onClick={() => handleEditSave(selected._id)}
                  className="bg-[#2B2B2B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Scrollable */}
              <div className="space-y-8">
                {/* General Information */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2B2B2B]">
                  <h2 className="text-xl font-semibold text-dark-gray mb-4">General Information</h2>
                  
                  <div className="mb-4">
                    <label className="block text-dark-gray mb-2">Name Product</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder=""
                      required
                      className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-gray mb-2">Description Product</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder=""
                      required
                      rows={4}
                      className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Size & Gender */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2B2B2B]">
                  <h2 className="text-xl font-semibold text-dark-gray mb-4">Size & Variants</h2>
                  
                  <div className="mb-6">
                    <label className="block text-dark-gray mb-2">Size</label>
                    <p className="text-gray-500 text-sm mb-3">Pick Available Size</p>
                    <div className="flex flex-wrap gap-2">
                      {sizeOptions.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            const newSizes = editForm.sizes.includes(size) 
                              ? editForm.sizes.filter(s => s !== size)
                              : [...editForm.sizes, size];
                            setEditForm({ ...editForm, sizes: newSizes });
                          }}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            editForm.sizes.includes(size)
                              ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]'
                              : 'bg-gray-100 text-dark-gray border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Size Variants */}
                  {editForm.sizes.length > 0 && (
                    <div>
                      <label className="block text-dark-gray mb-2">Size Variants</label>
                      <div className="space-y-3">
                        {editForm.sizes.map(size => (
                          <div key={size} className="bg-gray-50 rounded-lg p-3">
                            <h4 className="font-medium text-dark-gray mb-2">{size}</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-medium-gray text-sm mb-1">Price</label>
                                <input
                                  type="number"
                                  name={`price-${size}`}
                                  placeholder="Price"
                                  value={editForm.sizeData[size]?.price || ''}
                                  onChange={handleEditChange}
                                  required
                                  min={0}
                                  step="0.01"
                                  className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-2 text-sm text-dark-gray focus:outline-none focus:border-dark-gray"
                                />
                              </div>
                              <div>
                                <label className="block text-medium-gray text-sm mb-1">Stock</label>
                                <input
                                  type="number"
                                  name={`stock-${size}`}
                                  placeholder="Stock"
                                  value={editForm.sizeData[size]?.stock || ''}
                                  onChange={handleEditChange}
                                  required
                                  min={0}
                                  className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-2 text-sm text-dark-gray focus:outline-none focus:border-dark-gray"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column - Fixed */}
              <div className="space-y-8 sticky top-0">
                {/* Upload Img */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2B2B2B]">
                  <h2 className="text-xl font-semibold text-dark-gray mb-4">Product Images</h2>
                  
                  <div className="mb-4">
                    <div className="space-y-3">
                      {editForm.images.map((url, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img src={url} alt={editForm.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                          <input
                            type="text"
                            name={`image-url-${idx}`}
                            value={url}
                            onChange={handleEditChange}
                            placeholder="Image URL"
                            className="flex-1 bg-gray-100 border border-gray-200 rounded px-3 py-2 text-sm text-dark-gray focus:outline-none focus:border-dark-gray"
                            required={idx === 0}
                          />
                          {editForm.images.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleRemoveImageField(idx)} 
                              className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAddImageField} 
                      className="mt-3 bg-[#2B2B2B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
                    >
                      Add Image
                    </button>
                  </div>
                </div>

                {/* Featured Product Checkbox */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2B2B2B]">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={editForm.isFeatured}
                      onChange={handleEditChange}
                      className="accent-[#2B2B2B] w-5 h-5"
                      id="isFeatured-edit"
                    />
                    <label htmlFor="isFeatured-edit" className="text-dark-gray select-none cursor-pointer">
                      Add to Featured Product Section
                    </label>
                  </div>
                </div>

                {/* Delete Button */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2B2B2B]">
                  <button 
                    onClick={() => openDeleteConfirm(selected)} 
                    className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18}/>Delete Product
                  </button>
                </div>

                {/* Pricing And Stock */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2B2B2B]">
                  <h2 className="text-xl font-semibold text-dark-gray mb-4">Pricing And Stock</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-gray mb-2">Base Pricing</label>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        placeholder="$47.55"
                        required
                        min={0}
                        step="0.01"
                        className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray placeholder-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-dark-gray mb-2">Category</label>
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        required
                        className="w-full bg-gray-100 border border-gray-200 rounded px-4 py-3 text-dark-gray focus:outline-none focus:border-dark-gray"
                      >
                        <option value="" disabled>Select category</option>
                        <option value="International">International</option>
                        <option value="Womens">Womens</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Retro">Retro</option>
                        <option value="Kids">Kids</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Special Edition">Special Edition</option>
                        <option value="Customized Jersey">Customized Jersey</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {deleteConfirm.show && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
                <h3 className="text-lg font-bold mb-4 text-dark-gray">Confirm Delete</h3>
                <p className="mb-2 text-medium-gray">Type <span className="font-mono bg-gray-200 px-2 py-1 rounded">{deleteConfirm.product?.name}</span> to confirm deletion.</p>
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
                    className="bg-gray-200 text-dark-gray px-4 py-2 rounded font-semibold"
                    onClick={closeDeleteConfirm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.main>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold text-dark-gray mb-8">Update / Delete Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product._id} className="bg-[#D4D4D4] rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <img src={product.images && product.images.length > 0 ? product.images[0] : ''} alt={product.name} className="w-24 h-24 object-cover rounded-xl mb-4 border border-medium-gray" />
              <h3 className="text-lg font-bold text-dark-gray mb-1">{product.name}</h3>
              <div className="text-medium-gray font-semibold mb-1">${product.basePrice}</div>
              <div className="text-medium-gray text-sm mb-2">{product.category}</div>
              {product.isFeatured && <div className="text-dark-gray text-xs font-bold mb-2">★ Featured</div>}
              <div className="text-medium-gray text-xs mb-4">Sizes: {product.variants ? product.variants.map(v => v.size).join(', ') : ''}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="bg-[#2B2B2B] text-white px-4 py-1 rounded font-semibold flex items-center gap-1 hover:bg-gray-800 transition"><Pencil size={16}/>Edit</button>
                <button onClick={() => openDeleteConfirm(product)} className="bg-[#2B2B2B] text-white px-4 py-1 rounded font-semibold flex items-center gap-1 hover:bg-gray-800 transition"><Trash2 size={16}/>Delete</button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </motion.main>
    </div>
  );
};

const Products = () => {
  return (
    <SidebarProvider>
      <ProductsContent />
    </SidebarProvider>
  );
};

export default Products; 