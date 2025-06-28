// components/Portfolio.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import portfolioData from "../../data/portfolio/portfolioData";
import PortfolioCard from "./portfolioCard";
import PageHeader from "../../components/PageHeader";

const Portfolio = () => {
  const [selected, setSelected] = useState("All");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(6); // Show first 2 rows (6 items) initially
  const [isLoading, setIsLoading] = useState(false);

  // Dynamically get categories from data
  const allCategories = ["All", ...new Set(portfolioData.map(item => item.category))];
  
  // Filter projects
  const filtered = selected === "All" 
    ? portfolioData 
    : portfolioData.filter((item) => item.category === selected);

  // Get projects to display based on pagination
  const displayedProjects = filtered.slice(0, itemsToShow);
  const hasMoreProjects = displayedProjects.length < filtered.length;

  // Check scroll position for navigation arrows
  useEffect(() => {
    const checkScroll = () => {
      const container = document.getElementById('category-scroll');
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 1
        );
      }
    };

    const container = document.getElementById('category-scroll');
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [allCategories]);

  // Reset pagination when category changes
  useEffect(() => {
    setItemsToShow(6); // Reset to show first 2 rows
  }, [selected]);

  // Scroll functions
  const scrollLeft = () => {
    const container = document.getElementById('category-scroll');
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('category-scroll');
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Load more function - load next 2 rows (6 items)
  const loadMore = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setItemsToShow(prev => Math.min(prev + 6, filtered.length)); // Load 6 more items
    setIsLoading(false);
  };

  return (
    <div className="bg-black">
      {/* Page Header */}
      <PageHeader
        title="Portfolio"
        subtitle="Our Creative Work"
        description="Enterprise-grade digital products built with cutting-edge technologies and innovative design solutions."
        breadcrumbs={["Home", "Portfolio"]}
        showBadge={true}
        badgeText="Featured Projects"
        badgeColor="red"
        variant="gradient"
        showStats={true}
        stats={[
          { value: portfolioData.length, label: "Total Projects" },
          { value: allCategories.length - 1, label: "Categories" },
          { value: "100%", label: "Client Satisfaction" },
          { value: "24/7", label: "Support" }
        ]}
      />

      {/* Portfolio Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 xl:px-20 max-w-7xl mx-auto">
        {/* Enhanced Filter Section */}
        <div className="mb-10">
          {/* Mobile Dropdown */}
          <div className="block lg:hidden w-full mb-4">
            <div className="relative w-full">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-full appearance-none bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 pr-12 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all flex items-center justify-between"
              >
                <span>{selected}</span>
                <motion.div
                  animate={{ rotate: showMobileMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown className="text-white" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {showMobileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto"
                  >
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelected(cat);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full text-left px-6 py-3 hover:bg-white/10 transition-colors ${
                          selected === cat ? 'bg-red-600/20 text-red-400' : 'text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Enhanced Scrollable Pills */}
          <div className="hidden lg:block relative">
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 shadow-lg"
              >
                <FiChevronLeft />
              </motion.button>
            )}

            {/* Right Scroll Button */}
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 z-20 w-10 h-10 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 shadow-lg"
              >
                <FiChevronRight />
              </motion.button>
            )}

            {/* Scrollable Container */}
            <div 
              id="category-scroll"
              className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-4 -mx-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {allCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400
                    ${selected === cat
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl border border-red-500/30"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-red-500/30"
                    }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Gradient Fade Indicators */}
            <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>

          {/* Tablet/Middle Screen Responsive Grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allCategories.slice(0, 6).map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm
                    ${selected === cat
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl border border-red-500/30"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-red-500/30"
                    }`}
                >
                  {cat}
                </motion.button>
              ))}
              {allCategories.length > 6 && (
                <motion.button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                >
                  +{allCategories.length - 6} More
                </motion.button>
              )}
            </div>
            
            {/* Dropdown for remaining categories on tablet */}
            <AnimatePresence>
              {showMobileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-2">
                    {allCategories.slice(6).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelected(cat);
                          setShowMobileMenu(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors ${
                          selected === cat ? 'bg-red-600/20 text-red-400' : 'text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-gray-400 text-sm">
            Showing {displayedProjects.length} of {filtered.length} projects
            {selected !== "All" && ` in ${selected}`}
          </p>
        </div>

        {/* Grid of Cards - Max 3 per row */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="wait">
            {displayedProjects.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <PortfolioCard
                  longSS={item.longSS}
                  category={item.category}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={loadMore}
              disabled={isLoading}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <FiPlus className="text-xl" />
                  <span>Load More Projects</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* No Results Message */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg mb-4">No projects found in this category.</p>
            <button
              onClick={() => setSelected("All")}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              View All Projects
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
