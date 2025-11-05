
import React from 'react';
import { Helmet } from 'react-helmet';
import siteConfig from '@/data/siteConfig.json';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | {siteConfig.brandName}</title>
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg prose-headings:font-serif prose-headings:text-[#E6D9C8] prose-a:text-[#C9A968]">
            <h1 className="font-serif text-5xl font-bold text-[#E6D9C8] mb-8">Terms of Service</h1>
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>1. Agreement to Terms</h2>
            <p>By using our website, you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the website.</p>

            <h2>2. Intellectual Property Rights</h2>
            <p>The Site and its original content, features, and functionality are owned by {siteConfig.brandName} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

            <h2>3. User Representations</h2>
            <p>By using the Site, you represent and warrant that:</p>
            <ul>
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
            </ul>

            <h2>4. Prohibited Activities</h2>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

            <h2>5. Governing Law</h2>
            <p>These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of the United Kingdom applicable to agreements made and to be entirely performed within the United Kingdom, without regard to its conflict of law principles.</p>

            <h2>6. Contact Us</h2>
            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: {siteConfig.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
