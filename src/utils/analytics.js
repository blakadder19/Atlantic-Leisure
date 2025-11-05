
// HORIZONS: Google Tag Manager and Analytics utilities

export const initGTM = (gtmId) => {
  if (!gtmId || gtmId === 'GTM-XXXXXXX') {
    console.warn('GTM ID not configured');
    return;
  }

  // Initialize GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
};

export const trackEvent = (eventName, eventData = {}) => {
  if (!window.dataLayer) {
    console.warn('GTM not initialized');
    return;
  }

  window.dataLayer.push({
    event: eventName,
    ...eventData
  });
};

// E-commerce tracking
export const trackViewItemList = (items, listName) => {
  trackEvent('view_item_list', {
    item_list_name: listName,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.title,
      price: item.price,
      item_category: item.category
    }))
  });
};

export const trackViewItem = (item) => {
  trackEvent('view_item', {
    items: [{
      item_id: item.id,
      item_name: item.title,
      price: item.price,
      item_category: item.category
    }]
  });
};

export const trackAddToCart = (item, quantity = 1) => {
  trackEvent('add_to_cart', {
    items: [{
      item_id: item.id,
      item_name: item.title,
      price: item.price,
      item_category: item.category,
      quantity: quantity
    }]
  });
};

export const trackBeginCheckout = (items, value) => {
  trackEvent('begin_checkout', {
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.title,
      price: item.price,
      quantity: item.quantity
    })),
    value: value
  });
};

export const trackPurchase = (orderId, items, value) => {
  trackEvent('purchase', {
    transaction_id: orderId,
    value: value,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.title,
      price: item.price,
      quantity: item.quantity
    }))
  });
};

// Lead generation tracking
export const trackLeadFormSubmit = (formType, formData) => {
  trackEvent('lead_form_submit', {
    form_type: formType,
    ...formData
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    click_location: window.location.pathname
  });
};

export const trackBookVisitSubmit = (visitData) => {
  trackEvent('book_visit_submit', {
    ...visitData
  });
};
  