
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import faqData from '@/data/faq.json';
import siteConfig from '@/data/siteConfig.json';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | {siteConfig.brandName}</title>
        <meta name="description" content="Find answers to common questions about our hot tubs, swim spas, saunas, installation, and maintenance." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <section className="py-16 bg-gradient-to-br from-[#C9A968]/10 to-[#E6D9C8]/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">Frequently Asked Questions</h1>
            <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">Your questions, answered by our experts.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqData.map(category => (
                <div key={category.category} className="mb-12">
                  <h2 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-8 border-b-2 border-[#C9A968] pb-4">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((item, index) => {
                      const id = `${category.category}-${index}`;
                      const isOpen = activeQuestion === id;
                      return (
                        <div key={id} className="glass-card rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleQuestion(id)}
                            className="w-full flex justify-between items-center p-6 text-left"
                          >
                            <span className="text-lg font-semibold text-[#F5F5F2]">{item.question}</span>
                            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                              <ChevronDown className="w-6 h-6 text-[#C9A968]" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="px-6 pb-6">
                                  <p className="text-[#C9CBD1] leading-relaxed">{item.answer}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#141416]">
          <div className="container mx-auto px-4 text-center">
            <HelpCircle className="w-16 h-16 text-[#C9A968] mx-auto mb-6" />
            <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-6">Can't Find Your Answer?</h2>
            <p className="text-lg text-[#C9CBD1] mb-8 max-w-2xl mx-auto">
              Our team is ready to assist with any questions you may have. Contact us for personalized support.
            </p>
            <Link to="/contact">
              <Button size="lg" className="btn-primary">
                Contact Our Experts
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;
