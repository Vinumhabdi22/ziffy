# Sentinel Journal

## 2025-05-27 - Critical RLS Misconfiguration on PII Tables

**Vulnerability:**
I discovered that the Row Level Security (RLS) policies in `supabase/schema.sql` were configured with `using (true)` for `SELECT` operations on sensitive tables: `listing_inquiry`, `newsletter_subscriptions`, `partnership_leads`, `sfr_leads`, and `contact_inquiries`.

These tables contain Personally Identifiable Information (PII) such as names, emails, phone numbers, and messages. The configuration effectively made all this data publicly readable via the Supabase client API by any anonymous user.

**Learning:**
The comments in the SQL file indicated an intent to restrict access ("Create a policy that allows read access only to authenticated users"), but the implementation (`using (true)`) contradicted this. This highlights the danger of copy-pasting policies or using "permissive for now" defaults that get forgotten.

**Prevention:**
- Always default RLS policies to `false` (deny all) unless explicitly enabling a specific role.
- Never use `using (true)` for `SELECT` on tables containing user data unless the data is truly public (like `listings` or `faqs`).
- Verify RLS policies match the comments/intent.
- Use distinct policies for `anon` (public) and `authenticated` (logged in) roles if needed, but for contact forms, public read is almost never required.
