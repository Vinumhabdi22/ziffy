import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

interface InquiryFormProps {
    propertyTitle: string;
    propertyAddress: string;
}

export default function InquiryForm({ propertyTitle, propertyAddress }: InquiryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        timeline: "Immediate (Ready to close)"
    });
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        message: ""
    });
    const [submitMessage, setSubmitMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only number-like characters (digits, space, +, -, (, )) to prevent completely invalid input,
        // but limiting to 15 is the main request. 
        // A simple length check on the raw value is usually safest for international numbers unless strict formatting is needed.
        if (value.length <= 15) {
            setFormData(prev => ({ ...prev, phone: value }));
            if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
        }
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= 500) {
            setFormData(prev => ({ ...prev, message: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null); // Clear any previous messages
        const newErrors = { email: "", phone: "", message: "" };
        let isValid = true;

        if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (formData.phone.length < 10) { // Basic check
            newErrors.phone = "Phone number must be at least 10 digits";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setIsSubmitting(true);
            try {
                const { error } = await supabase.from('listing_inquiry').insert({
                    property_title: propertyTitle,
                    property_address: propertyAddress,
                    full_name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    investment_timeline: formData.timeline
                });

                if (error) throw error;

                setSubmitMessage({
                    type: 'success',
                    text: 'Thank you! Your inquiry has been sent successfully.'
                });
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    timeline: "Immediate (Ready to close)"
                });

                // Auto-dismiss success message after 5 seconds
                setTimeout(() => setSubmitMessage(null), 5000);
            } catch (error) {
                console.error("Error submitting inquiry:", error);
                setSubmitMessage({
                    type: 'error',
                    text: 'There was an error sending your message. Please try again.'
                });

                // Auto-dismiss error message after 5 seconds
                setTimeout(() => setSubmitMessage(null), 5000);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="bg-white rounded-xl border border-[#dbe0e6] p-6 shadow-xl">
            <h3 className="font-bold text-xl mb-2 text-black">Interested in this property?</h3>
            <p className="text-sm text-[#617589] mb-6">Our investment advisors are ready to help you with the due diligence process.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                    <input
                        className="w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary text-sm p-3 text-black placeholder:text-gray-400"
                        placeholder="John Doe"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                    <input
                        className={`w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary text-sm p-3 text-black placeholder:text-gray-400 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                        placeholder="john@investmentfirm.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Contact Number</label>
                        <span className="text-xs text-gray-400">{formData.phone.length}/15</span>
                    </div>
                    <input
                        className={`w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary text-sm p-3 text-black placeholder:text-gray-400 ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Investment Timeline</label>
                    <select
                        className="w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary text-sm p-3 text-black"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    >
                        <option>Immediate (Ready to close)</option>
                        <option>1-3 Months</option>
                        <option>Researching</option>
                    </select>
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Message</label>
                        <span className="text-xs text-gray-400">{formData.message.length}/500</span>
                    </div>
                    <textarea
                        className="w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary text-sm p-3 text-black placeholder:text-gray-400"
                        placeholder="I'm interested in this property..."
                        rows={3}
                        value={formData.message}
                        onChange={handleMessageChange}
                        required
                    ></textarea>
                </div>

                {/* Success/Error Message Display */}
                {submitMessage && (
                    <div className={`p-4 rounded-lg border-2 flex items-start gap-3 ${submitMessage.type === 'success'
                        ? 'bg-green-50 border-green-500 text-green-800'
                        : 'bg-red-50 border-red-500 text-red-800'
                        }`}>
                        <span className="material-symbols-outlined text-2xl flex-shrink-0">
                            {submitMessage.type === 'success' ? 'check_circle' : 'error'}
                        </span>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">
                                {submitMessage.type === 'success' ? 'Success!' : 'Error'}
                            </p>
                            <p className="text-sm mt-1">{submitMessage.text}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSubmitMessage(null)}
                            className="flex-shrink-0 hover:opacity-70 transition-opacity"
                            aria-label="Close message"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                )}

                <button
                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Sending..." : "Request Details"}
                    {!isSubmitting && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                </button>
            </form>
        </div>
    );
}
