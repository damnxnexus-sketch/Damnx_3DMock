'use client';
import { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { Product } from '@/data/products';
import ProductTextOverlays from './ProductTextOverlays';

interface Props {
    product: Product;
}

export default function ProductBottleScroll({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // "Very very smooth" physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Manage scroll locking
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLoading]);

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            setLoadingProgress(0);

            const loadedImages: HTMLImageElement[] = [];
            const imageCount = 80;
            let loadedCount = 15;

            setImages([]);

            const promises: Promise<void>[] = [];

            for (let i = 1; i <= imageCount; i++) {
                const img = new Image();
                img.src = `${product.folderPath}/${i}.jpg`;

                const p = new Promise<void>((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / imageCount) * 100));
                        resolve();
                    };
                    img.onerror = () => {
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / imageCount) * 100));
                        resolve();
                    };
                });

                loadedImages.push(img);
                promises.push(p);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setTimeout(() => setIsLoading(false), 500);
        };

        loadImages();
    }, [product.folderPath]);

    // Canvas Drawing
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const progress = smoothProgress.get();

            if (!canvas || images.length === 0) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Map progress 0 -> 0.9 to Frame 0 -> Last
            // Progress 0.9 -> 1.0 holds the Last Frame (Buffer)
            // This ensures animation finishes *before* unpinning
            let animationProgress = progress / 0.9;
            if (animationProgress > 1) animationProgress = 1;

            const frameIndex = Math.min(
                images.length - 1,
                Math.floor((isLoading ? 0 : animationProgress) * (images.length - 1))
            );

            const img = images[frameIndex];
            if (!img) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);

            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            requestAnimationFrame(render);
        };

        const unsubscribe = smoothProgress.onChange(render);
        const animId = requestAnimationFrame(render);

        return () => {
            unsubscribe();
            cancelAnimationFrame(animId);
        };
    }, [smoothProgress, images, isLoading]);

    return (
        <div ref={containerRef} className="relative h-[400vh] z-10">
            {/* Loading Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="text-4xl font-bold mb-4 animate-pulse bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                    Nano Banana
                </div>
                <div className="w-64 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                    <div
                        className="h-full bg-orange-500 transition-all duration-150 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                    />
                </div>
                <div className="mt-2 text-xs text-gray-400 uppercase tracking-widest">
                    Loading Freshness {loadingProgress}%
                </div>
            </div>

            <div className={`sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
                <ProductTextOverlays scrollYProgress={smoothProgress} product={product} />
            </div>
        </div>
    );
}
