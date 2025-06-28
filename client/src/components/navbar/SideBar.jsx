import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiHome, FiUser, FiSettings, FiGrid, FiFileText, FiMail } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import logo from "../../media/general/logo.png";

const SideBar = ({ navItems, isOpen, setisOpen }) => {
  const location = useLocation();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Icon mapping for navigation items
  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'home': return <FiHome className="w-5 h-5" />;
      case 'about': return <FiUser className="w-5 h-5" />;
      case 'services': return <FiSettings className="w-5 h-5" />;
      case 'portfolio': return <FiGrid className="w-5 h-5" />;
      case 'blog': return <FiFileText className="w-5 h-5" />;
      case 'contact': return <FiMail className="w-5 h-5" />;
      default: return <FiHome className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40"
            onClick={() => setisOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-screen w-full sm:w-80 md:w-96 z-50"
          >
            {/* Glass morphism background */}
            <div className="relative h-full w-full bg-gradient-to-br from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl border-r border-white/10 shadow-2xl">
              
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Floating particles */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-red-500/30 rounded-full animate-pulse" />
                <div className="absolute top-40 right-20 w-1 h-1 bg-blue-500/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between p-6 border-b border-white/10"
                >
                  <Link to="/" onClick={() => setisOpen(false)} className="flex items-center space-x-3 group">
                    <div className="relative">
                      <img src={logo} alt="logo" className="w-8 h-8 transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-sm group-hover:bg-red-500/30 transition-colors" />
                    </div>
                    <span className="text-white font-bold text-lg">Web Agency</span>
                  </Link>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setisOpen(false)}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300"
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                {/* Navigation Items */}
                <nav className="flex-1 px-6 py-6 overflow-y-auto">
                  <div className="space-y-2">
                    {navItems.map((item, index) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setisOpen(false)}
                            className={`group flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-r from-red-600/20 to-red-500/10 border border-red-500/30 text-red-400 shadow-lg'
                                : 'text-white hover:bg-white/10 hover:border-white/20 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg transition-all duration-300 ${
                                isActive
                                  ? 'bg-red-600/20 text-red-400'
                                  : 'bg-white/10 text-white group-hover:bg-red-600/20 group-hover:text-red-400'
                              }`}>
                                {getIcon(item.name)}
                              </div>
                              <span className="font-medium capitalize tracking-wide">
                                {item.name}
                              </span>
                            </div>
                            
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-red-400 rounded-full"
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Footer */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="p-6 border-t border-white/10  mb-8"
                >
                  <div className="bg-whie/5 backdrop-blur-sm border border-white/10  rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Ready to start?</p>
                        <p className="text-gray-400 text-sm">Let's build something amazing</p>
                      </div>
                    </div>
                    <Link
                      to="/contact"
                      onClick={() => setisOpen(false)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium text-center block hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
                    >
                      Get Started
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar; 