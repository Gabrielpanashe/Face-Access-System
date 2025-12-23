"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, Fingerprint, ArrowRight, Activity, Zap, Database } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-[#020617] text-slate-200 overflow-y-auto overflow-x-hidden pt-32 pb-20 px-6 sm:px-12 md:px-24">
      {/* Background Architecture */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center gap-20 lg:gap-32"
      >
        <div className="w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-12">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 mb-8">
                <Zap className="w-4 h-4 text-primary" />
                <span className="hud-label !text-primary !text-[9px]">System Ready</span>
              </div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] text-white">
                FACE <br />
                <span className="gradient-text">ACCESS</span>
              </h1>
              <p className="mt-8 text-xl text-slate-400 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Simple and secure access control using fast <span className="text-white font-medium">Face Recognition</span> technology.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-12 opacity-30">
              <div className="flex flex-col gap-1">
                <span className="hud-label text-[8px]">Security</span>
                <span className="text-sm font-black text-white">Encrypted</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
              <div className="flex flex-col gap-1">
                <span className="hud-label text-[8px]">Speed</span>
                <span className="text-sm font-black text-white">Instant</span>
              </div>
            </motion.div>
          </div>

          {/* Action Cards Container */}
          <div className="flex-1 w-full max-w-2xl flex flex-col gap-8 mt-12 lg:mt-0">
            <Link href="/enroll" className="group">
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="glass-morphism p-1 rounded-[2.5rem] border-white/5 group-hover:border-accent/30 transition-all duration-500 overflow-hidden"
              >
                <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent transition-all duration-500">
                    <UserPlus className="w-10 h-10 text-accent group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <span className="hud-label text-accent/40 block mb-1">New User?</span>
                    <h3 className="text-3xl font-black text-white group-hover:text-accent transition-colors uppercase tracking-tight">Register Face</h3>
                    <p className="text-slate-500 text-sm mt-1">Add a new person to the system.</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all hidden md:flex">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/verify" className="group">
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="glass-morphism p-1 rounded-[2.5rem] border-white/5 group-hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-500">
                    <Fingerprint className="w-10 h-10 text-primary group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <span className="hud-label text-primary/40 block mb-1">Check Access</span>
                    <h3 className="text-3xl font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">Verify Face</h3>
                    <p className="text-slate-500 text-sm mt-1">Scan your face to enter.</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all hidden md:flex">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Global Stats Footer */}
        <motion.div variants={itemVariants} className="w-full pt-16 border-t border-white/5 flex flex-wrap justify-between items-center gap-12">
          <div className="flex flex-wrap gap-12 sm:gap-20">
            <Stat icon={<Activity className="w-5 h-5" />} label="Status" value="Online" />
            <Stat icon={<Database className="w-5 h-5" />} label="Database" value="Connected" />
          </div>

          <div className="flex items-center gap-8">
            <div className="hud-label text-[10px] opacity-20">System Secure</div>
            <Link href="/admin">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="mt-1 text-slate-600 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]"><Zap className="w-5 h-5" /></div>
                <div className="flex flex-col gap-1">
                  <span className="hud-label text-slate-600 text-[9px] tracking-[0.4em]">Internal</span>
                  <span className="text-sm font-black text-white tracking-widest group-hover:text-cyan-300 transition-colors">ADMIN</span>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>      </motion.div>
    </main>
  );
}
