import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone, Search, ChevronDown, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import siteConfig from '@/data/siteConfig.json';
import { getCart, getCartCount } from '@/utils/cart';
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      setCartCount(getCartCount(cart));
    };
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('luxhydro_wishlist') || '[]');
      setWishlistCount(wishlist.length);
    };
    
    updateCartCount();
    updateWishlistCount();
    
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('wishlistUpdated', updateWishlistCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, [location]);
  // Handle dropdown with delay
  const handleDropdownEnter = (itemName) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  const navigation = [{
    name: 'Products',
    dropdown: [{
      name: 'Hot Tubs',
      path: '/hot-tubs'
    }, {
      name: 'Swim Spas',
      path: '/swim-spas'
    }, {
      name: 'Saunas',
      path: '/saunas'
    }]
  }, {
    name: 'Installation',
    path: '/installation'
  }, {
    name: 'Projects',
    path: '/projects'
  }, {
    name: 'Showroom',
    path: '/showroom'
  }, {
    name: 'Chemicals',
    path: '/chemicals'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B0B0C]/95 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C9A968] to-[#E6D9C8] rounded-lg flex items-center justify-center">
              <span className="text-[#0B0B0C] font-bold text-xl">AL</span>
            </div>
            <div>
              <div className="font-serif text-xl font-semibold text-[#E6D9C8]">{siteConfig.brandName}</div>
              <div className="text-xs text-[#C9CBD1]">{siteConfig.tagline}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map(item => <div 
              key={item.name} 
              className="relative" 
              onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)} 
              onMouseLeave={() => item.dropdown && handleDropdownLeave()}
            >
                {item.dropdown ? <button className="flex items-center space-x-1 text-[#F5F5F2] hover:text-[#E6D9C8] transition-colors">
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button> : <Link to={item.path} className="text-[#F5F5F2] hover:text-[#E6D9C8] transition-colors">
                    {item.name}
                  </Link>}
                
                {item.dropdown && activeDropdown === item.name && <div 
                  className="absolute top-full left-0 pt-2 w-48"
                  onMouseEnter={() => handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="glass-card rounded-xl overflow-hidden shadow-2xl">
                    {item.dropdown.map(subItem => <Link key={subItem.name} to={subItem.path} className="block px-4 py-3 text-[#F5F5F2] hover:bg-[#E6D9C8]/10 transition-colors">
                        {subItem.name}
                      </Link>)}
                  </div>
                </div>}
              </div>)}
          </nav>

          <div className="flex items-center space-x-4">
            <a href={`tel:${siteConfig.phone}`} className="hidden md:flex items-center space-x-2 text-[#E6D9C8] hover:text-[#C9A968] transition-colors">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">Call Us</span>
            </a>

            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="text-[#F5F5F2] hover:text-[#E6D9C8] transition-colors"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>

            <Link to="/wishlist" className="relative hidden sm:block">
              <Heart className="w-6 h-6 text-[#F5F5F2] hover:text-[#E6D9C8] transition-colors" />
              {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-[#C9A968] text-[#0B0B0C] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-[#F5F5F2] hover:text-[#E6D9C8] transition-colors" />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#C9A968] text-[#0B0B0C] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>}
            </Link>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-[#F5F5F2]">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B0B0C]/95 backdrop-blur-xl z-50 flex items-start justify-center pt-32 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden bg-[#141416] border-t border-[#E6D9C8]/10">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navigation.map(item => <div key={item.name}>
                  {item.dropdown ? <div className="space-y-2">
                      <div className="text-[#E6D9C8] font-semibold">{item.name}</div>
                      {item.dropdown.map(subItem => <Link key={subItem.name} to={subItem.path} onClick={() => setIsMobileMenuOpen(false)} className="block pl-4 py-2 text-[#F5F5F2] hover:text-[#E6D9C8]">
                          {subItem.name}
                        </Link>)}
                    </div> : <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#F5F5F2] hover:text-[#E6D9C8]">
                      {item.name}
                    </Link>}
                </div>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
};
export default Header;