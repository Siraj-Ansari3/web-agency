// PageBuilder.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PageBuilder = () => {
  const pages = [
    { id: 'home', title: 'Home Page', description: 'Edit hero section, features, testimonials' },
    { id: 'about', title: 'About Page', description: 'Update team information, company history' },
    { id: 'services', title: 'Services Page', description: 'Manage services listing and descriptions' },
    { id: 'contact', title: 'Contact Page', description: 'Update contact information and form' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Page Builder</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link 
            key={page.id}
            to={`/admin/dashboard/page-builder/${page.id}`}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start">
                <div className="bg-gray-100 p-3 rounded-lg mr-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{page.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Edit Page
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PageBuilder;