'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Truck, ShieldCheck, Leaf } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import { products } from '@/data/products';

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const product = products[currentIndex];

    // Scroll Reset to top when product changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentIndex]);

    // Update Body Background Gradient
    useEffect(() => {
        document.documentElement.style.setProperty('--product-gradient', product.gradient);
    }, [product]);

    const nextProduct = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <Navbar />

            <AnimatePresence mode="wait">
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    {/* Main Scrollytelling Section */}
                    <ProductBottleScroll product={product} />

                    {/* Product Details Section */}
                    <div className="bg-white/90 backdrop-blur-lg relative z-20 rounded-t-[3rem] -mt-24 pb-24 border-t border-white/50 shadow-2xl">
                        <div className="max-w-7xl mx-auto px-6 pt-24">

                            {/* Product Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h3 className="text-orange-500 font-bold uppercase tracking-widest mb-2 text-sm">{product.subName}</h3>
                                    <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-800">{product.detailsSection.title}</h2>
                                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                        {product.detailsSection.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="grid grid-cols-1 gap-4">
                                        {product.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-orange-500">
                                                    <Leaf size={20} />
                                                </div>
                                                <span className="text-lg font-medium text-slate-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Stats */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-slate-50 rounded-3xl p-10 shadow-inner"
                                >
                                    <div className="grid grid-cols-3 gap-8 text-center h-full items-center">
                                        {product.stats.map((stat, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                <span className="text-4xl md:text-5xl font-bold text-slate-800">{stat.val}</span>
                                                <span className="text-sm uppercase tracking-wide text-slate-500">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Freshness Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="mb-24 text-center max-w-4xl mx-auto"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">{product.freshnessSection.title}</h2>
                                <p className="text-xl text-slate-600 leading-relaxed">{product.freshnessSection.description}</p>
                            </motion.div>

                            {/* Buy Now Section */}
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>

                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h2 className="text-4xl md:text-6xl font-bold mb-4">{product.name}</h2>
                                        <div className="flex items-baseline gap-2 mb-8">
                                            <span className="text-5xl font-bold text-orange-400">{product.buyNowSection.price}</span>
                                            <span className="text-lg text-slate-400">{product.buyNowSection.unit}</span>
                                        </div>

                                        <ul className="space-y-4 mb-10">
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <Truck size={20} className="text-orange-500" />
                                                {product.buyNowSection.deliveryPromise}
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <ShieldCheck size={20} className="text-orange-500" />
                                                {product.buyNowSection.returnPolicy}
                                            </li>
                                        </ul>

                                        <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center justify-center gap-3">
                                            <ShoppingCart />
                                            Add to Cart
                                        </button>
                                    </div>

                                    {/* Processing Params */}
                                    <div className="grid grid-cols-1 gap-4">
                                        {product.buyNowSection.processingParams.map((param, i) => (
                                            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                                                <h4 className="text-xl font-bold mb-1">{param}</h4>
                                                <span className="text-xs text-slate-400 uppercase tracking-wider">Verified Process</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <Footer />

            {/* Navigation Controls */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-xl p-2 rounded-full border border-white/10">
                <button onClick={prevProduct} className="p-3 hover:bg-white/20 rounded-full text-white transition-colors">
                    <ChevronLeft />
                </button>
                <div className="flex gap-2 px-2">
                    {products.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-orange-500 w-8' : 'bg-white/50 hover:bg-white'}`}
                        />
                    ))}
                </div>
                <button onClick={nextProduct} className="p-3 hover:bg-white/20 rounded-full text-white transition-colors">
                    <ChevronRight />
                </button>
            </div>

            {/* Next Flavor CTA */}
            <div
                onClick={nextProduct}
                className="fixed bottom-0 right-0 z-40 bg-white text-black px-8 py-4 rounded-tl-3xl cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-300 font-bold hidden md:block"
            >
                Next Flavor &rarr;
            </div>

        </div>
    );
}
