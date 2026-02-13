import React from 'react';
import GithubGrid from './GithubGrid';

import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12 overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-500" id="hero">

            {/* System Status Widget - Absolute positioned in top right (handled by component styles themselves usually, but SystemHealth has absolute styles) */}


            <div className="container mx-auto px-4 z-10 flex flex-col items-center">

                {/* The 3D Grid & Description */}
                <GithubGrid />

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-600 animate-pulse">Scroll to Initialize</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gray-400 dark:from-gray-600 to-transparent"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
