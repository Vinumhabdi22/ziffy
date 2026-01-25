## 2024-05-23 - Contact Form Security Hardening
**Vulnerability:** Contact form lacked input validation and anti-spam protection, relying solely on basic HTML attributes and passing data directly to Supabase.
**Learning:** In a static export Next.js app (`output: 'export'`), traditional server-side validation (like Server Actions) is not available. Client-side validation (Zod) combined with RLS is critical.
**Prevention:** Always implement client-side validation using robust libraries (Zod) and simple anti-spam measures (honeypot) for forms in static sites before sending data to backend services.
