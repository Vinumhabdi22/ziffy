"use client";

import { useState, useEffect } from 'react';

interface YearFiveROIProps {
    calculatorValues: {
        purchasePrice: number;
        downPaymentAmount: number;
        closingCosts: number;
        monthlyCashFlow: number;
        monthlyMortgage: number;
        loanAmount: number;
        interestRate: number;
        rent: number;
        stabilizedMarketValue?: number;
        estimatedRehabCost?: number;
        builtInEquity?: number;
    };
}

export default function YearFiveROI({ calculatorValues }: YearFiveROIProps) {
    const {
        purchasePrice,
        downPaymentAmount,
        closingCosts,
        monthlyCashFlow,
        monthlyMortgage,
        loanAmount,
        interestRate,
        rent,
        builtInEquity = 0,
    } = calculatorValues;

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

    const YEARS = 5;
    const RENT_GROWTH = 0.03;
    const EXPENSE_GROWTH = 0.02;
    const APPRECIATION_RATE = 0.03;
    const TAX_RATE = 0.25;
    const DEPRECIATION_PERIOD = 27.5;
    const STRUCTURE_VALUE_PERCENT = 0.80;

    // Derived Monthly Expenses (Initial)
    const initialMonthlyExpenses = rent - monthlyMortgage - monthlyCashFlow;

    // Calculate Cumulative Metrics over 5 Years
    let cumulativeCashFlow = 0;
    let currentRent = rent * 12; // Annualize
    let currentExpenses = initialMonthlyExpenses * 12; // Annualize
    const annualMortgage = monthlyMortgage * 12;

    for (let year = 1; year <= YEARS; year++) {
        const annualNOI = currentRent - currentExpenses;
        const annualCashFlow = annualNOI - annualMortgage;
        cumulativeCashFlow += annualCashFlow;

        // Apply Growth for next year
        currentRent *= (1 + RENT_GROWTH);
        currentExpenses *= (1 + EXPENSE_GROWTH);
    }

    // Calculate Cumulative Loan Paydown
    let remainingBalance = loanAmount;
    let cumulativePrincipalPaid = 0;
    const monthlyRate = interestRate / 100 / 12;

    for (let month = 1; month <= YEARS * 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyMortgage - interestPayment;
        cumulativePrincipalPaid += principalPayment;
        remainingBalance -= principalPayment;
    }

    // Calculate Property Value after 5 years
    const futurePropertyValue = purchasePrice * Math.pow(1 + APPRECIATION_RATE, YEARS);
    const totalAppreciation = futurePropertyValue - purchasePrice;

    // Total Cumulative Return
    const totalCumulativeReturn = cumulativeCashFlow + cumulativePrincipalPaid + totalAppreciation + builtInEquity;

    // Cash Investment
    const cashInvestment = downPaymentAmount + closingCosts;

    // Return on Cash Invested
    const returnOnCashInvested = cashInvestment > 0 ? (totalCumulativeReturn / cashInvestment) * 100 : 0;

    // Tax Savings
    const structureValue = purchasePrice * STRUCTURE_VALUE_PERCENT;
    const annualDepreciation = structureValue / DEPRECIATION_PERIOD;
    const cumulativeTaxSavings = annualDepreciation * TAX_RATE * YEARS;

    // Total Return with Tax
    const totalReturnWithTax = totalCumulativeReturn + cumulativeTaxSavings;
    const returnOnCashInvestedWithTax = cashInvestment > 0 ? (totalReturnWithTax / cashInvestment) * 100 : 0;

    // Formatting
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatPercent = (value: number) => {
        return value.toFixed(2) + '%';
    };

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header - Always Visible */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[#111814] flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-1.5 rounded-full text-[20px]">timeline</span>
                        Year 5 Cumulative ROI
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
                        className="group/tooltip relative p-3 rounded-lg bg-blue-50 border border-blue-100 transition-colors hover:bg-blue-100 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'total-return' ? null : 'total-return')}
                        data-tooltip-id="total-return"
                    >
                        <p className="text-[10px] uppercase font-bold text-blue-600 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Total Return
                            <span className="material-symbols-outlined text-[12px] text-blue-400">info</span>
                        </p>
                        <p className="text-lg font-black text-blue-600">{formatCurrency(totalCumulativeReturn)}</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'total-return' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            5-year cumulative return including property appreciation (3%), rent growth (3%), tax benefits, cash flow, and loan paydown.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'roi' ? null : 'roi')}
                        data-tooltip-id="roi"
                    >
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            ROI (5yr)
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-primary">{formatPercent(returnOnCashInvested)}</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'roi' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            5-year cumulative return on investment percentage based on total cash invested.
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
            <div className={`transition-all duration-300 ease-in-out border-t border-gray-100 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 space-y-6 bg-gray-50/50">
                    {/* Investment Summary */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">5-Year Return Components</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Initial Cash Investment</span>
                                <span className="font-bold text-gray-900">{formatCurrency(cashInvestment)}</span>
                            </div>
                            <div className="w-full h-px bg-gray-200"></div>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Cumulative Cash Flow (5 yrs)</span>
                                <span className="font-medium text-gray-900">{formatCurrency(cumulativeCashFlow)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Total Loan Paydown (5 yrs)</span>
                                <span className="font-medium text-gray-900">{formatCurrency(cumulativePrincipalPaid)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex flex-col">
                                    <span className="text-gray-600">Property Appreciation</span>
                                    <span className="text-[10px] text-gray-400">{APPRECIATION_RATE * 100}% annual growth</span>
                                </div>
                                <span className="font-medium text-gray-900">{formatCurrency(totalAppreciation)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Built-In Equity (Day 1)</span>
                                <span className={`font-medium ${builtInEquity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatCurrency(builtInEquity)}
                                </span>
                            </div>

                            <div className="w-full h-px bg-gray-200"></div>

                            <div className="flex justify-between items-center py-2 bg-blue-50/50 rounded-lg px-3">
                                <span className="font-bold text-gray-900">Total Cumulative Return</span>
                                <span className="font-bold text-primary text-lg">{formatCurrency(totalCumulativeReturn)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tax Savings Section */}
                    <div className="pt-4 border-t border-gray-200">
                        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="material-symbols-outlined text-blue-500 bg-blue-50 p-1 rounded-full text-[18px] mt-0.5">account_balance</span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Total Tax Savings (5 Yrs)</p>
                                    <p className="text-xs text-gray-500">Accumulated savings from depreciation</p>
                                </div>
                                <span className="ml-auto font-bold text-blue-600 text-lg">{formatCurrency(cumulativeTaxSavings)}</span>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-blue-50 text-sm">
                                <span className="font-bold text-gray-900">After-Tax ROI (5yr)</span>
                                <span className="font-bold text-blue-600 text-lg">{formatPercent(returnOnCashInvestedWithTax)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
