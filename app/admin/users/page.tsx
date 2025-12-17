'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, Save, X, Shield, Mail, Check, Ban } from 'lucide-react';

interface Role {
    id: string;
    name: string;
    color: string;
}

interface User {
    id: string;
    email: string;
    name: string;
    roleId: string | null;
    role: Role | null;
    isActive: boolean;
    lastLoginAt: string | null;
    createdAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        roleId: '',
        isActive: true,
    });

    const fetchData = async () => {
        try {
            const [usersRes, rolesRes] = await Promise.all([
                fetch('/api/admin/users'),
                fetch('/api/admin/roles')
            ]);

            if (!usersRes.ok) {
                setUsers([]);
            } else {
                const usersData = await usersRes.json();
                // Ensure all users have an id field (fallback to _id if needed)
                const normalizedUsers = usersData.map((user: any) => ({
                    ...user,
                    id: user.id || user._id?.toString() || user._id
                }));
                setUsers(normalizedUsers);
            }

            if (!rolesRes.ok) {
                setRoles([]);
            } else {
                const rolesData = await rolesRes.json();
                setRoles(rolesData);
            }
        } catch (error) {
            setUsers([]);
            setRoles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setFormData({ email: '', password: '', name: '', roleId: '', isActive: true });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (user: User) => {
        setFormData({
            email: user.email,
            password: '',
            name: user.name,
            roleId: user.roleId || '',
            isActive: user.isActive,
        });
        setEditingId(user.id);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = { ...formData };
        if (!payload.password && editingId) {
            delete (payload as { password?: string }).password;
        }

        const url = editingId ? `/api/admin/users/${editingId}` : '/api/admin/users';
        const method = editingId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            try {
                const data = await res.json();
                if (data?.error) {
                    alert(data.error);
                }
            } catch {
                alert('Failed to save user. Please try again.');
            }
            return;
        }

        fetchData();
        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        
        const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            try {
                const data = await res.json();
                if (data?.error) {
                    alert(data.error);
                } else {
                    alert('Failed to delete user. Please try again.');
                }
            } catch {
                alert('Failed to delete user. Please try again.');
            }
            return;
        }

        fetchData();
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
                    <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                    <p className="text-slate-500">Manage admin users and their access</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    Add User
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800">
                            {editingId ? 'Edit User' : 'Add New User'}
                        </h2>
                        <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password {editingId && <span className="text-slate-400">(leave blank to keep current)</span>}
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                    {...(!editingId && { required: true })}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                                <select
                                    value={formData.roleId}
                                    onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                >
                                    <option value="">-- Select Role --</option>
                                    {roles.map((role, index) => (
                                        <option key={role.id || `role-${index}`} value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium text-slate-700">Account is active</span>
                            </label>
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

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Last Login</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                                    <p>No users found</p>
                                </td>
                            </tr>
                        ) : (
                            users.map((user, idx) => (
                                <tr key={user.id || user.email || `user-${idx}`} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-800">{user.name || 'No name'}</div>
                                                <div className="text-sm text-slate-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.role ? (
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${user.role.color}`}>
                                                <Shield className="w-3 h-3" />
                                                {user.role.name}
                                            </span>
                                        ) : (
                                            <span className="text-slate-400">No role</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.isActive ? (
                                            <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                                                <Check className="w-4 h-4" /> Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                                                <Ban className="w-4 h-4" /> Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {user.lastLoginAt 
                                            ? new Date(user.lastLoginAt).toLocaleDateString()
                                            : 'Never'
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id || (user as any)._id?.toString() || (user as any)._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

