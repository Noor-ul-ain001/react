import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ChevronRight, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, dispatch } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-12 max-w-md w-full">
          <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-stone-200">
            <Heart size={36} className="text-stone-300" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-800 mb-3">Your wishlist is empty</h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 bg-stone-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-amber-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore Products <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-stone-400 mb-4">
            <Link to="/" className="hover:text-amber-700 transition-colors font-medium">Home</Link>
            <ChevronRight size={12} />
            <span className="text-stone-600 font-medium">Wishlist</span>
          </nav>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-serif text-4xl font-bold text-stone-900">My Wishlist</h1>
              <p className="text-stone-400 text-sm mt-1.5 font-medium">
                {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => wishlist.forEach(item => dispatch({ type: 'ADD_TO_CART', payload: item }))}
                className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-700 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <ShoppingCart size={15} /> Add All to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-100 overflow-hidden group hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-stone-50">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </Link>
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors" />
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: item })}
                  className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-red-400 hover:bg-red-500 hover:text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={13} />
                </button>
                <button
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                  className="absolute bottom-2.5 left-2.5 right-2.5 bg-stone-900/90 backdrop-blur-sm text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 translate-y-10 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-700"
                >
                  <ShoppingCart size={13} /> Add to Cart
                </button>
              </div>

              {/* Info */}
              <div className="p-3.5">
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-1">{item.category}</p>
                <Link
                  to={`/product/${item.id}`}
                  className="text-sm font-semibold text-stone-900 hover:text-amber-700 transition-colors line-clamp-2 block mb-2 leading-snug"
                >
                  {item.name}
                </Link>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10}
                      className={i < Math.floor(item.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'}
                    />
                  ))}
                  <span className="text-xs text-stone-400 ml-0.5">({item.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">${item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-stone-400 line-through">${item.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-wrap gap-3 items-center justify-between border-t border-stone-100 pt-8">
          <Link to="/shop" className="flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors group">
            <ChevronRight size={16} className="rotate-180" /> Continue Shopping
          </Link>
          <p className="text-xs text-stone-400">Items in your wishlist are not reserved. Add them to your cart to secure them.</p>
        </div>
      </div>
    </div>
  );
}
