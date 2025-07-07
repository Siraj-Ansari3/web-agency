import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen px-6 py-12 max-w-4xl mx-auto text-white bg-black">
      <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-6">Privacy Policy</h1>

      <p className="mb-4 text-gray-300">
        At MarsevTech, we respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data.
      </p>

      <h2 className="text-xl font-semibold text-red-400 mt-6 mb-2">1. Information We Collect</h2>
      <p className="text-gray-300 mb-4">
        When you use our website or contact us through forms, we may collect:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4">
        <li>Your name</li>
        <li>Email address</li>
        <li>Phone number (if provided)</li>
        <li>Company name (optional)</li>
        <li>Message details</li>
        <li>Browser and device data (via cookies)</li>
      </ul>

      <h2 className="text-xl font-semibold text-red-400 mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="text-gray-300 mb-4">
        We use your information to:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4">
        <li>Respond to inquiries and requests</li>
        <li>Improve our website and services</li>
        <li>Send important updates, if necessary</li>
        <li>Ensure site security and prevent spam</li>
      </ul>

      <h2 className="text-xl font-semibold text-red-400 mt-6 mb-2">3. Data Sharing</h2>
      <p className="text-gray-300 mb-4">
        We do not sell or rent your personal data. Your information is only shared with trusted tools (e.g. email services) necessary to deliver our services, and only under strict privacy agreements.

      </p>

      <h2 className="text-xl font-semibold text-red-400 mt-6 mb-2">4. Cookies & Tracking</h2>
      <p className="text-gray-300 mb-4">
        Our site may use cookies or similar tools to enhance your browsing experience. You can control cookies through your browser settings.

      </p>

      <h2 className="text-xl font-semibold text-red-400 mt-6 mb-2">5. Your Rights</h2>
      <p className="text-gray-300 mb-4">
        Under GDPR and other laws, you have the right to:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4">
        <li>Access your personal data</li>
        <li>Request correction or deletion of your data</li>
        <li>Withdraw consent at any time</li>
        <li>Request data portability (in some cases)</li>
      </ul>

      <h2 className="text-xl font-semibold text-red-400 mt-6 mb-2">6. Data Security</h2>
      <p className="text-gray-300 mb-4">
        We use industry-standard measures to keep your information safe and secure. However, no method of transmission over the internet is 100% secure.

      </p>

      <h2 className="text-xl font-semibold text-red-400 mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="text-gray-300 mb-4">
        We may update this policy from time to time. Any changes will be reflected on this page with a new "Last updated" date.

      </p>

      <h2 className="text-xl font-semibold text-red-400 mt-6 mb-2">8. Contact Us</h2>
      <p className="text-gray-300 mb-8">
        If you have any questions or concerns about your privacy, please email us at <a href="mailto:support@marsevtech.com" className="text-red-400 underline">support@marsevtech.com</a>.

      </p>

      <p className="text-xs text-gray-500">Last updated: July 2025</p>
    </section>
  );
};

export default PrivacyPolicy;
