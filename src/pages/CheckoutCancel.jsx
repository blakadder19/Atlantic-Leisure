
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import siteConfig from '@/data/siteConfig.json';

const CheckoutCancel = () => {
  return (
    <>
      <Helmet>
        <title>Payment Canceled | {siteConfig.brandName}</title>
      </Helmet>

      <div className="min-h-screen pt-20 bg-[#0B0B0C] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <XCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4">
              Payment Canceled
            </h1>

            <p className="text-[#C9CBD1] text-lg mb-8">
              Your transaction was not completed. Your cart has been saved if you'd like to try again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cart">
                <Button className="btn-primary">
                  Return to Cart
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

export default CheckoutCancel;
