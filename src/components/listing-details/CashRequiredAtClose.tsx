"use client";

import { useState, useEffect } from 'react';
import { Listing } from '@/types';
import { CityData } from '@/utils/cityDefaults';

interface CashRequiredAtCloseProps {
    listing: Listing;
    cityDefaults: CityData;
    calculatorValues: {
        proposedPrice: number;
        downPaymentPercent: number;
        loanAmount: number;
    };
}

export default function CashRequiredAtClose({ listing, cityDefaults, calculatorValues }: CashRequiredAtCloseProps) {
    const { proposedPrice, downPaymentPercent } = calculatorValues;

    const [isOpen, setIsOpen] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    // Close tooltip when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeTooltip) {
                const target = event.target as HTMLElement;
                if (!target.closest(`[data-tooltip-id="${activeTooltip}"]`)) {
                    setActiveTooltip(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeTooltip]);

    // Calculations
    const downPayment = proposedPrice * (downPaymentPercent / 100);

    // Closing costs: Use listing specific or city default
    const closingCostsPercentage = listing.closing_costs_percentage || cityDefaults.closing_costs_percentage * 100;
    const estimatedClosingCosts = proposedPrice * (closingCostsPercentage / 100);

    // Net Cash Required (includes rehab cost)
    const netCashRequired = downPayment + estimatedClosingCosts + (listing.estimated_rehab_cost || 0);

    const formatCurrency = (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header - Always Visible */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[#111814] flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-600 bg-purple-50 p-1.5 rounded-full text-[20px]">account_balance_wallet</span>
                        Cash Required at Close
                    </h3>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                        {isOpen ? 'Hide Details' : 'View Details'}
                        <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            expand_more
                        </span>
                    </button>
                </div>

                {/* Metric displayed */}
                <div
                    className="group/tooltip relative inline-block p-3 rounded-lg bg-purple-50 border border-purple-100 transition-colors hover:bg-purple-100 min-w-[200px]"
                    onClick={() => setActiveTooltip(activeTooltip === 'cash-required' ? null : 'cash-required')}
                    data-tooltip-id="cash-required"
                >
                    <p className="text-[10px] uppercase font-bold text-purple-600 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                        Cash Required
                        <span className="material-symbols-outlined text-[12px] text-purple-400">info</span>
                    </p>
                    <p className="text-lg font-black text-purple-700 flex items-center gap-2">
                        {formatCurrency(netCashRequired)}
                        <span className="text-[10px] font-medium text-purple-500 normal-case">(at closing)</span>
                    </p>

                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'cash-required' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                        Total cash needed at closing including down payment, closing costs, and estimated rehab costs.
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>

                {/* Mobile Link to View Details */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden w-full flex items-center justify-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors mt-4 p-2 bg-gray-50 rounded-lg"
                >
                    {isOpen ? 'Hide Details' : 'View Details'}
                    <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </button>
            </div>

            {/* Expandable Content */}
            <div className={`transition-all duration-300 ease-in-out border-t border-gray-100 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 space-y-4 bg-gray-50/50">
                    {/* Down Payment */}
                    <div className="flex justify-between items-center py-3 border-b border-warm-gray-100">
                        <span className="text-gray-600 font-medium">Down Payment ({downPaymentPercent}%)</span>
                        <span className="text-gray-900 font-bold">{formatCurrency(downPayment)}</span>
                    </div>

                    {/* Estimated Closing Costs */}
                    <div className="flex justify-between items-center py-3 border-b border-warm-gray-100">
                        <span className="text-gray-600 font-medium">
                            Estimated Closing Costs ({closingCostsPercentage}%)
                        </span>
                        <span className="text-gray-900 font-bold">{formatCurrency(estimatedClosingCosts)}</span>
                    </div>

                    {/* Estimated Rehab Cost */}
                    <div className="flex justify-between items-center py-3 border-b border-warm-gray-100">
                        <span className="text-gray-600 font-medium">Estimated Rehab Cost</span>
                        <span className="text-gray-900 font-bold">{formatCurrency(listing.estimated_rehab_cost || 0)}</span>
                    </div>

                    {/* Net Cash Required Highlight */}
                    <div className="flex justify-between items-center py-4 bg-purple-50 rounded-lg px-4 mt-2">
                        <span className="text-purple-900 font-bold">Total Cash to Close</span>
                        <span className="text-purple-700 font-black text-xl">{formatCurrency(netCashRequired)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
