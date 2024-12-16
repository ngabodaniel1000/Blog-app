import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Myblog() {
  const [myblog, Setmyblog] = useState([]);
  const userid = localStorage.getItem('user id');

  useEffect(() => {
    const getmypost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4999/post/mypost/${userid}`,
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 200) {
          Setmyblog(response.data.mypost);
        }
      } catch (error) {
        toast.error("Failed to fetch your posts.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    };
    getmypost();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:4999/post/like/${postId}`,
        {},
        { withCredentials: true }
      );
      if (response.data.message === "Unauthorized to this api") {
        toast.error("Please sign in to like the post!", {
          position: "top-right",
          autoClose: 10000,
        });
        return;
      }
      if (response.data.message === "You have already liked this post") {
        toast.warning(response.data.message, {
          position: "top-right",
          autoClose: 10000,
        });
      } else {
        toast.success("Post liked!", {
          position: "top-right",
          autoClose: 10000,
        });
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post.");
    }
  };

  return (
    <div className='h-screen'>
    <div className="mt-[70px] md:mt-[60px] mx-auto p-4 max-w-screen-lg max-h-screen bg-[#F5F5F5]">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Section Header */}
      <h1 className="text-2xl md:text-3xl text-gray-800 mb-6 text-center font-semibold">
        My Latest Blogs
      </h1>

      {/* Grid for Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myblog.map((post) => (
          <div
            key={post._id}
            className="bg-[#FFFFFF] p-4 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            {/* Image Section */}
            {post.imageUrl && (
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={post.imageUrl}
                  alt={post.posttitle}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate leading-tight">
              {post.posttitle === "Untitled" ? '' : post.posttitle}
            </h3>

            {/* Blog Content */}
            <p className="text-sm text-gray-600 mb-3 leading-relaxed truncate">
              {post.postcontent}
            </p>

            {/* Like and Comment Section */}
            <div className="flex items-center justify-between mt-2 space-x-2">
              <div className="flex items-center space-x-2 cursor-pointer">
                <FontAwesomeIcon
                  onClick={() => handleLike(post._id)}
                  icon={faThumbsUp}
                  className="text-[#FFABAB] text-xl cursor-pointer hover:text-[#FF6F61]"
                />
                <span className="text-gray-600">{post.postlikes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faComment}
                  className="text-gray-600 text-lg hover:text-gray-800"
                />
                <span className="text-gray-600">
                  {post.postcomments.length} {post.postcomments.length <= 1 ? "comment" : "comments"}
                </span>
              </div>
            </div>

            {/* Read More Button */}
            <Link
              to={`/post/${post._id}`}
              className="mt-3 w-full bg-[#FFABAB] text-white text-sm px-3 py-2 rounded-md text-center hover:bg-[#FF6F61] transition duration-200"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Myblog;
