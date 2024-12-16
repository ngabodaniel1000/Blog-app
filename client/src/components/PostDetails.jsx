import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faUser, faClock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function PostDetails() {
    const { postId } = useParams();
    const [postdata, setPostData] = useState({});
    const [loading, setLoading] = useState(true);
    const userid = localStorage.getItem("user id");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4999/post/${postId}`, { withCredentials: true });
                setPostData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post details:', error);
                setLoading(false);
                toast.error('Failed to load post details', {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        };

        fetchPostDetails();
    }, [postId]);
    console.log(postdata);
    

    const handleComment = async () => {
            if (content === "") {
                toast.warning("please insert comment", {
                    position: "top-right",
                    autoClose: 5000,
    
                })
            }
            else{
                try {
                const response = await axios.post(
                    `http://localhost:4999/post/${postId}/comment`, 
                    { content }, 
                    { withCredentials: true }
                );
    
                if (response.status === 201) {
                    toast.success("Comment added successfully", {
                        position: "top-right",
                        autoClose: 5000,
                    });
                    
                    const updatedPost = await fetch(`http://localhost:4999/post/${postId}`);
                    const updatedData = await updatedPost.json();
                    setPostData(updatedData);
                    
                    setContent("");
                }
            } catch (error) {
                toast.error("Failed to add comment", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            }
        }
           

    const handleLike = async () => {
        try {
            const response = await axios.put(`http://localhost:4999/post/like/${postId}`, {}, { withCredentials: true });
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
                setPostData(prevData => ({ ...prevData, postlikes: prevData.postlikes + 1 }));
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen shadow-md">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-5 max-w-4xl shadow-lg min-h-screen">
    <ToastContainer />
    
    {/* Post Details Section */}
    <div className="shadow-lg rounded-lg overflow-hidden mb-8">
        {/* Centered Image Section */}
        {postdata.imageUrl && (
            <div className="flex items-center justify-center w-full h-auto">
                <img 
                    src={postdata.imageUrl} 
                    alt="Post"
                    className="w-96 h-96 object-cover rounded-lg shadow-md"
                />
            </div>
        )}
    
        {/* Post Content */}
        <div className="p-6 ">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {postdata.posttitle == "Untitled" ? "" : ""}
            </h2>
    
            <p className="text-slate-900 text-lg mb-6 leading-relaxed">
                {postdata.postcontent}
            </p>
    
            {/* Engagement Metrics */}
            <div className="flex items-center space-x-6 text-gray-600">
                {/* Like Section */}
                <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLike}>
                    <FontAwesomeIcon icon={faThumbsUp} className="w-6 h-6 text-[#FFABAB]" />
                    <span className="text-sm">{postdata.postlikes} Likes</span>
                </div>
    
                {/* Comment Section */}
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <FontAwesomeIcon icon={faComment} className="w-6 h-6 text-gray-700" />
                        <span className="text-sm">{postdata.postcomments.length} Comments</span>
                    </div>
            </div>
                   {/* Comments List */}
                <div className='mt-4'>
                    {postdata.postcomments.length > 0 ? (
                        postdata.postcomments.map((comment, index) => (
                            <div 
                                key={index} 
                                className="border-b shadow-md px-3 rounded-md py-4 last:border-b-0"
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-slate-800" />
                                    <span className="font-semibold text-slate-900">
                                        {comment.username}
                                    </span>
                                </div>
                                <p className="text-slate-700 italic mb-1">
                                    {comment.content || 'No comment text'}
                                </p>
                                <div className="flex items-center space-x-2 text-slate-500 text-sm">
                                    <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                                    <span>
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
                    )}
                </div>
        </div>
    </div>
</div>

    );
}

export default PostDetails;