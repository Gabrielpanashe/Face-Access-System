"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, UserPlus, Fingerprint, Lock, Cpu, Globe, ArrowRight, Activity, Zap, Server, Database } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-8 md:p-24 bg-[#030712] overflow-hidden">
      {/* HUD Background Decorations */}
      <div className="absolute top-10 left-10 hud-label vertical-text hidden lg:block opacity-20">
        SYS_PROCESS: IDLE // SECTOR_7G // NODE_01
      </div>
      <div className="absolute top-10 right-10 hud-label text-right hidden lg:block opacity-20">
        LATENCY: 12MS <br />
        UPTIME: 99.99% <br />
        SEC_LVL: ALPHA
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>

      {/* Premium Background Architecture */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground />
        <div className="hero-glow opacity-60" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Hero Content */}
          <div className="flex-1 text-left">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 mb-10 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                <Zap className="w-4 h-4 text-primary fill-primary/20" />
                <span className="text-[11px] font-black tracking-[0.5em] uppercase text-primary">Neural Protocol v4.0</span>
              </div>
              <h1 className="text-7xl md:text-[100px] font-black tracking-tighter mb-10 leading-[0.8] text-white">
                SDR <br />
                <span className="gradient-text">BIOMETRICS</span>
              </h1>
              <p className="text-2xl text-slate-400 max-w-xl font-light leading-relaxed mb-16 tracking-tight">
                Secure your infrastructure with decentralized identity verification powered by <span className="text-white font-semibold">Deep Vision Neural Networks</span>.
              </p>

              <div className="flex flex-wrap gap-12 mt-12 opacity-40">
                <div className="flex flex-col gap-2">
                  <span className="hud-label tracking-widest text-[10px]">Encryption Standard</span>
                  <div className="flex items-center gap-2 text-white font-mono text-sm">
                    <Lock className="w-3.5 h-3.5" /> FIPS-140-3
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="hud-label tracking-widest text-[10px]">Neural Processing</span>
                  <div className="flex items-center gap-2 text-white font-mono text-sm">
                    <Cpu className="w-3.5 h-3.5" /> EDGE_OPT_V2
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Cards Container */}
          <div className="flex-1 w-full flex flex-col gap-6">
            <Link href="/verify" className="group">
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 15 }}
                className="btn-shimmer p-[1px] bg-gradient-to-r from-primary/40 to-transparent rounded-[32px] transition-all"
              >
                <div className="bg-[#030712]/80 backdrop-blur-md p-10 rounded-[31px] flex items-center gap-8 border border-white/5 group-hover:border-primary/40 transition-all duration-500">
                  <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(56,189,248,0)] group-hover:shadow-[0_0_50px_rgba(56,189,248,0.4)]">
                    <Fingerprint className="w-12 h-12 text-primary group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="hud-label text-primary/60 mb-2 block">Secure Entry</span>
                    <h3 className="text-4xl font-black text-white group-hover:text-primary transition-colors tracking-tighter">Biometric Scan</h3>
                    <p className="text-slate-500 text-sm font-light mt-2">Initialize neural gateway v4.0</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                    <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/enroll" className="group">
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 15 }}
                className="btn-shimmer p-[1px] bg-gradient-to-r from-accent/40 to-transparent rounded-[32px] transition-all"
              >
                <div className="bg-[#030712]/80 backdrop-blur-md p-10 rounded-[31px] flex items-center gap-8 border border-white/5 group-hover:border-accent/40 transition-all duration-500">
                  <div className="w-24 h-24 rounded-3xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent group-hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(129,140,248,0)] group-hover:shadow-[0_0_50px_rgba(129,140,248,0.4)]">
                    <UserPlus className="w-12 h-12 text-accent group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="hud-label text-accent/60 mb-2 block">System Setup</span>
                    <h3 className="text-4xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">Enroll Profile</h3>
                    <p className="text-slate-500 text-sm font-light mt-2">Create new biometric template</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/10 transition-all">
                    <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Global Stats Footer */}
        <motion.div variants={itemVariants} className="mt-32 pt-16 border-t border-white/5 flex flex-wrap justify-between items-center gap-12">
          <div className="flex gap-20">
            <Stat icon={<Activity className="w-5 h-5" />} label="System Load" value="4.2% OPTIMIZED" />
            <Stat icon={<Server className="w-5 h-5" />} label="Node Latency" value="12.4ms GLOBAL" />
            <Stat icon={<Database className="w-5 h-5" />} label="Total Indices" value="2.4M VECTORS" />
          </div>

          <div className="flex items-center gap-6">
            <div className="hud-label opacity-40">Biometric Authority v4.2</div>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-slate-600 group-hover:text-primary transition-colors">{icon}</div>
      <div className="flex flex-col gap-1">
        <span className="hud-label text-slate-600 text-[9px] tracking-[0.4em]">{label}</span>
        <span className="text-sm font-black text-white tracking-widest">{value}</span>
      </div>
    </div>
  );
}
