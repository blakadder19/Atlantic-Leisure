
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import siteConfig from '@/data/siteConfig.json';
import { trackLeadFormSubmit } from '@/utils/analytics';

const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };
    trackLeadFormSubmit('contact', formData);
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. Our team will respond shortly.",
    });
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | {siteConfig.brandName}</title>
        <meta name="description" content={`Get in touch with ${siteConfig.brandName}. Contact us for sales enquiries, support, or to book a showroom visit.`} />
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <section className="py-16 bg-gradient-to-br from-[#C9A968]/10 to-[#E6D9C8]/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">Contact Us</h1>
            <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">We're here to help you on your wellness journey.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-8">Get in Touch</h2>
                <div className="space-y-6 mb-8">
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-4 group">
                    <Phone className="w-8 h-8 text-[#C9A968] group-hover:text-[#E6D9C8] transition-colors" />
                    <span className="text-xl text-[#F5F5F2] group-hover:text-[#E6D9C8] transition-colors">{siteConfig.phone}</span>
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 group">
                    <Mail className="w-8 h-8 text-[#C9A968] group-hover:text-[#E6D9C8] transition-colors" />
                    <span className="text-xl text-[#F5F5F2] group-hover:text-[#E6D9C8] transition-colors">{siteConfig.email}</span>
                  </a>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-8 h-8 text-[#C9A968] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xl text-[#F5F5F2]">{siteConfig.address.street}</p>
                      <p className="text-xl text-[#F5F5F2]">{siteConfig.address.city}, {siteConfig.address.postcode}</p>
                    </div>
                  </div>
                </div>
                <div className="h-64 rounded-xl overflow-hidden glass-card">
                   <p className="text-center text-gray-400 pt-24">Map Placeholder</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass-card rounded-2xl p-8">
                  <h2 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-6 text-center">Send Us a Message</h2>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[#E6D9C8] mb-2">Full Name</label>
                      <input name="name" type="text" required className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]" />
                    </div>
                    <div>
                      <label className="block text-[#E6D9C8] mb-2">Email Address</label>
                      <input name="email" type="email" required className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]" />
                    </div>
                    <div>
                      <label className="block text-[#E6D9C8] mb-2">Phone Number</label>
                      <input name="phone" type="tel" className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]" />
                    </div>
                    <div>
                      <label className="block text-[#E6D9C8] mb-2">Message</label>
                      <textarea name="message" rows="4" required className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]"></textarea>
                    </div>
                    <Button type="submit" className="w-full btn-primary">
                      Send Message <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
