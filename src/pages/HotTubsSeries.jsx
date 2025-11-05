import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Droplets, Zap, Check, ArrowRight, Phone, Star, Info } from 'lucide-react';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import hotTubsSeries from '@/data/hot-tubs-series.json';
import siteConfig from '@/data/siteConfig.json';
import apiService from '@/services/api';

const HotTubsSeries = () => {
  const { seriesSlug } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    const found = hotTubsSeries.find(s => s.slug === seriesSlug);
    if (!found) {
      navigate('/hot-tubs');
      return;
    }
    setSeries(found);
  }, [seriesSlug, navigate]);

  const handleQuoteRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await apiService.requestQuote({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        product: `Hot Tub - ${series.name}`,
        model: selectedModel?.name || 'Not specified',
        message: formData.get('message')
      });

      toast({
        title: "Quote request received!",
        description: "Our team will contact you within 24 hours with a detailed quote.",
      });

      setShowQuoteForm(false);
      e.target.reset();
    } catch (error) {
      toast({
        title: "Request failed",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    }
  };

  if (!series) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#0B0B0C]">
        <p className="text-[#C9CBD1]">Loading...</p>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Hot Tubs', path: '/hot-tubs' },
    { name: series.name, path: `/hot-tubs/${series.slug}` }
  ];

  return (
    <>
      <SEO
        title={`${series.name} Hot Tubs - ${series.tagline}`}
        description={series.description}
        keywords={`${series.name}, hot tubs, luxury spa, hydrotherapy, ${series.models.map(m => m.name).join(', ')}`}
        url={`/hot-tubs/${series.slug}`}
      />

      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt={`${series.name} - ${series.tagline}`} 
              src={series.heroImage || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'} 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/80 via-[#0B0B0C]/60 to-[#0B0B0C]"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <Breadcrumbs items={breadcrumbs} />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mt-8"
            >
              <div className="inline-block px-6 py-2 bg-[#C9A968]/20 border border-[#C9A968] rounded-full mb-6">
                <span className="text-[#C9A968] font-semibold text-sm tracking-wide uppercase">
                  {series.tagline}
                </span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#E6D9C8] mb-6">
                {series.name}
              </h1>
              
              <p className="text-xl md:text-2xl text-[#C9CBD1] mb-4 max-w-3xl mx-auto">
                {series.description}
              </p>
              
              <div className="flex items-center justify-center gap-2 text-[#C9A968] text-lg">
                <span className="font-semibold">From</span>
                <span className="font-bold text-2xl">{series.priceRange}</span>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E6D9C8] mb-8 text-center">
              {series.name} Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {series.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 flex items-start gap-4"
                >
                  <Check className="w-6 h-6 text-[#C9A968] flex-shrink-0 mt-1" />
                  <p className="text-[#F5F5F2]">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ideal For Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 glass-card rounded-2xl p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-[#C9A968]" />
              <h2 className="font-serif text-3xl font-bold text-[#E6D9C8]">
                Ideal For
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {series.idealFor.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-[#C9A968] fill-current" />
                  <span className="text-[#F5F5F2]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Models */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4 text-center">
              {series.name} Models
            </h2>
            <p className="text-[#C9CBD1] text-center mb-12 max-w-2xl mx-auto">
              Choose from our carefully curated selection of {series.name.toLowerCase()} hot tubs
            </p>

            <div className="grid grid-cols-1 gap-12">
              {series.models.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`glass-card rounded-3xl overflow-hidden ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className={`relative aspect-[4/3] lg:aspect-auto overflow-hidden ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
                      <img 
                        src={model.images?.[0] || model.image || 'https://via.placeholder.com/800x600?text=Hot+Tub'} 
                        alt={`${model.name} - ${series.name}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 to-transparent lg:hidden"></div>
                      
                      {model.compareAt && (
                        <div className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white font-bold rounded-lg">
                          Save {siteConfig.currencySymbol}{(model.compareAt - model.price).toFixed(0)}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-4xl font-bold text-[#E6D9C8]">
                            {model.name}
                          </h3>
                        </div>
                        <p className="text-[#C9A968] text-lg font-semibold mb-4">
                          {model.tagline}
                        </p>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#E6D9C8]/20">
                        <div className="text-center">
                          <Users className="w-6 h-6 text-[#C9A968] mx-auto mb-2" />
                          <p className="text-[#F5F5F2] font-bold text-lg">{model.capacity}</p>
                          <p className="text-[#C9CBD1] text-xs">People</p>
                        </div>
                        <div className="text-center">
                          <Droplets className="w-6 h-6 text-[#C9A968] mx-auto mb-2" />
                          <p className="text-[#F5F5F2] font-bold text-lg">{model.jets}</p>
                          <p className="text-[#C9CBD1] text-xs">Jets</p>
                        </div>
                        <div className="text-center">
                          <Zap className="w-6 h-6 text-[#C9A968] mx-auto mb-2" />
                          <p className="text-[#F5F5F2] font-bold text-lg">{model.power}</p>
                          <p className="text-[#C9CBD1] text-xs">Power</p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="text-[#E6D9C8] font-semibold mb-3">Key Highlights</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {model.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-[#C9A968] flex-shrink-0 mt-1" />
                              <span className="text-[#F5F5F2] text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#E6D9C8]/20">
                        <div>
                          {model.compareAt && (
                            <p className="text-[#C9CBD1] text-lg line-through mb-1">
                              {siteConfig.currencySymbol}{model.compareAt.toLocaleString()}
                            </p>
                          )}
                          <p className="text-[#E6D9C8] font-bold text-3xl">
                            {siteConfig.currencySymbol}{model.price.toLocaleString()}
                          </p>
                          <p className="text-[#C9CBD1] text-sm">Installation available from £500</p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button 
                            onClick={() => {
                              setSelectedModel(model);
                              setShowQuoteForm(true);
                            }}
                            className="btn-primary"
                          >
                            Request Quote
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                          <a 
                            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in the ${model.name} from ${series.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outline" className="btn-secondary w-full">
                              <Phone className="w-5 h-5 mr-2" />
                              WhatsApp Us
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 glass-card rounded-2xl p-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-[#C9CBD1] mb-8 max-w-2xl mx-auto">
              Experience our {series.name.toLowerCase()} collection in person. Book a private viewing with one of our wellness experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/showroom">
                <Button size="lg" className="btn-primary">
                  Book Showroom Visit
                </Button>
              </Link>
              <Link to="/financing">
                <Button size="lg" variant="outline" className="btn-secondary">
                  Financing Options
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuoteForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-2">
              Request a Quote
            </h3>
            <p className="text-[#C9CBD1] mb-6">
              {selectedModel ? `${selectedModel.name} - ${series.name}` : series.name}
            </p>

            <form onSubmit={handleQuoteRequest} className="space-y-4">
              <div>
                <label className="block text-[#E6D9C8] mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#C9A968]"
                />
              </div>

              <div>
                <label className="block text-[#E6D9C8] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#C9A968]"
                />
              </div>

              <div>
                <label className="block text-[#E6D9C8] mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#C9A968]"
                />
              </div>

              <div>
                <label className="block text-[#E6D9C8] mb-2">Message</label>
                <textarea
                  name="message"
                  rows="3"
                  className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#C9A968]"
                  placeholder="Any specific requirements or questions?"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button"
                  variant="outline"
                  className="flex-1 btn-secondary"
                  onClick={() => setShowQuoteForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 btn-primary">
                  Send Request
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default HotTubsSeries;

