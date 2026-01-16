"use client";

import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { z } from 'zod';

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

const formSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    investmentTarget: z.string().min(1, 'Please select an investment target'),
    isAccredited: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadCaptureForm({ data }: LeadCaptureFormProps) {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        investmentTarget: '',
        isAccredited: false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    if (!data) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user changes field
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Validate
        const result = formSchema.safeParse(formData);
        if (!result.success) {
            const formattedErrors: Partial<Record<keyof FormData, string>> = {};
            const fieldErrors = result.error.flatten().fieldErrors;
            Object.keys(fieldErrors).forEach(key => {
                const k = key as keyof FormData;
                if (fieldErrors[k]?.[0]) {
                    formattedErrors[k] = fieldErrors[k]![0];
                }
            });
            setErrors(formattedErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('sfr_leads')
                .insert([
                    {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        investment_target: formData.investmentTarget,
                        is_accredited: formData.isAccredited,
                    }
                ]);

            if (error) throw error;

            setSubmitStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                investmentTarget: '',
                isAccredited: false,
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    {submitStatus === 'success' ? (
                        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
                            <h3 className="font-bold text-lg mb-1">Thank you!</h3>
                            <p>We&apos;ve received your details and will be in touch shortly.</p>
                            <button
                                onClick={() => setSubmitStatus('idle')}
                                className="mt-4 text-green-800 hover:text-green-900 font-semibold text-sm underline"
                            >
                                Submit another response
                            </button>
                        </div>
                    ) : (
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase text-gray-500">{data.fields.firstName.label}</label>
                                    <input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`h-12 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-warm-gray-200'} bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark`}
                                        placeholder={data.fields.firstName.placeholder}
                                        type="text"
                                    />
                                    {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase text-gray-500">{data.fields.lastName.label}</label>
                                    <input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`h-12 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-warm-gray-200'} bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark`}
                                        placeholder={data.fields.lastName.placeholder}
                                        type="text"
                                    />
                                    {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase text-gray-500">{data.fields.email.label}</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`h-12 rounded-lg border ${errors.email ? 'border-red-500' : 'border-warm-gray-200'} bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark`}
                                    placeholder={data.fields.email.placeholder}
                                    type="email"
                                />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase text-gray-500">Phone Number</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`h-12 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-warm-gray-200'} bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark`}
                                    placeholder="Enter your phone number"
                                    type="tel"
                                />
                                {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase text-gray-500">{data.fields.target.label}</label>
                                <select
                                    name="investmentTarget"
                                    value={formData.investmentTarget}
                                    onChange={handleChange}
                                    className={`h-12 rounded-lg border ${errors.investmentTarget ? 'border-red-500' : 'border-warm-gray-200'} bg-background-light px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark`}
                                >
                                    <option disabled value="">Select amount...</option>
                                    {data.fields.target.options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errors.investmentTarget && <span className="text-red-500 text-xs">{errors.investmentTarget}</span>}
                            </div>

                            <div className="flex items-start gap-3 mt-2">
                                <input
                                    name="isAccredited"
                                    className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                    id="accredited"
                                    type="checkbox"
                                    checked={formData.isAccredited}
                                    onChange={handleChange}
                                />
                                <label className="text-xs text-gray-500 cursor-pointer" htmlFor="accredited">
                                    {data.accreditedLabel}
                                </label>
                            </div>

                            {submitStatus === 'error' && (
                                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                    Something went wrong. Please try again.
                                </div>
                            )}

                            <button
                                className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white text-base font-bold hover:bg-primary-dark transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : data.submitText}
                            </button>
                            <p className="text-[10px] text-center text-gray-400 mt-2">
                                {data.disclaimer}
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
