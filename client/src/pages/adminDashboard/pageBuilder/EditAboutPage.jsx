// EditAboutPage.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiUpload, FiSave, FiTrash2 } from 'react-icons/fi';
import { uploadImage } from '../../../common/aws';

const EditAboutPage = () => {
  // Initial state for all sections
  const initialState = {
    header: {},
    storyMission: {
    },
    coreValues: [

    ],
    teamMembers: [

    ],
    whyChooseUs: [

    ],
    cta: {

    }
  };

  // State management
  const [pageData, setPageData] = useState(initialState);
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState('')

  const [imagePreviews, setImagePreviews] = useState({});
  const [teamMemberImageFiles, setTeamMemberImageFiles] = useState({});

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutData = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/about")
        setPageData(aboutData.data);

      }
      catch (err) {
        console.log(err)
        return "aboutPage data not found"
      }
    }

    fetchAboutData()


  }, []);


  // Handle input changes
  const handleChange = (section, field, value) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle array item changes
  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = [...pageData[section]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setPageData(prev => ({ ...prev, [section]: updatedArray }));
  };

  // Handle social media changes
  const handleSocialChange = (index, platform, value) => {
    const updatedTeam = [...pageData.teamMembers];
    updatedTeam[index].social[platform] = value;  // updates the links key = platform and value = value
    setPageData(prev => ({ ...prev, teamMembers: updatedTeam }));
  };

  // Handle skill changes
  const handleSkillChange = (index, skillIndex, value) => {
    const updatedTeam = [...pageData.teamMembers];
    updatedTeam[index].skills[skillIndex] = value;
    setPageData(prev => ({ ...prev, teamMembers: updatedTeam }));
  };

  // Add new item to array
  const addItem = (section, template) => {
    setPageData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...template }]
    }));
  };

  // Remove item from array
  const removeItem = (section, index) => {
    if (section === 'teamMembers') {
      // Remove any stored image file for this index
      setTeamMemberImageFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[index];
        return newFiles;
      });
      // Handle active team member index when deleting
      if (activeTeamMember === index) {
        if (pageData.teamMembers.length > 1) {
          setActiveTeamMember(index > 0 ? index - 1 : 0);
        } else {
          setActiveTeamMember(null);
        }
      } else if (activeTeamMember > index) {
        setActiveTeamMember(activeTeamMember - 1);
      }
    }


    setPageData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store file for later upload
    setTeamMemberImageFiles(prev => ({
      ...prev,
      [index]: file
    }));

    // Set image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews(prev => ({ ...prev, [index]: reader.result }));
    };
    reader.readAsDataURL(file);
  };


  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedPageData = { ...pageData };
      const uploadPromises = [];

      Object.keys(teamMemberImageFiles).forEach(index => {
        const file = teamMemberImageFiles[index];
        if (file) {
          uploadPromises.push(
            uploadImage(file).then(url => {
              updatedPageData.teamMembers[index].img = url;
            })
          );
        }
      });

      // Wait for all image uploads to complete
      await Promise.all(uploadPromises);

      console.log("page data", updatedPageData)


      // Now send all data to server
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/about",
        updatedPageData,
        { withCredentials: true }
      );

      // Clear uploaded files after successful save
      setTeamMemberImageFiles({});

      setSaveStatus('success');
      setSuccessMessage(response.data.message);
      setPageData(response.data.page);
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      console.error('Save error:', err);

      // Handle different types of errors
      let errorMessage = 'Failed to save homepage. ';

      if (err.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. Please try again.';
      } else if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const errorData = err.response.data;

        switch (status) {
          case 400:
            errorMessage += `Validation Error: ${errorData.error || 'Invalid data provided'}`;
            break;
          case 401:
            errorMessage += 'Authentication failed. Please log in again.';
            break;
          case 403:
            errorMessage += 'You do not have permission to save changes.';
            break;
          case 500:
            errorMessage += 'Server error occurred. Please try again later.';
            break;
          default:
            errorMessage += errorData.message || 'Unknown server error';
        }
      } else if (err.request) {
        // Network error
        errorMessage += 'Please check your internet connection and try again.';
      } else {
        // Other error
        errorMessage += 'An unexpected error occurred. Please try again.';
      }

      setSuccessMessage(errorMessage);
      setSaveStatus('error');

      // Auto-clear error message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setSaveStatus('');
      }, 5000);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Edit About Page</h1>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <>
              <FiSave className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>


      {
        successMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${saveStatus === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
              }`}
          >
            {successMessage}
          </div>
        )
      }

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Header Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Header Section</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={pageData.header.tagline}
                onChange={(e) => handleChange('header', 'tagline', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={pageData.header.title}
                onChange={(e) => handleChange('header', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={pageData.header.description}
                onChange={(e) => handleChange('header', 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Our Story & Mission</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Our Story</label>
              <textarea
                value={pageData.storyMission.story}
                onChange={(e) => handleChange('storyMission', 'story', e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
                <textarea
                  value={pageData.storyMission.mission}
                  onChange={(e) => handleChange('storyMission', 'mission', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
                <textarea
                  value={pageData.storyMission.vision}
                  onChange={(e) => handleChange('storyMission', 'vision', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6 pb-2 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Core Values</h2>
            <button
              type="button"
              onClick={() => addItem('coreValues', { title: '', description: '', icon: 'FiSmile' })}
              className="flex items-center text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-lg"
            >
              <FiPlus className="mr-1" /> Add Value
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageData.coreValues.map((value, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                <button
                  type="button"
                  onClick={() => removeItem('coreValues', index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => handleArrayChange('coreValues', index, 'title', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={value.description}
                    onChange={(e) => handleArrayChange('coreValues', index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select
                    value={value.icon}
                    onChange={(e) => handleArrayChange('coreValues', index, 'icon', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                  >
                    <option value="FiSmile">Smile</option>
                    <option value="FiThumbsUp">Thumbs Up</option>
                    <option value="FiTrendingUp">Trending Up</option>
                    <option value="FiStar">Star</option>
                    <option value="FiHeart">Heart</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Members Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6 pb-2 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
            <button
              type="button"
              onClick={() => addItem('teamMembers', {
                id: Date.now(),
                name: '',
                role: '',
                bio: '',
                img: '',
                skills: [],
                social: { twitter: '', github: '', linkedin: '' }
              })}
              className="flex items-center text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-lg"
            >
              <FiPlus className="mr-1" /> Add Member
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Team Members</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {pageData.teamMembers.map((member, index) => (
                    <div
                      key={member.id || index} // Added fallback to index
                      onClick={() => setActiveTeamMember(index)}
                      className={`p-3 rounded-lg cursor-pointer ${activeTeamMember === index
                        ? 'bg-blue-100 border border-blue-300'
                        : 'hover:bg-gray-100'
                        }`}
                    >
                      <p className="font-medium truncate">
                        {member?.name || `New Member ${index + 1}`} {/* Safe access with optional chaining */}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {member?.role || 'No role specified'} {/* Safe access */}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {pageData.teamMembers.length > 0 && activeTeamMember !== null ? (
              <div className="lg:col-span-3">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {pageData?.teamMembers[activeTeamMember]?.name || 'New Team Member'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeItem('teamMembers', activeTeamMember)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Photo
                        </label>
                        <div className="relative">
                          <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                            {imagePreviews[activeTeamMember] ? (
                              <img
                                src={imagePreviews[activeTeamMember]}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-4">
                                <FiUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                                <p className="text-sm text-gray-500">
                                  Upload a profile photo
                                </p>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            onChange={(e) => handleImageUpload(e, activeTeamMember)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={pageData.teamMembers[activeTeamMember].name}
                            onChange={(e) => handleArrayChange('teamMembers', activeTeamMember, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Role/Position</label>
                          <input
                            type="text"
                            value={pageData.teamMembers[activeTeamMember].role}
                            onChange={(e) => handleArrayChange('teamMembers', activeTeamMember, 'role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                          <textarea
                            value={pageData.teamMembers[activeTeamMember].bio}
                            onChange={(e) => handleArrayChange('teamMembers', activeTeamMember, 'bio', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {pageData.teamMembers[activeTeamMember].skills.map((skill, skillIndex) => (
                              <div key={skillIndex} className="flex items-center bg-gray-100 px-2 py-1 rounded">
                                <input
                                  type="text"
                                  value={skill}
                                  onChange={(e) => handleSkillChange(activeTeamMember, skillIndex, e.target.value)}
                                  className="bg-transparent text-sm focus:outline-none min-w-[80px]"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedSkills = [...pageData.teamMembers[activeTeamMember].skills];
                                    updatedSkills.splice(skillIndex, 1);
                                    handleArrayChange('teamMembers', activeTeamMember, 'skills', updatedSkills);
                                  }}
                                  className="ml-1 text-red-500 hover:text-red-700"
                                >
                                  <FiX size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedSkills = [...pageData.teamMembers[activeTeamMember].skills, 'New Skill'];
                              handleArrayChange('teamMembers', activeTeamMember, 'skills', updatedSkills);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <FiPlus className="mr-1" /> Add Skill
                          </button>
                        </div>

                        <div className="md:col-span-2 mt-4">
                          <h4 className="font-medium text-gray-800 mb-2">Social Media</h4>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <span className="w-24 text-sm text-gray-600">Instagram:</span>
                              <input
                                type="text"
                                value={pageData.teamMembers[activeTeamMember].social.instagram}
                                onChange={(e) => handleSocialChange(activeTeamMember, 'instagram', e.target.value)}
                                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg"
                                placeholder="https://instagram.com/username"
                              />
                            </div>
                            <div className="flex items-center">
                              <span className="w-24 text-sm text-gray-600">GitHub:</span>
                              <input
                                type="text"
                                value={pageData.teamMembers[activeTeamMember].social.github}
                                onChange={(e) => handleSocialChange(activeTeamMember, 'github', e.target.value)}
                                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg"
                                placeholder="https://github.com/username"
                              />
                            </div>
                            <div className="flex items-center">
                              <span className="w-24 text-sm text-gray-600">LinkedIn:</span>
                              <input
                                type="text"
                                value={pageData.teamMembers[activeTeamMember].social.linkedin}
                                onChange={(e) => handleSocialChange(activeTeamMember, 'linkedin', e.target.value)}
                                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg"
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                            <div className="flex items-center">
                              <span className="w-24 text-sm text-gray-600">Facebook:</span>
                              <input
                                type="text"
                                value={pageData.teamMembers[activeTeamMember].social.facebook || ""}
                                onChange={(e) => handleSocialChange(activeTeamMember, 'facebook', e.target.value)}
                                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg"
                                placeholder="https://facebook.com/username"
                              />
                            </div>
                            <div className="flex items-center">
                              <span className="w-24 text-sm text-gray-600">Twitter:</span>
                              <input
                                type="text"
                                value={pageData.teamMembers[activeTeamMember].social.twitter || ""}
                                onChange={(e) => handleSocialChange(activeTeamMember, 'twitter', e.target.value)}
                                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg"
                                placeholder="https://twitter.com/username"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
              : (
                <div className="lg:col-span-3 flex items-center justify-center h-64">
                  <p className="text-gray-500">No team members to display</p>
                </div>
              )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6 pb-2 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Why Choose Us</h2>
            <button
              type="button"
              onClick={() => addItem('whyChooseUs', {
                title: '',
                description: '',
                icon: 'FiAward'
              })}
              className="flex items-center text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-lg"
            >
              <FiPlus className="mr-1" /> Add Reason
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageData.whyChooseUs.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                <button
                  type="button"
                  onClick={() => removeItem('whyChooseUs', index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleArrayChange('whyChooseUs', index, 'title', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleArrayChange('whyChooseUs', index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select
                    value={item.icon}
                    onChange={(e) => handleArrayChange('whyChooseUs', index, 'icon', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                  >
                    <option value="FiAward">Award</option>
                    <option value="FiTarget">Target</option>
                    <option value="FiRefreshCw">Refresh</option>
                    <option value="FiUsers">Users</option>
                    <option value="FiCheckCircle">Check Circle</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Call to Action</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={pageData.cta.title}
                onChange={(e) => handleChange('cta', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={pageData.cta.subtitle}
                onChange={(e) => handleChange('cta', 'subtitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                value={pageData.cta.buttonText}
                onChange={(e) => handleChange('cta', 'buttonText', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </section>
      </form>
    </div >
  );
};

export default EditAboutPage;