"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Radar, Map as MapIcon, RefreshCw, ZoomIn, ZoomOut, Zap } from "lucide-react";

export default function DroneAnalysis() {
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setScanning(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-green-500/30 overflow-hidden">

            {/* Top Header */}
            <header className="absolute top-0 w-full z-40 p-6 flex justify-between items-start pointer-events-none">
                <Link href="/" className="pointer-events-auto bg-slate-950/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 border border-slate-800 hover:bg-slate-950 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold text-sm tracking-widest uppercase">Terminate Mission</span>
                </Link>
                <div className="pointer-events-auto bg-slate-950/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-800 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-green-400 font-mono">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        LINK SECURE
                    </div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="text-sm font-mono tracking-widest text-slate-400">ALT: 120M</div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="text-sm text-yellow-500 font-mono">BATT 84%</div>
                </div>
            </header>

            {/* Main Map View Backdrop */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1599839619722-39751411ea53?q=80&w=2000&auto=format&fit=crop"
                    alt="Satellite View"
                    className="w-full h-full object-cover opacity-60 grayscale-[30%] scale-105"
                />
                {/* Overlay Grid */}
                <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
            </div>

            {/* HUD Elements */}
            <div className="relative z-10 w-full h-screen flex flex-col justify-end p-8 pointer-events-none">

                {/* Center Scanner Overlay */}
                {scanning && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-500/30 rounded-full flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute inset-0 rounded-full"
                            style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(34, 197, 94, 0.2) 60deg, rgba(34, 197, 94, 0.8) 90deg, transparent 90deg)" }}
                        />
                        <div className="w-[400px] h-[400px] border border-green-500/20 rounded-full"></div>
                        <div className="absolute w-[200px] h-[200px] border border-green-500/40 rounded-full"></div>
                        <div className="absolute w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                )}

                {/* Data Panels (Bottom) */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 pointer-events-auto">

                    {/* Left Panel */}
                    <div className="md:col-span-4 lg:col-span-3 bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center"><MapIcon className="w-4 h-4 text-white" /></div>
                            <h3 className="font-bold uppercase tracking-wider text-sm">Target Sector Alpha</h3>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Ground Status</span>
                                <span className="text-sm font-mono text-green-400 font-bold">OPTIMAL</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Est. Yield</span>
                                <span className="text-sm font-mono text-white font-bold">+14.2%</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Last Rain</span>
                                <span className="text-sm font-mono text-blue-400 font-bold">48H AGO</span>
                            </div>
                        </div>

                        <button onClick={() => setScanning(true)} className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4" /> Re-Scan Area
                        </button>
                    </div>

                    {/* Center Info Panel */}
                    <div className="md:col-span-4 lg:col-span-6 flex flex-col justify-end">
                        <div className="bg-slate-950/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative">
                            {!scanning ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 border border-green-500/30">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-green-400 font-mono text-sm font-bold mb-2 tracking-wider">AI ANALYSIS COMPLETE</h4>
                                        <p className="text-slate-300 text-sm leading-relaxed font-light">
                                            Sensors detected slight Nitrogen deficiency in Sector 4B. Moisture levels uniform across surveyed area. Thermal imaging confirms no pest distress patterns. Proceed with standard fertilizer run 04.
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex items-center gap-4 text-green-400">
                                    <Radar className="w-6 h-6 animate-spin" />
                                    <span className="font-mono text-sm uppercase tracking-widest font-bold animate-pulse">Scanning topography & processing multi-spectral imagery...</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Controls Panel */}
                    <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-end gap-3">
                        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex gap-4">
                            <button className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-2xl h-16 flex items-center justify-center"><ZoomIn className="w-6 h-6" /></button>
                            <button className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-2xl h-16 flex items-center justify-center"><ZoomOut className="w-6 h-6" /></button>
                        </div>
                        <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold h-16 rounded-3xl shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-colors tracking-widest uppercase">
                            Deploy Drones
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}
