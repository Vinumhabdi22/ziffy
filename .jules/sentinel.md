## 2026-01-22 - Public Form Spam Protection
**Vulnerability:** Public forms (Contact, Leads) write directly to Supabase with `check (true)` RLS policies, making them susceptible to spam bots.
**Learning:** Static exports cannot use server-side middleware for spam protection easily. Client-side honeypots provide a lightweight defense mechanism compatible with Supabase direct inserts.
**Prevention:** Implemented a hidden `confirm_email` field. If filled, the submission is silently rejected (simulating success) to confuse bots and prevent database pollution.
