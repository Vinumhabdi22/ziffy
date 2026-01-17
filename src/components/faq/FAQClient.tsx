"use client";

import { useState } from "react";
import { FAQ } from "@/types";

interface FAQClientProps {
    faqs: FAQ[];
}

export default function FAQClient({ faqs }: FAQClientProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={faq.id}
                        className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen
                            ? "border-emerald-accent bg-white shadow-md shadow-emerald-accent/5"
                            : "border-gray-200 bg-white hover:border-emerald-accent/50"
                            }`}
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors"
                        >
                            <span className={`text-lg font-semibold ${isOpen ? "text-emerald-accent" : "text-text-dark"}`}>
                                {faq.question}
                            </span>
                            <span className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-accent" : "text-gray-400"}`}>
                                <span className="material-symbols-outlined">expand_more</span>
                            </span>
                        </button>
                        <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div className="px-6 pb-6 text-warm-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {faqs.length === 0 && (
                <div className="text-center py-12 text-warm-gray-500">
                    <span className="material-symbols-outlined text-4xl mb-2">help_outline</span>
                    <p>No frequently asked questions found.</p>
                </div>
            )}
        </div>
    );
}
