
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import siteConfig from '@/data/siteConfig.json';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | {siteConfig.brandName}</title>
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C] flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <AlertTriangle className="w-24 h-24 text-[#C9A968] mx-auto mb-8" />
            <h1 className="font-serif text-8xl font-bold text-[#E6D9C8]">404</h1>
            <h2 className="font-serif text-4xl font-semibold text-[#F5F5F2] mt-4 mb-6">Page Not Found</h2>
            <p className="text-[#C9CBD1] text-lg mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/">
              <Button className="btn-primary">
                Return to Homepage <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
