"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCcw, ShieldCheck, AlertCircle } from 'lucide-react';
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
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-video bg-black">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover mirror"
                    style={{ transform: 'scaleX(-1)' }}
                />

                {/* Overlay scanning effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/40 animate-scan shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

                    {/* Face Guide Frame */}
                    <div className="absolute inset-x-1/4 inset-y-1/6 border-2 border-dashed border-white/30 rounded-[3rem] animate-pulse" />
                </div>

                {/* Status Overlays */}
                <AnimatePresence>
                    {status === 'processing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                <RefreshCcw className="w-12 h-12 animate-spin mb-4 text-primary" />
                                <p className="text-lg font-medium tracking-wide">Analysing Biometrics...</p>
                            </div>
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                <ShieldCheck className="w-16 h-16 mb-4 text-green-400" />
                                <p className="text-xl font-bold uppercase tracking-widest">Access Granted</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-6 text-white">
                        <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
                        <p className="text-lg font-medium">{error}</p>
                        <button
                            onClick={startCamera}
                            className="mt-4 px-6 py-2 bg-primary rounded-full hover:bg-primary/80 transition-all font-semibold"
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>

            {/* Control Panel */}
            <div className="mt-8 flex justify-center gap-6">
                <button
                    onClick={captureFrame}
                    disabled={status === 'processing'}
                    className="group relative flex items-center justify-center p-6 rounded-full bg-white text-black shadow-xl hover:scale-110 transition-all disabled:opacity-50 disabled:scale-100"
                >
                    <Camera className="w-8 h-8" />
                    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                        Identify Now
                    </span>
                </button>
            </div>

            {/* Hidden Canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />

            {message && (
                <p className={`mt-4 text-center text-sm font-medium ${status === 'error' ? 'text-red-400' : 'text-primary/80'}`}>
                    {message}
                </p>
            )}

            <style jsx>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default CameraCapture;
