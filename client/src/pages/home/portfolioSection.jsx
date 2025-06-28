import React from "react";
import portfolioData from "../../data/portfolio/portfolioData";
import PortfolioCard from "../portfolio/portfolioCard";

const PortfolioSection = ({ portfolioMeta }) => {
  const lastThreeBlogs = portfolioData.filter(
    (proj) => proj.id >= portfolioData.length - 2
  );
  console.log(lastThreeBlogs);
  
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Heading */}
      <div className="services-header">
        <h2 className="services-title">{portfolioMeta.title}</h2>
        <p className="services-description">
          {portfolioMeta.description}
        </p>
      </div>

      {/* Cards Container */}
      <div className="relative bg-green-00 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* <BlogCard data={lastThreeBlogs} /> */}
        {lastThreeBlogs.map((item) => {
          return (
            <PortfolioCard
              key={item.id}
              longSS={item.longSS}
              category={item.category}
              id={item.id}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </section>
  );
};

export default PortfolioSection;
