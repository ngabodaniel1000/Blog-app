import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get('http://localhost:4999/getallblogposts', { withCredentials: true });
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast.error("Failed to load blog posts. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row mt-5 bg-[#000005] overflow-y-auto h-full w-full">
      {/* ToastContainer to display notifications */}
      <ToastContainer />
      <div className='w-full md:w-[70%] px-4'>
        <h1 className="text-2xl font-bold text-white mb-4">Blog Posts</h1>
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post._id} className="bg-[#191919] p-4 rounded-md">
              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-2">{post.content}</p>
              <Link to={`/blog/${post._id}`} className="w-full max-w-[200px]">
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                  Read more
                </button>
              </Link>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="footer bg-gray-800 text-white p-4">
            <p>© 2023 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
      <div className="w-[30%] hidden md:flex bg-yellow-200">
        {/* Sidebar content can go here */}
      </div>
    </div>
  );
}

export default BlogPosts; 