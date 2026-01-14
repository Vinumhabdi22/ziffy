import Link from "next/link";

interface FeaturedListingsProps {
    data: {
        header: {
            subtitle: string;
            title: string;
            ctaText: string;
            ctaLink: string;
        };
        items: Array<{
            id: string;
            isNew: boolean;
            matchScore: number;
            price: string;
            image: string;
            title: string;
            location: string;
            capRate: string;
            estRent: string;
            beds: number;
            baths: number;
            sqft: string;
        }>;
    };
}

export default function FeaturedListings({ data }: FeaturedListingsProps) {
    if (!data) return null;

    return (
        <section className="pt-16 md:pt-20 pb-4 md:pb-6 bg-[#F5F5F7]">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex items-start justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] tracking-tight leading-tight">
                            {data.header.title}
                        </h2>
                    </div>
                    <Link
                        className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                        href={data.header.ctaLink}
                    >
                        {data.header.ctaText}
                        <span className="material-symbols-outlined text-base">
                            arrow_forward
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.items.map((item) => (
                        <div
                            key={item.id}
                            className="group cursor-pointer flex flex-col bg-white rounded-3xl overflow-hidden border border-warm-gray-200 hover:border-emerald-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-accent/10 hover:-translate-y-2"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                {item.isNew && (
                                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-text-dark px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-warm-gray-200 flex items-center gap-1">
                                        <span className="size-2 rounded-full bg-emerald-accent animate-pulse"></span>{" "}
                                        New
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 z-10 bg-emerald-accent text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                                    {item.matchScore} Match
                                </div>
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url("${item.image}")`,
                                    }}
                                ></div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                                    <p className="text-white font-bold text-xl">{item.price}</p>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                <div>
                                    <h4 className="font-bold text-text-dark text-lg truncate">
                                        {item.title}
                                    </h4>
                                    <p className="text-warm-gray-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">
                                            location_on
                                        </span>{" "}
                                        {item.location}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 py-4 border-y border-warm-gray-200">
                                    <div>
                                        <p className="text-[11px] text-warm-gray-400 uppercase font-bold">
                                            Cap Rate
                                        </p>
                                        <p className="text-emerald-accent font-bold text-xl">{item.capRate}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-warm-gray-400 uppercase font-bold">
                                            Est. Rent
                                        </p>
                                        <p className="text-text-dark font-bold text-xl">
                                            {item.estRent}
                                            <span className="text-sm font-normal text-warm-gray-400">
                                                /mo
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-warm-gray-500 font-medium">
                                    <span>{item.beds} Beds</span>
                                    <span>•</span>
                                    <span>{item.baths} Baths</span>
                                    <span>•</span>
                                    <span>{item.sqft} sqft</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 md:hidden text-center">
                    <Link href={data.header.ctaLink} className="w-full py-3 rounded-xl border border-warm-gray-300 text-sm font-bold text-text-dark inline-block">
                        {data.header.ctaText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
