interface HowItWorksProps {
    data: {
        title: string;
        steps: Array<{
            num: string;
            title: string;
            description: string;
        }>;
    };
}

export default function HowItWorks({ data }: HowItWorksProps) {
    if (!data) return null;

    return (
        <section className="font-display py-16 px-4 sm:px-10 lg:px-40 bg-background-light">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-black leading-tight mb-12 text-text-dark">
                    {data.title}
                </h2>
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="hidden md:block absolute top-[24px] left-[16%] right-[16%] h-[2px] bg-gray-200 -z-10"></div>
                    {data.steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center gap-4">
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black shadow-sm z-10 bg-white border-2 border-primary text-primary"
                            >
                                {step.num}
                            </div>
                            <h3 className="text-xl font-bold text-text-dark">{step.title}</h3>
                            <p className="text-base text-warm-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
