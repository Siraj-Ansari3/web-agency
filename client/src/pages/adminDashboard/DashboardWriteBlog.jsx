// DashboardWriteBlog.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogEditor from './BlogEditor';
const DashboardWriteBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: '',
    content: { html: '', text: '', metadata: {} },
    category: 'General',
    status: 'draft',
    image: null,
    tags: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle data updates from BlogEditor
  const handleBlogDataUpdate = async (updatedData) => {
    setBlogData(prev => ({ ...prev, ...updatedData }));
    
    // Log the complete blog data object
    console.log('Complete Blog Data:', { ...blogData, ...updatedData });
    
    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
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
      
      {/* Use BlogEditor for all blog content */}
      <BlogEditor 
        initialData={blogData}
        onSave={handleBlogDataUpdate}
      />
    </div>
  );
};

export default DashboardWriteBlog;