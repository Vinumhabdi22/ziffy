"use client";

interface YearFiveROIProps {
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

export default function YearFiveROI({ calculatorValues }: YearFiveROIProps) {
    const {
        purchasePrice,
        downPaymentAmount,
        closingCosts,
        monthlyCashFlow,
        monthlyMortgage,
        loanAmount,
        interestRate,
        stabilizedMarketValue = 0,
        estimatedRehabCost = 0,
        builtInEquity = 0,
    } = calculatorValues;

    const YEARS = 5;
    const APPRECIATION_RATE = 0.05; // 5% annual appreciation
    const TAX_RATE = 0.25; // 25% tax rate
    const DEPRECIATION_PERIOD = 27.5; // years
    const STRUCTURE_VALUE_PERCENT = 0.80; // 80% of purchase price is structure

    // Calculate Cash Investment (Down Payment + Closing Costs)
    const cashInvestment = downPaymentAmount + closingCosts;

    // Calculate Cumulative Annual Cash Flow (5 years)
    const cumulativeCashFlow = monthlyCashFlow * 12 * YEARS;

    // Calculate Cumulative Loan Paydown over 5 Years
    let remainingBalance = loanAmount;
    let cumulativePrincipalPaid = 0;
    const monthlyRate = interestRate / 100 / 12;

    for (let month = 1; month <= YEARS * 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyMortgage - interestPayment;
        cumulativePrincipalPaid += principalPayment;
        remainingBalance -= principalPayment;
    }

    // Calculate Property Value after 5 years with compound appreciation
    const futurePropertyValue = purchasePrice * Math.pow(1 + APPRECIATION_RATE, YEARS);
    const totalAppreciation = futurePropertyValue - purchasePrice;

    // Total Cumulative Return (including Built-In Equity)
    const totalCumulativeReturn = cumulativeCashFlow + cumulativePrincipalPaid + totalAppreciation + builtInEquity;

    // Return on Cash Invested
    const returnOnCashInvested = cashInvestment > 0 ? (totalCumulativeReturn / cashInvestment) * 100 : 0;

    // Tax Savings Calculation (cumulative over 5 years)
    const structureValue = purchasePrice * STRUCTURE_VALUE_PERCENT;
    const annualDepreciation = structureValue / DEPRECIATION_PERIOD;
    const cumulativeTaxSavings = annualDepreciation * TAX_RATE * YEARS;

    // Future Structure Value (appreciated)
    const futureStructureValue = structureValue * Math.pow(1 + APPRECIATION_RATE, YEARS);

    // Total Return including Tax Savings
    const totalReturnWithTax = totalCumulativeReturn + cumulativeTaxSavings;
    const returnOnCashInvestedWithTax = cashInvestment > 0 ? (totalReturnWithTax / cashInvestment) * 100 : 0;

    // Helper to format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Helper to format percentage
    const formatPercent = (value: number) => {
        return value.toFixed(2) + '%';
    };

    return (
        <div className="bg-white rounded-lg border border-warm-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-warm-gray-200 bg-gray-50">
                <h2 className="text-xl font-bold" style={{ color: '#111814' }}>
                    Investment Analysis - Year 5 ROI (Cumulative)
                </h2>
            </div>

            <div className="p-6 space-y-6">
                {/* Investment Summary */}
                <div>
                    <h3 className="text-base font-bold mb-4" style={{ color: '#111814' }}>
                        Investment Summary
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Cash Investment</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(cashInvestment)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Cumulative Cash Flow ({YEARS} Years)</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(cumulativeCashFlow)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Cumulative Loan Paydown (Loan 1)</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(cumulativePrincipalPaid)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Cumulative Loan Paydown (Loan 2)</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(0)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">
                                Cumulative Appreciation {APPRECIATION_RATE * 100}% (Compound)
                            </span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(totalAppreciation)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Built-In Equity</span>
                            <span className={`text-sm font-semibold ${builtInEquity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(builtInEquity)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-200">
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>Total Cumulative Return</span>
                            <span className="text-sm font-bold" style={{ color: '#137fec' }}>
                                {formatCurrency(totalCumulativeReturn)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-3 rounded-lg px-4 mt-2" style={{ backgroundColor: '#137fec15' }}>
                            <span className="text-base font-bold" style={{ color: '#111814' }}>Return on Cash Invested</span>
                            <span className="text-lg font-bold" style={{ color: '#137fec' }}>
                                {formatPercent(returnOnCashInvested)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tax Savings Section */}
                <div className="border-t border-warm-gray-200 pt-6">
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm font-semibold mb-2" style={{ color: '#111814' }}>
                                Total savings on Federal Income Tax (After Depreciation {DEPRECIATION_PERIOD}):
                            </p>
                            <p className="text-2xl font-bold mb-1" style={{ color: '#137fec' }}>
                                {formatCurrency(cumulativeTaxSavings)}
                            </p>
                            <p className="text-xs text-warm-gray-600">
                                (Assuming a {TAX_RATE * 100}% tax rate)
                            </p>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Structure Value (After {YEARS} Years Appreciation)</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(futureStructureValue)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-200">
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>
                                Total Annual Return including Tax Savings
                            </span>
                            <span className="text-sm font-bold" style={{ color: '#137fec' }}>
                                {formatCurrency(totalReturnWithTax)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-200">
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>
                                Total Cumulative Return
                            </span>
                            <span className="text-sm font-bold" style={{ color: '#137fec' }}>
                                {formatCurrency(totalCumulativeReturn)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-3 rounded-lg px-4" style={{ backgroundColor: '#137fec15' }}>
                            <span className="text-base font-bold" style={{ color: '#111814' }}>
                                Return on Cash Invested
                            </span>
                            <span className="text-lg font-bold" style={{ color: '#137fec' }}>
                                {formatPercent(returnOnCashInvestedWithTax)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
