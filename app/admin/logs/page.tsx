'use client';

import { useState, useEffect } from 'react';
import { Activity, Filter, User, Package, Tags, Settings, Shield, MessageSquare } from 'lucide-react';

interface ActivityLog {
    id: string;
    action: string;
    module: string;
    details: string;
    createdAt: string;
    user: {
        email: string;
        name: string;
    };
}

const MODULE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    products: Package,
    categories: Tags,
    industries: Tags,
    users: User,
    roles: Shield,
    settings: Settings,
    inquiries: MessageSquare,
    auth: User,
};

const ACTION_COLORS: Record<string, string> = {
    created: 'bg-green-100 text-green-700',
    updated: 'bg-blue-100 text-blue-700',
    deleted: 'bg-red-100 text-red-700',
    login: 'bg-purple-100 text-purple-700',
};

export default function LogsPage() {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchLogs = async () => {
        const params = new URLSearchParams({ page: page.toString(), limit: '30' });
        if (filter) params.set('module', filter);
        
        const res = await fetch(`/api/admin/logs?${params}`);
        const data = await res.json();
        setLogs(data.logs);
        setTotalPages(data.pagination.pages);
        setLoading(false);
    };

    useEffect(() => {
        fetchLogs();
    }, [page, filter]);

    const modules = ['products', 'categories', 'industries', 'users', 'roles', 'settings', 'auth'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Activity Logs</h1>
                    <p className="text-slate-500">Track all admin actions in the system</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Filter by module:</span>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => { setFilter(''); setPage(1); }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                filter === '' 
                                    ? 'bg-primary text-white' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            All
                        </button>
                        {modules.map(mod => (
                            <button
                                key={mod}
                                onClick={() => { setFilter(mod); setPage(1); }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                                    filter === mod 
                                        ? 'bg-primary text-white' 
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {mod}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Action</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Module</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Details</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    <Activity className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                                    <p>No activity logs found</p>
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => {
                                const Icon = MODULE_ICONS[log.module] || Activity;
                                let details = {};
                                try {
                                    details = JSON.parse(log.details);
                                } catch {}

                                return (
                                    <tr key={log.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-medium text-sm">
                                                    {log.user?.email?.charAt(0).toUpperCase() || '?'}
                                                </div>
                                                <span className="text-sm text-slate-700">{log.user?.email || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${ACTION_COLORS[log.action] || 'bg-slate-100 text-slate-600'}`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Icon className="w-4 h-4 text-slate-400" />
                                                <span className="text-sm text-slate-600 capitalize">{log.module}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-500 truncate max-w-xs block">
                                                {Object.entries(details).map(([k, v]) => `${k}: ${v}`).join(', ') || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(log.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-slate-600">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

