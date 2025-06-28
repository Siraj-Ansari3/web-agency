// EditServicesPage.jsx
import React, { useState } from 'react';
import SectionEditor from './SectionEditor';

const EditServicesPage = () => {
  // Initial state would come from API in real app
  const [pageData, setPageData] = useState({
    hero: {
      title: "Our Services",
      content: "We provide top-quality services tailored to your needs",
      image: null
    },
    services: [
      {
        id: 1,
        title: "Web Development",
        description: "Custom website development services",
        icon: "💻"
      },
      {
        id: 2,
        title: "UI/UX Design",
        description: "User-centered design solutions",
        icon: "🎨"
      },
      // ... other services
    ]
  });

  const updateSection = (section, content) => {
    setPageData(prev => ({
      ...prev,
      [section]: content
    }));
  };

  const updateService = (id, field, value) => {
    setPageData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Editing Services Page</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Publish Changes
        </button>
      </div>

      <SectionEditor
        title="Hero Section"
        initialContent={pageData.hero.content}
        onSave={(content) => updateSection('hero', { ...pageData.hero, content })}
        imageUpload={true}
      />

      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Services List</h3>
          <button className="text-sm bg-green-600 text-white px-3 py-1 rounded">
            + Add Service
          </button>
        </div>

        <div className="space-y-4">
          {pageData.services.map(service => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <input
                  type="text"
                  value={service.icon}
                  onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                  className="text-2xl w-12 text-center border rounded"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(service.id, 'title', e.target.value)}
                    className="w-full text-lg font-semibold mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                  />
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    className="w-full text-gray-600 p-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                    rows="2"
                  />
                </div>
                <button className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditServicesPage;