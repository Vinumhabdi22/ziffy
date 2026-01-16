"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Listing } from '@/types';

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

    // Calculations
    const annualRent = (listing.estimated_rent || 0) * 12;
    const annualExpenses = (listing.expense_tax || 0) + (listing.expense_insurance || 0) + (listing.expense_maintenance || 0) + (listing.expense_management || 0);
    const noi = annualRent - annualExpenses;
    const capRate = listing.price ? (noi / listing.price) * 100 : 0;

    // Simplified ROI/Cash-on-Cash for card view (assuming 20% down, 6.5% interest, 30yr)
    // This replicates the logic in ListingDetailsClient but simplified
    const downPayment = listing.price * 0.20;
    const loanAmount = listing.price * 0.80;
    const monthlyRate = 6.5 / 100 / 12;
    const loanTermMonths = 30 * 12;
    const monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    const annualDebtService = monthlyMortgage * 12;
    const annualCashFlow = noi - annualDebtService;
    const cashOnCash = downPayment > 0 ? (annualCashFlow / downPayment) * 100 : 0;


    return (
        <Link href={`/listings/${listing.id}`} className="block group flex flex-col rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-warm-gray-100">
            {/* Image Section */}
            <div className="relative w-full aspect-[16/9] bg-warm-gray-100 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
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
                    <p className="text-primary text-xl font-extrabold">{formatCurrency(listing.price)}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-warm-gray-600 my-3">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-warm-gray-400">bed</span>
                        <span className="font-semibold">{listing.beds}</span> Bed
                    </div>
                    <div className="w-px h-4 bg-warm-gray-300"></div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-warm-gray-400">bathtub</span>
                        <span className="font-semibold">{listing.baths}</span> Bath
                    </div>
                    <div className="w-px h-4 bg-warm-gray-300"></div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-warm-gray-400">square_foot</span>
                        <span className="font-semibold">{listing.sqft.toLocaleString()}</span> Sqft
                    </div>
                </div>

                {/* Financial Footer */}
                <div className="mt-auto pt-4 border-t border-warm-gray-100">
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-3">
                        <div className="flex flex-col items-center border-r border-warm-gray-200">
                            <span className="text-[11px] uppercase tracking-wide text-warm-gray-500 font-semibold">Rent</span>
                            <span className="text-text-dark text-sm font-bold">{formatCurrency(listing.estimated_rent)}</span>
                        </div>
                        <div className="flex flex-col items-center border-r border-warm-gray-200">
                            <span className="text-[11px] uppercase tracking-wide text-warm-gray-500 font-semibold">ROI</span>
                            <span className="text-green-600 text-sm font-extrabold">{formatPercent(cashOnCash)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] uppercase tracking-wide text-warm-gray-500 font-semibold">Cap Rate</span>
                            <span className="text-primary text-sm font-bold">{formatPercent(capRate)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
