interface PartnershipHeroProps {
    data: {
        titlePrefix: string;
        titleHighlight: string;
        subtitle: string;
        ctaStart: string;
        ctaCaseStudies: string;
        heroImage: string;
        trustedText: string;
        trustedAvatars: string[];
    };
}

export default function PartnershipHero({ data }: PartnershipHeroProps) {
    if (!data) return null;

    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url('${data.heroImage}')` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
                    {data.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{data.titleHighlight}</span>
                </h1>
                <h2 className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed font-light max-w-3xl mx-auto mb-8 drop-shadow-md">
                    {data.subtitle}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center">
                    <button className="flex items-center justify-center rounded-xl h-12 md:h-14 px-6 md:px-8 bg-primary text-white text-sm md:text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                        {data.ctaStart}
                    </button>
                    <button className="flex items-center justify-center rounded-xl h-12 md:h-14 px-6 md:px-8 bg-white/10 text-white text-sm md:text-base font-bold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                        {data.ctaCaseStudies}
                    </button>
                </div>
                <div className="flex items-center gap-4 mt-8 text-sm text-gray-300 justify-center">
                    <div className="flex -space-x-2">
                        {data.trustedAvatars.map((avatar, index) => (
                            <div
                                key={index}
                                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-cover"
                                style={{ backgroundImage: `url('${avatar}')` }}
                            ></div>
                        ))}
                    </div>
                    <p>{data.trustedText}</p>
                </div>
            </div>
        </section>
    );
}
