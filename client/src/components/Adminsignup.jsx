import React, { useEffect, useState } from 'react';
import "../index.css";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Adminsignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await Axios.get('http://localhost:4999/dashboard', { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.loggedIn) {
          navigate('/');
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post("http://localhost:4999/adminsignup", {
        email,
        username,
        password,
      });

      if (response.status === 201) {
        toast.success("Your account has been created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login');
      } else {
        toast.error(response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(error.response?.data || "Server error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className='h-screen'>
    <form
    className="mt-24 max-w-md mx-auto bg-white p-8 text-gray-900 border border-gray-200 rounded-lg shadow-md"
    onSubmit={handleSubmit}
  >
    <ToastContainer />
    <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-600">
      Sign Up
    </h2>
  
    <div className="mb-6">
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        id="email"
        type="email"
        value={email}
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
      />
    </div>
  
    <div className="mb-6">
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        id="username"
        type="text"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Choose a username"
      />
    </div>
  
    <div className="mb-6">
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        id="password"
        type="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Create a password"
      />
    </div>
  
    <div className="flex items-center justify-between">
      <button
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
        type="submit"
      >
        Sign Up
      </button>
      <span className="text-sm text-gray-500">OR</span>
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-6 rounded-lg shadow"
        type="button"
        onClick={() => navigate('/login')}
      >
        Sign In
      </button>
    </div>
  </form>
  </div>
  );
};

export default Adminsignup;
