"use client";

import { useState, useEffect } from 'react';

interface MonthlyCashflowAnalysisProps {
    calculatorValues: {
        rent: number;
        monthlyMortgage: number;
        propertyTax: number;
        insurance: number;
        gardener: number;
        trash: number;
        utilities: number;
        maintenance: number;
        hoaFees: number;
        management: number;
        capex: number;
    };
}

export default function MonthlyCashflowAnalysis({ calculatorValues }: MonthlyCashflowAnalysisProps) {
    const {
        rent,
        monthlyMortgage,
        propertyTax,
        insurance,
        gardener,
        trash,
        utilities,
        maintenance,
        hoaFees,
        management,
        capex,
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

    // Calculate totals
    const totalMonthlyIncome = rent;
    const netMonthlyIncome = rent;

    // Note: Gardener, Trash, Utilities are included in total but hidden from UI breakdown per requirement
    const totalMonthlyExpenses = monthlyMortgage + propertyTax + insurance + gardener + trash + utilities + maintenance + hoaFees + management + capex;
    const monthlyCashFlow = netMonthlyIncome - totalMonthlyExpenses;

    // Helper to format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Calculate management percentage
    const managementPercent = rent > 0 ? ((management / rent) * 100).toFixed(1) : '0.0';

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 mb-6">
            {/* Header - Always Visible */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[#111814] flex items-center gap-2">
                        <span className="material-symbols-outlined text-teal-600 bg-teal-50 p-1.5 rounded-full text-[20px]">payments</span>
                        Monthly Cash Flow
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
                <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap">
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'net-income' ? null : 'net-income')}
                        data-tooltip-id="net-income"
                    >
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Net Income
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-gray-900">{formatCurrency(netMonthlyIncome)}</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'net-income' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Monthly rental income from the property.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'expenses' ? null : 'expenses')}
                        data-tooltip-id="expenses"
                    >
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Total Expenses
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-red-500">{formatCurrency(totalMonthlyExpenses)}</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'expenses' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Sum of all monthly operating expenses including mortgage, taxes, insurance, maintenance, and management.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-teal-50 border border-teal-100 transition-colors hover:bg-teal-100 min-w-[140px]"
                        onClick={() => setActiveTooltip(activeTooltip === 'cash-flow' ? null : 'cash-flow')}
                        data-tooltip-id="cash-flow"
                    >
                        <p className="text-[10px] uppercase font-bold text-teal-600 tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Cash Flow
                            <span className="material-symbols-outlined text-[12px] text-teal-400">info</span>
                        </p>
                        <p className={`text-lg font-black ${monthlyCashFlow >= 0 ? 'text-teal-700' : 'text-red-700'}`}>
                            {formatCurrency(monthlyCashFlow)}
                        </p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'cash-flow' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Net monthly profit after all expenses and mortgage payments.
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
            <div className={`transition-all duration-300 ease-in-out border-t border-gray-100 ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 space-y-8 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Operating Revenue Section */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                                Operating Revenue
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Rental Income</span>
                                    <span className="font-semibold text-gray-900">{formatCurrency(rent)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-t border-gray-200 mt-2 bg-white px-3 rounded-lg border border-gray-100">
                                    <span className="text-sm font-bold text-gray-900">Net Monthly Income</span>
                                    <span className="text-sm font-bold text-teal-600">{formatCurrency(netMonthlyIncome)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Operating Expenses Section */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                                Operating Expenses
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Loan Payment</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(monthlyMortgage)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Property Taxes</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(propertyTax)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Insurance</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(insurance)}</span>
                                </div>

                                <div className="w-full h-px bg-gray-200 my-2"></div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Maintenance</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(maintenance)}</span>
                                </div>

                                {hoaFees > 0 && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">HOA</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(hoaFees)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Management ({managementPercent}%)</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(management)}</span>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">CapEx Reserves</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(capex)}</span>
                                </div>

                                {/* Trash, Utilities, Gardener hidden from UI but included in total */}

                                <div className="flex justify-between items-center py-2 border-t border-gray-200 mt-2 bg-white px-3 rounded-lg border border-gray-100">
                                    <span className="text-sm font-bold text-gray-900">Total Expenses</span>
                                    <span className="text-sm font-bold text-red-500">{formatCurrency(totalMonthlyExpenses)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Cash Flow Highlight */}
                    <div className="flex justify-between items-center py-4 bg-teal-50 rounded-lg px-6 border border-teal-100">
                        <span className="text-base font-bold text-teal-900">Net Monthly Cash Flow</span>
                        <span className={`text-xl font-black ${monthlyCashFlow >= 0 ? 'text-teal-700' : 'text-red-600'}`}>
                            {formatCurrency(monthlyCashFlow)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
