'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Shield, Save, X, Check, Users } from 'lucide-react';

interface Permission {
    id: string;
    name: string;
    description: string;
    module: string;
    action: string;
}

interface Role {
    id: string;
    name: string;
    description: string;
    color: string;
    rolePermissions: Array<{ 
        id?: string;
        permission?: Permission | null;
        permissionId?: string | Permission | null;
    }>;
    _count: { users: number };
}

const COLORS = [
    { value: 'bg-red-500', label: 'Red' },
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-gray-500', label: 'Gray' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-indigo-500', label: 'Indigo' },
];

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<{ grouped: Record<string, Permission[]> }>({ grouped: {} });
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: 'bg-gray-500',
        permissionIds: [] as string[],
    });

    const fetchData = async () => {
        const [rolesRes, permsRes] = await Promise.all([
            fetch('/api/admin/roles'),
            fetch('/api/admin/permissions')
        ]);
        const rolesData = await rolesRes.json();
        const permsData = await permsRes.json();
        setRoles(rolesData);
        setPermissions(permsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setFormData({ name: '', description: '', color: 'bg-gray-500', permissionIds: [] });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (role: Role) => {
        setFormData({
            name: role.name,
            description: role.description,
            color: role.color,
            permissionIds: role.rolePermissions
                .filter(rp => rp && rp.permission && rp.permission.id)
                .map(rp => rp.permission?.id)
                .filter((id): id is string => Boolean(id)),
        });
        setEditingId(role.id);
        setShowForm(true);
    };

    const togglePermission = (permId: string) => {
        setFormData(prev => ({
            ...prev,
            permissionIds: prev.permissionIds.includes(permId)
                ? prev.permissionIds.filter(id => id !== permId)
                : [...prev.permissionIds, permId]
        }));
    };

    const toggleModule = (modulePerms: Permission[]) => {
        const moduleIds = modulePerms.map(p => p.id);
        const allSelected = moduleIds.every(id => formData.permissionIds.includes(id));
        
        setFormData(prev => ({
            ...prev,
            permissionIds: allSelected
                ? prev.permissionIds.filter(id => !moduleIds.includes(id))
                : [...new Set([...prev.permissionIds, ...moduleIds])]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const url = editingId ? `/api/admin/roles/${editingId}` : '/api/admin/roles';
        const method = editingId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            fetchData();
            resetForm();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this role?')) return;
        
        const res = await fetch(`/api/admin/roles/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchData();
        }
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
                    <h1 className="text-2xl font-bold text-slate-800">Roles & Permissions</h1>
                    <p className="text-slate-500">Manage user roles and their access permissions</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    Add Role
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800">
                            {editingId ? 'Edit Role' : 'Add New Role'}
                        </h2>
                        <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                                <select
                                    value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                >
                                    {COLORS.map(color => (
                                        <option key={color.value} value={color.value}>{color.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-4">Permissions</label>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(permissions.grouped).map(([module, perms]) => (
                                    <div key={module} className="bg-slate-50 rounded-xl p-4">
                                        <div 
                                            className="flex items-center justify-between mb-3 cursor-pointer"
                                            onClick={() => toggleModule(perms)}
                                        >
                                            <h4 className="font-semibold text-slate-700 capitalize">{module}</h4>
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center
                                                ${perms.every(p => formData.permissionIds.includes(p.id))
                                                    ? 'bg-primary border-primary'
                                                    : 'border-slate-300'
                                                }`}
                                            >
                                                {perms.every(p => formData.permissionIds.includes(p.id)) && (
                                                    <Check className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {perms.map(perm => (
                                                <label 
                                                    key={perm.id} 
                                                    className="flex items-center gap-2 cursor-pointer text-sm"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.permissionIds.includes(perm.id)}
                                                        onChange={() => togglePermission(perm.id)}
                                                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-slate-600 capitalize">{perm.action}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                {editingId ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role, idx) => (
                    <div key={role.id || role.name || `role-${idx}`} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className={`${role.color} p-6 text-white`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">{role.name}</h3>
                                    <p className="text-white/80 text-sm mt-1">{role.description || 'No description'}</p>
                                </div>
                                <Shield className="w-8 h-8 opacity-50" />
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                <Users className="w-4 h-4" />
                                <span>{role._count.users} users</span>
                                <span className="mx-2">•</span>
                                <span>{role.rolePermissions?.length || 0} permissions</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {role.rolePermissions && role.rolePermissions.length > 0 ? (
                                    <>
                                        {role.rolePermissions
                                            .filter(rp => rp && rp.permission && rp.permission.name)
                                            .slice(0, 5)
                                            .map((rp, idx) => {
                                                const permission = rp.permission;
                                                if (!permission || !permission.name) return null;
                                                return (
                                                    <span 
                                                        key={permission.id || `perm-${idx}`} 
                                                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                                                    >
                                                        {permission.name}
                                                    </span>
                                                );
                                            })
                                            .filter(Boolean)}
                                        {role.rolePermissions.filter(rp => rp && rp.permission && rp.permission.name).length > 5 && (
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                                +{role.rolePermissions.filter(rp => rp && rp.permission && rp.permission.name).length - 5} more
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-xs text-slate-400 italic">No permissions assigned</span>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleEdit(role)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(role.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

