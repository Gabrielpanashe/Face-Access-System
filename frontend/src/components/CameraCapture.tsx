"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCcw, ShieldCheck, AlertCircle, Scan, Activity, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraCaptureProps {
    onCapture: (image: string) => void;
    status?: 'idle' | 'processing' | 'success' | 'error';
    message?: string;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, status = 'idle', message }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [randomSignals, setRandomSignals] = useState<string[]>([]);

    // Simulate real-time data signals
    useEffect(() => {
        const interval = setInterval(() => {
            const signals = [
                `X: ${Math.floor(Math.random() * 1000)}`,
                `Y: ${Math.floor(Math.random() * 1000)}`,
                `Z: ${Math.floor(Math.random() * 100)}`,
                `VEC: ${(Math.random() * 10).toFixed(4)}`,
                `PITCH: ${Math.floor(Math.random() * 30)}°`
            ];
            setRandomSignals(signals);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    const startCamera = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setError(null);
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Camera access denied. Please enable permissions.");
        }
    }, []);

    useEffect(() => {
        startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [startCamera]);

    const captureFrame = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const imageData = canvasRef.current.toDataURL('image/jpeg', 0.82);
                onCapture(imageData);
            }
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto group">
            {/* Outer HUD Rings */}
            <div className="absolute -inset-10 border border-white/[0.03] rounded-full pointer-events-none group-hover:border-primary/5 transition-colors duration-700" />
            <div className="absolute -inset-20 border border-white/[0.01] rounded-full pointer-events-none hidden lg:block" />

            {/* Camera Preview Container */}
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] aspect-video bg-[#010208]">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover grayscale-[0.3] contrast-[1.2] brightness-[0.8]"
                    style={{ transform: 'scaleX(-1)' }}
                />

                {/* Face Mesh Simulation */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" className="text-primary/30" />
                    </svg>
                </div>

                {/* Cyber HUD Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Corner Markers */}
                    <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-xl" />
                    <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-xl" />
                    <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-xl" />
                    <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-xl" />

                    {/* Scanning Line */}
                    <div className="scanline" />

                    {/* Target Reticle */}
                    <div className="absolute inset-x-[30%] inset-y-[20%] border border-primary/10 rounded-[4rem] bg-primary/[0.02] flex items-center justify-center">
                        <div className="relative">
                            <Target className="w-12 h-12 text-primary/20 animate-spin-slow" />
                            <div className="absolute -inset-4 border border-dashed border-primary/20 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Technical Telemetry */}
                    <div className="absolute top-12 left-24 flex flex-col gap-1 hidden md:flex">
                        {randomSignals.map((signal, idx) => (
                            <span key={idx} className="hud-label text-[8px] text-primary/40 tracking-[0.2em] font-mono leading-none">{signal}</span>
                        ))}
                    </div>

                    {/* Feed Info */}
                    <div className="absolute bottom-12 right-12 flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="hud-label text-[9px] text-white/40">SDR_LINK_STABLE</span>
                            <span className="text-[10px] font-mono text-green-500 flex items-center gap-1">
                                <Activity className="w-2.5 h-2.5" /> 128.8 KB/S
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status Overlays */}
                <AnimatePresence>
                    {status === 'processing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl flex flex-col items-center justify-center text-white z-20"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-32 h-32 rounded-full border-2 border-primary/5 border-t-primary shadow-[0_0_40px_rgba(56,189,248,0.2)]"
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                    <Cpu className="w-8 h-8 text-primary animate-pulse" />
                                </div>
                            </div>
                            <h3 className="mt-8 text-xl font-black uppercase tracking-[0.5em] text-white">Analysing Biometrics</h3>
                            <div className="mt-4 flex flex-col items-center gap-2">
                                <div className="hud-label text-primary/60">CONSTRUCTING_FACE_HASH...</div>
                                <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3 }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-green-500/10 backdrop-blur-md flex flex-col items-center justify-center text-white z-30"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
                            >
                                <ShieldCheck className="w-12 h-12 text-green-400" />
                            </motion.div>
                            <p className="text-2xl font-black uppercase tracking-[0.3em] text-glow">Identity Verified</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <div className="absolute inset-0 bg-[#030712] flex flex-col items-center justify-center text-center p-12 text-white z-40">
                        <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6 border border-red-500/40">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <p className="text-xl font-bold mb-8">{error}</p>
                        <button
                            onClick={startCamera}
                            className="px-10 py-4 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-all font-black uppercase text-xs tracking-[0.3em]"
                        >
                            Restore Feed
                        </button>
                    </div>
                )}
            </div>

            {/* Control Panel (Capture Button) */}
            <div className="mt-16 relative flex flex-col items-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-t from-primary/30 to-transparent" />

                <button
                    onClick={captureFrame}
                    disabled={status === 'processing'}
                    className="group/btn relative h-24 w-24 rounded-full border border-primary/30 p-2 overflow-hidden transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                    <div className="absolute inset-0 bg-primary/5 group-hover/btn:bg-primary/20 transition-all" />
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-black relative z-10 transition-transform duration-500 group-hover/btn:rotate-90">
                        <Camera className="w-8 h-8" />
                    </div>
                    {/* Animated Border Ring */}
                    <div className="absolute inset-0 rounded-full border-t-2 border-primary/60 animate-spin-slow opacity-0 group-hover/btn:opacity-100" />
                </button>

                <span className="mt-6 hud-label text-slate-500 group-hover:text-primary transition-colors tracking-[0.5em]">Initiate_Scan</span>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-10 px-6 py-3 rounded-xl border ${status === 'error' ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-primary/20 bg-primary/5 text-primary/80'} text-[10px] font-black uppercase tracking-[0.2em]`}
                    >
                        {message}
                    </motion.div>
                )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 10s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default CameraCapture;
