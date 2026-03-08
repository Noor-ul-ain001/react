import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart, ShoppingCart, Star, Truck, Shield, RotateCcw,
  Plus, Minus, Check, ChevronRight, Share2, Package,
} from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { dispatch, isInWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-stone-50">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6">
          <Package size={40} className="text-stone-300" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-stone-800 mb-3">Product Not Found</h2>
        <p className="text-stone-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="bg-stone-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-all hover:shadow-lg hover:-translate-y-0.5">
          Back to Shop
        </Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWishlist = isInWishlist(product.id);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD_TO_CART', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const badgeStyle = {
    Sale: 'bg-gradient-to-r from-red-500 to-red-600',
    New: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-amber-600',
    Limited: 'bg-gradient-to-r from-purple-500 to-purple-600',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-xs text-stone-400 flex-wrap">
            <Link to="/" className="hover:text-amber-700 transition-colors font-medium">Home</Link>
            <ChevronRight size={12} />
            <Link to="/shop" className="hover:text-amber-700 transition-colors font-medium">Shop</Link>
            <ChevronRight size={12} />
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-amber-700 transition-colors font-medium">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-stone-600 font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">

          {/* ── Image Gallery ── */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible sm:w-20 flex-shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-16 sm:w-full aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 hover:opacity-100 ${
                      i === activeImg
                        ? 'border-amber-500 shadow-md opacity-100'
                        : 'border-transparent opacity-60 hover:border-stone-200'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 relative bg-stone-50 rounded-3xl overflow-hidden aspect-square group">
              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 ${badgeStyle[product.badge] || 'bg-stone-600'} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                  {product.badge}
                </span>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-stone-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-xl">
                    Out of Stock
                  </span>
                </div>
              )}
              {/* Share button */}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-stone-500 hover:text-stone-800 hover:bg-white transition-all hover:scale-110">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col">
            {/* Category + Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-amber-700 uppercase tracking-widest hover:text-amber-600 transition-colors"
              >
                {product.category}
              </Link>
              {product.badge && (
                <span className={`${badgeStyle[product.badge] || 'bg-stone-600'} text-white text-xs font-bold px-2.5 py-0.5 rounded-full`}>
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16}
                    className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-800">{product.rating}</span>
              <span className="text-sm text-stone-400">·</span>
              <span className="text-sm text-stone-400 hover:text-amber-700 cursor-pointer transition-colors">
                {product.reviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-5xl font-bold text-stone-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-stone-400 line-through font-light">${product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-50 text-red-600 text-sm font-bold px-3 py-1 rounded-full border border-red-100">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed mb-5 text-sm lg:text-base">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {product.tags.map(tag => (
                <span key={tag} className="bg-stone-100 text-stone-500 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-default">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stock indicator */}
            <div className={`inline-flex items-center gap-2 text-sm font-semibold mb-6 ${product.inStock ? 'text-emerald-700' : 'text-red-500'}`}>
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {product.inStock ? 'In Stock — Ready to ship within 24 hours' : 'Out of Stock — Join the waitlist'}
            </div>

            {/* Quantity + Cart + Wishlist */}
            {product.inStock && (
              <div className="flex flex-wrap items-stretch gap-3 mb-8">
                {/* Qty */}
                <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-11 h-12 flex items-center justify-center hover:bg-stone-100 text-stone-600 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-stone-900">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-11 h-12 flex items-center justify-center hover:bg-stone-100 text-stone-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                    added
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                      : 'bg-stone-900 text-white hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-200/50 hover:-translate-y-0.5'
                  }`}
                >
                  {added
                    ? <><Check size={18} /> Added to Cart!</>
                    : <><ShoppingCart size={18} /> Add to Cart</>
                  }
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: product })}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all hover:scale-105 ${
                    inWishlist
                      ? 'border-red-300 bg-red-50 text-red-500 shadow-sm'
                      : 'border-stone-200 text-stone-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'Orders over $75' },
                { icon: Shield, label: '30-Day Returns', sub: 'Hassle-free' },
                { icon: RotateCcw, label: 'Secure Pay', sub: '100% safe' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2 bg-stone-50 rounded-xl p-3 border border-stone-100">
                  <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center">
                    <Icon size={16} className="text-amber-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800 leading-tight">{label}</p>
                    <p className="text-xs text-stone-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mb-20">
          <div className="border-b border-stone-100 mb-8">
            <div className="flex gap-1">
              {['description', 'reviews', 'shipping'].map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-3.5 text-sm font-semibold capitalize rounded-t-xl transition-all ${
                    tab === t
                      ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {tab === 'description' && (
            <div className="max-w-3xl grid md:grid-cols-2 gap-8">
              <div className="text-stone-600 text-sm leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p>Each item is individually handcrafted, so slight variations in color and texture make every piece unique and special. Our products are made using ethically sourced, sustainable materials.</p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-3 text-sm">Product Highlights</h3>
                <ul className="space-y-2.5">
                  {[
                    'Handcrafted by skilled artisans',
                    'Sustainably & ethically sourced',
                    'Unique — no two pieces alike',
                    'Carefully packaged for delivery',
                    'Suitable as a luxury gift',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} className="text-amber-700" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-8 p-6 bg-amber-50 rounded-2xl mb-8 border border-amber-100">
                <div className="text-center flex-shrink-0">
                  <div className="font-serif text-6xl font-bold text-stone-900">{product.rating}</div>
                  <div className="flex justify-center gap-0.5 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16}
                        className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 font-medium">{product.reviews} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map(stars => {
                    const pct = stars === 5 ? 72 : stars === 4 ? 18 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 w-4">{stars}</span>
                        <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                        <div className="flex-1 bg-stone-200 rounded-full h-1.5">
                          <div className="h-1.5 bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-stone-400 w-8 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-stone-500 text-sm bg-stone-50 rounded-xl p-4 border border-stone-100">
                All reviews are from verified buyers. We never incentivize reviews — what you read is genuinely from our customers.
              </p>
            </div>
          )}

          {tab === 'shipping' && (
            <div className="max-w-3xl grid sm:grid-cols-2 gap-4">
              {[
                { type: 'Standard Shipping', time: '5–7 business days', cost: 'Free over $75', icon: '📦' },
                { type: 'Express Shipping', time: '2–3 business days', cost: '$12.99', icon: '🚀' },
                { type: 'Overnight Shipping', time: '1 business day', cost: '$24.99', icon: '⚡' },
                { type: 'International', time: '10–14 business days', cost: 'Calculated at checkout', icon: '🌍' },
              ].map(s => (
                <div key={s.type} className="bg-stone-50 border border-stone-100 rounded-2xl p-5 hover:border-amber-200 hover:bg-amber-50/50 transition-all">
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <p className="font-bold text-stone-900 text-sm mb-1">{s.type}</p>
                  <p className="text-stone-400 text-xs mb-2">{s.time}</p>
                  <p className="text-amber-700 text-sm font-bold">{s.cost}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                  <span className="w-8 h-px bg-amber-600" /> You May Also Like
                </p>
                <h2 className="font-serif text-3xl font-bold text-stone-900">Related Products</h2>
              </div>
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors group"
              >
                View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
