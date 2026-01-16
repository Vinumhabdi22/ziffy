import PropertyCard from './PropertyCard';
import { Listing } from '@/types';

interface PropertyGridProps {
    listings: Listing[];
}

export default function PropertyGrid({ listings }: PropertyGridProps) {
    if (!listings) return null;

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
            ))}
        </div>
    );
}
