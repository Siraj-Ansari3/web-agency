import React, { useEffect, useState, useMemo } from "react";
import { FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import BlogCard from "../../components/BlogCard";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import SkeletonLoader from '../../components/SkeletonLoader';

const CARDS_PER_PAGE = 6;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/blog/get-all-blogs");
        setBlogs(response.data.blogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Get unique categories from data (normalize for display)
  const categories = useMemo(() => {
    const cats = blogs?.map((b) => (b.category || "General").trim());
    // Remove duplicates, ignore case/whitespace
    return [
      "All",
      ...Array.from(new Set(cats?.map((c) => c.toLowerCase().replace(/\s+/g, ""))))
    ];
  }, [blogs]);

  // Filter blogs by search and category (normalize for filter)
  const filteredBlogs = useMemo(() => {
    return blogs
      ?.filter((blog) => {
        const blogCategory = (blog.category || "General").trim().toLowerCase();
        const selectedCat = selectedCategory.trim().toLowerCase();
        const matchesCategory =
          selectedCat === "all" || blogCategory === selectedCat;
        const matchesSearch =
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (blog.content?.text && blog.content.text.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }, [searchQuery, selectedCategory, blogs]);

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

  if (loading) return <SkeletonLoader />;

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
          { value: blogs?.length, label: "Articles" },
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
            <div className="relative">
              <div className="bg-black border-2 border-gray-700 rounded-2xl shadow-2xl p-2">
                <div className="flex items-center gap-3">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-lg rounded-xl"
                      placeholder="Search articles, topics, or authors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        tabIndex={-1}
                      >
                        <FiX className="h-5 w-5 text-red-400 hover:text-white transition-colors" />
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-black border-2 border-gray-700 text-white px-6 py-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all duration-300 cursor-pointer hover:bg-red-900"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-black text-white">
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
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden space-y-4">
            {/* Mobile Search Input */}
            <div className="relative">
              <div className="bg-black border-2 border-gray-700 rounded-xl shadow-lg">
                <div className="flex items-center px-4 py-3">
                  <FiSearch className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-lg"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="ml-2"
                      tabIndex={-1}
                    >
                      <FiX className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-black border-2 border-gray-700 text-white px-4 py-3 rounded-xl flex items-center justify-between hover:bg-red-900 transition-all duration-300"
            >
              <span className="flex items-center">
                <FiFilter className="h-4 w-4 mr-2" />
                Category: {selectedCategory}
              </span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-300 ${showMobileFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile Category Dropdown */}
            {showMobileFilters && (
              <div className="bg-black border-2 border-red-700 rounded-xl overflow-hidden">
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
                          ? 'bg-red-700 text-white border border-red-500'
                          : 'text-white hover:bg-red-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Results Info */}
          <div className="mt-6 text-center">
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
          </div>
        </div>
      </section>

      {/* Magazine/Masonry Blog Grid */}
      <section className="bg-black min-h-[60vh] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          {filteredBlogs?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredBlogs?.slice(0, visibleCount).map((blog) => (
                  <BlogCard key={blog.blog_id} data={blog} />
                ))}
              </div>
              {canLoadMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
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
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
