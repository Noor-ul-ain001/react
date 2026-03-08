import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, ArrowRight, Star, ShoppingCart,
  Truck, Shield, RotateCcw, Headphones, Heart, Quote, Send,
  Clock, User, Leaf, Award, Globe, Sparkles,
} from 'lucide-react';
import { products, categories, testimonials, blogPosts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

/* shared error fallback — prevents infinite retry loops */
const onImgError = (seed) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = `https://picsum.photos/seed/${seed}/600/600`;
};

/* ═══════════════════════════════════════════════
   1 · HERO
═══════════════════════════════════════════════ */
const heroSlides = [
  {
    tag: 'New Collection 2025',
    headline: ['Handcrafted', 'With Soul'],
    sub: 'Discover artisan goods made by passionate makers. Every piece carries a story worth telling.',
    cta: { label: 'Shop Collection', to: '/shop' },
    bg: 'from-amber-50 via-stone-50 to-orange-50',
  },
  {
    tag: 'Exclusive Ceramic Art',
    headline: ['Hand-Thrown', 'Pottery'],
    sub: 'From wheel to table — each ceramic piece is shaped by skilled artisan hands with decades of craft.',
    cta: { label: 'Explore Ceramics', to: '/shop?category=Ceramic+%26+Pottery' },
    bg: 'from-stone-100 via-stone-50 to-white',
  },
  {
    tag: 'Woven With Love',
    headline: ['Natural Fiber', 'Textile Arts'],
    sub: 'Handwoven baskets, macrame, and textile art for the mindful, intentional home.',
    cta: { label: 'Shop Textiles', to: '/shop?category=Woven+Textiles' },
    bg: 'from-amber-50 via-amber-50/40 to-stone-50',
  },
];

