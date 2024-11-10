// ImageUploader.jsx
import React, { useState } from 'react';
import axios from 'axios';
import API_ROUTES from '../../constants/apiRoutes'

const ImageUploader = ({ albumName, coupleId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addImage = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('albumName', albumName);
    formData.append('coupleId', coupleId);

    try {
      const response = await axios.post(API_ROUTES.UPLOAD_IMAGE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.publicURL) {
        onUploadSuccess(response.data.publicURL);
      } else {
        console.error("No public URL returned in response");
      }

      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <input type="file" id="file-upload" onChange={handleFileChange} />
      <button onClick={addImage} className="px-4 py-2 bg-pink-800 text-white">Add Image</button>
    </div>
  );
};

export default ImageUploader;
