import Link from "next/link";
import { Listing } from "@/types";
import { generateListingSlug } from "@/utils/listingUtils";

interface FeaturedListingsProps {
    data: {
        header: {
            subtitle: string;
            title: string;
            ctaText: string;
            ctaLink: string;
        };
        // items is legacy, we now use listings prop mainly, 
        // but keeping structure compatible with page.tsx usage if needed or refactoring page.tsx
    };
    listings: Listing[];
}

export default function FeaturedListings({ data, listings }: FeaturedListingsProps) {
    if (!data) return null;

    // Helper to calculate Cap Rate if missing (Simplified NOI / Price)
    const getCapRate = (listing: Listing) => {
        if (listing.capRate) return listing.capRate;

        const annualRent = (listing.estimated_rent || 0) * 12;
        const annualExpenses = (listing.expense_tax || 0) + (listing.expense_insurance || 0) + (listing.expense_maintenance || 0) + (listing.expense_management || 0);
        const noi = annualRent - annualExpenses;
        const cap = listing.price ? (noi / listing.price) * 100 : 0;
        return `${cap.toFixed(1)}%`;
    };

    const formatCurrency = (val: number) => val?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }) || '$0';

    return (
        <section className="pt-16 md:pt-20 pb-4 md:pb-6 bg-[#F5F5F7]">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex items-start justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] tracking-tight leading-tight">
                            {data.header.title}
                        </h2>
                    </div>
                    <Link
                        className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                        href={data.header.ctaLink}
                    >
                        {data.header.ctaText}
                        <span className="material-symbols-outlined text-base">
                            arrow_forward
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {listings.map((item) => (
                        <Link
                            href={`/listings/${generateListingSlug(item.address, item.city, item.state, item.zipcode)}`}
                            key={item.id}
                            className="group cursor-pointer flex flex-col bg-white rounded-3xl overflow-hidden border border-warm-gray-200 hover:border-emerald-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-accent/10 hover:-translate-y-2"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                {item.badge && (
                                    <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 shadow-sm ${item.badge === "New Listing"
                                        ? "bg-white/90 backdrop-blur-md text-text-dark border border-warm-gray-200"
                                        : item.badge === "AI-Verified"
                                            ? "bg-teal-500/95 text-white backdrop-blur-sm"
                                            : "bg-indigo-600/95 text-white backdrop-blur-sm"
                                        }`}>
                                        {item.badge === "New Listing" && <span className="size-2 rounded-full bg-emerald-accent animate-pulse"></span>}
                                        {item.badge === "AI-Verified" && <span className="material-symbols-outlined text-[16px]">verified</span>}
                                        {item.badge === "High Yield" && <span className="material-symbols-outlined text-[16px]">trending_up</span>}
                                        {item.badge}
                                    </div>
                                )}
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url("${item.image}")`,
                                    }}
                                ></div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                                    <p className="text-white font-bold text-xl">{formatCurrency(item.price)}</p>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                <div>
                                    <h4 className="font-bold text-text-dark text-lg truncate">
                                        {item.title}
                                    </h4>
                                    <p className="text-warm-gray-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">
                                            location_on
                                        </span>{" "}
                                        {item.city}, {item.state}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 py-4 border-y border-warm-gray-200">
                                    <div>
                                        <p className="text-[11px] text-warm-gray-400 uppercase font-bold">
                                            Cap Rate
                                        </p>
                                        <p className="text-emerald-accent font-bold text-xl">{getCapRate(item)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-warm-gray-400 uppercase font-bold">
                                            Est. Rent
                                        </p>
                                        <p className="text-text-dark font-bold text-xl">
                                            {formatCurrency(item.estimated_rent || 0)}
                                            <span className="text-sm font-normal text-warm-gray-400">
                                                /mo
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-warm-gray-500 font-medium">
                                    <span>{item.beds} Beds</span>
                                    <span>•</span>
                                    <span>{item.baths} Baths</span>
                                    <span>•</span>
                                    <span>{item.sqft.toLocaleString()} sqft</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-12 md:hidden text-center">
                    <Link href={data.header.ctaLink} className="w-full py-3 rounded-xl border border-warm-gray-300 text-sm font-bold text-text-dark inline-block">
                        {data.header.ctaText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
