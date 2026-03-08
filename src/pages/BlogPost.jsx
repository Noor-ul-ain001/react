import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, ArrowLeft, Tag, ChevronRight, Twitter, Facebook, Bookmark } from 'lucide-react';
import { blogPosts } from '../data/products';

const categoryColors = {
  'Craft Stories': 'bg-amber-50 text-amber-700',
  'Sustainability': 'bg-emerald-50 text-emerald-700',
  'Tutorials': 'bg-blue-50 text-blue-700',
  'Interior Design': 'bg-purple-50 text-purple-700',
  'Meet the Maker': 'bg-orange-50 text-orange-700',
  'Culture': 'bg-rose-50 text-rose-700',
};

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 bg-stone-50">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 max-w-sm w-full">
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-2">Post not found</h2>
          <p className="text-stone-400 text-sm mb-6">This article doesn't exist or has been removed.</p>
          <Link to="/blog" className="text-amber-700 font-bold hover:underline text-sm">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 lg:h-[480px] overflow-hidden bg-stone-100">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
        {/* Breadcrumb overlay */}
        <div className="absolute top-0 left-0 right-0 px-4 py-5">
          <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-white/70 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors font-medium">Home</Link>
              <ChevronRight size={12} />
              <Link to="/blog" className="hover:text-white transition-colors font-medium">Blog</Link>
              <ChevronRight size={12} />
              <span className="text-white/90 font-medium line-clamp-1">{post.category}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors text-sm font-semibold mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-stone-100 text-stone-600'}`}>
            <Tag size={10} /> {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
            <User size={12} className="text-stone-300" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-stone-400">
            <Clock size={12} className="text-stone-300" /> {post.readTime}
          </span>
          <span className="text-xs text-stone-400">{post.date}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">{post.title}</h1>

        <p className="text-stone-600 text-lg leading-relaxed mb-10 border-l-4 border-amber-400 pl-5 bg-amber-50/50 py-3 pr-4 rounded-r-xl italic">
          {post.excerpt}
        </p>

        {/* Article body */}
        <div className="text-stone-700 text-base leading-loose space-y-6">
          <p>
            Handmade objects carry with them the unmistakable trace of human touch. Unlike their mass-produced counterparts, artisan goods bear the marks of intention — slight imperfections that speak to the hours, skill, and care that went into their creation.
          </p>
          <p>
            When we hold a handmade mug, we sense the weight of the clay shaped by a potter's hands. When we unfold a woven textile, we follow the path of threads guided by a weaver's fingers. This tangible connection between maker and object is what makes handcrafted goods so profoundly meaningful.
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 pt-4">The Value of Slow Making</h2>
          <p>
            In an era of instant gratification, slow-made objects invite us to pause. They ask us to appreciate process over speed, depth over quantity. A skilled artisan might spend weeks perfecting a single piece that a machine could produce in seconds — but the result is incomparably richer.
          </p>
          <p>
            This is why we believe in curating only genuinely handmade goods. We visit maker studios, observe production processes, and build long-term relationships with the artisans behind every product in our collection.
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 pt-4">Supporting Artisan Livelihoods</h2>
          <p>
            When you choose a handmade product over its mass-produced equivalent, you cast a vote for a more equitable, sustainable economy. Artisans receive fair wages, maintain creative control, and preserve cultural traditions that might otherwise be lost.
          </p>

          {/* Pull quote */}
          <blockquote className="my-10 border-l-4 border-amber-500 pl-6 py-4 bg-amber-50 rounded-r-2xl">
            <p className="font-serif text-xl font-bold text-stone-800 italic leading-snug mb-3">
              "Making things by hand is a radical act in the modern world. It says: I value time. I value skill. I value the story behind what I own."
            </p>
            <cite className="text-stone-500 text-sm not-italic font-medium block">— Sarah Mitchell, Founder of Artistic</cite>
          </blockquote>

          <p>
            At Artistic, we're committed to transparency: we disclose the maker behind every product, share their stories, and ensure that a meaningful portion of every sale reaches them directly.
          </p>
          <p>
            We invite you to explore our collection with fresh eyes. Look beyond price tags and delivery times, and ask yourself: what does this object mean? Who made it, and why? We think you'll find that handmade goods offer something no algorithm can replicate.
          </p>
        </div>

        {/* Tags */}
        <div className="mt-10 pt-8 border-t border-stone-100 flex flex-wrap gap-2">
          {['handmade', 'artisan', 'craft', 'sustainability'].map(tag => (
            <span key={tag} className="bg-stone-100 text-stone-500 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-default">
              #{tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 mt-6">
          <span className="text-sm text-stone-500 font-semibold">Share:</span>
          {[
            { Icon: Twitter, label: 'Twitter' },
            { Icon: Facebook, label: 'Facebook' },
            { Icon: Bookmark, label: 'Save' },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 border border-stone-200 text-stone-500 text-xs font-semibold px-3 py-1.5 rounded-full hover:border-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-all"
            >
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>

        {/* Author card */}
        <div className="mt-10 bg-stone-50 rounded-2xl border border-stone-100 p-6 flex items-start gap-4">
          <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <User size={24} className="text-amber-700" />
          </div>
          <div>
            <p className="font-bold text-stone-900 mb-0.5">{post.author}</p>
            <p className="text-xs text-amber-600 font-semibold mb-2">{post.category} Writer</p>
            <p className="text-stone-500 text-sm leading-relaxed">
              A passionate advocate for handmade culture, {post.author.split(' ')[0]} writes about the intersection of craft, sustainability, and everyday beauty.
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-stone-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-stone-900">Related Articles</h2>
              <Link to="/blog" className="flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors group">
                All Articles <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.id}`} className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-video overflow-hidden bg-stone-50">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="p-5">
                    <span className={`inline-flex text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${categoryColors[p.category] || 'bg-stone-100 text-stone-600'}`}>
                      {p.category}
                    </span>
                    <h3 className="font-medium text-stone-800 text-sm line-clamp-2 group-hover:text-amber-700 transition-colors leading-snug mb-2">{p.title}</h3>
                    <p className="text-xs text-stone-400 flex items-center gap-1"><Clock size={11} /> {p.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
