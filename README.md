<<<<<<< HEAD
# Atlantic-Leisure
=======
# Lux Hydro Living - Premium Spa E-commerce Platform

A modern, full-featured e-commerce platform for luxury hot tubs, swim spas, saunas, and spa chemicals.

## 🚀 Features

### E-commerce
- ✅ **Product Management** - Complete catalog for spa chemicals with stock management
- ✅ **Shopping Cart** - Full cart functionality with localStorage persistence
- ✅ **Stripe Integration** - Secure payment processing
- ✅ **Wishlist** - Save favorite products
- ✅ **Advanced Search** - Real-time search with autocomplete
- ✅ **Product Filtering** - Filter by category, brand, form, etc.

### Lead Generation (Hot Tubs/Saunas/Swim Spas)
- ✅ **Quote Requests** - Custom quote system for high-value products
- ✅ **Contact Forms** - Multiple contact points with backend integration
- ✅ **Showroom Booking** - Schedule showroom visits
- ✅ **WhatsApp Integration** - Direct messaging to sales team

### SEO & Marketing
- ✅ **Complete SEO** - Meta tags, Open Graph, Twitter Cards
- ✅ **Structured Data** - Schema.org for products, organization, breadcrumbs
- ✅ **Sitemap Generation** - Automatic sitemap.xml creation
- ✅ **robots.txt** - Search engine optimization
- ✅ **Newsletter Signup** - Email list building
- ✅ **Google Tag Manager** - Analytics tracking ready

### UX/UI
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Breadcrumbs** - Easy navigation
- ✅ **Image Lazy Loading** - Performance optimization
- ✅ **Image Zoom** - Product image zoom functionality
- ✅ **Tabs Navigation** - Organized product information
- ✅ **Smooth Animations** - Framer Motion animations
- ✅ **Accessibility** - ARIA labels, keyboard navigation
- ✅ **Dark Theme** - Premium dark color scheme

### Backend
- ✅ **Express API** - RESTful API server
- ✅ **Rate Limiting** - DDoS protection
- ✅ **Input Sanitization** - XSS protection
- ✅ **Form Validation** - Server-side validation
- ✅ **Stripe Webhooks** - Payment event handling
- ✅ **Error Handling** - Comprehensive error management

### Additional Features
- ✅ **Error Boundaries** - Graceful error handling in React
- ✅ **Financing Calculator** - Monthly payment calculator
- ✅ **Cookie Consent** - GDPR compliance
- ✅ **Reviews System** - Customer testimonials
- ✅ **Related Products** - Smart product recommendations

## 📦 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Stripe** - Payment processing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup

```bash
# Install dependencies
npm install

# Generate sitemap
npm run sitemap

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your credentials
# Add your Stripe keys, email service credentials, etc.

# Start server
npm run dev

# For production
npm start
```

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

### Backend (server/.env)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Service (optional)
SENDGRID_API_KEY=...
MAILGUN_API_KEY=...

