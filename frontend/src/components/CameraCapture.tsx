"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, ShieldCheck, AlertCircle, Activity, Target, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraCaptureProps {
    onCapture: (image: string) => void;
    status?: 'idle' | 'processing' | 'success' | 'error';
    message?: string;
    captureInterval?: number; // milliseconds between automated captures
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, status = 'idle', message, captureInterval = 1000 }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Auto-capture states
    const [autoCapture, setAutoCapture] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const [captureCount, setCaptureCount] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [pauseSecondsLeft, setPauseSecondsLeft] = useState(0);
    const pauseTimerRef = useRef<number | null>(null);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    const startCamera = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 1280, height: 720 },
                audio: false
            });
            setStream(mediaStream);
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
            setError(null);
        } catch (err) {
            setError("Camera access denied.");
        }
    }, []);

    useEffect(() => {
        startCamera();
        return () => stopAutoCapture();
    }, [startCamera]);

    const captureFrameInternal = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                onCapture(canvasRef.current.toDataURL('image/jpeg', 0.85));
                setCaptureCount(prev => prev + 1);
            }
        }
    };

    const startAutoCapture = () => {
        if (isPaused || intervalRef.current) return;
        setAutoCapture(true);
        intervalRef.current = window.setInterval(() => {
            // Check if backend is still processing previous frame
            if (status === 'processing') return;

            setCaptureCount(prev => {
                if (prev + 1 >= 50) {
                    schedulePause(5);
                    stopAutoCapture();
                    return 50;
                }
                return prev + 1;
            });
            captureFrameInternal();
        }, captureInterval) as unknown as number;
    };

    const stopAutoCapture = () => {
        setAutoCapture(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const schedulePause = (seconds: number) => {
        setIsPaused(true);
        setPauseSecondsLeft(seconds);
        pauseTimerRef.current = window.setInterval(() => {
            setPauseSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(pauseTimerRef.current!);
                    setIsPaused(false);
                    setCaptureCount(0);
                    if (autoCapture) startAutoCapture();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000) as unknown as number;
    };

    const onManualReset = () => {
        setCaptureCount(0);
        setIsPaused(false);
        stopAutoCapture();
    };

    return (
        <div className="relative w-full aspect-video bg-black rounded-[3rem] overflow-hidden group">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover grayscale-[0.1] contrast-[1.1]"
                style={{ transform: 'scaleX(-1)' }}
            />

            {/* Scanning UI */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="scanline" />
                <div className="absolute inset-x-[25%] inset-y-[15%] border border-primary/20 rounded-[3rem] flex items-center justify-center">
                    <Target className="w-16 h-16 text-primary/10 animate-pulse" />
                </div>

                {/* Corner Accents */}
                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => autoCapture ? stopAutoCapture() : startAutoCapture()}
                        className={`px-6 py-2 rounded-full font-black text-[10px] tracking-widest uppercase transition-all ${autoCapture ? 'bg-red-500 text-white' : 'bg-primary text-[#020617]'}`}
                    >
                        {autoCapture ? 'Stop_Auto' : 'Start_Auto'}
                    </button>
                    <button onClick={onManualReset} className="px-6 py-2 rounded-full border border-white/20 text-white text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all">
                        Reset
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="hud-label !text-primary">Captured</div>
                        <div className="text-2xl font-black font-mono leading-none">{captureCount}</div>
                    </div>
                    <button
                        onClick={captureFrameInternal}
                        disabled={status === 'processing' || isPaused}
                        className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#020617] hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/20"
                    >
                        <Camera className="w-8 h-8" />
                    </button>
                </div>
            </div>

            {/* Pause Overlay */}
            {isPaused && (
                <div className="absolute inset-0 bg-[#020617]/90 flex flex-col items-center justify-center text-center p-8 z-50">
                    <h3 className="text-3xl font-black mb-2 uppercase">Reposition_Required</h3>
                    <p className="text-slate-400 mb-6">Changing angle for robust biometric encoding... <span className="text-primary font-mono">{pauseSecondsLeft}s</span></p>
                    <button onClick={() => { setIsPaused(false); setCaptureCount(0); if (autoCapture) startAutoCapture(); }} className="btn-primary !px-12">Resume_Now</button>
                </div>
            )}

            {/* Status Overlays */}
            <AnimatePresence>
                {status === 'processing' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md flex flex-col items-center justify-center z-40">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-20 h-20 border-2 border-primary border-t-transparent rounded-full mb-6" />
                        <span className="hud-label !text-primary">{message}</span>
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

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default CameraCapture;
