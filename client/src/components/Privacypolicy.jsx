import React from "react";
import { FaUser, FaShieldAlt, FaCookieBite } from "react-icons/fa";

function Privacypolicy() {
  return (
    <div className="h-screen">
      {/* Main Content Area */}
      <div className="mt-8 md:mt-12 bg-white p-6 rounded-lg shadow-lg max-w-[700px] mx-auto text-gray-700 leading-relaxed">
        {/* Header Section */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-pink-700">Privacy Policy</h1>
          <p className="text-sm text-gray-600">Your trust and our commitment to security matter to us.</p>
        </header>

        {/* Information We Collect */}
        <section className="space-y-6 bg-pink-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center gap-4">
            {/* Pinkish Icon */}
            <FaUser className="text-pink-700 text-3xl" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
              <p className="text-gray-600 leading-tight">
                We collect the personal information you provide directly, such as name, email, and preferences, to provide better services.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="space-y-6 bg-pink-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center gap-4">
            {/* Pinkish Icon */}
            <FaShieldAlt className="text-pink-700 text-3xl" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
              <p className="text-gray-600 leading-tight">
                Your data enables personalized alerts, user experience upgrades, and critical service delivery improvements.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies Information */}
        <section className="space-y-6 bg-pink-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center gap-4">
            {/* Pink Cookie Icon */}
            <FaCookieBite className="text-pink-700 text-3xl" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">3. Cookies</h2>
              <p className="text-gray-600 leading-tight">
                Cookies are used to tailor your user experience, remember preferences, and provide personalized interactions.
              </p>
            </div>
          </div>
        </section>

        {/* Call-To-Action Section */}
        <section className="mt-8 bg-pink-200 p-4 rounded-lg shadow-inner hover:bg-pink-300 transition duration-200 text-center">
          <p className="mb-4 text-gray-700 leading-tight">
            Have concerns? Reach out to our support team to learn more about data management and usage.
          </p>
          <button className="px-4 py-2 bg-pink-700 text-white rounded-md hover:bg-pink-800 transition duration-200">
            Contact Support
          </button>
        </section>

        {/* Footer Section */}
        <footer className="text-sm italic text-center mt-6 text-gray-500">
          Last Updated: {new Date().toLocaleDateString()}
        </footer>
      </div>
    </div>
  );
}

export default Privacypolicy;
