"use client";


import { useState } from 'react';
import { CalculatorValues, CalculatorSetters } from '@/types';

interface InvestorCalculatorProps {
    values: CalculatorValues;
    setters: CalculatorSetters;
}

export default function InvestorCalculator({ values, setters }: InvestorCalculatorProps) {
    const [isFinancingOpen, setIsFinancingOpen] = useState(true);
    const [isIncomeOpen, setIsIncomeOpen] = useState(false);
    const [isExpensesOpen, setIsExpensesOpen] = useState(false);

    // Formatting helpers
    const formatCurrency = (val: number) => `$${val.toLocaleString('en-US')}`;
    // const formatPercent = (val: number) => `${val}%`;

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-5 py-3 border-b border-warm-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-base text-text-dark">Investor Return Calculator</h3>
                <button
                    onClick={() => window.location.reload()}
                    className="text-primary text-xs font-medium hover:underline flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-[14px]">refresh</span> Reset
                </button>
            </div>

            <div className="p-5">
                {/* Purchase Price Input */}
                <div className="mb-4">
                    <label className="block text-xs text-warm-gray-600 mb-1.5 font-medium">Choose a purchase price to calculate returns:</label>
                    <div className="relative mb-3">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-500 font-bold text-sm">$</span>
                        <input
                            type="number"
                            value={values.purchasePrice}
                            onChange={(e) => setters.setPurchasePrice(Number(e.target.value))}
                            className="w-full pl-6 pr-3 py-2 rounded-lg border border-warm-gray-200 text-base font-bold text-text-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>

                    {/* Price Slider */}
                    <div className="px-1">
                        <input
                            type="range"
                            min={Math.round(values.originalPrice * 0.8)}
                            max={Math.round(values.originalPrice * 1.2)}
                            step={100}
                            value={values.purchasePrice}
                            onChange={(e) => setters.setPurchasePrice(Number(e.target.value))}
                            className="w-full h-2 bg-warm-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between mt-2 text-xs text-warm-gray-500 font-medium">
                            <span
                                onClick={() => setters.setPurchasePrice(Math.round(values.originalPrice * 0.8))}
                                className="cursor-pointer hover:text-primary transition-colors"
                            >
                                {formatCurrency(Math.round(values.originalPrice * 0.8))}
                            </span>
                            <span
                                onClick={() => setters.setPurchasePrice(values.originalPrice)}
                                className="cursor-pointer hover:text-text-dark transition-colors font-bold text-text-dark"
                            >
                                {formatCurrency(values.originalPrice)}
                            </span>
                            <span
                                onClick={() => setters.setPurchasePrice(Math.round(values.originalPrice * 1.2))}
                                className="cursor-pointer hover:text-primary transition-colors"
                            >
                                {formatCurrency(Math.round(values.originalPrice * 1.2))}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <div className="divide-y divide-warm-gray-100 border border-warm-gray-200 rounded-lg overflow-hidden">

                    {/* Financing Section */}
                    <div className="bg-white">
                        <button
                            onClick={() => setIsFinancingOpen(!isFinancingOpen)}
                            className="w-full flex justify-between items-center px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-bold text-sm text-text-dark">Financing</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-text-dark">{formatCurrency(Math.round(values.monthlyMortgage))}/mo</span>
                                <span className="text-primary text-[10px] font-bold uppercase flex items-center">
                                    Edit <span className="material-symbols-outlined text-[14px]">{isFinancingOpen ? 'expand_less' : 'edit'}</span>
                                </span>
                            </div>
                        </button>

                        {isFinancingOpen && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-warm-gray-100 grid grid-cols-1 gap-3">
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">Down Payment (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={values.downPaymentPercent}
                                            onChange={(e) => setters.setDownPaymentPercent(Number(e.target.value))}
                                            className="w-full pl-2 pr-5 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">Interest Rate (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={values.interestRate}
                                            onChange={(e) => setters.setInterestRate(Number(e.target.value))}
                                            className="w-full pl-2 pr-5 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">Loan Term (Years)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={values.loanTerm}
                                            onChange={(e) => setters.setLoanTerm(Number(e.target.value))}
                                            className="w-full pl-2 pr-2 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rental Income Section */}
                    <div className="bg-white">
                        <button
                            onClick={() => setIsIncomeOpen(!isIncomeOpen)}
                            className="w-full flex justify-between items-center px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-bold text-sm text-text-dark">Est. Rent</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-text-dark">{formatCurrency(values.rent)}/mo</span>
                                <span className="text-primary text-[10px] font-bold uppercase flex items-center">
                                    Edit <span className="material-symbols-outlined text-[14px]">{isIncomeOpen ? 'expand_less' : 'edit'}</span>
                                </span>
                            </div>
                        </button>
                        {isIncomeOpen && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-warm-gray-100">
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">Monthly Rent</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            value={values.rent}
                                            onChange={(e) => setters.setRent(Number(e.target.value))}
                                            className="w-full pl-5 pr-2 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Expenses Section */}
                    <div className="bg-white">
                        <button
                            onClick={() => setIsExpensesOpen(!isExpensesOpen)}
                            className="w-full flex justify-between items-center px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-bold text-sm text-text-dark">Expenses</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-text-dark">
                                    {formatCurrency(Math.round(values.propertyTax + values.insurance + values.maintenance + values.management + values.hoaFees + values.utilities + values.gardener + values.trash + values.capex))}/mo
                                </span>
                                <span className="text-primary text-[10px] font-bold uppercase flex items-center">
                                    Edit <span className="material-symbols-outlined text-[14px]">{isExpensesOpen ? 'expand_less' : 'edit'}</span>
                                </span>
                            </div>
                        </button>
                        {isExpensesOpen && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-warm-gray-100 grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">Tax</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            value={Math.round(values.propertyTax)}
                                            onChange={(e) => setters.setPropertyTax(Number(e.target.value))}
                                            className="w-full pl-5 pr-2 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">Insurance</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            value={Math.round(values.insurance)}
                                            onChange={(e) => setters.setInsurance(Number(e.target.value))}
                                            className="w-full pl-5 pr-2 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">Maint.</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            value={Math.round(values.maintenance)}
                                            onChange={(e) => setters.setMaintenance(Number(e.target.value))}
                                            className="w-full pl-5 pr-2 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">Mgmt.</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            value={Math.round(values.management)}
                                            onChange={(e) => setters.setManagement(Number(e.target.value))}
                                            className="w-full pl-5 pr-2 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">HOA Fees</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            value={Math.round(values.hoaFees)}
                                            onChange={(e) => setters.setHoaFees(Number(e.target.value))}
                                            className="w-full pl-5 pr-2 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-warm-gray-500 font-bold uppercase mb-1 block">CapEx</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-warm-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            value={Math.round(values.capex)}
                                            onChange={(e) => setters.setCapex(Number(e.target.value))}
                                            className="w-full pl-5 pr-2 py-1.5 rounded border border-warm-gray-300 text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                                {/* Utilities, Gardener, Trash removed from UI as per requirements */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Total Row */}
                <div className="mt-4 flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-1 text-warm-gray-600 font-medium text-sm">
                        Total Cash Flow <span className="material-symbols-outlined text-[14px] cursor-help" title="Net income after all expenses">info</span>
                    </div>
                    <div className="text-xl font-extrabold text-text-dark">
                        {formatCurrency(Math.round(values.rent - (values.monthlyMortgage + values.propertyTax + values.insurance + values.maintenance + values.management + values.hoaFees + values.utilities + values.gardener + values.trash + values.capex)))}
                    </div>
                </div>
            </div>
        </div>
    );
}
