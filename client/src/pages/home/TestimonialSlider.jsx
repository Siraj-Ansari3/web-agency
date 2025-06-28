import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import testimonials from '../../data/testimonials/testimonialsData';

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
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-red-400 bg-red-900/50 rounded-full mb-4">
            Client Voices
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden h-[400px] md:h-[360px]">
            <AnimatePresence custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="bg-black p-8 rounded-xl shadow-lg h-full flex flex-col items-center border border-red-200">
                  {/* Client Image at Top */}
                  <div className="mb-6">
                    <img
                      className="w-20 h-20 rounded-full object-cover border-4 border-red-200 shadow-md mx-auto"
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                    />
                  </div>
                  
                  {/* Client Name */}
                  <h3 className="text-xl font-bold text-white mb-1">
                    {testimonials[currentIndex].name}
                  </h3>
                  
                  {/* Client Role */}
                  <p className="text-red-400 text-sm mb-6">
                    {testimonials[currentIndex].role}
                  </p>
                  
                  {/* Review Content */}
                  <div className="relative flex-1 w-full">
                    <svg 
                      className="w-8 h-8 text-gray-700 absolute -top-2 left-0" 
                      fill="currentColor" 
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-300 leading-relaxed text-center px-4 md:px-8">
                      "{testimonials[currentIndex].content}"
                    </p>
                    <svg 
                      className="w-8 h-8 text-gray-700 absolute -bottom-2 right-0" 
                      fill="currentColor" 
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  
                  {/* Star Rating at Bottom */}
                  <StarRating rating={testimonials[currentIndex].rating} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 sm:-ml-14 bg-black p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:-translate-x-1 border border-red-200"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 sm:-mr-14 bg-black p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:translate-x-1 border border-red-200"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === index ? 'bg-red-600 w-6' : 'bg-gray-600'}`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;