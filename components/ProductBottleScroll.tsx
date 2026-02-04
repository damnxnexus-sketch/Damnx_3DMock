'use client';
import { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { Product } from '@/data/products';
import ProductTextOverlays from './ProductTextOverlays';

interface Props {
    product: Product;
}

export default function ProductBottleScroll({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imageCount = 80;
            let loadedCount = 0;

            // Clear existing images when product changes to avoid flashing wrong product
            setImages([]);

            for (let i = 1; i <= imageCount; i++) {
                const img = new Image();
                img.src = `${product.folderPath}/${i}.jpg`;
                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        resolve(true);
                    };
                    img.onerror = () => resolve(false);
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        loadImages();
    }, [product.folderPath]);

    // Canvas Drawing
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const progress = scrollYProgress.get();

            if (!canvas || images.length === 0) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const frameIndex = Math.min(
                images.length - 1,
                Math.floor(progress * (images.length - 1))
            );

            const img = images[frameIndex];
            if (!img) return;

            // Responsive Drawing logic
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Scale to fill the screen (cover effect)
            // Using Math.max guarantees the image covers the canvas completely
            // We removed the 0.8 factor to ensure full-screen immersion
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);

            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            requestAnimationFrame(render);
        };

        const unsubscribe = scrollYProgress.onChange(render);
        const animId = requestAnimationFrame(render);

        return () => {
            unsubscribe();
            cancelAnimationFrame(animId);
        };
    }, [scrollYProgress, images]);

    return (
        <div ref={containerRef} className="relative h-[300vh] z-10">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
                <ProductTextOverlays scrollYProgress={scrollYProgress} product={product} />
            </div>
        </div>
    );
}
