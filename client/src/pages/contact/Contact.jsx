import React, { useState } from 'react';

const initialForm = { name: '', email: '', phone: '', company: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm(initialForm);
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-x-hidden">
      {/* Wavy SVG background accent */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 md:h-56">
          <path fill="#ef4444" d="M0,160 C480,240 960,80 1440,160 L1440,0 L0,0 Z" />
        </svg>
      </div>
      {/* Centered Card */}
      <div className="relative w-full max-w-4xl mx-auto mt-20 mb-16 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden bg-black/80 backdrop-blur-lg border border-red-100 animate-fade-in group transition-transform duration-300 hover:scale-[1.015]">
        {/* Left: Form */}
        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-lg font-semibold text-red-400 mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`peer w-full border-b-2 px-0 py-2 bg-transparent text-white focus:outline-none focus:border-red-500 transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder=" "
                />
                <label className="absolute left-0 top-1 text-xs font-semibold text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-red-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500">
                  Name *
                </label>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`peer w-full border-b-2 px-0 py-2 bg-transparent text-white focus:outline-none focus:border-red-500 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder=" "
                />
                <label className="absolute left-0 top-1 text-xs font-semibold text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-red-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500">
                  Email *
                </label>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="peer w-full border-b-2 px-0 py-2 bg-transparent text-white focus:outline-none focus:border-red-500 transition-all duration-200 border-gray-700"
                  placeholder=" "
                />
                <label className="absolute left-0 top-1 text-xs font-semibold text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-red-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500">
                  Phone
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="peer w-full border-b-2 px-0 py-2 bg-transparent text-white focus:outline-none focus:border-red-500 transition-all duration-200 border-gray-700"
                  placeholder=" "
                />
                <label className="absolute left-0 top-1 text-xs font-semibold text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-red-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500">
                  Company
                </label>
              </div>
            </div>
            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className={`peer w-full border-b-2 px-0 py-2 bg-transparent text-white focus:outline-none focus:border-red-500 transition-all duration-200 resize-none ${errors.message ? 'border-red-500' : 'border-gray-700'}`}
                placeholder=" "
              />
              <label className="absolute left-0 top-1 text-xs font-semibold text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-red-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500">
                Message *
              </label>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="mt-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold rounded-full shadow hover:from-red-700 hover:to-red-600 hover:shadow-xl transition-all duration-200 w-44 text-sm tracking-widest flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              {submitted ? 'Thank you!' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
        {/* Right: Contact Info */}
        <div className="w-full md:w-80 bg-white text-black flex flex-col justify-center p-8 md:p-10 relative animate-slide-in">
          {/* Vertical accent bar */}
          <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-red-400 to-red-700 rounded-full" />
          <h3 className="text-lg font-semibold mb-4 pl-4">Contact Information</h3>
          <p className="text-sm mb-6 opacity-80 pl-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, magnam!</p>
          <ul className="space-y-5 text-sm pl-4">
            <li className="flex items-start gap-3">
              <span className="mt-1">
                <svg className="w-6 h-6 text-red-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </span>
              9757 Aspen Lane South Richmond Hill, NY 11419
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1">
                <svg className="w-6 h-6 text-red-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2 2A18 18 0 0 1 4 5a2 2 0 0 1 2-2h2.09a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" /></svg>
              </span>
              +1 (291) 939 9321
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1">
                <svg className="w-6 h-6 text-red-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8z" /><path d="M16 2v2M8 2v2" /></svg>
              </span>
              info@mywebsite.com
            </li>
          </ul>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both; }
        .animate-slide-in { animation: slideInRight 1s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 40px, 0); } to { opacity: 1; transform: none; } }
        @keyframes slideInRight { from { opacity: 0; transform: translate3d(40px, 0, 0); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
};

export default Contact;