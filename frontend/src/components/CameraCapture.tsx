"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCcw, ShieldCheck, AlertCircle, Scan } from 'lucide-react';
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
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Camera Preview Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] aspect-video bg-slate-900 group">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                    style={{ transform: 'scaleX(-1)' }}
                />

                {/* Cyberpunk UI Overlays */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Corners */}
                    <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
                    <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
                    <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

                    {/* Scanning Line */}
                    <div className="scanline" />

                    {/* Face Guide Frame */}
                    <div className="absolute inset-x-[25%] inset-y-[15%] border border-primary/20 rounded-[3rem] bg-primary/5 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="w-full h-full relative">
                            <Scan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-primary/10 animate-pulse" />
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="absolute bottom-6 left-10 flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-primary/60 font-mono uppercase tracking-[0.2em]">Neural Feed</span>
                            <span className="text-[10px] text-white font-mono uppercase">720P / 30FPS</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-primary/60 font-mono uppercase tracking-[0.2em]">Status</span>
                            <span className="text-[10px] text-green-400 font-mono uppercase">Live Connection</span>
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
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center text-white"
                        >
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                                <RefreshCcw className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary" />
                            </div>
                            <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-primary">Analysing Biometrics</p>
                            <div className="mt-2 text-[10px] text-white/40 font-mono">ENCRYPTING TEMPLATE...</div>
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex flex-col items-center justify-center text-white"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-10 h-10 text-green-400" />
                            </div>
                            <p className="text-xl font-black uppercase tracking-widest text-glow">Identity Confirmed</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-center p-6 text-white">
                        <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
                        <p className="text-lg font-medium">{error}</p>
                        <button
                            onClick={startCamera}
                            className="mt-6 px-8 py-3 bg-primary text-slate-950 rounded-full hover:bg-white transition-all font-bold uppercase text-xs tracking-widest"
                        >
                            Restore Feed
                        </button>
                    </div>
                )}
            </div>

            {/* Control Panel */}
            <div className="mt-10 flex flex-col items-center">
                <button
                    onClick={captureFrame}
                    disabled={status === 'processing'}
                    className="relative px-12 py-5 rounded-full bg-primary text-slate-950 font-black uppercase tracking-[0.2em] text-sm overflow-hidden group/btn transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <Camera className="w-5 h-5" />
                        Capture Biometrics
                    </span>
                    <div className="absolute inset-0 bg-white scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
                </button>

                {message && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 text-xs font-bold uppercase tracking-[0.2em] ${status === 'error' ? 'text-red-400' : 'text-primary/60'}`}
                    >
                        {message}
                    </motion.p>
                )}
            </div>

            {/* Hidden Canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default CameraCapture;
