import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PortfolioCard = ({ longSS, category, id, title, description }) => {
  return (
    <motion.div
      className="group relative min-h-[260px] md:min-h-[320px] min-w-[260px] max-w-[320px] md:min-w-[300px] md:max-w-[360px] w-full overflow-hidden rounded-xl bg-black text-white shadow-xl border-2 border-red-600 transition-all duration-300"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25)",
        borderColor: "#dc2626"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:via-red-500/5 group-hover:to-red-500/10 transition-all duration-500 rounded-xl z-10" />
      
      {/* Image Wrapper */}
      <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl">
        <motion.img
          src={longSS}
          alt={category}
          className="w-full min-h-[120%] object-cover transition-transform duration-[3500ms] group-hover:translate-y-[-80%]"
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
          style={{ willChange: 'transform' }}
        />
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
        
        {/* Floating Elements on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
          <div className="absolute top-4 right-4 w-8 h-8 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer Overlay - Enhanced with better animations */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full z-40 px-0 pb-0"
        initial={{ y: 0 }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black/95 backdrop-blur-md rounded-b-2xl p-5 flex flex-col space-y-2 shadow-xl border-t border-red-500/20" >
         
          
          {/* Title with enhanced typography */}
          <h3 className="text-lg font-bold text-white truncate group-hover:text-red-600 transition-colors duration-300" title={title}>
            {title}
          </h3>
          
          {/* Description with better readability */}
          <p className="text-white text-sm line-clamp-2 mb-2 leading-relaxed">{description}</p>
          
          {/* Enhanced Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/portfolio/${id}`}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 group-hover:shadow-2xl group-hover:shadow-red-500/25"
            >
              <span>View Details</span>
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50" />
    </motion.div>
  );
};

export default PortfolioCard;
