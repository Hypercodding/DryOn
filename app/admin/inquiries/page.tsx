'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Building2, Trash2, Eye, Check, Archive, Clock } from 'lucide-react';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
    message: string;
    status: string;
    notes: string | null;
    createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-yellow-100 text-yellow-700',
    replied: 'bg-green-100 text-green-700',
    archived: 'bg-gray-100 text-gray-700',
};

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    const fetchInquiries = async () => {
        const res = await fetch('/api/admin/inquiries');
        const data = await res.json();
        setInquiries(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        const res = await fetch(`/api/admin/inquiries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });

        if (res.ok) {
            fetchInquiries();
            if (selectedInquiry?.id === id) {
                setSelectedInquiry({ ...selectedInquiry, status });
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        
        const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchInquiries();
            if (selectedInquiry?.id === id) {
                setSelectedInquiry(null);
            }
        }
    };

    const newCount = inquiries.filter(i => i.status === 'new').length;

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
                    <h1 className="text-2xl font-bold text-slate-800">Contact Inquiries</h1>
                    <p className="text-slate-500">
                        {newCount > 0 
                            ? `You have ${newCount} new ${newCount === 1 ? 'inquiry' : 'inquiries'}`
                            : 'All caught up!'
                        }
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Inquiries List */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-800">All Inquiries</h3>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-[70vh] overflow-y-auto">
                        {inquiries.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                                <p>No inquiries yet</p>
                            </div>
                        ) : (
                            inquiries.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    onClick={() => {
                                        setSelectedInquiry(inquiry);
                                        if (inquiry.status === 'new') {
                                            updateStatus(inquiry.id, 'read');
                                        }
                                    }}
                                    className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                                        selectedInquiry?.id === inquiry.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                                    } ${inquiry.status === 'new' ? 'bg-blue-50/50' : ''}`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-slate-800">{inquiry.name}</span>
                                            {inquiry.status === 'new' && (
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            )}
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[inquiry.status]}`}>
                                            {inquiry.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 truncate">{inquiry.message}</p>
                                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Inquiry Details */}
                <div className="lg:col-span-2">
                    {selectedInquiry ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{selectedInquiry.name}</h2>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {selectedInquiry.email}
                                        </span>
                                        {selectedInquiry.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                {selectedInquiry.phone}
                                            </span>
                                        )}
                                        {selectedInquiry.company && (
                                            <span className="flex items-center gap-1">
                                                <Building2 className="w-4 h-4" />
                                                {selectedInquiry.company}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_COLORS[selectedInquiry.status]}`}>
                                    {selectedInquiry.status}
                                </span>
                            </div>
                            
                            <div className="p-6">
                                <h4 className="text-sm font-semibold text-slate-500 uppercase mb-3">Message</h4>
                                <p className="text-slate-700 whitespace-pre-wrap bg-slate-50 rounded-xl p-4">
                                    {selectedInquiry.message}
                                </p>
                            </div>

                            <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateStatus(selectedInquiry.id, 'replied')}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                                    >
                                        <Check className="w-4 h-4" />
                                        Mark as Replied
                                    </button>
                                    <button
                                        onClick={() => updateStatus(selectedInquiry.id, 'archived')}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                                    >
                                        <Archive className="w-4 h-4" />
                                        Archive
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleDelete(selectedInquiry.id)}
                                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Select an inquiry</h3>
                            <p className="text-slate-500">Click on an inquiry from the list to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

