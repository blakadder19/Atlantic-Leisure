
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import siteConfig from '@/data/siteConfig.json';

const Showroom = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Appointment requested!",
      description: "Our team will contact you shortly to confirm your visit.",
    });
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>Visit Our Showroom | {siteConfig.brandName}</title>
        <meta name="description" content={`Visit our luxury showroom at ${siteConfig.address.street}, ${siteConfig.address.city}. Book an appointment to experience our premium spas and saunas.`} />
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <section className="relative h-[60vh] flex items-center justify-center grain-overlay">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Luxury showroom interior with hot tubs and elegant lighting" src="https://images.unsplash.com/photo-1556742044-538253a6c98c" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/60 to-[#0B0B0C]"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">Visit Our Showroom</h1>
            <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">Experience luxury firsthand. Our wellness experts are ready to guide you.</p>
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
                <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-8">Find Us</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-8 h-8 text-[#C9A968] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xl text-[#F5F5F2] font-semibold">{siteConfig.address.street}</p>
                      <p className="text-lg text-[#C9CBD1]">{siteConfig.address.city}, {siteConfig.address.postcode}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-[#C9A968] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xl text-[#F5F5F2] font-semibold">Opening Hours</p>
                      <p className="text-lg text-[#C9CBD1]">{siteConfig.showroomHours.weekdays}</p>
                      <p className="text-lg text-[#C9CBD1]">{siteConfig.showroomHours.saturday}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-8 h-8 text-[#C9A968] flex-shrink-0" />
                    <p className="text-xl text-[#F5F5F2] font-semibold">{siteConfig.phone}</p>
                  </div>
                </div>
                <div className="mt-8 h-64 rounded-xl overflow-hidden glass-card">
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
                  <h2 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-6 text-center">Book a Private Visit</h2>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[#E6D9C8] mb-2">Name</label>
                      <input type="text" required className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]" />
                    </div>
                    <div>
                      <label className="block text-[#E6D9C8] mb-2">Email</label>
                      <input type="email" required className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]" />
                    </div>
                    <div>
                      <label className="block text-[#E6D9C8] mb-2">Preferred Date</label>
                      <input type="date" required className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]" />
                    </div>
                    <div>
                      <label className="block text-[#E6D9C8] mb-2">Interested In</label>
                      <select className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]">
                        <option>Hot Tubs</option>
                        <option>Swim Spas</option>
                        <option>Saunas</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full btn-primary">
                      Request Appointment <ArrowRight className="ml-2 w-5 h-5" />
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

export default Showroom;
