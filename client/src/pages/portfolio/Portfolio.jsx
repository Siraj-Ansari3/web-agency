// components/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../../components/PageHeader';
import SkeletonLoader from '../../components/SkeletonLoader';
import PortfolioCard from './portfolioCard';
import GridPattern from '../../components/GridPattern';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [selected, setSelected] = useState('All');
  const [itemsToShow, setItemsToShow] = useState(6);
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

  // Normalize categories and deduplicate
  const allCategories = ['All', ...new Set(
    portfolioData
      .map(item => item.category?.trim())
      .filter(Boolean)
      .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase())
  )];

  // Filter projects
  const filtered = selected === 'All'
    ? portfolioData
    : portfolioData.filter((item) => 
        item.category?.trim().toLowerCase() === selected.toLowerCase()
      );

  // Get projects to display based on pagination
  const projectsToShow = filtered.slice(0, itemsToShow);

  // Load more function
  const loadMore = () => {
    setItemsToShow(prev => Math.min(prev + 6, filtered.length));
  };

  if (loading) return <SkeletonLoader />;

  return (
    <div className="relative min-h-screen">
      <GridPattern/>
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

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
        {/* Category Filter - Fixed */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full font-semibold border-2 transition-all duration-200
                ${selected.toLowerCase() === cat.toLowerCase()
                  ? 'bg-red-600 text-white border-red-600 shadow-lg'
                  : 'bg-black text-red-400 border-red-400 hover:bg-red-600 hover:text-white hover:border-red-600'}
              `}
              onClick={() => {
                setSelected(cat);
                setItemsToShow(6); // Reset to initial count when changing category
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full md:px-5">
          {projectsToShow.map((project) => (
            <PortfolioCard
              key={project.project_id}
              longSS={project.longSS}
              id={project.project_id}
              description={project.description}
              title={project.title}
              category={project.category}
            />
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