// src/pages/adminDashboard/pageBuilder/EditHomePage.jsx
import React, { useState, useEffect } from 'react';
import {
  FiArrowLeft, FiSave, FiPlus, FiTrash2, FiImage, FiUser, FiStar,
  FiBook, FiGrid, FiList, FiAward, FiTarget, FiCheckCircle, FiLayers,
  FiZap, FiRefreshCw, FiCode, FiShoppingCart, FiMonitor, FiLayout
} from 'react-icons/fi';
import { FaQuoteLeft, FaSlidersH, FaMobileAlt, FaPalette, FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios';
import { uploadImage } from '../../../common/aws';


const EditHomePage = () => {
  // Initial state structure matching all homepage sections
  const [pageData, setPageData] = useState({
    hero: {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      backgroundImage: null
    },
    about: {
      tagline: 'WHO WE ARE',
      title: 'About Us',
      description: '',
      mission: 'Deliver impactful digital solutions...',
      whatWeBuild: {
        title: 'What We Build',
        description: 'Whether you need a dynamic landing page...',
        items: [
          'Landing Pages', 'Web Apps', 'E-commerce', 'Portfolios',
          'Business Sites', 'Dashboards', 'SAAS Platforms', 'Custom Solutions'
        ]
      },
      ourApproach: {
        title: 'Our Approach',
        items: [
          'Client-focused development process',
          'Agile methodology for flexibility',
          'Pixel-perfect implementation',
          'Continuous testing & optimization'
        ]
      }
    },
    features: [
      {
        icon: 'FaSlidersH',
        title: 'Fully Customizable',
        description: 'Tailor every aspect of your web app...'
      }
    ],
    services: {
      title: 'Professional Web Solutions',
      description: 'Enterprise-grade digital products built...',
      items: [
        {
          icon: 'MdWeb',
          title: 'Landing Pages',
          description: 'High-converting landing pages...',
          features: ['Feature 1', 'Feature 2']
        }
      ]
    },
    steps: {
      title: 'Our Development Process',
      subtitle: 'How We Build Web Applications',
      steps: [
        {
          stepNumber: 1,
          title: 'Planning & Designing',
          description: 'Define the purpose, gather requirements...'
        }
      ]
    },
    portfolio: {
      title: 'Portfolio',
      description: 'Following are the latest projects...',
      items: [] // Will be managed separately
    },
    blog: {
      title: 'Latest Articles',
      subtitle: ''
    },
    testimonials: [
      {
        avatar: '',
        name: 'Client Name',
        role: 'Client Role',
        content: 'Testimonial content...',
        rating: 5
      }
    ],
    cta: {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: ''
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [testimonialAvatarFiles, setTestimonialAvatarFiles] = useState({});

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const homeData = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/homepage");
        setPageData(homeData.data.data);
      } catch (err) {
        console.log(err);
        setSaveMessage('Failed to load homepage data');
        setSaveStatus('error');
      }
    };

    fetchHomeData();
  }, []);

  // Generic update functions
  const updateSection = (section, content) => {
    setPageData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...content }
    }));
  };

  // Top-level array functions
  const updateArrayItem = (arrayName, index, field, value) => {
    setPageData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, template) => {
    // if (arrayName === 'testimonials') {
    //   setTestimonialAvatarFiles(prev => {
    //     const newFiles = { ...prev };
    //     delete newFiles[index];
    //     return newFiles;
    //   });
    // }

    setPageData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { ...template }]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setPageData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  // Nested array functions
  const updateNestedArrayItem = (section, arrayName, index, field, value) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayName]: prev[section][arrayName].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const addNestedArrayItem = (section, arrayName, template) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayName]: [...prev[section][arrayName], { ...template }]
      }
    }));
  };

  const removeNestedArrayItem = (section, arrayName, index) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayName]: prev[section][arrayName].filter((_, i) => i !== index)
      }
    }));
  };


  // Handle hero background image
  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setHeroImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSection('hero', { backgroundImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Handle testimonial avatars
  const handleTestimonialAvatarChange = (index, e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    if (!file) return;

    setTestimonialAvatarFiles(prev => ({
      ...prev,
      [index]: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      updateArrayItem('testimonials', index, 'avatar', reader.result);
    };
    reader.readAsDataURL(file);
  };


  // Submit handler
  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    setSaveStatus('');

    try {
      let updatedPageData = { ...pageData };

      // Array to hold all upload promises
      const uploadPromises = [];

      // Upload hero image if exists
      if (heroImageFile) {
        uploadPromises.push(
          uploadImage(heroImageFile).then(url => {
            updatedPageData.hero.backgroundImage = url;
          })
        );
      }

      // Upload testimonial avatars
      Object.entries(testimonialAvatarFiles).forEach(([index, file]) => {
        const numIndex = parseInt(index);
        if (!isNaN(numIndex)) {
          uploadPromises.push(
            uploadImage(file).then(url => {
              updatedPageData.testimonials[index].avatar = url;
            })
          );
        }
      });

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      // Send all data to server
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/homepage",
        updatedPageData,
        { withCredentials: true }
      );

      // Update state with server response
      setPageData(response.data.data);
      setHeroImageFile(null);
      setTestimonialAvatarFiles({});

      setSaveMessage('Homepage saved successfully!');
      setSaveStatus('success');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      let errorMessage = 'Failed to save homepage. ';
      if (err.response) {
        errorMessage += `Server responded with ${err.response.status}: ${err.response.data.message || ''}`;
      } else {
        errorMessage += 'Please check your connection and try again.';
      }
      setSaveMessage(errorMessage);
      setSaveStatus('error');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  // Render functions for each section
  const renderHeroSection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FiImage className="mr-2 text-blue-500" />
          Hero Section
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={pageData.hero.title}
              onChange={(e) => updateSection('hero', { title: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={pageData.hero.subtitle}
              onChange={(e) => updateSection('hero', { subtitle: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={pageData.hero.ctaText}
              onChange={(e) => updateSection('hero', { ctaText: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
            <input
              type="text"
              value={pageData.hero.ctaLink}
              onChange={(e) => updateSection('hero', { ctaLink: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {pageData.hero.backgroundImage ? (
              <div className="relative">
                <img
                  src={pageData.hero.backgroundImage}
                  alt="Hero background"
                  className="w-40 h-24 object-cover rounded-md border"
                />
                <button
                  onClick={() => updateSection('hero', { backgroundImage: null })}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md w-40 h-24 flex items-center justify-center text-gray-400">
                <FiImage size={24} />
              </div>
            )}

            <div>
              <input
                type="file"
                id="hero-image"
                className="hidden"
                accept="image/*"
                onChange={handleHeroImageChange}
              />
              <label
                htmlFor="hero-image"
                className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Choose Image
              </label>
              <p className="mt-1 text-xs text-gray-500">Recommended: 1920x1080 px, JPG/PNG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FiUser className="mr-2 text-green-500" />
          About Section
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <input
              type="text"
              value={pageData.about.tagline}
              onChange={(e) => updateSection('about', { tagline: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={pageData.about.title}
              onChange={(e) => updateSection('about', { title: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={pageData.about.description}
            onChange={(e) => updateSection('about', { description: e.target.value })}
            rows={4}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
          <textarea
            value={pageData.about.mission}
            onChange={(e) => updateSection('about', { mission: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* What We Build Section */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">What We Build</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={pageData.about.whatWeBuild.title}
                onChange={(e) => updateSection('about', {
                  whatWeBuild: {
                    ...pageData.about.whatWeBuild,
                    title: e.target.value
                  }
                })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={pageData.about.whatWeBuild.description}
                onChange={(e) => updateSection('about', {
                  whatWeBuild: {
                    ...pageData.about.whatWeBuild,
                    description: e.target.value
                  }
                })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Services List</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {pageData.about.whatWeBuild.items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updatedItems = [...pageData.about.whatWeBuild.items];
                      updatedItems[index] = e.target.value;
                      updateSection('about', {
                        whatWeBuild: {
                          ...pageData.about.whatWeBuild,
                          items: updatedItems
                        }
                      });
                    }}
                    className="flex-1 border border-gray-300 rounded-md p-1.5 text-sm"
                  />
                  <button
                    onClick={() => {
                      const updatedItems = pageData.about.whatWeBuild.items.filter((_, i) => i !== index);
                      updateSection('about', {
                        whatWeBuild: {
                          ...pageData.about.whatWeBuild,
                          items: updatedItems
                        }
                      });
                    }}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => updateSection('about', {
                whatWeBuild: {
                  ...pageData.about.whatWeBuild,
                  items: [...pageData.about.whatWeBuild.items, 'New Service']
                }
              })}
              className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <FiPlus className="mr-1" /> Add Service
            </button>
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Our Approach</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={pageData.about.ourApproach.title}
                onChange={(e) => updateSection('about', {
                  ourApproach: {
                    ...pageData.about.ourApproach,
                    title: e.target.value
                  }
                })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Approach Points</label>
            <div className="space-y-2 mt-2">
              {pageData.about.ourApproach.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex items-center mt-1.5">
                    <FiCheckCircle className="text-blue-500 mr-2" size={16} />
                  </div>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updatedItems = [...pageData.about.ourApproach.items];
                      updatedItems[index] = e.target.value;
                      updateSection('about', {
                        ourApproach: {
                          ...pageData.about.ourApproach,
                          items: updatedItems
                        }
                      });
                    }}
                    className="flex-1 border border-gray-300 rounded-md p-1.5 text-sm"
                  />
                  <button
                    onClick={() => {
                      const updatedItems = pageData.about.ourApproach.items.filter((_, i) => i !== index);
                      updateSection('about', {
                        ourApproach: {
                          ...pageData.about.ourApproach,
                          items: updatedItems
                        }
                      });
                    }}
                    className="ml-2 mt-1.5 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => updateSection('about', {
                ourApproach: {
                  ...pageData.about.ourApproach,
                  items: [...pageData.about.ourApproach.items, 'New Approach Point']
                }
              })}
              className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <FiPlus className="mr-1" /> Add Point
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeaturesSection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FiStar className="mr-2 text-yellow-500" />
          Features Section
        </h2>
        <button
          onClick={() => addArrayItem('features', {
            icon: 'FaSlidersH',
            title: 'New Feature',
            description: 'Feature description...'
          })}
          className="flex items-center text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
        >
          <FiPlus className="mr-1" /> Add Feature
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageData.features.map((feature, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <select
                    value={feature.icon}
                    onChange={(e) => updateArrayItem('features', index, 'icon', e.target.value)}
                    className="border rounded p-1 mr-2"
                  >
                    <option value="FaSlidersH">Sliders</option>
                    <option value="FaMobileAlt">Mobile</option>
                    <option value="FaPalette">Palette</option>
                    <option value="FaExchangeAlt">Exchange</option>
                    <option value="FaLaptopCode">Code</option>
                    <option value="FaPlug">Plug</option>
                  </select>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateArrayItem('features', index, 'title', e.target.value)}
                    className="text-lg font-semibold p-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500 w-full bg-transparent"
                    placeholder="Feature title"
                  />
                </div>
                <button
                  onClick={() => removeArrayItem('features', index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FiTrash2 />
                </button>
              </div>

              <textarea
                value={feature.description}
                onChange={(e) => updateArrayItem('features', index, 'description', e.target.value)}
                className="w-full text-gray-600 p-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent"
                rows="3"
                placeholder="Feature description"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServicesSection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FiList className="mr-2 text-purple-500" />
          Services Section
        </h2>
        <button
          onClick={() => addNestedArrayItem('services', 'items', {
            icon: 'MdWeb',
            title: 'New Service',
            description: 'Service description...',
            features: ['Feature 1', 'Feature 2']
          })}
          className="flex items-center text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
        >
          <FiPlus className="mr-1" /> Add Service
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input
              type="text"
              value={pageData.services.title}
              onChange={(e) => updateSection('services', { title: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
            <input
              type="text"
              value={pageData.services.description}
              onChange={(e) => updateSection('services', { description: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-4">Service Items</h3>
          <div className="space-y-6">
            {pageData.services.items.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <select
                      value={service.icon}
                      onChange={(e) => updateNestedArrayItem('services', 'items', index, 'icon', e.target.value)}
                      className="border rounded p-1 mr-2"
                    >
                      <option value="MdWeb">Web</option>
                      <option value="MdBusiness">Business</option>
                      <option value="MdPhotoLibrary">Portfolio</option>
                      <option value="MdShoppingBasket">E-commerce</option>
                      <option value="MdDashboard">Dashboard</option>
                      <option value="MdBuild">Maintenance</option>
                    </select>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateNestedArrayItem('services', 'items', index, 'title', e.target.value)}
                      className="text-lg font-semibold p-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500 w-full bg-transparent"
                      placeholder="Service title"
                    />
                  </div>
                  <button
                    onClick={() => removeNestedArrayItem('services', 'items', index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateNestedArrayItem('services', 'items', index, 'description', e.target.value)}
                    className="w-full text-gray-600 p-1 border border-gray-300 rounded-md"
                    rows="2"
                    placeholder="Service description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                  <div className="space-y-2 mt-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="mr-2 text-blue-500">•</div>
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const updatedFeatures = [...service.features];
                            updatedFeatures[featureIndex] = e.target.value;
                            updateNestedArrayItem('services', 'items', index, 'features', updatedFeatures);
                          }}
                          className="flex-1 border border-gray-300 rounded-md p-1.5 text-sm"
                        />
                        <button
                          onClick={() => {
                            const updatedFeatures = service.features.filter((_, i) => i !== featureIndex);
                            updateNestedArrayItem('services', 'items', index, 'features', updatedFeatures);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedFeatures = [...service.features, 'New Feature'];
                      updateNestedArrayItem('services', 'items', index, 'features', updatedFeatures);
                    }}
                    className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <FiPlus className="mr-1" /> Add Feature
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessSection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FiRefreshCw className="mr-2 text-orange-500" />
          Process Section
        </h2>
        <button
          onClick={() => addNestedArrayItem('steps', 'steps', {
            stepNumber: pageData.steps.steps.length + 1,
            title: 'New Step',
            description: 'Step description...'
          })}
          className="flex items-center text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
        >
          <FiPlus className="mr-1" /> Add Step
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input
              type="text"
              value={pageData.steps.title}
              onChange={(e) => updateSection('steps', { title: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
            <input
              type="text"
              value={pageData.steps.subtitle}
              onChange={(e) => updateSection('steps', { subtitle: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-4">Process Steps</h3>
          <div className="space-y-6">
            {pageData.steps.steps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-3">Step {step.stepNumber}</span>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateNestedArrayItem('steps', 'steps', index, 'title', e.target.value)}
                      className="text-lg font-semibold p-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500 w-full bg-transparent"
                      placeholder="Step title"
                    />
                  </div>
                  <button
                    onClick={() => removeNestedArrayItem('steps', 'steps', index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={step.description}
                    onChange={(e) => updateNestedArrayItem('steps', 'steps', index, 'description', e.target.value)}
                    className="w-full text-gray-600 p-1 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Step description"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolioSection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FiGrid className="mr-2 text-indigo-500" />
          Portfolio Section
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input
              type="text"
              value={pageData.portfolio.title}
              onChange={(e) => updateSection('portfolio', { title: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
            <input
              type="text"
              value={pageData.portfolio.description}
              onChange={(e) => updateSection('portfolio', { description: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlogSection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FiBook className="mr-2 text-red-500" />
          Blog Section
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input
              type="text"
              value={pageData.blog.title}
              onChange={(e) => updateSection('blog', { title: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
            <input
              type="text"
              value={pageData.blog.subtitle}
              onChange={(e) => updateSection('blog', { subtitle: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTestimonialsSection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FaQuoteLeft className="mr-2 text-purple-500" />
          Testimonials Section
        </h2>
        <button
          onClick={() => addArrayItem('testimonials', {
            avatar: '',
            name: 'New Client',
            role: 'Client Role',
            content: 'Testimonial content...',
            rating: 5
          })}
          className="flex items-center text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
        >
          <FiPlus className="mr-1" /> Add Testimonial
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pageData.testimonials.map((testimonial, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium text-gray-900">Testimonial {index + 1}</h3>
                <button
                  onClick={() => removeArrayItem('testimonials', index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Avatar</label>
                <div className="flex items-center">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt="Client avatar"
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center text-gray-400 mr-4">
                      <FiUser size={24} />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      className="hidden"
                      id={`testimonial-avatar-${index}`}
                      accept="image/*"
                      onChange={(e) => handleTestimonialAvatarChange(index, e)}
                    />
                    <label
                      htmlFor={`testimonial-avatar-${index}`}
                      className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => updateArrayItem('testimonials', index, 'name', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={testimonial.role}
                    onChange={(e) => updateArrayItem('testimonials', index, 'role', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={testimonial.content}
                  onChange={(e) => updateArrayItem('testimonials', index, 'content', e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={testimonial.rating}
                  onChange={(e) => updateArrayItem('testimonials', index, 'rating', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Stars</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCTASection = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold flex items-center">
          <FiTarget className="mr-2 text-green-500" />
          Call to Action Section
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={pageData.cta.title}
              onChange={(e) => updateSection('cta', { title: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={pageData.cta.subtitle}
              onChange={(e) => updateSection('cta', { subtitle: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={pageData.cta.ctaText}
              onChange={(e) => updateSection('cta', { ctaText: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
            <input
              type="text"
              value={pageData.cta.ctaLink}
              onChange={(e) => updateSection('cta', { ctaLink: e.target.value })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <button
            onClick={() => window.history.back()}
            className="mr-3 p-1 rounded-full hover:bg-gray-100"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          Editing Home Page
        </h1>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center px-4 py-2 rounded-md ${isSaving
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
        >
          <FiSave className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveMessage && (
        <div className={`mt-2 p-3 rounded-md text-sm ${saveStatus === 'success'
          ? 'bg-green-100 text-green-800 border border-green-200'
          : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
          {saveMessage}
        </div>
      )}

      {renderHeroSection()}
      {renderAboutSection()}
      {renderFeaturesSection()}
      {renderServicesSection()}
      {renderProcessSection()}
      {renderPortfolioSection()}
      {renderBlogSection()}
      {renderTestimonialsSection()}
      {renderCTASection()}

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center px-6 py-3 rounded-md ${isSaving
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
        >
          <FiSave className="mr-2" />
          {isSaving ? 'Saving Changes...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
};

export default EditHomePage;