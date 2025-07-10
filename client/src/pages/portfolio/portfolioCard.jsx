import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PortfolioCard = ({ longSS, category, id, title }) => {
  return (
    <Link
              to={`/portfolio/${id}`}
            >
    <motion.div
      className="group relative w-full max-w-[400px] cursor-pointer mx-auto h-[320px] md:h-[340px] lg:h-[360px] min-h-[320px] max-h-[360px] overflow-hidden rounded-xl bg-black text-white shadow-xl border-2 border-red-600 transition-all duration-300 flex flex-col justify-end"
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
      
      {/* Image Container with CSS TranslateY Scroll */}
      <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl">
        <img
          src={longSS}
          alt={category}
          className="w-full h-auto object-cover transition-transform duration-[3000ms] ease-linear transform translate-y-0 group-hover:translate-y-[-70%]"
          style={{
            minHeight: "200%", // Make sure image is tall enough to scroll
          }}
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

      {/* Footer Overlay */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full z-40 px-0 pb-0"
        initial={{ y: 0 }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black/95 backdrop-blur-md rounded-b-2xl p-4 flex flex-col space-y-2 shadow-xl border-t border-red-500/20">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-red-600 transition-colors duration-300 text-center" title={title}>
            {title}
          </h3>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/portfolio/${id}`}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-2 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 group-hover:shadow-2xl group-hover:shadow-red-500/25"
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
    </Link>
  );
};

export default PortfolioCard;