import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const BlogCardModern = ({ data: blog }) => {
  const navigate = useNavigate();
  if (!blog) return null;

  return (
    <div
      tabIndex={0}
      className="group relative flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-800 hover:border-red-500 focus-within:border-red-500 transition-all duration-300 outline-none"
      onClick={() => navigate(`/blog/${blog.blog_id}`)}
      onKeyDown={e => { if (e.key === 'Enter') navigate(`/blog/${blog.blog_id}`); }}
      role="button"
      aria-label={`Read blog: ${blog.title}`}
    >
      {/* Image with overlay and category badge */}
      <div className="relative w-full h-56 sm:h-48 md:h-44 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 transition-all duration-300" />
        <span className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-600 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg border border-white/10 uppercase tracking-wider">
          {blog.category || 'General'}
        </span>
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-5 md:p-4 bg-black/80">
        <div className="min-h-[72px] sm:min-h-[60px] md:min-h-[48px] flex flex-col justify-between">
          <h3 className="text-xl font-extrabold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-200 cursor-pointer">
            {blog.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {blog.content?.text?.split(" ").slice(0, 25).join(" ")}{blog.content?.text?.split(" ").length > 25 ? '...' : ''}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
          {/* Author */}
          <div className="flex items-center gap-2">
            <img
              src={blog?.author?.image}
              alt={blog?.author?.firstName}
              className="w-9 h-9 rounded-full border-2 border-red-500 shadow object-cover bg-black"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">
                {blog?.author?.firstName} {blog?.author?.lastName}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
              </span>
            </div>
          </div>
          {/* Read More Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 text-sm group-hover:scale-105"
            onClick={e => { e.stopPropagation(); navigate(`/blog/${blog.blog_id}`); }}
            tabIndex={0}
          >
            Read More <FiArrowRight className="text-base" />
          </button>
        </div>
      </div>
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 z-30" style={{boxShadow: '0 0 32px 8px rgba(239,68,68,0.25)'}} />
    </div>
  );
};

export default BlogCardModern; 