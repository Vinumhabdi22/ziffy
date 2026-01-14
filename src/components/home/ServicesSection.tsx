import Link from "next/link";

interface ServicesSectionProps {
    data: {
        header: {
            subtitle: string;
            title: string;
            description: string;
        };
        items: Array<{
            title: string;
            description: string;
            icon: string;
            ctaText: string;
            ctaLink: string;
            image: string;
        }>;
    };
}

const LABELS = [
    { text: "GROWTH", className: "bg-[#4A9EFF]" },
    { text: "FIXED INCOME", className: "bg-[#059669]" },
    { text: "HIGH YIELD", className: "bg-[#F97316]" },
];

export default function ServicesSection({ data }: ServicesSectionProps) {
    if (!data) return null;

    return (
        <section className="pt-4 md:pt-6 pb-16 md:pb-20 bg-[#F5F5F7]">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                {/* Section Header */}
                <div className="flex items-start justify-between mb-12">
                    <div className="flex flex-col gap-2 max-w-xl">
                        <h2 className="text-[#1D1D1F] text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                            {data.header.title}
                        </h2>
                        {data.header.description && (
                            <p className="text-[#6E6E73] text-base">
                                {data.header.description}
                            </p>
                        )}
                    </div>
                    <Link
                        href="/sfr"
                        className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                    >
                        Compare Strategies
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.items.map((item, index) => {
                        const label = LABELS[index] || LABELS[0];
                        return (
                            <Link
                                key={index}
                                href={item.ctaLink}
                                className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E5E5EA] hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                            >
                                {/* Image Section */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url("${item.image}")` }}
                                    ></div>
                                    <div className={`absolute top-4 left-4 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded ${label.className}`}>
                                        {label.text}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col p-6 gap-3">
                                    <h3 className="text-[#1D1D1F] text-xl font-bold leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#6E6E73] text-sm leading-relaxed mb-2">
                                        {item.description}
                                    </p>
                                    <div
                                        className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all mt-auto"
                                    >
                                        {item.ctaText}
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
