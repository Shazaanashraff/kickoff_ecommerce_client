import React, { useState } from 'react';
import Sidebar from '../../components/(Admin)/Sidebar';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';

const sizeOptions = ['S', 'M', 'L', 'XL'];

const initialProducts = [
  {
    id: 1,
    name: 'Arsenal Home Kit 23/24',
    price: 89.99,
    category: 'Premier League',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://via.placeholder.com/120x120?text=Arsenal',
    description: 'Classic Arsenal home kit for the 2023/24 season.'
  },
  {
    id: 2,
    name: 'Real Madrid Home Kit 23/24',
    price: 94.99,
    category: 'LaLiga',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://via.placeholder.com/120x120?text=Real+Madrid',
    description: 'Official Real Madrid home kit for the 2023/24 season.'
  },
  {
    id: 3,
    name: "Women's National Team Kit",
    price: 79.99,
    category: 'International',
    sizes: ['S', 'M', 'L'],
    image: 'https://via.placeholder.com/120x120?text=Women',
    description: 'National team kit for women.'
  },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selected, setSelected] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    if (selected && selected.id === id) setSelected(null);
  };

  const handleEdit = (product) => {
    setSelected(product);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      sizes: product.sizes,
      description: product.description,
      image: product.image,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'image' && files && files[0]) {
      setEditForm({ ...editForm, image: URL.createObjectURL(files[0]) });
    } else if (name === 'sizes') {
      if (checked) {
        setEditForm({ ...editForm, sizes: [...editForm.sizes, value] });
      } else {
        setEditForm({ ...editForm, sizes: editForm.sizes.filter(s => s !== value) });
      }
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleEditSave = (id) => {
    setProducts(products.map(p =>
      p.id === id ? {
        ...p,
        ...editForm,
        price: parseFloat(editForm.price),
        sizes: editForm.sizes,
      } : p
    ));
    setSelected(null);
    setEditForm(null);
  };

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
            <form onSubmit={e => { e.preventDefault(); handleEditSave(selected.id); }}>
              <div className="mb-6 flex flex-col items-center">
                <img src={editForm.image} alt={editForm.name} className="w-32 h-32 object-cover rounded-xl border border-white/10 mb-2" />
                <input type="file" name="image" accept="image/*" onChange={handleEditChange} className="text-white" />
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
                <input type="text" name="category" value={editForm.category} onChange={handleEditChange} required className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none" />
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
                        checked={editForm.sizes.includes(size)}
                        onChange={handleEditChange}
                        className="accent-[#00FF99] w-5 h-5"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="bg-[#00FF99] text-black font-semibold rounded-full py-3 px-8 text-lg hover:bg-[#00E589] transition">Save</button>
                <button type="button" onClick={() => setSelected(null)} className="bg-white/10 text-white font-semibold rounded-full py-3 px-8 text-lg hover:bg-white/20 transition">Cancel</button>
                <button type="button" onClick={() => handleDelete(selected.id)} className="bg-red-500 text-white font-semibold rounded-full py-3 px-8 text-lg hover:bg-red-600 transition flex items-center gap-2"><Trash2 size={18}/>Delete</button>
              </div>
            </form>
          </div>
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
            <div key={product.id} className="bg-white/5 rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-xl mb-4 border border-white/10" />
              <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
              <div className="text-[#00FF99] font-semibold mb-1">${product.price}</div>
              <div className="text-white/70 text-sm mb-2">{product.category}</div>
              <div className="text-white/60 text-xs mb-4">Sizes: {product.sizes.join(', ')}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-4 py-1 rounded font-semibold flex items-center gap-1 hover:bg-blue-600 transition"><Pencil size={16}/>Edit</button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-1 rounded font-semibold flex items-center gap-1 hover:bg-red-600 transition"><Trash2 size={16}/>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products; 