export interface InvestmentMetrics {
    purchasePrice: string;
    grossYield: string;
    capRate: string;
    cashOnCash: string;
    totalReturn5Yr: string;
    monthlyCashFlow: string;
}

export interface Financials {
    grossIncome: string;
    expenses: {
        total: string;
        tax: string;
        insurance: string;
        maintenance: string;
        management: string;
    };
    netOperatingIncome: string;
    debtService: string;
    annualCashFlow: string;
}

export interface ListingDetails {
    description: string;
    features: string[];
    quickStats: {
        propertyType: string;
        yearBuilt?: string;
        status?: string;
    };
    gallery: string[];
    investmentMetrics?: {
        estimatedRent: string;
    };
    financials?: {
        expenses: {
            tax: string;
            insurance: string;
            maintenance: string;
            management: string;
        }
    };
}

export interface Listing {
    id: string;
    title: string; // added
    address: string;
    city: string;
    state: string;
    zipcode: string;
    price: number; // Changed string to number
    beds: number;
    baths: number;
    sqft: number;
    year_built: number;
    property_type: string;
    badge?: string;
    badge_color?: string;
    gallery: string[];
    image: string;
    description: string;
    features: string[];
    map_url?: string;

    // Financials
    estimated_rent: number;
    expense_tax: number;
    expense_insurance: number;
    expense_maintenance: number;
    expense_management: number;

    // Optional / Calculated / Legacy support
    capRate?: string; // string for display
    grossYield?: string;
    roi?: string;
}

export interface CalculatorValues {
    purchasePrice: number;
    originalPrice: number;
    monthlyMortgage: number;
    downPaymentPercent: number;
    interestRate: number;
    loanTerm: number;
    rent: number;
    propertyTax: number;
    insurance: number;
    maintenance: number;
    management: number;
}

export interface CalculatorSetters {
    setPurchasePrice: (val: number) => void;
    setDownPaymentPercent: (val: number) => void;
    setInterestRate: (val: number) => void;
    setLoanTerm: (val: number) => void;
    setRent: (val: number) => void;
    setPropertyTax: (val: number) => void;
    setInsurance: (val: number) => void;
    setMaintenance: (val: number) => void;
    setManagement: (val: number) => void;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    display_order: number;
    created_at: string;
}
