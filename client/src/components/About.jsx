import React from 'react';

// Dummy team member data
function About() {
  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      bio: "Passionate developer with 10+ years of experience in web technologies and startup growth.",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      bio: "Expert in MERN stack development and machine learning innovations.",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Michael Thompson",
      role: "Lead Content Strategist",
      bio: "Content guru with a knack for creating engaging and informative tech narratives.",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Emma Kaur",
      role: "Design & User Experience Lead",
      bio: "Design thinking expert focused on creating intuitive and beautiful digital experiences.",
      image: "/api/placeholder/200/200",
    },
  ];

  return (
    <div>
      {/* Main Content */}
      <div className="w-full p-4 bg-[#F5F5F5] md:p-8 lg:max-w-screen-lg mx-auto">
        {/* Header Section */}
        <section className="text-center mb-12 shadow-md ml-7">
          <h1 className="text-4xl font-bold mb-4 text-pink-400">About Our Platform</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a community of passionate developers, writers, and tech enthusiasts 
            dedicated to sharing knowledge, inspiring innovation, and connecting 
            technology professionals worldwide.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-12 shadow-md px-4 ml-7">
          <h2 className="text-3xl font-semibold text-center mb-8 text-pink-400">Our Mission</h2>
          <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg p-6 shadow-sm leading-relaxed">
            <p className="text-gray-700">
              Our mission is to create an inclusive platform that empowers developers, 
              designers, and tech professionals to share their insights, learn from each other, 
              and stay at the forefront of technological innovation. We believe in the power 
              of community-driven knowledge and continuous learning.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-12 shadow-md px-4 ml-7">
          <h2 className="text-3xl font-semibold text-center mb-8 text-pink-400">Our Story</h2>
          <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg p-6 shadow-sm text-gray-700 leading-relaxed">
            <p className="mb-4">
              Founded in 2023, our platform emerged from a simple yet powerful idea: 
              to create a space where technology professionals could connect, share, 
              and grow together. What started as a small blog has evolved into a 
              comprehensive community platform.
            </p>
            <p>
              We recognized the challenges of staying updated in the rapidly changing 
              tech landscape and decided to build a solution that makes learning 
              collaborative, accessible, and engaging.
            </p>
          </div>
        </section>

        {/* Team Members Section */}
        <section className='px-4 ml-7'>
          <h2 className="text-3xl font-semibold text-center mb-8 text-pink-400">Meet Our Team</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-gray-50 shadow-md rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200 max-w-sm mx-auto"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="text-lg font-bold text-pink-400">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-pink-400">Join Our Community</h2>
          <div className="bg-pink-400 text-white rounded-lg p-6 shadow-md inline-block max-w-sm mx-auto">
            <p className="mb-4 leading-relaxed">
              Whether you're a seasoned professional or just starting your tech journey, 
              there's a place for you in our community.
            </p>
            <button className="bg-pink-600 text-white py-2 px-4 rounded-md transition duration-200">
              Get Started
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
