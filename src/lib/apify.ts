// Simple Apify configuration without Node.js dependencies
export const APIFY_TOKEN = import.meta.env.VITE_APIFY_TOKEN;

if (!APIFY_TOKEN) {
  console.warn('VITE_APIFY_TOKEN is not defined. Apify integration will not work.');
}

export const APIFY_API_BASE = 'https://api.apify.com/v2';
