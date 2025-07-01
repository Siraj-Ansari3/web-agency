import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ data: item }) => {
  const navigate = useNavigate();
  const getFirstWords = (text, wordCount = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    const truncated = words.slice(0, wordCount).join(" ");
    return words.length > wordCount ? `${truncated}...` : truncated;
  };

  if (!item) return null;

  return (
    <div
      key={item.blog_id}
      className="relative flex flex-col sm:flex-row bg-black text-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-900 overflow-hidden my-6 sm:my-10 mx-auto w-full max-w-full sm:max-w-3xl transition-all duration-300 group hover:shadow-red-900 hover:border-red-600 hover:-translate-y-1 hover:scale-[1.04] cursor-pointer"
      onClick={() => navigate(`/blog/${item.blog_id}`)}
    >
      {/* Left: Blog image with badges */}
      <div className="relative w-full sm:w-2/5 h-48 sm:h-auto flex-shrink-0 overflow-hidden group" onClick={() => navigate(`/blog/${item.blog_id}`)} style={{ cursor: 'pointer' }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 rounded-t-2xl sm:rounded-none sm:rounded-l-3xl"
        />
        {/* Category badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-700 text-white text-xs sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow border border-red-900 z-20">
          {item.category || 'General'}
        </div>

        {/* Date badge */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/90 px-2 sm:px-3 py-1 rounded-lg shadow text-center flex flex-col items-center border border-red-900 z-20">
          <span className="text-red-400 text-xs sm:text-base font-bold leading-none">{new Date(item.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</span>
        </div>
      </div>
      {/* Right: Content */}
      <div className="relative flex flex-col justify-between p-4 sm:p-8 w-full sm:w-3/5 bg-black">
        {/* Author avatar top-right */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white border-2 border-black shadow bg-gradient-to-tr from-red-900/30 to-black/80 flex items-center justify-center z-20">
          <img src={item?.author?.image} alt={item?.author?.firstName} className="object-cover text-white bg-transparent w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
        </div>
        <div className="pr-0 sm:pr-12">
          <h3 className="text-sm sm:text-lg  font-bold text-white mb-2 sm:mb-3 line-clamp-2 hover:text-red-400 transition-colors duration-200 cursor-pointer" onClick={e => { e.stopPropagation(); navigate(`/blog/${item.blog_id}`); }}>{item.title}</h3>
          <p className="text-gray-300 text-sm sm:text-sm line-clamp-3 mb-4 sm:mb-6">{getFirstWords(item.content?.text, 25)}</p>
        </div>
        <div className="flex justify-start mt-2">
          <button
            className="px-3 py-1 sm:px-5 sm:py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 shadow transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 text-xs sm:text-sm"
            onClick={e => { e.stopPropagation(); navigate(`/blog/${item.blog_id}`); }}
          >
            Read More 
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
