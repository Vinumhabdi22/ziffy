export interface InvestmentMetrics {
    purchasePrice: string;
    grossYield: string;
    capRate: string;
    cashOnCash: string;
    totalReturn5Yr: string;
    year1ROI: string;
    monthlyCashFlow: string;
    estimatedMarketValue?: string;
    stabilizedMarketValue?: string;
    estimatedRehabCost?: string;
    builtInEquity?: string;
}

export interface Financials {
    grossIncome: string;
    expenses: {
        total: string;
        tax: string;
        insurance: string;
        maintenance: string;
        management: string;
        capex: string; // Added
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
    expense_hoa: number;
    expense_utilities: number;
    expense_gardener: number;
    expense_trash: number;

    // Facts & Features - General Information
    architectural_style?: string;
    building_area?: string;
    living_area?: string;
    property_condition?: string;

    // Facts & Features - Features & Amenities
    heating?: string;
    cooling?: string;
    flooring?: string;
    interior_features?: string;
    exterior_features?: string;
    parking?: string;

    // Facts & Features - Location Details
    subdivision?: string;
    lot_size?: string;
    lot_features?: string;
    view?: string;

    // Facts & Features - HOA & Fees
    hoa_fee?: string;
    association_fee?: string;
    fees_dues?: string;
    association_amenities?: string;
    fee_includes?: string;

    // Facts & Features - Utilities
    utilities?: string;
    sewer?: string;
    water_source?: string;
    road_surface_type?: string;

    // Facts & Features - School Information
    elementary_school?: string;
    middle_school?: string;
    high_school?: string;

    // Closing Costs
    closing_costs_percentage?: number;

    // Financial Valuation Fields
    estimated_market_value?: number;
    estimated_rehab_cost?: number;
    stabilized_market_value?: number;

    // Featured Status
    is_featured?: boolean;
    property_status?: 'Draft' | 'Active' | 'Pending' | 'Sold';

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
    hoaFees: number;
    utilities: number;
    gardener: number;
    trash: number;
    capex: number; // Added
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
    setHoaFees: (val: number) => void;
    setUtilities: (val: number) => void;
    setGardener: (val: number) => void;
    setTrash: (val: number) => void;
    setCapex: (val: number) => void; // Added
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    display_order: number;
    created_at: string;
}
