import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { Suspense } from 'react';
import ListingsClient from '@/components/listings/ListingsClient';
import { Listing } from '@/types';

// Force dynamic rendering to avoid prerender issues with useSearchParams
export const dynamic = 'force-dynamic';

// Mock filters for now, or fetch from DB if we had a filters table. 
// Since filters are UI options, they can remain hardcoded or derived.
const FILTERS = {
    status: ["Active"], // Only Active properties are visible
    priceRange: ["Under $100k", "$100k - $500k", "$500k - $1M", "$1M+"],
    propertyType: ["Single Family", "Multi Family", "Commercial", "Land"],
    capRate: ["3% - 5%", "5% - 7%", "7% - 9%", "9%+"]
};

// Breadcrumbs data
const BREADCRUMBS = {
    breadcrumbs: [
        { label: "Marketplace", href: "/listings" },
        { label: "All Locations", href: "#" }
    ],
    title: "Investment Properties Marketplace",
    subtitle: "Browse our exclusive list of vetted investment opportunities.",
};

export default async function ListingsPage() {
    let listings: Listing[] = [];
    let count = "Loading...";

    try {
        const { data, error } = await supabase
            .from('listings')
            .select('*')
            .eq('property_status', 'Active');
        if (error) {
            console.error("Error fetching listings:", error);
        } else {
            listings = data as unknown as Listing[]; // Cast to Listing
            count = `${listings.length} Listings found`;
        }
    } catch (err) {
        console.error("Supabase client error:", err);
    }

    // fallback if no data or env vars missing (local dev without creds)
    if (listings.length === 0) {
        // Optional: We could fallback to empty array or show a message
    }

    return (
        <div className="bg-background-light min-h-screen">
            <div className="flex flex-1 justify-center py-5 px-4 md:px-8 lg:px-12">
                <div className="flex flex-col w-full max-w-[1280px] flex-1">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 px-4 py-2 text-sm">
                        {BREADCRUMBS.breadcrumbs.map((crumb, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Link
                                    href={crumb.href}
                                    className={`font-medium leading-normal hover:text-primary transition-colors ${index === BREADCRUMBS.breadcrumbs.length - 1 ? 'text-text-dark font-semibold' : 'text-warm-gray-500'}`}
                                >
                                    {crumb.label}
                                </Link>
                                {index < BREADCRUMBS.breadcrumbs.length - 1 && (
                                    <span className="text-warm-gray-500 font-medium leading-normal">/</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between items-end gap-3 px-4 py-4 mb-2">
                        <div className="flex min-w-72 flex-col gap-2">
                            <h1 className="text-text-dark text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.033em]">
                                {BREADCRUMBS.title}
                            </h1>
                            <p className="text-warm-gray-500 text-base font-normal leading-normal">
                                {count}
                            </p>
                        </div>
                        {/* <button className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
                            <span className="material-symbols-outlined text-sm">save</span> Save Search
                        </button> */}
                    </div>

                    <Suspense fallback={
                        <div className="flex justify-center items-center py-20">
                            <div className="text-warm-gray-500">Loading listings...</div>
                        </div>
                    }>
                        <ListingsClient
                            initialListings={listings}
                            filtersData={FILTERS}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
