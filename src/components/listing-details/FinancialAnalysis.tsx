import { Financials } from '@/types';

interface FinancialAnalysisProps {
    financials: Financials;
}

export default function FinancialAnalysis({ financials }: FinancialAnalysisProps) {
    // Helper to calculate percentages for the visual bar
    const calculatePercentage = (valueStr: string, totalStr: string) => {
        const value = parseFloat(valueStr.replace(/[^0-9.-]+/g, ""));
        const total = parseFloat(totalStr.replace(/[^0-9.-]+/g, ""));
        return total > 0 ? (value / total) * 100 : 0;
    };

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-warm-gray-200">
                <h3 className="font-bold text-lg text-[#111814]">Financial Analysis</h3>
            </div>

            <div className="p-6 space-y-8">
                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-warm-gray-50 border border-warm-gray-100">
                        <p className="text-xs font-bold text-warm-gray-500 uppercase tracking-wider mb-1">Gross Income</p>
                        <p className="text-2xl font-black text-[#111814]">{financials.grossIncome}</p>
                        <p className="text-xs text-warm-gray-400 mt-1">Annual</p>
                    </div>
                    <div className="p-4 rounded-lg bg-warm-gray-50 border border-warm-gray-100">
                        <p className="text-xs font-bold text-warm-gray-500 uppercase tracking-wider mb-1">Total Expenses</p>
                        <p className="text-2xl font-black text-warm-gray-700">-{financials.expenses.total}</p>
                        <p className="text-xs text-warm-gray-400 mt-1">Annual</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Net Operating Income</p>
                        <p className="text-2xl font-black text-primary">{financials.netOperatingIncome}</p>
                        <p className="text-xs text-primary/60 mt-1">Annual</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Expense Breakdown */}
                    <div>
                        <h4 className="text-sm font-bold text-[#111814] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-warm-gray-400 text-lg">pie_chart</span>
                            Expense Breakdown
                        </h4>

                        <div className="space-y-4">
                            {/* Visual Bar */}
                            <div className="flex h-2 rounded-full overflow-hidden w-full bg-warm-gray-100">
                                <div style={{ width: `${calculatePercentage(financials.expenses.tax, financials.expenses.total)}%` }} className="bg-blue-400"></div>
                                <div style={{ width: `${calculatePercentage(financials.expenses.insurance, financials.expenses.total)}%` }} className="bg-blue-300"></div>
                                <div style={{ width: `${calculatePercentage(financials.expenses.maintenance, financials.expenses.total)}%` }} className="bg-blue-200"></div>
                                <div style={{ width: `${calculatePercentage(financials.expenses.management, financials.expenses.total)}%` }} className="bg-warm-gray-300"></div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span className="text-warm-gray-600">Property Taxes</span>
                                    </div>
                                    <span className="font-medium text-[#111814]">-{financials.expenses.tax}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                        <span className="text-warm-gray-600">Insurance</span>
                                    </div>
                                    <span className="font-medium text-[#111814]">-{financials.expenses.insurance}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                                        <span className="text-warm-gray-600">Maintenance</span>
                                    </div>
                                    <span className="font-medium text-[#111814]">-{financials.expenses.maintenance}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-warm-gray-300"></div>
                                        <span className="text-warm-gray-600">Management</span>
                                    </div>
                                    <span className="font-medium text-[#111814]">-{financials.expenses.management}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cash Flow Calculation */}
                    <div className="bg-warm-gray-50 rounded-xl p-5 border border-warm-gray-100 h-fit">
                        <h4 className="text-sm font-bold text-[#111814] mb-4">Cash Flow Calculation</h4>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-warm-gray-600">Net Operating Income</span>
                                <span className="text-sm font-bold text-[#111814]">{financials.netOperatingIncome}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-warm-gray-600">Est. Debt Service</span>
                                <span className="text-sm font-medium text-red-500">-{financials.debtService}</span>
                            </div>

                            <div className="pt-3 border-t border-warm-gray-200 mt-2">
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-warm-gray-500 uppercase tracking-widest">Est. Cash Flow</span>
                                        <span className="text-xs text-warm-gray-400">Annual</span>
                                    </div>
                                    <span className="text-3xl font-black text-primary">{financials.annualCashFlow}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
