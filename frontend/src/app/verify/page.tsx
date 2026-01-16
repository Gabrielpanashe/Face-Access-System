"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, ShieldAlert, Power, Fingerprint } from 'lucide-react';

export default function VerifyPage() {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showPinModal, setShowPinModal] = useState(false);
    const [pinName, setPinName] = useState('');
    const [pinCode, setPinCode] = useState('');

    const handleCapture = async (imageData: string) => {
        setStatus('processing');
        setMessage('INITIALIZING_SCAN...');

        try {
            const formData = new FormData();
            formData.append('image', imageData);

            const response = await fetch('http://localhost:8000/api/verify', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status === 'success' && data.access) {
                setStatus('success');
                setMessage(`Access Granted: ${data.identity}`);
            } else {
                setStatus('error');
                setMessage(data.message || 'Access Denied.');
            }
        } catch (err) {
            console.error('Verification error:', err);
            setStatus('error');
            setMessage('Network disruption.');
        }
    };

    const handlePinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pinName || !pinCode) return;

        setStatus('processing');
        setMessage('VERIFYING_PIN...');
        setShowPinModal(false);

        try {
            const formData = new FormData();
            formData.append('name', pinName);
            formData.append('pin', pinCode);

            const response = await fetch('http://localhost:8000/api/verify-pin', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status === 'success' && data.access) {
                setStatus('success');
                setMessage(`Access Granted: ${data.identity}`);
            } else {
                setStatus('error');
                setMessage(data.message || 'Invalid PIN.');
            }
        } catch (err) {
            console.error('PIN Verification error:', err);
            setStatus('error');
            setMessage('Network disruption.');
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] text-white flex flex-col p-6 md:p-12 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="bg-deco-text top-0 left-0 opacity-5">VFY</div>
            <div className="bg-deco-text bottom-0 right-0 opacity-5">SECURE</div>

            {/* Navigation */}
            <nav className="z-20 mb-12">
                <Link href="/" className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass-morphism border border-white/10 hover:border-primary/50 transition-all group">
                    <ArrowLeft className="w-4 h-4 text-primary group-hover:-translate-x-1 transition-transform" />
                    <span className="hud-label text-white/80">Abort_Scan</span>
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
                            <Fingerprint className="w-5 h-5 text-primary" />
                            <span className="hud-label text-primary">Identity_Verification</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
                            ACCESS <br />
                            <span className="gradient-text">CONTROL</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-light max-w-md">
                            Scan your biometric signature to authenticate with the decentralized neural network.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 opacity-40">
                        <div className="flex flex-col gap-1">
                            <span className="hud-label text-[9px]">Status</span>
                            <span className="text-sm font-black text-white">READY_FOR_SCAN</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex flex-col gap-1">
                            <span className="hud-label text-[9px]">Level</span>
                            <span className="text-sm font-black text-white">ALPHA_SECURE</span>
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

            {/* Success/Error Overlays */}
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
                                <ShieldCheck className="w-12 h-12 text-[#020617]" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black tracking-tight text-glow uppercase">Entry_Granted</h2>
                                <p className="text-slate-400 text-lg leading-relaxed">{message}</p>
                            </div>
                            <Link href="/" className="btn-primary inline-flex items-center justify-center w-full gap-4">
                                <Power className="w-5 h-5" />
                                Initiate_Session
                            </Link>
                        </div>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-red-950/20 backdrop-blur-3xl p-8"
                    >
                        <div className="glass-morphism p-12 max-w-xl w-full text-center space-y-8 rounded-[3rem] border-red-500/30">
                            <div className="w-24 h-24 rounded-3xl bg-red-600 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                                <ShieldAlert className="w-12 h-12 text-white" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black tracking-tight uppercase text-red-500">Access_Denied</h2>
                                <p className="text-slate-400 text-lg leading-relaxed">{message}</p>
                            </div>
                            <button
                                onClick={() => setStatus('idle')}
                                className="w-full px-8 py-4 rounded-xl border border-white/20 font-black text-xs uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
                            >
                                Try_Again
                            </button>
                            <button
                                onClick={() => setShowPinModal(true)}
                                className="w-full px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all text-primary"
                            >
                                Use_Alternative_PIN
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PIN Entry Modal */}
            <AnimatePresence>
                {showPinModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-[#020617]/95 backdrop-blur-2xl p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="glass-morphism p-10 max-w-md w-full rounded-[2.5rem] border border-white/10 space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-widest text-primary">Fallback_Access</h3>
                                <p className="text-slate-500 text-sm">Enter registered name and security PIN</p>
                            </div>

                            <form onSubmit={handlePinSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="hud-label text-[10px] ml-2">Identifier</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 text-white font-bold"
                                        value={pinName}
                                        onChange={(e) => setPinName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="hud-label text-[10px] ml-2">Security_PIN</label>
                                    <input
                                        type="password"
                                        maxLength={6}
                                        placeholder="••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 text-white font-bold tracking-[1em] text-center"
                                        value={pinCode}
                                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowPinModal(false)}
                                        className="flex-1 px-6 py-4 rounded-xl border border-white/10 font-bold text-[10px] uppercase tracking-widest"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] btn-primary"
                                    >
                                        Verify_Identity
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
