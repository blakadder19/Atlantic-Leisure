
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Leaf, Users, HeartHandshake as Handshake } from 'lucide-react';
import siteConfig from '@/data/siteConfig.json';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    { icon: Award, title: "Uncompromising Quality", description: "We source only the finest materials and partner with master craftsmen to deliver products of exceptional quality." },
    { icon: Leaf, title: "Sustainable Luxury", description: "Committed to eco-friendly practices, from energy-efficient designs to responsibly sourced materials." },
    { icon: Users, title: "Client-Centric Service", description: "Your wellness journey is our priority. We provide personalized guidance and support every step of the way." },
    { icon: Handshake, title: "Enduring Partnerships", description: "We build lasting relationships with our clients, supported by comprehensive warranties and aftercare." }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | {siteConfig.brandName}</title>
        <meta name="description" content={`Learn about ${siteConfig.brandName}, our commitment to quality, sustainability, and exceptional service in the luxury wellness industry.`} />
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <section className="py-24 bg-gradient-to-br from-[#C9A968]/10 to-[#E6D9C8]/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">Our Story</h1>
            <p className="text-[#C9CBD1] text-lg max-w-3xl mx-auto">
              Founded on a passion for wellness and a commitment to luxury, {siteConfig.brandName} was born to redefine the home spa experience. We believe that true relaxation is an art form, and every product we offer is a masterpiece of design, engineering, and comfort.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1542820229-23469b595232" alt="Artisans crafting a luxury spa" />
              </motion.div>
              <div>
                <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-6">The Pursuit of Perfection</h2>
                <p className="text-[#C9CBD1] text-lg mb-4">
                  Our journey began with a simple idea: to create hydrotherapy solutions that are not just functional, but are stunning centerpieces for any home. We traveled the world to source the best components, from whisper-quiet pumps to durable, beautiful acrylics.
                </p>
                <p className="text-[#C9CBD1] text-lg">
                  Today, {siteConfig.brandName} stands as a testament to that vision, offering a curated collection of spas and saunas that embody the pinnacle of luxury wellness.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#141416]">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-16 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C9A968] to-[#E6D9C8] rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-10 h-10 text-[#0B0B0C]" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#E6D9C8] mb-3">{value.title}</h3>
                  <p className="text-[#C9CBD1]">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-6">Join Us on the Journey to Wellness</h2>
            <p className="text-lg text-[#C9CBD1] mb-8 max-w-2xl mx-auto">
              We invite you to explore our collections and discover how {siteConfig.brandName} can elevate your home and your well-being.
            </p>
            <Link to="/showroom">
              <Button size="lg" className="btn-primary">
                Visit Our Showroom
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
