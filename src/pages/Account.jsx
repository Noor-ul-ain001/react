import React, { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, ShoppingBag, ChevronRight, Bell, Lock, Edit2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const notifPrefs = [
  { key: 'orders', label: 'Order updates', desc: 'Shipping, delivery, and status changes' },
  { key: 'arrivals', label: 'New arrivals', desc: 'Be first to know about new products' },
  { key: 'sales', label: 'Sale alerts', desc: 'Exclusive deals and promotions' },
  { key: 'newsletter', label: 'Newsletter', desc: 'Craft stories and maker spotlights' },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const { wishlist } = useCart();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-stone-400 mb-4">
            <Link to="/" className="hover:text-amber-700 transition-colors font-medium">Home</Link>
            <ChevronRight size={12} />
            <span className="text-stone-600 font-medium">My Account</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-stone-900">My Account</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          {/* Avatar card */}
          <div className="bg-white rounded-2xl border border-stone-100 p-6 text-center shadow-sm">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto">
                <User size={32} className="text-amber-700" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-stone-900 rounded-full flex items-center justify-center shadow-md hover:bg-amber-700 transition-colors">
                <Edit2 size={11} className="text-white" />
              </button>
            </div>
            <h2 className="font-bold text-stone-900 text-sm">Guest User</h2>
            <p className="text-stone-400 text-xs mt-0.5">guest@artistic.com</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="bg-stone-50 rounded-xl p-2">
                <p className="font-bold text-stone-900 text-lg">0</p>
                <p className="text-xs text-stone-400">Orders</p>
              </div>
              <div className="bg-stone-50 rounded-xl p-2">
                <p className="font-bold text-stone-900 text-lg">{wishlist.length}</p>
                <p className="text-xs text-stone-400">Saved</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold transition-all text-left border-l-3 ${
                  activeTab === id
                    ? 'bg-amber-50 text-amber-700 border-amber-600'
                    : 'text-stone-600 border-transparent hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
                {id === 'wishlist' && wishlist.length > 0 && (
                  <span className="ml-auto bg-amber-100 text-amber-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
                <ChevronRight size={14} className={`ml-auto transition-transform ${activeTab === id ? 'translate-x-0.5 text-amber-600' : 'text-stone-300'}`} />
              </button>
            ))}
            <div className="border-t border-stone-100">
              <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">

          {/* ── Profile ── */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Personal Information</h2>
                  <p className="text-stone-400 text-sm mt-1">Update your profile details</p>
                </div>
                {saved && (
                  <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1.5 rounded-full">
                    <Check size={14} /> Saved!
                  </span>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                {[
                  { label: 'First Name', placeholder: 'John', type: 'text' },
                  { label: 'Last Name', placeholder: 'Doe', type: 'text' },
                  { label: 'Email Address', placeholder: 'john@example.com', type: 'email' },
                  { label: 'Phone Number', placeholder: '+1 (555) 000-0000', type: 'tel' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                ))}
              </div>

              {/* Address section */}
              <div className="border-t border-stone-100 pt-6 mb-6">
                <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-amber-600 rounded-full" /> Shipping Address
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Street Address', placeholder: '123 Main St', full: true },
                    { label: 'City', placeholder: 'New York' },
                    { label: 'State', placeholder: 'NY' },
                    { label: 'ZIP Code', placeholder: '10001' },
                  ].map(f => (
                    <div key={f.label} className={f.full ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">{f.label}</label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="bg-stone-900 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-amber-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* ── Orders ── */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">Order History</h2>
              <p className="text-stone-400 text-sm mb-8">Track and manage your orders</p>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-5 border-2 border-dashed border-stone-200">
                  <ShoppingBag size={28} className="text-stone-300" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-stone-800 mb-2">No orders yet</h3>
                <p className="text-stone-400 text-sm mb-6 max-w-sm">Your order history will appear here once you make your first purchase.</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <ShoppingBag size={15} /> Start Shopping
                </Link>
              </div>
            </div>
          )}

          {/* ── Wishlist ── */}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">Saved Items</h2>
              <p className="text-stone-400 text-sm mb-6">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist</p>
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={40} className="text-stone-200 mx-auto mb-4" />
                  <p className="text-stone-500 text-sm mb-4">No saved items yet. Browse the shop and click the heart icon to save products.</p>
                  <Link to="/shop" className="text-amber-700 text-sm font-bold hover:underline">Explore products</Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {wishlist.map(item => (
                    <Link key={item.id} to={`/product/${item.id}`} className="group block">
                      <div className="aspect-square rounded-xl overflow-hidden bg-stone-50 mb-2 border border-stone-100 group-hover:shadow-md transition-shadow">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <p className="text-xs font-semibold text-stone-700 line-clamp-1 group-hover:text-amber-700 transition-colors">{item.name}</p>
                      <p className="text-xs text-stone-400 font-medium mt-0.5">${item.price.toFixed(2)}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Settings ── */}
          {activeTab === 'settings' && (
            <div className="space-y-5">
              {/* Notifications */}
              <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-stone-900 mb-1 flex items-center gap-2">
                  <Bell size={18} className="text-amber-600" /> Notifications
                </h2>
                <p className="text-stone-400 text-sm mb-6">Choose which updates you'd like to receive</p>
                <div className="space-y-4">
                  {notifPrefs.map(pref => (
                    <label key={pref.key} className="flex items-center justify-between gap-4 cursor-pointer group">
                      <div>
                        <p className="text-sm font-semibold text-stone-800 group-hover:text-stone-900">{pref.label}</p>
                        <p className="text-xs text-stone-400">{pref.desc}</p>
                      </div>
                      <div className="relative flex-shrink-0">
                        <input type="checkbox" defaultChecked className="sr-only peer" id={pref.key} />
                        <label htmlFor={pref.key}
                          className="block w-11 h-6 bg-stone-200 peer-checked:bg-amber-600 rounded-full cursor-pointer transition-colors after:content-[''] after:block after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow after:absolute after:top-1 after:left-1 after:peer-checked:translate-x-5 after:transition-transform"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-stone-900 mb-1 flex items-center gap-2">
                  <Lock size={18} className="text-amber-600" /> Change Password
                </h2>
                <p className="text-stone-400 text-sm mb-6">Keep your account secure with a strong password</p>
                <div className="space-y-4 max-w-sm">
                  {['Current password', 'New password', 'Confirm new password'].map(p => (
                    <div key={p}>
                      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">{p}</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                      />
                    </div>
                  ))}
                  <button className="bg-stone-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-700 transition-all hover:shadow-md hover:-translate-y-0.5">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Danger zone */}
              <div className="bg-white rounded-2xl border border-red-100 p-8 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-red-700 mb-1">Danger Zone</h2>
                <p className="text-stone-400 text-sm mb-5">These actions cannot be undone.</p>
                <button className="border-2 border-red-200 text-red-500 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 hover:border-red-300 transition-all">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
