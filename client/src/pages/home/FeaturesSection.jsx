import React, { useState } from 'react';
import features from '../../data/features/featuresData';
import { Link } from 'react-router-dom';
import { 
  FaBolt, 
  FaShieldAlt,
  FaMobile,
  FaRocket,
  FaChartLine,
  FaCog 
} from 'react-icons/fa';

const iconMap = {
  FaBolt,
  FaShieldAlt,
  FaMobile,
  FaRocket,
  FaChartLine,
  FaCog,
};

const FeaturesSection = () => {
  const [modalFeature, setModalFeature] = useState(null);

  const openModal = (feature) => setModalFeature(feature);
  const closeModal = () => setModalFeature(null);

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl  sm:text-4xl lg:text-5xl font-bold text-white">
            Professional Web Apps That <span className="text-red-500">Deliver</span>
          </h2>
          <p className="text-gray-400 text-lg mt-2">
            Built for speed, security, and scalability
          </p>
        </div>

        {/* Grid Layout for large screens only */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="flex flex-col bg-black rounded-xl p-6 border border-red-700/50 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-600"
              >
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    {Icon && <Icon className="text-white text-3xl" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-4 flex-grow">{feature.description}</p>
                <div className="mb-4">
                  <p className="text-red-400 font-medium text-sm">{feature.stat}</p>
                  <p className="text-gray-400 text-xs">{feature.highlight}</p>
                </div>
                <button onClick={() => openModal(feature)} className="w-full py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium text-center block transition-all hover:from-red-700 hover:to-red-800">
                  Learn More
                </button>
              </div>
            );
          })}
                  </div>

        {/* Horizontal Scroller for small screens only */}
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 lg:hidden scrollbar-hide">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="flex-shrink-0 w-48 sm:w-60 md:w-72 min-h-[220px] sm:min-h-[300px] flex flex-col bg-black rounded-xl p-4 sm:p-6 border border-red-700/50 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-600"
              >
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    {Icon && <Icon className="text-white text-3xl" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-4 flex-grow">{feature.description}</p>
                <div className="mb-4">
                  <p className="text-red-400 font-medium text-sm">{feature.stat}</p>
                  <p className="text-gray-400 text-xs">{feature.highlight}</p>
                </div>
                <button onClick={() => openModal(feature)} className="w-full py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium text-center block transition-all hover:from-red-700 hover:to-red-800">
                  Learn More
                </button>
          </div>
            );
          })}
        </div>
      </div>

      {/* Modal Popup for Feature Details */}
      {modalFeature && (() => {
        const Icon = iconMap[modalFeature.icon];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-black border border-red-700/50 rounded-2xl shadow-xl max-w-xl w-full p-8 flex flex-col items-center relative animate-fadeIn">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
              <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mb-6 shadow-lg">
                {Icon && <Icon className="text-white text-3xl" />}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 text-center">{modalFeature.title}</h1>
              <div className="flex gap-3 mb-4">
                <span className="inline-block bg-red-700/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{modalFeature.stat}</span>
                <span className="inline-block bg-gray-800 text-red-300 text-xs font-semibold px-3 py-1 rounded-full">{modalFeature.highlight}</span>
              </div>
              <p className="text-gray-300 text-center text-lg mb-6">{modalFeature.longDescription}</p>
              <button onClick={closeModal} className="mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium shadow hover:from-red-700 hover:to-red-800 transition-all">Close</button>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default FeaturesSection;