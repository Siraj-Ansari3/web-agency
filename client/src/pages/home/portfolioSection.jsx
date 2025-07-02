import React, { useEffect, useState } from "react";
import PortfolioCard from "../portfolio/portfolioCard";
import axios from "axios";

const PortfolioSection = ({ portfolioMeta }) => {
  const [lastThreeProjects, setLastThreeProjects] = useState([]);

  useEffect(() => {
    const fetchLastThreeProjects = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/project/recent");
        setLastThreeProjects(response.data.projects);
      } catch (error) {
        console.log(error);
      }
    }

    fetchLastThreeProjects();
  }, [])

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
        {lastThreeProjects?.map((item) => {
          return (
            <PortfolioCard
              key={item.project_id}
              longSS={item.longSS}
              category={item.category}
              id={item.project_id}
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
