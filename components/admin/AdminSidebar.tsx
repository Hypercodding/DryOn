'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, Package, Tags, Factory, Users, Shield, 
    Settings, LogOut, FileText, MessageSquare, Activity,
    ChevronDown, Menu, X
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    children?: { label: string; href: string }[];
    requiredPermission?: string | null;
}

const navItems: NavItem[] = [
    // Dashboard is visible to all authenticated users
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', requiredPermission: null },
    { 
        icon: Package, 
        label: 'Products', 
        href: '/admin/products',
        requiredPermission: 'products.read',
        children: [
            { label: 'All Products', href: '/admin/products' },
            { label: 'Add New', href: '/admin/products/new' },
        ]
    },
    { icon: Tags, label: 'Categories', href: '/admin/categories', requiredPermission: 'categories.read' },
    { icon: Factory, label: 'Industries', href: '/admin/industries', requiredPermission: 'industries.read' },
    { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries', requiredPermission: 'inquiries.read' },
    { icon: Users, label: 'Users', href: '/admin/users', requiredPermission: 'users.read' },
    { icon: Shield, label: 'Roles & Permissions', href: '/admin/roles', requiredPermission: 'roles.read' },
    { icon: Activity, label: 'Activity Logs', href: '/admin/logs', requiredPermission: 'logs.read' },
    { icon: Settings, label: 'Settings', href: '/admin/settings', requiredPermission: 'settings.read' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleExpand = (label: string) => {
        setExpandedItems(prev => 
            prev.includes(label) 
                ? prev.filter(i => i !== label) 
                : [...prev, label]
        );
    };

    const isActive = (href: string, children?: { label: string; href: string }[]) => {
        if (pathname === href) return true;
        if (children) {
            return children.some(child => pathname === child.href || pathname.startsWith(child.href + '/'));
        }
        return href !== '/admin' && pathname.startsWith(href);
    };

    const userRole = (session?.user as any)?.role || 'Admin';
    const userPermissions = ((session?.user as any)?.permissions || []) as string[];

    const hasPermissionForItem = (item: NavItem) => {
        if (!item.requiredPermission) {
            return true;
        }
        if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
            return false;
        }
        return userPermissions.includes(item.requiredPermission);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg"
            >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {mobileOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed left-0 top-0 h-screen z-40
                w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
                flex flex-col shadow-2xl
                transition-transform duration-300
                lg:translate-x-0
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">D</span>
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-lg tracking-wide">DryON</h1>
                            <span className="text-xs text-primary font-medium">Admin Panel</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {navItems.filter(hasPermissionForItem).map((item) => {
                        const active = isActive(item.href, item.children);
                        const expanded = expandedItems.includes(item.label);

                        if (item.children) {
                            return (
                                <div key={item.label}>
                                    <button
                                        onClick={() => toggleExpand(item.label)}
                                        className={`
                                            w-full flex items-center justify-between px-4 py-3 rounded-xl
                                            transition-all duration-200 group
                                            ${active 
                                                ? 'bg-primary/20 text-white' 
                                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`
                                                w-9 h-9 rounded-lg flex items-center justify-center
                                                transition-colors duration-200
                                                ${active 
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                                    : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'
                                                }
                                            `}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {expanded && (
                                        <div className="ml-12 mt-1 space-y-1">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className={`
                                                        block px-4 py-2 rounded-lg text-sm transition-colors
                                                        ${pathname === child.href 
                                                            ? 'text-primary bg-primary/10' 
                                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                        }
                                                    `}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-all duration-200 group
                                    ${active 
                                        ? 'bg-primary/20 text-white' 
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <div className={`
                                    w-9 h-9 rounded-lg flex items-center justify-center
                                    transition-colors duration-200
                                    ${active 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                        : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'
                                    }
                                `}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-white/10">
                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                {session?.user?.email?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">
                                    {session?.user?.email || 'Admin'}
                                </p>
                                <p className="text-xs text-primary">{userRole}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/admin/login' })}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                                       bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300
                                       rounded-lg transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
