import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiStar, FiZap } from "react-icons/fi";

const PageHeader = ({ 
  title, 
  subtitle, 
  description, 
  breadcrumbs = [], 
  showStats = false,
  stats = [],
  variant = "default", // "default", "gradient", "minimal"
  showBadge = false,
  badgeText = "",
  badgeColor = "red"
}) => {
  const badgeColors = {
    red: "from-red-500 to-red-600",
    blue: "from-blue-500 to-blue-600", 
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600"
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className={`relative overflow-hidden ${
      variant === "minimal" 
        ? "py-8 sm:py-12 lg:py-16" 
        : "py-12 sm:py-16 md:py-20 lg:py-15 xl:py-20"
    }`}>
      {/* Background with gradient or image */}
      <div className="absolute inset-0">
       
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles - Responsive positioning */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-16 sm:top-20 left-4 sm:left-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-red-500/30 rounded-full"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
            className="absolute top-32 sm:top-40 right-4 sm:right-20 w-1 sm:w-1 h-1 sm:h-1 bg-blue-500/40 rounded-full"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
            className="absolute bottom-24 sm:bottom-32 left-1/4 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-purple-500/30 rounded-full"
          />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Breadcrumbs - Responsive */}
          {breadcrumbs.length > 0 && (
            <motion.nav 
              variants={itemVariants}
              className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mb-4 sm:mb-6"
              aria-label="Breadcrumb"
            >
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  )}
                  <span className={`text-xs sm:text-sm font-medium transition-colors ${
                    index === breadcrumbs.length - 1 
                      ? "text-red-400" 
                      : "text-gray-400 hover:text-white"
                  }`}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </motion.nav>
          )}

          {/* Badge - Responsive */}
          {showBadge && (
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6"
            >
              <div className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${badgeColors[badgeColor]} text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg`}>
                <FiZap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{badgeText}</span>
                <span className="sm:hidden">{badgeText.length > 12 ? badgeText.substring(0, 12) + '...' : badgeText}</span>
              </div>
            </motion.div>
          )}

          {/* Title - Responsive sizing */}
          <motion.h1
            variants={itemVariants}
            className={`font-black leading-tight mb-4 sm:mb-6 ${
              variant === "minimal" 
                ? "text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl" 
                : "text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
            }`}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>

          {/* Subtitle - Responsive */}
          {subtitle && (
            <motion.h2
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-300 mb-4 sm:mb-6"
            >
              {subtitle}
            </motion.h2>
          )}

          {/* Description - Responsive */}
          {description && (
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2"
            >
              {description}
            </motion.p>
          )}

          {/* Stats - Responsive grid */}
          {showStats && stats.length > 0 && (
            <motion.div
  variants={itemVariants}
  className=" grid place-content-center gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
  style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-red-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Decorative elements - Responsive */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-2 sm:gap-4 mt-8 sm:mt-12"
          >
            <div className="w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            <FiStar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-500" />
            <div className="w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave effect - Responsive */}
      {variant !== "minimal" && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            className="w-full h-8 sm:h-12 lg:h-16 text-black" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              fill="currentColor"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              fill="currentColor"
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </section>
  );
};

export default PageHeader; 