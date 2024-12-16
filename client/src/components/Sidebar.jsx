import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faCompass, 
  faStar, 
  faInfoCircle, 
  faBook, 
  faEnvelope, 
  faShieldAlt,
  faBlog,
  faBars 
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
  {/* Mobile Menu Button */}
  <button
    onClick={toggleMobileMenu}
    className="fixed top-4 left-4 z-50 p-2 text-gray-700 md:hidden"
    aria-label="Toggle menu"
  >
    <FontAwesomeIcon icon={faBars} className="text-2xl" />
  </button>

  {/* Overlay */}
  {isOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      onClick={toggleMobileMenu}
    />
  )}

  {/* Sidebar */}
  <div
    className={`fixed text-gray-700 top-0 left-0 bg-[#F5F5F5] w-[80%] md:w-[290px] min-h-full 
    transform transition-transform duration-200 ease-in-out z-40
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:top-[100px]`}
  >
    <ul className="flex flex-col space-y-8 text-lg p-4 pt-20 md:pt-4">
      <li>
        <a href="/" className="flex items-center space-x-2 hover:text-[#555555] transition-colors duration-200">
          <FontAwesomeIcon icon={faHome} />
          <span>My Feeds</span>
        </a>
      </li>

      {localStorage.getItem("user id") && (
        <li>
          <a href="/myblog" className="flex items-center space-x-2 hover:text-[#555555] transition-colors duration-200">
            <FontAwesomeIcon icon={faBlog} />
            <span>My Blog</span>
          </a>
        </li>
      )}
      <li>
        <a href="/explore" className="flex items-center space-x-2 hover:text-[#555555] transition-colors duration-200">
          <FontAwesomeIcon icon={faCompass} />
          <span>Explore</span>
        </a>
      </li>
      <li>
        <a href="/toprated" className="flex items-center space-x-2 hover:text-[#555555] transition-colors duration-200">
          <FontAwesomeIcon icon={faStar} />
          <span>Top Rated</span>
        </a>
      </li>
      <li>
        <a href="/about" className="flex items-center space-x-2 hover:text-[#555555] transition-colors duration-200">
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>About</span>
        </a>
      </li>
      <li>
        <a href="/guides" className="flex items-center space-x-2 hover:text-[#555555] transition-colors duration-200">
          <FontAwesomeIcon icon={faBook} />
          <span>Guides</span>
        </a>
      </li>
      <li>
        <a href="/contact" className="flex items-center space-x-2 hover:text-[#555555] transition-colors duration-200">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Contact</span>
        </a>
      </li>
      <li>
        <a href="/privacypolicy" className="flex items-center space-x-2 hover:text-[#555555] transition-colors duration-200">
          <FontAwesomeIcon icon={faShieldAlt} />
          <span>Privacy Policy</span>
        </a>
      </li>
    </ul>
    <p className="mt-20 ml-5 text-sm text-gray-600">© 2024 Mernblog. <br /> All Rights Reserved.</p>
  </div>

  {/* Sidebar Right Separator */}
  <div className="hidden md:block w-[1px] bg-[#CCCCCC]"></div>

  {/* Main Content Area */}
  <div className="flex-1 bg-[#FFFFFF] p-4 md:ml-[1px] md:pt-[20px]">
    {/* Main content here */}
  </div>

    </>
  );
}

export default Sidebar;