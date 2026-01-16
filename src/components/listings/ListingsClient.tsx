"use client";

import { useState, useMemo } from 'react';
import ListingsFilter from './ListingsFilter';
import PropertyGrid from './PropertyGrid';
import LoadMore from './LoadMore';
import { Listing } from '@/types';

interface FilterOptions {
    status: string[];
    priceRange: string[];
    propertyType: string[];
    capRate: string[];
}

interface ListingsClientProps {
    initialListings: Listing[];
    filtersData: FilterOptions;
}

export default function ListingsClient({ initialListings, filtersData }: ListingsClientProps) {
    const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
        status: [],
        priceRange: [],
        propertyType: [],
        capRate: []
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Price: Low to High");

    // Helper to parse percentage string to number
    const parsePercentage = (percentStr: string | undefined) => {
        if (!percentStr) return 0;
        return parseFloat(percentStr.replace(/[^0-9.-]/g, ''));
    };

    // Filter logic
    const filteredListings = useMemo(() => {
        let result = initialListings.filter(listing => {
            // Search Query Filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    listing.title?.toLowerCase().includes(query) ||
                    listing.city?.toLowerCase().includes(query) ||
                    listing.state?.toLowerCase().includes(query) ||
                    listing.zipcode?.toLowerCase().includes(query);

                if (!matchesSearch) return false;
            }

            // Status Filter
            if (selectedFilters.status.length > 0) {
                const status = "Active"; // Placeholder
                if (!selectedFilters.status.includes(status)) return false;
            }

            // Property Type Filter
            if (selectedFilters.propertyType.length > 0) {
                const type = listing.property_type;
                if (!selectedFilters.propertyType.some(filter => type === filter)) {
                    return false;
                }
            }

            // Price Range Filter
            if (selectedFilters.priceRange.length > 0) {
                const price = listing.price;
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

        // Sorting Logic
        return result.sort((a, b) => {
            if (sortBy === "Price: Low to High") {
                return a.price - b.price;
            }
            if (sortBy === "Price: High to Low") {
                return b.price - a.price;
            }
            if (sortBy === "ROI: High to Low") {
                // Assuming ROI is stored as string "XX%" in listing.roi or need defaults
                const roiA = parsePercentage(a.roi) || 0;
                const roiB = parsePercentage(b.roi) || 0;
                return roiB - roiA;
            }
            if (sortBy === "Cap Rate: High to Low") {
                const capA = parsePercentage(a.capRate) || 0;
                const capB = parsePercentage(b.capRate) || 0;
                return capB - capA;
            }
            return 0;
        });
    }, [initialListings, selectedFilters, searchQuery, sortBy]);

    return (
        <>
            <ListingsFilter
                data={filtersData}
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />
            <PropertyGrid listings={filteredListings} />
            <LoadMore />
        </>
    );
}
