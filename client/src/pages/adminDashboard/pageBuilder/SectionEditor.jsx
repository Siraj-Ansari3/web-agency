// SectionEditor.jsx
import React, { useState } from 'react';

const SectionEditor = ({ 
  title, 
  initialContent, 
  onSave,
  imageUpload = false,
  richText = false 
}) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(content);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Edit Section
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={() => {
                setContent(initialContent);
                setIsEditing(false);
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          {imageUpload && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <input
                  type="file"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            {richText ? (
              <div className="border border-gray-300 rounded min-h-[200px] p-3">
                {/* Rich text editor would go here */}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[150px] p-2 border border-gray-300 rounded"
                  placeholder="Enter content here..."
                />
                <div className="mt-2 flex space-x-1">
                  <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                    <strong>B</strong>
                  </button>
                  <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                    <em>I</em>
                  </button>
                  <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                    U
                  </button>
                </div>
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[100px] p-2 border border-gray-300 rounded"
                placeholder="Enter content here..."
              />
            )}
          </div>
        </div>
      ) : (
        <div className="prose max-w-none">
          {content || <p className="text-gray-500">No content added yet</p>}
        </div>
      )}
    </div>
  );
};

export default SectionEditor;