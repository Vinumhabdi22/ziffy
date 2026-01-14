"use client";

import { useState } from 'react';

interface PropertyDetailsProps {
    details: any;
}

export default function PropertyDetails({ details }: PropertyDetailsProps) {
    // const [showFullDescription, setShowFullDescription] = useState(false);
    // const description = details.description;
    // const shouldTruncate = description.length > 200;

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-warm-gray-200">
                <h3 className="font-bold text-lg text-text-dark">Property Details</h3>
            </div>
            <div className="p-6">


                <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase text-warm-gray-400 mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                        {details.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                <span className="text-warm-gray-700 text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold uppercase text-warm-gray-400 mb-3">Location & Neighborhood</h4>
                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden group">
                        <span className="text-warm-gray-400 font-medium z-10">Interactive Map Visualization</span>
                        <div className="absolute inset-0 bg-purple-100 opacity-20"></div>
                        {/* This map would typically use Google Maps API or Mapbox */}
                    </div>


                </div>
            </div>
        </div>
    );
}
