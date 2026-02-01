/**
 * Shared utility for calculating Year 1 ROI including Tax Savings
 * This ensures consistency between listings page and property details page
 */

export interface ROICalculationInputs {
    purchasePrice: number;
    estimatedRent: number;
    annualExpenses: number;
    downPaymentPercent?: number;
    interestRate?: number;
    loanTermYears?: number;
    closingCostsPercent?: number;
    stabilizedMarketValue?: number;
    estimatedRehabCost?: number;
}

export interface ROICalculationResults {
    cashInvestment: number;
    annualCashFlow: number;
    annualLoanPaydown: number;
    annualAppreciation: number;
    taxSavings: number;
    builtInEquity: number;
    totalAnnualReturn: number;
    totalAnnualReturnWithTax: number;
    returnOnCashInvested: number;
    returnOnCashInvestedWithTax: number;
    monthlyMortgage: number;
}

/**
 * Calculate Year 1 ROI including Tax Savings
 * @param inputs - The calculation inputs
 * @returns Detailed ROI calculation results
 */
export function calculateYear1ROI(inputs: ROICalculationInputs): ROICalculationResults {
    const {
        purchasePrice,
        estimatedRent,
        annualExpenses,
        downPaymentPercent = 20,
        interestRate = 6.5,
        loanTermYears = 30,
        closingCostsPercent = 0,
        stabilizedMarketValue = 0,
        estimatedRehabCost = 0
    } = inputs;

    // Calculate financing details
    const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPaymentAmount;
    const closingCosts = purchasePrice * (closingCostsPercent / 100);
    const cashInvestment = downPaymentAmount + closingCosts;

    // Calculate monthly mortgage payment
    const monthlyRate = interestRate / 100 / 12;
    const loanTermMonths = loanTermYears * 12;
    const monthlyMortgage = loanAmount > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
        : 0;

    // Calculate annual cash flow
    const annualRent = estimatedRent * 12;
    const annualDebtService = monthlyMortgage * 12;
    const annualCashFlow = annualRent - annualExpenses - annualDebtService;

    // Calculate annual loan paydown (principal portion)
    const firstYearInterest = loanAmount * (interestRate / 100);
    const totalAnnualMortgagePayments = monthlyMortgage * 12;
    const annualLoanPaydown = totalAnnualMortgagePayments - firstYearInterest;

    // Calculate annual appreciation (5%)
    const appreciationRate = 0.05;
    const annualAppreciation = purchasePrice * appreciationRate;

    // Calculate tax savings from depreciation
    const structureValuePercent = 0.80; // 80% of purchase price is structure (excluding land)
    const structureValue = purchasePrice * structureValuePercent;
    const depreciationPeriod = 27.5; // years
    const annualDepreciation = structureValue / depreciationPeriod;
    const taxRate = 0.25; // 25% tax rate
    const taxSavings = annualDepreciation * taxRate;

    // Calculate Built-In Equity
    // Formula: SMV - Purchase Price - Estimated Rehab Cost
    const builtInEquity = stabilizedMarketValue - purchasePrice - estimatedRehabCost;

    // Total annual return (without tax savings, but with Built-In Equity)
    // Exclude Appreciation for Year 1 ROI as per requirements
    const totalAnnualReturn = annualCashFlow + annualLoanPaydown + builtInEquity;

    // Total annual return (with tax savings)
    const totalAnnualReturnWithTax = totalAnnualReturn + taxSavings;

    // Return on cash invested
    const returnOnCashInvested = cashInvestment > 0
        ? (totalAnnualReturn / cashInvestment) * 100
        : 0;

    const returnOnCashInvestedWithTax = cashInvestment > 0
        ? (totalAnnualReturnWithTax / cashInvestment) * 100
        : 0;

    return {
        cashInvestment,
        annualCashFlow,
        annualLoanPaydown,
        annualAppreciation,
        taxSavings,
        builtInEquity,
        totalAnnualReturn,
        totalAnnualReturnWithTax,
        returnOnCashInvested,
        returnOnCashInvestedWithTax,
        monthlyMortgage
    };
}
