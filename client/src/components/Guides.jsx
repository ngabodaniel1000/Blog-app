import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

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
    <div className=" mt-[10px]  md:ml-6 mx-auto p-6 bg-[#F5F5F5] min-h-screen text-gray-800">
      <div className="container md:w-[70%] w-full mx-auto px-4 py-8">
        {/* Page Header */}
        <h1 className="text-4xl font-bold mt-4 mb-8 text-center text-slate-700">User Guide & Help Center</h1>

        {/* Guide Section */}
        <section className="mb-12 bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-pink-300 text-center">Getting Started Guide</h2>
          {guideSteps.map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 mb-4 border border-pink-100"
            >
              <h3 className="text-lg font-semibold text-pink-500 mb-3">{guide.title}</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="mb-12 bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-pink-600">Frequently Asked Questions</h2>
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white bg-opacity-80 rounded-lg mb-4 shadow-md"
            >
              <div 
                onClick={() => toggleSection(index)}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-pink-100 transition duration-300"
              >
                <h3 className="text-md font-semibold text-gray-700">{faq.question}</h3>
                <span className="text-lg text-gray-500">
                  {activeSection === index ? '−' : '+'}
                </span>
              </div>
              {activeSection === index && (
                <div className="p-4 pt-2 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Additional Help Section */}
        <section className="mt-8 text-center bg-[#F5F5F5] rounded-lg p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">Need More Help?</h2>
          <p className="text-gray-700 mb-4 text-sm">
            If you can't find the answer you're looking for, don't hesitate to contact our support team.
          </p>
          <a href="/contact">
            <button
              className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-5 rounded-md transition duration-300"
            >
              Contact Support
            </button>
          </a>
        </section>
      </div>
    </div>
  );
}

export default Guide;
