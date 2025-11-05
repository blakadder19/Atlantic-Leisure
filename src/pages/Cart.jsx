
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import siteConfig from '@/data/siteConfig.json';
import { getCart, updateQuantity, removeFromCart, getCartTotal } from '@/utils/cart';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCart(getCart());
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
    toast({
      title: "Item removed",
      description: "Product removed from cart",
    });
  };

  const subtotal = getCartTotal(cart);
  const shipping = subtotal >= siteConfig.shipping.freeThreshold ? 0 : siteConfig.shipping.flatRate;
  const tax = siteConfig.tax.enabled ? (subtotal + shipping) * (siteConfig.tax.vat / 100) : 0;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | {siteConfig.brandName}</title>
        </Helmet>
        <div className="min-h-screen pt-20 bg-[#0B0B0C] flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-[#C9CBD1] mx-auto mb-6" />
            <h1 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-4">Your cart is empty</h1>
            <p className="text-[#C9CBD1] mb-8">Start shopping for premium spa chemicals</p>
            <Link to="/chemicals">
              <Button className="btn-primary">
                Browse Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart | {siteConfig.brandName}</title>
      </Helmet>

      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-12">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#141416] flex-shrink-0">
                      <img className="w-full h-full object-cover" alt={item.title} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <Link to={`/chemicals/${item.id}`} className="font-serif text-xl font-semibold text-[#E6D9C8] hover:text-[#C9A968] transition-colors">
                          {item.title}
                        </Link>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-[#C9CBD1] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-[#C9CBD1] text-sm mb-4">SKU: {item.sku}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[#E6D9C8]/20 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-[#F5F5F2] hover:bg-[#E6D9C8]/10 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-[#F5F5F2] font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-[#F5F5F2] hover:bg-[#E6D9C8]/10 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <span className="text-[#E6D9C8] text-2xl font-bold">
                          {siteConfig.currencySymbol}{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl p-8 sticky top-24">
                <h2 className="font-serif text-2xl font-bold text-[#E6D9C8] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#C9CBD1]">
                    <span>Subtotal</span>
                    <span>{siteConfig.currencySymbol}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#C9CBD1]">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? 'FREE' : `${siteConfig.currencySymbol}${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {siteConfig.tax.enabled && (
                    <div className="flex justify-between text-[#C9CBD1]">
                      <span>VAT ({siteConfig.tax.vat}%)</span>
                      <span>{siteConfig.currencySymbol}{tax.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-[#E6D9C8]/20 pt-4">
                    <div className="flex justify-between">
                      <span className="text-[#E6D9C8] font-semibold text-lg">Total</span>
                      <span className="text-[#E6D9C8] font-bold text-2xl">
                        {siteConfig.currencySymbol}{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {subtotal < siteConfig.shipping.freeThreshold && (
                  <p className="text-[#C9A968] text-sm mb-6">
                    Add {siteConfig.currencySymbol}{(siteConfig.shipping.freeThreshold - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}

                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Link to="/chemicals">
                  <Button variant="outline" className="w-full btn-secondary">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
  