## 2025-02-18 - Client-Side Honeypot
**Vulnerability:** Static sites with client-side form submissions are vulnerable to bot spam since there's no server-side middleware to filter requests before they reach the database (Supabase).
**Learning:** Standard rate-limiting or CAPTCHA might be too heavy or complex to integrate purely client-side without edge functions.
**Prevention:** Implement "Honeypot" fields—inputs hidden from real users via CSS (`opacity-0`, `absolute`, off-screen) but visible to bots scanning HTML. If filled, the client pretends to succeed but sends nothing.
