
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import testimonials from '@/data/testimonials.json';
import siteConfig from '@/data/siteConfig.json';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  return (
    <>
      <Helmet>
        <title>Client Testimonials | {siteConfig.brandName}</title>
        <meta name="description" content={`Read what our clients say about their experience with ${siteConfig.brandName}'s luxury spas and services.`} />
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <section className="py-16 bg-gradient-to-br from-[#C9A968]/10 to-[#E6D9C8]/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">What Our Clients Say</h1>
            <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">Real stories from satisfied homeowners and partners.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-xl p-8 flex flex-col"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C9A968] text-[#C9A968]" />
                    ))}
                  </div>
                  <p className="text-[#F5F5F2] mb-6 italic flex-grow">"{testimonial.text}"</p>
                  <div className="border-t border-[#E6D9C8]/10 pt-4">
                    <p className="text-[#E6D9C8] font-semibold">{testimonial.name}</p>
                    <p className="text-[#C9CBD1] text-sm">{testimonial.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#141416]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-6">Share Your Experience</h2>
            <p className="text-lg text-[#C9CBD1] mb-8 max-w-2xl mx-auto">
              Have a story to share about your {siteConfig.brandName} experience? We'd love to hear from you.
            </p>
            <Link to="/contact">
              <Button size="lg" className="btn-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonials;
