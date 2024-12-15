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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    posttitle: '',
    postcontent: '',
    image: null,
  });


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
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      if (response.data.message === "You have already liked this post") {
        toast.warning(response.data.message, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'light'
        });
      } else {
        setPostsdata(postsdata.map(post => post._id === postId ? { ...post, postlikes: post.postlikes + 1 } : post));
        toast.success("Post liked!", {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error("Failed to like post. Login to like the post!", {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row mt-5 bg-[#000005] overflow-y-auto h-full w-full">
      <ToastContainer />
      <div className='w-full md:w-[70%] px-4'>
  
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="space-y-10">
              {postsdata.map((post) => (
                <div key={post._id} className="bg-[#191919] p-4 rounded-md">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.posttitle}
                      className="w-full h-auto mb-4 rounded"
                    />
                  )}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {post.posttitle === "Untitled" ? ' ' : post.posttitle }
                  </h3>
                  <p className="text-gray-300 mb-2">{post.postcontent}</p>
  
                  <div className="flex items-center space-x-4 mb-2">
                    
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon onClick={() => handleLike(post._id)} icon={faThumbsUp} className="text-red-400 cursor-pointer text-xl" />
                      <span className="text-gray-400">{post.postlikes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faComment} className="text-gray-400" />
                      <span className="text-gray-400">{post.postcomments.length}  {post.postcomments.length <= 1 ? "comment":"Comments"}</span>
                    </div>
                  
                  </div>
                  <Link to={`/post/${post._id}`} className="w-full max-w-[200px]">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                      Read more
                    </button>
                  </Link>
                </div>
              ))}
            </div>
  
          </>
        )}
      </div>
      <div className="w-[30%] h-[90vh] hidden md:flex bg-gray-800 bg-opacity-10 p-4">
</div>
    </div>
  );
}

export default Toprated;