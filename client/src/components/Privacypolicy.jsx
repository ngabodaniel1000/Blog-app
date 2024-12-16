import React from 'react';

function Privacypolicy() {
  return (
<div className='h-screen'>
    <div className="mt-8 md:mt-12 bg-white p-6 rounded-lg shadow-md max-w-[700px] mx-auto text-gray-700 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>

      <section className="space-y-4 mb-4">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We collect information you provide directly, such as name, email, and other personal data to improve our services.
        </p>
      </section>

      <section className="space-y-4 mb-4">
        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
        <p>
          Information is used for service delivery, security alerts, product updates, and improving user experience.
        </p>
      </section>

      <section className="space-y-4 mb-4">
        <h2 className="text-2xl font-semibold">3. Cookies</h2>
        <p>
          Cookies enhance your user experience by remembering preferences and tracking site interactions.
        </p>
      </section>

      <footer className="text-sm italic text-center mt-6 text-gray-500">
        Last Updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
    </div>
  );
}

export default Privacypolicy;
