## 2026-01-23 - Client-Side Honeypots for Static Sites
**Vulnerability:** Automated form spam on static sites without server-side rate limiting.
**Learning:** Static sites (Next.js output: export) cannot easily implement server-side middleware for spam protection. Reliance on third-party APIs (Supabase) means the client talks directly to the DB, bypassing traditional backend protections.
**Prevention:** Implement client-side honeypots (hidden fields) that bots fill but humans don't. While not fool-proof, it significantly reduces low-effort bot spam without requiring edge functions or backend proxies.
