import React, { useState, useRef } from 'react';
import { HiX } from 'react-icons/hi';
import axios from 'axios';
import { uploadImage } from '../../common/aws'; // Import your AWS upload function

const DashboardPortfolioForm = ({ initialData = {}, onSave, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    category: initialData.category || 'Web App',
    description: initialData.description || '',
    shortDescription: initialData.shortDescription || '',
    techStack: initialData.techStack || [],
    features: initialData.features || [],
    userRoles: initialData.userRoles || '',
    liveLink: initialData.liveLink || '',
    timeline: initialData.timeline || '',
    challenge: initialData.challenge || [],
    client: initialData.client || 'Confidential',
    thumbnail: initialData.thumbnail || '',
    longSS: initialData.longSS || '',
    screenshots: initialData.screenshots || [],
  });

  // State for array inputs
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newChallenge, setNewChallenge] = useState('');

  // File states
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [longSSFile, setLongSSFile] = useState(null);
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  
  // Refs for file inputs
  const thumbnailInputRef = useRef(null);
  const longSSInputRef = useRef(null);
  const screenshotsInputRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInput = (e, setFunction) => {
    setFunction(e.target.value);
  };

  const addArrayItem = (field, value, setFunction) => {
    if (value.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value]
    }));
    
    setFunction('');
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e, setFileFunction, fieldName) => {
    if (e.target.files[0]) {
      setFileFunction(e.target.files[0]);
      setUploadStatus(prev => ({ ...prev, [fieldName]: 'pending' }));
    }
  };

  const handleScreenshotsChange = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setScreenshotFiles(prev => [...prev, ...files]);
      setUploadStatus(prev => ({ ...prev, screenshots: 'pending' }));
    }
  };

  const removeScreenshotFile = (index) => {
    setScreenshotFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeThumbnailFile = () => {
    setThumbnailFile(null);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const removeLongSSFile = () => {
    setLongSSFile(null);
    if (longSSInputRef.current) longSSInputRef.current.value = '';
  };

  const uploadAllImages = async () => {
    const uploadPromises = [];
    const uploadedUrls = {};

    // Thumbnail upload
    if (thumbnailFile) {
      uploadPromises.push(
        uploadImage(thumbnailFile)
          .then(url => {
            uploadedUrls.thumbnail = url;
            setUploadStatus(prev => ({ ...prev, thumbnail: 'success' }));
          })
          .catch(error => {
            setUploadStatus(prev => ({ ...prev, thumbnail: 'error' }));
            throw error;
          })
      );
    }

    // Long screenshot upload
    if (longSSFile) {
      uploadPromises.push(
        uploadImage(longSSFile)
          .then(url => {
            uploadedUrls.longSS = url;
            setUploadStatus(prev => ({ ...prev, longSS: 'success' }));
          })
          .catch(error => {
            setUploadStatus(prev => ({ ...prev, longSS: 'error' }));
            throw error;
          })
      );
    }

    // Screenshots upload
    if (screenshotFiles.length > 0) {
      uploadPromises.push(
        Promise.all(screenshotFiles.map(file => uploadImage(file)))
          .then(urls => {
            uploadedUrls.screenshots = urls;
            setUploadStatus(prev => ({ ...prev, screenshots: 'success' }));
          })
          .catch(error => {
            setUploadStatus(prev => ({ ...prev, screenshots: 'error' }));
            throw error;
          })
      );
    }

    try {
      await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Some images failed to upload');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Upload all images first
      const uploadedImages = await uploadAllImages();
      
      // Update form data with new image URLs
      const updatedFormData = {
        ...formData,
        ...uploadedImages,
        screenshots: [
          ...formData.screenshots,
          ...(uploadedImages.screenshots || [])
        ]
      };
      
      // Send the complete form data to parent
      onSave(updatedFormData);
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Error uploading images. Please try again.');
    }
  };

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    if (!status) return null;
    
    return (
      <span className={`ml-2 text-xs px-2 py-1 rounded ${
        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        status === 'success' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}>
        {status === 'pending' ? 'Pending upload' :
         status === 'success' ? 'Uploaded' : 'Upload failed'}
      </span>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Real Estate">Real Estate</option>
              <option value="Business">Business</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Education">Education</option>
              <option value="Social Media">Social Media</option>
              <option value="News">News</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Web App">Web App</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Used in portfolio detail hero section"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">User Roles *</label>
            <input
              type="text"
              name="userRoles"
              value={formData.userRoles}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Buyer and Admin"
            />
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Live Link *</label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeline *</label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Built in 4 weeks during April 2024"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Client name (optional)"
            />
          </div>

          {/* Tech Stack */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack *</label>
            <div className="flex">
              <input
                type="text"
                value={newTech}
                onChange={(e) => handleArrayInput(e, setNewTech)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add technology"
              />
              <button
                type="button"
                onClick={() => addArrayItem('techStack', newTech, setNewTech)}
                className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.techStack.map((tech, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('techStack', index)}
                    className="ml-2 text-blue-800 hover:text-blue-900"
                  >
                    <HiX className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Features *</label>
            <div className="flex">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => handleArrayInput(e, setNewFeature)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add feature"
              />
              <button
                type="button"
                onClick={() => addArrayItem('features', newFeature, setNewFeature)}
                className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.features.map((feature, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('features', index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <HiX />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Challenges *</label>
            <div className="flex">
              <input
                type="text"
                value={newChallenge}
                onChange={(e) => handleArrayInput(e, setNewChallenge)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add challenge"
              />
              <button
                type="button"
                onClick={() => addArrayItem('challenge', newChallenge, setNewChallenge)}
                className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.challenge.map((challenge, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                  <span>{challenge}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('challenge', index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <HiX />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail *
            <StatusIndicator status={uploadStatus.thumbnail} />
          </label>
          
          {/* Existing thumbnail preview */}
          {formData.thumbnail && !thumbnailFile && (
            <div className="mb-2 relative">
              <img 
                src={formData.thumbnail} 
                alt="Thumbnail preview" 
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          )}
          
          {/* New thumbnail file tag */}
          {thumbnailFile && (
            <div className="mb-2 bg-gray-100 rounded-md p-2 flex items-center justify-between">
              <div className="flex items-center truncate">
                <span className="truncate text-sm">{thumbnailFile.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {(thumbnailFile.size / 1024).toFixed(1)}KB
                </span>
              </div>
              <button
                type="button"
                onClick={removeThumbnailFile}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <HiX />
              </button>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            ref={thumbnailInputRef}
            onChange={(e) => handleImageChange(e, setThumbnailFile, 'thumbnail')}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required={!formData.thumbnail}
          />
        </div>

        {/* Long Screenshot */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Long Screenshot *
            <StatusIndicator status={uploadStatus.longSS} />
          </label>
          
          {/* Existing longSS preview */}
          {formData.longSS && !longSSFile && (
            <div className="mb-2">
              <img 
                src={formData.longSS} 
                alt="Long screenshot preview" 
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          )}
          
          {/* New longSS file tag */}
          {longSSFile && (
            <div className="mb-2 bg-gray-100 rounded-md p-2 flex items-center justify-between">
              <div className="flex items-center truncate">
                <span className="truncate text-sm">{longSSFile.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {(longSSFile.size / 1024).toFixed(1)}KB
                </span>
              </div>
              <button
                type="button"
                onClick={removeLongSSFile}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <HiX />
              </button>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            ref={longSSInputRef}
            onChange={(e) => handleImageChange(e, setLongSSFile, 'longSS')}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required={!formData.longSS}
          />
        </div>

        {/* Screenshots */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Screenshots *
            <StatusIndicator status={uploadStatus.screenshots} />
          </label>
          
          {/* Existing screenshots */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            {formData.screenshots.map((screenshot, index) => (
              <div key={index} className="relative">
                <img 
                  src={screenshot} 
                  alt={`Screenshot ${index + 1}`} 
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('screenshots', index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <HiX className="text-xs" />
                </button>
              </div>
            ))}
          </div>
          
          {/* New screenshot files as tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {screenshotFiles.map((file, index) => (
              <div 
                key={index} 
                className="bg-gray-100 rounded-md px-3 py-1 flex items-center"
              >
                <span className="truncate max-w-[100px] text-sm mr-2">{file.name}</span>
                <span className="text-xs text-gray-500 mr-2">
                  {(file.size / 1024).toFixed(1)}KB
                </span>
                <button
                  type="button"
                  onClick={() => removeScreenshotFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <HiX className="text-sm" />
                </button>
              </div>
            ))}
          </div>
          
          <input
            type="file"
            accept="image/*"
            multiple
            ref={screenshotsInputRef}
            onChange={handleScreenshotsChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required={formData.screenshots.length === 0 && screenshotFiles.length === 0}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
};

export default DashboardPortfolioForm;