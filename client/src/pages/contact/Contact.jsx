import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const initialForm = { user_name: '', user_email: '', phone: '', company: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const validate = () => {
    const newErrors = {};
    if (!form.user_name.trim()) newErrors.user_name = 'Name is required.';
    if (!form.user_email.trim()) newErrors.user_email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email)) newErrors.user_email = 'Enter a valid email.';
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

    setIsSubmitting(true);

    // Send to Admin
    emailjs.sendForm(
      'service_lxawnud',
      'template_chhsgx8',
      formRef.current,
      't5oxR8sG0RJvos3qR'
    )
      .then(() => {
        // Then send auto-reply to user
        return emailjs.sendForm(
          'service_lxawnud',
          'template_psv4eke',
          formRef.current,
          't5oxR8sG0RJvos3qR'
        );
      })
      .then(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        setTimeout(() => setSubmitted(false), 3000);
        setForm(initialForm);

      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        setIsSubmitting(false);
      });
  };

  return (
    <section className="min-h-screen  w-full flex flex-col items-center justify-center bg-black relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 md:h-56">
          <path fill="#ef4444" d="M0,160 C480,240 960,80 1440,160 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="relative w-full max-w-4xl mx-auto mt-20 mb-16 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden bg-black/80 backdrop-blur-lg border border-red-100 animate-fade-in group transition-transform duration-300 hover:scale-[1.015]">
        {/* Form Side */}
        <div className="flex-1 p-8 md:p-12">

          <h2 className="text-lg font-semibold text-red-400 mb-6">Request a Quote</h2>
          {submitted && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-sm font-semibold border border-green-300 animate-fade-in">
              Sent successfully! We have received your message.
            </div>
          )}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'user_name', label: 'Name *' },
                { name: 'user_email', label: 'Email *' },
                { name: 'phone', label: 'Phone' },
                { name: 'company', label: 'Company' }
              ].map((field, idx) => (
                <div key={idx} className="relative">
                  <input
                    type={field.name.includes('email') ? 'email' : 'text'}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className={`peer w-full border-b-2 px-0 py-2 bg-transparent text-white  focus:outline-none focus:border-red-500 transition-all duration-200 ${errors[field.name] ? 'border-red-500' : 'border-gray-700'
                      }`}
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-[-5px] text-xs font-semibold text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-translate-y-4 peer-focus:text-red-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500">
                    {field.label}
                  </label>
                  {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                </div>
              ))}
            </div>
            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className={`peer w-full border-b-2 px-0 py-2 bg-transparent text-white focus:outline-none focus:border-red-500 transition-all duration-200 resize-none ${errors.message ? 'border-red-500' : 'border-gray-700'
                  }`}
                placeholder=" "
              />
              <label className="absolute left-0 top-[-5px] text-xs font-semibold text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-translate-y-4 peer-focus:text-red-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500">
                Message *
              </label>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-2 px-5 py-3 bg-gradient-to-r cursor-pointer from-red-600 to-red-400 text-white font-semibold rounded-full shadow transition-all duration-200 max-w-35 text-sm tracking-widest flex items-center gap-2 ${isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:from-red-700 hover:to-red-600 hover:shadow-xl'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                {isSubmitting ? 'Sending...' : submitted ? 'Thank you!' : 'SEND'}
              </button>

              <p className="text-xs text-gray-400 mt-3">
                We use your information only to respond to your message. Learn more in our{' '}
                <a
                  href="/privacy-policy"
                  className="text-red-400 underline hover:text-red-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>.
              </p>

            </>

          </form>
        </div>

        {/* Info Side */}
        <div className="w-full md:w-80 bg-white text-black flex flex-col justify-center p-8 md:p-10 relative animate-slide-in">
          <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-red-400 to-red-700 rounded-full" />
          <h3 className="text-lg font-semibold mb-4 pl-4">Let's Build Something Great Together.</h3>
          <p className="text-sm mb-6 opacity-80 pl-4">Have a question or project in mind? Drop us a message — we're just a click away.</p>
          <ul className="space-y-5 text-sm pl-4">

            <li className="flex items-start gap-3">
              <span className="">📞</span> <p>+92 3493157551</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="">✉️</span> <p>support@marsevtech.com</p>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeInUp 1s ease-in-out both; }
        .animate-slide-in { animation: slideInRight 1s ease-in-out both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  );
};

export default Contact;
