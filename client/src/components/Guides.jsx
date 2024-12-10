import React, { useState } from 'react'

function Guide() {
  const [activeSection, setActiveSection] = useState(null);

  const faqData = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button on the top right corner of the homepage. Fill in your email, choose a password, and complete the registration process. You'll receive a confirmation email to verify your account."
    },
    {
      question: "How can I reset my password?",
      answer: "If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and you'll receive instructions to reset your password."
    },
    {
      question: "What type of content can I post?",
      answer: "You can post blog articles, personal experiences, and insights related to technology, programming, and web development. Make sure to follow our community guidelines and avoid inappropriate or offensive content."
    },
    {
      question: "How do I edit or delete my posts?",
      answer: "After logging in, navigate to your profile or dashboard. Find the post you want to modify, and click on the edit or delete icon next to the post. Confirm your action, and the changes will be applied."
    },
    {
      question: "Is my personal information secure?",
      answer: "We take data privacy seriously. All personal information is encrypted, and we follow strict security protocols. Check our Privacy Policy for more detailed information about how we protect your data."
    }
  ];

  const guideSteps = [
    {
      title: "Getting Started",
      steps: [
        "Visit our homepage",
        "Click 'Sign Up' to create an account",
        "Verify your email address",
        "Complete your profile"
      ]
    },
    {
      title: "Creating a Blog Post",
      steps: [
        "Click 'New Post' in the navigation menu",
        "Choose a category for your post",
        "Write your content",
        "Add relevant tags",
        "Preview and publish"
      ]
    },
    {
      title: "Interacting with Other Users",
      steps: [
        "Browse posts on the homepage",
        "Like or comment on posts",
        "Follow other creators",
        "Join community discussions"
      ]
    }
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="mt-[-70px] md:ml-6 mx-auto p-4 bg-gray-900 bg-opacity-10 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mt-10 mb-8 text-center">User Guide & Help Center</h1>

        {/* User Guide Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Getting Started Guide</h2>
          {guideSteps.map((guide, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-20 rounded-lg p-6 mb-4">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">{guide.title}</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-800 bg-gray-800 bg-opacity-20 rounded-lg mb-4 overflow-hidden"
            >
              <div 
                onClick={() => toggleSection(index)}
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-700 transition"
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <span className="text-2xl">
                  {activeSection === index ? '−' : '+'}
                </span>
              </div>
              {activeSection === index && (
                <div className="p-6 pt-0 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Additional Help */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Need More Help?</h2>
          <div className="bg-gray-800 bg-opacity-30 rounded-lg p-8">
            <p className="mb-4 text-gray-300">
              If you can't find the answer you're looking for, don't hesitate to contact our support team.
            </p>
            <a href="/contact"><button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Contact Support
            </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Guide