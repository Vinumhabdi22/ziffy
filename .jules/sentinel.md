## 2025-01-31 - URL Scheme Validation
**Vulnerability:** Unvalidated URL scheme in `PropertyDetails.tsx` allowed potential XSS via `javascript:` links and arbitrary iframe embedding.
**Learning:** User or admin-supplied URLs must always be validated for protocol (http/https) before being used in `href` or `src` attributes. Simple strings can contain malicious schemes.
**Prevention:** Always use regex like `/^https?:\/\//i` to validate URLs. For iframes, strictly allow-list trusted domains (e.g. `google.com/maps/embed`).