/* 4-image collage — all confirmed-working Unsplash IDs */
const heroCollage = [
  { src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop', label: 'Ceramics',  to: '/shop?category=Ceramic+%26+Pottery', seed: 'ceramics' },
  { src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', label: 'Jewelry',   to: '/shop?category=Handmade+Jewelry',   seed: 'jewelry' },
  { src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop', label: 'Macrame',   to: '/shop?category=Macrame',            seed: 'macrame' },
  { src: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop', label: 'Ceramics',  to: '/shop?category=Ceramic+%26+Pottery', seed: 'vases' },
];

const avatarIds = [
  'photo-1494790108377-be9c29b29330',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1438761681033-6461ffad8d80',
];

function HeroSlider() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[cur];

  return (
    <section className={`bg-gradient-to-br ${slide.bg} transition-all duration-700 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[92vh] py-16 lg:py-0">

          {/* ── left: text ── */}
          <div className="flex-1 max-w-xl order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 tracking-widest uppercase bg-amber-100 border border-amber-200 px-4 py-2 rounded-full mb-7">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              {slide.tag}
            </span>

            <h1 className="font-serif font-bold text-stone-900 leading-[1.06] mb-6"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
              {slide.headline[0]}<br />
              <span className="text-amber-700">{slide.headline[1]}</span>
            </h1>

            <p className="text-stone-500 leading-relaxed mb-8 text-base lg:text-lg max-w-md">{slide.sub}</p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to={slide.cta.to}
                className="inline-flex items-center gap-2.5 bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-700 transition-all duration-300 hover:shadow-xl hover:shadow-amber-200/40 hover:-translate-y-0.5 text-sm">
                {slide.cta.label} <ArrowRight size={17} />
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur border border-stone-200 text-stone-700 px-8 py-4 rounded-2xl font-bold hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 text-sm">
                Our Story
              </Link>
            </div>

            {/* stats */}
            <div className="flex items-center gap-6 border-t border-stone-200/70 pt-7 mb-8">
              {[{ v: '12K+', l: 'Customers' }, { v: '340+', l: 'Artisans' }, { v: '4.9★', l: 'Rating' }].map((s, i) => (
                <React.Fragment key={s.l}>
                  {i > 0 && <div className="w-px h-8 bg-stone-200" />}
                  <div>
                    <p className="font-serif text-2xl font-bold text-stone-900">{s.v}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{s.l}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* slide dots */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setCur(i)}
                  className={`rounded-full transition-all duration-300 ${i === cur ? 'w-10 h-2.5 bg-amber-600' : 'w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400'}`}
                  aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </div>

          {/* ── right: 2×2 product image collage ── */}
          <div className="flex-1 w-full max-w-lg order-1 lg:order-2">
            <div className="relative">
              {/* glow blobs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-stone-300/30 rounded-full blur-3xl pointer-events-none" />

              {/* 2×2 grid */}
              <div className="relative grid grid-cols-2 gap-3 rounded-[2rem] overflow-hidden">
                {heroCollage.map((item, i) => (
                  <Link key={i} to={item.to}
                    className="group relative overflow-hidden aspect-square rounded-2xl bg-stone-100 shadow-md">
                    <img src={item.src} alt={item.label}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      onError={onImgError(item.seed)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/65 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/15 transition-colors duration-300" />
                    <p className="absolute bottom-3 left-3 text-white font-bold text-sm">{item.label}</p>
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight size={13} className="text-stone-700" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* floating: customer badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white shadow-2xl shadow-stone-200/60 rounded-2xl px-4 py-3.5 border border-stone-100 z-10">
                <div className="flex -space-x-2 mb-2">
                  {avatarIds.map((id, i) => (
                    <img key={i}
                      src={`https://images.unsplash.com/${id}?w=48&h=48&fit=crop&crop=faces`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      alt=""
                      onError={onImgError(`avatar-${i}`)} />
                  ))}
                </div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-xs font-bold text-stone-800">12,000+ happy buyers</p>
              </div>

              {/* floating: badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-amber-600 text-white shadow-xl shadow-amber-400/40 rounded-2xl px-4 py-3 z-10">
                <Sparkles size={14} className="text-amber-200 mb-1" />
                <p className="text-xs font-bold leading-snug">New</p>
                <p className="text-xs font-bold leading-snug">Arrivals</p>
              </div>

              {/* nav arrows */}
              <button onClick={() => setCur(p => (p - 1 + heroSlides.length) % heroSlides.length)}
                className="absolute top-1/2 -translate-y-1/2 -left-5 w-11 h-11 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-amber-50 hover:scale-110 transition-all duration-200">
                <ChevronLeft size={20} className="text-stone-600" />
              </button>
              <button onClick={() => setCur(p => (p + 1) % heroSlides.length)}
                className="absolute top-1/2 -translate-y-1/2 -right-5 w-11 h-11 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-amber-50 hover:scale-110 transition-all duration-200">
                <ChevronRight size={20} className="text-stone-600" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   2 · MARQUEE
═══════════════════════════════════════════════ */
const marqueeItems = [
  'Free Shipping On Orders $75+', '340+ Verified Artisan Makers',
  '100% Handcrafted Goods', '12,000+ Happy Customers',
  'Eco-Friendly Materials', '30-Day Easy Returns',
  'New Arrivals Every Week', 'Ships to 45+ Countries',
];

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="bg-stone-900 py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((txt, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5">
            <span className="text-amber-500 text-sm">✦</span>
            <span className="text-xs font-semibold text-stone-300 tracking-wide">{txt}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3 · FEATURE STRIP
═══════════════════════════════════════════════ */
function FeatureStrip() {
  const features = [
    { icon: Truck,      label: 'Free Shipping',   sub: 'Orders over $75',      cls: 'text-amber-600 bg-amber-50' },
    { icon: Shield,     label: 'Secure Payment',  sub: '100% safe & encrypted', cls: 'text-emerald-600 bg-emerald-50' },
    { icon: RotateCcw,  label: 'Easy Returns',    sub: '30-day policy',         cls: 'text-blue-600 bg-blue-50' },
    { icon: Headphones, label: 'Artisan Support', sub: 'Mon–Sat, 9am–6pm',     cls: 'text-purple-600 bg-purple-50' },
  ];
  return (
    <section className="bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-100">
          {features.map(({ icon: Icon, label, sub, cls }) => (
            <div key={label} className="group flex items-center gap-3 lg:gap-4 px-4 lg:px-8 py-6 hover:bg-stone-50/70 transition-colors">
              <div className={`w-11 h-11 rounded-2xl ${cls} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                <Icon size={19} />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-800">{label}</p>
                <p className="text-xs text-stone-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   4 · SHOP BY CATEGORY — bento grid
═══════════════════════════════════════════════ */
function ShopByCategory() {
  const cats = categories.slice(0, 7);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="inline-flex items-center gap-2 text-xs text-amber-700 font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-amber-500" /> Explore
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900">Shop by Category</h2>
          <p className="text-stone-500 text-sm mt-2">Browse our curated collection of handmade goods</p>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors group flex-shrink-0">
          All Categories <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* bento */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4" style={{ gridAutoRows: '200px' }}>
        {/* hero tile — 2×2 */}
        <Link to={`/shop?category=${encodeURIComponent(cats[0].name)}`}
          className="group relative col-span-2 row-span-2 overflow-hidden rounded-3xl">
          <img src={cats[0].image} alt={cats[0].name}
            onError={onImgError(cats[0].name)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
          <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/10 transition-colors duration-400" />
          <div className="absolute top-5 left-5">
            <span className="text-[10px] font-bold text-amber-300 bg-amber-600/30 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase tracking-widest border border-amber-500/30">
              Featured
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-white font-serif text-2xl lg:text-3xl font-bold leading-tight">{cats[0].name}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <p className="text-stone-300 text-sm">{cats[0].count} products</p>
              <ArrowRight size={14} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* smaller tiles */}
        {cats.slice(1).map((cat) => (
          <Link key={cat.id} to={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="group relative overflow-hidden rounded-2xl">
            <img src={cat.image} alt={cat.name}
              onError={onImgError(cat.name)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/10 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
              <p className="text-white font-bold text-sm leading-tight">{cat.name}</p>
              <p className="text-stone-400 text-xs mt-0.5">{cat.count} items</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   5 · WHY ARTISTIC
═══════════════════════════════════════════════ */
function WhyArtistic() {
  const pillars = [
    { icon: Award, cls: 'bg-amber-100 text-amber-700',   title: 'Curated Quality',      body: 'Every product is hand-selected. We personally visit maker studios and verify every piece before it enters our collection.' },
    { icon: Leaf,  cls: 'bg-emerald-100 text-emerald-700', title: 'Sustainably Sourced', body: 'We partner with artisans who use eco-friendly materials — natural fibers, reclaimed wood, and non-toxic dyes.' },
    { icon: Globe, cls: 'bg-blue-100 text-blue-700',     title: 'Fair Trade Certified',  body: 'Our makers receive fair wages and full creative control. A meaningful share of every sale reaches the artisan directly.' },
  ];
  return (
    <section className="bg-stone-950 text-white py-16 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-amber-500" /> Our Promise <span className="w-8 h-px bg-amber-500" />
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3">Why Choose Artistic?</h2>
          <p className="text-stone-400 text-sm max-w-md mx-auto">We're more than a marketplace — we're a movement for conscious, meaningful craftsmanship.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map(({ icon: Icon, cls, title, body }) => (
            <div key={title} className="group bg-stone-900 border border-stone-800 rounded-3xl p-8 hover:border-amber-800/60 hover:bg-stone-800/70 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-2xl ${cls} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   6 · PROMO — featured product cards
═══════════════════════════════════════════════ */
function PromoBanner() {
  const { dispatch } = useCart();
  const featured = products.filter(p => p.featured).slice(0, 2);

  return (
    <section className="py-16 lg:py-24 px-4 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 text-xs text-amber-700 font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-amber-500" /> Featured <span className="w-8 h-px bg-amber-500" />
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900">Handpicked For You</h2>
          <p className="text-stone-500 text-sm mt-2">Curated pieces from our most beloved artisan makers</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((product, i) => (
            <div key={product.id}
              className={`group relative overflow-hidden rounded-3xl flex flex-col sm:flex-row transition-all duration-400 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-1.5 ${
                i === 0
                  ? 'bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200/80'
                  : 'bg-gradient-to-br from-stone-100 to-white border border-stone-200/80'
              }`}
            >
              <div className="w-full sm:w-56 flex-shrink-0 overflow-hidden">
                <img src={product.image} alt={product.name}
                  onError={onImgError(product.id)}
                  className="w-full h-56 sm:h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                  style={{ minHeight: 224 }} />
              </div>
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">{product.category}</span>
                    {product.discount > 0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{product.discount}% OFF</span>}
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl font-bold text-stone-900 mb-2 leading-snug">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'} />)}
                    <span className="text-xs text-stone-400 ml-1">({product.reviews})</span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-5 line-clamp-2">{product.description}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="font-serif text-2xl font-bold text-stone-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice && <span className="text-stone-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-amber-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                      <ShoppingCart size={15} /> Add to Cart
                    </button>
                    <Link to={`/product/${product.id}`}
                      className="px-5 py-3 rounded-xl border-2 border-stone-200 text-stone-600 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50 transition-all text-sm font-bold">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   7 · FEATURED PRODUCTS
═══════════════════════════════════════════════ */
function FeaturedProducts() {
  const [tab, setTab] = useState('all');
  const tabs = [
    { id: 'all',               label: 'All' },
    { id: 'Ceramic & Pottery', label: 'Ceramics' },
    { id: 'Wooden Crafts',     label: 'Woodwork' },
    { id: 'Woven Textiles',    label: 'Textiles' },
    { id: 'Handmade Jewelry',  label: 'Jewelry' },
  ];
  const filtered = tab === 'all' ? products : products.filter(p => p.category === tab);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="inline-flex items-center gap-2 text-xs text-amber-700 font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-amber-500" /> Handpicked
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900">Featured Products</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                tab === t.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-200/60'
                  : 'bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-700'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
        {filtered.slice(0, 10).map((product, i) => (
          <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 40}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/shop"
          className="inline-flex items-center gap-3 bg-white border-2 border-stone-200 text-stone-700 px-9 py-4 rounded-2xl font-bold hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700 transition-all duration-300 text-sm group shadow-sm">
          View All Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   8 · DEAL OF THE DAY
═══════════════════════════════════════════════ */
function DealOfTheDay() {
  const deal = products.find(p => p.discount >= 50);
  const [time, setTime] = useState({ h: 8, m: 23, s: 45 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (--s < 0) { s = 59; if (--m < 0) { m = 59; if (--h < 0) h = 23; } }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  if (!deal) return null;
  const pad = n => String(n).padStart(2, '0');

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white py-16 lg:py-24 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* image */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-600/20 rounded-3xl blur-2xl scale-110" />
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <img src={deal.image} alt={deal.name}
                  onError={onImgError(deal.id)}
                  className="w-full aspect-square object-cover" />
                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold text-sm px-3.5 py-1.5 rounded-full shadow-lg">
                  -{deal.discount}% OFF
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          <div className="flex-1 order-1 lg:order-2">
            <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-6 h-px bg-amber-500" /> Deal of the Day
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">{deal.name}</h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-md">{deal.description}</p>
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-4">Offer ends in</p>
            <div className="flex gap-3 mb-9">
              {[['HRS', time.h], ['MIN', time.m], ['SEC', time.s]].map(([label, val]) => (
                <div key={label} className="text-center">
                  <div className="bg-stone-800 border border-stone-700/60 rounded-2xl w-[72px] h-[72px] flex items-center justify-center">
                    <span className="font-serif text-3xl font-bold text-amber-400 tabular-nums">{pad(val)}</span>
                  </div>
                  <p className="text-stone-600 text-[10px] font-bold uppercase tracking-widest mt-2">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-serif text-4xl font-bold">${deal.price.toFixed(2)}</span>
              {deal.originalPrice && <span className="text-stone-500 line-through text-xl">${deal.originalPrice.toFixed(2)}</span>}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={`/product/${deal.id}`}
                className="inline-flex items-center gap-2.5 bg-amber-600 text-white px-9 py-4 rounded-2xl font-bold hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm">
                Grab the Deal <ArrowRight size={16} />
              </Link>
              <Link to="/shop"
                className="inline-flex items-center gap-2.5 border border-stone-700 text-stone-300 px-7 py-4 rounded-2xl font-bold hover:border-stone-500 hover:text-white transition-all text-sm">
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   9 · TESTIMONIALS
═══════════════════════════════════════════════ */
function Testimonials() {
  const avg = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);
  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 text-xs text-amber-700 font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-amber-500" /> Reviews <span className="w-8 h-px bg-amber-500" />
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900 mb-5">What Customers Say</h2>
          <div className="inline-flex items-center gap-3 bg-white border border-stone-200 rounded-2xl px-5 py-3 shadow-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
            </div>
            <span className="font-serif text-xl font-bold text-stone-900">{avg}</span>
            <span className="text-stone-400 text-sm font-medium">from 2,400+ reviews</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={t.id}
              className={`relative bg-white rounded-3xl p-7 border transition-all duration-300 hover:-translate-y-1.5 ${
                i === 1
                  ? 'border-amber-200 shadow-xl shadow-amber-100/60 ring-1 ring-amber-200/50 md:scale-[1.04] md:-translate-y-2'
                  : 'border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${i === 1 ? 'bg-amber-100' : 'bg-stone-100'}`}>
                <Quote size={18} className={i === 1 ? 'text-amber-600' : 'text-stone-400'} />
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={13} className={j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'} />)}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-stone-100">
                <img src={t.avatar} alt={t.name}
                  onError={onImgError(t.name)}
                  className="w-11 h-11 rounded-2xl object-cover" />
                <div>
                  <p className="text-sm font-bold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{t.location}</p>
                </div>
                {i === 1 && <span className="ml-auto text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Top Review</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   10 · FROM THE BLOG — magazine layout
═══════════════════════════════════════════════ */
const catColors = {
  'Craft Stories':   'bg-amber-50 text-amber-700',
  'Sustainability':  'bg-emerald-50 text-emerald-700',
  'Tutorials':       'bg-blue-50 text-blue-700',
  'Interior Design': 'bg-purple-50 text-purple-700',
  'Meet the Maker':  'bg-orange-50 text-orange-700',
  'Culture':         'bg-rose-50 text-rose-700',
};

function FromTheBlog() {
  const [featured, ...rest] = blogPosts.slice(0, 3);

  return (
    <section className="bg-white py-16 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs text-amber-700 font-bold uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-amber-500" /> Stories
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900">From The Blog</h2>
            <p className="text-stone-500 text-sm mt-2">Craft stories, tutorials, and maker spotlights</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors group flex-shrink-0">
            All Articles <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* magazine: large left + 2 stacked right */}
        <div className="grid lg:grid-cols-5 gap-5">
          {/* featured large */}
          <Link to={`/blog/${featured.id}`}
            className="group lg:col-span-3 bg-white rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="h-64 lg:h-80 overflow-hidden bg-stone-100">
              <img src={featured.image} alt={featured.title}
                onError={onImgError(featured.id)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
            <div className="p-6 lg:p-8">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${catColors[featured.category] || 'bg-stone-100 text-stone-600'}`}>
                {featured.category}
              </span>
              <h3 className="font-serif text-xl lg:text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug mb-3">
                {featured.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1.5"><User size={11} /> {featured.author}</span>
                <span className="flex items-center gap-1.5"><Clock size={11} /> {featured.readTime}</span>
                <span>{featured.date}</span>
              </div>
            </div>
          </Link>

          {/* 2 smaller stacked */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`}
                className="group flex gap-4 bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-lg hover:shadow-stone-200/50 hover:-translate-y-0.5 transition-all duration-300 p-4">
                <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
                  <img src={post.image} alt={post.title}
                    onError={onImgError(post.id)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${catColors[post.category] || 'bg-stone-100 text-stone-600'}`}>
                    {post.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                    <span>{post.date.split(',')[0]}</span>
                  </div>
                </div>
              </Link>
            ))}
            <Link to="/blog"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-stone-200 rounded-2xl py-5 text-sm font-bold text-stone-500 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-all group">
              View All Articles <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   11 · NEWSLETTER
═══════════════════════════════════════════════ */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSent(true); setEmail(''); }
  };
  return (
    <section className="relative overflow-hidden py-16 lg:py-20 px-4 bg-gradient-to-br from-amber-700 via-amber-600 to-orange-600">
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative">
        <p className="text-amber-200 text-xs font-bold uppercase tracking-widest mb-4">Stay in the loop</p>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">Join Our Community</h2>
        <p className="text-amber-100/80 mb-8 text-sm leading-relaxed max-w-sm mx-auto">
          Early access to new collections, maker stories, and member-only deals. No spam — ever.
        </p>
        {sent ? (
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur text-white px-8 py-4 rounded-2xl font-bold border border-white/30">
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-amber-600 text-xs font-black">✓</span>
            </span>
            You're in! Welcome to the community.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" required
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white/20 backdrop-blur text-white placeholder-amber-200/80 border border-white/30 focus:outline-none focus:border-white/60 transition-all text-sm font-medium" />
            <button type="submit"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 px-6 py-3.5 rounded-2xl font-bold hover:bg-amber-50 transition-all text-sm shadow-lg hover:-translate-y-0.5 flex-shrink-0">
              <Send size={15} /> Subscribe
            </button>
          </form>
        )}
        <p className="text-amber-200/60 text-xs mt-5">Join 8,000+ subscribers. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   12 · INSTAGRAM FEED
═══════════════════════════════════════════════ */
const gramImages = [
  { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', seed: 'gram1' },
  { src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop', seed: 'gram2' },
  { src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop', seed: 'gram3' },
  { src: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop', seed: 'gram4' },
  { src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', seed: 'gram5' },
  { src: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop', seed: 'gram6' },
];

function InstagramFeed() {
  return (
    <section className="py-14 lg:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-xs text-amber-700 font-bold uppercase tracking-widest mb-2">
              <span className="w-8 h-px bg-amber-500" /> Instagram
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900">@artistic.handmade</h2>
            <p className="text-stone-500 text-sm mt-1">Follow us for daily craft inspiration</p>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors group">
            Follow Us <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-3">
          {gramImages.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer">
              <img src={img.src} alt="" loading="lazy"
                onError={onImgError(img.seed)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/50 transition-all duration-300 flex flex-col items-center justify-center gap-1.5">
                <Heart size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 fill-white" />
                <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSlider />
      <Marquee />
      <FeatureStrip />
      <ShopByCategory />
      <WhyArtistic />
      <PromoBanner />
      <FeaturedProducts />
      <DealOfTheDay />
      <Testimonials />
      <FromTheBlog />
      <Newsletter />
      <InstagramFeed />
    </>
  );
}
