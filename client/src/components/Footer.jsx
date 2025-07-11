import React from 'react';
import services from '../data/services/servicesData';
import logo from '../assets/logo/Marsev.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('Subscribed with email:', email);
    e.target.reset();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="bg-black text-white md:pt-16 md:px-10 pb-8 border-t-1 border-red-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About - Full width on mobile, then normal */}
          <div className="md:col-span-2 lg:col-span-1 flex flex-col items-start justify-start">
            <div className="flex items-center mb-2 ml-[-30px]">
              <img src={logo} alt="Agency Logo" className="w-30  object-contain" />
              <span className="text-2xl font-bold">Marsev <br />Tech</span>
            </div>
            <p className="text-gray-400 mb-6">
              We create digital experiences that matter. Our team delivers innovative solutions.
            </p>
            <div className="flex space-x-4 md:hidden">
              <a href="https://www.facebook.com/share/1BLxJKtqrB/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/marsevtech?igsh=MXFwamlrOGt0cDY5dw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/company/marsevtech/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links - Takes full width on mobile below logo */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                {page:'Home',route:'./'},{page:'About Us',route:'/about'} ,{page:'Services',route:'/services'} ,{page:'Portfolio',route:'/portfolio'} ,{page:'Blog',route:'/blog'} ,{page:'Contact',route:'/contact'} , '', '', '',].map((link) => (
                <li key={link.route}>
                  <Link to={link.route} className="text-gray-400 hover:text-red-500  transition-colors text-sm md:text-base">
                    {link.page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section - replaces Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <span className="text-gray-400  text-sm md:text-base">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Now properly spaced and responsive */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <address className="not-italic text-gray-400 space-y-3 text-sm">
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@marsevtech.com</span>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+92 3493157551</span>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Karachi Pakistan</span>
              </div>
            </address>
          </div>
        </div>

        {/* Newsletter Subscription - Full width at the bottom */}
        <div className="w-full flex justify-center mt-12">
          <div className="bg-black border-1 border-red-600 rounded-2xl shadow-lg p-6 flex flex-col items-center w-full max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-2 text-white">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4 text-center">Get the latest updates, news, and offers straight to your inbox.</p>
            <form className="w-full flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-l-lg sm:rounded-lg bg-gray-900 text-white border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-r-lg sm:rounded-lg hover:bg-red-700 transition-all shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright - Centered and properly spaced */}
        <div className="border-t border-red-900 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MarsevTech. All rights reserved.</p>
          <p>
            <Link to='/privacy-policy'>Privacy Policies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;