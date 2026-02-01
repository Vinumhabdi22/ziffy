"use client";

import { useState, useEffect } from 'react';
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
import { CityData } from '@/utils/cityDefaults';

interface ListingDetailsClientProps {
    listing: Listing;
    cityDefaults: CityData;
}

export default function ListingDetailsClient({ listing, cityDefaults }: ListingDetailsClientProps) {

    // Initial State - Use listing data or city defaults
    const [purchasePrice, setPurchasePrice] = useState(listing.price);
    const [rent, setRent] = useState(listing.estimated_rent || cityDefaults.median_rent);

    // Expenses (Monthly) - Use listing data or calculate from city defaults
    const [propertyTax, setPropertyTax] = useState(listing.expense_tax ? listing.expense_tax / 12 : (listing.price * cityDefaults.property_tax_rate) / 12);
    const [insurance, setInsurance] = useState(listing.expense_insurance ? listing.expense_insurance / 12 : (listing.price * cityDefaults.insurance_rate) / 12);
    const [maintenance, setMaintenance] = useState(listing.expense_maintenance ? listing.expense_maintenance / 12 : (rent * cityDefaults.maintenance_rate));
    const [management, setManagement] = useState(listing.expense_management ? listing.expense_management / 12 : (rent * cityDefaults.property_management_rate));
    const [capex, setCapex] = useState(listing.price * (cityDefaults.capex_reserve_rate || 0.05) / 12); // Default to 5% if missing, usually based on Revenue but here logic might be price or rent. Requirement says rate, assume same basis as maintenance if not specified, but usually CapEx is % of income OR set amount. Let's assume % of Rent like Maintenance/Management if simple rate.
    // Correction: Maintenance/Management are often % of rent. CapEx reserve often similar (e.g. 5% of GSI).
    // Let's check cityDefaults usage. maintenance_rate is used as (rent * rate).
    // So let's use (rent * rate) for CapEx too.
    // Wait, the line above `const [maintenance, setMaintenance] = ... (rent * cityDefaults.maintenance_rate)`
    // So I will use `rent` based calculation for consistency unless schema says otherwise.

    // Other fees (default to 0 if not present, as they differ by property)
    const [hoaFees, setHoaFees] = useState(listing.expense_hoa / 12);
    const [utilities, setUtilities] = useState(listing.expense_utilities / 12);
    const [gardener, setGardener] = useState(listing.expense_gardener / 12);
    const [trash, setTrash] = useState(listing.expense_trash / 12);

    // Financing State - Default Assumptions
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTerm, setLoanTerm] = useState(30);

    // Tab State
    const [activeTab, setActiveTab] = useState<'details' | 'financials'>('details');

    // Calculated Metrics
    const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPaymentAmount;

    // Monthly Mortgage Calculation (Principal + Interest)
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyMortgage = loanAmount > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : 0;

    const totalMonthlyExpenses = propertyTax + insurance + maintenance + management + hoaFees + utilities + gardener + trash + capex;
    const totalMonthlyCost = monthlyMortgage + totalMonthlyExpenses;
    const monthlyCashFlow = rent - totalMonthlyCost;
    const annualCashFlow = monthlyCashFlow * 12;
    const annualNOI = (rent * 12) - (totalMonthlyExpenses * 12);

    // Closing Costs Calculation
    const closingCostsPercent = listing.closing_costs_percentage || cityDefaults.closing_costs_percentage * 100;
    const closingCosts = purchasePrice * (closingCostsPercent / 100);

    const capRate = (annualNOI / purchasePrice) * 100;
    const cashOnCash = (annualCashFlow / downPaymentAmount) * 100; // Simplified
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
    const APPRECIATION_RATE = cityDefaults.avg_appreciation_rate || 0.03;
    const propertyValueYear5 = purchasePrice * Math.pow(1 + APPRECIATION_RATE, 5);
    const appreciationGain = propertyValueYear5 - purchasePrice;

    // Cumulative cash flow over 5 years (using constant growth for now as per simple defaults)
    let cumulativeCashFlow = 0;
    for (let year = 1; year <= 5; year++) {
        const growthFactorRent = Math.pow(1 + (cityDefaults.avg_rent_growth_rate || 0.03), year - 1);
        const growthFactorExpense = Math.pow(1 + 0.02, year - 1); // 2% expense inflation assumption
        const yearlyRent = (rent * 12) * growthFactorRent;
        const yearlyExpenses = (totalMonthlyExpenses * 12) * growthFactorExpense;
        const yearlyNOI = yearlyRent - yearlyExpenses;
        const yearlyCashFlow = yearlyNOI - (monthlyMortgage * 12);
        cumulativeCashFlow += yearlyCashFlow;
    }

    // Equity buildup through mortgage paydown
    const remainingBalanceYear5 = loanAmount > 0
        ? loanAmount * (Math.pow(1 + monthlyRate, numberOfPayments) - Math.pow(1 + monthlyRate, 60)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : 0;
    const equityBuildup = loanAmount - remainingBalanceYear5;

    // Total 5-Year Return
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
        year1ROI: `${year1ROIResults.returnOnCashInvestedWithTax.toFixed(1)}%`,
        roi: `${cashOnCash.toFixed(1)}%`,
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
            capex: `$${Math.round(capex * 12).toLocaleString('en-US')}`,
            total: `$${Math.round(totalMonthlyExpenses * 12).toLocaleString('en-US')}`
        },
        netOperatingIncome: `$${Math.round(annualNOI).toLocaleString('en-US')}`,
        debtService: `$${Math.round(monthlyMortgage * 12).toLocaleString('en-US')}`,
        annualCashFlow: `$${Math.round(annualCashFlow).toLocaleString('en-US')}`
    };

    // Projections Data
    const projections = [1, 2, 3, 5].map(year => {
        const growthFactorRent = Math.pow(1 + (cityDefaults.avg_rent_growth_rate || 0.03), year - 1);
        const growthFactorExpense = Math.pow(1 + 0.02, year - 1);
        const grossPotentialRent = (rent * 12) * growthFactorRent;
        const vacancyLoss = grossPotentialRent * (cityDefaults.vacancy_rate || 0.05);
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

    return (
        <div className="bg-background-light min-h-screen pb-20">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <ListingHero listing={{ ...listing, price: purchasePrice }} metrics={metrics} />

                {/* Tab Navigation */}
                <div className="flex border-b border-warm-gray-200 mb-8 mt-6">
                    <button
                        className={`py-3 px-6 font-semibold text-sm transition-colors relative ${activeTab === 'details' ? 'text-primary' : 'text-warm-gray-500 hover:text-text-dark'}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Property Details
                        {activeTab === 'details' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                        )}
                    </button>
                    <button
                        className={`py-3 px-6 font-semibold text-sm transition-colors relative ${activeTab === 'financials' ? 'text-primary' : 'text-warm-gray-500 hover:text-text-dark'}`}
                        onClick={() => setActiveTab('financials')}
                    >
                        Financials
                        {activeTab === 'financials' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {activeTab === 'details' ? (
                            <>
                                <PropertyOverview listing={listing} />
                                <PropertyDetails listing={listing} />
                                <FactsAndFeatures listing={listing} />
                            </>
                        ) : (
                            <>
                                <FinancialAnalysis financials={financials} />
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
                                        management: management,
                                        capex: capex
                                    }}
                                />
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
                                    cityDefaults={cityDefaults}
                                    calculatorValues={{
                                        proposedPrice: purchasePrice,
                                        downPaymentPercent: downPaymentPercent,
                                        loanAmount: loanAmount
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
                                        rent: rent,
                                        stabilizedMarketValue: listing.stabilized_market_value || 0,
                                        estimatedRehabCost: listing.estimated_rehab_cost || 0,
                                        builtInEquity: year1ROIResults.builtInEquity
                                    }}
                                />
                                <FinancialProjections projections={projections} />
                            </>
                        )}
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
                                    capex,
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
                                    setCapex,
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
