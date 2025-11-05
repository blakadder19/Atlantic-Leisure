
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import chemicalsData from '@/data/chemicals.json';
import siteConfig from '@/data/siteConfig.json';
import { addToCart } from '@/utils/cart';
import { trackViewItemList, trackAddToCart } from '@/utils/analytics';

const Chemicals = () => {
  const [products, setProducts] = useState(chemicalsData);
  const [filters, setFilters] = useState({
    category: 'all',
    form: 'all',
    brand: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    trackViewItemList(chemicalsData, 'Chemicals Shop');
  }, []);

  useEffect(() => {
    let filtered = chemicalsData;

    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.form !== 'all') {
      filtered = filtered.filter(p => p.form === filters.form);
    }
    if (filters.brand !== 'all') {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }

    setProducts(filtered);
  }, [filters]);

  const categories = [...new Set(chemicalsData.map(p => p.category))];
  const forms = [...new Set(chemicalsData.map(p => p.form))];
  const brands = [...new Set(chemicalsData.map(p => p.brand))];

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently unavailable.",
        variant: "destructive"
      });
      return;
    }

    addToCart(product, 1);
    trackAddToCart(product, 1);
    
    toast({
      title: "Added to cart!",
      description: `${product.title} added to your cart.`,
    });

    window.dispatchEvent(new Event('cartUpdated'));
  };

  const toggleWishlist = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const savedWishlist = JSON.parse(localStorage.getItem('luxhydro_wishlist') || '[]');
    const isInWishlist = savedWishlist.includes(product.id);
    let newWishlist;
    
    if (isInWishlist) {
      newWishlist = savedWishlist.filter(id => id !== product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      newWishlist = [...savedWishlist, product.id];
      toast({ title: "Added to wishlist" });
    }
    
    localStorage.setItem('luxhydro_wishlist', JSON.stringify(newWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <>
      <Helmet>
        <title>Premium Spa Chemicals | {siteConfig.brandName}</title>
        <meta name="description" content="Shop premium spa and hot tub chemicals. High-quality sanitizers, balancers, and treatments for crystal clear water." />
      </Helmet>

      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <section className="py-16 bg-gradient-to-br from-[#C9A968]/10 to-[#E6D9C8]/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">
                Premium Spa Chemicals
              </h1>
              <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">
                Professional-grade chemicals for crystal clear, perfectly balanced water
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#C9CBD1]">
                Showing {products.length} of {chemicalsData.length} products
              </p>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="btn-secondary lg:hidden"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex gap-8">
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
                <div className="glass-card rounded-xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[#E6D9C8] font-semibold text-lg">Filters</span>
                    <button onClick={() => setShowFilters(false)} className="lg:hidden text-[#C9CBD1]">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-[#E6D9C8] font-medium mb-3 block">Category</span>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                      >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="text-[#E6D9C8] font-medium mb-3 block">Form</span>
                      <select
                        value={filters.form}
                        onChange={(e) => setFilters({ ...filters, form: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                      >
                        <option value="all">All Forms</option>
                        {forms.map(form => (
                          <option key={form} value={form}>{form}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="text-[#E6D9C8] font-medium mb-3 block">Brand</span>
                      <select
                        value={filters.brand}
                        onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                      >
                        <option value="all">All Brands</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    <Button
                      onClick={() => setFilters({ category: 'all', form: 'all', brand: 'all' })}
                      variant="outline"
                      className="w-full btn-secondary"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="glass-card rounded-xl overflow-hidden hover:border-[#C9A968]/40 transition-all h-full flex flex-col">
                        <Link to={`/chemicals/${product.slug}`} className="relative aspect-square overflow-hidden bg-[#141416]">
                          <img 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            alt={product.title} 
                            src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" 
                          />
                          
                          {/* Stock Badge */}
                          {product.stock === 0 && (
                            <div className="absolute top-3 left-3 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">
                              Out of Stock
                            </div>
                          )}
                          {product.stock > 0 && product.stock < 10 && (
                            <div className="absolute top-3 left-3 px-3 py-1 bg-[#C9A968] text-[#0B0B0C] text-xs font-bold rounded">
                              Only {product.stock} Left!
                            </div>
                          )}

                          {/* Quick Actions Overlay */}
                          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => toggleWishlist(product, e)}
                              className="w-10 h-10 bg-[#0B0B0C]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#E6D9C8] hover:bg-[#C9A968] hover:text-[#0B0B0C] transition-colors"
                              aria-label="Add to wishlist"
                            >
                              <Heart className="w-5 h-5" />
                            </button>
                            <Link
                              to={`/chemicals/${product.slug}`}
                              className="w-10 h-10 bg-[#0B0B0C]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#E6D9C8] hover:bg-[#C9A968] hover:text-[#0B0B0C] transition-colors"
                              aria-label="Quick view"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                          </div>
                        </Link>

                        <div className="p-6 flex flex-col flex-1">
                          {product.badges && product.badges.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {product.badges.map(badge => (
                                <span key={badge} className="text-xs bg-[#C9A968]/20 text-[#C9A968] px-2 py-1 rounded font-medium">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}

                          <Link to={`/chemicals/${product.slug}`}>
                            <h3 className="font-serif text-xl font-semibold text-[#E6D9C8] mb-2 group-hover:text-[#C9A968] transition-colors line-clamp-2">
                              {product.title}
                            </h3>
                          </Link>

                          <p className="text-[#C9CBD1] text-sm mb-4 line-clamp-2 flex-1">
                            {product.shortDesc}
                          </p>

                          {/* Category & Brand */}
                          <div className="text-xs text-[#C9CBD1] mb-4">
                            <span>{product.category}</span>
                            <span className="mx-2">•</span>
                            <span>{product.brand}</span>
                          </div>

                          {/* Price */}
                          <div className="mb-4">
                            {product.compareAt && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#C9CBD1] text-sm line-through">
                                  {siteConfig.currencySymbol}{product.compareAt.toFixed(2)}
                                </span>
                                <span className="text-green-500 text-xs font-semibold">
                                  Save {Math.round(((product.compareAt - product.price) / product.compareAt) * 100)}%
                                </span>
                              </div>
                            )}
                            <div className="text-[#E6D9C8] text-2xl font-bold">
                              {siteConfig.currencySymbol}{product.price.toFixed(2)}
                            </div>
                          </div>

                          {/* Add to Cart Button */}
                          <Button 
                            onClick={(e) => handleAddToCart(product, e)}
                            className="w-full btn-primary"
                            disabled={product.stock === 0}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-[#C9CBD1] text-lg">No products found matching your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Chemicals;
  