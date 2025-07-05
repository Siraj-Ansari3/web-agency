import React, { useRef, useEffect } from 'react';
import { 
  FaBolt, 
  FaShieldAlt,
  FaMobile,
  FaRocket,
  FaChartLine,
  FaCog 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const scrollRef = useRef(null);
  
  const features = [
    {
      icon: <FaBolt className="text-red-500 text-2xl" />,
      title: "Lightning Fast",
      stat: "0.8s Load Time",
      highlight: "300% Faster",
      description: "Web apps that load instantly"
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-2xl" />,
      title: "Ironclad Security",
      stat: "100% Secure",
      highlight: "Zero Breaches",
      description: "Military-grade protection"
    },
    {
      icon: <FaMobile className="text-red-500 text-2xl" />,
      title: "Perfect on Mobile",
      stat: "100% Score",
      highlight: "All Devices",
      description: "Flawless on every screen"
    },
    {
      icon: <FaRocket className="text-red-500 text-2xl" />,
      title: "Easy Scaling",
      stat: "10M+ Users",
      highlight: "Zero Downtime",
      description: "Grows with your business"
    },
    {
      icon: <FaChartLine className="text-red-500 text-2xl" />,
      title: "Real Analytics",
      stat: "Live Data",
      highlight: "Actionable Insights",
      description: "Make smart decisions"
    },
    {
      icon: <FaCog className="text-red-500 text-2xl" />,
      title: "Always Updated",
      stat: "24/7 Support",
      highlight: "Auto-Updates",
      description: "We handle maintenance"
    },
    {
      icon: <FaBolt className="text-red-500 text-2xl" />,
      title: "SEO Optimized",
      stat: "#1 Ranking",
      highlight: "Top Results",
      description: "Boost your visibility"
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-2xl" />,
      title: "GDPR Ready",
      stat: "100% Compliant",
      highlight: "Privacy First",
      description: "Data protection guaranteed"
    }
  ];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector('.feature-card');
    if (card) {
      container.scrollLeft = card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2);
    }
  }, []);

  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Glowing red accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-red-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Headline */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Professional Web Apps That <span className="text-red-500">Deliver</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Built for speed, security, and scalability
          </motion.p>
        </div>

        {/* Feature cards with horizontal scroll on small screens */}
        <div className="features-scroll-container">
          {/* Grid layout for large screens */}
          {/* Removed grid layout for large screens */}

          {/* Horizontal scroll for all screen sizes */}
          <div
            className="flex features-list gap-3 md:gap-4 p-2 md:p-4 overflow-x-auto overflow-y-hidden"
            ref={scrollRef}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  borderColor: "#ef4444",
                  boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.3)"
                }}
                className="feature-card bg-black border-2 border-red-600 rounded-xl min-w-[260px] max-w-[320px] md:min-w-[300px] md:max-w-[360px] min-h-[260px] md:min-h-[320px] p-3 sm:p-4 md:p-6 flex-shrink-0 text-white shadow-xl hover:shadow-red-600 transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-2 sm:mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{feature.title}</h3>
                  <div className="flex items-baseline gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <span className="text-base sm:text-xl font-bold text-red-500">{feature.stat}</span>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2 sm:mb-3 flex-grow text-xs sm:text-sm">{feature.description}</p>
                  <div className="w-full h-px bg-gray-800 mb-1 sm:mb-2"></div>
                  <div className="text-red-500 font-medium flex items-center text-xs sm:text-sm">
                    Learn more
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            onClick={() => {
              window.location.href = '/contact';
            }}
          >
            Get Started Today
          </button>
          <p className="text-gray-500 mt-3 text-sm">
            No obligation - just answers
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .features-scroll-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .features-list {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 16px 0;
          flex: 1;
          scrollbar-width: none;
          -ms-overflow-style: none;
          align-items: stretch;
        }

        .features-list::-webkit-scrollbar {
          display: none;
        }

        .feature-card {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          min-width: 280px;
          max-width: 320px;
          height: 100%;
          min-height: 280px;
          box-sizing: border-box;
          background: #000000;
          border-radius: 16px;
          padding: 24px;
          box-shadow: none;
          transition: all 0.4s ease;
          border: 1px solid #374151;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(220, 38, 38, 0.3);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        @media (max-width: 768px) {
          .features-scroll-container {
            gap: 8px;
          }

          .features-list {
            gap: 12px;
            padding: 12px 0;
          }

          .feature-card {
            min-width: 260px;
            max-width: 280px;
            min-height: 260px;
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .feature-card {
            min-width: 240px;
            max-width: 260px;
            min-height: 240px;
            padding: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;