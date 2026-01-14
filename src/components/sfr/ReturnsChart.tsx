interface ReturnsChartProps {
    data: {
        title: string;
        description: string;
        points: string[];
        chart: {
            savings: { label: string; value: string; height: string };
            bonds: { label: string; value: string; height: string };
            sfr: { label: string; value: string; height: string; highlight: string };
        };
    };
}

export default function ReturnsChart({ data }: ReturnsChartProps) {
    if (!data) return null;

    return (
        <section className="py-16 px-4 sm:px-10 lg:px-40 bg-white border-y border-warm-gray-200">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h2 className="text-[28px] md:text-3xl font-bold leading-tight mb-4 text-text-dark">
                            {data.title}
                        </h2>
                        <p className="text-warm-gray-600 mb-6 text-lg">
                            {data.description}
                        </p>
                        <ul className="space-y-3 mb-8">
                            {data.points.map((point, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    <span className="font-medium text-sm text-text-dark">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 w-full flex flex-col items-center justify-end h-[320px] bg-background-light rounded-2xl p-8 relative border border-warm-gray-200">
                        <div className="absolute top-4 left-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Average Annual Yield
                        </div>
                        <div className="w-full h-full flex items-end justify-around gap-4 pt-8">
                            <div className="flex flex-col items-center gap-2 group w-1/4">
                                <span className="text-sm font-bold text-gray-500 mb-1">{data.chart.savings.value}</span>
                                <div
                                    className="w-full bg-gray-300 rounded-t-md relative transition-all duration-500 hover:opacity-80"
                                    style={{ height: data.chart.savings.height }}
                                ></div>
                                <span className="text-xs font-semibold text-center text-gray-500 mt-2">
                                    {data.chart.savings.label}
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2 group w-1/4">
                                <span className="text-sm font-bold text-gray-500 mb-1">{data.chart.bonds.value}</span>
                                <div
                                    className="w-full bg-gray-400 rounded-t-md relative transition-all duration-500 hover:opacity-80"
                                    style={{ height: data.chart.bonds.height }}
                                ></div>
                                <span className="text-xs font-semibold text-center text-gray-500 mt-2">
                                    {data.chart.bonds.label}
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2 group w-1/3">
                                <div className="bg-black text-white text-xs py-1 px-2 rounded mb-1 animate-bounce">
                                    {data.chart.sfr.highlight}
                                </div>
                                <span className="text-xl font-black text-primary">{data.chart.sfr.value}</span>
                                <div
                                    className="w-full bg-primary shadow-[0_0_20px_rgba(19,127,236,0.3)] rounded-t-lg relative transition-all duration-500 hover:scale-[1.02]"
                                    style={{ height: data.chart.sfr.height }}
                                ></div>
                                <span className="text-sm font-bold text-center mt-2 text-text-dark">
                                    {data.chart.sfr.label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
