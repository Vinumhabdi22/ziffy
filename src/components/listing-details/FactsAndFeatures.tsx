"use client";

import { Listing } from '@/types';

interface FactsAndFeaturesProps {
    listing: Listing;
}

interface PropertyDetail {
    label: string;
    value: string;
}

interface FactSection {
    title: string;
    details: PropertyDetail[];
}

export default function FactsAndFeatures({ listing }: FactsAndFeaturesProps) {
    // Helper function to check if a value is valid (not N/A or undefined)
    const isValid = (value: string | undefined): boolean => {
        return value !== undefined && value !== 'N/A' && value.trim() !== '';
    };

    // Organize facts into sections
    const sections: FactSection[] = [
        {
            title: 'General Information',
            details: [
                { label: 'Property Type', value: listing.property_type },
                { label: 'Year Built', value: listing.year_built.toString() },
                { label: 'Architectural Style', value: listing.architectural_style || 'N/A' },
                { label: 'Building Area', value: listing.building_area || 'N/A' },
                { label: 'Living Area', value: listing.living_area || 'N/A' },
                { label: 'Property Condition', value: listing.property_condition || 'N/A' },
            ]
        },
        {
            title: 'Features & Amenities',
            details: [
                { label: 'Heating', value: listing.heating || 'N/A' },
                { label: 'Cooling', value: listing.cooling || 'N/A' },
                { label: 'Flooring', value: listing.flooring || 'N/A' },
                { label: 'Interior Features', value: listing.interior_features || 'N/A' },
                { label: 'Exterior Features', value: listing.exterior_features || 'N/A' },
                { label: 'Parking', value: listing.parking || 'N/A' },
            ]
        },
        {
            title: 'Location Details',
            details: [
                { label: 'City', value: listing.city },
                { label: 'State', value: listing.state },
                { label: 'Subdivision', value: listing.subdivision || 'N/A' },
                { label: 'Lot Size', value: listing.lot_size || 'N/A' },
                { label: 'Lot Features', value: listing.lot_features || 'N/A' },
                { label: 'View', value: listing.view || 'N/A' },
            ]
        },
        {
            title: 'HOA & Fees',
            details: [
                { label: 'HOA Fee', value: listing.hoa_fee || 'N/A' },
                { label: 'Association Fee', value: listing.association_fee || 'N/A' },
                { label: 'Fees & Dues', value: listing.fees_dues || 'N/A' },
                { label: 'Association Amenities', value: listing.association_amenities || 'N/A' },
                { label: 'Fee Includes', value: listing.fee_includes || 'N/A' },
            ]
        },
        {
            title: 'Utilities',
            details: [
                { label: 'Utilities', value: listing.utilities || 'N/A' },
                { label: 'Sewer', value: listing.sewer || 'N/A' },
                { label: 'Water Source', value: listing.water_source || 'N/A' },
                { label: 'Road Surface Type', value: listing.road_surface_type || 'N/A' },
            ]
        },
        {
            title: 'School Information',
            details: [
                { label: 'Elementary School', value: listing.elementary_school || 'N/A' },
                { label: 'Middle School', value: listing.middle_school || 'N/A' },
                { label: 'High School', value: listing.high_school || 'N/A' },
            ]
        }
    ];

    // Show all sections, even if values are N/A
    // No filtering - display everything

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-warm-gray-200">
                <h3 className="font-bold text-lg text-text-dark">Facts & Features</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sections.map((section, sectionIdx) => (
                        <div
                            key={sectionIdx}
                            className="bg-gradient-to-br from-gray-50 to-white border border-warm-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <h4 className="text-base font-bold text-primary mb-4 pb-2 border-b-2 border-primary/20">
                                {section.title}
                            </h4>
                            <div className="space-y-3">
                                {section.details.map((detail, detailIdx) => (
                                    <div key={detailIdx} className="flex justify-between items-start gap-4">
                                        <span className="text-sm font-medium text-warm-gray-600">
                                            {detail.label}:
                                        </span>
                                        <span className="text-sm text-text-dark font-semibold text-right">
                                            {detail.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
