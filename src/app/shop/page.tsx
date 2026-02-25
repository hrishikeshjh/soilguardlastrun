"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingCart, Leaf, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const products = [
    { id: 1, name: "Vermi compost", weight: "250 g", price: 30, img: "https://5.imimg.com/data5/SELLER/Default/2021/2/CU/UB/ZH/5050723/vermi-compost.jpg" },
    { id: 2, name: "Horn and hoof meal", weight: "100 g", price: 20, img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=400&auto=format&fit=crop" },
    { id: 3, name: "Bone Rust", weight: "100 g", price: 20, img: "https://images.immediate.co.uk/production/volatile/sites/10/2019/04/2048x1365-How-to-plant-a-tree-in-a-pot-LI3554444-3e05a52.jpg?quality=90&fit=700,466" },
    { id: 5, name: "NPK", weight: "250 g", price: 200, img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=400&auto=format&fit=crop" },
    { id: 6, name: "Vegetable based plant food", weight: "500 g", price: 1000, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=400&auto=format&fit=crop" },
    { id: 7, name: "Neem Khali (Neem Cake)", weight: "500 g", price: 60, img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=400&auto=format&fit=crop" },
    { id: 11, name: "Epsom Salt (Magnesium)", weight: "400 g", price: 80, img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=400&auto=format&fit=crop" },
    { id: 12, name: "Perlite", weight: "500 g", price: 150, img: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=400&auto=format&fit=crop" },
    { id: 14, name: "DAP Fertilizer", weight: "250 g", price: 40, img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=400&auto=format&fit=crop" },
    { id: 15, name: "Urea Fertilizer", weight: "500 g", price: 50, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=400&auto=format&fit=crop" },
    { id: 16, name: "Cow Dung Manure", weight: "1 kg", price: 40, img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=400&auto=format&fit=crop" },
    { id: 17, name: "Humic Acid Liquid", weight: "250 ml", price: 120, img: "https://images.unsplash.com/photo-1599839619722-39751411ea53?q=80&w=400&auto=format&fit=crop" },
    { id: 18, name: "Wood Ash", weight: "500 g", price: 60, img: "https://images.unsplash.com/photo-1595801931086-538dc660946d?q=80&w=400&auto=format&fit=crop" },
    { id: 19, name: "Trichoderma Viride", weight: "250 g", price: 100, img: "https://images.unsplash.com/photo-1592982537447-6f2a6a0a4b86?q=80&w=400&auto=format&fit=crop" },
    { id: 20, name: "Pseudomonas Fluorescens", weight: "250 g", price: 110, img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=400&auto=format&fit=crop" },
    { id: 21, name: "Mycorrhiza Powder", weight: "100 g", price: 80, img: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=400&auto=format&fit=crop" }
];

export default function Shop() {
    const { addToCart } = useCart();
    const [addedIds, setAddedIds] = useState<number[]>([]);

    const handleAddToCart = (p: any) => {
        addToCart({ id: p.id, name: p.name, price: p.price, quantity: 1, img: p.img });
        setAddedIds(prev => [...prev, p.id]);
        setTimeout(() => {
            setAddedIds(prev => prev.filter(id => id !== p.id));
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 bg-white border-b border-slate-100 shadow-sm relative z-10">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
                    >
                        SoilGuard <span className="text-green-600">Store</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light"
                    >
                        Premium organic fertilizers, meals, and soil regeneration essentials formulated to maximize your crop yield.
                    </motion.p>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12">

                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <Leaf className="w-8 h-8 text-green-500" />
                            Regeneration Supplies
                        </h2>
                        <div className="text-sm font-bold text-green-700 bg-green-100 border border-green-200 px-4 py-2 rounded-full shadow-sm">
                            {products.length} Items Available
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                                className="group border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-slate-300 transition-all duration-500 flex flex-col relative"
                            >
                                {/* Image */}
                                <div className="w-full h-56 bg-white relative overflow-hidden group-hover:bg-slate-50 transition-colors">
                                    <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out mix-blend-multiply" />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-slate-800 shadow-md border border-slate-200">
                                        {p.weight}
                                    </div>
                                    <button onClick={() => handleAddToCart(p)} className="absolute bottom-4 right-4 bg-green-500 text-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10 cursor-pointer hover:bg-green-600 hover:scale-110">
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1 bg-white relative z-20">
                                    <div className="flex items-center gap-1 mb-3">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="text-xs text-slate-400 font-medium ml-1">4.9</span>
                                    </div>

                                    <h3 className="font-bold text-lg text-slate-900 mb-1 leading-tight group-hover:text-green-600 transition-colors">{p.name}</h3>
                                    <div className="text-sm text-slate-500 mb-6 font-medium">{p.weight} Premium Pack</div>

                                    <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Price</span>
                                            <span className="text-3xl font-black text-slate-900">₹{p.price}</span>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(p)}
                                            className="text-sm font-bold text-green-600 hover:text-green-700 hover:underline flex items-center gap-1 group/btn cursor-pointer"
                                        >
                                            {addedIds.includes(p.id) ? "Added!" : "Add to Cart"}
                                            {!addedIds.includes(p.id) && <span className="group-hover/btn:translate-x-1 transition-transform">→</span>}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}
