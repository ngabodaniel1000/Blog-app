import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Toprated = () => {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [limit, setLimit] = useState(5);
  const [postsdata, setPostsdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      setLimit((prevLimit) => prevLimit + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postsResponse = await Axios.get(`http://localhost:4999/gettopposts?limit=${limit}`, { withCredentials: true });
        setPostsdata(postsResponse.data.posts);

        const sessionResponse = await Axios.get('http://localhost:4999/dashboard', { withCredentials: true });
        if (sessionResponse.data.loggedIn) {
          setUsername(sessionResponse.data.user);
          setIsLoggedIn(true);
          setUserid(sessionResponse.data.userid);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Failed to fetch posts", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  const handleLike = async (postId) => {
    try {
      const response = await Axios.put(`http://localhost:4999/post/like/${postId}`, {}, { withCredentials: true });
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
        });
      } else {
        setPostsdata(postsdata.map(post => post._id === postId ? { ...post, postlikes: post.postlikes + 1 } : post));
        toast.success("Post liked!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to like post. Login to like the post!");
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row mt-5 bg-[#F5F5F5] h-auto w-full overflow-auto justify-center items-center">
    <ToastContainer />
    <div className="w-full md:w-[70%] px-4">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-6">
          {postsdata.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-md shadow-md transition-shadow duration-200 hover:shadow-lg max-w-[500px] mx-auto"
            >
              {/* Display Image */}
              {post.imageUrl && (
                <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={post.imageUrl}
                    alt={post.posttitle}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              )}
  
              {/* Display Post Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {post.posttitle === "Untitled" ? ' ' : post.posttitle}
              </h3>
  
              {/* Display Post Content */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.postcontent}
              </p>
  
              {/* Like and Comment Actions */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    onClick={() => handleLike(post._id)}
                    icon={faThumbsUp}
                    className="text-[#FFABAB] cursor-pointer text-xl"
                  />
                  <span className="text-gray-600">{post.postlikes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faComment} className="text-gray-600" />
                  <span className="text-gray-600">
                    {post.postcomments.length} {post.postcomments.length <= 1 ? "comment" : "comments"}
                  </span>
                </div>
              </div>
  
              {/* Read More Button */}
              <Link
                to={`/post/${post._id}`}
                className="w-full max-w-[150px] mx-auto"
              >
                <button className="bg-[#FFABAB] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#FF6F61] transition duration-200">
                  Read More
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Toprated;
