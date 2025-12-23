"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, ArrowLeft, RefreshCw, UserX } from 'lucide-react';

interface User {
    id: number;
    name: string;
    created_at: string;
    image_url: string;
}

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                console.error("Failed to fetch users");
            }
        } catch (e) {
            console.error("Error fetching users", e);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (name: string) => {
        if (!confirm(`Are you sure you want to delete user "${name}"? This cannot be undone.`)) return;

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/users/${name}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                alert("User deleted successfully.");
                fetchUsers(); // Refresh list
            } else {
                alert("Failed to delete user.");
            }
        } catch (e) {
            console.error("Error deleting user", e);
            alert("Error deleting user.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 p-8 sm:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all border border-primary/20"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                <div className="bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="p-6">Face Preview</th>
                                    <th className="p-6">Name / ID</th>
                                    <th className="p-6">Registered At</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-slate-500">
                                            <UserX className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                            <p>No registers users found.</p>
                                        </td>
                                    </tr>
                                )}
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-black">
                                                {/* Standard HTML img for simplicity with external local URL */}
                                                <img
                                                    src={`http://127.0.0.1:8000${user.image_url}`}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=No+Img';
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <p className="font-bold text-white text-lg">{user.name}</p>
                                            <p className="text-xs text-slate-500 font-mono">ID: {user.id}</p>
                                        </td>
                                        <td className="p-6 text-slate-400 font-mono text-sm">
                                            {new Date(user.created_at).toLocaleString()}
                                        </td>
                                        <td className="p-6 text-right">
                                            <button
                                                onClick={() => deleteUser(user.name)}
                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
