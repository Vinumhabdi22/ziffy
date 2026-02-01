"use client";

import { useState } from 'react';
import { Listing, InvestmentMetrics } from '@/types';
import ImageModal from '../common/ImageModal';

interface ListingHeroProps {
    listing: Listing;
    metrics?: InvestmentMetrics;
}

export default function ListingHero({ listing, metrics }: ListingHeroProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialImageIndex, setInitialImageIndex] = useState(0);

    const openModal = (index: number) => {
        setInitialImageIndex(index);
        setIsModalOpen(true);
    };

    // Metrics for display
    const purchasePrice = metrics?.purchasePrice || listing.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    const emv = metrics?.estimatedMarketValue || "$0";
    const smv = metrics?.stabilizedMarketValue || "$0";
    const rehabCost = metrics?.estimatedRehabCost || "$0";
    const equity = metrics?.builtInEquity || "$0";

    const isPositiveEquity = (metrics?.builtInEquity && !metrics.builtInEquity.includes('-')) || true;

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
                            {listing.year_built && (
                                <>
                                    <div className="hidden sm:block w-px h-4 bg-warm-gray-100"></div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-warm-gray-400 text-lg">calendar_month</span>
                                        <span className="text-sm font-semibold text-[#111814]">{listing.year_built} <span className="text-warm-gray-400 font-normal">Year Built</span></span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 py-2.5 border border-warm-gray-200 rounded-lg text-sm font-bold text-[#111814] hover:bg-warm-gray-50 transition-colors bg-white shadow-sm cursor-pointer w-full md:w-auto">
                        <span className="material-symbols-outlined text-[20px] fill-current text-red-500">favorite</span>
                        Save Asset
                    </button>
                </div>

                {/* Top Metrics Grid (Reduced Size) */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* Purchase Price */}
                    <div className="flex flex-col justify-center p-3 rounded-xl border border-warm-gray-200 bg-white shadow-sm relative group">
                        <span className="text-xs uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-300 w-fit mb-1">Purchase Price</span>
                        <div className="text-lg font-bold text-text-dark">{purchasePrice}</div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2 z-20 shadow-lg pointer-events-none text-center left-1/2 -translate-x-1/2">
                            The current listing price for this property.
                        </div>
                    </div>

                    {/* Estimated Market Value */}
                    <div className="flex flex-col justify-center p-3 rounded-xl border border-warm-gray-200 bg-white shadow-sm relative group">
                        <span className="text-xs uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-300 w-fit mb-1">Market Value (EMV)</span>
                        <div className="text-lg font-bold text-text-dark">{emv}</div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2 z-20 shadow-lg pointer-events-none text-center left-1/2 -translate-x-1/2">
                            Estimated Market Value based on comparable sales in the area.
                        </div>
                    </div>

                    {/* Stabilized Market Value */}
                    <div className="flex flex-col justify-center p-3 rounded-xl border border-warm-gray-200 bg-white shadow-sm relative group">
                        <span className="text-xs uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-300 w-fit mb-1">Stabilized Value</span>
                        <div className="text-lg font-bold text-text-dark">{smv}</div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2 z-20 shadow-lg pointer-events-none text-center left-1/2 -translate-x-1/2">
                            Projected value after renovations and stabilization are complete.
                        </div>
                    </div>

                    {/* Estimated Rehab Cost */}
                    <div className="flex flex-col justify-center p-3 rounded-xl border border-warm-gray-200 bg-white shadow-sm relative group">
                        <span className="text-xs uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-300 w-fit mb-1">Est. Rehab Cost</span>
                        <div className="text-lg font-bold text-text-dark">{rehabCost}</div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2 z-20 shadow-lg pointer-events-none text-center left-1/2 -translate-x-1/2">
                            Estimated cost of repairs and renovations needed.
                        </div>
                    </div>

                    {/* Built-In Equity */}
                    <div className="flex flex-col justify-center p-3 rounded-xl border border-warm-gray-200 bg-white shadow-sm relative group">
                        <span className="text-xs uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-300 w-fit mb-1">Built-In Equity</span>
                        <div className={`text-lg font-bold ${isPositiveEquity ? 'text-green-600' : 'text-red-500'}`}>{equity}</div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2 z-20 shadow-lg pointer-events-none text-center left-1/2 -translate-x-1/2">
                            Difference between estimated market value and purchase price.
                        </div>
                    </div>
                </div>


            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[400px] mb-8 rounded-xl overflow-hidden">
                <div
                    className="col-span-2 md:col-span-2 md:row-span-2 relative group cursor-pointer h-full min-h-[200px] md:min-h-0"
                    onClick={() => openModal(0)}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[0] || listing.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">Main Exterior</span>
                    </div>
                </div>
                <div
                    className="relative group cursor-pointer h-full min-h-[140px] md:min-h-[190px]"
                    onClick={() => openModal(1)}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[1] || listing.image}')` }}
                    ></div>
                </div>
                <div
                    className="relative group cursor-pointer h-full min-h-[140px] md:min-h-[190px]"
                    onClick={() => openModal(2)}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[2] || listing.image}')` }}
                    ></div>
                </div>
                <div
                    className="relative group cursor-pointer h-full min-h-[140px] md:min-h-[190px]"
                    onClick={() => openModal(3)}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${listing.gallery?.[3] || listing.image}')` }}
                    ></div>
                </div>
                <div
                    className="relative group cursor-pointer h-full min-h-[140px] md:min-h-[190px]"
                    onClick={() => openModal(4)}
                >
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

            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                images={listing.gallery && listing.gallery.length > 0 ? listing.gallery : [listing.image]}
                initialIndex={initialImageIndex}
            />

        </section>
    );
}
