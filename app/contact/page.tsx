'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/config/site';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Fee Update / Calculator Suggestion',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Build mailto link as fallback/standard functional MVP contact
    const mailtoSubject = encodeURIComponent(
      `[${siteConfig.brandName}] ${formData.subject}`
    );
    const mailtoBody = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSubmitted(true);
  };

  const [copied, setCopied] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ name: 'Contact', item: '/contact' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Contact the {siteConfig.brandName} Team
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Found a recent marketplace fee change? Have a suggestion for a new
          calculator tool or feature? For all general, legal, security, and
          advertising inquiries, reach out directly.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-10 items-start">
        {/* Contact Info Card */}
        <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-neutral-950 mb-2">
              Direct Inquiries
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              You can email our team directly for feedback, corrections, legal,
              or security notices.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-neutral-500 font-medium">
                  Primary Contact Email
                </div>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-sm font-bold text-neutral-900 hover:text-emerald-700 transition-colors break-all"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full text-xs font-semibold py-1.5 px-3 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors text-center"
            >
              {copied ? '✓ Email Copied to Clipboard' : 'Copy Email Address'}
            </button>
          </div>

          <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
            <div className="font-semibold text-neutral-800">
              Inquiry Categories Handled:
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-500">
              <li>General questions & user suggestions</li>
              <li>Reporting eBay, Etsy, or Amazon fee updates</li>
              <li>Data privacy & GDPR/CCPA consumer rights</li>
              <li>Security vulnerability disclosures (VDP)</li>
              <li>Commercial & advertising partnerships</li>
            </ul>
          </div>
        </div>

        {/* Interactive Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">
                Thank You for Reaching Out!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Your email client was opened with your pre-filled inquiry. If it did
                not open automatically, send your note directly to{' '}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-bold text-neutral-900 underline hover:text-emerald-700"
                >
                  {siteConfig.contactEmail}
                </a>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base font-bold text-neutral-950 pb-2 border-b border-neutral-100">
                Send a Note
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-neutral-800 mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Alex Miller"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-neutral-800 mb-1"
                  >
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-neutral-800 mb-1"
                >
                  Topic / Subject
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Fee Update / Rate Change">
                    Report Marketplace Fee Update
                  </option>
                  <option value="Calculator Suggestion">
                    Suggest a New Calculator / Feature
                  </option>
                  <option value="Bug Report">Report a Calculation Bug</option>
                  <option value="Legal / Privacy Inquiry">
                    Legal / Privacy Inquiry (GDPR, CCPA, PIPEDA)
                  </option>
                  <option value="Security Vulnerability Disclosure">
                    Security Vulnerability Disclosure (VDP)
                  </option>
                  <option value="Commercial / Advertising">
                    Commercial & Advertising Partnership
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-neutral-800 mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="Describe your suggestion or fee schedule update..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2.5 px-4 rounded-lg shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
