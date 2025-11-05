
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, Truck, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import siteConfig from '@/data/siteConfig.json';

const Installation = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Service request submitted!",
      description: "Our team will contact you shortly to schedule your service.",
    });
    e.target.reset();
  };

  const installationProcess = [
    {
      step: 1,
      title: "Site Survey",
      description: "Our experts conduct a thorough survey to ensure a seamless fit and identify any requirements for your space."
    },
    {
      step: 2,
      title: "White-Glove Delivery",
      description: "Your new spa is carefully delivered and positioned by our professional team, respecting your property and privacy."
    },
    {
      step: 3,
      title: "Expert Installation",
      description: "We handle all technical aspects, including electrical connections and system setup, ensuring perfect operation from day one."
    },
    {
      step: 4,
      title: "Handover & Training",
      description: "Receive a full walkthrough of your new spa's features and maintenance routine, so you can enjoy it with confidence."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Installation & Services | {siteConfig.brandName}</title>
        <meta name="description" content="Discover our white-glove installation process and comprehensive maintenance plans. We ensure your luxury spa is perfectly installed and maintained." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <section className="py-16 bg-gradient-to-br from-[#C9A968]/10 to-[#E6D9C8]/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">Installation & Services</h1>
            <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">Seamless installation and dedicated aftercare for your peace of mind.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E6D9C8] mb-16 text-center">Our Process</h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E6D9C8]/20 hidden md:block"></div>
              {installationProcess.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`flex md:items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="w-1/2 hidden md:flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#C9A968] text-[#0B0B0C] flex items-center justify-center font-bold text-lg z-10">
                      {item.step}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className={`glass-card rounded-xl p-8 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                      <h3 className="font-serif text-2xl font-bold text-[#E6D9C8] mb-4">{item.title}</h3>
                      <p className="text-[#C9CBD1]">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#141416]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-4xl font-bold text-[#E6D9C8] mb-6">Maintenance Plans</h2>
                <p className="text-[#C9CBD1] text-lg mb-8">
                  Keep your spa in pristine condition with our tailored maintenance plans. Our expert technicians handle everything, from water chemistry to system checks, ensuring your investment is protected.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4"><CheckSquare className="w-6 h-6 text-[#C9A968]" /><span className="text-lg text-[#F5F5F2]">Quarterly & Annual Service</span></div>
                  <div className="flex items-center gap-4"><CheckSquare className="w-6 h-6 text-[#C9A968]" /><span className="text-lg text-[#F5F5F2]">Water Quality Management</span></div>
                  <div className="flex items-center gap-4"><CheckSquare className="w-6 h-6 text-[#C9A968]" /><span className="text-lg text-[#F5F5F2]">Priority Repair Service</span></div>
                </div>
              </div>
              <div>
                <form onSubmit={handleFormSubmit} className="glass-card rounded-2xl p-8 space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-[#E6D9C8] mb-4 text-center">Book a Service</h3>
                  <div>
                    <label className="block text-[#E6D9C8] mb-2">Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]" />
                  </div>
                  <div>
                    <label className="block text-[#E6D9C8] mb-2">Email</label>
                    <input type="email" required className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]" />
                  </div>
                  <div>
                    <label className="block text-[#E6D9C8] mb-2">Service Required</label>
                    <select className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#E6D9C8]/20 rounded-lg text-[#F5F5F2] focus:outline-none focus:border-[#E6D9C8]">
                      <option>Maintenance Plan Enquiry</option>
                      <option>Repair Request</option>
                      <option>General Service</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full btn-primary">
                    Submit Request <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Installation;
