import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  { q: 'How long does shipping take?', a: '5–7 business days standard, 2–3 days express.' },
  { q: 'Can I return a product?', a: '30-day hassle-free returns on most items. Just contact us.' },
  { q: 'Are the products truly handmade?', a: 'Absolutely. We visit and verify every maker\'s studio.' },
  { q: 'Do you ship internationally?', a: 'Yes, to 45+ countries. Rates calculated at checkout.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const contactCards = [
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', sub: 'Mon–Fri, 9am–6pm EST', href: 'tel:+15551234567', color: 'bg-amber-50 text-amber-700' },
    { icon: Mail, label: 'Email', value: 'hello@artistic.com', sub: 'We reply within 24 hours', href: 'mailto:hello@artistic.com', color: 'bg-blue-50 text-blue-700' },
    { icon: MapPin, label: 'Studio', value: '123 Artisan Lane', sub: 'Craft District, NY 10001', color: 'bg-emerald-50 text-emerald-700' },
    { icon: Clock, label: 'Hours', value: 'Mon – Fri', sub: '9:00 AM – 6:00 PM EST', color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-8 h-px bg-amber-400" /> Get in Touch <span className="w-8 h-px bg-amber-400" />
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-stone-400 max-w-md mx-auto leading-relaxed">
            We'd love to hear from you. Reach out with questions, feedback, or just to say hello.
          </p>
        </div>
      </div>

      {/* Contact cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-0 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map(({ icon: Icon, label, value, sub, href, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-stone-100 shadow-lg p-5 text-center hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{label}</p>
              {href ? (
                <a href={href} className="font-semibold text-stone-900 hover:text-amber-700 transition-colors text-sm block">{value}</a>
              ) : (
                <p className="font-semibold text-stone-900 text-sm">{value}</p>
              )}
              <p className="text-xs text-stone-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-5 gap-12">

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-stone-100 rounded-3xl shadow-sm p-8 lg:p-10">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">Send a Message</h2>
            <p className="text-stone-400 text-sm mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

            {sent && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-emerald-800 mb-0.5">Message sent successfully!</p>
                  <p className="text-sm text-emerald-600">We'll respond to your inquiry within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-2">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${
                      errors.name
                        ? 'border-red-300 bg-red-50/50 focus:border-red-500'
                        : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-300 bg-red-50/50 focus:border-red-500'
                        : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-2">Topic</label>
                <select
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 bg-white text-stone-700 appearance-none cursor-pointer"
                >
                  <option value="">Select a topic</option>
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Returns &amp; Exchanges</option>
                  <option>Become an Artisan Partner</option>
                  <option>Press &amp; Media</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-2">Message *</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none ${
                    errors.message
                      ? 'border-red-300 bg-red-50/50 focus:border-red-500'
                      : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-amber-700 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2.5 text-sm"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">Common Questions</h2>
            <p className="text-stone-400 text-sm mb-6">Quick answers to frequently asked questions.</p>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-stone-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-stone-800 pr-4">{faq.q}</span>
                    <ChevronRight
                      size={16}
                      className={`text-stone-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-90' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-stone-500 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Artisan partner CTA */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Are You an Artisan?</h3>
            <p className="text-stone-500 text-sm mb-4 leading-relaxed">
              Join our curated marketplace and reach thousands of customers who value handmade craftsmanship.
            </p>
            <button
              onClick={() => setForm({ ...form, subject: 'Become an Artisan Partner' })}
              className="flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-600 transition-colors group"
            >
              Apply to become a partner <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Social links */}
          <div className="bg-stone-900 rounded-2xl p-6 text-white">
            <h3 className="font-semibold mb-4 text-sm">Follow Our Journey</h3>
            <div className="space-y-2">
              {[
                { label: '@artistic.handmade', platform: 'Instagram' },
                { label: 'Artistic Store', platform: 'Facebook' },
                { label: '@artisticcraft', platform: 'Pinterest' },
              ].map(s => (
                <div key={s.platform} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-stone-300 text-xs font-medium">{s.label}</span>
                  <span className="text-xs text-amber-400 font-bold">{s.platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
