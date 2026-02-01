"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Listing } from '@/types';
import { generateListingSlug } from '@/utils/listingUtils';
import { calculateYear1ROI } from '@/utils/roiCalculations';


interface PropertyCardProps {
    listing: Listing;
}

export default function PropertyCard({ listing }: PropertyCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);


    let badgeClasses = "bg-gray-800/80 text-white";
    let icon = "";

    if (listing.badge === "AI-Verified") {
        badgeClasses = "bg-teal-500/90 text-white";
        icon = "verified";
    } else if (listing.badge === "High Yield") {
        badgeClasses = "bg-indigo-600/90 text-white";
        icon = "trending_up";
    } else if (listing.badge === "New Listing") {
        badgeClasses = "bg-gray-800/80 text-white";
    }

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    // Formatter
    const formatCurrency = (val: number) => val?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }) || '$0';

    const formatPercent = (val: number) => `${val?.toFixed(1)}%`;

    // Calculate Metrics
    const annualExpenses = (listing.expense_tax || 0) + (listing.expense_insurance || 0) +
        (listing.expense_maintenance || 0) + (listing.expense_management || 0) +
        (listing.expense_hoa || 0) + (listing.expense_utilities || 0) +
        (listing.expense_gardener || 0) + (listing.expense_trash || 0);

    const roiResults = calculateYear1ROI({
        purchasePrice: listing.price,
        estimatedRent: listing.estimated_rent || 0,
        annualExpenses: annualExpenses,
        downPaymentPercent: 20,
        interestRate: 6.5,
        loanTermYears: 30,
        closingCostsPercent: listing.closing_costs_percentage || 0,
        stabilizedMarketValue: listing.stabilized_market_value || 0,
        estimatedRehabCost: listing.estimated_rehab_cost || 0
    });

    // Row 1 Metrics
    // Initial Offer Price: Generally Purchase Price unless specified otherwise
    const initialOfferPrice = listing.price;
    const estimatedRent = listing.estimated_rent;
    // Built-In Equity (vs Market) = Est Market Value - Initial Offer Price
    const builtInEquity = (listing.estimated_market_value || listing.price) - initialOfferPrice;

    // Row 2 Metrics
    const annualRent = (listing.estimated_rent || 0) * 12;
    const noi = annualRent - annualExpenses;
    const capRate = listing.price ? (noi / listing.price) * 100 : 0;

    // Cash-on-Cash Return: Using pre-tax return on cash invested as standard CoC
    // Note: User feedback suggested 'cashOnCashReturn' but property on utility is 'returnOnCashInvested'
    const cashOnCash = roiResults.returnOnCashInvested;

    // Gross Yield = (Annual Rent / Purchase Price) * 100
    const grossYield = listing.price ? (annualRent / listing.price) * 100 : 0;


    return (
        <Link href={`/listings/${generateListingSlug(listing.address, listing.city, listing.state, listing.zipcode)}`} className="block group flex flex-col rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-warm-gray-100">
            {/* Image Section */}
            <div className="relative w-full aspect-[16/9] bg-warm-gray-100 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                    style={{ backgroundImage: `url('${listing.gallery?.[0] || listing.image}')` }}

                ></div>
                {listing.badge && (
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`inline-flex items-center rounded-md backdrop-blur-sm px-2.5 py-1 text-xs font-bold shadow-sm ring-1 ring-inset ring-white/20 ${badgeClasses}`}>
                            {icon && <span className="material-symbols-outlined text-[14px] mr-1">{icon}</span>}
                            {listing.badge}
                        </span>
                    </div>
                )}

                <button
                    className={`absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full transition-all z-10 hover:scale-110 shadow-sm ${isFavorite
                        ? "bg-white text-red-500 shadow-md"
                        : "bg-white/90 text-warm-gray-400 hover:text-red-500 hover:bg-white"
                        }`}
                    onClick={toggleFavorite}
                >
                    <span className={`material-symbols-outlined text-[20px] ${isFavorite ? "filled" : ""}`} style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-5 grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-text-dark text-lg font-bold leading-tight tracking-tight">{listing.address}</h3>
                        <p className="text-warm-gray-500 text-sm">{listing.city}, {listing.state} {listing.zipcode || ''}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-warm-gray-400 text-xs font-medium uppercase tracking-wide">Purchase Price</p>
                        <p className="text-primary text-xl font-extrabold">{formatCurrency(listing.price)}</p>
                    </div>
                </div>

                {/* Property Stats (Beds, Baths, Sqft, Year) - Optimized Grid Layout */}
                <div className="grid grid-cols-4 gap-2 py-3 border-y border-warm-gray-100 my-3">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-warm-gray-600">
                            <span className="material-symbols-outlined text-[18px] text-warm-gray-400">bed</span>
                            <span className="font-bold text-text-dark text-sm">{listing.beds}</span>
                        </div>
                        <span className="text-[10px] uppercase text-warm-gray-400 font-medium tracking-wide">Beds</span>
                    </div>

                    <div className="flex flex-col items-center border-l border-warm-gray-100">
                        <div className="flex items-center gap-1 text-warm-gray-600">
                            <span className="material-symbols-outlined text-[18px] text-warm-gray-400">bathtub</span>
                            <span className="font-bold text-text-dark text-sm">{listing.baths}</span>
                        </div>
                        <span className="text-[10px] uppercase text-warm-gray-400 font-medium tracking-wide">Baths</span>
                    </div>

                    <div className="flex flex-col items-center border-l border-warm-gray-100">
                        <div className="flex items-center gap-1 text-warm-gray-600">
                            <span className="material-symbols-outlined text-[18px] text-warm-gray-400">square_foot</span>
                            <span className="font-bold text-text-dark text-sm">{listing.sqft.toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] uppercase text-warm-gray-400 font-medium tracking-wide">Sqft</span>
                    </div>

                    {listing.year_built && (
                        <div className="flex flex-col items-center border-l border-warm-gray-100">
                            <div className="flex items-center gap-1 text-warm-gray-600">
                                <span className="material-symbols-outlined text-[18px] text-warm-gray-400">calendar_month</span>
                                <span className="font-bold text-text-dark text-sm">{listing.year_built}</span>
                            </div>
                            <span className="text-[10px] uppercase text-warm-gray-400 font-medium tracking-wide">Year</span>
                        </div>
                    )}
                </div>

                {/* Financial Footer - 2 Rows */}
                <div className="mt-auto space-y-3 pt-1">
                    {/* Row 1: Initial Offer, Est Rent, Built-In Equity */}
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-2">
                        <div className="flex flex-col items-center border-r border-warm-gray-200 relative group/tooltip">
                            <span className="text-[10px] uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-400">Init Offer</span>
                            <span className="text-text-dark text-sm font-bold">{formatCurrency(initialOfferPrice)}</span>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block w-40 bg-gray-800 text-white text-xs rounded p-2 z-20 text-center shadow-lg pointer-events-none">
                                Suggested initial offer price for the property.
                            </div>
                        </div>
                        <div className="flex flex-col items-center border-r border-warm-gray-200 relative group/tooltip">
                            <span className="text-[10px] uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-400">Est Rent</span>
                            <span className="text-text-dark text-sm font-bold">{formatCurrency(estimatedRent)}</span>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block w-40 bg-gray-800 text-white text-xs rounded p-2 z-20 text-center shadow-lg pointer-events-none">
                                Estimated monthly rental income based on market data.
                            </div>
                        </div>
                        <div className="flex flex-col items-center relative group/tooltip">
                            <span className="text-[10px] uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-400">Equity</span>
                            <span className={`text-sm font-bold ${builtInEquity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(builtInEquity)}
                            </span>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block w-48 bg-gray-800 text-white text-xs rounded p-2 z-20 text-center shadow-lg pointer-events-none">
                                Difference between estimated market value and initial offer price.
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Cap Rate, Cash-on-Cash, Gross Yield */}
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-2">
                        <div className="flex flex-col items-center border-r border-warm-gray-200 relative group/tooltip">
                            <span className="text-[10px] uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-400">Cap Rate</span>
                            <span className="text-primary text-sm font-bold">{formatPercent(capRate)}</span>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block w-48 bg-gray-800 text-white text-xs rounded p-2 z-20 text-center shadow-lg pointer-events-none">
                                Net Operating Income divided by Purchase Price. Indicates potential return.
                            </div>
                        </div>
                        <div className="flex flex-col items-center border-r border-warm-gray-200 relative group/tooltip">
                            <span className="text-[10px] uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-400">Cash Return</span>
                            <span className="text-green-600 text-sm font-bold">{formatPercent(cashOnCash)}</span>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block w-48 bg-gray-800 text-white text-xs rounded p-2 z-20 text-center shadow-lg pointer-events-none">
                                Annual Pre-Tax Cash Flow divided by Total Cash Invested.
                            </div>
                        </div>
                        <div className="flex flex-col items-center relative group/tooltip">
                            <span className="text-[10px] uppercase tracking-wide text-warm-gray-500 font-semibold cursor-help border-b border-dashed border-warm-gray-400">Gross Yield</span>
                            <span className="text-text-dark text-sm font-bold">{formatPercent(grossYield)}</span>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block w-40 bg-gray-800 text-white text-xs rounded p-2 z-20 text-center shadow-lg pointer-events-none">
                                Annual Gross Income divided by Purchase Price.
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Link>
    );
}
