'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LandingPageLoaderProps {
    isLoading: boolean;
}

export default function LandingPageLoader({ isLoading }: LandingPageLoaderProps) {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            // Add a small delay before hiding to ensure smooth transition
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!showLoader) return null;

    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="relative">
                {/* Logo Container */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    {/* Shining Effect Overlay */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine" 
                            style={{ width: '200%', height: '200%' }}
                        />
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
                    <div className="absolute inset-0 border-4 border-primary/30 rounded-2xl animate-ping" />
                </div>
                
                {/* Loading Text */}
                <p className="text-center mt-8 text-slate-600 font-medium animate-pulse">
                    {isLoading ? 'Loading products...' : 'Almost ready...'}
                </p>
            </div>
        </div>
    );
}

