import React from "react";
import blogCardsData from "../../../data/blogs/cardsData";
import { FaUser, FaComments } from "react-icons/fa";
import BlogCard from "../../../components/BlogCard";

const Home = () => {
  const lastThreeBlogs=blogCardsData.filter((blog)=>(blog.id>=blogCardsData.length-3))
  return (
    <section className="relative bg-gray-100 pb-0 ">
      {/* Heading */}
      <div className="text-center py-16 text-black">
        <h2 className="text-3xl md:text-4xl font-bold ">Latest Blog</h2>
        <p className="max-w-xl mx-auto mt-4  text-sm md:text-base">
          Outlived no dwelling denoting in peculiar as he believed. Behaviour
          excellent middleton be as it curiosity.
        </p>
      </div>

      {/* Cards Container */}
      <div className="relative bg-green-00 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <BlogCard data={lastThreeBlogs} />
      </div>

      {/* Wave SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full z-0"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,197.3C672,203,768,213,864,218.7C960,224,1056,224,1152,218.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

export default Home;
