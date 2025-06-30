// DashboardBlogs.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([{
    blog_id: "", content: {}, publishedAt: "", category: "", image: "", tags: [], title: "", status: ""
  }]);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/blog/get-all-blogs");
        setBlogs(response.data.blogs)
        setIsLoading(false)
        console.log(response.data.blogs)
      } catch (error) {
        console.log(error)
        setIsLoading(false)

      }
    }

    fetchBlogs();

  }, [])

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'all') return true;
    return blog.status.toLowerCase() === filter;
  });

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Blog Management</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/admin/dashboard/write-blog"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Write New Blog
          </Link>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ?
              (<div className='ml-3'>Loading...</div>) :
              (filteredBlogs.map((blog, index) => (
                <tr className="cursor-pointer hover:bg-gray-100 transition"
                  key={index}
                  onClick={() => navigate(`/blog/${blog.blog_id}`)

                  }
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-800' :
                      blog.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {blog.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {blog.publishedAt?.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/dashboard/edit-blog/${blog.blog_id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No blogs found with the selected status
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBlogs;