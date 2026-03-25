import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Skill {
  id: string;
  name: string;
  demand: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
  students_count: number;
  growth_rate: string;
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('demand', { ascending: false });

        if (error) throw error;
        setSkills(data || []);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return { skills, loading, error };
}
