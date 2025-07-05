import React, { useEffect, useState } from "react";
import PortfolioCard from "../portfolio/portfolioCard";
import axios from "axios";
// import { useLoading } from '../../context/LoadingContext';
// import SkeletonLoader from '../../components/SkeletonLoader';
import NotFound404Page from '../../pages/NotFound404Page';

const PortfolioSection = ({ portfolioMeta }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/project/recent");
        setProjects(response.data.projects);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <NotFound404Page />;

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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {projects?.map((item) => {
            return (
              <div key={item.project_id} className="w-full">
                <PortfolioCard
                  longSS={item.longSS}
                  category={item.category}
                  id={item.project_id}
                  title={item.title}
                  description={item.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
