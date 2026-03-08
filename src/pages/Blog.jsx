import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight, Search, Tag, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/products';

const allCategories = ['All', ...new Set(blogPosts.map(p => p.category))];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = blogPosts[0];

  const categoryColors = {
    'Craft Stories': 'bg-amber-50 text-amber-700',
    'Sustainability': 'bg-emerald-50 text-emerald-700',
    'Tutorials': 'bg-blue-50 text-blue-700',
    'Interior Design': 'bg-purple-50 text-purple-700',
    'Meet the Maker': 'bg-orange-50 text-orange-700',
    'Culture': 'bg-rose-50 text-rose-700',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 lg:py-20 px-4 text-center">
        <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
          <span className="w-8 h-px bg-amber-400" /> Our Blog <span className="w-8 h-px bg-amber-400" />
        </p>
        <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4">Craft &amp; Culture</h1>
        <p className="text-stone-400 max-w-lg mx-auto leading-relaxed">
          Stories, tutorials, and inspiration from the world of handmade artisanship.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Featured post */}
        <Link
          to={`/blog/${featured.id}`}
          className="group block mb-16 rounded-3xl overflow-hidden border border-stone-100 hover:shadow-2xl hover:shadow-stone-200/60 transition-all duration-500"
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-video md:aspect-auto overflow-hidden bg-stone-100">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-stone-50 group-hover:bg-amber-50/50 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[featured.category] || 'bg-stone-100 text-stone-600'}`}>
                  {featured.category}
                </span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl xl:text-4xl font-bold text-stone-900 mb-4 leading-tight group-hover:text-amber-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-stone-500 leading-relaxed mb-6 text-sm lg:text-base line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4 text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 font-medium"><User size={13} /> {featured.author}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-bold text-amber-700 group-hover:gap-2.5 transition-all">
                  Read Article <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Search + Category filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-stone-300" />
            </div>
            <p className="font-serif text-xl font-semibold text-stone-800 mb-2">No articles found</p>
            <p className="text-stone-400 text-sm mb-5">Try a different search or category.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="text-amber-700 text-sm font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.slice(1).map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden bg-stone-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-5 lg:p-6">
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${categoryColors[post.category] || 'bg-stone-100 text-stone-600'}`}>
                    <Tag size={10} /> {post.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2.5 leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-stone-400 text-sm line-clamp-2 mb-5 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-3 text-xs text-stone-400">
                      <span className="flex items-center gap-1.5 font-medium"><User size={11} /> {post.author}</span>
                      <span className="flex items-center gap-1.5"><Clock size={11} /> {post.readTime}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-700 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      Read <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-10 lg:p-14 text-center text-white">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">Never Miss a Story</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3">Join Our Community</h2>
          <p className="text-stone-400 mb-8 max-w-md mx-auto">Get the latest craft stories, tutorials, and artisan spotlights delivered to your inbox.</p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-stone-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white/15 transition-all"
            />
            <button
              type="submit"
              className="bg-amber-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-500 transition-all whitespace-nowrap hover:shadow-lg hover:-translate-y-0.5"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
