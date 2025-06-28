import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiExternalLink,
  FiChevronRight,
  FiMaximize2,
  FiCalendar,
  FiUser,
  FiCode,
  FiTarget,
  FiCheckCircle,
  FiChevronLeft,
  FiX,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiTypescript, SiJavascript } from "react-icons/si";
import portfolioData from "../../data/portfolio/portfolioData";

const techIcons = {
  React: <FaReact className="text-blue-500" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  MongoDB: <SiMongodb className="text-green-700" />,
  TypeScript: <SiTypescript className="text-blue-600" />,
  JavaScript: <SiJavascript className="text-yellow-500" />,
};

const PortfolioDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const project = portfolioData.find((item) => item.id === parseInt(id));

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !project?.screenshots) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === project.screenshots.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, project?.screenshots]);

  // Pause auto-play on hover
  const handleCarouselHover = () => setIsAutoPlaying(false);
  const handleCarouselLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-xl mb-8">Project not found</p>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <FiArrowLeft />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${project.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95"></div>
        </div>

        {/* Floating Content */}
        <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-16 b-green-400">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-red-400 uppercase tracking-wider">
                {project.category || "Web Application"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight px-2">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              {project.shortDescription || project.description.substring(0, 200) + "..."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
              {project.liveLink && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white rounded-full font-bold text-base sm:text-lg shadow-2xl hover:bg-red-700 transition-all duration-300"
                >
                  <FiExternalLink className="text-lg sm:text-xl" />
                  <span>View Live Project</span>
                </motion.a>
              )}
              
              <Link
                to="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-base sm:text-lg hover:bg-white/20 transition-all duration-300"
              >
                <FiArrowLeft />
                <span>Back to Portfolio</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-red-500 rounded-full mt-1.5 sm:mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Project Stats */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 md:px-70">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 md:px-20"
          >
            {/* Timeline */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiCalendar className="text-2xl sm:text-3xl text-red-400" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Timeline</h3>
              <p className="text-sm sm:text-base text-gray-400">{project.timeline || "3 weeks (May 2024)"}</p>
            </div>

            {/* Client */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiUser className="text-2xl sm:text-3xl text-red-400" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Client</h3>
              <p className="text-sm sm:text-base text-gray-400">{project.client || "Confidential"}</p>
            </div>

            {/* Tech Stack Count */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-all duration-300 sm:col-span-2 lg:col-span-1 ">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ">
                <FiCode className="text-2xl sm:text-3xl text-red-400" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Technologies</h3>
              <p className="text-sm sm:text-base text-gray-400">{project.techStack?.length || 4} Technologies</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 md:px-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
                Project <span className="text-red-500">Story</span>
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-red-500 mx-auto"></div>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg sm:text-xl leading-relaxed text-gray-300 text-center px-2">
                {project.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Gallery Carousel */}
      {project.screenshots && (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 md:px-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
                  Interactive <span className="text-red-500">Experience</span>
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-red-500 mx-auto"></div>
              </div>

              {/* Carousel Container */}
              <div 
                className="relative group"
                onMouseEnter={handleCarouselHover}
                onMouseLeave={handleCarouselLeave}
              >
                {/* Main Carousel */}
                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <img
                        src={project.screenshots[currentSlide]}
                        alt={`Screenshot ${currentSlide + 1}`}
                        className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover cursor-pointer"
                        onClick={() => setSelectedImage(project.screenshots[currentSlide])}
                      />
                      
                      {/* Overlay with Feature Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                            Feature {currentSlide + 1}
                          </h3>
                          <p className="text-gray-300 text-sm sm:text-base">
                            {project.features?.[currentSlide] || `Key functionality showcase ${currentSlide + 1}`}
                          </p>
                        </div>
                      </div>

                      {/* Fullscreen Button */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                           onClick={() => setSelectedImage(project.screenshots[currentSlide])}>
                        <FiMaximize2 className="text-white" />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronLeft className="text-lg sm:text-xl" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronRight className="text-lg sm:text-xl" />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {project.screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-red-500 scale-125' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="text-center mt-4">
                  <span className="text-sm sm:text-base text-gray-400">
                    {currentSlide + 1} / {project.screenshots.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 md:px-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
                Technology <span className="text-red-500">Stack</span>
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-red-500 mx-auto"></div>
            </div>

            <div className="relative group">
              <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 no-scrollbar snap-x snap-mandatory">
                {(project.techStack || ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "TypeScript"]).map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex-shrink-0 w-64 sm:w-72 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 snap-center"
                  >
                    <div className="text-4xl sm:text-5xl mb-4 flex justify-center">
                      {techIcons[tech] || <FaReact className="text-gray-400" />}
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2">{tech}</h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {tech === "React" && "Frontend library for building user interfaces"}
                      {tech === "Node.js" && "JavaScript runtime environment for server-side development"}
                      {tech === "MongoDB" && "NoSQL database for flexible data storage"}
                      {tech === "Express" && "Web application framework for Node.js"}
                      {tech === "Tailwind CSS" && "Utility-first CSS framework for rapid UI development"}
                      {tech === "TypeScript" && "Type-safe JavaScript for better development experience"}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Scroll Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 md:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
                Challenges & <span className="text-red-500">Solutions</span>
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-red-500 mx-auto"></div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {project.challenge.map((challenge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  whileHover={{ x: 5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                        <FiTarget className="text-lg sm:text-2xl text-red-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                        Challenge {i + 1}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{challenge}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 md:px-20 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 text-white">
              Ready to Start Your <span className="text-black">Project?</span>
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Let's bring your vision to life with cutting-edge technology and stunning design.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-full font-bold text-base sm:text-lg hover:bg-gray-900 transition-all duration-300"
              >
                <FiCheckCircle />
                <span>Start Your Project</span>
              </Link>
              <Link
                to="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-bold text-base sm:text-lg hover:bg-white/30 transition-all duration-300"
              >
                <span>View More Projects</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
            >
              <img
                src={selectedImage}
                alt="Project Screenshot"
                className="w-full h-auto max-h-[90vh] object-contain rounded-xl sm:rounded-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors text-lg sm:text-xl"
              >
                <FiX />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioDetail;
