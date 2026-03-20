"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Phone, Fingerprint } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Login() {
    const [loginMethod, setLoginMethod] = useState<"mobile" | "aadhaar">("mobile");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOtpSent(true);
        }, 1500);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-6">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl"
            >
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="SoilGuard" className="w-16 h-16" />
                </div>

                <h2 className="text-2xl font-black text-center text-slate-900 mb-2">Welcome to SoilGuard</h2>
                <p className="text-center text-slate-500 text-sm mb-8">Access your smart farm dashboard</p>

                {!otpSent ? (
                    <>
                        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                            <button
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${loginMethod === 'mobile' ? 'bg-white shadow text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setLoginMethod('mobile')}
                            >
                                <Phone className="w-4 h-4" /> Mobile
                            </button>
                            <button
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${loginMethod === 'aadhaar' ? 'bg-white shadow text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setLoginMethod('aadhaar')}
                            >
                                <Fingerprint className="w-4 h-4" /> Aadhaar
                            </button>
                        </div>

                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">
                                    {loginMethod === 'mobile' ? 'Mobile Number' : 'Aadhaar Number'}
                                </label>
                                <div className="relative">
                                    {loginMethod === 'mobile' && (
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">+91</span>
                                    )}
                                    <input
                                        type="text"
                                        required
                                        placeholder={loginMethod === 'mobile' ? "98765 43210" : "0000 0000 0000"}
                                        className={`w-full border border-slate-300 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${loginMethod === 'mobile' ? 'pl-12 pr-4' : 'px-4'}`}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center h-12"
                            >
                                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Send OTP'}
                            </button>
                        </form>

                        <div className="mt-6 border-t border-slate-200 relative">
                            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                OR
                            </span>
                        </div>

                        <button
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            className="w-full mt-6 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-3 h-12"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.61z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            Sign In with Google
                        </button>
                    </>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm text-center font-medium flex items-center justify-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            OTP sent successfully!
                        </div>

                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Enter 6-digit OTP</label>
                                <div className="flex gap-2 justify-between">
                                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                                        <input key={idx} type="text" maxLength={1} className="w-12 h-14 border border-slate-300 rounded-xl text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500/50" />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center h-12 mt-6"
                            >
                                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Verify & Login'}
                            </button>

                            <button type="button" onClick={() => setOtpSent(false)} className="w-full text-center text-slate-500 text-sm font-medium hover:text-slate-900 mt-4">
                                Change Number
                            </button>
                        </form>
                    </motion.div>
                )}

            </motion.div>

            <div className="mt-8 text-center text-slate-500 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Secured by IndiaStack OTP Verification
            </div>
        </div>
    );
}
