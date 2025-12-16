'use client';

import { useState, FormEvent } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
    const t = useTranslations('ContactPage');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-secondary mb-2">Send a Message</h2>
            <p className="text-slate mb-8">We&apos;ll get back to you within 24 hours.</p>

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 text-sm">Your message has been sent successfully! We&apos;ll get back to you soon.</p>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                        {t('fullName')} <span className="text-primary">{t('required')}</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white"
                        placeholder="John Doe"
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                        Email <span className="text-primary">{t('required')}</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white"
                        placeholder="john@company.com"
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white"
                        placeholder="+92 300 1234567"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                        Subject <span className="text-primary">{t('required')}</span>
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white"
                        placeholder="How can we help?"
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                        Message <span className="text-primary">{t('required')}</span>
                    </label>
                    <textarea
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white resize-none"
                        placeholder="Tell us about your project..."
                        required
                        disabled={loading}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

