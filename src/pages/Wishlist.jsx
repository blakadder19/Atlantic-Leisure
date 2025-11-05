import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import chemicalsData from '@/data/chemicals.json';
import siteConfig from '@/data/siteConfig.json';
import { addToCart } from '@/utils/cart';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    loadWishlist();
    
    const handleStorageChange = () => {
      loadWishlist();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  const loadWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('luxhydro_wishlist') || '[]');
    const items = chemicalsData.filter(product => savedWishlist.includes(product.id));
    setWishlistItems(items);
  };

  const removeFromWishlist = (productId) => {
    const savedWishlist = JSON.parse(localStorage.getItem('luxhydro_wishlist') || '[]');
    const newWishlist = savedWishlist.filter(id => id !== productId);
    localStorage.setItem('luxhydro_wishlist', JSON.stringify(newWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist."
    });
  };

  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently unavailable.",
        variant: "destructive"
      });
      return;
    }

    addToCart(product, 1);
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart!",
      description: `${product.title} added to your cart.`,
    });
  };

  const breadcrumbs = [
    { name: 'Wishlist', path: '/wishlist' }
  ];

  return (
    <>
      <SEO
        title="My Wishlist"
        description="Your saved products - Find all your favorite spa and hot tub products in one place."
        url="/wishlist"
      />

      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-2">
                My Wishlist
              </h1>
              <p className="text-[#C9CBD1]">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <Heart className="w-12 h-12 text-[#C9A968] fill-current" />
          </div>

          {wishlistItems.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <Heart className="w-16 h-16 text-[#C9CBD1] mx-auto mb-4 opacity-50" />
              <h2 className="font-serif text-2xl font-semibold text-[#E6D9C8] mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-[#C9CBD1] mb-6 max-w-md mx-auto">
                Save your favorite products to your wishlist and shop them later!
              </p>
              <Link to="/chemicals">
                <Button className="btn-primary">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl overflow-hidden group"
                >
                  <Link to={`/chemicals/${product.slug}`} className="block">
                    <div className="aspect-square overflow-hidden bg-[#141416] relative">
                      <img
                        src="https://images.unsplash.com/photo-1595872018818-97555653a011"
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.badges && product.badges.length > 0 && (
                        <span className="absolute top-3 left-3 text-xs bg-[#C9A968] text-[#0B0B0C] px-2 py-1 rounded font-semibold">
                          {product.badges[0]}
                        </span>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-semibold px-4 py-2 bg-red-600 rounded">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link to={`/chemicals/${product.slug}`}>
                      <h3 className="font-serif text-xl font-semibold text-[#E6D9C8] mb-2 hover:text-[#C9A968] transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-[#C9CBD1] text-sm mb-4 line-clamp-2">
                      {product.shortDesc}
                    </p>
                    
                    <div className="flex items-baseline gap-2 mb-4">
                      {product.compareAt && (
                        <span className="text-[#C9CBD1] text-sm line-through">
                          {siteConfig.currencySymbol}{product.compareAt.toFixed(2)}
                        </span>
                      )}
                      <span className="text-[#E6D9C8] text-2xl font-bold">
                        {siteConfig.currencySymbol}{product.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 btn-primary"
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                      <Button
                        onClick={() => removeFromWishlist(product.id)}
                        variant="outline"
                        className="btn-secondary"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;

