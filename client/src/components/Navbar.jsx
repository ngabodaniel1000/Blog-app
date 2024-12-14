import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faBars, faTimes, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Navbar() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();


  const handlesearch = (e)=>{
    if(e.key === 'Enter'){
      navigate(`/explore/${e.target.value}`);
    }
  }

  const handleLogout = async () => {
    try {
      await Axios.get('http://localhost:4999/logout', { withCredentials: true });
      localStorage.removeItem('user id');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await Axios.get('http://localhost:4999/dashboard', { withCredentials: true });
        if (response.data.loggedIn) {
          setUsername(response.data.user);
          localStorage.setItem('user id', response.data.userid);
          setIsLoggedIn(true);
         
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Please login:', error);
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <nav className="bg-[#191919] w-full h-[10vh] fixed top-0 left-0 z-30 shadow-lg">
      <div className="flex items-center justify-between px-4 md:px-8 h-full">
        {/* Left section with logo */}
        <div className="flex items-center">
          {/* Space for sidebar toggle (handled in Sidebar component) */}
          <div className="w-8 md:hidden"></div>
          
          <p className="text-white font-bold text-lg bg-gray-700 py-1 px-3 hidden md:block rounded-md ml-4">
            Blogger
          </p>
        </div>

        {/* Search Bar - Hidden on mobile by default */}
        <div className="hidden md:flex items-center bg-black px-4 py-2 rounded-lg border border-blue-500 w-1/3">
          <FontAwesomeIcon icon={faSearch} className="text-white mr-2" />
          <input
            type="search"
            placeholder="Search for any blog..."
            className="bg-transparent outline-none text-white w-full placeholder-gray-400"
            onKeyDown={handlesearch}
          />
        </div>

        {/* Mobile Search Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {/* User Controls */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-2 md:space-x-10 md:mr-[200px]">
            <button className="hidden md:block text-blue-500 border border-blue-500 py-1 px-4 rounded-md hover:bg-blue-500 hover:text-white" onClick={() => navigate('/createblog')}>
              Create Blog
            </button>
            <p className="text-white truncate max-w-[80px] md:max-w-none">{username}</p>
            <button
              className="text-white bg-blue-400 py-1 px-2 md:px-4 rounded-md hover:bg-blue-600 text-sm md:text-base"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="text-white py-1 px-4 rounded-md bg-blue-600 hover:bg-blue-400"><FontAwesomeIcon icon={faLongArrowRight}></FontAwesomeIcon> Login panel</button>
        )}
      </div>

      {/* Mobile Search Bar - Expandable */}
      {isSearchVisible && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex items-center bg-black px-4 py-2 rounded-lg border border-blue-500 w-full">
            <FontAwesomeIcon icon={faSearch} className="text-white mr-2" />
            <input
              type="search"
              placeholder="Search for any blog..."
              className="bg-transparent outline-none text-white w-full placeholder-gray-400"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;