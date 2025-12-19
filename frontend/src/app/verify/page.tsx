"use client";

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, ShieldAlert, Fingerprint } from 'lucide-react';
import axios from 'axios';

export default function VerifyPage() {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleCapture = async (imageData: string) => {
        setStatus('processing');
        setMessage('Connecting to neural gateway...');

        try {
            // Mocking API call for now until backend is ready
            // In production: const response = await axios.post('http://localhost:8000/api/verify', { image: imageData });

            await new Promise(resolve => setTimeout(resolve, 2500));

            // Simulate success for demonstration
            setStatus('success');
            setMessage('Identity Verified. Access Protocol Executed.');

        } catch (err) {
            setStatus('error');
            setMessage('Liveness verification failed. Access Denied.');
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#050505] overflow-hidden">
            <div className="hero-glow" />

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
                    <div className="mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 mx-auto border border-primary/30">
                        <Fingerprint className="w-9 h-9 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Identity Verification</h1>
                    <p className="text-white/40 max-w-md mx-auto">
                        Please align your face within the frame for biometric analysis.
                    </p>
                    </div>
                </motion.div>

                <CameraCapture
                    onCapture={handleCapture}
                    status={status}
                    message={message}
                />

                <AnimatePresence>
                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="mt-8 p-6 glass-morphism border-red-500/20 bg-red-500/5 text-red-500 max-w-md mx-auto flex items-center gap-4">
                                <ShieldAlert className="w-8 h-8" />
                                <div className="text-left">
                                    <p className="font-bold uppercase tracking-widest text-xs">Security Alert</p>
                                    <p className="text-sm opacity-80">{message}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 p-10 opacity-5 pointer-events-none">
                <ShieldCheck className="w-64 h-64 text-white" />
            </div>
        </main>
    );
}

// Simple AnimatePresence wrap-around if not imported
function AnimatePresence({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
