
"use client";

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

interface NewsletterProps {
    data?: {
        badge?: string;
        title?: string;
        description?: string;
        placeholder?: string;
        buttonText?: string;
        disclaimer?: string;
    };
}

const NewsletterSection = ({ data }: NewsletterProps) => {
    const [email, setEmail] = useState('');
    const [interests, setInterests] = useState<Set<string>>(new Set(['Market Reports'])); // Default selection
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const toggleInterest = (interest: string) => {
        const newInterests = new Set(interests);
        if (newInterests.has(interest)) {
            newInterests.delete(interest);
        } else {
            newInterests.add(interest);
        }
        setInterests(newInterests);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const { error } = await supabase
                .from('newsletter_subscriptions')
                .insert([
                    {
                        email,
                        interests: Array.from(interests)
                    }
                ]);

            if (error) {
                if (error.code === '23505') { // Unique violation
                    setStatus('success');
                    setMessage('You are already subscribed!');
                } else {
                    throw error;
                }
            } else {
                setStatus('success');
                setMessage('Thanks for subscribing! Check your inbox soon.');
                setEmail('');
            }
        } catch (error: any) {
            console.error('Newsletter error:', error);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    if (!data) return null;

    return (
        <section className="bg-background-light dark:bg-[#222222] py-16 w-full border-y border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-20">
                    {/* Text Block (Left) */}
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-primary dark:text-blue-400 text-[20px]">insights</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary/70 dark:text-blue-400/80">{data.badge || 'Market Insights'}</span>
                        </div>
                        <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                            {data.title || 'Get Exclusive AI-Powered Market Insights'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                            {data.description || 'Join 10,000+ investors leveraging our predictive algorithms to identify high-yield properties before they hit the market.'}
                        </p>
                    </div>

                    {/* Input Block (Right) */}
                    <div className="w-full lg:w-auto lg:min-w-[500px] flex flex-col gap-3">
                        <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={handleSubmit}>
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 text-[20px]">mail</span>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 pl-10 pr-4 bg-white border border-gray-200 rounded text-sm text-black placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder={data.placeholder || 'Enter your work email'}
                                    required
                                    disabled={status === 'loading' || status === 'success'}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`bg-primary hover:bg-[#233b5c] text-white h-12 px-8 rounded font-semibold text-sm shadow-sm transition-colors whitespace-nowrap flex items-center justify-center gap-2 group ${status === 'loading' || status === 'success' ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed' : (data.buttonText || 'Subscribe')}
                                {status === 'idle' && <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>}
                                {status === 'success' && <span className="material-symbols-outlined text-[18px]">check</span>}
                            </button>
                        </form>

                        {/* Status Message */}
                        {message && (
                            <div className={`text-sm font-medium ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                                {message}
                            </div>
                        )}

                        {/* Checkboxes */}
                        <div className="custom-checkbox flex flex-col gap-3 sm:flex-row sm:gap-6 mt-3">
                            <label className="flex items-center gap-3 cursor-pointer group/check" onClick={(e) => e.stopPropagation()}>
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={interests.has('Market Reports')}
                                        onChange={() => toggleInterest('Market Reports')}
                                        className="peer h-5 w-5 appearance-none rounded border-2 border-gray-300 dark:border-gray-600 bg-transparent checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] checked:bg-no-repeat checked:bg-center focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-200"
                                    />
                                    <div className="absolute inset-0 rounded bg-primary opacity-0 peer-checked:animate-ping"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover/check:text-primary dark:group-hover/check:text-white transition-colors">Market Reports</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group/check" onClick={(e) => e.stopPropagation()}>
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={interests.has('New Listings')}
                                        onChange={() => toggleInterest('New Listings')}
                                        className="peer h-5 w-5 appearance-none rounded border-2 border-gray-300 dark:border-gray-600 bg-transparent checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] checked:bg-no-repeat checked:bg-center focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-200"
                                    />
                                    <div className="absolute inset-0 rounded bg-primary opacity-0 peer-checked:animate-ping"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover/check:text-primary dark:group-hover/check:text-white transition-colors">New Listings</span>
                            </label>
                        </div>

                        <p className="text-xs text-gray-400 dark:text-gray-500 pl-1 mt-2">
                            {data.disclaimer || 'Zero spam. Unsubscribe at any time with one click.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
