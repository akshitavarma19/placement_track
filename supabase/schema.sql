-- Create students table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    branch TEXT NOT NULL,
    cgpa NUMERIC(3,1) NOT NULL,
    status TEXT NOT NULL,
    company TEXT,
    package TEXT,
    year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    sector TEXT NOT NULL,
    offers INTEGER NOT NULL,
    avg_package TEXT NOT NULL,
    status TEXT NOT NULL,
    visits INTEGER NOT NULL,
    mode TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert dummy data into students
INSERT INTO public.students (name, branch, cgpa, status, company, package, year) VALUES
('Aarav Sharma', 'CSE', 9.1, 'Placed', 'Google', '₹28L', 2024),
('Priya Mehta', 'ECE', 8.7, 'Placed', 'Microsoft', '₹22L', 2024),
('Rohan Verma', 'CSE', 8.4, 'Placed', 'TCS', '₹7.5L', 2024),
('Sneha Patel', 'IT', 8.9, 'Placed', 'Infosys', '₹6.5L', 2024),
('Karan Singh', 'ME', 7.8, 'Un-placed', '—', '—', 2024),
('Anjali Joshi', 'CSE', 9.3, 'Placed', 'Amazon', '₹32L', 2024),
('Dev Nair', 'CSE', 8.0, 'Placed', 'Wipro', '₹5.5L', 2024),
('Meera Iyer', 'IT', 7.5, 'Un-placed', '—', '—', 2024),
('Arjun Reddy', 'ECE', 8.2, 'Placed', 'Cognizant', '₹5L', 2024),
('Pooja Gupta', 'CSE', 9.0, 'Placed', 'Adobe', '₹18L', 2024);

-- Insert dummy data into companies
INSERT INTO public.companies (name, sector, offers, avg_package, status, visits, mode) VALUES
('TCS', 'IT Services', 142, '₹7.5L', 'Active', 3, 'On-Campus'),
('Infosys', 'IT Services', 98, '₹6.5L', 'Active', 2, 'On-Campus'),
('Wipro', 'IT Services', 76, '₹5.5L', 'Active', 2, 'On-Campus'),
('Cognizant', 'IT Services', 64, '₹5L', 'Completed', 1, 'On-Campus'),
('Accenture', 'Consulting', 52, '₹8L', 'Active', 2, 'Hybrid'),
('Capgemini', 'IT Services', 41, '₹5.8L', 'Upcoming', 0, 'On-Campus'),
('Google', 'Product', 4, '₹28L', 'Completed', 1, 'Virtual'),
('Microsoft', 'Product', 6, '₹22L', 'Completed', 1, 'Virtual'),
('Amazon', 'E-Commerce', 8, '₹32L', 'Completed', 1, 'Virtual'),
('Adobe', 'Product', 5, '₹18L', 'Upcoming', 0, 'Virtual');

-- Set up Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to SELECT from these tables
CREATE POLICY "Allow authenticated read access to students" ON public.students FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access to companies" ON public.companies FOR SELECT TO authenticated USING (true);
