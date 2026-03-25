import { useQuery } from '@tanstack/react-query';
import { apifyClient } from '@/lib/apify';

export interface JobPosting {
  title: string;
  companyName: string;
  location: string;
  postedAt: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  sector?: string;
  status: 'Active' | 'Completed' | 'Upcoming';
}

const fetchJobs = async (): Promise<JobPosting[]> => {
  // Check if we have a token. If not, return dummy data to prevent breaking the UI.
  if (import.meta.env.VITE_APIFY_TOKEN === 'your_apify_token_here' || !import.meta.env.VITE_APIFY_TOKEN) {
    console.warn('Apify token not set. Returning dummy data.');
    return [
      { companyName: "TCS", title: "Frontend Developer", location: "Bangalore", postedAt: "2024-03-20", status: "Active", sector: "IT Services" },
      { companyName: "Infosys", title: "Backend Engineer", location: "Pune", postedAt: "2024-03-18", status: "Active", sector: "IT Services" },
      { companyName: "Wipro", title: "Fullstack Dev", location: "Hyderabad", postedAt: "2024-03-15", status: "Active", sector: "IT Services" },
      { companyName: "Google", title: "Software Engineer", location: "Mountain View", postedAt: "2024-03-10", status: "Active", sector: "Product" },
      { companyName: "Microsoft", title: "Product Manager", location: "Redmond", postedAt: "2024-03-05", status: "Active", sector: "Product" },
    ];
  }

  try {
    // Example: Using Google Jobs Scraper
    // actorId: 'apify/google-jobs-scraper'
    // This is just a representation, actual configuration would depend on the actor.
    const run = await apifyClient.actor('apify/google-jobs-scraper').call({
      queries: 'software engineer in India',
      maxPagesPerQuery: 1,
    });

    const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
    
    return items.map((item: Record<string, unknown>) => ({
      title: item.title as string,
      companyName: (item.companyName || item.company) as string,
      location: item.location as string,
      postedAt: (item.postedAt || new Date().toISOString()) as string,
      salary: item.salary as JobPosting['salary'],
      sector: (item.sector || 'IT Services') as string,
      status: 'Active',
    }));
  } catch (error) {
    console.error('Error fetching jobs from Apify:', error);
    throw error;
  }
};

export function useJobMarket() {
  return useQuery({
    queryKey: ['jobMarket'],
    queryFn: fetchJobs,
  });
}
