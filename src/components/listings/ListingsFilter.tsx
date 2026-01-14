"use client";

import { useState, useRef, useEffect } from "react";

interface ListingsFilterProps {
    data: {
        status: string[];
        priceRange: string[];
        propertyType: string[];
        capRate: string[];
    };
    selectedFilters: {
        status: string[];
        priceRange: string[];
        propertyType: string[];
        capRate: string[];
    };
    onFilterChange: (filters: any) => void;
}

export default function ListingsFilter({ data, selectedFilters, onFilterChange }: ListingsFilterProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        const currentSelected = (selectedFilters as any)[category] || [];
        const newSelected = currentSelected.includes(value)
            ? currentSelected.filter((item: string) => item !== value)
            : [...currentSelected, value];

        onFilterChange({
            ...selectedFilters,
            [category]: newSelected
        });
    };

    const isSelected = (category: string, value: string) => {
        return (selectedFilters as any)[category]?.includes(value);
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

                    <button className="flex h-9 items-center justify-center gap-x-2 rounded-full border border-dashed border-warm-gray-300 bg-transparent px-4 hover:bg-warm-gray-100 transition-all">
                        <span className="material-symbols-outlined text-warm-gray-500 text-[18px]">tune</span>
                        <span className="text-warm-gray-600 text-sm font-medium">More Filters</span>
                    </button>
                </div>
                {/* Right Sort */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <span className="text-warm-gray-500 text-sm hidden sm:inline">Sort by:</span>
                    <div className="relative group cursor-pointer">
                        <button className="flex h-9 items-center justify-between gap-x-2 rounded-lg bg-white border border-warm-gray-200 px-3 min-w-[160px] shadow-sm">
                            <span className="text-primary font-bold text-sm">Highest Yield</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">sort</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
