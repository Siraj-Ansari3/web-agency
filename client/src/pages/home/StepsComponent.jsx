import React from 'react';
import { motion } from 'framer-motion';

const StepsComponent = ({ steps, page = "undefined" }) => {

  console.log(steps.steps)
  return (

    <div className="max-w-6xl mx-auto p-6 md:p-10 font-sans">
      {page === "about" ? "" : <div className="text-center mb-8 md:mb-12">
        <h2 className="text-gray-600 text-lg mb-2 uppercase">{steps.title}</h2>
        <h1 className="text-gray-800 text-3xl md:text-4xl font-bold">{steps.subtitle}</h1>
      </div>}

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Steps container - unchanged from previous version */}
        <div className="flex flex-col items-center relative w-full lg:w-1/2">
          {/* Vertical connecting line */}
          <div className="absolute left-8 h-full w-0.5 bg-red-600"></div>



          {steps.steps?.map((step, i) => {
            return (
              <div className="relative flex w-full mb-8 md:mb-12 pl-4">
                <div className="absolute -left-4 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white rounded-full border-4 border-blue-500 z-10">
                  <span className="text-blue-500 font-bold text-xl md:text-2xl">{step.stepNumber}</span>
                </div>
                <div className="ml-12 md:ml-16 p-4 md:p-6 rounded-lg shadow-md bg-white w-full">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{step.title}</h3>
                  <p className="text-gray-700 text-sm md:text-base mb-1 md:mb-2">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}


        </div>

        {/* Enhanced Visual Process Diagram */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg">
            <svg viewBox="0 0 500 500" className="w-full h-auto">
              {/* Animated background circle */}
              <circle cx="250" cy="250" r="230" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" className="animate-pulse" />

              {/* Circular path */}
              <circle cx="250" cy="250" r="180" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5,5" />

              {/* Fixed orbiting blue ball - now stays perfectly on the path */}
              <motion.circle
                cx="250" cy="70" r="8" fill="#3B82F6"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: 'linear',
                }}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                  transformBox: 'fill-box',
                }}
              />

              {/* Planning section */}
              <g transform="translate(250, 80)" className="group hover:scale-110 transition-transform duration-300">
                <circle cx="0" cy="0" r="50" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="4" className="drop-shadow-lg" />
                <svg x="-20" y="-20" width="40" height="40" viewBox="0 0 24 24" fill="#3B82F6">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <text x="0" y="75" textAnchor="middle" fill="#1E3A8A" fontFamily="Arial" fontSize="16" fontWeight="bold" className="group-hover:text-blue-600 transition-colors">Planning</text>
                <circle cx="0" cy="0" r="50" fill="transparent" stroke="#3B82F6" strokeWidth="10" strokeDasharray="314" strokeDashoffset="314" className="animate-draw">
                  <animate attributeName="stroke-dashoffset" from="314" to="0" dur="2s" fill="freeze" />
                </circle>
              </g>

              {/* Development section */}
              <g transform="translate(400, 250)" className="group hover:scale-110 transition-transform duration-300">
                <circle cx="0" cy="0" r="50" fill="#FFFFFF" stroke="#10B981" strokeWidth="4" className="drop-shadow-lg" />
                <svg x="-15" y="-15" width="30" height="30" viewBox="0 0 24 24" fill="#10B981">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
                    transform="translate(0, 2)" />
                </svg>
                <text x="0" y="75" textAnchor="middle" fill="#065F46" fontFamily="Arial" fontSize="16" fontWeight="bold" className="group-hover:text-green-600 transition-colors">Development</text>
                <circle cx="0" cy="0" r="50" fill="transparent" stroke="#10B981" strokeWidth="10" strokeDasharray="314" strokeDashoffset="314" className="animate-draw">
                  <animate attributeName="stroke-dashoffset" from="314" to="0" dur="2s" begin="0.5s" fill="freeze" />
                </circle>
              </g>

              {/* Deployment section with fixed cloud hover and scale */}
              <g transform="translate(250, 420)" className="group">
                <motion.g
                  whileHover={{ y: 10, scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                  className="hover:drop-shadow-lg"
                >
                  <circle cx="0" cy="0" r="50" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="4" />
                  <svg x="-20" y="-20" width="40" height="40" viewBox="0 0 24 24" fill="#8B5CF6">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
                    <path d="M8 13h2.55v-2.5H11v2.5h2.45V15H11v2.5H8.55V15H8z" fill="#FFFFFF" />
                  </svg>
                </motion.g>
                <text x="0" y="75" textAnchor="middle" fill="#5B21B6" fontFamily="Arial" fontSize="16" fontWeight="bold" className="group-hover:text-purple-600 transition-colors">Deployment</text>
                <circle cx="0" cy="0" r="50" fill="transparent" stroke="#8B5CF6" strokeWidth="10" strokeDasharray="314" strokeDashoffset="314" className="animate-draw">
                  <animate attributeName="stroke-dashoffset" from="314" to="0" dur="2s" begin="1s" fill="freeze" />
                </circle>
              </g>

              {/* Connecting arrows - animated */}
              <path d="M250,130 A180,180 0 0,1 400,250" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2s" fill="freeze" />
              </path>
              <path d="M400,270 A180,180 0 0,1 250,390" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2s" begin="0.5s" fill="freeze" />
              </path>
              <path d="M250,410 A180,180 0 0,1 100,250" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2s" begin="1s" fill="freeze" />
              </path>
              <path d="M100,230 A180,180 0 0,1 250,110" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2s" begin="1.5s" fill="freeze" />
              </path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsComponent;