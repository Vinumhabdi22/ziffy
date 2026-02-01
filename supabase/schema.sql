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
  expense_hoa numeric default 0,
  expense_utilities numeric default 0,
  expense_gardener numeric default 0,
  expense_trash numeric default 0,
  
  -- Facts & Features - General Information
  architectural_style text default 'N/A',
  building_area text default 'N/A',
  living_area text default 'N/A',
  property_condition text default 'N/A',
  
  -- Facts & Features - Features & Amenities
  heating text default 'N/A',
  cooling text default 'N/A',
  flooring text default 'N/A',
  interior_features text default 'N/A',
  exterior_features text default 'N/A',
  parking text default 'N/A',
  
  -- Facts & Features - Location Details
  subdivision text default 'N/A',
  lot_size text default 'N/A',
  lot_features text default 'N/A',
  view text default 'N/A',
  
  -- Facts & Features - HOA & Fees
  hoa_fee text default 'N/A',
  association_fee text default 'N/A',
  fees_dues text default 'N/A',
  association_amenities text default 'N/A',
  fee_includes text default 'N/A',
  
  -- Facts & Features - Utilities
  utilities text default 'N/A',
  sewer text default 'N/A',
  water_source text default 'N/A',
  road_surface_type text default 'N/A',
  
  -- Facts & Features - School Information
  elementary_school text default 'N/A',
  middle_school text default 'N/A',
  high_school text default 'N/A',
  
  -- Closing Costs
  closing_costs_percentage numeric,
  
  -- Financial Valuation Fields
  -- Financial Valuation Fields
  estimated_market_value numeric default 0,
  estimated_rehab_cost numeric default 0,
  stabilized_market_value numeric default 0,

  -- Featured Status
  is_featured boolean default false,
  property_status text default 'Draft' check (property_status in ('Draft', 'Active', 'Pending', 'Sold')),
  
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
  expense_tax, expense_insurance, expense_maintenance, expense_management,
  architectural_style, building_area, living_area, property_condition,
  heating, cooling, flooring, interior_features, exterior_features, parking,
  subdivision, lot_size, lot_features, view,
  hoa_fee, association_fee, fees_dues, association_amenities, fee_includes,
  utilities, sewer, water_source, road_surface_type,
  elementary_school, middle_school, high_school,
  estimated_market_value, estimated_rehab_cost, stabilized_market_value,
  is_featured,
  property_status
) values
(
  'Modern Geometric Villa', '123 Main St', 'Brooklyn', 'NY', '11201', 850000, 3, 2, 1200, 2015, 'Single Family',
  'AI-Verified', 'teal', 
  ARRAY['/images/listings/prop1.jpg', '/images/listings/prop2.jpg', '/images/listings/prop3.jpg'],
  '/images/listings/prop1.jpg',
  'This stunning renovated single-family home in the heart of Brooklyn offers a perfect blend of modern luxury and classic charm.',
  ARRAY['Central Air Conditioning', 'Hardwood Floors', 'Stainless Steel Appliances', 'Private Backyard'],
  4200, 6500, 1200, 2500, 4000,
  'Contemporary', '1,350 sq ft', '1,200 sq ft', 'Excellent',
  'Central Forced Air', 'Central Air', 'Hardwood', 'Open Floor Plan, High Ceilings', 'Fenced Yard, Patio', 'Attached Garage, Driveway',
  'Park Slope Historic District', '9,016 sq ft', 'Corner Lot, Level', 'City Skyline',
  '$250/month', 'N/A', '$250/month', 'Community Garden, Playground', 'Maintenance, Snow Removal',
  'All Public', 'Public Sewer', 'Municipal', 'Paved',
  'PS 321 Brooklyn', 'William Alexander Middle School', 'Berkeley Carroll School',
  850000, 0, 850000,
  true,
  'Active'
),
(
  'Luxury Glass Estate', '45 Park Avenue', 'Manhattan', 'NY', '10016', 1200000, 2, 2, 950, 2018, 'Condo',
  'High Yield', 'indigo',
  ARRAY['/images/listings/prop2.jpg', '/images/listings/prop3.jpg', '/images/listings/prop4.jpg'],
  '/images/listings/prop2.jpg',
  'Luxurious Park Avenue condo with breathtaking city views.',
  ARRAY['Doorman Building', 'Gym & Fitness Center', 'Rooftop Lounge', 'Floor-to-Ceiling Windows'],
  12000, 1500, 3000, 5100,5800,
  'Modern Glass & Steel', '1,050 sq ft', '950 sq ft', 'Move-in Ready',
  'Central HVAC', 'Central Air, Floor Heating', 'Marble, Hardwood', 'Smart Home System, Walk-in Closets', 'Balcony, Concierge', 'Valet Parking, Underground Garage',
  'Murray Hill', 'N/A (High-Rise Condo)', 'N/A', 'Panoramic City Views',
  '$1,200/month', '$1,200/month', '$1,200/month', 'Doorman, Gym, Rooftop Terrace, Pool', 'All Utilities, Concierge',
  'All Included', 'Building System', 'Building System', 'N/A',
  'PS 116 Manhattan', 'The Salk School of Science', 'Stuyvesant High School',
  1250000, 25000, 1250000,
  true,
  'Active'
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

-- SECURITY: No public read access - only service_role can read PII data
-- Public users can still insert inquiries via the form (see "Allow public insert access" policy above)

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

-- SECURITY: No public read access - only service_role can read email addresses
-- Public users can still subscribe via the form (see "Allow public insert access" policy above)

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

-- SECURITY: No public read access - only service_role can read lead data
-- Public users can still submit leads via the form (see "Allow public insert access" policy above)

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


-- SECURITY: No public read access - only service_role can read lead data
-- Public users can still submit leads via the form (see "Allow public insert access" policy above)

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
('What is Trustreet?', 'Trustreet is a platform that uses artificial intelligence to help you find the best real estate investment opportunities.', 1),
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

-- SECURITY: No public read access - only service_role can read contact data
-- Public users can still submit inquiries via the form (see "Allow public insert access" policy above)


-- Create city_defaults table
create table city_defaults (
  city_id numeric primary key,
  city_name text not null,
  state_code text not null,
  zip_code text not null,
  property_tax_rate numeric not null,
  insurance_rate numeric not null,
  avg_appreciation_rate numeric not null,
  avg_rent_growth_rate numeric not null,
  vacancy_rate numeric not null,
  property_management_rate numeric not null,
  maintenance_rate numeric not null,
  capex_reserve_rate numeric not null,
  avg_market_cap_rate numeric not null,
  median_home_price numeric not null,
  median_rent numeric not null,
  rent_to_price_ratio numeric not null,
  population_growth_rate numeric not null,
  job_growth_rate numeric not null,
  last_updated text not null,
  data_source text not null,
  closing_costs_percentage numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table city_defaults enable row level security;

-- Create a policy that allows anyone to read
create policy "Allow public read access"
  on city_defaults
  for select
  using (true);

-- Insert initial data
insert into city_defaults (
  city_id, city_name, state_code, zip_code,
  property_tax_rate, insurance_rate, avg_appreciation_rate, avg_rent_growth_rate,
  vacancy_rate, property_management_rate, maintenance_rate, capex_reserve_rate,
  avg_market_cap_rate, median_home_price, median_rent, rent_to_price_ratio,
  population_growth_rate, job_growth_rate, last_updated, data_source, closing_costs_percentage
) values
(
  0, 'National Average', 'US', '00000',
  0.012, 0.005, 0.035, 0.03,
  0.05, 0.08, 0.05, 0.05,
  0.06, 400000, 2000, 0.005,
  0.01, 0.015, '2026-01-31', 'Trustreet Internal', 0.03
),
(
  101, 'Somerville', 'TN', '38135',
  0.0065, 0.0040, 0.030, 0.020,
  0.050, 0.080, 0.050, 0.050,
  0.075, 350000, 1800, 0.062,
  0.015, 0.020, '2026-01-15', 'internal assumptions', 0.02
),
(
  102, 'Brooklyn', 'NY', '11201',
  0.019, 0.006, 0.045, 0.035,
  0.03, 0.06, 0.04, 0.04,
  0.045, 950000, 3500, 0.044,
  0.005, 0.025, '2026-01-31', 'Trustreet Internal', 0.04
),
(
  103, 'Manhattan', 'NY', '10016',
  0.020, 0.005, 0.040, 0.040,
  0.04, 0.05, 0.03, 0.03,
  0.04, 1300000, 4200, 0.038, -0.01, 0.02, '2026-01-31', 'Trustreet Internal', 0.05
);