# Emails
CONTACT_EMAIL=info@luxhydroliving.com
SALES_EMAIL=sales@luxhydroliving.com
```

## 📁 Project Structure

```
lux-hydro-living/
├── src/
│   ├── components/         # Reusable components
│   │   ├── layout/        # Header, Footer
│   │   ├── ui/            # UI components (buttons, inputs, etc.)
│   │   ├── SEO.jsx        # SEO component
│   │   ├── StructuredData.jsx
│   │   ├── SearchBar.jsx
│   │   ├── NewsletterSignup.jsx
│   │   └── ErrorBoundary.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Chemicals.jsx
│   │   ├── ChemicalProduct.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Financing.jsx
│   │   ├── HotTubs.jsx
│   │   ├── Saunas.jsx
│   │   ├── SwimSpas.jsx
│   │   └── ...
│   ├── data/              # JSON data files
│   │   ├── chemicals.json
│   │   ├── categories.json
│   │   ├── siteConfig.json
│   │   └── ...
│   ├── utils/             # Utility functions
│   │   ├── cart.js
│   │   ├── analytics.js
│   │   └── structuredData.js
│   ├── services/          # API services
│   │   └── api.js
│   └── App.jsx            # Root component
├── server/                # Backend API
│   ├── index.js          # Express server
│   └── package.json
├── scripts/              # Build scripts
│   └── generate-sitemap.js
├── public/
│   ├── robots.txt
│   └── sitemap.xml (generated)
└── package.json
```

## 🎯 Usage

### Products (Chemicals)
Products in the `chemicals.json` file can be purchased directly through the e-commerce flow:
1. Browse products at `/chemicals`
2. View product details at `/chemicals/:slug`
3. Add to cart
4. Proceed to checkout
5. Complete payment via Stripe

### Lead Generation (Hot Tubs/Saunas/Swim Spas)
High-value products trigger quote requests instead of direct purchases:
1. Browse products at `/hot-tubs`, `/saunas`, or `/swim-spas`
2. Click "Request Quote"
3. Fill out contact form
4. Sales team receives lead
5. Follow-up within 24 hours

## 🔄 API Endpoints

### Forms
- `POST /api/contact` - Contact form submission
- `POST /api/leads` - Lead generation
- `POST /api/newsletter` - Newsletter subscription
- `POST /api/quote` - Quote request
- `POST /api/book-showroom` - Showroom booking

### Payments
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/webhook` - Stripe webhook handler

## 🎨 Customization

### Colors
Edit color scheme in `tailwind.config.js` and throughout components:
- Primary: `#C9A968` (Gold)
- Secondary: `#E6D9C8` (Cream)
- Background: `#0B0B0C` (Dark)
- Text: `#F5F5F2` (Light)

### Site Configuration
Update `src/data/siteConfig.json`:
```json
{
  "brandName": "Your Brand",
  "phone": "+44...",
  "email": "info@...",
  "address": {...},
  "social": {...}
}
```

### Products
Add/edit products in `src/data/chemicals.json`:
```json
{
  "id": "chem-001",
  "title": "Product Name",
  "slug": "product-slug",
  "price": 29.99,
  "stock": 50,
  ...
}
```

## 📊 Analytics Setup

1. Get Google Tag Manager ID from console.google.com
2. Update `gtmId` in `src/data/siteConfig.json`
3. Events are automatically tracked:
   - Page views
   - Product views
   - Add to cart
   - Checkout initiation
   - Purchase completion
   - Form submissions

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy 'dist' folder
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd server
npm install
npm start
```

### Environment Variables
Set all environment variables in your hosting platform.

## 🔒 Security Checklist

- [ ] Update Stripe keys (use production keys)
- [ ] Set up Stripe webhooks
- [ ] Configure email service (SendGrid/Mailgun)
- [ ] Enable HTTPS
- [ ] Set up CSP headers
- [ ] Review rate limiting settings
- [ ] Set up error monitoring (Sentry)
- [ ] Enable database backups (if using DB)

## 🐛 Known Issues & TODOs

### To Implement
- [ ] Real image assets (currently using placeholders)
- [ ] Email service integration (SendGrid/Mailgun)
- [ ] Database for order persistence
- [ ] User authentication and accounts
- [ ] Order tracking system
- [ ] Admin dashboard
- [ ] Blog/CMS integration
- [ ] Multi-language support (i18n)
- [ ] Product reviews submission
- [ ] Live chat integration

### Testing
- [ ] Unit tests (Jest/Vitest)
- [ ] Integration tests
- [ ] E2E tests (Cypress/Playwright)

### Performance
- [ ] Image optimization (WebP, responsive images)
- [ ] Code splitting
- [ ] PWA implementation
- [ ] CDN setup

## 📝 License

This project is proprietary software for Lux Hydro Living.

## 💡 Support

For support, email info@luxhydroliving.com or visit /contact.

## 🎉 Credits

Built with modern web technologies and best practices.

- UI Components: Radix UI
- Icons: Lucide React
- Animations: Framer Motion
- Payments: Stripe
- Analytics: Google Tag Manager

---

**Version:** 1.0.0  
**Last Updated:** October 2025

>>>>>>> 9ad565f (Initial commit)
