"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UserPlus, Database, CheckCircle2, ShieldAlert, Cpu, Lock, Terminal } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';

export default function EnrollPage() {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');

    const handleCapture = async (_imageData: string) => {
        if (!userName) {
            setStatus('error');
            setMessage('Identity label required before enrollment.');
            return;
        }

        setStatus('processing');
        setMessage('Encoding biometric templates...');

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setStatus('success');
            setMessage(`Biometric profile for "${userName}" successfully registered.`);
        } catch (_err) {
            setStatus('error');
            setMessage('Failed to register biometric profile.');
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-8 bg-[#030712] overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <NeuralBackground />
                <div className="hero-glow opacity-30" />
            </div>

            {/* Top Navigation HUD */}
            <div className="absolute top-0 left-0 w-full p-12 flex justify-between items-start z-20">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Link href="/" className="group flex items-center gap-5 px-8 py-4 rounded-full glass-morphism border border-white/5 hover:border-primary/40 transition-all duration-500">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all">
                            <ArrowLeft className="w-4 h-4 text-primary group-hover:text-slate-950 transition-all" />
                        </div>
                        <span className="hud-label text-white tracking-[0.3em] font-black group-hover:text-primary transition-colors">Abort_Enrollment</span>
                    </Link>
                </motion.div>

                <div className="flex flex-col items-end gap-2 opacity-30 hidden md:flex">
                    <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4" />
                        <span className="hud-label">SDR_SUBSYSTEM_ALPHA_01</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="hud-label text-[8px]">LINK_STABLE_P2P</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center mt-20">
                <div className="w-full flex flex-col lg:flex-row gap-24 items-center">

                    {/* Left Panel: Form & Info */}
                    <div className="flex-1 w-full text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            <div>
                                <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 mb-10 shadow-[0_0_20px_rgba(129,140,248,0.1)]">
                                    <UserPlus className="w-5 h-5 text-accent" />
                                    <span className="hud-label text-accent tracking-[0.5em] font-black">Identity_Registry</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter text-white leading-[0.85]">
                                    SECURE <br />
                                    <span className="gradient-text">ENROLLMENT</span>
                                </h1>
                                <p className="text-2xl text-slate-400 font-light leading-relaxed max-w-lg">
                                    Link your neural biometric signature to a decentralized sector identifier.
                                </p>
                            </div>

                            <div className="space-y-8 max-w-md">
                                <div className="relative group">
                                    <div className="hud-label mb-4 text-slate-600 ml-2 tracking-[0.3em]">Identity_Qualifier</div>
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 to-transparent rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-700"></div>
                                        <input
                                            type="text"
                                            placeholder="FULLNAME_CID_PROT"
                                            className="relative w-full bg-[#030712]/60 backdrop-blur-md border border-white/10 rounded-[1.8rem] px-10 py-7 focus:outline-none focus:border-accent/50 transition-all text-white placeholder:text-slate-800 font-mono text-base tracking-[0.2em]"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                        <Database className="absolute right-10 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-800 group-focus-within:text-accent transition-colors" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-6">
                                    <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col gap-4 group hover:border-white/10 transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                                            <Lock className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="hud-label text-[9px] tracking-[0.4em] text-slate-600">Enc_Stream</span>
                                    </div>
                                    <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col gap-4 group hover:border-white/10 transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                                            <Cpu className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="hud-label text-[9px] tracking-[0.4em] text-slate-600">Local_AI</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Panel: Camera Capture */}
                    <div className="flex-[1.1] w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="absolute -inset-10 bg-accent/5 rounded-[4rem] blur-3xl opacity-50" />
                            <div className="relative glass-morphism p-12 md:p-16 border border-white/10 bg-[#030712]/40 backdrop-blur-2xl rounded-[4rem]">
                                <CameraCapture
                                    onCapture={handleCapture}
                                    status={status}
                                    message={message}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Status Alerts */}
                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-10"
                        >
                            <div className="p-12 glass-morphism border-green-500/30 bg-green-950/40 backdrop-blur-3xl flex items-center gap-10 shadow-[0_40px_100px_rgba(34,197,94,0.4)] rounded-[3rem]">
                                <div className="w-24 h-24 rounded-[2rem] bg-green-500 flex items-center justify-center shrink-0 border-4 border-green-400/50 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                                    <CheckCircle2 className="w-12 h-12 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="hud-label text-green-500 mb-4 tracking-[0.5em] font-black">Registry_Confirmed</p>
                                    <p className="text-white font-black text-4xl mb-3 tracking-tighter">Profile Secured</p>
                                    <p className="text-white/60 text-lg font-light tracking-tight">{message}</p>
                                    <button onClick={() => window.location.href = '/'} className="mt-8 px-10 py-4 rounded-full bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-all">Return_Hub</button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12"
                        >
                            <div className="inline-flex items-center gap-5 px-10 py-5 rounded-[2rem] bg-red-500/10 border border-red-500/30 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                                <ShieldAlert className="w-6 h-6 flex-shrink-0" />
                                <span className="hud-label text-sm tracking-[0.3em] font-black">{message}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Cinematic Decorations */}
            <div className="absolute top-[20%] right-[-10%] text-[500px] font-black text-white/[0.015] pointer-events-none select-none tracking-tighter leading-none">
                ENRL
            </div>
            <div className="absolute bottom-[20%] left-[-10%] text-[500px] font-black text-white/[0.015] pointer-events-none select-none tracking-tighter leading-none">
                0101
            </div>
        </main>
    );
}
