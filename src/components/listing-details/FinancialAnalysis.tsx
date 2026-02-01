"use client";

import { useState, useEffect } from 'react';
import { Financials } from '@/types';

interface FinancialAnalysisProps {
    financials: Financials;
}

export default function FinancialAnalysis({ financials }: FinancialAnalysisProps) {
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

    // Helper to calculate percentages for the visual bar
    const calculatePercentage = (valueStr: string, totalStr: string) => {
        const value = parseFloat(valueStr.replace(/[^0-9.-]+/g, ""));
        const total = parseFloat(totalStr.replace(/[^0-9.-]+/g, ""));
        return total > 0 ? (value / total) * 100 : 0;
    };

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-6">
            {/* Header / High-Level Metrics (Always Visible) */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[#111814] flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-1.5 rounded-full text-[20px]">analytics</span>
                        Financial Analysis
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Gross Income */}
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200"
                        onClick={() => setActiveTooltip(activeTooltip === 'gross' ? null : 'gross')}
                        data-tooltip-id="gross"
                    >
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Gross Income
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-[#111814]">{financials.grossIncome}</p>
                        <p className="text-[10px] text-gray-400">Annual</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'gross' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Total estimated annual revenue including rental income and other sources.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>

                    {/* Total Expenses */}
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200"
                        onClick={() => setActiveTooltip(activeTooltip === 'expenses' ? null : 'expenses')}
                        data-tooltip-id="expenses"
                    >
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Expenses
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-red-500">-{financials.expenses.total}</p>
                        <p className="text-[10px] text-gray-400">Annual</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'expenses' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Sum of all operating expenses (Taxes, Insurance, Maint, Mgmt, CapEx, etc.).
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>

                    {/* NOI */}
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:border-gray-200"
                        onClick={() => setActiveTooltip(activeTooltip === 'noi' ? null : 'noi')}
                        data-tooltip-id="noi"
                    >
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            NOI
                            <span className="material-symbols-outlined text-[12px] text-gray-400">info</span>
                        </p>
                        <p className="text-lg font-black text-[#111814]">{financials.netOperatingIncome}</p>
                        <p className="text-[10px] text-gray-400">Annual</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'noi' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Net Operating Income: Revenue minus Operating Expenses (excluding debt service).
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>

                    {/* Cash Flow */}
                    <div
                        className="group/tooltip relative p-3 rounded-lg bg-blue-50 border border-blue-100 transition-colors hover:bg-blue-100"
                        onClick={() => setActiveTooltip(activeTooltip === 'cashflow' ? null : 'cashflow')}
                        data-tooltip-id="cashflow"
                    >
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1 cursor-help">
                            Cash Flow
                            <span className="material-symbols-outlined text-[12px] text-blue-400">info</span>
                        </p>
                        <p className="text-lg font-black text-blue-700">{financials.annualCashFlow}</p>
                        <p className="text-[10px] text-blue-400">Annual</p>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center shadow-lg transition-opacity duration-200 ${activeTooltip === 'cashflow' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/tooltip:opacity-100 md:group-hover/tooltip:visible pointer-events-none'}`}>
                            Net profit after all expenses and mortgage payments.
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

            {/* Expandable Details */}
            <div className={`transition-all duration-300 ease-in-out border-t border-warm-gray-100 bg-gray-50/50 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Expense Breakdown */}
                    <div>
                        <h4 className="text-sm font-bold text-[#111814] mb-4 flex items-center gap-2 uppercase tracking-wide">
                            Expense Breakdown
                        </h4>

                        <div className="space-y-4">
                            {/* Visual Bar */}
                            <div className="flex h-2 rounded-full overflow-hidden w-full bg-warm-gray-200">
                                <div style={{ width: `${calculatePercentage(financials.expenses.tax, financials.expenses.total)}%` }} className="bg-blue-500" title="Taxes"></div>
                                <div style={{ width: `${calculatePercentage(financials.expenses.insurance, financials.expenses.total)}%` }} className="bg-blue-400" title="Insurance"></div>
                                <div style={{ width: `${calculatePercentage(financials.expenses.maintenance, financials.expenses.total)}%` }} className="bg-blue-300" title="Maintenance"></div>
                                <div style={{ width: `${calculatePercentage(financials.expenses.management, financials.expenses.total)}%` }} className="bg-purple-300" title="Management"></div>
                                <div style={{ width: `${calculatePercentage(financials.expenses.capex, financials.expenses.total)}%` }} className="bg-purple-400" title="CapEx"></div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-gray-600">Property Taxes</span>
                                    </div>
                                    <span className="font-medium text-gray-900">-{financials.expenses.tax}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span className="text-gray-600">Insurance</span>
                                    </div>
                                    <span className="font-medium text-gray-900">-{financials.expenses.insurance}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                        <span className="text-gray-600">Maintenance</span>
                                    </div>
                                    <span className="font-medium text-gray-900">-{financials.expenses.maintenance}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-300"></div>
                                        <span className="text-gray-600">Management</span>
                                    </div>
                                    <span className="font-medium text-gray-900">-{financials.expenses.management}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                        <span className="text-gray-600">CapEx Reserves</span>
                                    </div>
                                    <span className="font-medium text-gray-900">-{financials.expenses.capex}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cash Flow Details */}
                    <div>
                        <h4 className="text-sm font-bold text-[#111814] mb-4 uppercase tracking-wide">Cash Flow Details</h4>

                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Net Operating Income</span>
                                    <span className="text-sm font-bold text-gray-900">{financials.netOperatingIncome}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Est. Debt Service</span>
                                    <span className="text-sm font-medium text-red-500">-{financials.debtService}</span>
                                </div>

                                <div className="w-full h-px bg-gray-100 my-1"></div>

                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-500 uppercase">Annual Cash Flow</span>
                                    </div>
                                    <span className="text-xl font-black text-blue-600">{financials.annualCashFlow}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
