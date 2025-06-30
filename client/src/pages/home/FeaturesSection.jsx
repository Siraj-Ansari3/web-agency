import React from 'react';
import {
  FaSlidersH,
  FaMobileAlt,
  FaPalette,
  FaExchangeAlt,
  FaLaptopCode,
  FaPlug
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const iconMap = {
  FaSlidersH,
  FaMobileAlt,
  FaPalette,
  FaExchangeAlt,
  FaLaptopCode,
  FaPlug,
  // Add more icons as needed
};

const FeaturesSection = ({
  features,
  tagline = "Key Features",
  title = "Our Powerful Features",
  description = "We build web applications with cutting-edge technologies and user-centric design principles to deliver exceptional digital experiences."
}) => {

  // Fallback icon component
  const FallbackIcon = () => (
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (

    <section className="relative py-16 md:py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          {tagline && (
            <span className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full mb-4">
              {tagline}
            </span>
          )}

          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
          )}

          <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>

          {description && (
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || FallbackIcon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-black p-6 md:p-8 rounded-xl hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2 border border-red-600 hover:border-red-400 relative"
              >
                <div className="text-red-500 group-hover:text-red-600 flex justify-center mb-4 md:mb-6 transition-colors duration-300">
                  <div className="p-3 md:p-4 bg-red-50 rounded-full group-hover:bg-red-100">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white text-center mb-3 md:mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-200 text-center text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;