import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Company {
  id: string;
  name: string;
  sector: string;
  offers: number;
  avg_package: string;
  status: string;
  visits: number;
  mode: string;
}

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('offers', { ascending: false });

        if (error) throw error;
        setCompanies(data || []);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  return { companies, loading, error };
}
