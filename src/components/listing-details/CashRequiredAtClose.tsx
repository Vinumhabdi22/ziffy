import { Listing } from '@/types';

interface CashRequiredAtCloseProps {
    listing: Listing;
    calculatorValues: {
        proposedPrice: number;
        downPaymentPercent: number;
        loanAmount: number;
    };
}

export default function CashRequiredAtClose({ listing, calculatorValues }: CashRequiredAtCloseProps) {
    const { proposedPrice, downPaymentPercent, loanAmount } = calculatorValues;

    // Calculations
    const downPayment = proposedPrice * (downPaymentPercent / 100);

    // Loan Origination is typically 1.5% of the loan amount
    const LOAN_ORIGINATION_PERCENTAGE = 1.5;
    const loanOrigination = loanAmount * (LOAN_ORIGINATION_PERCENTAGE / 100);

    // Closing costs from database (as percentage of purchase price)
    const closingCostsPercentage = listing.closing_costs_percentage || 0;
    const estimatedClosingCosts = proposedPrice * (closingCostsPercentage / 100);

    // Net Cash Required (includes rehab cost)
    const netCashRequired = downPayment + loanOrigination + estimatedClosingCosts + (listing.estimated_rehab_cost || 0);

    const formatCurrency = (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-warm-gray-200">
                <h3 className="font-bold text-lg text-[#111814] flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">account_balance</span>
                    Cash Required at Close
                </h3>
            </div>

            <div className="p-6">
                <div className="space-y-4">
                    {/* Down Payment */}
                    <div className="flex justify-between items-center py-3 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Down Payment</span>
                        <span className="text-[#111814] font-bold">{formatCurrency(downPayment)}</span>
                    </div>

                    {/* Loan Origination */}
                    <div className="flex justify-between items-center py-3 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Loan Origination</span>
                        <span className="text-[#111814] font-bold">{formatCurrency(loanOrigination)}</span>
                    </div>

                    {/* Estimated Closing Costs */}
                    <div className="flex justify-between items-center py-3 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">
                            Estimated Closing Costs ({closingCostsPercentage}%)
                        </span>
                        <span className="text-[#111814] font-bold">{formatCurrency(estimatedClosingCosts)}</span>
                    </div>

                    {/* Estimated Rehab Cost */}
                    <div className="flex justify-between items-center py-3 border-b border-warm-gray-100">
                        <span className="text-warm-gray-600 font-medium">Estimated Rehab Cost</span>
                        <span className="text-[#111814] font-bold">{formatCurrency(listing.estimated_rehab_cost || 0)}</span>
                    </div>

                    {/* Net Cash Required */}
                    <div className="flex justify-between items-center py-4 bg-primary/5 -mx-6 px-6 mt-2">
                        <span className="text-[#111814] font-bold text-lg">Net Cash Required at Closing</span>
                        <span className="text-primary font-black text-xl">{formatCurrency(netCashRequired)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
