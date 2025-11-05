import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, AlertTriangle, Info, Package, Heart, Share2, ZoomIn, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import * as Tabs from '@radix-ui/react-tabs';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import chemicalsData from '@/data/chemicals.json';
import siteConfig from '@/data/siteConfig.json';
import { addToCart } from '@/utils/cart';
import { trackViewItem, trackAddToCart } from '@/utils/analytics';
import { generateProductSchema, generateBreadcrumbSchema } from '@/utils/structuredData';

const ChemicalProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    const found = chemicalsData.find(p => p.slug === slug);
    if (!found) {
      navigate('/chemicals');
      return;
    }
    setProduct(found);
    trackViewItem(found);
    
    // Check if in wishlist
    const savedWishlist = JSON.parse(localStorage.getItem('luxhydro_wishlist') || '[]');
    setWishlist(savedWishlist.includes(found.id));
  }, [slug, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Validate stock
    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently unavailable.",
        variant: "destructive"
      });
      return;
    }

    // Validate quantity against stock
    if (quantity > product.stock) {
      toast({
        title: "Insufficient stock",
        description: `Only ${product.stock} items available.`,
        variant: "destructive"
      });
      return;
    }

    addToCart(product, quantity);
    trackAddToCart(product, quantity);
    
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.title} added to your cart.`,
    });

    window.dispatchEvent(new Event('cartUpdated'));
  };

  const toggleWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('luxhydro_wishlist') || '[]');
    let newWishlist;
    
    if (wishlist) {
      newWishlist = savedWishlist.filter(id => id !== product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      newWishlist = [...savedWishlist, product.id];
      toast({ title: "Added to wishlist" });
    }
    
    localStorage.setItem('luxhydro_wishlist', JSON.stringify(newWishlist));
    setWishlist(!wishlist);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.shortDesc,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied to clipboard!" });
  };

  // Early return if product not found
  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#0B0B0C]">
        <div className="text-center">
          <p className="text-[#C9CBD1] text-lg mb-4">Loading product...</p>
        </div>
      </div>
    );
  }

  const relatedProducts = chemicalsData.filter(p => 
    product.relatedIds?.includes(p.id)
  );

  const breadcrumbs = [
    { name: 'Chemicals', path: '/chemicals' },
    { name: product.title || 'Product', path: `/chemicals/${product.slug}` }
  ];

  const structuredData = [
    generateProductSchema(product),
    generateBreadcrumbSchema(breadcrumbs)
  ];

  const isInStock = product.stock > 0;
  const isLowStock = product.stock < 10 && product.stock > 0;

  // Safely prepare SEO data
  const seoTitle = String(product.title || 'Product');
  const seoDescription = String(product.seo?.metaDescription || product.shortDesc || '');
  const seoKeywords = [
    product.category || '',
    product.brand || '',
    'spa chemicals',
    'hot tub maintenance'
  ].filter(Boolean).join(', ');

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={`/chemicals/${product.slug}`}
        type="product"
        product={{
          price: product.price,
          inStock: isInStock,
          brand: product.brand || 'Lux Hydro Living'
        }}
      />
      <StructuredData data={structuredData} />

      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#141416] group">
                  <img 
                    className="w-full h-full object-cover" 
                    alt={product.title} 
                    src="https://images.unsplash.com/photo-1595872018818-97555653a011" 
                  />
                  <button
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-4 right-4 p-3 bg-[#0B0B0C]/80 backdrop-blur-sm rounded-full text-[#E6D9C8] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#0B0B0C]"
                    aria-label="Zoom image"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  
                  {/* Stock badge */}
                  {!isInStock && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg">
                      Out of Stock
                    </div>
                  )}
                  {isLowStock && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-[#C9A968] text-[#0B0B0C] font-semibold rounded-lg">
                      Only {product.stock} Left!
                    </div>
                  )}
                </div>
                
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedImage === index ? 'border-[#C9A968] ring-2 ring-[#C9A968]/30' : 'border-[#E6D9C8]/20'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img 
                          className="w-full h-full object-cover" 
                          alt={`${product.title} view ${index + 1}`} 
                          src="https://images.unsplash.com/photo-1595872018818-97555653a011" 
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.map(badge => (
                    <span key={badge} className="text-sm bg-[#C9A968]/20 text-[#C9A968] px-3 py-1 rounded-full font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-baseline gap-3">
                  {product.compareAt && (
                    <span className="text-[#C9CBD1] text-xl line-through">
                      {siteConfig.currencySymbol}{product.compareAt.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[#E6D9C8] text-4xl font-bold">
                    {siteConfig.currencySymbol}{product.price.toFixed(2)}
                  </span>
                </div>
                {product.compareAt && (
                  <span className="text-green-500 font-semibold">
                    Save {Math.round(((product.compareAt - product.price) / product.compareAt) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-[#C9CBD1] text-lg mb-8 leading-relaxed">
                {product.longDesc}
              </p>

              {/* Product Details Grid */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#C9CBD1] block mb-1">Category</span>
                    <p className="text-[#F5F5F2] font-semibold">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-[#C9CBD1] block mb-1">Form</span>
                    <p className="text-[#F5F5F2] font-semibold">{product.form}</p>
                  </div>
                  <div>
                    <span className="text-[#C9CBD1] block mb-1">Brand</span>
                    <p className="text-[#F5F5F2] font-semibold">{product.brand}</p>
                  </div>
                  <div>
                    <span className="text-[#C9CBD1] block mb-1">SKU</span>
                    <p className="text-[#F5F5F2] font-semibold">{product.sku}</p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                {isInStock ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-500 font-semibold">In Stock ({product.stock} available)</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-red-500 font-semibold">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                <div className="flex items-center border border-[#E6D9C8]/20 rounded-lg overflow-hidden w-full sm:w-auto">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-[#F5F5F2] hover:bg-[#E6D9C8]/10 transition-colors disabled:opacity-50"
                    disabled={!isInStock}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 text-[#F5F5F2] font-semibold min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 text-[#F5F5F2] hover:bg-[#E6D9C8]/10 transition-colors disabled:opacity-50"
                    disabled={!isInStock || quantity >= product.stock}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 btn-primary"
                  disabled={!isInStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isInStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-8">
                <Button
                  variant="outline"
                  className="flex-1 btn-secondary"
                  onClick={toggleWishlist}
                >
                  <Heart className={`w-5 h-5 mr-2 ${wishlist ? 'fill-current' : ''}`} />
                  {wishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button
                  variant="outline"
                  className="btn-secondary"
                  onClick={handleShare}
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="glass-card rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#C9A968] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-[#E6D9C8] font-semibold mb-1">
                      {product.price >= siteConfig.shipping.freeThreshold ? 'FREE' : `${siteConfig.currencySymbol}${siteConfig.shipping.flatRate}`} Shipping
                    </p>
                    <p className="text-[#C9CBD1]">
                      {product.price >= siteConfig.shipping.freeThreshold 
                        ? 'Free delivery on this order' 
                        : `Free delivery on orders over ${siteConfig.currencySymbol}${siteConfig.shipping.freeThreshold}`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <Tabs.Root defaultValue="usage" className="mb-16">
            <Tabs.List className="flex gap-4 border-b border-[#E6D9C8]/20 mb-8">
              <Tabs.Trigger
                value="usage"
                className="px-6 py-3 text-[#C9CBD1] data-[state=active]:text-[#E6D9C8] data-[state=active]:border-b-2 data-[state=active]:border-[#C9A968] transition-colors font-semibold"
              >
                Usage Instructions
              </Tabs.Trigger>
              <Tabs.Trigger
                value="safety"
                className="px-6 py-3 text-[#C9CBD1] data-[state=active]:text-[#E6D9C8] data-[state=active]:border-b-2 data-[state=active]:border-[#C9A968] transition-colors font-semibold"
              >
                Safety Information
              </Tabs.Trigger>
              <Tabs.Trigger
                value="details"
                className="px-6 py-3 text-[#C9CBD1] data-[state=active]:text-[#E6D9C8] data-[state=active]:border-b-2 data-[state=active]:border-[#C9A968] transition-colors font-semibold"
              >
                Product Details
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="usage" className="glass-card rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-[#C9A968]" />
                <h2 className="text-[#E6D9C8] font-semibold text-xl">How to Use</h2>
              </div>
              <p className="text-[#C9CBD1] leading-relaxed whitespace-pre-line">{product.usage}</p>
            </Tabs.Content>

            <Tabs.Content value="safety" className="glass-card rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-[#C9A968]" />
                <h2 className="text-[#E6D9C8] font-semibold text-xl">Safety First</h2>
              </div>
              <p className="text-[#C9CBD1] leading-relaxed whitespace-pre-line">{product.safetyNotes}</p>
            </Tabs.Content>

            <Tabs.Content value="details" className="glass-card rounded-xl p-8">
              <h2 className="text-[#E6D9C8] font-semibold text-xl mb-4">Technical Specifications</h2>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[#E6D9C8]/10">
                  <dt className="text-[#C9CBD1]">Product Name</dt>
                  <dd className="text-[#F5F5F2] font-semibold">{product.title}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E6D9C8]/10">
                  <dt className="text-[#C9CBD1]">Category</dt>
                  <dd className="text-[#F5F5F2] font-semibold">{product.category}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E6D9C8]/10">
                  <dt className="text-[#C9CBD1]">Form</dt>
                  <dd className="text-[#F5F5F2] font-semibold">{product.form}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E6D9C8]/10">
                  <dt className="text-[#C9CBD1]">Brand</dt>
                  <dd className="text-[#F5F5F2] font-semibold">{product.brand}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E6D9C8]/10">
                  <dt className="text-[#C9CBD1]">SKU</dt>
                  <dd className="text-[#F5F5F2] font-semibold">{product.sku}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-[#C9CBD1]">Availability</dt>
                  <dd className={`font-semibold ${isInStock ? 'text-green-500' : 'text-red-500'}`}>
                    {isInStock ? `${product.stock} in stock` : 'Out of stock'}
                  </dd>
                </div>
              </dl>
            </Tabs.Content>
          </Tabs.Root>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((related) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/chemicals/${related.slug}`} className="group block">
                      <div className="glass-card rounded-xl overflow-hidden hover:border-[#E6D9C8]/30 transition-all">
                        <div className="aspect-square overflow-hidden bg-[#141416] relative">
                          <img 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            alt={related.title} 
                            src="https://images.unsplash.com/photo-1595872018818-97555653a011" 
                          />
                          {related.badges && related.badges.length > 0 && (
                            <span className="absolute top-3 left-3 text-xs bg-[#C9A968] text-[#0B0B0C] px-2 py-1 rounded font-semibold">
                              {related.badges[0]}
                            </span>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif text-lg font-semibold text-[#E6D9C8] mb-2 group-hover:text-[#C9A968] transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-[#C9CBD1] text-sm mb-3 line-clamp-2">
                            {related.shortDesc}
                          </p>
                          <div className="flex items-baseline gap-2">
                            {related.compareAt && (
                              <span className="text-[#C9CBD1] text-sm line-through">
                                {siteConfig.currencySymbol}{related.compareAt.toFixed(2)}
                              </span>
                            )}
                            <span className="text-[#E6D9C8] text-xl font-bold">
                              {siteConfig.currencySymbol}{related.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#C9A968] transition-colors"
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoom"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src="https://images.unsplash.com/photo-1595872018818-97555653a011" 
            alt={product.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
};

export default ChemicalProduct;
