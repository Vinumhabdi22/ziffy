"use client";

import { useState, useEffect } from 'react';
import { Listing } from '@/types';

interface FinancingInformationProps {
    listing: Listing;
    calculatorValues: {
        proposedPrice: number;
        downPaymentPercent: number;
        interestRate: number;
        termYears: number;
    };
}

export default function FinancingInformation({ listing, calculatorValues }: FinancingInformationProps) {
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

    // Financing values from Calculator prop
    const askingPrice = listing.price;
    const proposedPrice = calculatorValues.proposedPrice;
    const downPaymentPercent = calculatorValues.downPaymentPercent;
    const interestRate = calculatorValues.interestRate;
    const termYears = calculatorValues.termYears;

    // Calculations
    const cashDownTotal = proposedPrice * (downPaymentPercent / 100);
    const loanPercentage = 100 - downPaymentPercent;
    const loanAmount = proposedPrice - cashDownTotal;

    // Mortgage Calculation Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = termYears * 12;

    const monthlyPayment = loanAmount > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : 0;

    const formatCurrency = (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 mb-6">
            {/* Header - Always Visible */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[#111814] flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-600 bg-orange-50 p-1.5 rounded-full text-[20px]">account_balance</span>
                        Financing Information
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

                {/* Metrics displayed inline */}
                <div className="flex gap-4 flex-wrap">
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'loan-amount' ? null : 'loan-amount')}
                        data-tooltip-id="loan-amount"
                    >
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Loan Amount
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-gray-900">{formatCurrency(loanAmount)}</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'loan-amount' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Total mortgage amount after down payment.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'monthly-pmt' ? null : 'monthly-pmt')}
                        data-tooltip-id="monthly-pmt"
                    >
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Monthly Pmt
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-orange-600">{formatCurrency(monthlyPayment)}</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'monthly-pmt' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Monthly principal and interest payment on the mortgage.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
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
            <div className={`transition-all duration-300 ease-in-out border-t border-warm-gray-100 bg-gray-50/50 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        {/* Asking & Proposed Price */}
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-gray-600 text-sm font-medium">Asking Price</span>
                            <span className="text-gray-900 font-semibold text-sm">{formatCurrency(askingPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-gray-600 text-sm font-medium">Proposed Price</span>
                            <span className="text-blue-600 font-bold text-sm">{formatCurrency(proposedPrice)}</span>
                        </div>

                        {/* Down Payment Info */}
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-gray-600 text-sm font-medium">Down Payment ({downPaymentPercent}%)</span>
                            <span className="text-gray-900 font-semibold text-sm">{formatCurrency(cashDownTotal)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-gray-600 text-sm font-medium">Loan Amount ({loanPercentage}%)</span>
                            <span className="text-gray-900 font-semibold text-sm">{formatCurrency(loanAmount)}</span>
                        </div>

                        {/* Terms */}
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-gray-600 text-sm font-medium">Interest Rate</span>
                            <span className="text-gray-900 font-semibold text-sm">{interestRate}%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-gray-600 text-sm font-medium">Loan Term</span>
                            <span className="text-gray-900 font-semibold text-sm">{termYears} Years</span>
                        </div>

                        {/* Payments */}
                        <div className="flex justify-between items-center py-3 bg-orange-50 rounded-lg px-4 mt-2 md:col-span-2 shadow-sm border border-orange-100">
                            <span className="text-orange-900 font-bold text-sm">Monthly Principal & Interest</span>
                            <span className="text-orange-700 font-black text-lg">{formatCurrency(monthlyPayment)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
