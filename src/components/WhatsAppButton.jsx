
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import siteConfig from '@/data/siteConfig.json';
import { trackWhatsAppClick } from '@/utils/analytics';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    trackWhatsAppClick();
    const message = encodeURIComponent(siteConfig.whatsappMessage);
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/50 transition-shadow"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#141416] text-[#F5F5F2] px-4 py-2 rounded-lg text-sm shadow-xl border border-[#E6D9C8]/10"
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppButton;
  