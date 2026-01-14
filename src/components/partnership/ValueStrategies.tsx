interface ValueStrategiesProps {
    data: {
        title: string;
        subtitle: string;
        items: Array<{
            icon: string;
            title: string;
            description: string;
            roi: string;
        }>;
    };
}

export default function ValueStrategies({ data }: ValueStrategiesProps) {
    if (!data) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <h2 className="text-black tracking-tight text-4xl font-bold text-center mb-6">
                    {data.title}
                </h2>
                <p className="text-center text-black max-w-3xl mx-auto mb-16 text-lg">
                    {data.subtitle}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {data.items.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-background-light p-8 rounded-2xl border border-transparent hover:border-primary transition-colors cursor-default flex items-start gap-6"
                        >
                            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl mb-3 text-black">{item.title}</h3>
                                <p className="text-base text-black mb-4 leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="text-base font-bold text-primary uppercase tracking-wider">
                                    {item.roi}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
