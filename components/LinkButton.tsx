import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface LinkButtonProps {
    text: string;
    href?: string;
    className?: string;
    variant?: 'default' | 'primary' | 'secondary';
}

export default function LinkButton({ text, href = '#', className = '', variant = 'default' }: LinkButtonProps) {
    const variants = {
        default: 'text-secondary hover:text-primary hover:-translate-y-0.5',
        primary: 'btn-3d bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg',
        secondary: 'btn-3d bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg',
    };

    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 font-semibold transition-all duration-200 group ${variants[variant]} ${className}`}
            tabIndex={0}
        >
            {text}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
        </Link>
    );
}
