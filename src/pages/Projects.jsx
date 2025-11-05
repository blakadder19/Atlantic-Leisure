
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import projects from '@/data/projects.json';
import siteConfig from '@/data/siteConfig.json';
import { Link } from 'react-router-dom';

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Our Projects | {siteConfig.brandName}</title>
        <meta name="description" content="Explore our gallery of stunning luxury spa and sauna installations. See how we transform spaces into wellness sanctuaries." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <section className="py-16 bg-gradient-to-br from-[#C9A968]/10 to-[#E6D9C8]/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">Our Projects</h1>
            <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">Transforming spaces into personal wellness sanctuaries.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} src="https://images.unsplash.com/photo-1575884950129-58a22a30b42c" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#C9A968] text-[#0B0B0C] px-3 py-1 rounded-full text-sm font-semibold">{project.category}</span>
                    </div>
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-2">{project.title}</h2>
                  <p className="text-[#C9CBD1] mb-4">{project.description}</p>
                  {project.testimonial && (
                    <blockquote className="border-l-2 border-[#C9A968] pl-4 italic text-[#F5F5F2] mb-4">
                      "{project.testimonial}" - <cite className="not-italic font-semibold">{project.client}</cite>
                    </blockquote>
                  )}
                  <Button variant="link" className="text-[#C9A968] p-0 h-auto hover:text-[#E6D9C8]">
                    View Project Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#141416]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-[#C9CBD1] mb-8 max-w-2xl mx-auto">
              Let's create your dream wellness space. Contact us for a personalized consultation.
            </p>
            <Link to="/contact">
              <Button size="lg" className="btn-primary">
                Get a Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
