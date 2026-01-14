interface TrustSectionProps {
    data: {
        label: string;
        logos: string[];
    };
}

export default function TrustSection({ data }: TrustSectionProps) {
    if (!data) return null;

    return (
        <div className="border-y border-warm-gray-200 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 flex flex-col md:flex-row items-center gap-6 md:gap-12 has-[p]:justify-between">
                <p className="text-sm font-semibold text-warm-gray-500 uppercase tracking-widest hidden md:block whitespace-nowrap z-10 bg-white pr-4">
                    {data.label}
                </p>

                <div className="relative flex-1 w-full overflow-hidden mask-gradient-x">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

                    {/* Scrolling Container */}
                    <div className="flex animate-marquee whitespace-nowrap hover:paused">
                        {/* First Set of Logos */}
                        <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24">
                            {data.logos.map((logo, index) => (
                                <span key={`op1-${index}`} className="font-display font-bold text-xl md:text-2xl text-warm-gray-400 hover:text-warm-gray-600 transition-colors uppercase tracking-tight">
                                    {logo}
                                </span>
                            ))}
                        </div>
                        {/* Second Set of Logos (Duplicate for smooth loop) */}
                        <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24" aria-hidden="true">
                            {data.logos.map((logo, index) => (
                                <span key={`op2-${index}`} className="font-display font-bold text-xl md:text-2xl text-warm-gray-400 hover:text-warm-gray-600 transition-colors uppercase tracking-tight">
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
