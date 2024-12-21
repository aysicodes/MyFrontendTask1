// src/features/diary/components/ImageUpload.jsx
import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        setImage(null);
        return;
      }

      if (file.size > 5000000) {  // Limit file size to 5MB
        setError('File size is too large. Please upload a file smaller than 5MB.');
        setImage(null);
        return;
      }

      setError('');
      setImage(URL.createObjectURL(file));  // Display image as thumbnail
      onImageUpload(file);  // Pass the file to the parent component
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setError('');
    onImageUpload(null);  // Clear the uploaded image in parent
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2 p-2 border rounded"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {image && (
        <div className="mt-4">
          <img src={image} alt="Selected" className="w-32 h-32 object-cover rounded" />
          <button
            onClick={handleRemoveImage}
            className="mt-2 text-red-500 text-sm"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
