'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${isScrolled ? 'bg-white/10 backdrop-blur-md border-b border-white/20' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="flex items-center gap-2">
                {/* Abstract Banana/Lightning Icon */}
                <svg width="32" height="32" viewBox="0 0 32 32" className="w-8 h-8 text-orange-500 fill-current">
                    <path d="M8 2L6 8L18 8L16 14L26 14L24 20L12 20L10 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                    Nano Banana
                </span>
            </div>

            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] group">
                <span>Order Now</span>
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
        </motion.nav>
    );
}
