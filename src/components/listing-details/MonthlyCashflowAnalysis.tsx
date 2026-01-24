"use client";

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
    } = calculatorValues;

    // Calculate totals
    const totalMonthlyIncome = rent;
    const netMonthlyIncome = rent;

    const totalMonthlyExpenses = monthlyMortgage + propertyTax + insurance + gardener + trash + utilities + maintenance + hoaFees + management;
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
        <div className="bg-white rounded-lg border border-warm-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-warm-gray-200 bg-gray-50">
                <h2 className="text-xl font-bold" style={{ color: '#111814' }}>
                    Investment Analysis - Monthly Cashflow
                </h2>
            </div>

            <div className="p-6 space-y-8">
                {/* Operating Revenue Section */}
                <div>
                    <h3 className="text-base font-bold mb-4" style={{ color: '#111814' }}>
                        Monthly Cash Flow Analysis (Operating Revenue):
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Rental Income - Units</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(rent)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Total Monthly Income</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(totalMonthlyIncome)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-200">
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>Net Monthly Income</span>
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>
                                {formatCurrency(netMonthlyIncome)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Operating Expenses Section */}
                <div>
                    <h3 className="text-base font-bold mb-4" style={{ color: '#111814' }}>
                        Monthly Cash Flow Analysis (Operating Expenses):
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Loan Payments</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(monthlyMortgage)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Real Estate Taxes</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(propertyTax)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Insurance</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(insurance)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Gardener</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(gardener)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Trash</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(trash)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Utilities</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(utilities)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Maintenance</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(maintenance)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">HOA</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(hoaFees)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <div className="flex flex-col">
                                <span className="text-sm text-warm-gray-600">Management (%)</span>
                                <span className="text-xs text-warm-gray-400">{managementPercent}%</span>
                            </div>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(management)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-200">
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>Total Monthly Expenses</span>
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>
                                {formatCurrency(totalMonthlyExpenses)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-3 mt-2 rounded-lg px-4" style={{ backgroundColor: '#137fec15' }}>
                            <span className="text-base font-bold" style={{ color: '#111814' }}>Monthly Cash Flow</span>
                            <span className="text-lg font-bold" style={{ color: monthlyCashFlow >= 0 ? '#137fec' : '#ef4444' }}>
                                {formatCurrency(monthlyCashFlow)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
