import { supabase } from '@/utils/supabase/client';
import FAQClient from '@/components/faq/FAQClient';
import { FAQ } from '@/types';

export const metadata = {
    title: 'Frequently Asked Questions | Trustreet',
    description: 'Find answers to common questions about investing with Trustreet.',
};

export default async function FAQPage() {
    let faqs: FAQ[] = [];

    try {
        const { data, error } = await supabase
            .from('faqs')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            console.error("Error fetching FAQs:", error);
        } else {
            faqs = (data || []) as FAQ[];
        }
    } catch (err) {
        console.error("Supabase client error:", err);
    }

    return (
        <div className="bg-background-light min-h-screen">
            <div className="py-16 px-4 md:px-8 lg:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-dark mb-4">
                            Frequently Asked <span className="text-emerald-accent">Questions</span>
                        </h1>
                        <p className="text-lg text-warm-gray-500 max-w-2xl mx-auto">
                            Everything you need to know about Trustreet and real estate investing.
                            Can&apos;t find the answer you&apos;re looking for? Contact our support team.
                        </p>
                    </div>

                    <FAQClient faqs={faqs} />

                    <div className="mt-16 text-center">
                        <p className="text-warm-gray-600 mb-6">Still have questions?</p>
                        <a
                            href="tel:1-800-555-0123"
                            className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 bg-emerald-accent text-white font-semibold hover:bg-emerald-600 hover:shadow-lg transition-all transform hover:-translate-y-1"
                        >
                            <span className="material-symbols-outlined">call</span>
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
