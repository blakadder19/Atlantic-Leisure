
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import siteConfig from '@/data/siteConfig.json';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    // HORIZONS: Newsletter signup placeholder - integrate with email service
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and exclusive offers.",
    });
    
    e.target.reset();
  };

  return (
    <footer className="bg-[#141416] border-t border-[#E6D9C8]/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C9A968] to-[#E6D9C8] rounded-lg flex items-center justify-center">
                <span className="text-[#0B0B0C] font-bold text-xl">LH</span>
              </div>
              <div>
                <div className="font-serif text-lg font-semibold text-[#E6D9C8]">{siteConfig.brandName}</div>
                <div className="text-xs text-[#C9CBD1]">{siteConfig.tagline}</div>
              </div>
            </div>
            <p className="text-[#C9CBD1] text-sm mb-6">
              Elevating wellness through premium hydrotherapy solutions. Experience luxury, quality, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <span className="text-[#E6D9C8] font-semibold mb-4 block">Quick Links</span>
            <ul className="space-y-3">
              <li><Link to="/hot-tubs" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">Hot Tubs</Link></li>
              <li><Link to="/swim-spas" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">Swim Spas</Link></li>
              <li><Link to="/saunas" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">Saunas</Link></li>
              <li><Link to="/chemicals" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">Chemicals Shop</Link></li>
              <li><Link to="/installation" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">Installation</Link></li>
              <li><Link to="/showroom" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">Visit Showroom</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-[#E6D9C8] font-semibold mb-4 block">Contact</span>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C9A968] flex-shrink-0 mt-0.5" />
                <span className="text-[#C9CBD1] text-sm">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.postcode}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#C9A968]" />
                <a href={`tel:${siteConfig.phone}`} className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#C9A968]" />
                <a href={`mailto:${siteConfig.email}`} className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#E6D9C8] font-semibold mb-4 block">Newsletter</span>
            <p className="text-[#C9CBD1] text-sm mb-4">
              Subscribe for exclusive offers and wellness tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] placeholder-[#C9CBD1]/50 focus:outline-none focus:border-[#E6D9C8]"
              />
              <button type="submit" className="w-full btn-primary text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#E6D9C8]/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#C9CBD1] text-sm">
              © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  