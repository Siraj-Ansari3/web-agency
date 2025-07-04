// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center">
        {/* Animated 404 text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-[200px] md:text-[280px] font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent tracking-tighter">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-600 blur-3xl opacity-50"></div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The page you're looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link 
            to="/" 
            className="px-8 py-3 bg-red-600 hover:bg-red-700 transition-colors rounded-lg font-medium text-center"
          >
            Go to Homepage
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="px-8 py-3 border border-red-600 hover:bg-red-600/10 transition-colors rounded-lg font-medium"
          >
            Go Back
          </button>
        </motion.div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
                className="w-4 h-4 rounded-full bg-red-600"
              ></motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;