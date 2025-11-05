
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieConsent from '@/components/CookieConsent';
import Home from '@/pages/Home';
import HotTubs from '@/pages/HotTubs';
import HotTubsSeries from '@/pages/HotTubsSeries';
import SwimSpas from '@/pages/SwimSpas';
import Saunas from '@/pages/Saunas';
import Financing from '@/pages/Financing';
import Chemicals from '@/pages/Chemicals';
import ChemicalProduct from '@/pages/ChemicalProduct';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import CheckoutSuccess from '@/pages/CheckoutSuccess';
import CheckoutCancel from '@/pages/CheckoutCancel';
import Installation from '@/pages/Installation';
import Showroom from '@/pages/Showroom';
import Projects from '@/pages/Projects';
import About from '@/pages/About';
import Testimonials from '@/pages/Testimonials';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Wishlist from '@/pages/Wishlist';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hot-tubs" element={<HotTubs />} />
          <Route path="/hot-tubs/:seriesSlug" element={<HotTubsSeries />} />
          <Route path="/swim-spas" element={<SwimSpas />} />
          <Route path="/saunas" element={<Saunas />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/chemicals" element={<Chemicals />} />
          <Route path="/chemicals/:slug" element={<ChemicalProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
      <Toaster />
    </div>
  );
}

export default App;
