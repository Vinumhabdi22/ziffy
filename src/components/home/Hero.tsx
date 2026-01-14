import Link from "next/link";

interface HeroProps {
    data: {
        badge: string;
        title: string;
        titleHighlight: string;
        titleSuffix: string;
        subtitle: string;
        ctaText: string;
        ctaLink: string;
        secondaryCtaText: string;
        secondaryCtaLink: string;
        features: Array<{ icon: string; text: string }>;
        stats: {
            yieldLabel: string;
            yieldValue: string;
            yieldSub: string;
            scoreLabel: string;
            scoreValue: string;
        };
        heroImage: string;
    };
}

export default function Hero({ data }: HeroProps) {
    if (!data) return null;

    return (
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{ backgroundImage: `url("${data.heroImage}")` }}
                ></div>
                <div className="absolute inset-0 bg-black/60"></div>
                {/* Optional: subtle gradient overlay for extra depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
            </div>

            <div className="max-w-5xl w-full mx-auto px-4 md:px-10 relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">

                {/* Title & Subtitle */}
                <div className="flex flex-col gap-4 md:gap-5 items-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold leading-[1.1] tracking-tight text-white">
                        {data.title}{' '}
                        <span className="relative inline-block text-emerald-accent">
                            {data.titleHighlight}
                            <svg className="absolute -bottom-2 left-0 w-full opacity-60" height="12" viewBox="0 0 200 12" fill="none">
                                <path d="M2 10C60 2 140 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </span>{' '}
                        {data.titleSuffix}
                    </h1>
                    <p className="text-gray-200 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl px-4">
                        {data.subtitle}
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto justify-center">
                    <Link
                        href={data.ctaLink}
                        className="group relative flex items-center justify-center rounded-xl h-12 md:h-14 px-6 md:px-8 bg-emerald-accent text-white text-sm md:text-base font-bold transition-all duration-300 shadow-lg shadow-emerald-accent/25 hover:shadow-xl hover:shadow-emerald-accent/40 hover:-translate-y-1 overflow-hidden"
                    >
                        <span className="relative z-10">{data.ctaText}</span>
                    </Link>
                    <Link
                        href={data.secondaryCtaLink}
                        className="group flex items-center justify-center gap-2 rounded-xl h-12 md:h-14 px-6 md:px-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white text-sm md:text-base font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                    >
                        <span>{data.secondaryCtaText}</span>
                        <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>

                {/* Features */}
                <div className="pt-2 md:pt-3 flex flex-wrap justify-center items-center gap-x-6 md:gap-x-8 gap-y-3">
                    {data.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 md:gap-2.5 group">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-accent/20 flex items-center justify-center group-hover:bg-emerald-accent/30 transition-colors backdrop-blur-sm border border-emerald-accent/30">
                                <span className="material-symbols-outlined text-emerald-accent text-base md:text-lg">
                                    {feature.icon}
                                </span>
                            </div>
                            <span className="text-sm md:text-base text-gray-200 font-medium group-hover:text-emerald-accent transition-colors">
                                {feature.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
