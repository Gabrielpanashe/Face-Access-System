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
        <main className="min-h-screen relative flex flex-col items-center justify-center p-8 bg-[#030712] overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="hero-glow opacity-40" />
                <div className="neural-bg opacity-50" />
            </div>

            {/* HUD Decorative Elements */}
            <div className="absolute top-10 right-10 flex flex-col items-end gap-2 opacity-30 hidden md:flex">
                <span className="hud-label">LOG_LEVEL: VERBOSE</span>
                <span className="hud-label">ENCRYPTION: AES_256_GCM</span>
                <div className="w-32 h-[1px] bg-white/10 mt-2" />
            </div>

            <div className="absolute bottom-10 right-10 hud-label opacity-20 hidden md:block">
                SDR_OS_V4.2.0 // REG_SUBSYSTEM
            </div>

            {/* Exit Portal Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-12 left-12 z-20"
            >
                <Link href="/" className="group flex items-center gap-4 px-6 py-3 rounded-full glass-morphism border border-white/5 hover:border-primary/30 transition-all font-bold">
                    <ArrowLeft className="w-4 h-4 text-primary group-hover:-translate-x-1 transition-transform" />
                    <span className="hud-label text-white tracking-[0.2em] group-hover:text-primary transition-colors">Term_Session</span>
                </Link>
            </motion.div>

            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
                <div className="w-full flex flex-col lg:flex-row gap-16 items-start">

                    {/* Form Section */}
                    <div className="flex-1 w-full lg:sticky lg:top-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-left"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 mb-8">
                                <UserPlus className="w-4 h-4 text-accent" />
                                <span className="hud-label text-accent tracking-[0.4em]">Sub_Enrollment</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white leading-tight">
                                IDENTITY <br />
                                <span className="gradient-text">REGISTRATION</span>
                            </h1>

                            <p className="text-slate-400 text-lg font-light leading-relaxed mb-12 max-w-md">
                                Establish a zero-knowledge biometric credential by linking a unique identifier to your neural face map.
                            </p>

                            <div className="space-y-6">
                                <div className="relative group">
                                    <div className="hud-label mb-3 text-slate-500 ml-1">Identity Qualifier</div>
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                                        <input
                                            type="text"
                                            placeholder="FULL_NAME / SECTOR_ID"
                                            className="relative w-full bg-slate-900/40 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-accent/40 transition-all text-white placeholder:text-slate-700 font-mono text-sm tracking-widest"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                        <Database className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700 group-focus-within:text-accent transition-colors" />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <div className="flex-1 p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
                                        <Lock className="w-4 h-4 text-slate-600" />
                                        <span className="hud-label text-[8px]">Encrypted Stream</span>
                                    </div>
                                    <div className="flex-1 p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
                                        <Cpu className="w-4 h-4 text-slate-600" />
                                        <span className="hud-label text-[8px]">Local Processing</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scanner Section */}
                    <div className="flex-[1.2] w-full">
                        <div className="glass-morphism p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Cpu className="w-24 h-24" />
                            </div>

                            <CameraCapture
                                onCapture={handleCapture}
                                status={status}
                                message={message}
                            />
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="mt-16 w-full max-w-2xl"
                        >
                            <div className="p-10 glass-morphism border-green-500/20 bg-green-500/5 backdrop-blur-3xl flex flex-col items-center text-center gap-6 shadow-[0_20px_50px_rgba(34,197,94,0.1)]">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                                </div>
                                <div className="space-y-2">
                                    <p className="hud-label text-green-500 text-sm tracking-[0.5em]">Enrollment_Verified</p>
                                    <h3 className="text-3xl font-black text-white">Identity Securely Encoded</h3>
                                    <p className="text-slate-400 font-light max-w-md mx-auto">{message}</p>
                                </div>
                                <Link
                                    href="/"
                                    className="mt-6 px-10 py-4 rounded-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:scale-105 active:scale-95 transition-all"
                                >
                                    Access Hub
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8"
                        >
                            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                                <span className="hud-label text-xs tracking-widest">{message}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background cinematic text */}
            <div className="absolute top-[20%] right-[-10%] text-[400px] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter leading-none">
                0101
            </div>
        </main>
    );
}
