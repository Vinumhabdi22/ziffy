## 2024-05-22 - Inconsistent Form Validation
**Vulnerability:** Forms in the application used a mix of manual validation (regex, if-checks) and Zod schema validation. Manual validation in `ContactClient.tsx` missed message length limits and allowed whitespace-only inputs.
**Learning:** Manual validation is prone to oversight and inconsistencies. Zod was already a dependency but not utilized in all forms.
**Prevention:** Standardize on Zod for all client-side form validation. Ensure `.trim()` is used for string fields to prevent whitespace bypass.
