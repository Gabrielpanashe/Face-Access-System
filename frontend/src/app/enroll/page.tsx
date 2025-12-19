"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UserPlus, Database, CheckCircle2, ShieldAlert } from 'lucide-react';

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
        setMessage('Encoding biometric templates...');

        try {
            // Mocking API call
            await new Promise(resolve => setTimeout(resolve, 3000));
            setStatus('success');
            setMessage(`Biometric profile for "${userName}" successfully registered.`);
        } catch (err) {
            setStatus('error');
            setMessage('Failed to register biometric profile.');
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#020617] overflow-hidden">
            <div className="neural-bg" />

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-10 left-10 z-20"
            >
                <Link href="/" className="flex items-center gap-3 px-5 py-2.5 rounded-full glass-morphism hover:bg-white/10 transition-all text-slate-400 hover:text-white border border-white/5">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Portal</span>
                </Link>
            </motion.div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mb-8 mx-auto border border-accent/20 shadow-[0_0_30px_rgba(129,140,248,0.1)]">
                        <UserPlus className="w-10 h-10 text-accent" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-white">Enroll <span className="text-accent">Identity</span></h1>
                    <p className="text-slate-400 max-w-md mx-auto text-lg font-light leading-relaxed">
                        Establish new biometric credentials for high-security sector access.
                    </p>
                </motion.div>

                <div className="w-full max-w-md mb-12 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ASSIGNEE NAME / CID"
                            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all text-white placeholder:text-slate-600 font-mono text-sm tracking-widest"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <Database className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-accent transition-colors" />
                    </div>
                </div>

                <div className="w-full">
                    <CameraCapture
                        onCapture={handleCapture}
                        status={status}
                        message={message}
                    />
                </div>

                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="mt-12 w-full max-w-md"
                        >
                            <div className="p-8 glass-morphism border-green-500/20 bg-green-500/5 flex flex-col items-center text-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                    <CheckCircle2 className="w-7 h-7 text-green-400" />
                                </div>
                                <div>
                                    <p className="font-black uppercase tracking-[0.3em] text-[10px] text-green-500 mb-2">Protocol Complete</p>
                                    <p className="text-slate-300 font-light text-sm">{message}</p>
                                </div>
                                <Link href="/" className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Return to Dashboard</Link>
                            </div>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-center"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest">
                                <ShieldAlert className="w-4 h-4" />
                                <span>{message}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative background text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[300px] font-black text-white/[0.01] pointer-events-none select-none tracking-tighter">
                ENROLL
            </div>
        </main>
    );
}
