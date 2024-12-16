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
    <nav className="bg-[#F5F5F5] w-full h-[10vh] fixed top-0 left-0 z-30 shadow-lg">
  <div className="flex items-center justify-between px-4 md:px-8 h-full">
    {/* Left Section - Logo */}
    <div className="flex items-center">
  {/* Sidebar Toggle Placeholder (For Mobile View) */}
  <div className="w-8 md:hidden"></div>

  {/* Logo Section */}
  <div className="items-center space-x-2 bg-[#E0E0E0] py-1 px-3 rounded-md shadow-md hidden md:flex">
    {/* Logo Icon */}
    <div className="w-8 h-8 bg-[#555555] rounded-full flex items-center justify-center shadow-sm">
      <span className="text-white text-sm font-semibold">B</span>
    </div>
    
    {/* Logo Text */}
    <p className="text-[#333333] font-semibold text-lg">Blogger</p>
  </div>
</div>

    {/* Search Bar */}
    <div className="hidden md:flex items-center bg-[#E0E0E0] px-4 py-2 rounded-lg border border-[#FFABAB] w-1/3">
      <FontAwesomeIcon icon={faSearch} className="text-[#555555] mr-2" />
      <input
        type="search"
        placeholder="Search for any blog..."
        className="bg-transparent outline-none text-gray-700 w-full placeholder-[#828282]"
        onKeyDown={handlesearch}
      />
    </div>

    {/* Mobile Search Button */}
    <button
      className="md:hidden text-[#555555] p-2"
      onClick={() => setIsSearchVisible(!isSearchVisible)}
    >
      <FontAwesomeIcon icon={faSearch} />
    </button>

    {/* User Controls */}
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <>
          {/* Create Blog Button */}
          <button
            className="hidden md:block text-[#FFABAB] border border-[#FFABAB] py-1 px-4 rounded-md hover:bg-[#FF6F61] hover:text-white transition duration-200"
            onClick={() => navigate('/createblog')}
          >
            Create Blog
          </button>

          {/* Username Display */}
          <p className="text-[#555555] truncate max-w-[100px] md:max-w-none 
              bg-clip-text text-transparent 
              bg-gradient-to-r from-pink-500 to-purple-500 
              shadow-md px-2 py-1 rounded-md inline-flex items-center">
  {username}
</p>


          {/* Logout Button */}
          <button
  className="bg-[#E91E63] text-white py-1 px-4 rounded-md hover:bg-[#C2185B] transition duration-200 text-sm md:text-base"
  onClick={handleLogout}
>
  Logout
</button>

        </>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="bg-[#FFABAB] text-white py-1 px-4 rounded-md hover:bg-[#FF6F61] transition duration-200 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faLongArrowRight} />
          <span>Login</span>
        </button>
      )}
    </div>
  </div>

  {/* Mobile Search Bar */}
  {isSearchVisible && (
    <div className="md:hidden px-4 pb-4">
      <div className="flex items-center bg-[#E0E0E0] px-4 py-2 rounded-lg border border-[#FFABAB] w-full">
        <FontAwesomeIcon icon={faSearch} className="text-[#555555] mr-2" />
        <input
          type="search"
          placeholder="Search for any blog..."
          className="bg-transparent outline-none text-gray-700 w-full placeholder-[#828282]"
        />
      </div>
    </div>
  )}
</nav>

  );
}

export default Navbar;