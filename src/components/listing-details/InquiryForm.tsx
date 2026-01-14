"use client";

export default function InquiryForm() {
    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-warm-gray-200 bg-gray-50">
                <h3 className="font-bold text-lg text-text-dark">Request Information</h3>
            </div>
            <div className="p-6">
                <p className="text-sm text-warm-gray-600 mb-4 leading-relaxed">
                    Get the full investment package, financial disclosures, and title report.
                </p>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="h-11 rounded-lg border border-warm-gray-200 bg-white px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="h-11 rounded-lg border border-warm-gray-200 bg-white px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="h-11 rounded-lg border border-warm-gray-200 bg-white px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <button className="bg-primary hover:bg-primary-dark text-white font-bold h-12 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                        Get Investment Package
                    </button>
                    <p className="text-[10px] text-center text-warm-gray-400">
                        We respect your privacy. No spam.
                    </p>
                </form>
            </div>
        </div>
    );
}
