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
    <form
      className="mt-36 max-w-md mx-auto p-8 bg-gray-900 text-white border-gray-700 border-2 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          id="email"
          type="email"
          value={email}
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
        />
      </div>
      
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Your username"
        />
      </div>
      
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          type="submit"
        >
          Sign up
        </button>
        <span className="text-sm text-gray-400">OR</span>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded"
          type="button"
          onClick={() => navigate('/login')}
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Adminsignup;
