
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import siteConfig from '@/data/siteConfig.json';
import { getCart, getCartTotal } from '@/utils/cart';
import { trackBeginCheckout } from '@/utils/analytics';
import apiService from '@/services/api';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentCart = getCart();
    if (currentCart.length === 0) {
      navigate('/cart');
      return;
    }
    setCart(currentCart);
    trackBeginCheckout(currentCart, getCartTotal(currentCart));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const customerEmail = formData.get('email');

      // Create Stripe Checkout session
      const { url } = await apiService.createCheckoutSession(cart, customerEmail);
      
      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const subtotal = getCartTotal(cart);
  const shipping = subtotal >= siteConfig.shipping.freeThreshold ? 0 : siteConfig.shipping.flatRate;
  const tax = siteConfig.tax.enabled ? (subtotal + shipping) * (siteConfig.tax.vat / 100) : 0;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Helmet>
        <title>Checkout | {siteConfig.brandName}</title>
      </Helmet>

      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-12">
              Secure Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="glass-card rounded-xl p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#E6D9C8] mb-6">
                      Billing Information
                    </h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#E6D9C8] mb-2">First Name</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#E6D9C8] mb-2">Last Name</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                          />
                        </div>
                      </div>

                        <div>
                          <label className="block text-[#E6D9C8] mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                          />
                        </div>

                      <div>
                        <label className="block text-[#E6D9C8] mb-2">Phone</label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#E6D9C8] mb-2">Address</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#E6D9C8] mb-2">City</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#E6D9C8] mb-2">Postcode</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </Button>

                  <p className="text-[#C9CBD1] text-sm text-center">
                    Secure payment powered by Stripe
                  </p>
                </form>
              </div>

              <div>
                <div className="glass-card rounded-xl p-8 sticky top-24">
                  <h2 className="font-serif text-2xl font-bold text-[#E6D9C8] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-[#C9CBD1]">
                        <span>{item.title} x {item.quantity}</span>
                        <span>{siteConfig.currencySymbol}{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E6D9C8]/20 pt-4 space-y-3">
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
                    <div className="border-t border-[#E6D9C8]/20 pt-3">
                      <div className="flex justify-between">
                        <span className="text-[#E6D9C8] font-semibold text-lg">Total</span>
                        <span className="text-[#E6D9C8] font-bold text-2xl">
                          {siteConfig.currencySymbol}{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
  