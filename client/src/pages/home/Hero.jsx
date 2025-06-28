import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiArrowRight, FiLayout, FiChevronRight, FiGlobe, FiZap } from 'react-icons/fi';
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
  const constraintsRef = useRef(null);

  // Web services with attractive colors - changed to red tones
  const services = [
    {
      icon: FiGlobe,
      title: "Business Websites",
      desc: "Stunning & Fast",
      color: "#dc2626",
      features: ["SEO Optimized", "Lightning Fast", "Mobile First"],
    },
    {
      icon: FiLayout,
      title: "Web Apps",
      desc: "Powerful Solutions",
      color: "#b91c1c",
      features: ["User Dashboards", "Real-time Data", "Secure Auth"],
    },
    {
      icon: FaRocket,
      title: "Landing Pages",
      desc: "High-Converting",
      color: "#991b1b",
      features: ["A/B Testing", "Lead Generation", "Performance Focused"],
    }
  ];

  // Auto-rotate services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
      animate(count, 100, { duration: 1 });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentService = services[activeService];

  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Remove animated floating particles and glowing orb overlays for pure black bg */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none"> ... </div> */}
      {/* <div className="absolute -left-1/4 -top-1/4 w-[800px] h-[800px] rounded-full bg-red-400/10 blur-[150px]"></div> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Content Section - updated text colors */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-black/80 backdrop-blur-md border border-red-200 rounded-full mb-6 shadow-sm">
                <TbSparkles className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-red-200">PREMIUM WEB DEVELOPMENT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">{data.title}</span>
              </h1>

              <p className="text-xl text-gray-300 mb-6 max-w-lg">
                {data.subtitle}
              </p>

              {/* Animated services tags - updated for dark theme */}
              <motion.div className="mb-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  {['Websites', 'Web Apps', 'E-commerce', 'Landing Pages'].map((item, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-4 py-2 bg-black border border-red-200 text-red-200 rounded-full hover:bg-red-900 transition-all shadow-sm"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(data.ctaLink)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-400 text-white rounded-lg font-medium hover:shadow-xl hover:shadow-red-400/30 transition-all"
                >
                  {data.ctaText}
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('work')}
                  className="flex items-center px-6 py-3 bg-black text-red-300 rounded-lg font-medium border border-red-300 hover:bg-red-900 transition-all shadow-sm"
                >
                  View Portfolio
                  <FiChevronRight className="ml-2 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* 3D Card Section - updated for dark theme */}
          <div className="w-full lg:w-1/2">
            <motion.div
              ref={constraintsRef}
              className="relative h-[400px]"
            >
              <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                whileHover={{ scale: 1.02 }}
                className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 backdrop-blur-sm`}
                style={{
                  background: `linear-gradient(45deg, ${currentService.color}15, ${currentService.color}08)`,
                }}
              >
                {/* Card glow - subtle for dark theme */}
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow: `inset 0 0 60px ${currentService.color}15`,
                  }}
                ></div>

                {/* Card content - updated colors */}
                <div className="relative z-10 h-full flex flex-col p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className="p-4 rounded-xl bg-black/80 backdrop-blur-md border border-red-200 shadow-sm"
                      style={{ color: currentService.color }}
                    >
                      <currentService.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-white">{currentService.title}</h3>
                      <p className="text-sm text-gray-400">{currentService.desc}</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-gradient-to-br from-black to-red-900/50 rounded-xl p-6 border border-red-200 shadow-inner">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">FEATURES</h4>
                    <ul className="space-y-3">
                      {currentService.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          whileHover={{ x: 5 }}
                          className="flex items-start"
                        >
                          <div
                            className="flex-shrink-0 mt-1 mr-3 w-2 h-2 rounded-full"
                            style={{ backgroundColor: currentService.color }}
                          ></div>
                          <span className="text-gray-200">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Service indicators - updated for dark theme */}
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