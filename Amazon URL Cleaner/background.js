// Listen for navigation events on Amazon domains
chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    // Only process main frame navigations (not iframes)
    if (details.frameId !== 0) return;
    
    const url = new URL(details.url);
    
    // Check if it's an Amazon product page with /dp/ or /product/ in the path
    const dpMatch = url.pathname.match(/\/(?:dp|product)\/([A-Z0-9]{10})/);
    
    if (dpMatch) {
      const asin = dpMatch[1];
      const cleanUrl = `${url.protocol}//${url.hostname}/dp/${asin}`;
      
      // Only redirect if the URL is different from the clean version
      if (details.url !== cleanUrl) {
        chrome.tabs.update(details.tabId, { url: cleanUrl });
      }
    }
  },
  {
    url: [
      { hostSuffix: 'amazon.ae' },
      { hostSuffix: 'amazon.ca' },
      { hostSuffix: 'amazon.co.jp' },
      { hostSuffix: 'amazon.co.uk' },
      { hostSuffix: 'amazon.co.za' },
      { hostSuffix: 'amazon.com' },
      { hostSuffix: 'amazon.com.au' },
      { hostSuffix: 'amazon.com.be' },
      { hostSuffix: 'amazon.com.br' },
      { hostSuffix: 'amazon.com.tr' },
      { hostSuffix: 'amazon.com.mx' },
      { hostSuffix: 'amazon.de' },
      { hostSuffix: 'amazon.es' },
      { hostSuffix: 'amazon.eg' },
      { hostSuffix: 'amazon.fr' },
      { hostSuffix: 'amazon.in' },
      { hostSuffix: 'amazon.ie' },
      { hostSuffix: 'amazon.it' },
      { hostSuffix: 'amazon.nl' },
      { hostSuffix: 'amazon.pl' },
      { hostSuffix: 'amazon.sa' },
      { hostSuffix: 'amazon.se' },
      { hostSuffix: 'amazon.sg' }
    ]
  }
);