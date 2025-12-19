"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, Database, CheckCircle2 } from 'lucide-react';

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
            // Mocking API call for now
            await new Promise(resolve => setTimeout(resolve, 3000));

            setStatus('success');
            setMessage(`Biometric profile for "${userName}" successfully registered.`);

        } catch (err) {
            setStatus('error');
            setMessage('Failed to register biometric profile.');
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#050505] overflow-hidden">
            <div className="hero-glow" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)' }} />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="absolute top-10 left-10 z-20">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-full glass-morphism hover:bg-white/10 transition-all text-white/60">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
                    </Link>
                </div>
            </motion.div>

            <div className="relative z-10 w-full max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 mx-auto border border-accent/30">
                        <UserPlus className="w-9 h-9 text-accent" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Identity Enrollment</h1>
                    <p className="text-white/40 max-w-md mx-auto">
                        Input identity details and capture face to register a new biometric profile.
                    </p>
                    </div>
                </motion.div>

                <div className="max-w-md mx-auto mb-10">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Full Name / Identity ID"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all text-white placeholder:text-white/20"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <Database className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                    </div>
                </div>

                <CameraCapture
                    onCapture={handleCapture}
                    status={status}
                    message={message}
                />

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="mt-8 p-6 glass-morphism border-green-500/20 bg-green-500/5 text-green-400 max-w-md mx-auto flex items-center gap-4">
                            <CheckCircle2 className="w-8 h-8" />
                            <div className="text-left">
                                <p className="font-bold uppercase tracking-widest text-xs">Profile Registered</p>
                                <p className="text-sm opacity-80">{message}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 p-10 opacity-5 pointer-events-none">
                <UserPlus className="w-64 h-64 text-white" />
            </div>
        </main>
    );
}
