import React from 'react'

function Privacypolicy() {
  return (
    <div className="mt-[-70px] md:ml-6 mx-auto p-4 bg-opacity-10 bg-gray-500 text-white max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you create an account, 
          post content, or interact with our website. This may include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal identification information (Name, email address, phone number)</li>
          <li>Account login credentials</li>
          <li>Profile information you choose to share</li>
          <li>Content you post or upload</li>
          <li>Communication and correspondence with us</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send you technical notices, updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Communicate with you about products, services, offers, and events</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personally identifiable information 
          to outside parties. This does not include trusted third parties who assist us in 
          operating our website, conducting our business, or servicing you, so long as those 
          parties agree to keep this information confidential.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of your personal 
          information. Your personal information is contained behind secured networks and is 
          only accessible by a limited number of persons who have special access rights.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
        <p className="mb-4">
          We use cookies to help us remember and process the items in your shopping cart, 
          understand and save your preferences for future visits, and compile aggregate data 
          about site traffic and site interaction.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links</h2>
        <p className="mb-4">
          Occasionally, at our discretion, we may include or offer third-party products or 
          services on our website. These third-party sites have separate and independent 
          privacy policies. We therefore have no responsibility or liability for the content 
          and activities of these linked sites.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
        <p className="mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access your personal information</li>
          <li>Request correction of your personal information</li>
          <li>Request deletion of your personal information</li>
          <li>Object to processing of your personal information</li>
          <li>Request restriction of processing your personal information</li>
          <li>Request transfer of your personal information</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <strong>Email:</strong> privacy@yourcompany.com
          <br />
          <strong>Address:</strong> Rwanda , Kigali, St 12345
        </p>
      </section>

      <section className="mt-8">
        <p className="text-sm italic">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </section>
    </div>
  )
}

export default Privacypolicy