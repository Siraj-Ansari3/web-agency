// DashboardWriteBlog.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogEditor from './BlogEditor';
import axios from 'axios';
import { useEffect } from 'react';
const DashboardWriteBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: '',
    content: { html: '', text: '', metadata: {} },
    category: 'General',
    status: 'draft',
    image: null,
    tags: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchBlogData();
    }
  }, [id]);


  const fetchBlogData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/blog/get-blog?id=${id}`,
        { withCredentials: true }
      );
      
      const blog = response.data.blog;
      setBlogData({
        title: blog.title,
        content: blog.content,
        category: blog.category,
        status: blog.status,
        image: blog.image, 
        tags: blog.tags
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      setSaveMessage(`Failed to load blog: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  // Handle data updates from BlogEditor
  const handleBlogDataUpdate = async (blogData) => {
    setIsSubmitting(true);
    setSaveMessage(isEditMode ? 'Updating blog...' : 'Publishing blog...');

    try {
      if (isEditMode) {
        // Update existing blog
        await axios.put(
          `${import.meta.env.VITE_SERVER_DOMAIN}/blog/update/${id}`,
          blogData,
          { withCredentials: true }
        );
        setSaveMessage('Blog updated successfully! Redirecting...');
      } else {
        // Create new blog
        await axios.post(
          `${import.meta.env.VITE_SERVER_DOMAIN}/blog/add`,
          blogData,
          { withCredentials: true }
        );
        setSaveMessage('Blog published successfully! Redirecting...');
      }

      setTimeout(() => {
        navigate('/admin/dashboard/blogs');
      }, 1500);
    } catch (error) {
      console.error('Error saving blog:', error);
      setSaveMessage(`Failed to save blog: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

 return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? 'Edit Blog' : 'Write New Blog'}
        </h1>
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

      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog data...</p>
        </div>
      ) : (
        <>
          {saveMessage && (
            <div className={`mb-4 p-3 rounded-md ${saveMessage.includes('success')
              ? 'bg-green-100 text-green-800'
              : saveMessage.includes('publishing') || saveMessage.includes('updating')
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
              }`}>
              {saveMessage}
            </div>
          )}

          <BlogEditor
            initialData={blogData}
            onSave={handleBlogDataUpdate}
          />
        </>
      )}
    </div>
  );
};


export default DashboardWriteBlog;