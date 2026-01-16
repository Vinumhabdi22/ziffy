"use client";

import { Listing } from '@/types';

interface ListingHeroProps {
    listing: Listing;
}

export default function ListingHero({ listing }: ListingHeroProps) {
    // const { details } = listing;
    // const [selectedImage, setSelectedImage] = useState(0);

    const formattedPrice = listing.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    return (
        <section className="mb-6">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded border border-primary/20 uppercase tracking-wide">High Yield</span>
                        <span className="bg-warm-gray-100 text-warm-gray-700 text-xs font-bold px-2 py-0.5 rounded border border-warm-gray-200 uppercase tracking-wide">Off-Market</span>
                        <div className="flex items-center text-xs text-warm-gray-500 gap-1 ml-1">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            <span>AI Verified</span>
                        </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#111814] leading-tight">{listing.address}, {listing.city}, {listing.state} {listing.zipcode || ''}</h1>
                    <p className="text-warm-gray-500 text-lg mt-1">{listing.property_type} • {listing.city}</p>
                </div>
                <div className="flex flex-col items-end gap-2 mt-7">
                    <p className="text-primary text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{formattedPrice}</p>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center gap-1.5 rounded-lg h-7 px-3 border border-warm-gray-300 bg-white text-[#111814] text-xs font-bold hover:bg-warm-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-[10px]">share</span>
                            Share
                        </button>
                        <button className="flex items-center justify-center gap-1.5 rounded-lg h-7 px-3 border border-warm-gray-300 bg-white text-[#111814] text-xs font-bold hover:bg-warm-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-[10px]">favorite</span>
                            Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] mb-8 rounded-xl overflow-hidden">
                <div className="col-span-1 md:col-span-2 md:row-span-2 relative group cursor-pointer h-full">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[0] || listing.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">Main Exterior</span>
                    </div>
                </div>
                <div className="relative group cursor-pointer h-full min-h-[190px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[1] || listing.image}')` }}
                    ></div>
                </div>
                <div className="relative group cursor-pointer h-full min-h-[190px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[2] || listing.image}')` }}
                    ></div>
                </div>
                <div className="relative group cursor-pointer h-full min-h-[190px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[3] || listing.image}')` }}
                    ></div>
                </div>
                <div className="relative group cursor-pointer h-full min-h-[190px]">
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
