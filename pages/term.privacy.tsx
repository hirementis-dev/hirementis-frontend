"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyTermsPages = () => {
  const [activePage, setActivePage] = useState('privacy');

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check URL hash to determine which page to show
    const hash = window.location.hash;
    if (hash === '#terms') {
      setActivePage('terms');
    } else if (hash === '#privacy') {
      setActivePage('privacy');
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash === '#terms') {
        setActivePage('terms');
      } else if (newHash === '#privacy') {
        setActivePage('privacy');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const PrivacyPolicy = () => (
    <Card className="bg-white shadow-md border border-gray-200">
      <CardContent className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create an account and complete your profile</li>
                  <li>Participate in AI interview sessions</li>
                  <li>Upload resumes, cover letters, or other documents</li>
                  <li>Contact us for support or feedback</li>
                  <li>Subscribe to our newsletter or promotional communications</li>
                </ul>
                <p>This information may include your name, email address, phone number, employment history, educational background, and interview recordings.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our AI interview platform</li>
                  <li>Generate personalized interview questions and feedback</li>
                  <li>Analyze your interview performance and provide insights</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Develop new features and enhance user experience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-gray-700">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With your consent:</strong> We may share information when you explicitly agree</li>
                  <li><strong>Service providers:</strong> We work with trusted third-party companies to help operate our platform</li>
                  <li><strong>Legal requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                  <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger or acquisition</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Data Security</h2>
              <div className="space-y-4 text-gray-700">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Your Rights and Choices</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from promotional communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Contact Us</h2>
              <div className="text-gray-700">
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Email:</strong> privacy@aiinterviewplatform.com</p>
                  <p><strong>Address:</strong> 123 Tech Street, Innovation City, IC 12345</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TermsOfService = () => (
    <Card className="bg-white shadow-md border border-gray-200">
      <CardContent className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>By accessing and using our AI Interview Platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <p>These Terms of Service ("Terms") govern your use of our platform, including all content, services, and products available at or through the service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Description of Service</h2>
              <div className="space-y-4 text-gray-700">
                <p>Our AI Interview Platform provides:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered mock interview sessions</li>
                  <li>Personalized feedback and performance analytics</li>
                  <li>Industry-specific interview preparation</li>
                  <li>Resume and profile management tools</li>
                  <li>Interview scheduling and recording capabilities</li>
                </ul>
                <p>We reserve the right to modify, suspend, or discontinue the service at any time with or without notice.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">3. User Accounts and Responsibilities</h2>
              <div className="space-y-4 text-gray-700">
                <p>To access certain features of our service, you must create an account. You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Use the service only for lawful purposes and in accordance with these Terms</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Acceptable Use Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>You agree not to use the service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Upload or transmit viruses, malware, or other harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Share false, misleading, or deceptive information</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Intellectual Property Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                <p>You retain ownership of content you submit to the service, but grant us a license to use, modify, and display such content as necessary to provide the service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Payment and Subscription Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you choose a paid subscription plan:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is due in advance on a monthly or annual basis</li>
                  <li>Subscriptions automatically renew unless cancelled</li>
                  <li>Refunds are provided according to our refund policy</li>
                  <li>We may change subscription fees with 30 days' notice</li>
                  <li>Accounts may be suspended for non-payment</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">7. Disclaimer of Warranties</h2>
              <div className="space-y-4 text-gray-700">
                <p>The service is provided "as is" and "as available" without any representations or warranties. We disclaim all warranties, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">8. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">9. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <p>You may terminate your account at any time by contacting us or using the account deletion feature in your profile settings.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">10. Contact Information</h2>
              <div className="text-gray-700">
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Email:</strong> legal@aiinterviewplatform.com</p>
                  <p><strong>Address:</strong> 123 Tech Street, Innovation City, IC 12345</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md mx-auto">
            <a
              href="#privacy"
              onClick={() => setActivePage('privacy')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-center ${
                activePage === 'privacy'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={() => setActivePage('terms')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-center ${
                activePage === 'terms'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Page Content */}
        {activePage === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
      </div>
    </div>
  );
};

export default PrivacyTermsPages;