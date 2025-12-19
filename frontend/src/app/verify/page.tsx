"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, ShieldAlert, Fingerprint, Activity, Zap } from 'lucide-react';

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
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Abort Session</span>
                </Link>
            </motion.div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-10">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_50px_rgba(56,189,248,0.15)] overflow-hidden">
                                <Fingerprint className="w-12 h-12 text-primary" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent animate-pulse" />
                            </div>
                            <Activity className="absolute -bottom-2 -right-2 w-8 h-8 text-primary/40" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">Biometric <span className="text-primary">Verification</span></h1>
                    <p className="text-slate-400 max-w-md mx-auto text-lg font-light leading-relaxed">
                        Please look directly into the scanner. Our AI is analyzing <span className="text-white font-medium">80+ facial landmarks</span> for liveness detection.
                    </p>
                </motion.div>

                <div className="w-full">
                    <CameraCapture
                        onCapture={handleCapture}
                        status={status}
                        message={message}
                    />
                </div>

                {/* Verification Meta Info */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-2xl text-center border-t border-white/5 pt-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Encryption</span>
                        <span className="text-white font-mono text-sm">TLS 1.3 / P-384</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Processing</span>
                        <span className="text-white font-mono text-sm underline decoration-primary underline-offset-4">Local Engine</span>
                    </div>
                    <div className="hidden md:flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Model Load</span>
                        <span className="text-white font-mono text-sm">INT8 Optimized</span>
                    </div>
                </div>
            </div>

            {/* Security Alerts */}
            <AnimatePresence>
                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6"
                    >
                        <div className="p-8 glass-morphism border-red-500/30 bg-red-950/40 backdrop-blur-2xl flex items-center gap-6 shadow-[0_20px_60px_rgba(239,68,68,0.3)]">
                            <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center shrink-0 animate-pulse">
                                <ShieldAlert className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="font-black uppercase tracking-[0.3em] text-[10px] text-red-500 mb-2">Security Intervention</p>
                                <p className="text-white font-bold text-lg mb-1 leading-tight">Access Prohibited</p>
                                <p className="text-white/60 text-xs font-light tracking-tight">{message}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
