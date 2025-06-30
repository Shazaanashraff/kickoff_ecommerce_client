import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5001/api/contact', { email, message });
      if (res.data.success) {
        setSuccess('Your message has been sent!');
        setEmail('');
        setMessage('');
      } else {
        setError(res.data.message || 'Failed to send message.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calltoaction" className="max-w-2xl mx-auto my-16 bg-white/10 rounded-2xl p-8 shadow-lg flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">Get in Touch</h2>
      <p className="text-white/80 mb-6 text-center">Have a question, suggestion, or want to stay updated? Send us a message!</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-black/30 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="bg-black/30 border border-white/20 rounded px-4 py-3 text-white focus:outline-none min-h-[100px]"
          required
        />
        <button
          type="submit"
          className="bg-[#00FF99] text-black font-semibold rounded-full px-6 py-3 text-lg hover:bg-[#00E589] transition"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {success && <div className="text-green-400 text-center mt-2">{success}</div>}
        {error && <div className="text-red-400 text-center mt-2">{error}</div>}
      </form>
    </section>
  );
};

export default CallToAction; 