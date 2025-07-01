import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ data: item }) => {
  const navigate = useNavigate();
  if (!item) return null;

  const getFirstWords = (text, wordCount = 25) => {
    if (!text) return "";
    const words = text.split(" ");
    const truncated = words.slice(0, wordCount).join(" ");
    return words.length > wordCount ? `${truncated}...` : truncated;
  };

  const formattedDate = new Date(item.publishedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      onClick={() => navigate(`/blog/${item.blog_id}`)}
      className="group relative bg-black text-white rounded-3xl overflow-hidden shadow-xl hover:shadow-red-600 transition-all duration-300 cursor-pointer w-full max-w-md mx-auto my-8 border border-gray-400"
    >
      {/* Image section with overlay */}
      <div className="relative w-full h-60 flex-shrink-0 overflow-hidden group" onClick={() => navigate(`/blog/${item.blog_id}`)} style={{ cursor: 'pointer' }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
        <div className="absolute top-3 left-3 bg-red-600 text-xs font-semibold px-3 py-1 rounded-full z-20">
          {item.category}
        </div>
        <div className="absolute bottom-3 left-3 text-white text-xs bg-black/80 px-3 py-1 rounded-lg border border-red-800 z-20">
          {formattedDate}
        </div>

        {/* Author avatar top-right */}
        {item.author?.image && (
          <img
            src={item.author.image}
            alt={item.author.firstName}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full border-2 border-white shadow-md z-20"
          />
        )}
      </div>

      {/* Text section */}
      <div className="p-6 sm:p-8 space-y-4 bg-amber-00 h-[250px] ">
        <div className="flex flex-col justify-between h-full">
        <h2 className="text-xl sm:text-2xl font-bold group-hover:text-red-400 transition-colors line-clamp-2">
          {item.title}
        </h2>
        <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
          {getFirstWords(item.content?.text)}
        </p>

       

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/blog/${item.blog_id}`);
          }}
          className="mt-4 inline-block bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-sm px-5 py-2 rounded-full transition-all duration-300 shadow hover:shadow-lg"
        >
          Read More
        </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
