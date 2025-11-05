
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import siteConfig from '@/data/siteConfig.json';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookie_consent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setShowBanner(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleReject = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookie_consent', JSON.stringify(essentialOnly));
    setPreferences(essentialOnly);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto">
            <div className="glass-card rounded-xl p-6 max-w-4xl mx-auto">
              {!showPreferences ? (
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[#F5F5F2] font-semibold mb-2">We value your privacy</p>
                    <p className="text-[#C9CBD1] text-sm">
                      We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                      By clicking "Accept All", you consent to our use of cookies.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleReject} variant="outline" size="sm">
                      Reject All
                    </Button>
                    <Button onClick={() => setShowPreferences(true)} variant="outline" size="sm">
                      Preferences
                    </Button>
                    <Button onClick={handleAcceptAll} size="sm">
                      Accept All
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[#F5F5F2] font-semibold">Cookie Preferences</p>
                    <button onClick={() => setShowPreferences(false)} className="text-[#C9CBD1] hover:text-[#F5F5F2]">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-[#F5F5F2] font-medium mb-1">Essential Cookies</p>
                        <p className="text-[#C9CBD1] text-sm">Required for the website to function properly.</p>
                      </div>
                      <input type="checkbox" checked disabled className="mt-1" />
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-[#F5F5F2] font-medium mb-1">Analytics Cookies</p>
                        <p className="text-[#C9CBD1] text-sm">Help us understand how visitors interact with our website.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-[#F5F5F2] font-medium mb-1">Marketing Cookies</p>
                        <p className="text-[#C9CBD1] text-sm">Used to deliver personalized advertisements.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={handleAcceptSelected} className="flex-1">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
  