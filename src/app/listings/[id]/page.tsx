import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import ListingDetailsClient from '@/components/listing-details/ListingDetailsClient';

async function getData() {
    const filePath = path.join(process.cwd(), 'content', 'listings.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), 'content', 'listings.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return data.listings.map((listing: any) => ({
        id: listing.id,
    }));
}

export default async function ListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getData();
    const listing = data.listings.find((l: any) => l.id === id);

    if (!listing) {
        return <div className="p-24 text-center">Listing not found</div>;
    }

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
