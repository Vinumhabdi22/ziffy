"use client";

import { useState, useEffect } from 'react';

interface YearOneROIProps {
    calculatorValues: {
        purchasePrice: number;
        downPaymentAmount: number;
        closingCosts: number;
        monthlyCashFlow: number;
        monthlyMortgage: number;
        loanAmount: number;
        interestRate: number;
        stabilizedMarketValue?: number;
        estimatedRehabCost?: number;
        builtInEquity?: number;
    };
}

export default function YearOneROI({ calculatorValues }: YearOneROIProps) {
    const {
        purchasePrice,
        closingCosts,
        monthlyCashFlow,
        monthlyMortgage,
        loanAmount,
        interestRate,
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

    // Cash Investment (Down Payment + Closing Costs)
    const downPaymentAmount = purchasePrice - loanAmount;
    const cashInvestment = downPaymentAmount + closingCosts;

    // Calculate Annual Cash Flow
    const annualCashFlow = monthlyCashFlow * 12;

    // Calculate Annual Loan Paydown (Principal portion of mortgage payments)
    const firstYearInterest = loanAmount * (interestRate / 100);
    const totalAnnualMortgagePayments = monthlyMortgage * 12;
    const annualLoanPaydown = totalAnnualMortgagePayments - firstYearInterest;

    // Total Annual Return (Excludes Appreciation)
    const totalAnnualReturn = annualCashFlow + annualLoanPaydown + builtInEquity;

    // Return on Cash Invested
    const returnOnCashInvested = cashInvestment > 0 ? (totalAnnualReturn / cashInvestment) * 100 : 0;

    // Tax Savings Calculation
    const structureValuePercent = 0.80;
    const structureValue = purchasePrice * structureValuePercent;
    const depreciationPeriod = 27.5;
    const annualDepreciation = structureValue / depreciationPeriod;
    const taxRate = 0.25;
    const taxSavings = annualDepreciation * taxRate;

    // Total Return including Tax Savings
    const totalAnnualReturnWithTax = totalAnnualReturn + taxSavings;
    const returnOnCashInvestedWithTax = cashInvestment > 0 ? (totalAnnualReturnWithTax / cashInvestment) * 100 : 0;

    // Helpers
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(value);

    const formatPercent = (value: number) => value.toFixed(1) + '%';

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header - Always Visible */}

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[#111814] flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-600 bg-green-50 p-1.5 rounded-full text-[20px]">monetization_on</span>
                        Year 1 ROI
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
                        className="group/tooltip relative p-3 rounded-lg bg-green-50 border border-green-100 transition-colors hover:bg-green-100 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'total-return' ? null : 'total-return')}
                        data-tooltip-id="total-return"
                    >
                        <p className="text-[10px] uppercase font-bold text-green-600 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Total Return
                            <span className="material-symbols-outlined text-[12px] text-green-400">info</span>
                        </p>
                        <p className="text-lg font-black text-green-700">{formatCurrency(totalAnnualReturn)}</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'total-return' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Total Year 1 return including annual cash flow, principal paydown, and built-in equity (excludes appreciation per industry standards).
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'roi' ? null : 'roi')}
                        data-tooltip-id="roi"
                    >
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            ROI
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-primary">{formatPercent(returnOnCashInvested)}</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'roi' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Return on investment percentage calculated as total return divided by cash invested.
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
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Return Components</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Total Cash Invested</span>
                                <span className="font-bold text-gray-900">{formatCurrency(cashInvestment)}</span>
                            </div>
                            <div className="w-full h-px bg-gray-200"></div>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Annual Cash Flow</span>
                                <span className="font-medium text-gray-900">{formatCurrency(annualCashFlow)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Principal Paydown (Year 1)</span>
                                <span className="font-medium text-gray-900">{formatCurrency(annualLoanPaydown)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Built-In Equity (Day 1)</span>
                                <span className={`font-medium ${builtInEquity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatCurrency(builtInEquity)}
                                </span>
                            </div>

                            <div className="w-full h-px bg-gray-200"></div>

                            <div className="flex justify-between items-center py-2 bg-blue-50/50 rounded-lg px-3">
                                <span className="font-bold text-gray-900">Total Annual Return</span>
                                <span className="font-bold text-primary text-lg">{formatCurrency(totalAnnualReturn)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tax Savings Section */}
                    <div className="pt-4 border-t border-gray-200">
                        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="material-symbols-outlined text-blue-500 bg-blue-50 p-1 rounded-full text-[18px] mt-0.5">account_balance</span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Tax Advantage</p>
                                    <p className="text-xs text-gray-500">Estimated tax savings from depreciation (25% bracket)</p>
                                </div>
                                <span className="ml-auto font-bold text-blue-600 text-lg">{formatCurrency(taxSavings)}</span>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-blue-50 text-sm">
                                <span className="font-bold text-gray-900">After-Tax ROI</span>
                                <span className="font-bold text-blue-600 text-lg">{formatPercent(returnOnCashInvestedWithTax)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
