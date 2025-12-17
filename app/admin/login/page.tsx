'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
                setLoading(false);
            } else {
                // Use window.location for full page redirect
                // This keeps the loader visible until the new page loads
                window.location.href = '/admin';
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex relative">
            {/* Loading Overlay with Logo */}
            {loading && (
                <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="relative">
                        {/* Logo Container */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            {/* Shining Effect Overlay */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine" style={{ width: '200%', height: '200%' }}></div>
                            </div>
                            
                            {/* Logo Image */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary-dark/10 rounded-2xl p-6 shadow-2xl">
                                <Image
                                    src="/images/DryON Pakistan.png"
                                    alt="DryON Pakistan Logo"
                                    width={200}
                                    height={80}
                                    className="w-auto h-auto max-w-full max-h-full object-contain animate-pulse"
                                    priority
                                />
                            </div>
                            
                            {/* Pulsing Ring */}
                            <div className="absolute inset-0 border-4 border-primary/30 rounded-2xl animate-ping"></div>
                        </div>
                        
                        {/* Loading Text */}
                        <p className="text-center mt-8 text-slate-600 font-medium animate-pulse">
                            Signing you in...
                        </p>
                    </div>
                </div>
            )}

            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30 flex-col justify-between p-12">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-2xl">D</span>
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-2xl">DryON</h1>
                            <span className="text-primary text-sm font-medium">Admin Panel</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-white leading-tight">
                        Manage Your<br />
                        <span className="text-primary">Business</span> with Ease
                    </h2>
                    <p className="text-slate-400 text-lg max-w-md">
                        Access your admin dashboard to manage products, users, categories, and more.
                    </p>
                </div>

                <div className="flex items-center gap-8 text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        System Operational
                    </div>
                    <div>© 2024 DryON Pakistan</div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">D</span>
                            </div>
                            <div className="text-left">
                                <h1 className="text-slate-800 font-bold text-2xl">DryON</h1>
                                <span className="text-primary text-sm font-medium">Admin Panel</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                            <p className="text-slate-500 mt-2">Sign in to your admin account</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        placeholder="admin@dryon.pk"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-xl hover:opacity-90 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 disabled:opacity-50"
                            >
                                Sign In
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-500">
                            <p>Demo credentials: admin@dryon.pk / admin123</p>
                        </div>
                    </div>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Protected by enterprise-grade security
                    </p>
                </div>
            </div>
        </div>
    );
}
