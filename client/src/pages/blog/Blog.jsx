import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import BlogCard from "../../components/BlogCard";
// import blogCardsData from "../../data/blogs/cardsData";
import PageHeader from "../../components/PageHeader";
import axios from "axios";

const CARDS_PER_PAGE = 6;

const Blog = () => {

  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [blogCardsData, setBlogCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/blog/get-all-blogs");
          setBlogCardsData(response.data.blogs)
          
          setIsLoading(false)
          console.log(response.data.blogs)
        } catch (error) {
          console.log(error)
          setIsLoading(false)
  
        }
      }
  
      fetchBlogs();
  
    }, [])

  // Get unique categories from data
  const categories = useMemo(() => {
    const cats = blogCardsData?.map((b) => b.category || "General");
    return ["All", ...Array.from(new Set(cats))];
  }, []);

  // Filter blogs by search and category
  const filteredBlogs = useMemo(() => {
    return blogCardsData?.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.disc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.auther && blog.auther.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Reset visibleCount when filters/search change
  useEffect(() => {
    setVisibleCount(CARDS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  };

  const canLoadMore = visibleCount < filteredBlogs?.length;

  const clearSearch = () => {
    setSearchQuery("");
  };


  return (
    <div className="bg-black">
      {/* Page Header */}
      <PageHeader
        title="Blog & Insights"
        subtitle="Creative Stories"
        description="Curated stories, resources, and ideas for the modern creative. Discover insights that inspire and inform."
        breadcrumbs={["Home", "Blog"]}
        showBadge={true}
        badgeText="Latest Articles"
        badgeColor="red"
        variant="gradient"
        showStats={true}
        stats={[
          { value: blogCardsData?.length, label: "Articles" },
          { value: categories.length - 1, label: "Categories" },
          { value: "10K+", label: "Readers" },
          { value: "Weekly", label: "Updates" }
        ]}
      />

      {/* Modern Search & Filter Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Desktop Search Bar */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-2">
                <div className="flex items-center gap-3">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-lg"
                      placeholder="Search articles, topics, or authors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        <FiX className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 cursor-pointer hover:bg-white/15"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-gray-900 text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden space-y-4">
            {/* Mobile Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
                <div className="flex items-center px-4 py-3">
                  <FiSearch className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="ml-2"
                    >
                      <FiX className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Mobile Filter Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl flex items-center justify-between hover:bg-white/15 transition-all duration-300"
            >
              <span className="flex items-center">
                <FiFilter className="h-4 w-4 mr-2" />
                Category: {selectedCategory}
              </span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-300 ${showMobileFilters ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Mobile Category Dropdown */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="p-2 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowMobileFilters(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          selectedCategory === cat
                            ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                            : 'text-white hover:bg-white/10'
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

          {/* Search Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <span className="text-gray-300 text-sm">
                Showing {Math.min(visibleCount, filteredBlogs?.length)} of {filteredBlogs?.length} articles
              </span>
              {(searchQuery || selectedCategory !== "All") && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-red-400 text-sm">
                    {searchQuery && `"${searchQuery}"`}
                    {searchQuery && selectedCategory !== "All" && " in "}
                    {selectedCategory !== "All" && selectedCategory}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Magazine/Masonry Blog Grid */}
      <section className="bg-black min-h-[60vh] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          {filteredBlogs?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <BlogCard data={filteredBlogs?.slice(0, visibleCount)} />
              </div>
              {canLoadMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-12"
                >
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Load More Articles
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or category filter
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
