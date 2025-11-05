import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle, Info } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import siteConfig from '@/data/siteConfig.json';

const Financing = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(36);
  const [interestRate, setInterestRate] = useState(9.9);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  const breadcrumbs = [
    { name: 'Financing Options', path: '/financing' }
  ];

  const benefits = [
    'Flexible payment terms from 12 to 60 months',
    'Quick online application process',
    'Competitive interest rates from 0% APR',
    'No hidden fees or penalties',
    'Instant credit decisions',
    'Include installation costs in your loan'
  ];

  return (
    <>
      <SEO
        title="Financing Options"
        description="Flexible financing options for your hot tub, swim spa, or sauna. Calculate monthly payments and apply online today."
        keywords="hot tub financing, spa finance, payment plans, monthly payments"
        url="/financing"
      />

      <div className="min-h-screen pt-20 bg-[#0B0B0C]">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#E6D9C8] mb-4">
              Flexible Financing Options
            </h1>
            <p className="text-[#C9CBD1] text-lg max-w-2xl mx-auto">
              Make your dream spa or hot tub affordable with our flexible payment plans
            </p>
          </motion.div>

          {/* Finance Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-8 h-8 text-[#C9A968]" />
                <h2 className="font-serif text-3xl font-bold text-[#E6D9C8]">
                  Payment Calculator
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#E6D9C8] mb-2 font-medium">
                    Loan Amount: {siteConfig.currencySymbol}{loanAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="500"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-[#141416] rounded-lg appearance-none cursor-pointer accent-[#C9A968]"
                  />
                  <div className="flex justify-between text-sm text-[#C9CBD1] mt-1">
                    <span>£1,000</span>
                    <span>£20,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#E6D9C8] mb-2 font-medium">
                    Loan Term: {loanTerm} months
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="60"
                    step="12"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-[#141416] rounded-lg appearance-none cursor-pointer accent-[#C9A968]"
                  />
                  <div className="flex justify-between text-sm text-[#C9CBD1] mt-1">
                    <span>12 months</span>
                    <span>60 months</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#E6D9C8] mb-2 font-medium">
                    Interest Rate: {interestRate.toFixed(1)}% APR
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-[#141416] rounded-lg appearance-none cursor-pointer accent-[#C9A968]"
                  />
                  <div className="flex justify-between text-sm text-[#C9CBD1] mt-1">
                    <span>0% APR</span>
                    <span>20% APR</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-8"
            >
              <h3 className="font-serif text-2xl font-bold text-[#E6D9C8] mb-6">
                Your Estimated Payment
              </h3>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#C9A968]/20 to-[#E6D9C8]/10 rounded-xl p-6 text-center">
                  <p className="text-[#C9CBD1] mb-2">Monthly Payment</p>
                  <p className="font-serif text-5xl font-bold text-[#E6D9C8]">
                    {siteConfig.currencySymbol}{monthlyPayment.toFixed(2)}
                  </p>
                  <p className="text-[#C9CBD1] text-sm mt-2">
                    for {loanTerm} months
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-[#E6D9C8]/10">
                    <span className="text-[#C9CBD1]">Loan Amount</span>
                    <span className="text-[#E6D9C8] font-semibold">
                      {siteConfig.currencySymbol}{loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E6D9C8]/10">
                    <span className="text-[#C9CBD1]">Total Interest</span>
                    <span className="text-[#E6D9C8] font-semibold">
                      {siteConfig.currencySymbol}{totalInterest.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[#E6D9C8] font-semibold">Total Amount</span>
                    <span className="text-[#E6D9C8] font-bold text-xl">
                      {siteConfig.currencySymbol}{totalPayment.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#C9A968]/10 border border-[#C9A968]/30 rounded-lg p-4 flex gap-3">
                  <Info className="w-5 h-5 text-[#C9A968] flex-shrink-0 mt-0.5" />
                  <p className="text-[#C9CBD1] text-sm">
                    This is an estimate only. Actual rates and terms may vary based on creditworthiness.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-8 text-center">
              Why Finance With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-[#C9A968] flex-shrink-0" />
                  <p className="text-[#F5F5F2]">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-[#E6D9C8] mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[#C9CBD1] mb-8 max-w-2xl mx-auto">
              Apply for financing today and get an instant credit decision. Our team is here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary" size="lg">
                Apply Now
              </Button>
              <Button variant="outline" className="btn-secondary" size="lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Financing;

