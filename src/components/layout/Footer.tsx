import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col items-center md:items-start gap-5">
                        <div className="flex items-center gap-3 text-black">
                            <div className="flex items-center justify-center size-10 rounded-lg bg-emerald-accent text-white">
                                <span className="material-symbols-outlined text-2xl">
                                    real_estate_agent
                                </span>
                            </div>
                            <h3 className="text-xl font-bold">Ziffy Real Estate</h3>
                        </div>
                        <p className="text-gray-600 text-sm text-center md:text-left max-w-xs">
                            Democratizing real estate investment through artificial
                            intelligence and data-driven insights.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        <Link
                            className="text-gray-600 hover:text-emerald-accent text-sm font-medium transition-colors"
                            href="/privacy"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            className="text-gray-600 hover:text-emerald-accent text-sm font-medium transition-colors"
                            href="/terms"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            className="text-gray-600 hover:text-emerald-accent text-sm font-medium transition-colors"
                            href="/contact"
                        >
                            Contact Us
                        </Link>
                    </div>
                    <div className="flex gap-5">
                        <Link
                            className="text-gray-400 hover:text-emerald-accent transition-colors"
                            href="#"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                alternate_email
                            </span>
                        </Link>
                        <Link
                            className="text-gray-400 hover:text-emerald-accent transition-colors"
                            href="#"
                        >
                            <span className="material-symbols-outlined text-2xl">public</span>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2026 Ziffy Real Estate Platform. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
