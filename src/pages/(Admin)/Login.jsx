import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple hardcoded check for demo
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_token', 'demo_token');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-semibold rounded-full py-3 text-lg hover:bg-black transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login; 