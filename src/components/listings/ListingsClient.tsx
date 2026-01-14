"use client";

import { useState, useMemo } from 'react';
import ListingsFilter from './ListingsFilter';
import PropertyGrid from './PropertyGrid';
import LoadMore from './LoadMore';

interface ListingsClientProps {
    initialListings: any[];
    filtersData: {
        status: string[];
        priceRange: string[];
        propertyType: string[];
        capRate: string[];
    };
}

export default function ListingsClient({ initialListings, filtersData }: ListingsClientProps) {
    const [selectedFilters, setSelectedFilters] = useState({
        status: [] as string[],
        priceRange: [] as string[],
        propertyType: [] as string[],
        capRate: [] as string[]
    });

    const [sortBy, setSortBy] = useState("Highest Yield");

    // Helper to parse price string to number
    const parsePrice = (priceStr: string) => {
        if (!priceStr) return 0;
        return parseInt(priceStr.replace(/[^0-9]/g, ''));
    };

    // Helper to parse percentage string to number
    const parsePercentage = (percentStr: string) => {
        if (!percentStr) return 0;
        return parseFloat(percentStr.replace('%', ''));
    };

    // Filter logic
    const filteredListings = useMemo(() => {
        return initialListings.filter(listing => {
            // Status Filter
            if (selectedFilters.status.length > 0) {
                // Check both root status and quickStats status
                const status = listing.details?.quickStats?.status || "Active";
                if (!selectedFilters.status.includes(status)) return false;
            }

            // Property Type Filter
            if (selectedFilters.propertyType.length > 0) {
                // Check quickStats propertyType
                const type = listing.details?.quickStats?.propertyType;
                // Loose matching because data has "Condo", "Apartment" but filter might have "Multi Family"
                // For now, simple inclusion
                if (!selectedFilters.propertyType.some(filter => type === filter)) {
                    // specific handling if needed, but for now strict match
                    return false;
                }
            }

            // Price Range Filter
            if (selectedFilters.priceRange.length > 0) {
                const price = parsePrice(listing.price);
                const matchesPrice = selectedFilters.priceRange.some(range => {
                    if (range === "Under $100k") return price < 100000;
                    if (range === "$100k - $500k") return price >= 100000 && price <= 500000;
                    if (range === "$500k - $1M") return price >= 500000 && price <= 1000000;
                    if (range === "$1M+") return price > 1000000;
                    return false;
                });
                if (!matchesPrice) return false;
            }

            // Cap Rate Filter
            if (selectedFilters.capRate.length > 0) {
                const capRate = parsePercentage(listing.capRate);
                const matchesCap = selectedFilters.capRate.some(range => {
                    if (range === "3% - 5%") return capRate >= 3 && capRate <= 5;
                    if (range === "5% - 7%") return capRate > 5 && capRate <= 7;
                    if (range === "7% - 9%") return capRate > 7 && capRate <= 9;
                    if (range === "9%+") return capRate > 9;
                    return false;
                });
                if (!matchesCap) return false;
            }

            return true;
        });
    }, [initialListings, selectedFilters]);

    // Sort logic can be added here if needed, current task focus is filters.

    return (
        <>
            <ListingsFilter
                data={filtersData}
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
            />
            <PropertyGrid listings={filteredListings} />
            <LoadMore />
        </>
    );
}
