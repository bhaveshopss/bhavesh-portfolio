import React from 'react';
import GithubGrid from './GithubGrid';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, standardTransition, staggerContainer } from '../../lib/useAnimations';

const Hero: React.FC = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 40, rotateX: -40 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <section 
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center items-center pt-48 pb-12 overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-500" 
            id="hero"
        >

            {/* System Status Widget - Absolute positioned in top right (handled by component styles themselves usually, but SystemHealth has absolute styles) */}


            <div className="container mx-auto px-4 z-10 flex flex-col items-center">

                {/* Main Headline */}
                <div className="text-center mb-8 relative z-20">
                    <motion.h1
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white leading-[0.9]"
                    >
                        <motion.span variants={wordVariants} className="inline-block mr-3">
                            Engineering
                        </motion.span>
                        <motion.span variants={wordVariants} className="inline-block mr-3">
                            Reliability
                        </motion.span>
                        <br />
                        <motion.span variants={wordVariants} className="text-primary">
                            For
                        </motion.span>
                        <motion.span variants={wordVariants} className="inline-block mx-3">
                            the
                        </motion.span>
                        <motion.span variants={wordVariants} className="text-primary">
                            AI
                        </motion.span>
                        <motion.span variants={wordVariants} className="inline-block ml-3">
                            Era.
                        </motion.span>
                    </motion.h1>
                </div>

                {/* The 3D Grid & Description */}
                <GithubGrid />

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.span 
                        className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-600"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Scroll to Initialize
                    </motion.span>
                    <motion.div 
                        className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
                        animate={{ scaleY: [0, 1, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
