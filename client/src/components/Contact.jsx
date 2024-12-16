import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="mt-[-70px] md:ml-6 mx-auto p-4 bg-[#F5F5F5] min-h-screen text-gray-700">
      <div className="container mx-auto px-4 py-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8 mt-10 text-center text-slate-900">Contact Us</h1>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto bg-white bg-opacity-90 border rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-[#FFB6C1] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-[#FFB6C1] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-[#FFB6C1] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-[#FFB6C1] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="max-w-2xl mx-auto mt-8 bg-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Contact Information</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <FontAwesomeIcon icon={faLocation} className="text-pink-400" /> Rwanda, Kigali, St 12345
            </p>
            <p>📞 +250 734196604</p>
            <p>✉️ ngabodaniel1000@gmail.com</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="https://www.linkedin.com/in/ngabo-daniel-011118283/" className="text-pink-400 hover:text-pink-600">
                LinkedIn
              </a>
              <a href="https://github.com/ngabodaniel1000" className="text-pink-400 hover:text-pink-600">
                GitHub
              </a>
              <a href="https://www.instagram.com/odegaard_daniel/" className="text-pink-400 hover:text-pink-600">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
 