"use client";

import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Mail,
    Bot,
    Database,
    Zap,
    CheckCircle2,
    ArrowRight,
    Menu,
    X,
    Globe,
    Image as ImageIcon,
    BarChart,
    Loader2
} from 'lucide-react';
import Script from 'next/script';

// --- 1. UTILITY COMPONENTS ---

const ImagePlaceholder = ({ label, height = "h-full", iconScale = 1 }: { label?: string, height?: string, iconScale?: number }) => (
    <div className={`w-full ${height} bg-zinc-50 border border-zinc-200 rounded-3xl flex flex-col items-center justify-center text-zinc-400 gap-4 p-6 transition-all hover:bg-zinc-100 group border-dashed relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center border border-zinc-200 group-hover:scale-110 transition-transform duration-500 shadow-sm z-10`}>
            <ImageIcon className="text-zinc-400" size={32 * iconScale} />
        </div>
        <p className="text-sm font-semibold tracking-wide uppercase z-10 text-zinc-500">{label || "Asset Placeholder"}</p>
    </div>
);

// --- 2. SECTIONS ---

const Navbar = ({ onTalkClick }: { onTalkClick: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-zinc-100' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2.5 cursor-pointer group">
                    <img
                        src="/images/chatpilot-logo.png"
                        alt="ChatPilot"
                        className="w-auto h-8 md:h-10 transition-transform group-hover:scale-105"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                    <span className="text-xl font-bold tracking-tight text-zinc-900">ChatPilot</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {['Product', 'Solutions', 'Pricing', 'Resources'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-zinc-500 hover:text-black transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={onTalkClick}
                        className="bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-zinc-200">
                        Talk to Business
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-900 p-2">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-24 left-0 w-full bg-white border-b border-zinc-100 p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-5 shadow-xl">
                    {['Product', 'Solutions', 'Pricing', 'Resources'].map((item) => (
                        <a key={item} href="#" className="text-xl font-medium text-zinc-800" onClick={() => setIsOpen(false)}>
                            {item}
                        </a>
                    ))}
                    <button
                        onClick={() => { setIsOpen(false); onTalkClick(); }}
                        className="bg-black text-white w-full py-4 rounded-full font-bold text-lg">
                        Talk to Business
                    </button>
                </div>
            )}
        </nav>
    );
};

