import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Zap, Heart, Shield, Star, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import hotTubsSeries from '@/data/hot-tubs-series.json';
import siteConfig from '@/data/siteConfig.json';

const HotTubs = () => {
  return (
    <>
      <SEO
        title="Premium Hot Tubs - Luxury Hydrotherapy Collection"
        description="Discover our complete range of luxury hot tubs across three premium series. From intimate relaxation to ultimate luxury, find your perfect spa experience."
        keywords="luxury hot tubs, premium spa, hydrotherapy, Series One, Series Two, Series Three"
        url="/hot-tubs"
      />

      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Luxury hot tubs collection" 
              src="https://images.unsplash.com/photo-1649215636705-1084bd6df97a" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/70 via-[#0B0B0C]/50 to-[#0B0B0C]"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-6 py-2 bg-[#C9A968]/20 border border-[#C9A968] rounded-full mb-6">
                <span className="text-[#C9A968] font-semibold text-sm tracking-wide uppercase">
                  Luxury Collection
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#E6D9C8] mb-6">
                Premium Hot Tubs
              </h1>
              
              <p className="text-xl md:text-2xl text-[#C9CBD1] mb-8 max-w-3xl mx-auto">
                Experience unparalleled relaxation and hydrotherapy with our three distinguished series
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#series">
                  <Button size="lg" className="btn-primary">
                    Explore Our Series
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/showroom">
                  <Button size="lg" variant="outline" className="btn-secondary">
                    Visit Showroom
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-[#141416]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4">
                Why Choose Lux Hydro Living
              </h2>
              <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">
                Every hot tub in our collection represents the pinnacle of luxury and wellness
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: Award, 
                  title: 'Premium Quality', 
                  desc: 'Lifetime structural warranty and superior craftsmanship on all models'
                },
                { 
                  icon: Zap, 
                  title: 'Energy Efficient', 
                  desc: 'Advanced insulation and smart heating reduces running costs by up to 40%'
                },
                { 
                  icon: Heart, 
                  title: 'Hydrotherapy', 
                  desc: 'Precision-engineered jets designed for therapeutic benefits'
                },
                { 
                  icon: Shield, 
                  title: 'Expert Service', 
                  desc: 'Professional installation and comprehensive aftercare included'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center hover:border-[#E6D9C8]/30 transition-colors"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C9A968] to-[#E6D9C8] rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-[#0B0B0C]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#E6D9C8] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#C9CBD1] text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Series Overview */}
        <section id="series" className="py-24 bg-[#0B0B0C]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4">
                Our Hot Tub Collections
              </h2>
              <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">
                Three distinct series, each meticulously crafted to deliver unparalleled relaxation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {hotTubsSeries.map((series, index) => (
                <motion.div
                  key={series.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group"
                >
                  <Link to={`/hot-tubs/${series.slug}`}>
                    <div className="glass-card rounded-2xl overflow-hidden hover:border-[#C9A968]/50 transition-all duration-300">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={series.name} 
                          src={series.heroImage}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/30 to-transparent"></div>
                        
                        {/* Series Badge */}
                        <div className="absolute top-4 left-4 px-4 py-2 bg-[#C9A968] text-[#0B0B0C] font-bold rounded-lg">
                          {series.name}
                        </div>

                        {/* Tagline Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-[#E6D9C8] text-xl font-serif font-semibold mb-2">
                            {series.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-[#C9CBD1] mb-4 line-clamp-3">
                          {series.description}
                        </p>

                        {/* Price Range */}
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E6D9C8]/10">
                          <span className="text-[#C9CBD1] text-sm">Starting from</span>
                          <span className="text-[#C9A968] font-bold text-xl">
                            {series.priceRange.split(' - ')[0]}
                          </span>
                        </div>

                        {/* Model Count */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[#C9CBD1] text-sm">
                            {series.models.length} {series.models.length === 1 ? 'Model' : 'Models'} Available
                          </span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[#C9A968] fill-current" />
                            ))}
                          </div>
                        </div>

                        {/* Key Features Preview */}
                        <div className="mb-6">
                          <p className="text-[#E6D9C8] text-sm font-semibold mb-2">Key Features:</p>
                          <ul className="space-y-1">
                            {series.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[#C9CBD1] text-sm">
                                <Check className="w-4 h-4 text-[#C9A968] flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA */}
                        <Button className="w-full btn-primary group-hover:bg-[#C9A968] group-hover:text-[#0B0B0C] transition-colors">
                          Explore {series.name}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 bg-[#141416]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4">
                Compare Our Series
              </h2>
              <p className="text-[#C9CBD1] text-lg">
                Find the perfect match for your lifestyle
              </p>
            </motion.div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E6D9C8]/20">
                      <th className="p-6 text-left text-[#E6D9C8] font-semibold">Feature</th>
                      {hotTubsSeries.map(series => (
                        <th key={series.id} className="p-6 text-center text-[#E6D9C8] font-semibold">
                          {series.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E6D9C8]/10">
                      <td className="p-6 text-[#C9CBD1]">Price Range</td>
                      {hotTubsSeries.map(series => (
                        <td key={series.id} className="p-6 text-center text-[#C9A968] font-semibold">
                          {series.priceRange}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#E6D9C8]/10">
                      <td className="p-6 text-[#C9CBD1]">Models</td>
                      {hotTubsSeries.map(series => (
                        <td key={series.id} className="p-6 text-center text-[#F5F5F2]">
                          {series.models.length}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#E6D9C8]/10">
                      <td className="p-6 text-[#C9CBD1]">Capacity Range</td>
                      {hotTubsSeries.map(series => {
                        const minCap = Math.min(...series.models.map(m => m.capacity));
                        const maxCap = Math.max(...series.models.map(m => m.capacity));
                        return (
                          <td key={series.id} className="p-6 text-center text-[#F5F5F2]">
                            {minCap === maxCap ? `${minCap} people` : `${minCap}-${maxCap} people`}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-[#E6D9C8]/10">
                      <td className="p-6 text-[#C9CBD1]">Jets Range</td>
                      {hotTubsSeries.map(series => {
                        const minJets = Math.min(...series.models.map(m => m.jets));
                        const maxJets = Math.max(...series.models.map(m => m.jets));
                        return (
                          <td key={series.id} className="p-6 text-center text-[#F5F5F2]">
                            {minJets === maxJets ? `${minJets} jets` : `${minJets}-${maxJets} jets`}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="p-6 text-[#C9CBD1]">Ideal For</td>
                      {hotTubsSeries.map(series => (
                        <td key={series.id} className="p-6 text-center">
                          <span className="text-[#F5F5F2] text-sm">
                            {series.idealFor[0]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-[#C9A968]/10 to-[#E6D9C8]/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-6">
                Ready to Transform Your Wellness?
              </h2>
              <p className="text-[#C9CBD1] text-lg mb-8 max-w-2xl mx-auto">
                Visit our showroom to experience our hot tubs firsthand or speak with our wellness experts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/showroom">
                  <Button size="lg" className="btn-primary">
                    Book Showroom Visit
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="btn-secondary">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HotTubs;
