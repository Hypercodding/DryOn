'use client';

import { useState, useEffect } from 'react';
import { Save, Settings, Globe, Mail, Share2, Building } from 'lucide-react';

interface Setting {
    id: string;
    key: string;
    value: string;
    type: string;
    group: string;
}

const GROUP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    general: Building,
    contact: Mail,
    social: Share2,
    seo: Globe,
};

const GROUP_LABELS: Record<string, string> = {
    general: 'General Settings',
    contact: 'Contact Information',
    social: 'Social Media',
    seo: 'SEO Settings',
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<Record<string, Setting[]>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});

    const fetchSettings = async () => {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        setSettings(data.grouped);
        
        // Initialize form data
        const initial: Record<string, string> = {};
        Object.values(data.grouped).flat().forEach((setting: unknown) => {
            const s = setting as Setting;
            initial[s.key] = s.value;
        });
        setFormData(initial);
        setLoading(false);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const settingsArray = Object.entries(formData).map(([key, value]) => ({ key, value }));

        const res = await fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ settings: settingsArray })
        });

        if (res.ok) {
            alert('Settings saved successfully!');
        }
        setSaving(false);
    };

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
                    <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
                    <p className="text-slate-500">Configure your application settings</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {Object.entries(settings).map(([group, groupSettings]) => {
                    const Icon = GROUP_ICONS[group] || Settings;
                    return (
                        <div key={group} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    {GROUP_LABELS[group] || group}
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                {groupSettings.map((setting) => (
                                    <div key={setting.key}>
                                        <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">
                                            {setting.key.replace(/_/g, ' ')}
                                        </label>
                                        {setting.type === 'boolean' ? (
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData[setting.key] === 'true'}
                                                    onChange={(e) => handleChange(setting.key, e.target.checked.toString())}
                                                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                                />
                                                <span className="text-slate-600">Enabled</span>
                                            </label>
                                        ) : setting.type === 'json' ? (
                                            <textarea
                                                value={formData[setting.key]}
                                                onChange={(e) => handleChange(setting.key, e.target.value)}
                                                rows={4}
                                                className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
                                            />
                                        ) : (
                                            <input
                                                type={setting.type === 'number' ? 'number' : 'text'}
                                                value={formData[setting.key]}
                                                onChange={(e) => handleChange(setting.key, e.target.value)}
                                                className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}

