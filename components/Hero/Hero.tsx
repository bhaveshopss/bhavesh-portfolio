import React from 'react';
import GithubGrid from './GithubGrid';
import HeroShutterText from '../ui/HeroShutterText';

const Hero: React.FC = () => {
  return (
    <header id="home" className="relative z-10 min-h-[70vh] flex flex-col justify-center items-center text-center px-4 pt-64 pb-8 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Slow Pulsing Glows with Color Shift */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-color-1 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] animate-pulse-color-2 delay-1000 mix-blend-multiply dark:mix-blend-screen"></div>

        {/* Vertical Structure Lines */}
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-black/10 dark:via-white/5 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-black/10 dark:via-white/5 to-transparent opacity-50"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-[30%] left-[25%] w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full animate-float duration-[7s]"></div>
        <div className="absolute top-[60%] right-[30%] w-1.5 h-1.5 bg-primary/30 rounded-full animate-float delay-1000 duration-[9s]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-1 h-1 bg-accent-purple/30 rounded-full animate-float delay-500 duration-[8s]"></div>
      </div>
      
      <div className="font-display text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight font-bold tracking-tight uppercase relative z-10 flex flex-col items-center">
        <HeroShutterText 
          text="Engineering reliability" 
          className="mb-0"
          textClassName="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent opacity-100"
          shutterClassName="text-gray-400 dark:text-gray-500 !text-opacity-50" 
        />
        <HeroShutterText 
          text="for the AI era." 
          className="mt-2"
          textClassName="text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.3)] dark:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          shutterClassName="text-accent-purple !text-opacity-50"
        />
      </div>

      <GithubGrid />
    </header>
  );
};

export default Hero;