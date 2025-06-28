// DashboardWriteBlog.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogEditor from './BlogEditor';
const DashboardWriteBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    status: 'draft',
    featuredImage: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    setBlogData(prev => ({ ...prev, featuredImage: e.target.files[0] }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Blog submitted:', blogData);
      setIsSubmitting(false);
      navigate('/admin/dashboard/blogs');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Write New Blog</h1>
        <button 
          onClick={() => navigate('/admin/dashboard/blogs')}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blogs
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image
          </label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <BlogEditor name='content' onChange={handleChange}/>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={blogData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Publish</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-md text-white ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardWriteBlog;