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
    const formatCurrency = (val: number) => `$${Math.round(val).toLocaleString()}`;
    const formatNegativeCurrency = (val: number) => `($${Math.round(val).toLocaleString()})`;

    // Re-map the array to objects keyed by year for easier checking if needed,
    // or just rely on the order passed [Year 1, Year 2, Year 3, Year 5]
    // The parent passes: [1, 2, 3, 5] in that order.

    const [y1, y2, y3, y5] = projections;

    return (
        <section className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm mb-6 scroll-mt-32" id="financials">
            <div className="px-6 py-4 border-b border-warm-gray-200 flex items-center justify-between">
                <h3 className="font-bold text-lg text-[#111814]">Financial Projections</h3>
                {/* <span className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/5 px-2 py-1 rounded-sm">
                    <span className="material-symbols-outlined text-sm">verified</span> Audited by PropAI Model v4.2
                </span> */}
            </div>

            <div className="p-6">
                <div className="border border-warm-gray-200 rounded-sm overflow-hidden shadow-sm">
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
        </section>
    );
}
