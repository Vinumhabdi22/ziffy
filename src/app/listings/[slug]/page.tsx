import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import ListingDetailsClient from '@/components/listing-details/ListingDetailsClient';
import { Listing } from '@/types';
import { notFound } from 'next/navigation';
import { parseListingSlug, generateListingSlug } from '@/utils/listingUtils';
import { getCityDefaults } from '@/utils/cityDefaults';

export async function generateStaticParams() {
    // Fetch all listings and generate slugs for static generation
    const { data } = await supabase.from('listings').select('address, city, state, zipcode');
    return (data || []).map((listing: { address: string; city: string; state: string; zipcode: string }) => ({
        slug: generateListingSlug(listing.address, listing.city, listing.state, listing.zipcode),
    }));
}

export default async function ListingDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Parse the slug to get address components
    const parsed = parseListingSlug(slug);

    if (!parsed) {
        console.error("Invalid slug format:", slug);
        notFound();
    }

    // Fetch data from Supabase using address components
    // We'll query by matching all components for accuracy
    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .ilike('address', parsed.address)
        .ilike('city', parsed.city)
        .ilike('state', parsed.state)
        .ilike('zipcode', parsed.zipcode)
        .single();

    if (error || !data) {
        console.error("Error fetching listing:", error);
        notFound();
    }

    const listing = data as unknown as Listing;

    // Fetch city defaults
    const cityDefaults = await getCityDefaults(listing.city, listing.zipcode);

    return (
        <>
            {/* Breadcrumbs - Keep Server Side for SEO */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center gap-2 text-sm text-warm-gray-500 mb-2 mt-4">
                    <Link href="/listings" className="hover:text-primary transition-colors">Marketplace</Link>
                    <span>/</span>
                    <Link href="#" className="hover:text-primary transition-colors">{listing.city}</Link>
                    <span>/</span>
                    <span className="font-semibold text-text-dark">Detail View</span>
                </div>
            </div>

            {/* Client Wrapper for stateful calculator */}
            <ListingDetailsClient listing={listing} cityDefaults={cityDefaults} />
        </>
    );
}
