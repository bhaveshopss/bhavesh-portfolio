import React from 'react';
import GithubGrid from './GithubGrid';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionSpan = motion.span as any;

const Hero: React.FC = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.5,
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
            className="relative min-h-screen flex flex-col justify-center items-center pt-28 md:pt-48 pb-12 overflow-hidden bg-gray-50 dark:bg-[#050505]"
            id="hero"
        >
            {/* Subtle particle/network background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-purple/[0.03] rounded-full blur-[100px] animate-pulse-slow delay-2000" />
            </div>

            {/* Floating 3D Infrastructure Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                {[
                    { icon: 'cloud', x: '8%', y: '25%', delay: 0, size: 28, color: 'rgba(99,102,241,0.15)' },
                    { icon: 'dns', x: '88%', y: '20%', delay: 1.2, size: 24, color: 'rgba(16,185,129,0.12)' },
                    { icon: 'terminal', x: '5%', y: '65%', delay: 2.4, size: 22, color: 'rgba(168,85,247,0.12)' },
                    { icon: 'storage', x: '92%', y: '60%', delay: 0.8, size: 26, color: 'rgba(59,130,246,0.12)' },
                    { icon: 'security', x: '15%', y: '80%', delay: 3.2, size: 20, color: 'rgba(239,68,68,0.10)' },
                    { icon: 'hub', x: '82%', y: '78%', delay: 1.8, size: 22, color: 'rgba(245,158,11,0.10)' },
                    { icon: 'memory', x: '18%', y: '12%', delay: 2.0, size: 20, color: 'rgba(52,211,153,0.10)' },
                    { icon: 'cloud_sync', x: '78%', y: '40%', delay: 0.5, size: 20, color: 'rgba(99,102,241,0.10)' },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: item.x,
                            top: item.y,
                            animationDelay: `${item.delay}s`,
                            animationDuration: `${6 + i * 0.5}s`,
                        }}
                    >
                        <div
                            className="rounded-xl border border-white/5 dark:border-white/[0.06] flex items-center justify-center"
                            style={{
                                width: item.size * 2,
                                height: item.size * 2,
                                background: item.color,
                                backdropFilter: 'blur(1px)',
                            }}
                        >
                            <span
                                className="material-symbols-outlined text-gray-300/20 dark:text-white/10"
                                style={{ fontSize: item.size }}
                            >
                                {item.icon}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Network constellation lines between floating icons */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ opacity: 0.04 }}>
                <line x1="8%" y1="25%" x2="18%" y2="12%" stroke="currentColor" strokeWidth="1" />
                <line x1="18%" y1="12%" x2="88%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
                <line x1="88%" y1="20%" x2="92%" y2="60%" stroke="currentColor" strokeWidth="1" />
                <line x1="92%" y1="60%" x2="82%" y2="78%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
                <line x1="5%" y1="65%" x2="15%" y2="80%" stroke="currentColor" strokeWidth="1" />
                <line x1="8%" y1="25%" x2="5%" y2="65%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
                <line x1="78%" y1="40%" x2="88%" y2="20%" stroke="currentColor" strokeWidth="1" />
                <line x1="78%" y1="40%" x2="92%" y2="60%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
            </svg>

            <div className="container mx-auto px-4 z-10 flex flex-col items-center">

                {/* Main Headline - Coordinated entrance */}
                <div className="text-center mb-8 relative z-20">
                    <MotionH1
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white leading-[0.9]"
                    >
                        <MotionSpan variants={wordVariants} className="inline-block mr-2 md:mr-3">
                            Engineering
                        </MotionSpan>
                        <MotionSpan variants={wordVariants} className="inline-block mr-2 md:mr-3">
                            Reliability
                        </MotionSpan>
                        <br className="hidden md:block" />
                        <MotionSpan variants={wordVariants} className="inline-block text-primary">
                            For
                        </MotionSpan>
                        <MotionSpan variants={wordVariants} className="inline-block mx-2 md:mx-3">
                            the
                        </MotionSpan>
                        <MotionSpan variants={wordVariants} className="inline-block text-primary">
                            AI
                        </MotionSpan>
                        <MotionSpan variants={wordVariants} className="inline-block ml-2 md:ml-3">
                            Era.
                        </MotionSpan>
                    </MotionH1>
                </div>

                {/* GitHub Grid - enters after headline */}
                <MotionDiv
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                    <GithubGrid />
                </MotionDiv>

                {/* Scroll Indicator - enters last */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <MotionDiv
                        className="flex flex-col items-center gap-1"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                    >
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-600">
                            Scroll to Initialize
                        </span>
                        <div className="flex flex-col items-center gap-0.5">
                            <MotionDiv
                                className="w-4 h-4 border-b-2 border-r-2 border-primary/60 rotate-45"
                                animate={{ y: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </MotionDiv>
                </MotionDiv>
            </div>
        </section>
    );
};

export default Hero;
