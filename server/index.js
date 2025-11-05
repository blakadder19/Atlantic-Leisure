/**
 * Simple Express server for handling:
 * - Form submissions (contact, leads, newsletter)
 * - Stripe payment integration
 * - Email notifications
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_KEY_HERE');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting (simple implementation)
const requestCounts = new Map();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Clean old requests
  const recentRequests = userRequests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  next();
};

// Input sanitization helper
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form submission
app.post('/api/contact', rateLimiter, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      message: sanitizeInput(message)
    };
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // TODO: Send email notification (integrate with SendGrid, Mailgun, etc.)
    console.log('Contact form submission:', sanitizedData);
    
    // TODO: Save to database if needed
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to process contact form' });
  }
});

// Lead generation (Hot Tubs, Saunas, etc.)
app.post('/api/leads', rateLimiter, async (req, res) => {
  try {
    const { name, email, phone, product, message } = req.body;
    
    if (!name || !email || !phone || !product) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      product: sanitizeInput(product),
      message: sanitizeInput(message),
      timestamp: new Date().toISOString()
    };
    
    // TODO: Send to CRM or email
    console.log('New lead:', sanitizedData);
    
    res.json({ 
      success: true, 
      message: 'Thank you! Our team will contact you within 24 hours.' 
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ error: 'Failed to process lead' });
  }
});

// Newsletter subscription
app.post('/api/newsletter', rateLimiter, async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // TODO: Add to email marketing platform (Mailchimp, SendGrid, etc.)
    console.log('Newsletter subscription:', { email, name });
    
    res.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Create Stripe Checkout Session
app.post('/api/create-checkout-session', rateLimiter, async (req, res) => {
  try {
    const { items, customerEmail } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid items' });
    }
    
    // Transform items to Stripe format
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to pence
      },
      quantity: item.quantity,
    }));
    
    // Calculate tax (VAT 20%)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout/cancel`,
      customer_email: customerEmail,
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500, // £15.00
              currency: 'gbp',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ],
      automatic_tax: {
        enabled: true,
      },
    });
    
    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Stripe webhook handler
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // TODO: Fulfill order, send confirmation email, update database
        console.log('Payment successful:', session.id);
        break;
      
      case 'payment_intent.payment_failed':
        // TODO: Handle failed payment
        console.log('Payment failed');
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// Quote request for Hot Tubs/Saunas/Swim Spas
app.post('/api/quote', rateLimiter, async (req, res) => {
  try {
    const { name, email, phone, product, model, message } = req.body;
    
    if (!name || !email || !phone || !product) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const quoteData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      product: sanitizeInput(product),
      model: sanitizeInput(model),
      message: sanitizeInput(message),
      timestamp: new Date().toISOString(),
      quoteId: `QT-${Date.now()}`
    };
    
    // TODO: Send email to sales team
    // TODO: Save to database
    console.log('Quote request:', quoteData);
    
    res.json({ 
      success: true, 
      quoteId: quoteData.quoteId,
      message: 'Quote request received! We\'ll send you a detailed quote within 24 hours.' 
    });
  } catch (error) {
    console.error('Quote request error:', error);
    res.status(500).json({ error: 'Failed to process quote request' });
  }
});

// Showroom booking
app.post('/api/book-showroom', rateLimiter, async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, interests } = req.body;
    
    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const bookingData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      date,
      time,
      guests: parseInt(guests) || 1,
      interests: Array.isArray(interests) ? interests : [],
      bookingId: `BK-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    // TODO: Check availability
    // TODO: Send confirmation email
    // TODO: Add to calendar
    console.log('Showroom booking:', bookingData);
    
    res.json({ 
      success: true, 
      bookingId: bookingData.bookingId,
      message: 'Showroom visit booked! You\'ll receive a confirmation email shortly.' 
    });
  } catch (error) {
    console.error('Showroom booking error:', error);
    res.status(500).json({ error: 'Failed to process booking' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`💳 Stripe endpoint: http://localhost:${PORT}/api/create-checkout-session`);
});

export default app;

