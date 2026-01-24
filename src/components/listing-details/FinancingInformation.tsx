
import { Listing } from '@/types';

interface FinancingInformationProps {
    listing: Listing;
    calculatorValues: {
        proposedPrice: number;
        downPaymentPercent: number;
        interestRate: number;
        termYears: number;
    };
}

export default function FinancingInformation({ listing, calculatorValues }: FinancingInformationProps) {
    // Financing values from Calculator prop
    const askingPrice = listing.price;
    const proposedPrice = calculatorValues.proposedPrice;
    const downPaymentPercent = calculatorValues.downPaymentPercent;
    const interestRate = calculatorValues.interestRate;
    const termYears = calculatorValues.termYears;

    // Calculations
    const cashDownTotal = proposedPrice * (downPaymentPercent / 100);
    const loanPercentage = 100 - downPaymentPercent;
    const loanAmount = proposedPrice - cashDownTotal;

    // Mortgage Calculation Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = termYears * 12;

    const monthlyPayment = loanAmount > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : 0;

    const formatCurrency = (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-warm-gray-200">
                <h3 className="font-bold text-lg text-[#111814] flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">payments</span>
                    Financing Information
                </h3>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {/* Asking & Proposed Price */}
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Asking Price</span>
                        <span className="text-[#111814] font-bold">{formatCurrency(askingPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Proposed Purchase Price</span>
                        <span className="text-primary font-bold">{formatCurrency(proposedPrice)}</span>
                    </div>

                    {/* Down Payment Info */}
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Percent Cash Down</span>
                        <span className="text-[#111814] font-bold">{downPaymentPercent}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Cash Down Total</span>
                        <span className="text-[#111814] font-bold">{formatCurrency(cashDownTotal)}</span>
                    </div>

                    {/* Loan Info */}
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Loan #1 (Amortized) Percentage</span>
                        <span className="text-[#111814] font-bold">{loanPercentage}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Loan Amount</span>
                        <span className="text-[#111814] font-bold">{formatCurrency(loanAmount)}</span>
                    </div>

                    {/* Terms */}
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Interest Rate (%)</span>
                        <span className="text-[#111814] font-bold">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Term (Years)</span>
                        <span className="text-[#111814] font-bold">{termYears}</span>
                    </div>

                    {/* Payments */}
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100 md:col-span-2 bg-gray-50/50 -mx-6 px-6 mt-2">
                        <span className="text-warm-gray-700 font-bold">Monthly Payment</span>
                        <span className="text-primary font-black text-lg">{formatCurrency(monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-warm-gray-100 md:col-span-2">
                        <span className="text-warm-gray-600 font-medium">Total Loan Amount</span>
                        <span className="text-[#111814] font-bold">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 md:col-span-2">
                        <span className="text-warm-gray-600 font-medium">Total Monthly Payment</span>
                        <span className="text-[#111814] font-bold">{formatCurrency(monthlyPayment)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
