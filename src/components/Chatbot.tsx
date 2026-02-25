"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Bot, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
        { role: 'ai', text: 'Hello! I am Soil Guard, your AI agricultural expert. I can communicate in any language and assist you with anything from soil health, crop yields, to the meaning of life. How can I help? (नमस्ते / வணக்கம் / నమస్కారం / নমস্কার)' }
    ]);
    const [input, setInput] = useState("");
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const languages = ["English", "Hindi (हिंदी)", "Bengali (বাংলা)", "Tamil (தமிழ்)", "Telugu (తెలుగు)", "Marathi (मराठी)"];

    const handleSend = () => {
        if (!input.trim()) return;
        const userInput = input;
        setMessages(prev => [...prev, { role: 'user', text: input }]);
        setInput("");

        // Simulate smart generic AI response
        setTimeout(() => {
            let reply = "";
            const lowerInput = userInput.toLowerCase();

            if (lowerInput.includes('weather') || lowerInput.includes('rain')) {
                reply = "Looking at the forecast, there's a 40% chance of rain in your region tomorrow. Good for your newly planted seeds!";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                reply = selectedLanguage === "Hindi (हिंदी)" ? "नमस्ते! मैं सॉइल गार्ड हूँ।" : "Hello there! Soil Guard at your service.";
            } else if (lowerInput.includes('joke')) {
                reply = "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾";
            } else if (lowerInput.includes('meaning of life') || lowerInput.includes('who are you')) {
                reply = "I am Soil Guard, an AI built to revolutionize farming! I exist to make sure your soil thrives, but I enjoy a good philosophical chat too.";
            } else if (selectedLanguage !== "English") {
                reply = `(Translating analysis to ${selectedLanguage}) Based on your query, Soil Guard suggests maintaining a pH level of 6.5 for optimal nutrient absorption. Let me know if you need specific fertilizer recommendations.`;
            } else {
                reply = "That's an interesting point! While my specialty is NPK levels and soil moisture, my AI engine can process multi-disciplinary knowledge. What else would you like to discuss?";
            }

            setMessages(prev => [...prev, { role: 'ai', text: reply }]);
        }, 1000);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

                {/* Chat Window */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-[360px] max-w-[calc(100vw-48px)] h-[550px] max-h-[70vh] flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <img src="/logo.png" alt="SoilGuard" className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Soil Guard AI</h3>
                                        <div className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                                            <p className="text-xs text-green-100">Online | Smart Agriculture Expert</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Language Selector */}
                            <div className="relative border-b border-slate-100 shrink-0">
                                <button
                                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                                    className="flex items-center justify-between w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-3 h-3 text-green-500" />
                                        Language: {selectedLanguage}
                                    </div>
                                    <ChevronDown className={`w-3 h-3 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {languageMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 w-full bg-white border border-slate-100 shadow-xl z-20 flex flex-col py-1"
                                        >
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => { setSelectedLanguage(lang); setLanguageMenuOpen(false); }}
                                                    className="px-4 py-2 text-xs text-left text-slate-600 hover:bg-green-50 hover:text-green-700 w-full transition-colors flex items-center justify-between"
                                                >
                                                    {lang}
                                                    {selectedLanguage === lang && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3.5 text-sm ${msg.role === 'user'
                                                ? 'bg-slate-900 text-white rounded-2xl rounded-br-sm shadow-md'
                                                : 'bg-white border-slate-200 border text-slate-800 rounded-2xl rounded-bl-sm shadow-sm'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-t border-slate-200 bg-white shrink-0">
                                <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-full overflow-hidden focus-within:ring-2 ring-green-500/50 focus-within:bg-white transition-all shadow-sm">
                                    <input
                                        type="text"
                                        placeholder="Ask about crops, NPK, fertilizer, life..."
                                        className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none text-slate-800 placeholder-slate-400"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                                    />
                                    <button
                                        disabled={!input.trim()}
                                        onClick={handleSend}
                                        className={`p-2.5 mr-1 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-green-500 text-white shadow-md hover:scale-105' : 'bg-transparent text-slate-300'
                                            }`}
                                    >
                                        <Send className="w-4 h-4 ml-0.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 hover:bg-green-500 text-white p-4 justify-center items-center shadow-2xl rounded-full flex z-50 transition-colors relative"
                >
                    {isOpen ? <X className="w-7 h-7" /> : <Bot className="w-7 h-7" />}

                    {/* Sparkles decoration for AI */}
                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 text-base drop-shadow-md">✨</span>
                    )}
                </motion.button>
            </div>
        </>
    );
}
