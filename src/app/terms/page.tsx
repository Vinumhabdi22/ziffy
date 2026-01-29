import termsContent from '@/../content/terms.json';
import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | Ziffy AI',
    description: 'Read the Terms of Service for using the Ziffy AI real estate investment platform.',
};

export default function TermsPage() {
    return (
        <div className="bg-background-light min-h-screen">
            <div className="py-16 px-4 md:px-8 lg:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: '#137fec' }}>
                            {termsContent.header.title}
                        </h1>
                        <p className="text-lg text-warm-gray-500 max-w-2xl mx-auto mb-6">
                            {termsContent.header.subtitle}
                        </p>
                        <p className="text-sm text-warm-gray-400">
                            Last Updated: {termsContent.metadata.lastUpdated}
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="bg-white rounded-2xl shadow-sm border border-warm-gray-200 p-8 md:p-12">
                        {termsContent.sections.map((section: { title: string; content: string[] }, index: number) => (
                            <div key={index} className={index !== 0 ? 'mt-10 pt-10 border-t border-warm-gray-200' : ''}>
                                <h2 className="text-2xl font-bold mb-4" style={{ color: '#137fec' }}>
                                    {section.title}
                                </h2>
                                <div className="space-y-4">
                                    {section.content.map((paragraph: string, pIndex: number) => (
                                        <p key={pIndex} className="text-base text-warm-gray-600 leading-relaxed whitespace-pre-line">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Contact Information */}
                        <div className="mt-12 pt-8 border-t border-warm-gray-200">
                            <div className="bg-emerald-accent/5 rounded-xl p-6 border border-emerald-accent/20">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-accent text-2xl">
                                        support_agent
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-text-dark mb-2">
                                            Questions about these terms?
                                        </h3>
                                        <p className="text-warm-gray-600 mb-3">
                                            Our team is here to help clarify any questions you may have:
                                        </p>
                                        <a
                                            href={`mailto:${termsContent.metadata.contactEmail}`}
                                            className="text-emerald-accent font-medium hover:underline"
                                        >
                                            {termsContent.metadata.contactEmail}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-emerald-accent font-medium"
                        >
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
