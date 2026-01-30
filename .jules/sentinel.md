# Sentinel Journal

This journal tracks CRITICAL security learnings, vulnerability patterns, and architectural gaps found in the codebase.

## 2025-02-19 - Hardcoded Supabase Credentials
**Vulnerability:** A hardcoded Supabase Anon Key and URL were found in `supabase/test_rls_security.js`.
**Learning:** Test scripts committed to the repository can inadvertently expose secrets if not properly configured to use environment variables, often bypassing standard checks if they are standalone scripts.
**Prevention:** Always use environment variables (`process.env`) for secrets, even in test/utility scripts. Enforce code reviews on "utility" folders.
