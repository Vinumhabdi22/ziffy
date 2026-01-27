## 2025-02-18 - Client-Side Spam Protection in Static Exports
**Vulnerability:** Contact forms in static exports are vulnerable to spam bots because they cannot rely on server-side middleware for initial filtering.
**Learning:** In a static export (Next.js `output: 'export'`), server actions and API routes are not available. Validation must happen on the client or the external service (Supabase).
**Prevention:**
1. Use client-side Zod validation to ensure data integrity before network requests.
2. Implement "Honeypot" fields (hidden inputs that bots fill but humans don't) to trap automated scripts.
3. Silently fail (pretend success) when honeypot is triggered to avoid giving feedback to attackers.
