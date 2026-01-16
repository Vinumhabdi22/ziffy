import { Listing } from '@/types';

interface PropertyDetailsProps {
    listing: Listing;
}

export default function PropertyDetails({ listing }: PropertyDetailsProps) {
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
                        {listing.features?.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                <span className="text-warm-gray-700 text-sm">{feature}</span>
                            </div>
                        )) || <p>No features listed.</p>}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold uppercase text-warm-gray-400 mb-3">Location</h4>
                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden group">
                        {(() => {
                            if (!listing.map_url) return (
                                <>
                                    <span className="text-warm-gray-400 font-medium z-10">Interactive Map Visualization</span>
                                    <div className="absolute inset-0 bg-purple-100 opacity-20"></div>
                                </>
                            );

                            // Handle case where user pastes full <iframe> code
                            const mapSrc = listing.map_url.trim().startsWith('<iframe')
                                ? listing.map_url.match(/src="([^"]+)"/)?.[1] || listing.map_url
                                : listing.map_url;

                            return mapSrc.includes('google.com/maps/embed') ? (
                                <iframe
                                    src={mapSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 z-10"
                                />
                            ) : (
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                                    <span className="material-symbols-outlined text-warm-gray-400 text-3xl mb-2">map</span>
                                    <p className="text-warm-gray-500 text-sm mb-3">Map preview not available</p>
                                    <a
                                        href={mapSrc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-primary text-sm font-medium rounded-md text-primary bg-white hover:bg-primary-50 transition-colors"
                                    >
                                        View on Google Maps
                                    </a>
                                </div>
                            );
                        })()}
                    </div>
                </div>


            </div>
        </div>

    );
}