const Hero = ({ onLetGoClick }: { onLetGoClick: () => void }) => {
    return (
        <section className="relative pt-40 pb-20 overflow-hidden bg-[#FDFDFD]">
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-zinc-50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm mb-10 hover:border-orange-200 transition-colors cursor-pointer group">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider group-hover:text-orange-600 transition-colors">Raised $14.5M Funding — AngelVC</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-orange-500 transition-colors -ml-1" />
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 mb-8 max-w-5xl leading-[1.05]">
                    The Fastest Way To <br />
                    <span className="text-zinc-400">Automate</span> Your Growth.
                </h1>

                <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mb-12 leading-relaxed font-medium">
                    Effortlessly transform customer conversations into revenue.
                    Bulk WhatsApp broadcasting, AI chatbots, and CRM automation.
                </p>

                <button
                    onClick={onLetGoClick}
                    className="bg-[#FF5500] text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-[#E64D00] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20 mb-20 flex items-center gap-2">
                    Let's Go — Start Now
                </button>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-[500px] md:h-[600px] w-full bg-white rounded-[2.5rem] border border-zinc-100 shadow-2xl shadow-zinc-200/50 p-4 overflow-hidden relative">
                        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-zinc-100 z-10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs font-bold text-zinc-800">Agent Active</span>
                        </div>
                        <ImagePlaceholder label="Hero Image (Person/User)" height="h-full" iconScale={1.5} />
                    </div>

                    <div className="h-[500px] md:h-[600px] w-full bg-[#F8F9FA] rounded-[2.5rem] border border-zinc-100 shadow-inner p-4 relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] border border-dashed border-zinc-300 rounded-2xl opacity-50 pointer-events-none"></div>
                        <ImagePlaceholder label="Abstract UI Flow / Dashboard" height="h-full" iconScale={1.5} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Logos = () => {
    const logos = ["Deloitte", "NCR", "monday.com", "NETFLIX", "Dropbox"];
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap justify-between items-center gap-10 md:gap-20 grayscale opacity-80 hover:opacity-100 transition-opacity duration-500">
                    {logos.map((logo, i) => (
                        <h3 key={i} className="text-2xl md:text-3xl font-bold text-black">{logo}</h3>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <div className="mx-auto w-12 h-12 mb-6 text-black">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full animate-spin-slow">
                            <path d="M12 2v20M2 12h20M4.929 4.929l14.142 14.142M4.929 19.071L19.071 4.929" />
                        </svg>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">Transform Your Data Into <br />Actionable Insights</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-[#F5F5F7] rounded-[2rem] p-10 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-4 bg-white rounded-2xl shadow-sm">
                                <MessageSquare className="w-8 h-8 text-green-600" />
                            </div>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-zinc-600 border border-zinc-100">Most Popular</span>
                        </div>
                        <h3 className="text-3xl font-bold text-zinc-900 mb-4">WhatsApp Automation</h3>
                        <p className="text-zinc-500 text-lg mb-10 max-w-md leading-relaxed">
                            Broadcast messages to thousands. 98% open rates. The ultimate engagement channel.
                        </p>
                        <div className="h-64 w-full bg-white rounded-3xl border border-zinc-200 shadow-sm p-2">
                            <ImagePlaceholder label="WhatsApp Chat Interface" height="h-full" />
                        </div>
                    </div>

                    <div className="md:col-span-1 bg-zinc-900 text-white rounded-[2rem] p-10 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <div>
                            <div className="p-4 bg-zinc-800 w-fit rounded-2xl mb-8">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">AI Agents</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                24/7 Support bots that actually sound human.
                            </p>
                        </div>
                        <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between cursor-pointer group/link">
                            <span className="font-bold">Configure</span>
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover/link:translate-x-2 transition-transform">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1 bg-white border border-zinc-200 rounded-[2rem] p-10 hover:border-zinc-300 transition-colors">
                        <div className="p-4 bg-blue-50 w-fit rounded-2xl mb-8">
                            <Database className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-900 mb-4">CRM Sync</h3>
                        <p className="text-zinc-500 mb-8">
                            Push leads directly to Salesforce, HubSpot, or Zoho instantly.
                        </p>
                        <div className="h-32 w-full">
                            <ImagePlaceholder label="Integrations Grid" height="h-full" />
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-orange-50 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10 hover:bg-orange-100/50 transition-colors border border-orange-100">
                        <div className="flex-1">
                            <div className="p-4 bg-white w-fit rounded-2xl mb-8 shadow-sm">
                                <BarChart className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-zinc-900 mb-4">Deep Analytics</h3>
                            <p className="text-zinc-600 text-lg mb-6">
                                Track open rates, click-throughs, and revenue attribution in real-time.
                            </p>
                            <ul className="space-y-3">
                                {['Real-time Dashboards', 'Export to PDF/CSV', 'ROI Calculator'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-zinc-800 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 w-full h-64 bg-white rounded-3xl shadow-sm border border-orange-200/50 p-2">
                            <ImagePlaceholder label="Analytics Graph" height="h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTA = () => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto bg-black rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-zinc-800/50 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600/30 blur-[80px] rounded-full translate-x-1/2 translate-y-1/2"></div>
                <div className="relative z-10">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                        Ready to scale?
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                        Join 1,000+ businesses using ChatPilot to automate their growth engine today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-zinc-200 transition-transform active:scale-95 w-full sm:w-auto">
                            Get ChatPilot Free
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- MODALS ---

const TalkToBusinessModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // @ts-ignore
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            await fetch('http://localhost:3000/api/email/contact-us', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 3000);
        } catch (err) {
            alert("Failed to submit. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full">
                    <X size={20} />
                </button>

                {success ? (
                    <div className="text-center py-10">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Request Sent!</h3>
                        <p className="text-zinc-500">We'll be in touch shortly.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-2">Talk to Business</h2>
                        <p className="text-zinc-500 mb-6">Tell us about your needs.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input name="name" required className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Work Email</label>
                                <input name="email" type="email" required className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black" placeholder="john@company.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Requirement</label>
                                <textarea name="interest" required className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black h-24 resize-none" placeholder="I need WhatsApp automation for..." />
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50">
                                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Submit Request"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

const PaymentModal = ({ isOpen, onClose, onProceed }: { isOpen: boolean, onClose: () => void, onProceed: (email: string) => void }) => {
    const [email, setEmail] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full">
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-2">Start Your Journey</h2>
                <p className="text-zinc-500 mb-6">Enter your email to receive your app credentials after payment.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                            className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="you@example.com"
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (email) onProceed(email);
                            else alert("Please enter a valid email");
                        }}
                        className="w-full bg-[#FF5500] text-white py-4 rounded-xl font-bold hover:bg-[#E64D00] transition-colors">
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-white pt-20 pb-10 border-t border-zinc-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-20">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                                <Zap size={16} fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold text-black">ChatPilot</span>
                        </div>
                        <p className="text-zinc-500 mb-6 max-w-xs text-sm leading-relaxed">
                            The all-in-one automation platform for WhatsApp, Email, and AI Agents.
                        </p>
                    </div>

                    {[
                        { title: "Product", items: ["WhatsApp API", "AI Chatbots", "Email Marketing", "CRM Sync"] },
                        { title: "Company", items: ["About Us", "Careers", "Blog", "Contact"] },
                        { title: "Legal", items: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
                    ].map((col, idx) => (
                        <div key={idx}>
                            <h4 className="text-black font-bold mb-6">{col.title}</h4>
                            <ul className="space-y-4 text-sm text-zinc-500">
                                {col.items.map(item => (
                                    <li key={item} className="hover:text-black cursor-pointer transition-colors">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-400 text-sm">© 2025 ChatPilot Inc. All rights reserved.</p>
                    <div className="flex gap-6 text-zinc-400">
                        <Globe size={20} className="hover:text-black cursor-pointer" />
                        <Mail size={20} className="hover:text-black cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- 3. MAIN EXPORT ---

export default function Home() {
    const [showContact, setShowContact] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const handleRazorpay = (email: string) => {
        setShowPayment(false); // Close modal

        const options = {
            "key": "rzp_test_PLACEHOLDER", // REPLACE THIS WITH YOUR KEY
            "amount": "499900",
            "currency": "INR",
            "name": "ChatPilot Pro",
            "description": "Growth Automation Suite",
            "image": "https://chatpilot.co.in/logo.png",
            "handler": async function (response: any) {
                try {
                    await fetch('http://localhost:3000/api/email/send-app-link', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, name: email.split('@')[0] })
                    });
                    alert("Payment Successful! Check your email for the app link.");
                } catch (e) {
                    console.error(e);
                    alert("Payment success but failed to send email. Contact support.");
                }
            },
            "prefill": { "email": email },
            "theme": { "color": "#FF5500" }
        };

        // @ts-ignore
        if (window.Razorpay) {
            // @ts-ignore
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            alert("Razorpay SDK failed to load");
        }
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-orange-100">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <Navbar onTalkClick={() => setShowContact(true)} />
            <main>
                <Hero onLetGoClick={() => setShowPayment(true)} />
                <Logos />
                <Features />
                <CTA />
            </main>
            <Footer />

            <TalkToBusinessModal isOpen={showContact} onClose={() => setShowContact(false)} />
            <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} onProceed={handleRazorpay} />
        </div>
    );
}