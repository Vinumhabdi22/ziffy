"use client";

import { useState, useRef, useEffect } from "react";

interface FilterOptions {
    status: string[];
    priceRange: string[];
    propertyType: string[];
    capRate: string[];
}

interface ListingsFilterProps {
    data: FilterOptions;
    selectedFilters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

export default function ListingsFilter({ data, selectedFilters, onFilterChange, searchQuery, onSearchChange, sortBy, onSortChange }: ListingsFilterProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const SORT_OPTIONS = [
        "Price: Low to High",
        "Price: High to Low",
        "ROI: High to Low",
        "Cap Rate: High to Low"
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleFilterToggle = (category: string, value: string) => {
        const key = category as keyof FilterOptions;
        const currentSelected = selectedFilters[key] || [];
        const newSelected = currentSelected.includes(value)
            ? currentSelected.filter((item: string) => item !== value)
            : [...currentSelected, value];

        onFilterChange({
            ...selectedFilters,
            [key]: newSelected
        });
    };

    const isSelected = (category: string, value: string) => {
        const key = category as keyof FilterOptions;
        return selectedFilters[key]?.includes(value);
    };

    const renderDropdown = (category: string, options: string[]) => {
        if (openDropdown !== category) return null;

        return (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-warm-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-1">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleFilterToggle(category, option)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${isSelected(category, option)
                                ? "bg-primary/5 text-primary font-medium"
                                : "text-text-primary hover:bg-warm-gray-50"
                                }`}
                        >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected(category, option)
                                ? "bg-primary border-primary"
                                : "border-warm-gray-300"
                                }`}>
                                {isSelected(category, option) && (
                                    <span className="material-symbols-outlined text-white text-[10px] font-bold">check</span>
                                )}
                            </div>
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    if (!data) return null;

    return (
        <div className="relative md:sticky top-[73px] z-40 bg-background-light/95 backdrop-blur-sm py-4 border-b border-transparent transition-all">
            <div className="px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" ref={dropdownRef}>
                {/* Left Filters */}
                <div className="flex gap-2 flex-wrap items-center">
                    {/* Search Bar */}
                    <div className="relative group min-w-[280px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400 group-hover:text-primary transition-colors material-symbols-outlined text-[20px]">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search city, state, zip..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full h-9 pl-10 pr-4 rounded-full border border-warm-gray-200 bg-white text-sm text-text-dark placeholder:text-warm-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-primary/50 transition-all shadow-sm"
                        />
                    </div>

                    {/* Status */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('status')}
                            className={`group flex h-9 items-center justify-center gap-x-2 rounded-full border px-4 transition-all shadow-sm ${selectedFilters.status.length > 0
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-warm-gray-200 bg-white text-text-dark hover:border-primary/50"
                                }`}
                        >
                            <span className="text-sm font-medium">
                                Status {selectedFilters.status.length > 0 && `(${selectedFilters.status.length})`}
                            </span>
                            <span className={`material-symbols-outlined text-[20px] transition-transform ${openDropdown === 'status' ? 'rotate-180' : ''} ${selectedFilters.status.length > 0 ? 'text-primary' : 'text-warm-gray-400 group-hover:text-primary'}`}>expand_more</span>
                        </button>
                        {renderDropdown('status', data.status)}
                    </div>

                    {/* Price Range */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('priceRange')}
                            className={`group flex h-9 items-center justify-center gap-x-2 rounded-full border px-4 transition-all shadow-sm ${selectedFilters.priceRange.length > 0
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-warm-gray-200 bg-white text-text-dark hover:border-primary/50"
                                }`}
                        >
                            <span className="text-sm font-medium">
                                Price {selectedFilters.priceRange.length > 0 && `(${selectedFilters.priceRange.length})`}
                            </span>
                            <span className={`material-symbols-outlined text-[20px] transition-transform ${openDropdown === 'priceRange' ? 'rotate-180' : ''} ${selectedFilters.priceRange.length > 0 ? 'text-primary' : 'text-warm-gray-400 group-hover:text-primary'}`}>expand_more</span>
                        </button>
                        {renderDropdown('priceRange', data.priceRange)}
                    </div>

                    {/* Property Type */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('propertyType')}
                            className={`group flex h-9 items-center justify-center gap-x-2 rounded-full border px-4 transition-all shadow-sm ${selectedFilters.propertyType.length > 0
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-warm-gray-200 bg-white text-text-dark hover:border-primary/50"
                                }`}
                        >
                            <span className="text-sm font-medium">
                                Type {selectedFilters.propertyType.length > 0 && `(${selectedFilters.propertyType.length})`}
                            </span>
                            <span className={`material-symbols-outlined text-[20px] transition-transform ${openDropdown === 'propertyType' ? 'rotate-180' : ''} ${selectedFilters.propertyType.length > 0 ? 'text-primary' : 'text-warm-gray-400 group-hover:text-primary'}`}>expand_more</span>
                        </button>
                        {renderDropdown('propertyType', data.propertyType)}
                    </div>

                    {/* Cap Rate */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('capRate')}
                            className={`group flex h-9 items-center justify-center gap-x-2 rounded-full border px-4 transition-all shadow-sm ${selectedFilters.capRate.length > 0
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-warm-gray-200 bg-white text-text-dark hover:border-primary/50"
                                }`}
                        >
                            <span className="text-sm font-medium">
                                Cap Rate {selectedFilters.capRate.length > 0 && `(${selectedFilters.capRate.length})`}
                            </span>
                            <span className={`material-symbols-outlined text-[20px] transition-transform ${openDropdown === 'capRate' ? 'rotate-180' : ''} ${selectedFilters.capRate.length > 0 ? 'text-primary' : 'text-warm-gray-400 group-hover:text-primary'}`}>expand_more</span>
                        </button>
                        {renderDropdown('capRate', data.capRate)}
                    </div>
                </div>
                {/* Right Sort */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <span className="text-warm-gray-500 text-sm hidden sm:inline">Sort by:</span>
                    <div className="relative group cursor-pointer">
                        <button
                            onClick={() => toggleDropdown('sort')}
                            className="flex h-9 items-center justify-between gap-x-2 rounded-lg bg-white border border-warm-gray-200 px-3 min-w-[170px] shadow-sm hover:border-primary/50 transition-colors"
                        >
                            <span className="text-primary font-bold text-sm truncate">{sortBy}</span>
                            <span className={`material-symbols-outlined text-primary text-[20px] transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`}>sort</span>
                        </button>

                        {/* Sort Dropdown */}
                        {openDropdown === 'sort' && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-warm-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex flex-col gap-1">
                                    {SORT_OPTIONS.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                onSortChange(option);
                                                setOpenDropdown(null);
                                            }}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${sortBy === option
                                                ? "bg-primary/5 text-primary font-medium"
                                                : "text-text-primary hover:bg-warm-gray-50"
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${sortBy === option
                                                ? "border-primary"
                                                : "border-warm-gray-300"
                                                }`}>
                                                {sortBy === option && (
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                )}
                                            </div>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
