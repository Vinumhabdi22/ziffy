"use client";

import { useState } from 'react';
import ListingHero from './ListingHero';
import InvestmentSnapshot from './InvestmentSnapshot';
import FinancialAnalysis from './FinancialAnalysis';
import FinancialProjections from './FinancialProjections';
import PropertyDetails from './PropertyDetails';
import PropertyOverview from './PropertyOverview';
import InquiryForm from './InquiryForm';
import InvestorCalculator from './InvestorCalculator';
import FactsAndFeatures from './FactsAndFeatures';
import FinancingInformation from './FinancingInformation';
import CashRequiredAtClose from './CashRequiredAtClose';
import MonthlyCashflowAnalysis from './MonthlyCashflowAnalysis';
import YearOneROI from './YearOneROI';
import YearFiveROI from './YearFiveROI';
import { Listing } from '@/types';
import { calculateYear1ROI } from '@/utils/roiCalculations';

interface ListingDetailsClientProps {
    listing: Listing;
}

export default function ListingDetailsClient({ listing }: ListingDetailsClientProps) {
    // Parse initial values from JSON strings (e.g., "$850,000" -> 850000)
    // const parseCurrency = (val: string) => parseInt(val.replace(/[^0-9]/g, '')) || 0;

    // Initial State
    const [purchasePrice, setPurchasePrice] = useState(listing.price);
    const [rent, setRent] = useState(listing.estimated_rent);
    const [propertyTax, setPropertyTax] = useState(listing.expense_tax / 12);
    const [insurance, setInsurance] = useState(listing.expense_insurance / 12);
    const [maintenance, setMaintenance] = useState(listing.expense_maintenance / 12);
    const [management, setManagement] = useState(listing.expense_management / 12);
    const [hoaFees, setHoaFees] = useState(listing.expense_hoa / 12);
    const [utilities, setUtilities] = useState(listing.expense_utilities / 12);
    const [gardener, setGardener] = useState(listing.expense_gardener / 12);
    const [trash, setTrash] = useState(listing.expense_trash / 12);

    // Financing State
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTerm, setLoanTerm] = useState(30);

    // Calculated Metrics
    const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPaymentAmount;

    // Monthly Mortgage Calculation (Principal + Interest)
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyMortgage = loanAmount > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : 0;

    const totalMonthlyExpenses = propertyTax + insurance + maintenance + management + hoaFees + utilities + gardener + trash;
    const totalMonthlyCost = monthlyMortgage + totalMonthlyExpenses;
    const monthlyCashFlow = rent - totalMonthlyCost;
    const annualCashFlow = monthlyCashFlow * 12;
    const annualNOI = (rent * 12) - (totalMonthlyExpenses * 12);

    // Closing Costs Calculation
    const closingCostsPercent = listing.closing_costs_percentage || 0;
    const closingCosts = purchasePrice * (closingCostsPercent / 100);

    const capRate = (annualNOI / purchasePrice) * 100;
    const cashOnCash = (annualCashFlow / downPaymentAmount) * 100; // Simplified: usually includes closing costs
    const grossYield = ((rent * 12) / purchasePrice) * 100;

    // Calculate Year 1 ROI including Tax Savings using shared utility
    const annualExpenses = totalMonthlyExpenses * 12;
    const year1ROIResults = calculateYear1ROI({
        purchasePrice,
        estimatedRent: rent,
        annualExpenses,
        downPaymentPercent,
        interestRate,
        loanTermYears: loanTerm,
        closingCostsPercent,
        stabilizedMarketValue: listing.stabilized_market_value || 0,
        estimatedRehabCost: listing.estimated_rehab_cost || 0
    });

    // 5-Year Return Calculation
    const APPRECIATION_RATE = 0.03; // 3% annual property appreciation
    const propertyValueYear5 = purchasePrice * Math.pow(1 + APPRECIATION_RATE, 5);
    const appreciationGain = propertyValueYear5 - purchasePrice;

    // Cumulative cash flow over 5 years (using growth rates from projections)
    let cumulativeCashFlow = 0;
    for (let year = 1; year <= 5; year++) {
        const growthFactorRent = Math.pow(1 + 0.03, year - 1); // 3% rent growth
        const growthFactorExpense = Math.pow(1 + 0.02, year - 1); // 2% expense growth
        const yearlyRent = (rent * 12) * growthFactorRent;
        const yearlyExpenses = (totalMonthlyExpenses * 12) * growthFactorExpense;
        const yearlyNOI = yearlyRent - yearlyExpenses;
        const yearlyCashFlow = yearlyNOI - (monthlyMortgage * 12);
        cumulativeCashFlow += yearlyCashFlow;
    }

    // Equity buildup through mortgage paydown (simplified - using remaining balance calculation)
    const remainingBalanceYear5 = loanAmount > 0
        ? loanAmount * (Math.pow(1 + monthlyRate, numberOfPayments) - Math.pow(1 + monthlyRate, 60)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : 0;
    const equityBuildup = loanAmount - remainingBalanceYear5;

    // Total 5-Year Return = (Appreciation + Cumulative Cash Flow + Equity Buildup) / Initial Investment
    const totalReturn5Yr = downPaymentAmount > 0
        ? ((appreciationGain + cumulativeCashFlow + equityBuildup) / downPaymentAmount) * 100
        : 0;

    // Bundle metrics for child components
    const metrics = {
        purchasePrice: `$${purchasePrice.toLocaleString('en-US')}`,
        estimatedRent: `$${rent.toLocaleString('en-US')}/mo`,
        grossYield: `${grossYield.toFixed(1)}%`,
        noi: `$${annualNOI.toLocaleString('en-US')}/yr`,
        monthlyCashFlow: `$${Math.round(monthlyCashFlow).toLocaleString('en-US')}`,
        capRate: `${capRate.toFixed(1)}%`,
        cashOnCash: `${cashOnCash.toFixed(1)}%`,
        totalReturn5Yr: `${totalReturn5Yr.toFixed(0)}%`,
        year1ROI: `${year1ROIResults.returnOnCashInvestedWithTax.toFixed(1)}%`, // Year 1 ROI including Tax Savings
        roi: `${cashOnCash.toFixed(1)}%`, // aligning ROI with CoC for simplicity
        estimatedMarketValue: `$${(listing.estimated_market_value || 0).toLocaleString('en-US')}`,
        stabilizedMarketValue: `$${(listing.stabilized_market_value || 0).toLocaleString('en-US')}`,
        estimatedRehabCost: `$${(listing.estimated_rehab_cost || 0).toLocaleString('en-US')}`,
        builtInEquity: `$${year1ROIResults.builtInEquity.toLocaleString('en-US')}`
    };

    const financials = {
        grossIncome: `$${(rent * 12).toLocaleString('en-US')}`,
        expenses: {
            tax: `$${Math.round(propertyTax * 12).toLocaleString('en-US')}`,
            insurance: `$${Math.round(insurance * 12).toLocaleString('en-US')}`,
            maintenance: `$${Math.round(maintenance * 12).toLocaleString('en-US')}`,
            management: `$${Math.round(management * 12).toLocaleString('en-US')}`,
            total: `$${Math.round(totalMonthlyExpenses * 12).toLocaleString('en-US')}`
        },
        netOperatingIncome: `$${Math.round(annualNOI).toLocaleString('en-US')}`,
        debtService: `$${Math.round(monthlyMortgage * 12).toLocaleString('en-US')}`,
        annualCashFlow: `$${Math.round(annualCashFlow).toLocaleString('en-US')}`
    };

    // Projections Constants
    const RENT_GROWTH_RATE = 0.03;
    const EXPENSE_GROWTH_RATE = 0.02;
    const VACANCY_RATE = 0.05;

    // Calculate 5-Year Projections
    const calculateProjections = () => {
        const years = [1, 2, 3, 5];
        return years.map(year => {
            const growthFactorRent = Math.pow(1 + RENT_GROWTH_RATE, year - 1);
            const growthFactorExpense = Math.pow(1 + EXPENSE_GROWTH_RATE, year - 1);

            const grossPotentialRent = (rent * 12) * growthFactorRent;
            const vacancyLoss = grossPotentialRent * VACANCY_RATE;
            const effectiveGrossIncome = grossPotentialRent - vacancyLoss;

            const operatingExpenses = (totalMonthlyExpenses * 12) * growthFactorExpense;
            const noi = effectiveGrossIncome - operatingExpenses;

            return {
                year,
                grossPotentialRent,
                vacancyLoss,
                effectiveGrossIncome,
                operatingExpenses,
                noi
            };
        });
    };

    const projections = calculateProjections();

    return (
        <div className="bg-background-light min-h-screen pb-20">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <ListingHero listing={{ ...listing, price: purchasePrice }} metrics={metrics} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <PropertyOverview listing={listing} />
                        <FinancialAnalysis financials={financials} />
                        <FinancingInformation
                            listing={listing}
                            calculatorValues={{
                                proposedPrice: purchasePrice,
                                downPaymentPercent: downPaymentPercent,
                                interestRate: interestRate,
                                termYears: loanTerm
                            }}
                        />
                        <CashRequiredAtClose
                            listing={listing}
                            calculatorValues={{
                                proposedPrice: purchasePrice,
                                downPaymentPercent: downPaymentPercent,
                                loanAmount: loanAmount
                            }}
                        />
                        <MonthlyCashflowAnalysis
                            calculatorValues={{
                                rent: rent,
                                monthlyMortgage: monthlyMortgage,
                                propertyTax: propertyTax,
                                insurance: insurance,
                                gardener: gardener,
                                trash: trash,
                                utilities: utilities,
                                maintenance: maintenance,
                                hoaFees: hoaFees,
                                management: management
                            }}
                        />
                        <YearOneROI
                            calculatorValues={{
                                purchasePrice: purchasePrice,
                                downPaymentAmount: downPaymentAmount,
                                closingCosts: closingCosts,
                                monthlyCashFlow: monthlyCashFlow,
                                monthlyMortgage: monthlyMortgage,
                                loanAmount: loanAmount,
                                interestRate: interestRate,
                                stabilizedMarketValue: listing.stabilized_market_value || 0,
                                estimatedRehabCost: listing.estimated_rehab_cost || 0,
                                builtInEquity: year1ROIResults.builtInEquity
                            }}
                        />
                        <YearFiveROI
                            calculatorValues={{
                                purchasePrice: purchasePrice,
                                downPaymentAmount: downPaymentAmount,
                                closingCosts: closingCosts,
                                monthlyCashFlow: monthlyCashFlow,
                                monthlyMortgage: monthlyMortgage,
                                loanAmount: loanAmount,
                                interestRate: interestRate,
                                stabilizedMarketValue: listing.stabilized_market_value || 0,
                                estimatedRehabCost: listing.estimated_rehab_cost || 0,
                                builtInEquity: year1ROIResults.builtInEquity
                            }}
                        />
                        <FinancialProjections projections={projections} />
                        <FactsAndFeatures listing={listing} />

                        <PropertyDetails listing={listing} />
                    </div>

                    {/* Sidebar Column - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            <InvestorCalculator
                                values={{
                                    purchasePrice,
                                    originalPrice: listing.price,
                                    rent,
                                    propertyTax,
                                    insurance,
                                    maintenance,
                                    management,
                                    hoaFees,
                                    utilities,
                                    gardener,
                                    trash,
                                    downPaymentPercent,
                                    interestRate,
                                    loanTerm,
                                    monthlyMortgage
                                }}
                                setters={{
                                    setPurchasePrice,
                                    setRent,
                                    setPropertyTax,
                                    setInsurance,
                                    setMaintenance,
                                    setManagement,
                                    setHoaFees,
                                    setUtilities,
                                    setGardener,
                                    setTrash,
                                    setDownPaymentPercent,
                                    setInterestRate,
                                    setLoanTerm
                                }}
                            />
                            <InvestmentSnapshot metrics={metrics} />
                            <InquiryForm
                                propertyTitle={listing.title}
                                propertyAddress={listing.address}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
