## 2026-01-29 - Secure Static Form Submission
**Vulnerability:** Static exports cannot use server-side API routes for validation, leaving direct database calls exposed to spam and invalid data if not protected.
**Learning:** For Next.js static exports (`output: 'export'`), validation must happen on the client side using robust libraries like Zod before making requests to backend services (Supabase).
**Prevention:** Implement strict Zod schema validation and anti-spam honeypot fields on the client side. Ensure the honeypot is hidden from users but visible to bots, and silently reject submissions where it is filled.
