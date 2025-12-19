"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, UserPlus, Fingerprint, Lock, Cpu, Globe } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#050505] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="hero-glow" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative z-10 max-w-5xl w-full text-center">
        {/* Header Section */}
        <motion.div variants={itemVariants}>
          <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 bg-white/5">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/80">Neural Biometric Protocol</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-tight">
            Advanced Face Access
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Securing access through decentralized identity verification with multi-layer liveness detection and spectral analysis.
          </p>
        </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 px-4 md:px-0">
          <Link href="/verify" className="group">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-10 glass-morphism relative overflow-hidden h-full text-left">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
                <Shield className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 border border-primary/30 group-hover:bg-primary transition-colors">
                <Fingerprint className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Biometric Entry</h3>
              <p className="text-white/40 font-light mb-8 text-lg">
                Initiate lightning-fast identity verification using real-time CNN processing.
              </p>
              <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                <span>Access Protocol</span>
                <span className="w-8 h-[1px] bg-primary group-hover:w-16 transition-all" />
              </div>
              </div>
            </motion.div>
          </Link>

          <Link href="/enroll" className="group">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-10 glass-morphism relative overflow-hidden h-full text-left">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
                <UserPlus className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-8 border border-accent/30 group-hover:bg-accent transition-colors">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Identity Setup</h3>
              <p className="text-white/40 font-light mb-8 text-lg">
                Securely enroll new biometric profiles into the encrypted neural database.
              </p>
              <div className="flex items-center gap-2 text-accent font-bold tracking-widest uppercase text-xs">
                <span>Registration</span>
                <span className="w-8 h-[1px] bg-accent group-hover:w-16 transition-all" />
              </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Footer Features */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5">
            <Feature icon={<Shield className="w-4 h-4" />} title="Anti-Spoofing" />
            <Feature icon={<Lock className="w-4 h-4" />} title="Encrypted" />
            <Feature icon={<Cpu className="w-4 h-4" />} title="AI-Driven" />
            <Feature icon={<Globe className="w-4 h-4" />} title="Global Edge" />
          </div>
        </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest">
      {icon}
      <span>{title}</span>
    </div>
  );
}
