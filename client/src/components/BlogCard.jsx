import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import raza from "../assets/autherImg/raza.jpg";

const BlogCard = ({ data }) => {
  const navigate = useNavigate();
  const reversedArray = [...data].reverse();
  const getFirstWords = (text, wordCount = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    const truncated = words.slice(0, wordCount).join(" ");
    return words.length > wordCount ? `${truncated}...` : truncated;
  };
  return (
    <>
      {reversedArray.map((item) => (
        <div
          key={item.id}
          className="relative flex flex-col sm:flex-row bg-black rounded-2xl shadow-lg border border-gray-900 overflow-hidden my-8 mx-auto max-w-2xl transition-all duration-300 group hover:shadow-red-900 hover:border-red-600 hover:-translate-y-1 hover:scale-[1.02]"
        >
          {/* Left: Blog image with date badge */}
          <div className="relative sm:w-2/5 w-full h-48 sm:h-auto flex-shrink-0 overflow-hidden">
            <img
              src={item.imgSrc}
              alt={item.title}
              className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 rounded-2xl sm:rounded-none sm:rounded-l-2xl"
            />
            {/* Date badge */}
            <div className="absolute bottom-3 left-3 bg-black/90 px-3 py-1 rounded-lg shadow text-center flex flex-col items-center border border-red-900 z-20">
              <span className="text-red-400 text-base font-bold leading-none">{item.date}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-red-400">{item.month}</span>
            </div>
          </div>
          {/* Right: Content */}
          <div className="relative flex flex-col justify-between p-6 sm:w-3/5 w-full bg-black">
            {/* Author avatar top-right */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-black shadow bg-gradient-to-tr from-red-900/30 to-black/80 flex items-center justify-center z-20">
              <img src={raza} alt="Author: Raza" className="object-cover w-8 h-8 rounded-full" />
            </div>
            <div className="pr-12">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-gray-300 text-sm  line-clamp-3 mb-4">{getFirstWords(item.disc)}</p>
            </div>
            <div className="flex justify-start mt-2">
              <Link to={`/blog/${item.id}`} onClick={e => e.stopPropagation()}>
                <button className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 shadow transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 text-sm">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogCard;
