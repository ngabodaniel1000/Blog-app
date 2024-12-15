import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

function Exploreuser() {
    const { search } = useParams();
    const [users,Setusers] = useState([])
    useEffect(()=>{
        const fetchusers = async () => {
            const response = await axios.get(`http://localhost:4999/getusers?key=${search}`);
            if (response.data.users.length === 0) {
                Setusers([]);
            }
            else{
                Setusers(response.data.users);
            }
            
        }
        fetchusers();
    },[])
    console.log(users);
    
  return (
    <div className='mt-[70px] md:ml-[400px]'>
        <ToastContainer />
        <h1 className='text-2xl mb-10'>Explore post for {users.length==1 ? "this user" : "these users" }</h1> 
        {users.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No users found.
            </p>
          ) : (
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user._id}>
                  <a
                    href={`/profile/${user._id}`}
                    className="text-blue-500 hover:underline text-lg"
                  >
                    {user.username}
                  </a>
                </li>
              ))}
            </ul>
          )}
            </div>
  )
}

export default Exploreuser