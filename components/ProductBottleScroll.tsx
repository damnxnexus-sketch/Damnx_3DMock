'use client';
import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface Props {
    folderPath: string;
}

export default function ProductBottleScroll({ folderPath }: Props) {
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
            const imageCount = 80; // As found in directory
            let loadedCount = 0;

            for (let i = 1; i <= imageCount; i++) {
                const img = new Image();
                img.src = `${folderPath}/${i}.jpg`;
                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        resolve(true);
                    };
                    img.onerror = () => resolve(false); // Graceful fallback
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        loadImages();
    }, [folderPath]);

    // Canvas Drawing
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const progress = scrollYProgress.get(); // 0 to 1

            if (!canvas || images.length === 0) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Calculate frame index
            const frameIndex = Math.min(
                images.length - 1,
                Math.floor(progress * (images.length - 1))
            );

            const img = images[frameIndex];
            if (!img) return;

            // Responsive Contain Draw
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Maintain aspect ratio
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8; // 0.8 to give some breathing room
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            requestAnimationFrame(render);
        };

        const unsubscribe = scrollYProgress.onChange(render); // Trigger on scroll change
        const animId = requestAnimationFrame(render); // Initial render loop

        return () => {
            unsubscribe();
            cancelAnimationFrame(animId);
        };
    }, [scrollYProgress, images]);

    return (
        <div ref={containerRef} className="relative h-[500vh] z-10 pointer-events-none">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full object-contain" />
            </div>
        </div>
    );
}
