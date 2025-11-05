import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = '', 
  description = '', 
  keywords = '',
  image = '',
  url = '',
  type = 'website',
  article,
  product,
  author = ''
}) => {
  // Hard-coded safe values
  const siteUrl = 'https://luxhydroliving.com';
  const brandName = 'Lux Hydro Living';
  const tagline = 'Premium Spas & Wellness';
  const defaultImage = siteUrl + '/og-image.jpg';
  
  // Force everything to be a string (no symbols, no objects)
  const str = (val) => {
    if (!val || val === null || val === undefined) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    return '';
  };
  
  // Build safe values
  const pageTitle = str(title);
  const pageDesc = str(description);
  const pageKeywords = str(keywords);
  const pageAuthor = str(author) || brandName;
  const pageUrl = str(url);
  const pageImage = str(image);
  
  // Final values
  const finalTitle = pageTitle ? `${pageTitle} | ${brandName}` : `${brandName} - ${tagline}`;
  const finalDescription = pageDesc || `${brandName} - ${tagline}`;
  const finalUrl = pageUrl ? `${siteUrl}${pageUrl}` : siteUrl;
  const finalImage = pageImage || defaultImage;

  // Product values (all safe strings)
  const productPrice = product && product.price ? String(product.price) : '';
  const productBrand = product && product.brand ? String(product.brand) : brandName;
  const productAvailability = product && product.inStock ? 'in stock' : 'out of stock';

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="author" content={pageAuthor} />
      <link rel="canonical" href={finalUrl} />
      
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_GB" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@luxhydroliving" />
      <meta name="twitter:creator" content="@luxhydroliving" />
      
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#C9A968" />
      
      {pageKeywords ? <meta name="keywords" content={pageKeywords} /> : null}
      
      {productPrice ? <meta property="product:price:amount" content={productPrice} /> : null}
      {product ? <meta property="product:price:currency" content="GBP" /> : null}
      {product ? <meta property="product:availability" content={productAvailability} /> : null}
      {product ? <meta property="product:condition" content="new" /> : null}
      {product ? <meta property="product:brand" content={productBrand} /> : null}
    </Helmet>
  );
};

export default SEO;
