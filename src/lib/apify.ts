import { ApifyClient } from 'apify-client';

const token = import.meta.env.VITE_APIFY_TOKEN;

if (!token) {
  console.warn('VITE_APIFY_TOKEN is not defined. Apify integration will not work.');
}

export const apifyClient = new ApifyClient({
  token: token || 'placeholder',
});
