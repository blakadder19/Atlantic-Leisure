
import React from 'react';
import { Helmet } from 'react-helmet';
import siteConfig from '@/data/siteConfig.json';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | {siteConfig.brandName}</title>
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg prose-headings:font-serif prose-headings:text-[#E6D9C8] prose-a:text-[#C9A968]">
            <h1 className="font-serif text-5xl font-bold text-[#E6D9C8] mb-8">Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>1. Introduction</h2>
            <p>Welcome to {siteConfig.brandName}. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul>
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>

            <h2>3. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            </ul>

            <h2>4. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h2>5. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at: {siteConfig.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
