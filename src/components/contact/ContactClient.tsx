"use client";

import { useState } from 'react';
import contentData from '@/../content/contact.json';
import { supabase } from '@/utils/supabase/client';

export default function ContactClient() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        goal: '',
        message: '',
        confirm_email: '' // Honeypot field
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        goal: ''
    });

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email.trim());
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for the field being edited
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('idle');

        // Security: Honeypot check - if filled, it's likely a bot
        if (formData.confirm_email) {
            setSubmitStatus('success');
            setFormData({
                fullName: '',
                email: '',
                goal: '',
                message: '',
                confirm_email: ''
            });
            return;
        }

        // Validate form
        const newErrors = { fullName: '', email: '', goal: '' };
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.goal) {
            newErrors.goal = 'Please select an investment goal';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Insert data into Supabase
            const { error } = await supabase
                .from('contact_inquiries')
                .insert([
                    {
                        full_name: formData.fullName,
                        email: formData.email,
                        investment_goal: formData.goal,
                        message: formData.message || null
                    }
                ]);

            if (error) {
                console.error('Supabase error:', error);
                setSubmitStatus('error');
            } else {
                setSubmitStatus('success');
                // Reset form on success
                setFormData({
                    fullName: '',
                    email: '',
                    goal: '',
                    message: '',
                    confirm_email: ''
                });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const { header, form, messages } = contentData;

    return (
        <div className="min-h-screen bg-background-light py-16 px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-text-dark">
                        Let&apos;s <span style={{ color: '#137fec' }}>Build Your Wealth</span> Together
                    </h1>
                    <p className="text-lg text-warm-gray-600 max-w-md mx-auto leading-relaxed">
                        {header.subtitle}
                    </p>
                </div>

                {/* Form Section */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-warm-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Honeypot Field - Hidden from real users */}
                        <div className="opacity-0 absolute -left-[9999px]" aria-hidden="true">
                            <label htmlFor="confirm_email">Confirm Email</label>
                            <input
                                type="text"
                                id="confirm_email"
                                name="confirm_email"
                                tabIndex={-1}
                                value={formData.confirm_email}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>

                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-sm font-medium text-text-dark"
                                htmlFor="fullName"
                            >
                                {form.fields.fullName.label}
                            </label>
                            <div className="relative">
                                <input
                                    className={`w-full rounded-lg border ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-warm-gray-200'} bg-background-light px-4 py-3.5 text-base text-text-dark placeholder:text-warm-gray-500 focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent outline-none transition-all`}
                                    id="fullName"
                                    name="fullName"
                                    placeholder={form.fields.fullName.placeholder}
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray-500 pointer-events-none text-xl">
                                    {form.fields.fullName.icon}
                                </span>
                            </div>
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-sm font-medium text-text-dark"
                                htmlFor="email"
                            >
                                {form.fields.email.label}
                            </label>
                            <div className="relative">
                                <input
                                    className={`w-full rounded-lg border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-warm-gray-200'} bg-background-light px-4 py-3.5 text-base text-text-dark placeholder:text-warm-gray-500 focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent outline-none transition-all`}
                                    id="email"
                                    name="email"
                                    placeholder={form.fields.email.placeholder}
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray-500 pointer-events-none text-xl">
                                    {form.fields.email.icon}
                                </span>
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Investment Goal */}
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-sm font-medium text-text-dark"
                                htmlFor="goal"
                            >
                                {form.fields.goal.label}
                            </label>
                            <div className="relative">
                                <select
                                    className={`w-full appearance-none rounded-lg border ${errors.goal ? 'border-red-500 ring-1 ring-red-500' : 'border-warm-gray-200'} bg-background-light px-4 py-3.5 text-base text-text-dark focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent outline-none transition-all pr-10`}
                                    id="goal"
                                    name="goal"
                                    value={formData.goal}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">
                                        {form.fields.goal.placeholder}
                                    </option>
                                    {form.fields.goal.options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray-500 pointer-events-none text-xl">
                                    {form.fields.goal.icon}
                                </span>
                            </div>
                            {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-sm font-medium text-text-dark"
                                htmlFor="message"
                            >
                                {form.fields.message.label}
                            </label>
                            <textarea
                                className="w-full rounded-lg border border-warm-gray-200 bg-background-light px-4 py-3.5 text-base text-text-dark placeholder:text-warm-gray-500 focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent outline-none resize-none transition-all"
                                id="message"
                                name="message"
                                placeholder={form.fields.message.placeholder}
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                maxLength={1000}
                            ></textarea>
                            <div className="text-xs text-warm-gray-500 text-right">
                                {formData.message.length}/1000 characters
                            </div>
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm">
                                {messages.success}
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                                {messages.error}
                            </div>
                        )}

                        {/* Submit Action */}
                        <div className="pt-2 flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-emerald-accent hover:bg-emerald-accent/90 py-4 text-base font-bold text-white shadow-lg shadow-emerald-accent/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{isSubmitting ? 'Sending...' : form.submitButton.text}</span>
                                {!isSubmitting && (
                                    <span className="material-symbols-outlined text-lg">
                                        {form.submitButton.icon}
                                    </span>
                                )}
                            </button>

                            {/* Trust Indicator */}
                            <div className="flex items-center justify-center gap-2 text-sm text-warm-gray-500">
                                <span className="material-symbols-outlined text-base text-emerald-accent filled">
                                    {form.trustIndicator.icon}
                                </span>
                                <span>{form.trustIndicator.text}</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
