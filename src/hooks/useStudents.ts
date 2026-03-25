import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Student {
  id: string;
  name: string;
  branch: string;
  cgpa: number;
  status: string;
  company: string;
  package: string;
  year: number;
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .order('cgpa', { ascending: false });

        if (error) throw error;
        setStudents(data || []);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  return { students, loading, error };
}
