/**
 * Utility functions for generating and parsing listing URL slugs
 */

/**
 * Convert text to URL-safe format
 * - Lowercase
 * - Replace spaces and special characters with hyphens
 * - Remove multiple consecutive hyphens
 * - Remove leading/trailing hyphens
 */
export function urlSafe(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a URL slug from listing address components
 * Format: address-city-state-zipcode
 * Example: 123-main-street-new-york-ny-10001
 * Note: All components separated by single dashes. Parser uses right-to-left logic.
 */
export function generateListingSlug(
    address: string,
    city: string,
    state: string,
    zipcode: string
): string {
    const parts = [
        urlSafe(address),
        urlSafe(city),
        urlSafe(state),
        urlSafe(zipcode)
    ].filter(Boolean); // Remove empty parts

    return parts.join('-');
}

/**
 * Parse a listing slug back to address components
 * Returns an object with address, city, state, and zipcode
 * 
 * Parsing strategy: Split by '-' and parse from right to left
 * - Last part: zipcode
 * - Second to last: state
 * - Third to last: city
 * - Everything else joined: address
 */
export interface ParsedSlug {
    address: string;
    city: string;
    state: string;
    zipcode: string;
}

export function parseListingSlug(slug: string): ParsedSlug | null {
    try {
        // Decode URL-encoded characters
        const decodedSlug = decodeURIComponent(slug);

        // Split by - (single dash) to get all parts
        const parts = decodedSlug.split('-');

        if (parts.length < 4) {
            console.error('Invalid slug format, expected at least 4 parts:', slug);
            return null;
        }

        // Parse from right to left: zipcode, state, city, then address (everything else)
        const zipcode = parts[parts.length - 1];
        const state = parts[parts.length - 2];
        const city = parts[parts.length - 3];
        const address = parts.slice(0, parts.length - 3).join(' ');

        return {
            address,
            city,
            state,
            zipcode
        };
    } catch (error) {
        console.error('Error parsing slug:', error);
        return null;
    }
}
