import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faSpinner, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBlogPost() {
  const [formData, setFormData] = useState({
    posttitle: '',
    postcontent: '',
    image: null
  });
  const [userid, setUserid] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:4999/dashboard', { withCredentials: true });
        if (response.data.loggedIn) {
          setUserid(response.data.userid);
          
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Please login:', error);
      }
    };

    checkSession();
  }, [navigate]);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    } else {
      setError('Please upload an image file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.posttitle || !formData.postcontent) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;
      
      if (formData.image) {
        const cloudinaryData = new FormData();
        cloudinaryData.append('file', formData.image);
        cloudinaryData.append('upload_preset', 'blogapp');
        
        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/deax72mws/image/upload',
          cloudinaryData
        );
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const postData = {
        posttitle: formData.posttitle,
        postcontent: formData.postcontent,
        imageUrl: imageUrl
      };

      const response = await axios.post(
        `http://localhost:4999/createpost/${userid}`,
        postData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setFormData({ posttitle: '', postcontent: '', image: null });
        setImagePreview('');
        setError('');
        navigate('/');
        alert('Post created successfully!');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || 'Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#191919] rounded-lg shadow-xl mt-[12vh]">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Blog Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="posttitle" className="block text-white mb-2">
            Title
          </label>
          <input
            type="text"
            id="posttitle"
            name="posttitle"
            value={formData.posttitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Content Input */}
        <div>
          <label htmlFor="postcontent" className="block text-white mb-2">
            Content
          </label>
          <textarea
            id="postcontent"
            name="postcontent"
            value={formData.postcontent}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:border-blue-500 focus:outline-none min-h-[200px]"
            placeholder="Write your blog post content..."
        
          />
        </div>

        {/* Image Upload - Traditional */}
        <div className="hidden md:block">
          <label htmlFor="image" className="block text-white mb-2">
            Upload Image
          </label>
          <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-4">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="text-3xl text-gray-400 mb-2" />
              <p className="text-gray-400">Click to upload or drag and drop</p>
            </div>
          </div>
        </div>

        {/* Image Upload - Drag and Drop */}
        <div 
          className="md:hidden relative border-2 border-dashed border-gray-700 rounded-lg p-4"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className={`text-center ${dragActive ? 'bg-gray-800 bg-opacity-50' : ''}`}>
            <FontAwesomeIcon 
              icon={imagePreview ? faImage : faCloudUploadAlt} 
              className="text-3xl text-gray-400 mb-2" 
            />
            <p className="text-gray-400">
              {dragActive ? 'Drop image here' : 'Tap to upload or drag image here'}
            </p>
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-[200px] rounded-lg mx-auto"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview('');
                setFormData({ ...formData, image: null });
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              cancel upload
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold 
            ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}
            transition duration-200`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              Creating Post...
            </span>
          ) : (
            'Create Post'
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateBlogPost;