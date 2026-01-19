import privacyContent from '@/../content/privacy.json';

export const metadata = {
    title: 'Privacy Policy | Ziffy AI',
    description: 'Learn about how Ziffy AI collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
    return (
        <div className="bg-background-light min-h-screen">
            <div className="py-16 px-4 md:px-8 lg:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: '#137fec' }}>
                            {privacyContent.header.title}
                        </h1>
                        <p className="text-lg text-warm-gray-500 max-w-2xl mx-auto mb-6">
                            {privacyContent.header.subtitle}
                        </p>
                        <p className="text-sm text-warm-gray-400">
                            Last Updated: {privacyContent.metadata.lastUpdated}
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="bg-white rounded-2xl shadow-sm border border-warm-gray-200 p-8 md:p-12">
                        {privacyContent.sections.map((section: { title: string; content: string[] }, index: number) => (
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
                                        mail
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-text-dark mb-2">
                                            Questions about your privacy?
                                        </h3>
                                        <p className="text-warm-gray-600 mb-3">
                                            We&apos;re here to help. Reach out to our privacy team:
                                        </p>
                                        <a
                                            href={`mailto:${privacyContent.metadata.contactEmail}`}
                                            className="text-emerald-accent font-medium hover:underline"
                                        >
                                            {privacyContent.metadata.contactEmail}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-8 text-center">
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-emerald-accent font-medium"
                        >
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
