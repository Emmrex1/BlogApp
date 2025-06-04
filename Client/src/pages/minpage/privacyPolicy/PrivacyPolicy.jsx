import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800 px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Privacy Policy
      </h1>

      <p className="mb-6">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, disclose, and safeguard your information when you visit
        our website or use our services.
      </p>

      <div className="space-y-8 text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email
            address, and contact details when you voluntarily provide it, for
            example, when you fill out a contact form or register an account.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <p>
            Your information is used to provide, maintain, and improve our
            services, communicate with you, and respond to your inquiries. We do
            not sell or rent your personal information to third parties.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience, analyze site usage, and deliver personalized content.
            You can manage cookie preferences through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your
            information. However, no online transmission or storage method is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access,
            correct, or delete your personal data. To exercise these rights,
            please contact us using the details below.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
          <p>
            We may use third-party services (such as analytics providers) that
            collect information used to identify you. These services have their
            own privacy policies, and we encourage you to review them.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update this policy from time to time. Changes will be posted
            on this page with an updated revision date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please
            contact us at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 underline"
            >
              support@example.com
            </a>
            .
          </p>
        </div>
      </div>

      <p className="mt-12 text-center text-sm text-gray-500">
        Last updated: June 2, 2025
      </p>
    </section>
  );
};

export default PrivacyPolicy;
