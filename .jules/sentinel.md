## 2025-02-18 - Unrestricted Input & Bot Vulnerability in Contact Form

**Vulnerability:** The public contact form (`ContactClient.tsx`) accepted user input without maximum length limits or rigorous validation and sent it directly to Supabase. It also lacked any bot protection (honeypot/CAPTCHA). This exposed the application to Denial of Service (DoS) via large payloads, database flooding, and spam.

**Learning:** When using "Client-side to Database" patterns (like Supabase client in React), relying solely on RLS (Row Level Security) is insufficient for preventing spam or resource exhaustion. The client application must act as the first line of defense.

**Prevention:**
1. **Schema Validation:** Use libraries like `zod` to enforce strict types, formats (email), and length limits on all inputs.
2. **Defense in Depth:** Implement "Honeypot" fields (hidden inputs that bots fill but humans don't) to silently reject bot traffic without impacting UX.
3. **Fail Safe:** Ensure validation logic runs *before* any network request is attempted.
