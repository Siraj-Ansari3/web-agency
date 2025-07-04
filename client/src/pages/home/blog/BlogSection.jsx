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
      <div className="text-center pt-8 pb-8 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 text-black">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-2 md:mb-4">{blogMeta.title}</h2>
        <p className="max-w-xl mx-auto mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-700">
          {blogMeta.subtitle}
        </p>
      </div>
      {/* Cards Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {blogs.map(blog => (
          <BlogCard key={blog.blog_id} data={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
