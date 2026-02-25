"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle, CreditCard, Lock, ShieldCheck, QrCode } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("upi"); // or 'card'

    const handlePay = () => {
        if (!mounted || cart.length === 0) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
            clearCart();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">

            {/* Header */}
            <header className="bg-white border-b border-slate-100 py-6">
                <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img src="/logo.png" alt="SoilGuard" className="w-16 h-16 group-hover:scale-105 transition-transform" />
                        <span className="text-3xl font-bold tracking-tight">SoilGuard</span>
                    </Link>
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <Lock className="w-4 h-4" /> Secure Checkout
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 lg:px-12 py-12 max-w-5xl">
                <AnimatePresence mode="wait">

                    {/* Checkout Form */}
                    {step === 1 && (
                        <motion.div
                            key="checkout"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                        >
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm shadow-sm">1</span>
                                        Shipping Information
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 focus:bg-white transition-colors" defaultValue="Rakesh" />
                                        <input type="text" placeholder="Last Name" className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 focus:bg-white transition-colors" defaultValue="Sharma" />
                                        <input type="email" placeholder="Email Address" className="col-span-2 border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 focus:bg-white transition-colors" defaultValue="rakesh.farming@gmail.com" />
                                        <input type="text" placeholder="Mobile Number (+91)" className="col-span-2 border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 focus:bg-white transition-colors" defaultValue="9876543210" />
                                        <input type="text" placeholder="Address" className="col-span-2 border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 focus:bg-white transition-colors" defaultValue="House No 42, Kisaan Marg" />
                                        <input type="text" placeholder="City" className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 focus:bg-white transition-colors" defaultValue="Ludhiana" />

                                        <select className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 focus:bg-white transition-colors appearance-none">
                                            <option>Punjab</option>
                                            <option>Haryana</option>
                                            <option>Uttar Pradesh</option>
                                            <option>Maharashtra</option>
                                            <option>Gujarat</option>
                                            <option>Madhya Pradesh</option>
                                            <option>Karnataka</option>
                                        </select>

                                        <input type="text" placeholder="PIN Code" className="col-span-2 md:col-span-1 border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 focus:bg-white transition-colors" defaultValue="141001" />
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                <div>
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm shadow-sm">2</span>
                                        Payment Method
                                    </h2>

                                    <div className="flex gap-4 mb-6">
                                        <button
                                            onClick={() => setPaymentMethod('upi')}
                                            className={`flex-1 py-4 border rounded-xl font-bold flex flex-col items-center gap-2 transition-all ${paymentMethod === 'upi' ? 'border-green-500 bg-green-50 text-green-700 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-white'}`}
                                        >
                                            <QrCode className="w-6 h-6" /> UPI / QR Code
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod('card')}
                                            className={`flex-1 py-4 border rounded-xl font-bold flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-green-500 bg-green-50 text-green-700 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-white'}`}
                                        >
                                            <CreditCard className="w-6 h-6" /> Cards / RuPay
                                        </button>
                                    </div>

                                    {paymentMethod === 'card' && (
                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative">
                                            <div className="space-y-4">
                                                <input type="text" placeholder="Card Number (RuPay/Visa/MasterCard)" className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none font-mono focus:ring-2 ring-green-500/50" defaultValue="**** **** **** 4242" />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input type="text" placeholder="MM/YY" className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none font-mono focus:ring-2 ring-green-500/50" defaultValue="12/26" />
                                                    <input type="text" placeholder="CVV" className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none font-mono focus:ring-2 ring-green-500/50" defaultValue="***" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                                            <div className="w-32 h-32 mx-auto bg-white border border-slate-200 rounded-xl mb-4 flex items-center justify-center">
                                                <QrCode className="w-20 h-20 text-slate-400" />
                                            </div>
                                            <p className="font-bold text-slate-800 mb-2">Scan with any UPI App</p>
                                            <p className="text-sm text-slate-500 mb-4">PhonePe, Google Pay, Paytm, BHIM</p>
                                            <div className="relative max-w-xs mx-auto">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">UPI ID</span>
                                                <input type="text" placeholder="Enter UPI ID" className="border border-slate-300 rounded-xl py-3 w-full focus:outline-none focus:ring-2 ring-green-500/50 pl-20 pr-4 bg-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handlePay}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-3 mt-4"
                                >
                                    {loading ? <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span> : <>Pay ₹{mounted ? cartTotal : 499} <ArrowLeft className="w-5 h-5 rotate-180" /></>}
                                </button>
                                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                                    <ShieldCheck className="w-4 h-4 text-green-500" /> 100% Secure & encrypted by Razorpay
                                </div>
                            </div>

                            {/* Order Summary Summary */}
                            <div className="lg:col-span-5 relative">
                                <div className="sticky top-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                    <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                                    {!mounted || cart.length === 0 ? (
                                        <div className="text-center py-10 font-medium text-slate-500">Your cart is empty.</div>
                                    ) : (
                                        <>
                                            <div className="max-h-[300px] overflow-y-auto pr-2">
                                                {cart.map(item => (
                                                    <div key={item.id} className="flex items-center gap-6 mb-6">
                                                        <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                                                            <img src={item.img || "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=600&auto=format&fit=crop"} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-800 line-clamp-2">{item.name}</h4>
                                                            <p className="text-slate-500 text-sm mt-1">Qty: {item.quantity}</p>
                                                            <p className="font-bold text-lg mt-2">₹{item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <hr className="border-slate-200 mb-6 mt-2" />

                                            <div className="space-y-3 text-slate-600 mb-6 font-medium">
                                                <div className="flex justify-between"><span>Subtotal (Excl. GST)</span><span>₹{(cartTotal * 0.82).toFixed(2)}</span></div>
                                                <div className="flex justify-between"><span>GST @ 18%</span><span>₹{(cartTotal * 0.18).toFixed(2)}</span></div>
                                                <div className="flex justify-between"><span>Shipping (Pan India)</span><span className="text-green-600 font-bold">FREE</span></div>
                                            </div>

                                            <hr className="border-slate-200 mb-6" />

                                            <div className="flex justify-between text-3xl font-black text-slate-900 mb-8">
                                                <span>Total</span>
                                                <span>₹{cartTotal}</span>
                                            </div>
                                        </>
                                    )}

                                    <div className="bg-green-50 text-green-800 p-4 rounded-xl flex gap-3 items-start border border-green-100">
                                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium">Includes 30-day money back guarantee and 1-year hardware warranty across India.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Success Screen */}
                    {step === 2 && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                            className="flex flex-col items-center justify-center bg-white p-16 rounded-[3rem] shadow-sm max-w-2xl mx-auto text-center border border-slate-100 mt-10"
                        >
                            <div className="w-24 h-24 bg-green-50 text-green-500 border border-green-100 rounded-full flex items-center justify-center mb-8 shadow-sm">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                >
                                    <CheckCircle className="w-12 h-12" />
                                </motion.div>
                            </div>
                            <h2 className="text-4xl font-black mb-4">Order Confirmed!</h2>
                            <p className="text-lg text-slate-600 mb-8">
                                Your SoilGuard Bio Soil Kit is on its way. Expect delivery via Delhivery in 3-5 business days. We&apos;ve sent the receipt to rakesh.farming@gmail.com and WhatsApp +91 9876543210.
                            </p>

                            <div className="bg-slate-50 w-full p-6 rounded-2xl mb-10 border border-slate-200 shadow-sm flex items-center justify-between">
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-800 mb-1">Order #SG-9824-IND</h4>
                                    <p className="text-sm text-slate-500">Placed on Oct 24</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">Processing</span>
                                </div>
                            </div>

                            <div className="flex gap-4 w-full">
                                <Link href="/dashboard" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-full transition-colors w-full shadow-lg">Go to Dashboard</Link>
                                <Link href="/" className="bg-white hover:bg-slate-50 text-slate-800 font-bold py-4 px-8 rounded-full transition-colors w-full border border-slate-200">Back Home</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
