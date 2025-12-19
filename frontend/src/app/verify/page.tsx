"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, ShieldAlert, Fingerprint, Activity, Zap, Terminal, Lock, Globe } from 'lucide-react';

export default function VerifyPage() {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleCapture = async (imageData: string) => {
        setStatus('processing');
        setMessage('Initializing neural gateway verification...');

        try {
            // Mocking API call
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
                <div className="hero-glow opacity-50" />
                <div className="neural-bg" />
            </div>

            {/* Security HUD */}
            <div className="absolute top-12 left-12 flex flex-col gap-6 hidden lg:flex">
                <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="hud-label text-primary">Terminal_Active</span>
                        <span className="text-[10px] font-mono text-slate-500">GATEWAY://ALPHA_SECURE</span>
                    </div>
                </div>

                <div className="w-[1px] h-20 bg-gradient-to-b from-primary/30 to-transparent ml-5" />
            </div>

            <div className="absolute bottom-12 left-12 hud-label opacity-30 flex gap-10 items-center hidden lg:flex">
                <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    <span>NOD_US_EAST</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>SEC_HASH: SHA-384</span>
            </div>

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-12 right-12 z-20"
            >
                <Link href="/" className="btn-shimmer flex items-center gap-3 px-6 py-3 rounded-full glass-morphism border border-white/5 hover:border-white/20 transition-all text-slate-400 hover:text-white">
                    <span className="hud-label tracking-[0.2em]">Abort_Auth</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
            </motion.div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
                <div className="flex flex-col lg:flex-row gap-20 items-center w-full">
                    {/* Scanner Terminal */}
                    <div className="flex-1 w-full order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-[#030712] rounded-[3.5rem] border border-white/10 p-4 shadow-2xl">
                                <CameraCapture
                                    onCapture={handleCapture}
                                    status={status}
                                    message={message}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Metadata Panel */}
                    <div className="flex-1 text-left order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="hud-label text-primary tracking-[0.5em]">Auth_Sequence_v4</span>
                            </div>

                            <h1 className="text-6xl font-black mb-8 tracking-tighter text-white leading-[0.9]">
                                NEURAL <br />
                                <span className="gradient-text">GATEWAY</span>
                            </h1>

                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12">
                                System check: <span className="text-white">Active</span>. Our AI processor is evaluating <span className="text-primary font-bold">128-bit biometric vectors</span>. Keep steady for the optic sensor.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-3 group hover:border-primary/20 transition-all">
                                    <Zap className="w-5 h-5 text-primary opacity-50" />
                                    <div className="flex flex-col">
                                        <span className="hud-label text-slate-600 mb-1">Processing</span>
                                        <span className="text-white font-bold tracking-tight text-lg">LATENCY_CRIT</span>
                                    </div>
                                </div>
                                <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-3 group hover:border-primary/20 transition-all">
                                    <Lock className="w-5 h-5 text-primary opacity-50" />
                                    <div className="flex flex-col">
                                        <span className="hud-label text-slate-600 mb-1">Enc_Standard</span>
                                        <span className="text-white font-bold tracking-tight text-lg">ECC_384_BIT</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Alert Overlays */}
            <AnimatePresence>
                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-10"
                    >
                        <div className="p-10 glass-morphism border-red-500/30 bg-red-950/40 backdrop-blur-3xl flex items-center gap-10 shadow-[0_40px_100px_rgba(239,68,68,0.4)]">
                            <div className="w-20 h-20 rounded-3xl bg-red-500 flex items-center justify-center shrink-0 animate-pulse border-4 border-red-400/50">
                                <ShieldAlert className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="hud-label text-red-500 mb-3 tracking-[0.4em]">Auth_Failure_Alert</p>
                                <p className="text-white font-black text-3xl mb-2 tracking-tight">Access Revoked</p>
                                <p className="text-white/60 text-sm font-light tracking-tight">{message}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-10"
                    >
                        <div className="p-10 glass-morphism border-green-500/30 bg-green-950/40 backdrop-blur-3xl flex items-center gap-10 shadow-[0_40px_100px_rgba(34,197,94,0.4)]">
                            <div className="w-20 h-20 rounded-3xl bg-green-500 flex items-center justify-center shrink-0 border-4 border-green-400/50">
                                <ShieldCheck className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="hud-label text-green-500 mb-3 tracking-[0.4em]">Auth_Success_Response</p>
                                <p className="text-white font-black text-3xl mb-2 tracking-tight">Entry Granted</p>
                                <p className="text-white/60 text-sm font-light tracking-tight">{message}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background cinematic text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[350px] font-black text-white/[0.015] pointer-events-none select-none tracking-tighter leading-none">
                VERIFY
            </div>
        </main>
    );
}
