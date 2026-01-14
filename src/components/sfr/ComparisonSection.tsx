interface ComparisonSectionProps {
    data: {
        title: string;
        description: string;
        traditionalBanking: {
            icon: string;
            title: string;
            subtitle: string;
            points: Array<{
                text: string;
                highlight?: string;
            }>;
        };
        directInvesting: {
            icon: string;
            title: string;
            subtitle: string;
            badge: string;
            points: Array<{
                text: string;
                highlight?: string;
            }>;
        };
    };
}

export default function ComparisonSection({ data }: ComparisonSectionProps) {
    if (!data) return null;

    return (
        <section className="font-display w-full bg-white py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4 mb-16">
                    <h2 className="font-display text-text-dark text-3xl md:text-4xl font-black leading-tight tracking-tight">
                        {data.title}
                    </h2>
                    <p className="text-warm-gray-600 text-lg max-w-2xl">
                        {data.description}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* VS Badge */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-text-dark text-white rounded-full items-center justify-center font-black z-10 border-4 border-white shadow-xl">
                        VS
                    </div>

                    {/* Traditional Banking Card */}
                    <div className="flex flex-col gap-6 rounded-2xl border border-warm-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-lg bg-warm-gray-100 flex items-center justify-center text-warm-gray-600">
                            <span className="material-symbols-outlined text-3xl">
                                {data.traditionalBanking.icon}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-text-dark text-xl font-bold mb-2">
                                {data.traditionalBanking.title}
                            </h3>
                            <p className="text-warm-gray-500 text-base mb-6">
                                {data.traditionalBanking.subtitle}
                            </p>
                            <ul className="space-y-3">
                                {data.traditionalBanking.points.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3 text-base text-warm-gray-600">
                                        <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">
                                            close
                                        </span>
                                        <span>
                                            {point.text}
                                            {point.highlight && (
                                                <span className="font-bold text-text-dark"> {point.highlight}</span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Direct Note Investing Card */}
                    <div className="flex flex-col gap-6 rounded-2xl border-2 border-primary/20 bg-blue-50 p-8 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            {data.directInvesting.badge}
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-3xl">
                                {data.directInvesting.icon}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-text-dark text-xl font-bold mb-2">
                                {data.directInvesting.title}
                            </h3>
                            <p className="text-warm-gray-600 text-base mb-6">
                                {data.directInvesting.subtitle}
                            </p>
                            <ul className="space-y-3">
                                {data.directInvesting.points.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3 text-base text-warm-gray-700">
                                        <span className="material-symbols-outlined text-primary-dark text-lg mt-0.5">
                                            check_circle
                                        </span>
                                        <span>
                                            {point.text}
                                            {point.highlight && (
                                                <span className="font-bold bg-primary/20 px-1 rounded"> {point.highlight}</span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
