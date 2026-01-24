import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import ListingDetailsClient from '@/components/listing-details/ListingDetailsClient';
import { Listing } from '@/types';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    // For now we can skip static params or fetch all IDs from supabase if we want SSG.
    // Given we are moving to DB, we might want to stick to dynamic rendering or generate a few.
    // Let's return empty for now to allow dynamic generation on demand, or fetch IDs.
    try {
        const { data } = await supabase.from('listings').select('id');
        return (data || []).map((listing: { id: string }) => ({
            id: listing.id,
        }));
    } catch (error) {
        console.warn('Failed to generate static params:', error);
        return [];
    }
}

export default async function ListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch data from Supabase
    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error("Error fetching listing:", error);
        // return <div className="p-24 text-center">Listing not found</div>;
        notFound();
    }

    const listing = data as unknown as Listing;

    return (
        <>
            {/* Breadcrumbs - Keep Server Side for SEO */}
            <div className="bg-background-light max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center gap-2 text-sm text-warm-gray-500 mb-2 mt-4">
                    <Link href="/listings" className="hover:text-primary transition-colors">Marketplace</Link>
                    <span>/</span>
                    <Link href="#" className="hover:text-primary transition-colors">{listing.city}</Link>
                    <span>/</span>
                    <span className="font-semibold text-text-dark">Detail View</span>
                </div>
            </div>

            {/* Client Wrapper for stateful calculator */}
            <ListingDetailsClient listing={listing} />
        </>
    );
}
