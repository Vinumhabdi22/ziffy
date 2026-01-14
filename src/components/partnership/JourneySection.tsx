interface JourneySectionProps {
    data: {
        title: string;
        steps: Array<{
            icon: string;
            title: string;
            description: string;
            image: string;
        }>;
    };
}

export default function JourneySection({ data }: JourneySectionProps) {
    if (!data) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <h2 className="text-black tracking-tight text-3xl font-bold text-center mb-16 font-display">
                    {data.title}
                </h2>
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[23px] left-[10%] right-[10%] h-1 bg-warm-gray-200">
                        <div className="absolute top-0 left-0 h-full bg-primary w-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {data.steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 font-bold mb-6 ring-8 ring-white shadow-sm">
                                    <span className="material-symbols-outlined">{step.icon}</span>
                                </div>
                                <h3 className="text-black text-lg font-bold mb-3 font-display">{step.title}</h3>
                                <p className="text-black text-sm leading-relaxed max-w-[300px] font-sans">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
