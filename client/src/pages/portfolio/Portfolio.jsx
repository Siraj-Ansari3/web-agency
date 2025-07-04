// components/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../../components/PageHeader';
import SkeletonLoader from '../../components/SkeletonLoader';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [selected, setSelected] = useState('All');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(6); // Show first 2 rows (6 items) initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
      const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/project");
        setPortfolioData(response.data.projects || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Dynamically get categories from data
  const allCategories = ['All', ...new Set(portfolioData.map(item => item.category))];

  // Filter projects
  const filtered = selected === 'All'
    ? portfolioData
    : portfolioData.filter((item) => item.category === selected);

  // Get projects to display based on pagination
  const projectsToShow = filtered.slice(0, itemsToShow);

  // Load more function - load next 2 rows (6 items)
  const loadMore = async () => {
    setItemsToShow(prev => Math.min(prev + 6, filtered.length)); // Load 6 more items
  };

  if (loading) return <SkeletonLoader />;

  return (
    <div className="bg-black min-h-screen">
      <PageHeader
        title="Portfolio"
        subtitle="Our Work"
        description="Explore our diverse portfolio of projects, showcasing our expertise and commitment to delivering exceptional results."
        breadcrumbs={["Home", "Portfolio"]}
        showBadge={true}
        badgeText="Featured"
        badgeColor="red"
        variant="gradient"
        showStats={true}
        stats={[
          { value: portfolioData.length, label: "Total Projects" },
          { value: allCategories.length - 1, label: "Categories" },
          { value: "100%", label: "Client Satisfaction" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
              className={`px-6 py-2 rounded-full font-semibold border-2 transition-all duration-200
                ${selected === cat
                  ? 'bg-red-600 text-white border-red-600 shadow-lg'
                  : 'bg-black text-red-400 border-red-400 hover:bg-red-600 hover:text-white hover:border-red-600'}
              `}
                        onClick={() => {
                          setSelected(cat);
                setItemsToShow(6);
                        }}
                      >
                        {cat}
                      </button>
                    ))}
          </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projectsToShow.map((project) => (
            <div key={project.id} className="bg-black/80 border-2 border-red-600 rounded-2xl p-6 shadow-lg hover:scale-[1.03] transition-all duration-300 flex flex-col">
              <img src={project.image} alt={project.title} className="rounded-lg mb-4 w-full h-48 object-cover" />
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags && project.tags.map((tag, i) => (
                  <span key={i} className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
              ))}
            </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-700 transition-all duration-200 text-center"
              >
                View Project
              </a>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {itemsToShow < filtered.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMore}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
