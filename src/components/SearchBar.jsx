import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import chemicalsData from '@/data/chemicals.json';
import siteConfig from '@/data/siteConfig.json';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchQuery = query.toLowerCase().trim();
    
    // Search in products
    const productResults = chemicalsData.filter(product => 
      product.title.toLowerCase().includes(searchQuery) ||
      product.shortDesc.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery) ||
      product.brand.toLowerCase().includes(searchQuery)
    ).slice(0, 6);

    setResults(productResults);
    setIsOpen(true);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setQuery('');
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9CBD1]" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products..."
          className="w-full pl-12 pr-12 py-4 bg-[#141416] border border-[#E6D9C8]/20 rounded-xl text-[#F5F5F2] placeholder:text-[#C9CBD1] focus:outline-none focus:border-[#C9A968] focus:ring-2 focus:ring-[#C9A968]/20 transition-all"
          aria-label="Search products"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden shadow-2xl z-50"
          >
            <div className="p-2 max-h-96 overflow-y-auto">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/chemicals/${product.slug}`}
                  onClick={handleClose}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#E6D9C8]/5 transition-colors group"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#0B0B0C] flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1595872018818-97555653a011"
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#E6D9C8] font-semibold mb-1 truncate group-hover:text-[#C9A968] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[#C9CBD1] text-sm truncate">
                      {product.category} • {product.brand}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[#E6D9C8] font-bold">
                      {siteConfig.currencySymbol}{product.price.toFixed(2)}
                    </p>
                    {product.stock > 0 ? (
                      <span className="text-green-500 text-xs">In Stock</span>
                    ) : (
                      <span className="text-red-500 text-xs">Out of Stock</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            
            {query.length >= 2 && (
              <div className="border-t border-[#E6D9C8]/10 p-3 bg-[#0B0B0C]/50">
                <Link
                  to={`/chemicals?search=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="text-[#C9A968] hover:text-[#E6D9C8] text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  View all results for "{query}"
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && query.trim().length >= 2 && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden shadow-2xl z-50 p-8 text-center"
        >
          <Search className="w-12 h-12 text-[#C9CBD1] mx-auto mb-3 opacity-50" />
          <p className="text-[#E6D9C8] font-semibold mb-1">No products found</p>
          <p className="text-[#C9CBD1] text-sm">
            Try adjusting your search terms
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;

