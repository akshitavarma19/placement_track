import { useQuery } from '@tanstack/react-query';
// Removed apifyClient SDK import to prevent browser-side crashes


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
  const token = import.meta.env.VITE_APIFY_TOKEN;

  // Check if we have a valid token.
  if (!token || token === 'your_apify_token_here') {
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
    // 1. Run the actor
    const actorId = 'apify/google-jobs-scraper';
    const runResponse = await fetch(`https://api.apify.com/v2/acts/${actorId}/calls?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        queries: 'software engineer in India',
        maxPagesPerQuery: 1,
      }),
    });

    if (!runResponse.ok) {
      throw new Error(`Apify Actor Run failed: ${runResponse.statusText}`);
    }

    const { data: runData } = await runResponse.json();

    // 2. Fetch the dataset items
    const datasetUrl = `https://api.apify.com/v2/datasets/${runData.defaultDatasetId}/items?token=${token}`;
    const itemsResponse = await fetch(datasetUrl);
    
    if (!itemsResponse.ok) {
      throw new Error(`Apify Dataset fetch failed: ${itemsResponse.statusText}`);
    }

    const items = await itemsResponse.json();
    
    return items.map((item: any) => ({
      title: item.title,
      companyName: item.companyName || item.company,
      location: item.location,
      postedAt: item.postedAt || new Date().toISOString(),
      salary: item.salary,
      sector: item.sector || 'IT Services',
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
