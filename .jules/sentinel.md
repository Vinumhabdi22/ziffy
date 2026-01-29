# Sentinel Journal

## 2024-05-22 - Missing Client-Side Validation & Anti-Spam
**Vulnerability:** Public contact form lacked strict schema validation and anti-spam measures, allowing potential bot spam directly into the Supabase database.
**Learning:** In `output: 'export'` Next.js apps with direct Supabase access, the lack of a backend API layer means client-side validation (Zod) and defensive UI patterns (Honeypot) are critical first steps before data hits the DB policies.
**Prevention:** Mandate Zod schemas for all public forms and include honeypot fields to filter automated spam at the client level.
