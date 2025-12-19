"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, UserPlus, Fingerprint, Lock, Cpu, Globe, ArrowRight, Activity, Zap, Server, Database } from 'lucide-react';

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
      <div className="absolute bottom-10 left-10 flex gap-10 hidden lg:flex opacity-20">
        <div className="flex flex-col gap-1">
          <span className="hud-label">DATABASE</span>
          <span className="text-[10px] font-mono">CONNECTED</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="hud-label">ENCRYPTION</span>
          <span className="text-[10px] font-mono">ECC_P384</span>
        </div>
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
        <div className="hero-glow opacity-60" />
        <div className="neural-bg" />

        {/* Cinematic Particles (Simulated with div) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.2, 0],
                x: [0, (i % 2 === 0 ? 50 : -50), 0]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 2
              }}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`
              }}
            />
          ))}
        </div>
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
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
                <Zap className="w-3.5 h-3.5 text-primary fill-primary/20" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">Zero-Trust Protocol</span>
              </div>
              <h1 className="text-6xl md:text-[90px] font-black tracking-tighter mb-8 leading-[0.85] text-white">
                RE-DEFINE <br />
                <span className="gradient-text">ACCESSIBILITY</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-xl font-light leading-relaxed mb-12 tracking-tight">
                Military-grade biometric authentication powered by <span className="text-white font-semibold">Deep Neural Networks</span> and <span className="text-white font-semibold">Real-time Spectral Analysis</span>.
              </p>

              <div className="flex flex-wrap gap-10 mt-12 opacity-50">
                <div className="flex items-center gap-3">
                  <Server className="w-4 h-4" />
                  <span className="hud-label tracking-widest text-[9px]">Edge Computing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4" />
                  <span className="hud-label tracking-widest text-[9px]">Encrypted Vault</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Cards Container */}
          <div className="flex-1 w-full grid gap-8">
            <Link href="/verify" className="group">
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="btn-shimmer p-1 bg-gradient-to-r from-primary/20 to-transparent rounded-[32px] transition-all"
              >
                <div className="bg-[#030712] p-10 rounded-[30px] flex items-center gap-8 border border-white/5 group-hover:border-primary/30 transition-all">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-500 shadow-[0_0_40px_rgba(56,189,248,0)] group-hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]">
                    <Fingerprint className="w-10 h-10 text-primary group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-white group-hover:text-primary transition-colors">Start Scan</h3>
                    <p className="text-slate-400 text-sm font-light mt-2">Initialize neural gateway session</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                </div>
              </motion.div>
            </Link>

            <Link href="/enroll" className="group">
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="btn-shimmer p-1 bg-gradient-to-r from-accent/20 to-transparent rounded-[32px] transition-all"
              >
                <div className="bg-[#030712] p-10 rounded-[30px] flex items-center gap-8 border border-white/5 group-hover:border-accent/30 transition-all">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent transition-all duration-500 shadow-[0_0_40px_rgba(129,140,248,0)] group-hover:shadow-[0_0_40px_rgba(129,140,248,0.3)]">
                    <UserPlus className="w-10 h-10 text-accent group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-white group-hover:text-accent transition-colors">Setup Identity</h3>
                    <p className="text-slate-400 text-sm font-light mt-2">Register biometric template</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* System Dashboard Footer */}
        <motion.div variants={itemVariants} className="mt-32 pt-12 border-t border-white/5 flex flex-wrap justify-between items-end gap-10">
          <div className="flex gap-16">
            <div className="flex flex-col gap-2">
              <StatLabel label="Model" />
              <span className="text-lg font-bold text-white tracking-widest">NEURAL_CORE_V4</span>
            </div>
            <div className="flex flex-col gap-2">
              <StatLabel label="Status" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-lg font-bold text-white tracking-widest">OPERATIONAL</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <Badge icon={<Shield className="w-3 h-3" />} text="FIPS-140-3" />
            <Badge icon={<Globe className="w-3 h-3" />} text="GDPR_COMPLIANT" />
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

function StatLabel({ label }: { label: string }) {
  return <span className="hud-label text-slate-600 tracking-[0.5em]">{label}</span>;
}

function Badge({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-lg bg-white/[0.02] text-[10px] font-bold text-slate-500 tracking-widest">
      {icon}
      {text}
    </div>
  );
}
