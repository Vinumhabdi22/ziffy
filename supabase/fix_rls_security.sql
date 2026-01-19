-- ==================================================================
-- RLS Security Fix: Remove Public Read Access from User Data Tables
-- ==================================================================
-- 
-- CRITICAL SECURITY FIX
-- This script removes public read access from tables containing
-- sensitive user PII data (names, emails, phone numbers, messages).
--
-- WHAT THIS FIXES:
-- Previously, anyone could query the Supabase API and retrieve ALL
-- user data from these tables without authentication using the
-- anon key due to RLS policies with `using (true)`.
--
-- AFTER THIS FIX:
-- - Only the service_role key can read data from these tables
-- - Public users can still INSERT data (forms still work)
-- - No frontend code changes needed
-- ==================================================================

-- Drop vulnerable public read policies
-- ---------------------------------------------------------------------

-- Table: listing_inquiry
DROP POLICY IF EXISTS "Allow public read access" ON listing_inquiry;

-- Table: newsletter_subscriptions  
DROP POLICY IF EXISTS "Allow staff read access" ON newsletter_subscriptions;

-- Table: partnership_leads
DROP POLICY IF EXISTS "Allow staff read access" ON partnership_leads;

-- Table: sfr_leads
DROP POLICY IF EXISTS "Allow staff read access" ON sfr_leads;

-- Table: contact_inquiries
DROP POLICY IF EXISTS "Allow staff read access" ON contact_inquiries;

-- ==================================================================
-- VERIFICATION
-- ==================================================================
-- After running this script, verify the following:
--
-- 1. Public read access is blocked:
--    Try querying any of these tables with the anon key.
--    You should get a permission error.
--
-- 2. Forms still work:
--    Test all 5 forms on the website to ensure data can still be
--    inserted (INSERT policies remain active).
--
-- 3. Only service_role can read:
--    In Supabase Dashboard, you can view the data using the
--    Table Editor (which uses service_role automatically).
-- ==================================================================
