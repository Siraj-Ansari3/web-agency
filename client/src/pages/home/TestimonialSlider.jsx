import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import testimonials from '../../data/testimonials/testimonialsData';
import avitar from '../../assets/testimonial-avitar/testimonail-avitar.png'

const TestimonialSlider = ({testimonials}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const StarRating = ({ rating }) => (
    <div className="flex justify-center mt-4">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          className={`w-6 h-6 ${i < rating ? 'text-amber-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );

  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8 flex items-center min-h-[480px] sm:min-h-[520px] md:min-h-[600px]">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 text-base font-semibold text-white bg-red-600 rounded-full mb-4 shadow-lg">
            Client Voices
          </span>
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight drop-shadow-lg">
           
          </h2>
          <div className="services-header">
        <h2 className="services-title"> What Our Clients Say</h2>
      </div>
        </div>

        <div className="relative">
          <div className="overflow-visible flex items-center justify-center h-[400px] sm:h-[440px] md:h-[400px] lg:h-[400px]">
            <AnimatePresence custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -80) {
                    nextTestimonial();
                  } else if (info.offset.x > 80) {
                    prevTestimonial();
                  }
                }}
              >
<div className="relative flex flex-col items-center w-full max-w-xl mx-auto">
  {/* Avatar Floating Above Card - Tightly fitted */}
  <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 z-20">
    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-red-600 shadow-xl">
      <img
        className="w-full h-full object-cover bg-white"
        src={testimonials[currentIndex].avatar || avitar}
        alt={testimonials[currentIndex].name}
        onError={(e) => {
          e.target.src = avitar;
        }}
      />
    </div>
  </div>
                  {/* Glassmorphism Card */}
                  <div className="relative bg-black/90 border-4 border-red-600 rounded-3xl shadow-2xl pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-8 flex flex-col items-center w-full min-h-[280px] sm:min-h-[340px] max-h-[340px] sm:max-h-[340px] mt-10 sm:mt-12 overflow-hidden ring-2 ring-red-600">
                    {/* Glowing Red Border Effect */}
                    <div className="absolute inset-0 rounded-3xl pointer-events-none border-4 border-red-600 shadow-[0_0_32px_8px_rgba(220,38,38,0.5)]" style={{zIndex:0}} />
                    {/* Large Faded Quotation Mark */}
                    <svg className="absolute top-4 sm:top-8 left-4 sm:left-8 w-16 sm:w-24 h-16 sm:h-24 text-white/10 z-0" fill="currentColor" viewBox="0 0 32 32">
                      <text x="0" y="24" fontSize="32" fontWeight="bold">“</text>
                    </svg>
                    {/* Client Name */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 z-10 drop-shadow-lg">
                      {testimonials[currentIndex].name}
                    </h3>
                    {/* Client Role */}
                    <p className="text-pink-300 text-sm sm:text-base mb-4 sm:mb-6 z-10 font-medium">
                      {testimonials[currentIndex].role}
                    </p>
                    {/* Review Content */}
                    <div className="relative flex-1 w-full z-10 flex items-center justify-center">
                      <p className="text-white/90 leading-relaxed text-center px-2 sm:px-4 md:px-8 text-xs sm:text-sm font-medium line-clamp-5">
                        "{testimonials[currentIndex].content}"
                      </p>
                    </div>
                    {/* Star Rating at Bottom */}
                    <StarRating rating={testimonials[currentIndex].rating} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer -ml-4 sm:-ml-14 bg-black p-2 sm:p-3 rounded-full shadow-lg hover:scale-110 hover:bg-red-600  focus:outline-none focus:ring-2 focus:ring-red-600 transition-all border-2 border-red-600 z-20"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer -mr-4 sm:-mr-14  bg-black p-2 sm:p-3 rounded-full shadow-lg hover:scale-110 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all border-2 border-red-600 z-20"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-10 space-x-3 z-20">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all border-2 border-white ${currentIndex === index ? 'bg-red-600 scale-125 shadow-lg' : 'bg-gray-700 scale-100'}`}
                aria-label={`Show testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;