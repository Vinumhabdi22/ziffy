interface SuccessStoriesProps {
    data: {
        title: string;
        items: Array<{
            quote: string;
            name: string;
            profit: string;
            avatar: string;
        }>;
    };
}

export default function SuccessStories({ data }: SuccessStoriesProps) {
    if (!data) return null;

    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <h2 className="text-black text-4xl font-bold text-center mb-16">{data.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {data.items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-xl border border-warm-gray-200 flex flex-col items-start"
                        >
                            <div className="flex gap-1 text-yellow-400 mb-6 text-xl">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined">star</span>
                                ))}
                            </div>
                            <p className="text-black text-lg mb-8 leading-relaxed flex-grow">"{item.quote}"</p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div
                                    className="w-14 h-14 rounded-full bg-gray-200 bg-cover"
                                    style={{ backgroundImage: `url('${item.avatar}')` }}
                                ></div>
                                <div>
                                    <div className="text-lg font-bold text-black">{item.name}</div>
                                    <div className="text-base text-primary font-bold">{item.profit}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
