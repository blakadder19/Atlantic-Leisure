
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Droplets, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import categories from '@/data/categories.json';

const SwimSpas = () => {
  const category = categories.find(c => c.id === 'swim-spas');

  const handleLeadForm = (e) => {
    e.preventDefault();
    toast({
      title: "Thank you for your interest!",
      description: "Our team will contact you within 24 hours.",
    });
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>Premium Swim Spas | {category.title}</title>
        <meta name="description" content={category.description} />
      </Helmet>

      <div className="min-h-screen pt-20">
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden grain-overlay">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt={category.title} src="https://images.unsplash.com/photo-1649215636705-1084bd6df97a" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/60 to-[#0B0B0C]"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#E6D9C8] mb-6">
                {category.title}
              </h1>
              <p className="text-xl md:text-2xl text-[#C9CBD1] mb-8 max-w-3xl mx-auto">
                {category.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-[#0B0B0C]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <p className="text-[#C9CBD1] text-lg leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {category.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <p className="text-[#F5F5F2]">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#141416]">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-12 text-center">
              Our Swim Spa Collection
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {category.models.map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={model.name} src="https://images.unsplash.com/photo-1484978856769-8516cf266385" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-3xl font-bold text-[#E6D9C8]">{model.name}</h3>
                      <span className="text-[#C9A968] text-sm font-semibold">{model.series}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <Activity className="w-6 h-6 text-[#C9A968] mx-auto mb-2" />
                        <p className="text-[#F5F5F2] font-semibold">{model.length}</p>
                        <p className="text-[#C9CBD1] text-sm">Length</p>
                      </div>
                      <div className="text-center">
                        <Droplets className="w-6 h-6 text-[#C9A968] mx-auto mb-2" />
                        <p className="text-[#F5F5F2] font-semibold">{model.jets}</p>
                        <p className="text-[#C9CBD1] text-sm">Jets</p>
                      </div>
                      <div className="text-center">
                        <Zap className="w-6 h-6 text-[#C9A968] mx-auto mb-2" />
                        <p className="text-[#F5F5F2] font-semibold">{model.power}</p>
                        <p className="text-[#C9CBD1] text-sm">Power</p>
                      </div>
                    </div>
                    <Button className="w-full btn-primary" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>
                      Request Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#0B0B0C]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-8 text-center">
                Get Expert Advice
              </h2>
              <form onSubmit={handleLeadForm} className="glass-card rounded-2xl p-8 space-y-6">
                <div>
                  <label className="block text-[#E6D9C8] mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                  />
                </div>
                <div>
                  <label className="block text-[#E6D9C8] mb-2">Email</label>
                  <input
                    type="email"
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
                  <label className="block text-[#E6D9C8] mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full btn-primary">
                  Submit Enquiry
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SwimSpas;
  