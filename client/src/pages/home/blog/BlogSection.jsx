import React from "react";
import blogCardsData from "../../../data/blogs/cardsData";
import { FaUser, FaComments } from "react-icons/fa";
import BlogCard from "../../../components/BlogCard";

const BlogSection = ({blogMeta}) => {
  const lastThreeBlogs=blogCardsData.filter((blog)=>(blog.id>=blogCardsData.length-3))
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Heading */}

      <div className="text-center py-16 text-black">
        <h2 className="text-3xl md:text-4xl font-bold ">{blogMeta.title}</h2>
        <p className="max-w-xl mx-auto mt-4  text-sm md:text-base">
          {blogMeta.subtitle}
        </p>
      </div>

      {/* Cards Container */}
      <div className="relative bg-green-00 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <BlogCard data={lastThreeBlogs} />
      </div>
    </section>
  );
};

export default BlogSection;
