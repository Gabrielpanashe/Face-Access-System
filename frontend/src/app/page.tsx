"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, UserPlus, Fingerprint, Lock, Cpu, Globe, ArrowRight, Zap, Activity } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#020617] overflow-hidden">
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="hero-glow opacity-50" />
        <div className="neural-bg" />

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl w-full text-center"
      >
        {/* Top Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-morphism border border-white/10 bg-white/5">
            <div className="relative">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <div className="absolute inset-0 text-primary blur-sm animate-pulse">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/90">Neural Gate V2.0 Active</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-7xl md:text-[110px] font-black tracking-tighter mb-8 leading-[0.9] text-white">
            SDR <span className="gradient-text">Biometrics</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-16 tracking-tight">
            Next-generation access control utilizing <span className="text-white font-medium">convolutional neural networks</span> for zero-trust identity verification.
          </p>
        </motion.div>

        {/* Action Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 px-4">
          <Link href="/verify" className="group">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -8 }}
              className="relative"
            >
              <div className="p-12 glass-card h-full text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <Fingerprint className="w-48 h-48" />
                </div>

                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[0_0_20px_rgba(56,189,248,0)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]">
                  <Lock className="w-8 h-8 text-primary group-hover:text-slate-950 transition-colors" />
                </div>

                <h3 className="text-4xl font-black mb-6 tracking-tight text-white group-hover:text-primary transition-colors">Start Session</h3>
                <p className="text-slate-400 font-light mb-10 text-xl leading-relaxed">
                  Initiate biometric scan with multi-factor liveness detection and identity mapping.
                </p>

                <div className="flex items-center gap-3 text-primary font-black tracking-[0.2em] uppercase text-xs">
                  <span>Execute Entry Protocol</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          <Link href="/enroll" className="group">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -8 }}
              className="relative"
            >
              <div className="p-12 glass-card h-full text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity text-accent">
                  <UserPlus className="w-48 h-48" />
                </div>

                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-10 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-500 shadow-[0_0_20px_rgba(129,140,248,0)] group-hover:shadow-[0_0_30px_rgba(129,140,248,0.4)]">
                  <UserPlus className="w-8 h-8 text-accent group-hover:text-slate-950 transition-colors" />
                </div>

                <h3 className="text-4xl font-black mb-6 tracking-tight text-white group-hover:text-accent transition-colors">Register Profile</h3>
                <p className="text-slate-400 font-light mb-10 text-xl leading-relaxed">
                  Encode new identity templates into the high-security encrypted biometric vault.
                </p>

                <div className="flex items-center gap-3 text-accent font-black tracking-[0.2em] uppercase text-xs">
                  <span>Initialize Enrollment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* System Stats Footer */}
        <motion.div variants={itemVariants} className="pt-12 border-t border-white/5">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <Stat icon={<Shield className="w-5 h-5" />} label="Security" value="AES-256" />
            <Stat icon={<Zap className="w-5 h-5" />} label="Latency" value="< 30ms" />
            <Stat icon={<Cpu className="w-5 h-5" />} label="Model" value="Vision v4.2" />
            <Stat icon={<Globe className="w-5 h-5" />} label="Node" value="Secure-Edge" />
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-slate-500 opacity-50">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-600">{label}</span>
        <span className="text-sm font-bold text-white tracking-tight">{value}</span>
      </div>
    </div>
  );
}
