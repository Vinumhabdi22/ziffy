-- Create listings table
create table listings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  address text not null,
  city text not null,
  state text not null,
  zipcode text not null,
  price numeric not null,
  beds numeric not null,
  baths numeric not null,
  sqft numeric not null,
  year_built numeric not null,
  property_type text not null,
  badge text,
  badge_color text,
  gallery text[] default '{}',
  image text not null,
  description text not null,
  features text[] default '{}',
  map_url text,
  
  -- Financials
  estimated_rent numeric not null,
  expense_tax numeric default 0,
  expense_insurance numeric default 0,
  expense_maintenance numeric default 0,
  expense_management numeric default 0,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table listings enable row level security;

-- Create a policy that allows anyone to read
create policy "Allow public read access"
  on listings
  for select
  using (true);

-- Insert sample data
insert into listings (
  title, address, city, state, zipcode, price, beds, baths, sqft, year_built, property_type, 
  badge, badge_color, gallery, image, description, features, estimated_rent, 
  expense_tax, expense_insurance, expense_maintenance, expense_management
) values
(
  'Modern Geometric Villa', '123 Main St', 'Brooklyn', 'NY', '11201', 850000, 3, 2, 1200, 2015, 'Single Family',
  'AI-Verified', 'teal', 
  ARRAY['/images/listings/prop1.jpg', '/images/listings/prop2.jpg', '/images/listings/prop3.jpg'],
  '/images/listings/prop1.jpg',
  'This stunning renovated single-family home in the heart of Brooklyn offers a perfect blend of modern luxury and classic charm.',
  ARRAY['Central Air Conditioning', 'Hardwood Floors', 'Stainless Steel Appliances', 'Private Backyard'],
  4200, 6500, 1200, 2500, 4000
),
(
  'Luxury Glass Estate', '45 Park Avenue', 'Manhattan', 'NY', '10016', 1200000, 2, 2, 950, 2018, 'Condo',
  'High Yield', 'indigo',
  ARRAY['/images/listings/prop2.jpg', '/images/listings/prop3.jpg', '/images/listings/prop4.jpg'],
  '/images/listings/prop2.jpg',
  'Luxurious Park Avenue condo with breathtaking city views.',
  ARRAY['Doorman Building', 'Gym & Fitness Center', 'Rooftop Lounge', 'Floor-to-Ceiling Windows'],
  5800, 12000, 1500, 3000, 5100
);

-- Create listing_inquiry table
create table listing_inquiry (
  id uuid default gen_random_uuid() primary key,
  property_title text not null,
  property_address text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  message text not null,
  investment_timeline text, -- Optional as it might be added later or part of message, but better to have column if we add select support
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table listing_inquiry enable row level security;

-- Create a policy that allows anyone to insert (public form)
create policy "Allow public insert access"
  on listing_inquiry
  for insert
  with check (true);

-- Create a policy that allows read access only to authenticated users (admins/staff) - generic for now, typically restricted
-- Create a policy that allows read access only to authenticated users (admins/staff)
-- SECURE: Prevent public read access to PII
create policy "Allow staff read access"
  on listing_inquiry
  for select
  using (false);

-- Create newsletter_subscriptions table
create table newsletter_subscriptions (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  interests text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table newsletter_subscriptions enable row level security;

-- Create a policy that allows anyone to insert (public form)
create policy "Allow public insert access"
  on newsletter_subscriptions
  for insert
  with check (true);

-- Create a policy that allows read access only to authenticated users (admins/staff)
-- SECURE: Prevent public read access to PII
create policy "Allow staff read access"
  on newsletter_subscriptions
  for select
  using (false);

-- Create partnership_leads table
create table partnership_leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  budget text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table partnership_leads enable row level security;

-- Create a policy that allows anyone to insert (public form)
create policy "Allow public insert access"
  on partnership_leads
  for insert
  with check (true);

-- Create a policy that allows read access only to authenticated users (admins/staff)
-- SECURE: Prevent public read access to PII
create policy "Allow staff read access"
  on partnership_leads
  for select
  using (false);

-- Create sfr_leads table
create table sfr_leads (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  investment_target text not null,
  is_accredited boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table sfr_leads enable row level security;

-- Create a policy that allows anyone to insert (public form)
create policy "Allow public insert access"
  on sfr_leads
  for insert
  with check (true);


-- Create a policy that allows read access only to authenticated users (admins/staff)
-- SECURE: Prevent public read access to PII
create policy "Allow staff read access"
  on sfr_leads
  for select
  using (false);

-- Create faqs table
create table faqs (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  answer text not null,
  display_order numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table faqs enable row level security;

-- Create a policy that allows anyone to read
create policy "Allow public read access"
  on faqs
  for select
  using (true);

-- Insert sample data
insert into faqs (question, answer, display_order) values
('What is Ziffy AI?', 'Ziffy AI is a platform that uses artificial intelligence to help you find the best real estate investment opportunities.', 1),
('How do I start investing?', 'Simply browse our marketplace, select a property that fits your criteria, and click "Request Details".', 2),
('Are the listings verified?', 'Yes, all our listings are verified by our team and our AI algorithms.', 3);

-- Create contact_inquiries table
create table contact_inquiries (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  investment_goal text not null,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table contact_inquiries enable row level security;

-- Create a policy that allows anyone to insert (public form)
create policy "Allow public insert access"
  on contact_inquiries
  for insert
  with check (true);

-- Create a policy that allows read access only to authenticated users (admins/staff)
-- SECURE: Prevent public read access to PII
create policy "Allow staff read access"
  on contact_inquiries
  for select
  using (false);

