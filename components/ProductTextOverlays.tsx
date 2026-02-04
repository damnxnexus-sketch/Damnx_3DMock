'use client';
import { MotionValue, motion, useTransform } from 'framer-motion';
import { Product } from '@/data/products';

interface Props {
    scrollYProgress: MotionValue<number>;
    product: Product;
}

export default function ProductTextOverlays({ scrollYProgress, product }: Props) {
    // Define opacity transforms for each section
    // 0 -> 0.2: Section 1
    // 0.25 -> 0.45: Section 2
    // 0.5 -> 0.7: Section 3
    // 0.75 -> 0.95: Section 4

    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [50, -50]);

    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.5], [50, -50]);

    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.75], [50, -50]);

    const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.75, 1], [50, -50]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-4">
            {/* Section 1 */}
            <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute max-w-4xl">
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 text-white drop-shadow-2xl">
                    {product.section1.title}
                </h1>
                <p className="text-2xl md:text-4xl font-light text-white/90">
                    {product.section1.subtitle}
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute max-w-4xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                    {product.section2.title}
                </h2>
                <p className="text-xl md:text-3xl text-white/80 leading-relaxed">
                    {product.section2.subtitle}
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute max-w-4xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                    {product.section3.title}
                </h2>
                <p className="text-xl md:text-3xl text-white/80 leading-relaxed">
                    {product.section3.subtitle}
                </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute max-w-4xl">
                <h2 className="text-5xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                    {product.section4.title}
                </h2>
            </motion.div>
        </div>
    );
}
