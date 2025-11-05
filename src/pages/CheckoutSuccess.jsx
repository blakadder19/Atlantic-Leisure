
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import siteConfig from '@/data/siteConfig.json';
import { clearCart } from '@/utils/cart';
import { trackPurchase } from '@/utils/analytics';

const CheckoutSuccess = () => {
  useEffect(() => {
    // HORIZONS: In production, get actual order details from URL params or session
    const orderId = 'ORD-' + Date.now();
    const cart = JSON.parse(localStorage.getItem('luxhydro_cart') || '[]');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    trackPurchase(orderId, cart, total);
    clearCart();
    window.dispatchEvent(new Event('cartUpdated'));
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Confirmed | {siteConfig.brandName}</title>
      </Helmet>

      <div className="min-h-screen pt-20 bg-[#0B0B0C] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4">
              Order Confirmed!
            </h1>

            <p className="text-[#C9CBD1] text-lg mb-8">
              Thank you for your purchase. We've sent a confirmation email with your order details.
            </p>

            <div className="glass-card rounded-xl p-8 mb-8">
              <p className="text-[#F5F5F2] mb-4">
                Your order is being processed and will be shipped within 1-2 business days.
              </p>
              <p className="text-[#C9CBD1] text-sm">
                You'll receive a tracking number once your order ships.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chemicals">
                <Button className="btn-primary">
                  Continue Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="btn-secondary">
                  Contact Support
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccess;
  