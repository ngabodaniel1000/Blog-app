import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Explorepost() {
    const {search} = useParams()
    const [post,Setpost] = useState([])
        useEffect(() => {
            const fetchsearchedpost = async()=>{
                try {
                    const response = await Axios.get(`http://localhost:4999/getallposts?limit=12&key=${search}`, { withCredentials: true });
                    Setpost(response.data.posts)
                } catch (error) {
                    console.log(error);
                    
                }
            }
            fetchsearchedpost()
        },[search])
        console.log(post)


  return (
    <div className='mt-[70px] md:ml-6'>
         <div className="space-y-10">
                      {post.map((post) => (
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
                              <FontAwesomeIcon icon={faThumbsUp} className="text-red-400 cursor-pointer text-xl" />
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
          
    </div>
  )
}

export default Explorepost