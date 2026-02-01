
import { supabase } from './supabase/client';

export interface CityData {
    city_id: number;
    city_name: string;
    state_code: string;
    zip_code?: string;
    property_tax_rate: number;
    insurance_rate: number;
    avg_appreciation_rate: number;
    avg_rent_growth_rate: number;
    vacancy_rate: number;
    property_management_rate: number;
    maintenance_rate: number;
    capex_reserve_rate: number;
    avg_market_cap_rate: number;
    median_home_price: number;
    median_rent: number;
    rent_to_price_ratio: number;
    population_growth_rate: number;
    job_growth_rate: number;
    last_updated: string;
    data_source: string;
    closing_costs_percentage: number; // Added based on "Closing Costs from city-level percentage" requirement
}

// Map of city listings to their default data
// Used as fallback if DB fetch fails or for initial render
export const CITY_DEFAULTS_FALLBACK: Record<string, CityData> = {
    // Default fallback
    "default": {
        city_id: 0,
        city_name: "National Average",
        state_code: "US",
        zip_code: "00000",
        property_tax_rate: 0.012, // 1.2%
        insurance_rate: 0.005, // 0.5%
        avg_appreciation_rate: 0.035, // 3.5%
        avg_rent_growth_rate: 0.03, // 3%
        vacancy_rate: 0.05, // 5%
        property_management_rate: 0.08, // 8%
        maintenance_rate: 0.05, // 5%
        capex_reserve_rate: 0.05, // 5%
        avg_market_cap_rate: 0.06, // 6%
        median_home_price: 400000,
        median_rent: 2000,
        rent_to_price_ratio: 0.005,
        population_growth_rate: 0.01,
        job_growth_rate: 0.015,
        last_updated: "2026-01-31",
        data_source: "Trustreet Internal",
        closing_costs_percentage: 0.03 // Assuming 3% default
    },
    // Specific city examples
    "Somerville": {
        city_id: 101,
        city_name: "Somerville",
        state_code: "TN",
        zip_code: "38135",
        property_tax_rate: 0.0065,
        insurance_rate: 0.0040,
        avg_appreciation_rate: 0.030,
        avg_rent_growth_rate: 0.020,
        vacancy_rate: 0.050,
        property_management_rate: 0.080,
        maintenance_rate: 0.050,
        capex_reserve_rate: 0.050,
        avg_market_cap_rate: 0.075,
        median_home_price: 350000,
        median_rent: 1800,
        rent_to_price_ratio: 0.062,
        population_growth_rate: 0.015,
        job_growth_rate: 0.020,
        last_updated: "2026-01-15",
        data_source: "internal assumptions",
        closing_costs_percentage: 0.02 // Example specific to city
    },
    // Matching some cities from the sample listings
    "Brooklyn": {
        city_id: 102,
        city_name: "Brooklyn",
        state_code: "NY",
        zip_code: "11201",
        property_tax_rate: 0.019,
        insurance_rate: 0.006,
        avg_appreciation_rate: 0.045,
        avg_rent_growth_rate: 0.035,
        vacancy_rate: 0.03,
        property_management_rate: 0.06,
        maintenance_rate: 0.04,
        capex_reserve_rate: 0.04,
        avg_market_cap_rate: 0.045,
        median_home_price: 950000,
        median_rent: 3500,
        rent_to_price_ratio: 0.044,
        population_growth_rate: 0.005,
        job_growth_rate: 0.025,
        last_updated: "2026-01-31",
        data_source: "Trustreet Internal",
        closing_costs_percentage: 0.04
    },
    "Manhattan": {
        city_id: 103,
        city_name: "Manhattan",
        state_code: "NY",
        zip_code: "10016",
        property_tax_rate: 0.020,
        insurance_rate: 0.005,
        avg_appreciation_rate: 0.040,
        avg_rent_growth_rate: 0.040,
        vacancy_rate: 0.04,
        property_management_rate: 0.05,
        maintenance_rate: 0.03,
        capex_reserve_rate: 0.03,
        avg_market_cap_rate: 0.04,
        median_home_price: 1300000,
        median_rent: 4200,
        rent_to_price_ratio: 0.038,
        population_growth_rate: -0.01,
        job_growth_rate: 0.02,
        last_updated: "2026-01-31",
        data_source: "Trustreet Internal",
        closing_costs_percentage: 0.05
    }
};

export async function getCityDefaults(city: string, zipcode?: string): Promise<CityData> {
    try {
        let query = supabase
            .from('city_defaults')
            .select('*')
            .ilike('city_name', city);

        // If we have a zipcode, try to match it specifically first
        // Note: This logic assumes we want the most specific match.
        // Since we can't easily do "try finding exact zip, if not find city only" in one simple query without functions,
        // we'll fetch all matching city rows and filter in code for best match. 
        // Given the dataset is small per city, this is efficient.

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
            console.warn(`Could not fetch city defaults for ${city}, using fallback.`, error);
            return CITY_DEFAULTS_FALLBACK[city] || CITY_DEFAULTS_FALLBACK["default"];
        }

        const cityRows = data as CityData[];

        // 1. Try to find exact zip match if provided
        if (zipcode) {
            const zipMatch = cityRows.find(row => row.zip_code === zipcode);
            if (zipMatch) return zipMatch;
        }

        // 2. Try to find a "default" for the city (e.g. where zip_code is empty or '00000' or just the first one)
        // For now, if no specific zip match, return any row for the city (or preferably one with generic zip if you have that convention)
        return cityRows[0];

    } catch (e) {
        console.error("Error fetching city defaults:", e);
        return CITY_DEFAULTS_FALLBACK[city] || CITY_DEFAULTS_FALLBACK["default"];
    }
}
