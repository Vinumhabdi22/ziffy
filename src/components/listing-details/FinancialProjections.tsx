"use client";

import { useState } from 'react';

interface Projection {
    year: number;
    grossPotentialRent: number;
    vacancyLoss: number;
    effectiveGrossIncome: number;
    operatingExpenses: number;
    noi: number;
}

interface FinancialProjectionsProps {
    projections: Projection[];
}

export default function FinancialProjections({ projections }: FinancialProjectionsProps) {
    const [isOpen, setIsOpen] = useState(false);

    const formatCurrency = (val: number) => `$${Math.round(val).toLocaleString()}`;
    const formatNegativeCurrency = (val: number) => `($${Math.round(val).toLocaleString()})`;

    // Re-map the array to objects keyed by year for easier checking if needed,
    // or just rely on the order passed [Year 1, Year 2, Year 3, Year 5]
    // The parent passes: [1, 2, 3, 5] in that order.

    const [y1, y2, y3, y5] = projections;

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header - Always Visible */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
            >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-600 bg-orange-50 p-1.5 rounded-full text-[20px]">analytics</span>
                        <h2 className="text-lg font-bold text-gray-900">Financial Projections</h2>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary hidden md:inline-block">
                        {isOpen ? 'Hide Details' : 'View Details'}
                    </span>
                    <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </button>

            {/* Expandable Content */}
            <div className={`transition-all duration-300 ease-in-out border-t border-gray-100 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 bg-gray-50/50">
                    <div className="border border-warm-gray-200 rounded-sm overflow-hidden shadow-sm bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-warm-gray-50 text-warm-gray-500 uppercase text-xs font-medium tracking-wider border-b border-warm-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Line Item</th>
                                        <th className="px-6 py-4 text-right font-mono">Year 1</th>
                                        <th className="px-6 py-4 text-right font-mono">Year 2</th>
                                        <th className="px-6 py-4 text-right font-mono">Year 3</th>
                                        <th className="px-6 py-4 text-right font-mono">Year 5</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-warm-gray-100 bg-white">
                                    {/* Income Group */}
                                    <tr className="hover:bg-warm-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-[#111814]">Gross Potential Rent</td>
                                        <td className="px-6 py-3 text-right font-mono text-warm-gray-600">{formatCurrency(y1.grossPotentialRent)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-warm-gray-600">{formatCurrency(y2.grossPotentialRent)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-warm-gray-600">{formatCurrency(y3.grossPotentialRent)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-warm-gray-600">{formatCurrency(y5.grossPotentialRent)}</td>
                                    </tr>
                                    <tr className="hover:bg-warm-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-[#111814] flex items-center gap-2">
                                            Vacancy Loss
                                            <span className="text-xs text-warm-gray-400 font-normal">(5%)</span>
                                        </td>
                                        <td className="px-6 py-3 text-right font-mono text-red-500">{formatNegativeCurrency(y1.vacancyLoss)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-red-500">{formatNegativeCurrency(y2.vacancyLoss)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-red-500">{formatNegativeCurrency(y3.vacancyLoss)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-red-500">{formatNegativeCurrency(y5.vacancyLoss)}</td>
                                    </tr>
                                    <tr className="bg-warm-gray-50/50 font-semibold border-t border-warm-gray-200">
                                        <td className="px-6 py-3 text-[#111814]">Effective Gross Income</td>
                                        <td className="px-6 py-3 text-right font-mono text-[#111814]">{formatCurrency(y1.effectiveGrossIncome)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-[#111814]">{formatCurrency(y2.effectiveGrossIncome)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-[#111814]">{formatCurrency(y3.effectiveGrossIncome)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-[#111814]">{formatCurrency(y5.effectiveGrossIncome)}</td>
                                    </tr>
                                    {/* Expenses Group */}
                                    <tr className="hover:bg-warm-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-[#111814]">Operating Expenses</td>
                                        <td className="px-6 py-3 text-right font-mono text-warm-gray-600">{formatNegativeCurrency(y1.operatingExpenses)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-warm-gray-600">{formatNegativeCurrency(y2.operatingExpenses)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-warm-gray-600">{formatNegativeCurrency(y3.operatingExpenses)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-warm-gray-600">{formatNegativeCurrency(y5.operatingExpenses)}</td>
                                    </tr>
                                    {/* NOI */}
                                    <tr className="bg-primary/5 border-t-2 border-primary/20">
                                        <td className="px-6 py-4 font-bold text-primary">Net Operating Income (NOI)</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-[#111814]">{formatCurrency(y1.noi)}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-[#111814]">{formatCurrency(y2.noi)}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-[#111814]">{formatCurrency(y3.noi)}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-[#111814]">{formatCurrency(y5.noi)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
