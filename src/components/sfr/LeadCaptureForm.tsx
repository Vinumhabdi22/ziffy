"use client";

interface LeadCaptureFormProps {
    data: {
        title: string;
        subtitle: string;
        fields: {
            firstName: { label: string; placeholder: string };
            lastName: { label: string; placeholder: string };
            email: { label: string; placeholder: string };
            target: { label: string; options: string[] };
        };
        accreditedLabel: string;
        submitText: string;
        disclaimer: string;
    };
}

export default function LeadCaptureForm({ data }: LeadCaptureFormProps) {
    if (!data) return null;

    return (
        <section className="font-display py-20 px-4 sm:px-10 lg:px-40 bg-white" id="waitlist">
            <div className="max-w-[600px] mx-auto bg-white rounded-2xl shadow-xl border border-warm-gray-200 overflow-hidden">
                <div className="p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                            <span className="material-symbols-outlined text-primary">lock</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-2 text-text-dark">{data.title}</h2>
                        <p className="text-warm-gray-600 text-base">
                            {data.subtitle}
                        </p>
                    </div>
                    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase text-gray-500">{data.fields.firstName.label}</label>
                                <input
                                    className="h-12 rounded-lg border border-warm-gray-200 bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark"
                                    placeholder={data.fields.firstName.placeholder}
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase text-gray-500">{data.fields.lastName.label}</label>
                                <input
                                    className="h-12 rounded-lg border border-warm-gray-200 bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark"
                                    placeholder={data.fields.lastName.placeholder}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase text-gray-500">{data.fields.email.label}</label>
                            <input
                                className="h-12 rounded-lg border border-warm-gray-200 bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark"
                                placeholder={data.fields.email.placeholder}
                                type="email"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase text-gray-500">{data.fields.target.label}</label>
                            <select
                                defaultValue=""
                                className="h-12 rounded-lg border border-warm-gray-200 bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark"
                            >
                                <option disabled value="">Select amount...</option>
                                {data.fields.target.options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-start gap-3 mt-2">
                            <input
                                className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                id="accredited"
                                type="checkbox"
                            />
                            <label className="text-xs text-gray-500 cursor-pointer" htmlFor="accredited">
                                {data.accreditedLabel}
                            </label>
                        </div>
                        <button
                            className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white text-base font-bold hover:bg-primary-dark transition-colors shadow-md"
                            type="submit"
                        >
                            {data.submitText}
                        </button>
                        <p className="text-[10px] text-center text-gray-400 mt-2">
                            {data.disclaimer}
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
