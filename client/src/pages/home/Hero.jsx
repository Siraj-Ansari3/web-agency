import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiArrowRight, FiLayout, FiChevronRight, FiGlobe, FiZap, FiShoppingCart, FiBriefcase } from 'react-icons/fi';
import { FaRocket, FaShieldAlt } from 'react-icons/fa';
import { TbSparkles } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Hero = ({ data }) => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const [activeService, setActiveService] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [isHovered, setIsHovered] = useState(false);

  // Updated web services with more types
  const services = [
    {
      icon: FiGlobe,
      title: "Business Systems",
      desc: "Professional & Effective",
      color: "#dc2626",
      features: ["SEO Optimized", "Mobile Responsive", "Fast Loading"],
    },
    {
      icon: FiLayout,
      title: "Blogging Sites",
      desc: "Fully SEO Blogging Websites ",
      color: "#b91c1c",
      features: ["Blog Editor", "Attractive Reading Interface", "Admin Dashboard"],
    },
    {
      icon: FiShoppingCart,
      title: "E-commerce Sites",
      desc: "Sell Online",
      color: "#991b1b",
      features: ["Product Management", "Secure Checkout", "Payment Integration"],
    },
    {
      icon: FaRocket,
      title: "Landing Pages",
      desc: "High-Converting",
      color: "#7f1d1d",
      features: ["Lead Generation", "A/B Testing", "Performance Focused"],
    },
    {
      icon: FiBriefcase,
      title: "Portfolio Sites",
      desc: "Showcase Your Work",
      color: "#63171b",
      features: ["Creative Designs", "Case Studies", "Client Testimonials"],
    },
    {
      icon: FaShieldAlt,
      title: "Management Systems",
      desc: "Streamline Operations",
      color: "#450a0a",
      features: ["Admin Panels", "Data Analytics", "Workflow Automation"],
    }
  ];

  // Auto-rotate services with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveService((prev) => (prev + 1) % services.length);
        animate(count, 100, { duration: 1 });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentService = services[activeService];

  return (
    <section className="relative min-h-screen flex items-center  overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 w-full z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-black/80 backdrop-blur-md border border-red-200 rounded-full mb-6 shadow-sm">
                <TbSparkles className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm pr-2 font-medium text-red-200">MARSEV </span>
                <span className="text-sm font-medium text-red-200">TECH</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">{data.title}</span>
              </h1>

              <p className="sm:text-xl text-justify text-gray-300 mb-6 max-w-lg">
                {data.subtitle}
              </p>

              {/* Auto-scrolling services tags slider with fade effect */}
              <div className="md:mb-8 relative">
                <div className="absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                <motion.div className="overflow-hidden py-2">
                  <motion.div
                    className="flex gap-4 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration: 20,
                      ease: 'linear',
                    }}
                    style={{ willChange: 'transform' }}
                  >
                    {[...services, ...services].map((service, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center text-xs md:text-sm px-4 py-2 bg-black border border-red-200 text-red-200 rounded-full hover:bg-red-900 transition-all shadow-sm mx-1"
                      >
                        {service.title}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 py-5 sm:py-0">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(data.ctaLink)}
                  className="flex items-center justify-center w-full sm:w-auto px-4 py-3 cursor-pointer bg-gradient-to-r from-red-600 to-red-400 text-white rounded-lg font-medium hover:shadow-xl hover:shadow-red-400/30 transition-all text-sm md:text-base"

                >
                  {data.ctaText}
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/portfolio")}
                  className="flex items-center justify-center w-full cursor-pointer sm:w-auto px-4 py-3 bg-black text-red-300 rounded-lg font-medium border border-red-300 hover:bg-red-900 transition-all shadow-sm text-sm md:text-base"

                >
                  View Portfolio
                  <FiChevronRight className="ml-2 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Service Card Section - Removed drag functionality */}
          <div className="w-full lg:w-1/2">
            <motion.div
              className="relative h-[400px]"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 backdrop-blur-sm`}
                style={{
                  background: `linear-gradient(45deg, ${currentService.color}15, ${currentService.color}08)`,
                }}
              >
                {/* Card glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow: `inset 0 0 60px ${currentService.color}15`,
                  }}
                ></div>

                {/* Card content */}
                <div className="relative z-10 h-full flex flex-col p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className="p-4 rounded-xl bg-black/80 backdrop-blur-md border border-red-200 shadow-sm"
                      style={{ color: currentService.color }}
                    >
                      <currentService.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-white">
                        {currentService.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {currentService.desc}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    className="flex-1 rounded-xl p-6 border border-red-200/30 shadow-inner"
                    style={{
                      background: 'linear-gradient(145deg, rgba(30,30,30,0.5), rgba(60,0,0,0.3))',
                      backdropFilter: 'blur(10px)',
                      boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), inset 0 0 10px rgba(255,50,50,0.2), 0 0 20px rgba(0,0,0,0.3)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      FEATURES
                    </h4>
                    <ul className="space-y-3">
                      {currentService.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                          className="flex items-start"
                        >
                          <div
                            className="flex-shrink-0 mt-1 mr-3 w-2 h-2 rounded-full"
                            style={{ backgroundColor: currentService.color }}
                          ></div>
                          <span className="text-gray-200">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Service indicators */}
            <div className="flex justify-center mt-8">
              <div className="inline-flex space-x-2 bg-black/80 px-3 py-2 rounded-full shadow-sm border border-red-200">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveService(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === activeService ?
                      'bg-red-600' :
                      'bg-red-300 hover:bg-red-400'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;