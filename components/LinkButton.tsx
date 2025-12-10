import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface LinkButtonProps {
    text: string;
    href?: string;
    className?: string;
}

export default function LinkButton({ text, href = '#', className = '' }: LinkButtonProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 text-navy hover:text-primary font-bold transition-colors group ${className}`}
        >
            {text}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
    );
}
