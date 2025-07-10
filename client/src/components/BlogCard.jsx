import React from "react";
import { useNavigate } from "react-router-dom";


const defaultUserIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiLz48L3N2Zz4=";


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
      className="group relative bg-black text-white rounded-xl overflow-hidden shadow-xl hover:shadow-red-600 transition-all duration-300 cursor-pointer w-full h-full min-h-[260px] md:min-h-[320px] border-2 border-red-600"
    >
      {/* Image section with overlay */}
      <div className="relative w-full h-48 flex-shrink-0 overflow-hidden group" onClick={() => navigate(`/blog/${item.blog_id}`)} style={{ cursor: 'pointer' }}>
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
            onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultUserIcon;
                }}
            className="absolute bottom-3 object-cover right-3 w-13 h-13 rounded-full border-2 border-white shadow-md z-20"
          />
        )}
      </div>

      {/* Text section */}
      <div className="p-5 flex flex-col justify-between h-[210px]">
        <h2 className="text-lg font-bold group-hover:text-red-400 transition-colors line-clamp-2">
          {item.title}
        </h2>
        <p className="text-gray-300 text-sm line-clamp-3">
          {getFirstWords(item.content?.text)}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/blog/${item.blog_id}`);
          }}
          className="mt-4 inline-block cursor-pointer bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-xs px-4 py-2 rounded-full transition-all duration-300 shadow hover:shadow-lg"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
