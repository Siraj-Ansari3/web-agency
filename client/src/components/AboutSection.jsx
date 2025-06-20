import React from 'react';
import { FiCode, FiLayers, FiUsers, FiCheckCircle, FiCpu, FiServer } from 'react-icons/fi';

const AboutSection = () => {
  return (
    <section className="py-16 bg-blue-50" id="about"> {/* Light blue background */}
      <div className="container mx-auto px-5 max-w-6xl">
        {/* Header with light blue accent */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Development Story</h2>
          <div className="w-20 h-1 bg-blue-400 mx-auto mb-4"></div> {/* Light blue divider */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From concept to deployment - we transform ideas into powerful digital solutions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left Side - Development Focus */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm mb-6"> {/* Light blue border */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiCode className="text-blue-400 mr-2" /> {/* Light blue icon */}
                Our Development Process
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-500 p-1 rounded-full mr-3">
                    <span className="text-xs font-bold block w-5 h-5 text-center">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Requirement Analysis</h4>
                    <p className="text-gray-600 text-sm">
                      We start by deeply understanding your business needs and technical requirements
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-500 p-1 rounded-full mr-3">
                    <span className="text-xs font-bold block w-5 h-5 text-center">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Architecture Design</h4>
                    <p className="text-gray-600 text-sm">
                      Crafting scalable system architecture with modern technologies
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-500 p-1 rounded-full mr-3">
                    <span className="text-xs font-bold block w-5 h-5 text-center">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Agile Development</h4>
                    <p className="text-gray-600 text-sm">
                      Two-week sprints with continuous integration and deployment
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-100 p-6 rounded-xl border border-blue-200"> {/* Light blue card */}
              <h4 className="font-medium text-gray-800 mb-3">Our Tech Stack</h4>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-300">React.js</span>
                <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-300">Node.js</span>
                <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-300">MongoDB</span>
                <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-300">AWS</span>
                <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-300">Docker</span>
                <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-300">GraphQL</span>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 mb-6"> {/* Light blue border */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Our Development Team</h3>
              <p className="text-gray-600 mb-4">
                We combine technical expertise with business understanding to deliver solutions that drive real results. 
                Our team of certified developers brings years of experience across multiple industries.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <FiCheckCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" /> {/* Light blue icon */}
                  <span className="text-gray-600 text-sm">15+ years combined experience</span>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">50+ successful projects</span>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Agile development process</span>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Dedicated project managers</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-100"> {/* Light blue border */}
                <div className="bg-blue-100 text-blue-500 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                  <FiServer className="text-lg" />
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Backend Expertise</h4>
                <p className="text-gray-600 text-xs">
                  Robust API development and database architecture
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100"> {/* Light blue border */}
                <div className="bg-blue-100 text-blue-500 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                  <FiLayers className="text-lg" />
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Frontend Excellence</h4>
                <p className="text-gray-600 text-xs">
                  Pixel-perfect responsive interfaces
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;