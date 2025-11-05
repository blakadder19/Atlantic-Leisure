import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import apiService from '@/services/api';

const NewsletterSignup = ({ compact = false }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.subscribeNewsletter(email);
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest news and exclusive offers.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9CBD1]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full pl-10 pr-4 py-3 bg-[#141416] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] placeholder:text-[#C9CBD1] focus:outline-none focus:border-[#C9A968] transition-colors"
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="btn-primary px-6"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#C9A968] to-[#E6D9C8] rounded-full flex items-center justify-center">
          <Mail className="w-6 h-6 text-[#0B0B0C]" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#E6D9C8]">
            Stay Updated
          </h3>
          <p className="text-[#C9CBD1] text-sm">
            Get exclusive offers and wellness tips
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9CBD1]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full pl-12 pr-4 py-4 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] placeholder:text-[#C9CBD1] focus:outline-none focus:border-[#C9A968] focus:ring-2 focus:ring-[#C9A968]/20 transition-all"
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full btn-primary"
        >
          {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-[#C9CBD1] text-xs text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;

