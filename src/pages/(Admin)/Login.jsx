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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#2B2B2B]">
      {/* Centered Login Form */}
      <div className="w-full max-w-md px-8">
        {/* Glass Effect Login Card */}
        <div className="relative">
          {/* Glass Background */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"></div>
          
          {/* Content */}
          <div className="relative z-10 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2B2B2B] mb-2" style={{ fontFamily: 'var(--font-primary)' }}>
                Admin Login
              </h2>
              <p className="text-black text-sm" style={{ fontFamily: 'var(--font-secondary)' }}>
                Enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#2B2B2B] font-medium mb-3 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-[#D4D4D4] rounded-xl text-[#2B2B2B] placeholder-[#B3B3B3] focus:outline-none focus:ring-2 focus:ring-[#2B2B2B] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-[#2B2B2B] font-medium mb-3 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-[#D4D4D4] rounded-xl text-[#2B2B2B] placeholder-[#B3B3B3] focus:outline-none focus:ring-2 focus:ring-[#2B2B2B] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2B2B2B] to-[#1A1D29] text-white font-semibold rounded-xl py-4 text-lg hover:from-[#1A1D29] hover:to-[#2B2B2B] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 