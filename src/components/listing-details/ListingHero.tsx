"use client";

import { Listing, InvestmentMetrics } from '@/types';

interface ListingHeroProps {
    listing: Listing;
    metrics?: InvestmentMetrics;
}

export default function ListingHero({ listing, metrics }: ListingHeroProps) {
    // const { details } = listing;
    // const [selectedImage, setSelectedImage] = useState(0);

    const formattedPrice = listing.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    const pricePerSqft = listing.sqft ? Math.round(listing.price / listing.sqft) : 0;
    const estRent = listing.estimated_rent ? listing.estimated_rent.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : "$0";

    return (
        <section className="mb-6">
            {/* Header & Actions */}
            <div className="flex flex-col gap-6 mb-8">

                {/* Property Details Bar */}
                <div className="bg-white border border-warm-gray-200 rounded-xl px-4 md:px-8 py-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
                        <div className="space-y-1 text-left w-full md:w-auto">
                            <h1 className="text-xl md:text-2xl font-bold text-[#111814]">
                                {listing.address}, <span className="text-warm-gray-400 font-normal block sm:inline">{listing.city}, {listing.state} {listing.zipcode}</span>
                            </h1>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-warm-gray-100"></div>
                        <div className="flex flex-wrap justify-start items-center gap-4 md:gap-6 w-full md:w-auto">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-warm-gray-400 text-lg">bed</span>
                                <span className="text-sm font-semibold text-[#111814]">{listing.beds} <span className="text-warm-gray-400 font-normal">Beds</span></span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-warm-gray-100"></div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-warm-gray-400 text-lg">bathtub</span>
                                <span className="text-sm font-semibold text-[#111814]">{listing.baths} <span className="text-warm-gray-400 font-normal">Baths</span></span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-warm-gray-100"></div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-warm-gray-400 text-lg">square_foot</span>
                                <span className="text-sm font-semibold text-[#111814]">{listing.sqft.toLocaleString()} <span className="text-warm-gray-400 font-normal">Sqft</span></span>
                            </div>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 py-2.5 border border-warm-gray-200 rounded-lg text-sm font-bold text-[#111814] hover:bg-warm-gray-50 transition-colors bg-white shadow-sm cursor-pointer w-full md:w-auto">
                        <span className="material-symbols-outlined text-[20px] fill-current text-red-500">favorite</span>
                        Save Asset
                    </button>
                </div>



                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Listing Price Badge */}
                    <div className="flex flex-col justify-center p-4 rounded-xl border border-warm-gray-200 bg-white shadow-sm items-start">
                        <span className="text-sm text-warm-gray-500">Listing Price</span>
                        <div className="text-2xl font-bold text-[#137fec] mt-1">{formattedPrice}</div>
                        <div className="text-xs font-medium text-warm-gray-400 mt-1">${pricePerSqft} per sqft</div>
                    </div>

                    {/* Gross Yield Badge */}
                    <div className="flex flex-col justify-center p-4 rounded-xl border border-warm-gray-200 bg-white shadow-sm">
                        <span className="text-sm text-warm-gray-500">Gross Yield</span>
                        <span className="text-2xl font-bold text-[#111814] mt-1">{metrics?.grossYield || listing.grossYield || 'N/A'}</span>
                    </div>

                    {/* 5-Yr ROI Badge */}
                    <div className="flex flex-col justify-center p-4 rounded-xl border border-warm-gray-200 bg-white shadow-sm">
                        <span className="text-sm text-warm-gray-500">5-Yr ROI</span>
                        <span className="text-2xl font-bold text-[#111814] mt-1">{metrics?.totalReturn5Yr || listing.roi || 'N/A'}</span>
                    </div>

                    {/* Est. Rent Badge */}
                    <div className="flex flex-col justify-center p-4 rounded-xl border border-warm-gray-200 bg-white shadow-sm">
                        <span className="text-sm text-warm-gray-500">Est. Rent</span>
                        <span className="text-2xl font-bold text-[#111814] mt-1">{estRent}</span>
                    </div>
                </div>


            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[400px] mb-8 rounded-xl overflow-hidden">
                <div className="col-span-2 md:col-span-2 md:row-span-2 relative group cursor-pointer h-full min-h-[200px] md:min-h-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[0] || listing.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">Main Exterior</span>
                    </div>
                </div>
                <div className="relative group cursor-pointer h-full min-h-[140px] md:min-h-[190px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[1] || listing.image}')` }}
                    ></div>
                </div>
                <div className="relative group cursor-pointer h-full min-h-[140px] md:min-h-[190px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[2] || listing.image}')` }}
                    ></div>
                </div>
                <div className="relative group cursor-pointer h-full min-h-[140px] md:min-h-[190px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[3] || listing.image}')` }}
                    ></div>
                </div>
                <div className="relative group cursor-pointer h-full min-h-[140px] md:min-h-[190px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[4] || listing.gallery?.[0] || listing.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined">grid_view</span> View All {listing.gallery?.length || 1} Photos
                        </span>
                    </div>
                </div>
            </div>

        </section>
    );
}
