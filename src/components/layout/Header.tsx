"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className={`sticky top-0 z-50 w-full border-b border-gray-100 backdrop-blur-md transition-colors duration-300 ${isMobileMenuOpen ? "bg-white" : "bg-white/80"
                }`}>
                <div className="px-4 md:px-10 py-3 flex items-center justify-between mx-auto max-w-7xl">
                    <div className="flex items-center gap-3 text-black cursor-pointer group">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-emerald-accent text-white group-hover:scale-105 transition-transform duration-300 shadow-md shadow-emerald-accent/20">
                            <span className="material-symbols-outlined text-2xl">
                                real_estate_agent
                            </span>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold tracking-tight text-black">
                                Ziffy AI
                            </h2>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <nav className="flex items-center gap-8">
                            {["Home", "Listings", "Partnership", "SFR", "FAQ", "Contact"].map((item) => {
                                const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                                const isActive = pathname === href || (item !== "Home" && pathname?.startsWith(href));

                                return (
                                    <Link
                                        key={item}
                                        className={`relative text-sm font-medium transition-all duration-200 ${isActive
                                            ? "text-emerald-accent font-semibold"
                                            : "text-gray-600 hover:text-emerald-accent"
                                            }`}
                                        href={href}
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="h-6 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-4">
                            <a
                                className="group flex items-center justify-center gap-2 rounded-full h-11 px-6 bg-black text-white hover:bg-emerald-accent hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                                href="tel:1-800-555-0123"
                            >
                                <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform duration-300">
                                    phone_in_talk
                                </span>
                                <span className="text-sm font-bold tracking-wide">1-800-555-0123</span>
                            </a>
                        </div>
                    </div>
                    <button
                        className="md:hidden p-2 text-black z-50 relative"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined transition-transform duration-300">
                            {isMobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay - now outside header */}
            <div
                className={`fixed inset-0 bg-white z-[60] md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
                style={{ top: "65px" }}
            >
                <div className="flex flex-col p-6 gap-6 h-[calc(100vh-65px)] overflow-y-auto">
                    <nav className="flex flex-col gap-4">
                        {["Home", "Listings", "Partnership", "SFR", "FAQ", "Contact", "Privacy", "Terms"].map((item) => {
                            const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                            const isActive = pathname === href || (item !== "Home" && pathname?.startsWith(href));

                            return (
                                <Link
                                    key={item}
                                    className={`text-lg font-medium py-2 border-b border-gray-100 transition-colors ${isActive
                                        ? "text-emerald-accent font-semibold"
                                        : "text-gray-800"
                                        }`}
                                    href={href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="flex flex-col gap-4 mt-auto pb-8">
                        <a
                            className="flex items-center justify-center gap-2 rounded-full h-12 bg-black text-white font-medium"
                            href="tel:1-800-555-0123"
                        >
                            <span className="material-symbols-outlined">phone_in_talk</span>
                            1-800-555-0123
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
