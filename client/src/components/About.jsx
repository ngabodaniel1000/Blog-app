import React from 'react'

function About() {
  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      bio: "Passionate developer with 10+ years of experience in web technologies and startup growth.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      bio: "Expert in MERN stack development and machine learning innovations.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Michael Thompson",
      role: "Lead Content Strategist",
      bio: "Content guru with a knack for creating engaging and informative tech narratives.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Emma Kaur",
      role: "Design & User Experience Lead",
      bio: "Design thinking expert focused on creating intuitive and beautiful digital experiences.",
      image: "/api/placeholder/200/200"
    }
  ];

  return (
    <div className="mt-[-70px] md:ml-6 mx-auto p-4 bg-gray-900 bg-opacity-10 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 mt-10 text-blue-400">About Our Platform</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a community of passionate developers, writers, and tech enthusiasts 
            dedicated to sharing knowledge, inspiring innovation, and connecting 
            technology professionals worldwide.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-400">Our Mission</h2>
          <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-10 rounded-lg p-8">
            <p className="text-gray-300 leading-relaxed">
              Our mission is to create an inclusive platform that empowers developers, 
              designers, and tech professionals to share their insights, learn from each other, 
              and stay at the forefront of technological innovation. We believe in the power 
              of community-driven knowledge and continuous learning.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-400">Our Story</h2>
          <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-10 rounded-lg p-8 text-gray-300">
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

        <section>
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-400">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-gray-800 bg-opacity-10 rounded-lg p-6 text-center transform transition hover:scale-105"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-blue-400">{member.name}</h3>
                <p className="text-gray-400 mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-blue-400">Join Our Community</h2>
          <div className="bg-gray-800 bg-opacity-30 rounded-lg p-8">
            <p className="mb-4 text-gray-300">
              Whether you're a seasoned professional or just starting your tech journey, 
              there's a place for you in our community.
            </p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Get Started
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About