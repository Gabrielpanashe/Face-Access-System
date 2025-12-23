"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UserPlus, Database, CheckCircle2, ShieldAlert, Cpu, Lock } from 'lucide-react';

export default function EnrollPage() {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');

    const handleCapture = async (imageData: string) => {
        if (!userName) {
            setStatus('error');
            setMessage('Identity label required before enrollment.');
            return;
        }

        setStatus('processing');
        setMessage('ENCODING_BIOMETRICS...');

        try {
            const formData = new FormData();
            formData.append('name', userName);
            formData.append('image', imageData);

            const response = await fetch('http://localhost:8000/api/enroll', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setStatus('success');
                setMessage(data.message || `Profile registered for "${userName}".`);
            } else {
                setStatus('error');
                setMessage(data.detail || 'Enrollment failed.');
            }
        } catch (err) {
            console.error('Enrollment error:', err);
            setStatus('error');
            setMessage('Server connection lost.');
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] text-white flex flex-col p-6 md:p-12 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="bg-deco-text top-0 right-0 opacity-5">ENRL</div>
            <div className="bg-deco-text bottom-0 left-0 opacity-5">0101</div>

            {/* Navigation */}
            <nav className="z-20 mb-12">
                <Link href="/" className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass-morphism border border-white/10 hover:border-primary/50 transition-all group">
                    <ArrowLeft className="w-4 h-4 text-primary group-hover:-translate-x-1 transition-transform" />
                    <span className="hud-label text-white/80">Exit_Protocol</span>
                </Link>
            </nav>

            <div className="flex-1 flex flex-col lg:flex-row gap-16 items-center max-w-7xl mx-auto w-full z-10">
                {/* Information Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 space-y-12"
                >
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                            <UserPlus className="w-5 h-5 text-primary" />
                            <span className="hud-label text-primary">Biometric_Registry</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
                            SECURE <br />
                            <span className="gradient-text">ENROLL</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-light max-w-md">
                            Assign your neural biometric signature to a secure decentralized identifier.
                        </p>
                    </div>

                    <div className="space-y-8 max-w-md">
                        <div className="relative group">
                            <label className="hud-label block mb-4 ml-2">Identity_Qualifier</label>
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                                <input
                                    type="text"
                                    placeholder="Enter full name..."
                                    className="relative w-full bg-[#030712]/80 border border-white/10 rounded-2xl px-10 py-7 focus:outline-none focus:border-primary/50 transition-all text-white font-bold text-xl placeholder:text-slate-800"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <Database className="absolute right-10 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-700 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
                                <Lock className="w-5 h-5 text-slate-600" />
                                <span className="hud-label text-[9px]">AES_256_ENC</span>
                            </div>
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
                                <Cpu className="w-5 h-5 text-slate-600" />
                                <span className="hud-label text-[9px]">LOCAL_DL_NODE</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Camera Side */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-[1.2] w-full"
                >
                    <div className="glass-morphism p-2 rounded-[3.5rem] border border-white/10 overflow-hidden">
                        <CameraCapture
                            onCapture={handleCapture}
                            status={status}
                            message={message}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/90 backdrop-blur-xl p-8"
                    >
                        <div className="glass-morphism p-12 max-w-xl w-full text-center space-y-8 rounded-[3rem] border-primary/30">
                            <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(0,242,255,0.4)]">
                                <CheckCircle2 className="w-12 h-12 text-[#020617]" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black tracking-tight uppercase">Registry_Confirmed</h2>
                                <p className="text-slate-400 text-lg leading-relaxed">{message}</p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="btn-primary w-full shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                            >
                                Return_To_Command_Hub
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-12 right-12 z-50"
                    >
                        <div className="px-6 py-4 rounded-xl bg-red-600/10 border border-red-600/30 text-red-500 backdrop-blur-xl flex items-center gap-4 shadow-xl">
                            <ShieldAlert className="w-5 h-5" />
                            <span className="hud-label font-bold tracking-widest">{message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
