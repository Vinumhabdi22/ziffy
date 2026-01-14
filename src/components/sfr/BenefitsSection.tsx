interface BenefitsSectionProps {
    data: {
        title: string;
        items: Array<{
            icon: string;
            title: string;
            description: string;
        }>;
    };
}

export default function BenefitsSection({ data }: BenefitsSectionProps) {
    if (!data) return null;

    return (
        <section className="font-display py-16 px-4 sm:px-10 lg:px-40 bg-background-light">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-black leading-tight text-center mb-10 text-text-dark">
                    {data.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {data.items.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-4 rounded-xl border border-warm-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                                    {item.icon}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-text-dark">{item.title}</h3>
                                <p className="text-warm-gray-600 text-base leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
