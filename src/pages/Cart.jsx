import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck, ChevronRight, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, dispatch, cartTotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = cartTotal >= 75 || cartTotal === 0 ? 0 : 9.99;
  const total = cartTotal - discount + shipping;
  const freeShippingProgress = Math.min((cartTotal / 75) * 100, 100);

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'artistic10') {
      setDiscount(cartTotal * 0.1);
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-emerald-600" strokeWidth={3} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-3">Order Placed!</h2>
          <p className="text-stone-500 mb-2">Order #ART-{Math.floor(Math.random() * 90000) + 10000}</p>
          <p className="text-stone-400 text-sm mb-8 leading-relaxed">
            Thank you for shopping with Artistic. Your handmade goods are being carefully prepared and will ship within 24 hours.
          </p>
          <div className="space-y-3">
            <Link
              to="/shop"
              className="block w-full bg-stone-900 text-white py-3.5 rounded-xl font-semibold hover:bg-amber-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Continue Shopping
            </Link>
            <Link to="/" className="block text-stone-400 text-sm hover:text-stone-600 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white rounded-3xl shadow-sm p-12 max-w-md w-full border border-stone-100">
          <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-stone-200">
            <ShoppingBag size={36} className="text-stone-300" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-800 mb-3">Your cart is empty</h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            Discover our handmade collections and find something truly unique.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-amber-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <ShoppingBag size={18} /> Start Shopping
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
            <span className="text-stone-600 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-serif text-4xl font-bold text-stone-900">Shopping Cart</h1>
              <p className="text-stone-400 text-sm mt-1.5 font-medium">
                {cart.reduce((s, i) => s + i.quantity, 0)} item{cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
              </p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors group">
              Continue Shopping <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {/* Free shipping bar */}
          {cartTotal < 75 && (
            <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2.5">
                <Truck size={16} className="text-amber-600" />
                <p className="text-sm font-semibold text-stone-700">
                  Add <span className="text-amber-700">${(75 - cartTotal).toFixed(2)}</span> more for free shipping
                </p>
              </div>
              <div className="bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
          {cartTotal >= 75 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={16} className="text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-emerald-700">You've unlocked free shipping!</p>
            </div>
          )}

          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-stone-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex gap-4">
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-0.5">{item.category}</p>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-stone-900 hover:text-amber-700 transition-colors text-sm leading-snug line-clamp-2 block"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-red-400 hover:bg-red-50 transition-all"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                        className="w-9 h-9 flex items-center justify-center hover:bg-stone-100 text-stone-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-9 text-center text-sm font-bold text-stone-900">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                        className="w-9 h-9 flex items-center justify-center hover:bg-stone-100 text-stone-500 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-stone-900 text-base">${(item.price * item.quantity).toFixed(2)}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-stone-400">${item.price.toFixed(2)} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link to="/shop" className="sm:hidden flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors mt-2">
            <ChevronRight size={16} className="rotate-180" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Promo Code */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm">
            <h3 className="font-semibold text-stone-800 text-sm flex items-center gap-2 mb-4">
              <Tag size={15} className="text-amber-600" /> Promo Code
            </h3>
            {couponApplied ? (
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={13} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-700">10% discount applied!</p>
                  <p className="text-xs text-emerald-500">Code: ARTISTIC10</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={e => { setCoupon(e.target.value); setCouponError(false); }}
                  onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                  placeholder="Try: ARTISTIC10"
                  className={`flex-1 border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-all ${
                    couponError
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'
                  }`}
                />
                <button
                  onClick={applyCoupon}
                  className="bg-stone-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-amber-700 transition-all"
                >
                  Apply
                </button>
              </div>
            )}
            {couponError && <p className="text-red-500 text-xs mt-2">Invalid code. Try ARTISTIC10</p>}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm">
            <h3 className="font-semibold text-stone-800 mb-5 text-base">Order Summary</h3>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo Discount</span>
                  <span>−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-emerald-600 font-semibold' : 'font-medium'}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="h-px bg-stone-100 my-1" />

              <div className="flex justify-between font-bold text-stone-900 text-lg pt-1">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold hover:bg-amber-500 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-stone-400 mb-2">Secure checkout · We accept</p>
              <div className="flex items-center justify-center gap-2">
                {['VISA', 'MC', 'AMEX', 'PayPal'].map(card => (
                  <div key={card} className="bg-stone-50 border border-stone-200 text-stone-500 text-xs font-mono font-bold px-2.5 py-1 rounded-lg">
                    {card}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust signals */}
          <div className="bg-stone-50 rounded-2xl border border-stone-100 p-4">
            <div className="space-y-2">
              {[
                { icon: Package, text: 'Carefully hand-packed & shipped' },
                { icon: Check, text: '30-day hassle-free returns' },
                { icon: Truck, text: 'Free shipping on orders over $75' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs text-stone-500">
                  <Icon size={13} className="text-amber-600 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
