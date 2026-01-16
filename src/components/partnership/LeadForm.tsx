"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { z } from "zod";

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

// Validation Schema
const leadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    budget: z.string().min(1, "Please select an investment budget"),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function LeadForm({ data }: LeadFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<LeadFormData>({
        name: "",
        email: "",
        phone: "",
        budget: data?.fields?.budget?.options?.[0] || "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    if (!data) return null;

    const validate = () => {
        const result = leadSchema.safeParse(formData);
        if (!result.success) {
            const flattened = result.error.flatten();
            const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};

            // Map the first error for each field
            (Object.keys(flattened.fieldErrors) as Array<keyof LeadFormData>).forEach((key) => {
                const messages = flattened.fieldErrors[key];
                if (messages && messages.length > 0) {
                    fieldErrors[key] = messages[0];
                }
            });

            setErrors(fieldErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null);

        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('partnership_leads').insert({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                budget: formData.budget,
            });

            if (error) throw error;

            setSubmitMessage({
                type: 'success',
                text: 'Thank you! Your inquiry has been sent successfully.'
            });

            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                budget: data.fields.budget.options[0] || "",
            });
            setErrors({});

            setTimeout(() => setSubmitMessage(null), 5000);

        } catch (err) {
            console.error(err);
            setSubmitMessage({
                type: 'error',
                text: 'Something went wrong. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-primary/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-10">
                <div className="bg-white border border-warm-gray-200 rounded-3xl p-8 md:p-16 shadow-2xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-5 leading-tight">{data.title}</h2>
                        <p className="text-black text-lg max-w-2xl mx-auto">{data.subtitle}</p>
                    </div>

                    {submitMessage && (
                        <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 ${submitMessage.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            <span className="material-symbols-outlined text-2xl flex-shrink-0">
                                {submitMessage.type === 'success' ? 'check_circle' : 'error'}
                            </span>
                            <p className="font-medium">{submitMessage.text}</p>
                        </div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-base font-medium text-black">{data.fields.name.label}</label>
                                <input
                                    className={`w-full h-14 px-5 rounded-xl border bg-white text-black focus:border-primary focus:ring-primary text-base placeholder:text-gray-400 ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder={data.fields.name.placeholder}
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-base font-medium text-black">{data.fields.email.label}</label>
                                <input
                                    className={`w-full h-14 px-5 rounded-xl border bg-white text-black focus:border-primary focus:ring-primary text-base placeholder:text-gray-400 ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder={data.fields.email.placeholder}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-base font-medium text-black">{data.fields.phone.label}</label>
                                <input
                                    className={`w-full h-14 px-5 rounded-xl border bg-white text-black focus:border-primary focus:ring-primary text-base placeholder:text-gray-400 ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder={data.fields.phone.placeholder}
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-base font-medium text-black">{data.fields.budget.label}</label>
                                <select
                                    className={`w-full h-14 px-5 rounded-xl border bg-white text-black focus:border-primary focus:ring-primary text-base ${errors.budget ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                                        }`}
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                >
                                    {data.fields.budget.options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
                            </div>
                        </div>
                        <button
                            className="w-full h-14 mt-6 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg text-lg flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </span>
                            ) : data.submitText}
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
