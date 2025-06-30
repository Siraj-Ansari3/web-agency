import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo/softera.png";
import SideBar from "./SideBar";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { admin, signOut } = useAuth();
  const [isOpen, setisOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    {
      id: 0,
      name: "home",
      path: "/",
    },
    {
      id: 1,
      name: "about",
      path: "/about",
    },
    {
      id: 2,
      name: "services",
      path: "/services",
    },
    {
      id: 3,
      name: "portfolio",
      path: "/portfolio",
    },
    {
      id: 4,
      name: "blog",
      path: "/blog",
    },
    {
      id: 5,
      name: "contact",
      path: "/contact",
    },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 bg-black/95 backdrop-blur-md shadow-lg border-b border-red-700/50`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 h-full`}>
        <div className="flex items-center justify-between h-full">
          {/* Logo - Left */}
          <div className="flex items-center h-full">
            <Link to="/">
              <motion.img 
                src={logo} 
                alt="logo" 
                className="cursor-pointer transition-all duration-300 object-contain"
                style={{
                  width: '100px',
                  height: '100px',
                  maxHeight: '100%'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <motion.button 
            className={`lg:hidden text-white focus:outline-none relative z-50 p-3`}
            onClick={() => setisOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`flex items-center justify-center bg-gradient-to-r from-red-600/20 to-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl hover:from-red-600/30 hover:to-red-500/30 transition-all duration-300 w-12 h-12`}>
              <motion.div
                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {isOpen ? (
                  <FiX className={`text-red-400 transition-all duration-300 w-6 h-6`} />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <motion.div 
                      className={`bg-red-400 rounded-full transition-all duration-300 w-5 h-0.5`}
                      animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                    />
                    <motion.div 
                      className={`bg-red-400 rounded-full transition-all duration-300 w-5 h-0.5`}
                      animate={{ opacity: isOpen ? 0 : 1 }}
                    />
                    <motion.div 
                      className={`bg-red-400 rounded-full transition-all duration-300 w-5 h-0.5`}
                      animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </motion.button>

          {/* Desktop Navigation links - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-4 xl:space-x-6">
              {navItems.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`font-medium uppercase transition-all duration-300 relative group text-white hover:text-red-500 text-base px-2 py-2`}
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right side - Admin/CTA */}
          <div className="hidden md:flex">
            {admin ? (
              <div className="relative flex items-center">
                {/* Profile Icon */}
                <motion.button
                  className="flex items-center focus:outline-none"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* SVG Profile Icon */}
                  <span className={`flex items-center justify-center rounded-full border-2 border-red-500 bg-black hover:bg-red-600/20 transition-all duration-300 w-10 h-10`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-white transition-all duration-300 w-8 h-8`}
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                    </svg>
                  </span>
                  <motion.svg 
                    className={`ml-1 text-white transition-all duration-300 w-5 h-5`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: showDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>
                {/* Dropdown - positioned below the icon */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-sm border border-red-700 rounded-lg shadow-lg z-50"
                    >
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-white hover:bg-red-900/50 hover:text-red-400 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        Dashboard
                      </Link>
                      <div className="px-4 py-2 text-gray-400 border-t border-red-900">
                        Admin: {admin.firstName}
                      </div>
                      <button
                        onClick={() => { setShowDropdown(false); signOut(); }}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-900/50 border-t border-red-900 hover:text-white transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button 
                className={`bg-gradient-to-r from-red-600 to-red-700 cursor-pointer rounded-full text-white font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 py-4 px-6 text-base`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
              >
                Get In Touch
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <SideBar navItems={navItems} isOpen={isOpen} setisOpen={setisOpen} />
    </motion.nav>
  );
};

export default Navbar;