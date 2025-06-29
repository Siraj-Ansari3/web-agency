// DashboardWriteBlog.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogEditor from './BlogEditor';
import axios from 'axios';
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
  const [saveMessage, setSaveMessage] = useState('');

  // Handle data updates from BlogEditor
  const handleBlogDataUpdate = async (blogData) => {
    setIsSubmitting(true);
    setSaveMessage('Publishing blog...');

    try {
      // Send to backend
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/blog/add",
        blogData,
        { withCredentials: true }
      );
      console.log(response)

      setSaveMessage('Blog published successfully! Redirecting...');
      setTimeout(() => {
        navigate('/admin/dashboard/blogs');
      }, 1500);
    } catch (error) {
      console.error('Error publishing blog:', error);
      setSaveMessage(`Failed to publish blog: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Write New Blog</h1>
        <button
          onClick={() => navigate('/admin/dashboard/blogs')}
          className="text-gray-600 hover:text-gray-900 flex items-center"
          disabled={isSubmitting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blogs
        </button>
      </div>

      {saveMessage && (
        <div className={`mb-4 p-3 rounded-md ${saveMessage.includes('success')
          ? 'bg-green-100 text-green-800'
          : saveMessage.includes('publishing')
            ? 'bg-blue-100 text-blue-800'
            : 'bg-red-100 text-red-800'
          }`}>
          {saveMessage}
        </div>
      )}

      {/* Use BlogEditor for all blog content */}
      <BlogEditor
        onSave={handleBlogDataUpdate}
      />
    </div>

  );
};

export default DashboardWriteBlog;