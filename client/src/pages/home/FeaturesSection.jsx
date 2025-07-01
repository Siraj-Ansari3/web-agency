import React from 'react';
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
  const features = [
    {
      icon: <FaBolt className="text-red-500 text-3xl" />,
      title: "Lightning Fast",
      stat: "0.8s Load Time",
      highlight: "300% Faster",
      description: "Web apps that load instantly"
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-3xl" />,
      title: "Ironclad Security",
      stat: "100% Secure",
      highlight: "Zero Breaches",
      description: "Military-grade protection"
    },
    {
      icon: <FaMobile className="text-red-500 text-3xl" />,
      title: "Perfect on Mobile",
      stat: "100% Score",
      highlight: "All Devices",
      description: "Flawless on every screen"
    },
    {
      icon: <FaRocket className="text-red-500 text-3xl" />,
      title: "Easy Scaling",
      stat: "10M+ Users",
      highlight: "Zero Downtime",
      description: "Grows with your business"
    },
    {
      icon: <FaChartLine className="text-red-500 text-3xl" />,
      title: "Real Analytics",
      stat: "Live Data",
      highlight: "Actionable Insights",
      description: "Make smart decisions"
    },
    {
      icon: <FaCog className="text-red-500 text-3xl" />,
      title: "Always Updated",
      stat: "24/7 Support",
      highlight: "Auto-Updates",
      description: "We handle maintenance"
    }
  ];

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Glowing red accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-red-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Headline */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Professional Web Apps That <span className="text-red-500">Deliver</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Built for speed, security, and scalability
          </motion.p>
        </div>

        {/* Feature cards with pure black background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="bg-black border-2 border-gray-800 rounded-xl p-8 transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-red-500">{feature.stat}</span>
                  <span className="text-sm bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <p className="text-gray-300 mb-6 flex-grow">{feature.description}</p>
                <div className="w-full h-px bg-gray-800 mb-4"></div>
                <div className="text-red-500 font-medium flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <button
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            onClick={() => {
              window.location.href = '/contact';
            }}
          >
            Get Started Today
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            No obligation - just answers
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;