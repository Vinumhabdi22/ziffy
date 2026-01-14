interface ProfitStructureProps {
    data: {
        title: string;
        description: string;
        benefits: Array<{
            icon: string;
            title: string;
            description: string;
        }>;
        example: {
            title: string;
            netProfitLabel: string;
            netProfitValue: string;
            investorShareLabel: string;
            investorShareValue: string;
            platformShareLabel: string;
            platformShareValue: string;
        };
    };
}

export default function ProfitStructure({ data }: ProfitStructureProps) {
    if (!data) return null;

    return (
        <section className="bg-background-light py-12 relative overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-10 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-6">
                    <div>
                        <h2 className="text-black text-3xl font-bold tracking-tight font-display">{data.title}</h2>
                        <p className="text-black mt-2 max-w-xl">{data.description}</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                        <div className="flex-1 bg-white border border-warm-gray-200 rounded-xl p-4 min-w-[200px] shadow-sm">
                            <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{data.example.netProfitLabel}</p>
                            <p className="text-4xl font-black text-black font-display">{data.example.netProfitValue}</p>
                        </div>
                        <div className="flex-1 bg-white border border-warm-gray-200 rounded-xl p-4 min-w-[200px] shadow-sm">
                            <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{data.example.investorShareLabel}</p>
                            <p className="text-4xl font-black text-black font-display">{data.example.investorShareValue}</p>
                        </div>
                        <div className="flex-1 bg-white border border-warm-gray-200 rounded-xl p-4 min-w-[200px] shadow-sm">
                            <p className="text-xs text-warm-gray-600 font-bold uppercase tracking-wider mb-1">{data.example.platformShareLabel}</p>
                            <p className="text-4xl font-black text-warm-gray-600 font-display">{data.example.platformShareValue}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-warm-gray-200 shadow-sm">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">{benefit.icon}</span>
                            </div>
                            <div>
                                <h4 className="text-black font-bold font-display">{benefit.title}</h4>
                                <p className="text-sm text-black">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
