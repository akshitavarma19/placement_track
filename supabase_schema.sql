-- SQL Schema for Placement Tracker

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  branch TEXT NOT NULL,
  cgpa DECIMAL(4,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Un-placed',
  company TEXT DEFAULT '—',
  package TEXT DEFAULT '—',
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Companies Table
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  offers INTEGER DEFAULT 0,
  avg_package TEXT DEFAULT '0L',
  status TEXT DEFAULT 'Active',
  visits INTEGER DEFAULT 0,
  mode TEXT DEFAULT 'In-person',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  demand INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  trend TEXT DEFAULT 'stable',
  students_count INTEGER DEFAULT 0,
  growth_rate TEXT DEFAULT '0%',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create Policies (allow all authenticated users to read for now)
CREATE POLICY "Allow authenticated read access" ON students FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON companies FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON skills FOR SELECT USING (auth.role() = 'authenticated');
