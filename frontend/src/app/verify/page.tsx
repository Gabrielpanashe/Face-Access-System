"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, ShieldAlert, Fingerprint, Activity, Zap, Terminal, Lock, Globe, Power } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';

export default function VerifyPage() {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleCapture = async (imageData: string) => {
        setStatus('processing');
        setMessage('Initializing neural gateway verification...');

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setStatus('success');
            setMessage('Identity Verified. Authorized Access Granted.');
        } catch (err) {
            setStatus('error');
            setMessage('Biometric anomaly detected. Access Denied.');
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-8 bg-[#030712] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <NeuralBackground />
                <div className="hero-glow opacity-40" />
            </div>

            {/* Top Navigation HUD */}
            <div className="absolute top-0 left-0 w-full p-12 flex justify-between items-start z-20">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Link href="/" className="group flex items-center gap-5 px-8 py-4 rounded-full glass-morphism border border-white/5 hover:border-primary/40 transition-all duration-500">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all">
                            <ArrowLeft className="w-4 h-4 text-primary group-hover:text-slate-950 transition-all" />
                        </div>
                        <span className="hud-label text-white tracking-[0.3em] font-black group-hover:text-primary transition-colors">Abort_Session</span>
                    </Link>
                </motion.div>

                <div className="flex gap-10 hidden lg:flex opacity-30">
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-3">
                            <Terminal className="w-3.5 h-3.5" />
                            <span className="hud-label">SDR_GATEWAY_V4</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500">AUTH_MODE_SPECTRAL</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center mt-20">
                <div className="flex flex-col lg:flex-row gap-24 items-center w-full">
                    {/* Left Panel: Header & Technical Info */}
                    <div className="flex-1 text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div>
                                <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 mb-10 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                                    <Fingerprint className="w-5 h-5 text-primary" />
                                    <span className="hud-label text-primary tracking-[0.5em] font-black">Biometric_Tunnel</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter text-white leading-[0.85]">
                                    ACCESS <br />
                                    <span className="gradient-text">GATEWAY</span>
                                </h1>
                                <p className="text-2xl text-slate-400 font-light leading-relaxed max-w-lg">
                                    Establishing a zero-knowledge connection to the secure neural mainframe.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 max-w-md">
                                <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] space-y-4 group hover:border-primary/30 transition-all duration-500">
                                    <Zap className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors" />
                                    <div className="flex flex-col gap-1">
                                        <span className="hud-label text-slate-600 text-[10px] tracking-[0.3em]">Processing</span>
                                        <span className="text-white font-black tracking-widest text-lg uppercase">Real-Time</span>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] space-y-4 group hover:border-primary/30 transition-all duration-500">
                                    <Lock className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors" />
                                    <div className="flex flex-col gap-1">
                                        <span className="hud-label text-slate-600 text-[10px] tracking-[0.3em]">Enc_Link</span>
                                        <span className="text-white font-black tracking-widest text-lg uppercase">ECC_SECURE</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 opacity-30 hud-label text-[10px] tracking-[0.4em]">
                                <Globe className="w-4 h-4" />
                                <span>DISTRIBUTED_NODE_ALPHA</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <span>SEC_LVL_MAX</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Panel: Scanner */}
                    <div className="flex-[1.2] w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group/scanner"
                        >
                            <div className="absolute -inset-10 bg-primary/5 rounded-[5rem] blur-3xl opacity-0 group-hover/scanner:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-[#030712]/40 backdrop-blur-2xl rounded-[4rem] border border-white/10 p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
                                <CameraCapture
                                    onCapture={handleCapture}
                                    status={status}
                                    message={message}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Alert Overlays */}
            <AnimatePresence>
                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-10"
                    >
                        <div className="p-12 glass-morphism border-red-500/30 bg-red-950/50 backdrop-blur-3xl flex items-center gap-10 shadow-[0_40px_100px_rgba(239,68,68,0.4)] rounded-[3rem]">
                            <div className="w-24 h-24 rounded-[2rem] bg-red-500 flex items-center justify-center shrink-0 border-4 border-red-400/50 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                                <ShieldAlert className="w-12 h-12 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="hud-label text-red-500 mb-4 tracking-[0.5em] font-black">Security_Intervention</p>
                                <p className="text-white font-black text-4xl mb-3 tracking-tighter">Access Denied</p>
                                <p className="text-white/60 text-lg font-light tracking-tight">{message}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-10"
                    >
                        <div className="p-12 glass-morphism border-green-500/30 bg-green-950/50 backdrop-blur-3xl flex items-center gap-10 shadow-[0_40px_100px_rgba(34,197,94,0.4)] rounded-[3rem]">
                            <div className="w-24 h-24 rounded-[2rem] bg-green-500 flex items-center justify-center shrink-0 border-4 border-green-400/50 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                                <ShieldCheck className="w-12 h-12 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="hud-label text-green-500 mb-4 tracking-[0.5em] font-black">Auth_Success_Response</p>
                                <p className="text-white font-black text-4xl mb-3 tracking-tighter">Entry Granted</p>
                                <p className="text-white/60 text-lg font-light tracking-tight text-glow">{message}</p>
                                <Link href="/" className="mt-8 inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-all">
                                    <Power className="w-4 h-4" />
                                    Enter_System
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background cinematic text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[450px] font-black text-white/[0.012] pointer-events-none select-none tracking-tighter leading-none">
                VFY
            </div>
        </div>
    );
}
