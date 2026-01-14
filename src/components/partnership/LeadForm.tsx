"use client";

interface LeadFormProps {
    data: {
        title: string;
        subtitle: string;
        fields: {
            name: { label: string; placeholder: string };
            email: { label: string; placeholder: string };
            phone: { label: string; placeholder: string };
            budget: { label: string; options: string[] };
        };
        submitText: string;
        disclaimer: string;
    };
}

export default function LeadForm({ data }: LeadFormProps) {
    if (!data) return null;

    return (
        <section className="py-20 bg-primary/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-10">
                <div className="bg-white border border-warm-gray-200 rounded-3xl p-8 md:p-16 shadow-2xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-5 leading-tight">{data.title}</h2>
                        <p className="text-black text-lg max-w-2xl mx-auto">{data.subtitle}</p>
                    </div>
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-base font-medium text-black">{data.fields.name.label}</label>
                                <input
                                    className="w-full h-14 px-5 rounded-xl border-gray-200 bg-white text-black focus:border-primary focus:ring-primary text-base placeholder:text-gray-400"
                                    placeholder={data.fields.name.placeholder}
                                    type="text"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-base font-medium text-black">{data.fields.email.label}</label>
                                <input
                                    className="w-full h-14 px-5 rounded-xl border-gray-200 bg-white text-black focus:border-primary focus:ring-primary text-base placeholder:text-gray-400"
                                    placeholder={data.fields.email.placeholder}
                                    type="email"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-base font-medium text-black">{data.fields.phone.label}</label>
                                <input
                                    className="w-full h-14 px-5 rounded-xl border-gray-200 bg-white text-black focus:border-primary focus:ring-primary text-base placeholder:text-gray-400"
                                    placeholder={data.fields.phone.placeholder}
                                    type="tel"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-base font-medium text-black">{data.fields.budget.label}</label>
                                <select className="w-full h-14 px-5 rounded-xl border-gray-200 bg-white text-black focus:border-primary focus:ring-primary text-base">
                                    {data.fields.budget.options.map((option, index) => (
                                        <option key={index}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            className="w-full h-14 mt-6 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg text-lg"
                            type="submit"
                        >
                            {data.submitText}
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-6">
                            {data.disclaimer}
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
