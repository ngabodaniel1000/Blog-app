import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

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
    // Add form submission logic here
    console.log('Form submitted:', formData);
    // You would typically send this data to a backend endpoint
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="mt-[-70px] md:ml-6 mx-auto p-4 bg-opacity-10 bg-gray-500 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8  mt-10 text-center text-white">Contact Us</h1>
        
        <div className="max-w-2xl mx-auto bg-gray-800 bg-opacity-10 border-x-2 border-y-2 border-gray-600 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-2xl mx-auto mt-8 bg-gray-500 bg-opacity-15 rounded-lg shadow-xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-3 text-gray-300">
            <p><FontAwesomeIcon icon={faLocation}/> Rwanda , Kigali, St 12345</p>
            <p>📞 +250 734196604</p>
            <p>✉️ ngabodaniel1000@gmail.com</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="https://www.linkedin.com/in/ngabo-daniel-011118283/" className="text-blue-400 hover:text-blue-300">LinkedIn</a>
              <a href="https://github.com/ngabodaniel1000" className="text-blue-400 hover:text-blue-300">GitHub</a>
              <a href="https://www.instagram.com/odegaard_daniel/" className="text-blue-400 hover:text-blue-300">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact