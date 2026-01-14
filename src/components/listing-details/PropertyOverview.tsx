"use client";

interface PropertyOverviewProps {
    listing: any;
}

export default function PropertyOverview({ listing }: PropertyOverviewProps) {
    const { details } = listing;

    return (
        <section className="bg-white rounded-xl border border-warm-gray-200 p-6 md:p-8">
            <h3 className="text-[#111814] text-xl font-bold mb-6">Property Overview</h3>

            {/* Attributes Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-b border-warm-gray-200 pb-8">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">bed</span>
                    </div>
                    <div>
                        <p className="text-sm text-warm-gray-500">Bedrooms</p>
                        <p className="font-bold text-[#111814]">{listing.beds} Beds</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">bathtub</span>
                    </div>
                    <div>
                        <p className="text-sm text-warm-gray-500">Bathrooms</p>
                        <p className="font-bold text-[#111814]">{listing.baths} Baths</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">square_foot</span>
                    </div>
                    <div>
                        <p className="text-sm text-warm-gray-500">Total Area</p>
                        <p className="font-bold text-[#111814]">{listing.sqft.toLocaleString()} sqft</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">calendar_month</span>
                    </div>
                    <div>
                        <p className="text-sm text-warm-gray-500">Year Built</p>
                        <p className="font-bold text-[#111814]">{details.quickStats.yearBuilt || '2019'}</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none text-warm-gray-600 leading-relaxed">
                <p className="mb-4">
                    {details.description}
                </p>
            </div>
        </section>
    );
}
