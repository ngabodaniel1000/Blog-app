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
    <div className="max-w-4xl mx-auto p-6 bg-[#F5F5F5] rounded-lg shadow-xl mt-[10vh] sm:mt-[8vh] lg:mt-[6vh]">
  {/* Page Title */}
  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">Create New Blog Post</h1>
  
  {/* Form Section */}
  <form
    onSubmit={handleSubmit}
    className="space-y-6"
  >
    {/* Title Input */}
    <div>
      <label htmlFor="posttitle" className="block text-gray-700 text-sm font-medium mb-2">Title</label>
      <input
        type="text"
        id="posttitle"
        name="posttitle"
        value={formData.posttitle}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-lg bg-[#ffaaa] text-gray-700 border border-pink-100 focus:outline-none focus:border-pink-200 transition"
        placeholder="Enter blog title..."
        required
      />
    </div>

    {/* Content Input */}
    <div>
      <label htmlFor="postcontent" className="block text-gray-700 text-sm font-medium mb-2">Content</label>
      <textarea
        id="postcontent"
        name="postcontent"
        value={formData.postcontent}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg bg-[#ffaaa] text-gray-700 border border-pink-100 focus:outline-none focus:border-pink-200 transition min-h-[200px]"
        placeholder="Write your blog post content..."
      />
    </div>

    {/* Image Upload Section */}
    <div className="relative border-2 border-dashed border-pink-300 rounded-lg p-4 cursor-pointer hover:bg-pink-100 transition duration-200">
      <label htmlFor="image" className="flex flex-col items-center justify-center cursor-pointer text-center text-gray-600">
        <FontAwesomeIcon icon={faCloudUploadAlt} className="text-3xl text-[#db7093] mb-2" />
        <span>Click to upload or drag and drop</span>
      </label>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>

    {/* Image Preview Section */}
    {imagePreview && (
      <div className="relative mt-2">
        <img src={imagePreview} alt="Preview" className="max-h-[200px] rounded-lg mx-auto" />
        <button
          type="button"
          onClick={() => {
            setImagePreview('');
            setFormData({ ...formData, image: null });
          }}
          className="absolute top-2 right-2 bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-lg transition duration-300"
        >
          Cancel
        </button>
      </div>
    )}

    {/* Error Section */}
    {error && (
      <div className="text-red-600 text-sm">
        {error}
      </div>
    )}

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3 rounded-lg text-white font-semibold text-lg 
        ${loading ? 'bg-gray-400' : 'bg-[#db7093] hover:bg-[#d07da3]'} 
        transition duration-200`
      }
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
          Creating...
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