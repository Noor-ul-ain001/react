import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Globe, Heart, Check } from 'lucide-react';

const team = [
  { name: 'Sarah Mitchell', role: 'Founder & Creative Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face', bio: 'With 15 years in craft retail, Sarah brings an unparalleled eye for artisan quality.' },
  { name: 'James Chen', role: 'Head of Artisan Relations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', bio: 'James has visited over 200 artisan studios across 30 countries to build our network.' },
  { name: 'Elena Vasquez', role: 'Product Curator', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', bio: 'Elena\'s background in textile design shapes our category-leading woven goods selection.' },
  { name: 'David Okafor', role: 'Lead Craftsman', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', bio: 'David brings 20 years of woodworking mastery and quality-tests every wooden product.' },
];

const stats = [
  { icon: Users, value: '12,000+', label: 'Happy Customers', color: 'bg-amber-50 text-amber-700' },
  { icon: Award, value: '200+', label: 'Artisan Partners', color: 'bg-emerald-50 text-emerald-700' },
  { icon: Globe, value: '45+', label: 'Countries Served', color: 'bg-blue-50 text-blue-700' },
  { icon: Heart, value: '5,000+', label: 'Handmade Products', color: 'bg-red-50 text-red-500' },
];

const values = [
  { emoji: '🌿', title: 'Sustainability', desc: 'We prioritize eco-friendly materials and sustainable production methods across all our artisan partners.' },
  { emoji: '🤝', title: 'Fair Trade', desc: 'Every maker in our network receives fair compensation for their craft, supporting livelihoods worldwide.' },
  { emoji: '✋', title: 'Authenticity', desc: 'Every product is genuinely handmade. We verify each maker\'s process to ensure true craftsmanship.' },
  { emoji: '🎨', title: 'Creativity', desc: 'We celebrate individuality and artistic expression, curating pieces that push creative boundaries.' },
  { emoji: '❤️', title: 'Community', desc: 'We\'re building a global community of makers, collectors, and lovers of handmade things.' },
  { emoji: '⭐', title: 'Quality', desc: 'We hold every product to the highest standards, so you receive something truly exceptional.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-stone-900 text-white overflow-hidden min-h-[480px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&h=700&fit=crop"
            alt="Artisan workshop"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-amber-400" /> Our Story
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Celebrating the Art<br />of the Handmade
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed max-w-xl">
              Artistic was born from a belief that things made by hand carry a soul that mass-produced objects simply cannot match.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="group text-center p-6 rounded-2xl hover:bg-stone-50 transition-all">
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <p className="font-serif text-4xl font-bold text-stone-900 mb-1">{value}</p>
                <p className="text-stone-500 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 lg:py-28 px-4 bg-amber-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-amber-600" /> Our Mission
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              Connecting Makers<br />with the World
            </h2>
            <p className="text-stone-600 leading-relaxed mb-5">
              We partner with skilled artisans from around the globe, ensuring fair wages and sustainable practices. Every purchase you make directly supports independent craftspeople and their communities.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              Our curation process is rigorous — each maker must demonstrate not only exceptional skill, but a commitment to quality, sustainability, and authentic handcraft traditions.
            </p>
            <ul className="space-y-3 mb-8">
              {['Vetted artisan partnerships worldwide', 'Fair trade certified supply chain', 'Sustainable & eco-conscious materials', 'Community-driven product curation'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-stone-700">
                  <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-amber-700" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 bg-stone-900 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-amber-700 transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              Shop Our Collection <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=500&fit=crop"
                className="rounded-2xl w-full aspect-square object-cover shadow-lg"
                alt="Ceramic art"
              />
              <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm">
                <p className="font-serif text-3xl font-bold text-stone-900">200+</p>
                <p className="text-stone-500 text-sm">Artisan partners across 30 countries</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-amber-600 rounded-2xl p-5 text-white">
                <p className="font-serif text-3xl font-bold">100%</p>
                <p className="text-amber-100 text-sm">Genuinely handmade, always</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c5?w=500&h=500&fit=crop"
                className="rounded-2xl w-full aspect-square object-cover shadow-lg"
                alt="Woodcraft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-amber-600" /> What We Believe <span className="w-8 h-px bg-amber-600" />
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="group bg-stone-50 hover:bg-white border border-transparent hover:border-stone-100 hover:shadow-lg rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{v.emoji}</div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{v.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-stone-900 py-20 lg:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-amber-400" /> The People <span className="w-8 h-px bg-amber-400" />
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white">Meet Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="group text-center">
                <div className="relative inline-block mb-5">
                  <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-stone-700 group-hover:border-amber-500 transition-all duration-300 shadow-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wide mb-3">{member.role}</p>
                <p className="text-stone-400 text-xs leading-relaxed max-w-[200px] mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-amber-600" /> How It Works <span className="w-8 h-px bg-amber-600" />
          </p>
          <h2 className="font-serif text-4xl font-bold text-stone-900">From Maker to You</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Artisan Discovery', desc: 'We scout makers through local craft fairs, referrals, and global artisan networks.' },
            { step: '02', title: 'Studio Visit', desc: 'Our team visits each studio to verify craftsmanship quality and ethical standards.' },
            { step: '03', title: 'Curation', desc: 'Selected pieces are photographed, described, and added to our curated catalog.' },
            { step: '04', title: 'Direct to You', desc: 'Your order is carefully hand-packed by the artisan and shipped with love.' },
          ].map(s => (
            <div key={s.step} className="relative">
              <div className="font-serif text-6xl font-bold text-stone-100 mb-4 leading-none">{s.step}</div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{s.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-700 text-white py-20 px-4 text-center">
        <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">Ready to Discover Something Beautiful?</h2>
        <p className="text-amber-100 mb-10 text-lg max-w-lg mx-auto">Browse our curated collection of unique handmade goods from artisans around the world.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 bg-stone-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-stone-800 transition-all hover:shadow-xl hover:-translate-y-0.5 text-base"
          >
            Shop the Collection <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 bg-white/10 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all text-base backdrop-blur-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
