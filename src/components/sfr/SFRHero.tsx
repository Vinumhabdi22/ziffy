interface SFRHeroProps {
    data: {
        assetClass: string;
        headline: string;
        description: string;
        ctaPrimary: string;
        ctaSecondary: string;
        verificationText: string;
        heroImage: string;
        activeNote: {
            label: string;
            address: string;
            stats: string;
        };
    };
}

export default function SFRHero({ data }: SFRHeroProps) {
    if (!data) return null;

    return (
        <section className="font-display relative w-full py-12 md:py-20 px-4 sm:px-10 lg:px-40 flex justify-center bg-white">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col gap-6 order-2 lg:order-1">
                    <div className="flex flex-col gap-4 text-left">
                        <span className="text-primary font-bold tracking-wider text-sm uppercase">
                            {data.assetClass}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em] text-text-dark">
                            {data.headline}
                        </h1>
                        <p className="text-warm-gray-600 text-lg leading-relaxed max-w-xl">
                            {data.description}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button className="flex h-12 px-6 items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white text-base font-bold shadow-md transition-all transform hover:scale-[1.02]">
                            {data.ctaPrimary}
                        </button>
                        <button className="flex h-12 px-6 items-center justify-center rounded-lg bg-white border border-warm-gray-200 hover:bg-warm-gray-100 text-text-dark text-base font-bold transition-colors">
                            {data.ctaSecondary}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm text-warm-gray-500">
                        <span className="material-symbols-outlined text-primary text-lg">verified</span>
                        <span>{data.verificationText}</span>
                    </div>
                </div>
                <div className="order-1 lg:order-2 w-full h-full min-h-[300px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${data.heroImage}')` }}
                    ></div>
                    <div className="absolute bottom-6 left-6 z-20 text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">
                                {data.activeNote.label}
                            </span>
                        </div>
                        <p className="font-bold text-lg">{data.activeNote.address}</p>
                        <p className="text-sm opacity-90">{data.activeNote.stats}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
