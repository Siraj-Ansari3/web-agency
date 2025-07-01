import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import raza from '../assets/autherImg/raza.jpg';
import 'quill/dist/quill.snow.css';
import axios from "axios";
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const ReadBlog = ({ id }) => {
  const [blog, setBlog] = useState({
    blog_id: "", content: {}, publishedAt: "", category: "", image: "", tags: [], title: "", status: "", author: { email: "", firstName: "", lastName: "", image: ""}
  });
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + `/blog/get-blog/?id=${id}`);
        setBlog(response.data.blog);
        console.log(response.data.blog);
        
        // Fetch related blogs based on category
        // const relatedResponse = await axios.get(
        //   import.meta.env.VITE_SERVER_DOMAIN + `/blog/get-blogs/?category=${response.data.blog.category}&limit=3`
        // );
        // setRelatedBlogs(relatedResponse.data.blogs.filter(b => b.blog_id !== id));
        
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterMsg("Thank you for subscribing!");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterMsg(""), 3000);
    }
  };

  const formatReadingTime = (content) => {
    const wordCount = content?.text?.split(/\s+/)?.length || 0;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen w-full">
      {/* Header */}
      <header className="bg-black text-white py-6 px-4 md:px-8 lg:px-12 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">Back to Blogs</span>
          </button>
          <div className="text-sm text-gray-300 flex items-center gap-2">
            <FiCalendar className="text-red-400" />
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric'
            })}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        className="relative h-[48vh] min-h-[260px] max-h-[500px] bg-black overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.5)), url(${blog.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto w-full text-white">
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              {blog.category || 'Technology'}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 drop-shadow-xl">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <img 
                src={blog?.author?.image} 
                alt={blog?.author?.firstName} 
                className="w-10 h-10 rounded-full border-2 border-red-500" 
              />
              <div>
                <div className="font-medium text-white">{`${blog?.author?.firstName} ${blog?.author?.lastName}`}</div>
                <div className="text-xs text-gray-300 flex items-center gap-2">
                  <FiClock className="text-red-400" />
                  {formatReadingTime(blog.content)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-2 sm:px-4 md:px-8 py-6 sm:py-10 md:py-16">
        {/* Blog Content */}
        <article className="ql-editor blog-content ">
          <div className="break-words w-full overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: blog.content.html }} />
          </div>
        </article>
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 bg-red-700 text-white rounded-full text-xs font-semibold shadow hover:bg-red-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Author Section Redesigned */}
        <section className="mt-14">
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-black rounded-2xl p-4 sm:p-6 md:p-8 border border-red-700 shadow-lg w-full">
            <div className="relative flex-shrink-0">
              <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-red-600 to-red-900 blur-sm opacity-70"></span>
              <img 
                src={blog?.author?.image} 
                alt={blog?.author.firstName} 
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-red-600 shadow-lg z-10 bg-black object-cover" 
              />
            </div>
            <div className="flex-1 text-center sm:text-left w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-center sm:justify-start">
                <span className="text-xl sm:text-2xl font-extrabold text-white">{`${blog?.author?.firstName} ${blog?.author?.lastName}`}</span>
                <span className="inline-block bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full ml-0 sm:ml-3">Full Stack Developer</span>
              </div>
              <p className="text-gray-300 mb-4 text-xs sm:text-sm md:text-base max-w-xl mx-auto sm:mx-0">Passionate about building modern web experiences and sharing knowledge with the world. Always exploring new technologies and creative solutions.</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                <a href="#" className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-700 text-white hover:bg-white hover:text-red-700 transition-colors font-semibold text-xs sm:text-sm shadow">
                  <FaLinkedin className="text-base sm:text-lg" /> LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black border border-red-700 text-red-400 hover:bg-red-700 hover:text-white transition-colors font-semibold text-xs sm:text-sm shadow">
                  <FaGithub className="text-base sm:text-lg" /> GitHub
                </a>
                <a href="#" className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black border border-red-700 text-red-400 hover:bg-red-700 hover:text-white transition-colors font-semibold text-xs sm:text-sm shadow">
                  <FaTwitter className="text-base sm:text-lg" /> Twitter
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Suggested Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-black py-10 sm:py-12 px-0 md:px-4 mt-12 sm:mt-16 rounded-2xl w-full">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-red-500 mb-6 sm:mb-8 pl-2 sm:pl-4 uppercase tracking-wider">Suggested Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <div 
                  key={relatedBlog.blog_id} 
                  className="bg-black border border-red-900 rounded-xl shadow-lg overflow-hidden hover:shadow-red-700 transition-shadow cursor-pointer flex flex-col min-h-[320px]"
                  onClick={() => navigate(`/blog/${relatedBlog.blog_id}`)}
                >
                  {relatedBlog.image && (
                    <div className="h-36 sm:h-40 md:h-48 overflow-hidden">
                      <img 
                        src={relatedBlog.image} 
                        alt={relatedBlog.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <span className="inline-block bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
                      {relatedBlog.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 break-words">
                      {relatedBlog.title}
                    </h3>
                    <div className="flex flex-wrap items-center text-xs text-gray-400 gap-2 sm:gap-3 mt-auto">
                      <span className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        {new Date(relatedBlog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={14} />
                        {formatReadingTime(relatedBlog.content)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <div className="bg-red-600 text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Get the latest articles, tips, and resources delivered straight to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              className="flex-1 px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-red-900 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
          {newsletterMsg && (
            <div className="mt-4 text-green-400 font-medium">
              {newsletterMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;