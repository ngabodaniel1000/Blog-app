import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faUser, faClock } from '@fortawesome/free-solid-svg-icons';

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
           

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#191919]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl bg-[#191919] min-h-screen">
            <ToastContainer />

            {/* Post Details Section */}
            <div className="bg-[#252525] shadow-lg rounded-lg overflow-hidden mb-8">
                {/* Post Image */}
                {postdata.imageUrl && (
                    <img 
                        src={postdata.imageUrl} 
                        alt="Post" 
                        className="w-full h-96 object-cover"
                    />
                )}

                {/* Post Content */}
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4">
                        {postdata.posttitle == "Untitled" ? "" : ""}
                    </h2>
                    
                    <p className="text-gray-300 text-lg mb-6">
                        {postdata.postcontent}
                    </p>

                    {/* Engagement Metrics */}
                    <div className="flex items-center space-x-4 text-gray-400">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-red-500" />
                            <span>{postdata.postlikes} Likes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faComment} className="w-5 h-5 text-blue-500" />
                            <span>{postdata.postcomments.length} Comments</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-[#252525] shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-100 mb-4">Comments</h3>

                {/* Comment Input */}
                <div className="mb-6">
                    <textarea 
                        className="w-full p-3 bg-[#191919] border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write a comment..."
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        rows={4}
                    ></textarea>
                    <button 
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                        onClick={handleComment}
                    >
                        Add Comment
                    </button>
                </div>

                {/* Comments List */}
                <div>
                    {postdata.postcomments.length > 0 ? (
                        postdata.postcomments.map((comment, index) => (
                            <div 
                                key={index} 
                                className="border-b border-gray-700 py-4 last:border-b-0"
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-400" />
                                    <span className="font-semibold text-gray-200">
                                        {comment.username}
                                    </span>
                                </div>
                                <p className="text-gray-300 mb-1">
                                    {comment.content || 'No comment text'}
                                </p>
                                <div className="flex items-center space-x-2 text-gray-500 text-sm">
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
    );
}

export default PostDetails;