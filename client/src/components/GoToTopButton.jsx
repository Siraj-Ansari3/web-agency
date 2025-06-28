import React, { useState, useEffect } from 'react';

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black text-white border-2 border-red-600 shadow-lg transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-black focus:outline-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Go to top"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default GoToTopButton; 