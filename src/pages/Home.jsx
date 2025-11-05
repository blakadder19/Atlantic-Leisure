
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Shield, Zap, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import siteConfig from '@/data/siteConfig.json';
import categories from '@/data/categories.json';
import testimonials from '@/data/testimonials.json';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Luxury Hot Tubs, Swim Spas & Saunas | {siteConfig.brandName}</title>
        <meta name="description" content="Experience ultimate wellness with premium hot tubs, swim spas, and saunas. Exceptional quality, luxury design, and expert installation services." />
      </Helmet>

      <div className="min-h-screen">
        <section className="relative h-screen flex items-center justify-center overflow-hidden grain-overlay">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Luxury hot tub in stunning outdoor setting at sunset" src="https://images.unsplash.com/photo-1679534844911-c53dd7fa6a11" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/60 via-[#0B0B0C]/40 to-[#0B0B0C]"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#E6D9C8] mb-6">
                Elevate Your Wellness
              </h1>
              <p className="text-xl md:text-2xl text-[#C9CBD1] mb-8 max-w-3xl mx-auto">
                Experience the pinnacle of luxury with our premium hot tubs, swim spas, and saunas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/hot-tubs">
                  <Button size="lg" className="btn-primary">
                    Explore Hot Tubs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="btn-secondary">
                    Talk via WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-[#0B0B0C]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4">
                Discover Our Collections
              </h2>
              <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">
                Each collection is meticulously crafted to deliver unparalleled relaxation and wellness
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/${category.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4">
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={category.title} src="https://images.unsplash.com/photo-1649215636705-1084bd6df97a" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-2">{category.title}</h3>
                        <p className="text-[#C9CBD1] mb-4">{category.subtitle}</p>
                        <div className="flex items-center text-[#C9A968] group-hover:translate-x-2 transition-transform">
                          <span className="font-semibold">Explore</span>
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, title: 'Premium Quality', desc: 'Lifetime structural warranty and superior craftsmanship' },
                { icon: Zap, title: 'Energy Efficient', desc: 'Advanced insulation reduces running costs by up to 40%' },
                { icon: Heart, title: 'Hydrotherapy', desc: 'Precision-engineered jets for therapeutic benefits' },
                { icon: Shield, title: 'Expert Service', desc: 'Professional installation and comprehensive aftercare' }
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
                  <h3 className="font-serif text-xl font-semibold text-[#E6D9C8] mb-2">{benefit.title}</h3>
                  <p className="text-[#C9CBD1] text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#0B0B0C]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-4">
                What Our Clients Say
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C9A968] text-[#C9A968]" />
                    ))}
                  </div>
                  <p className="text-[#F5F5F2] mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t border-[#E6D9C8]/10 pt-4">
                    <p className="text-[#E6D9C8] font-semibold">{testimonial.name}</p>
                    <p className="text-[#C9CBD1] text-sm">{testimonial.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/testimonials">
                <Button variant="outline" className="btn-secondary">
                  Read More Reviews
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

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
                Visit our showroom or book a consultation with our wellness experts
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

export default Home;
  