import React from "react";
import { FaUser, FaShieldAlt, FaCookieBite, FaHandsHelping, FaRocket } from "react-icons/fa";

function About() {
  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      bio: "Passionate developer with 10+ years of experience in web technologies and startup growth.",
      image: "https://via.placeholder.com/150", 
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      bio: "Expert in MERN stack development and machine learning innovations.",
      image: "https://via.placeholder.com/150", 
    },
    {
      name: "Michael Thompson",
      role: "Lead Content Strategist",
      bio: "Content guru with a knack for creating engaging and informative tech narratives.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emma Kaur",
      role: "Design & User Experience Lead",
      bio: "Design thinking expert focused on creating intuitive and beautiful digital experiences.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      {/* Main Content */}
      <div className="w-full p-6 bg-[#F5F5F5] md:p-8 mt-5 lg:max-w-screen-lg mx-auto">
        {/* Header Section */}
        <section className="text-center mb-8 ml-7 shadow-md px-4">
          <h1 className="text-4xl font-bold mb-4 text-pink-700">About Our Platform</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a community of passionate developers, writers, and tech enthusiasts dedicated to
            sharing knowledge, inspiring innovation, and connecting technology professionals worldwide.
          </p>
        </section>

        {/* Mission Section with Illustrative Icon */}
        <section className="mb-8 ml-7 shadow-md px-6 py-6 bg-pink-100 rounded-lg flex items-center gap-4">
          <FaHandsHelping className="text-6xl text-pink-700" />
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower developers and tech enthusiasts to learn, share insights, and grow together through a collaborative platform.
            </p>
          </div>
        </section>

        {/* Story Section with Icon */}
        <section className="mb-8 ml-7 shadow-md px-6 py-6 bg-blue-50 rounded-lg flex items-center gap-4">
          <FaRocket className="text-6xl text-blue-700" />
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2023, our journey started with a vision: to connect innovation enthusiasts through collaboration and shared insights.
            </p>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="px-4 mb-8">
          <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Meet Our Team</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200 max-w-sm mx-auto"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm leading-tight">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-8 ml-7 bg-pink-400 text-white rounded-lg p-6 shadow-md hover:bg-pink-600 transition duration-200 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community Today!</h2>
          <p className="mb-4 text-gray-100 leading-relaxed">
            Whether you're a coder, designer, or innovator, our space is ready for your journey.
          </p>
          <button className="bg-white text-pink-700 px-6 py-2 rounded-md shadow-lg hover:bg-gray-100 transition duration-200">
            Get Started
          </button>
        </section>
      </div>
    </div>
  );
}

export default About;
