import React, { useEffect, useState } from 'react';
import { FaUser, FaComments } from "react-icons/fa";
import BlogCard from "../../../components/BlogCard";
import axios from 'axios';
// import { useLoading } from '../../../context/LoadingContext';
// import SkeletonLoader from '../../../components/SkeletonLoader';
import NotFound404Page from '../../../pages/NotFound404Page';

const BlogSection = ({ blogMeta }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/blog/get-last-three-blogs');
        setBlogs(response.data.blogs);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <NotFound404Page />;

  return (
    <section className="relative py-10 sm:py-16 md:py-20 bg-black overflow-hidden">
      
                {/* Heading */}
      <div className="services-header">
        <h2 className="services-title">{blogMeta.title}</h2>
        <p className="services-description">
          {blogMeta.subtitle}
        </p>
      </div>
      {/* Cards Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {blogs.map(blog => (
            <div key={blog.blog_id} className="w-full">
              <BlogCard data={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
