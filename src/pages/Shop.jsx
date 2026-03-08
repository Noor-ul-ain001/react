import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, X, ChevronDown, Search, ChevronRight } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">{children}</p>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [inStockOnly, setInStockOnly] = useState(false);
  const searchQuery = searchParams.get('search') || '';

  const allCategories = ['All', ...categories.map(c => c.name)];

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (inStockOnly) result = result.filter(p => p.inStock);
    switch (sort) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'newest': return result.sort((a, b) => b.id - a.id);
      default: return result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [searchQuery, selectedCategory, priceRange, sort, inStockOnly]);

  const handleCategory = (cat) => {
    const val = cat === 'All' ? '' : cat;
    setSelectedCategory(val);
    const params = new URLSearchParams(searchParams);
    if (!val) params.delete('category');
    else params.set('category', val);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 200]);
    setSort('featured');
    setInStockOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || searchQuery || priceRange[0] > 0 || priceRange[1] < 200 || inStockOnly;

  const Sidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <SectionLabel>Categories</SectionLabel>
        <div className="space-y-0.5">
          {allCategories.map(cat => {
            const isActive = (cat === 'All' && !selectedCategory) || cat === selectedCategory;
            const count = cat === 'All'
              ? products.length
              : products.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => { handleCategory(cat); setFiltersOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 ${isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-stone-100" />

      {/* Price */}
      <div>
        <SectionLabel>Price Range</SectionLabel>
        <div className="px-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-stone-700">${priceRange[0]}</span>
            <span className="text-xs text-stone-400">to</span>
            <span className="text-sm font-semibold text-stone-700">${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-stone-400 mt-1">
            <span>$0</span>
            <span>$200</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-stone-100" />

      {/* Availability */}
      <div>
        <SectionLabel>Availability</SectionLabel>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${inStockOnly ? 'bg-amber-600' : 'bg-stone-200'}`}
            onClick={() => setInStockOnly(v => !v)}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${inStockOnly ? 'translate-x-5' : 'translate-x-1'}`} />
          </div>
          <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors select-none">In Stock Only</span>
        </label>
      </div>

      <div className="h-px bg-stone-100" />

      {/* Rating filter */}
      <div>
        <SectionLabel>Minimum Rating</SectionLabel>
        <div className="space-y-1.5">
          {[5, 4, 3].map(r => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" name="rating" className="accent-amber-600 w-3.5 h-3.5" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < r ? 'text-amber-400' : 'text-stone-200'}`}>★</span>
                ))}
              </div>
              <span className="text-xs text-stone-500 group-hover:text-stone-700">&amp; up</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <div className="h-px bg-stone-100" />
          <button
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 border-2 border-stone-200 text-stone-600 py-2.5 rounded-xl text-sm font-semibold hover:border-stone-400 hover:text-stone-800 transition-all"
          >
            <X size={14} /> Clear All Filters
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-stone-400 mb-4">
            <Link to="/" className="hover:text-amber-700 transition-colors font-medium">Home</Link>
            <ChevronRight size={12} />
            <span className="text-stone-600 font-medium">Shop</span>
            {selectedCategory && (
              <>
                <ChevronRight size={12} />
                <span className="text-stone-600 font-medium">{selectedCategory}</span>
              </>
            )}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                {searchQuery ? (
                  <><span className="text-amber-700">"{searchQuery}"</span></>
                ) : selectedCategory || 'All Products'}
              </h1>
              <p className="text-stone-400 text-sm mt-2 font-medium">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''} available
              </p>
            </div>
            {/* Quick category pills (desktop only) */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {['Ceramic & Pottery', 'Wooden Crafts', 'Macrame'].map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-stone-100 p-5 shadow-sm">
              <Sidebar />
            </div>
          </aside>

          {/* Mobile filter drawer */}
          {filtersOpen && (
            <>
              <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setFiltersOpen(false)} />
              <aside className="fixed inset-y-0 left-0 z-50 w-80 max-w-full bg-white overflow-y-auto lg:hidden shadow-2xl">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-xl font-bold text-stone-900">Filter Products</h2>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <Sidebar />
                </div>
              </aside>
            </>
          )}

          {/* Product area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              {/* Mobile filter btn */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-stone-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:border-stone-400 transition-colors shadow-sm"
              >
                <SlidersHorizontal size={16} />
                Filters
                {hasActiveFilters && (
                  <span className="bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {[selectedCategory, searchQuery, inStockOnly].filter(Boolean).length}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 ml-auto">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="appearance-none bg-white border border-stone-200 rounded-xl pl-4 pr-9 py-2.5 text-sm font-medium text-stone-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 shadow-sm cursor-pointer"
                  >
                    {sortOptions.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                </div>

                {/* View toggle */}
                <div className="flex bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:bg-stone-50'}`}
                    aria-label="Grid view"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2.5 transition-colors ${view === 'list' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:bg-stone-50'}`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCategory && (
                  <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {selectedCategory}
                    <button onClick={() => handleCategory('All')} className="hover:text-amber-600">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchParams({})} className="hover:text-amber-600">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    In Stock Only
                    <button onClick={() => setInStockOnly(false)} className="hover:text-emerald-600">
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                  <Search size={32} className="text-stone-300" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-800 mb-2">No products found</h3>
                <p className="text-stone-400 text-sm mb-8 max-w-sm">
                  Try adjusting your filters or browse all categories.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-stone-900 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-amber-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  Clear All Filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(p => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group flex gap-5 bg-white border border-stone-100 rounded-2xl p-4 hover:shadow-md hover:border-stone-200 transition-all duration-300"
                  >
                    <div className="w-28 h-28 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-1">{p.category}</p>
                      <h3 className="font-semibold text-stone-900 mb-1.5 group-hover:text-amber-700 transition-colors">{p.name}</h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">{p.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-stone-900 text-lg">${p.price.toFixed(2)}</span>
                        {p.originalPrice && (
                          <span className="text-stone-400 line-through text-sm">${p.originalPrice.toFixed(2)}</span>
                        )}
                        {p.discount > 0 && (
                          <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">-{p.discount}%</span>
                        )}
                        {!p.inStock && (
                          <span className="bg-stone-100 text-stone-500 text-xs font-medium px-2 py-0.5 rounded-full">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center self-center">
                      <ChevronRight size={20} className="text-stone-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
