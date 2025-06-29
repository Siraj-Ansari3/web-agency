import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import './editor.css';
import Quill from 'quill';



// Register font family whitelist
const Font = Quill.import('formats/font');
Font.whitelist = [
  'sans-serif', 'serif', 'monospace', 'roboto', 'arial', 'times-new-roman', 'courier-new', 'georgia', 'tahoma', 'verdana'
];
Quill.register(Font, true);

const categories = [
  'General',
  'Tech',
  'Lifestyle',
  'Business',
  'Travel',
  'Other',
];

const statuses = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

// Custom image handler for ReactQuill
function imageHandler() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const quill = this.quill;
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
}

const quillModules = {
  toolbar: {
    container: [
      [{ 'font': [] }, { 'size': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    handlers: {
      image: imageHandler
    }
  }
};

const quillFormats = [
  'font', 'size',
  'header',
  'bold', 'italic', 'underline', 'strike', 'color', 'background',
  'blockquote', 'code',
  'list', 'indent',
  'align',
  'link', 'image'
  // Do NOT include 'bullet' or 'clean' here
];

const BlogEditor = ({ initialData = {}, onSave }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [category, setCategory] = useState(initialData.category || 'General');
  const [content, setContent] = useState(initialData.content || { html: '', text: '', metadata: {} });
  const [image, setImage] = useState(initialData.image || null);
  const [status, setStatus] = useState(initialData.status || 'published');
  const [tags, setTags] = useState(initialData.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleContentChange = (htmlContent) => {
    // Extract plain text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Calculate reading time (average 200 words per minute)
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // Detect content type based on HTML structure
    const hasHeadings = htmlContent.includes('<h1>') || htmlContent.includes('<h2>') || htmlContent.includes('<h3>');
    const hasImages = htmlContent.includes('<img');
    const hasLinks = htmlContent.includes('<a href');
    const hasLists = htmlContent.includes('<ul>') || htmlContent.includes('<ol>');
    const hasCode = htmlContent.includes('<code>') || htmlContent.includes('<pre>');
    const hasBlockquotes = htmlContent.includes('<blockquote>');
    
    let contentType = 'text';
    if (hasImages && hasHeadings) contentType = 'article';
    else if (hasImages) contentType = 'image-post';
    else if (hasCode) contentType = 'tutorial';
    else if (hasLists) contentType = 'list';
    else if (hasBlockquotes) contentType = 'quote';
    
    // Create content object with HTML, text, and comprehensive metadata
    const contentObject = {
      html: htmlContent,
      text: textContent,
      metadata: {
        wordCount: wordCount,
        characterCount: textContent.length,
        readingTime: readingTime,
        lastModified: new Date().toISOString(),
        contentType: contentType,
        hasImages: hasImages,
        hasLinks: hasLinks,
        hasLists: hasLists,
        hasCode: hasCode,
        hasHeadings: hasHeadings,
        hasBlockquotes: hasBlockquotes,
        formatting: {
          boldCount: (htmlContent.match(/<strong>/g) || []).length,
          italicCount: (htmlContent.match(/<em>/g) || []).length,
          linkCount: (htmlContent.match(/<a href/g) || []).length,
          imageCount: (htmlContent.match(/<img/g) || []).length,
          listCount: (htmlContent.match(/<[uo]l>/g) || []).length
        }
      }
    };
    
    setContent(contentObject);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    } else if (e.key === 'Backspace' && !tagInput && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (removeIdx) => {
    setTags(tags.filter((_, idx) => idx !== removeIdx));
  };

  // Save function that collects all data and sends it to parent
  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.html.trim()) {
      setError('Title and content are required.');
      return;
    }
    setSaving(true);
    
    const blogData = { 
      title, 
      category, 
      content, // Now content is an object
      image, 
      status, 
      tags 
    };
    
    if (onSave) {
      await onSave(blogData);
    }
    
    setSaving(false);
  };

  return (
    <form className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6" onSubmit={handleSave}>
      <h2 className="text-2xl font-bold mb-4">Blog Editor</h2>
      <div>
        <label className="block text-sm font-semibold mb-1">Title *</label>
        <input
          className="w-full border-b-2 px-2 py-2 focus:outline-none focus:border-blue-500 transition-all"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Category</label>
        <select
          className="w-full border-b-2 px-2 py-2 focus:outline-none focus:border-blue-500 transition-all"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Image</label>
        <label className="flex items-center cursor-pointer w-fit">
          <span className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition-colors duration-200 mr-3">
            Choose File
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {image && (
            <span className="text-sm text-gray-600 truncate max-w-xs">{typeof image === 'string' ? image.split('/').pop() : image.name}</span>
          )}
        </label>
        {image && (
          <img
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
            alt="Preview"
            className="mt-2 w-32 h-20 object-cover rounded shadow"
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Content *</label>
        <ReactQuill
          theme="snow"
          value={content.html || ''}
          onChange={handleContentChange}
          className="bg-white"
          modules={quillModules}
          formats={quillFormats}
        />
        {/* Display content metadata */}
        {content.metadata && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 font-semibold mb-2">Content Analysis:</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-500">
              <div>
                <span className="font-medium">Words:</span> {content.metadata.wordCount}
              </div>
              <div>
                <span className="font-medium">Reading Time:</span> {content.metadata.readingTime} min
              </div>
              <div>
                <span className="font-medium">Type:</span> {content.metadata.contentType}
              </div>
              <div>
                <span className="font-medium">Images:</span> {content.metadata.formatting?.imageCount || 0}
              </div>
              <div>
                <span className="font-medium">Links:</span> {content.metadata.formatting?.linkCount || 0}
              </div>
              <div>
                <span className="font-medium">Lists:</span> {content.metadata.formatting?.listCount || 0}
              </div>
              <div>
                <span className="font-medium">Bold:</span> {content.metadata.formatting?.boldCount || 0}
              </div>
              <div>
                <span className="font-medium">Italic:</span> {content.metadata.formatting?.italicCount || 0}
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Status</label>
        <select
          className="w-full border-b-2 px-2 py-2 focus:outline-none focus:border-blue-500 transition-all"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {statuses.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center text-sm">
              {tag}
              <button type="button" className="ml-2 text-blue-500 hover:text-red-500" onClick={() => removeTag(idx)}>&times;</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          className="w-full border-b-2 px-2 py-2 focus:outline-none focus:border-blue-500 transition-all"
          placeholder="Add a tag and press Enter or Comma"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagInputKeyDown}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      
      {/* Add a save button to the editor */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className={`px-6 py-2 rounded-md text-white ${
            saving 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {saving ? 'Saving...' : 'Save Blog Data'}
        </button>
      </div>
    </form>
  );
};

export default BlogEditor;