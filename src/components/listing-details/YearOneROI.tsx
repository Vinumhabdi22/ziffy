"use client";

import { calculateYear1ROI } from '@/utils/roiCalculations';

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
        stabilizedMarketValue = 0,
        estimatedRehabCost = 0,
        builtInEquity = 0,
    } = calculatorValues;

    // Cash Investment (Down Payment + Closing Costs)
    const downPaymentAmount = purchasePrice - loanAmount;
    const cashInvestment = downPaymentAmount + closingCosts;

    // Calculate Annual Cash Flow
    const annualCashFlow = monthlyCashFlow * 12;

    // Calculate Annual Loan Paydown (Principal portion of mortgage payments)
    // First year interest: approximate using average loan balance
    const firstYearInterest = loanAmount * (interestRate / 100);
    const totalAnnualMortgagePayments = monthlyMortgage * 12;
    const annualLoanPaydown = totalAnnualMortgagePayments - firstYearInterest;

    // Annual Appreciation (5%)
    const appreciationRate = 0.05;
    const annualAppreciation = purchasePrice * appreciationRate;

    // Total Annual Return (including Built-In Equity)
    const totalAnnualReturn = annualCashFlow + annualLoanPaydown + annualAppreciation + builtInEquity;

    // Return on Cash Invested
    const returnOnCashInvested = cashInvestment > 0 ? (totalAnnualReturn / cashInvestment) * 100 : 0;

    // Tax Savings Calculation
    const structureValuePercent = 0.80; // Assuming 80% of purchase price is structure (excluding land)
    const structureValue = purchasePrice * structureValuePercent;
    const depreciationPeriod = 27.5; // years
    const annualDepreciation = structureValue / depreciationPeriod;
    const taxRate = 0.25; // 25% tax rate
    const taxSavings = annualDepreciation * taxRate;

    // Total Return including Tax Savings
    const totalAnnualReturnWithTax = totalAnnualReturn + taxSavings;
    const returnOnCashInvestedWithTax = cashInvestment > 0 ? (totalAnnualReturnWithTax / cashInvestment) * 100 : 0;

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
                    Investment Analysis - Year 1 ROI
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
                            <span className="text-sm text-warm-gray-600">Annual Cash Flow</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(annualCashFlow)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Annual Loan Paydown (Loan 1)</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(annualLoanPaydown)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Annual Loan Paydown (Loan 2)</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(0)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Annual Appreciation {appreciationRate * 100}%</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(annualAppreciation)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Built-In Equity</span>
                            <span className={`text-sm font-semibold ${builtInEquity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(builtInEquity)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-200">
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>Total Annual Return</span>
                            <span className="text-sm font-bold" style={{ color: '#137fec' }}>
                                {formatCurrency(totalAnnualReturn)}
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
                                Total savings on Federal Income Tax (After Depreciation {depreciationPeriod}):
                            </p>
                            <p className="text-2xl font-bold mb-1" style={{ color: '#137fec' }}>
                                {formatCurrency(taxSavings)}
                            </p>
                            <p className="text-xs text-warm-gray-600">
                                (Assuming a {taxRate * 100}% tax rate)
                            </p>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                            <span className="text-sm text-warm-gray-600">Structure Value</span>
                            <span className="text-sm font-semibold" style={{ color: '#111814' }}>
                                {formatCurrency(structureValue)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-warm-gray-200">
                            <span className="text-sm font-bold" style={{ color: '#111814' }}>
                                Total Annual Return including Tax Savings
                            </span>
                            <span className="text-sm font-bold" style={{ color: '#137fec' }}>
                                {formatCurrency(totalAnnualReturnWithTax)}
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
