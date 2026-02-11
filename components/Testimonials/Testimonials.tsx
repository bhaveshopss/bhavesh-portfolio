import React, { useState } from 'react';
import { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Engineering Lead",
    company: "InnovateSphere Corp.",
    quote: "Bhavesh revolutionized our infrastructure. The self-healing mechanisms he implemented for CloudScale didn't just reduce downtime—they gave our team their weekends back.",
    project: "CloudScale Impact",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyFgYQW4A7T94TyAv9H23KgpPezOnnewSaN5XdbGpy5aIlcECOrDawnbssPxDJ3Z-UI4ZVODnORX1L7WOEUxPLijT0hk1-21EXQaSiQf4TL4nEVq36W3d6EgQ6Y1RUSk63rhT3kCVP6sxnYeA4pO-MWGxKUdnINSxilqUe9Kqp0EKmMQEo_c7u9WGiZrQKwrxbbdjFeKZgJsPFOVHF32lNfBTjDTe6Dy1A3JqHjwASvl3rknMmRo08wBr9Sk7AEQ0-BaHU2Xf0H1o"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    company: "TechNova Systems",
    quote: "His mastery of Kubernetes orchestration is unparalleled. Bhavesh successfully migrated our entire legacy stack to a containerized environment with zero data loss.",
    project: "Legacy Modernization",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxffU5XNWv4TLcRnaD5Ygf94WUjXp0kGTndD6oi6H0Wt9aFbJcCV8oIlUeTl2Ztk0SUAjYT8pUx5R5_jXUBhoQrQzUf8JevDP7Tuexp3592L6yPPM8FfR4PpWcqoDZsdrkOaISrGEVi_QJ92ZQueLKlQigknXtTYdF_ILh3OIPmQNvxE8cyhTtSrEVVq0HRCAXiMiVHdbypGTBI8LBfMiQ6iDb3POPQ3zlDxkSwHW-Fpz9iPVqbG8WZxO7lQ9H6AYfwbIOr4UT5aQ"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section className="py-12 relative overflow-hidden bg-gray-100 dark:bg-background-dark/95 border-t border-gray-200 dark:border-white/5" id="testimonials">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 opacity-0 dark:opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-5xl text-gray-900 dark:text-white mb-4 uppercase font-bold tracking-tight">Stakeholder Feedback</h2>
          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-12 bg-primary"></div>
            <span className="font-mono text-sm uppercase tracking-widest text-primary font-bold">Voices of Impact</span>
            <div className="h-px w-12 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Image Stack */}
          <div className="relative h-[300px] w-full flex items-center justify-center">
             <div className="relative w-[300px] md:w-[400px] h-[250px] md:h-[350px]">
                {testimonials.map((t, idx) => {
                  let zIndex = 0;
                  let opacity = 0;
                  let transform = '';
                  
                  if (idx === currentIndex) {
                    zIndex = 30;
                    opacity = 1;
                    transform = 'translate(0, 0) rotate(0deg)';
                  } else if (idx === (currentIndex - 1 + testimonials.length) % testimonials.length) {
                    zIndex = 20;
                    opacity = 0.5;
                    transform = 'translate(-10px, -10px) rotate(-4deg)';
                  } else {
                    zIndex = 10;
                    opacity = 0.2;
                    transform = 'translate(10px, 10px) rotate(4deg)';
                  }

                  return (
                    <div 
                      key={idx}
                      className="absolute inset-0 rounded-2xl overflow-hidden border border-black/10 dark:border-white/20 shadow-2xl transition-all duration-700 ease-out"
                      style={{ zIndex, opacity, transform }}
                    >
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale brightness-90 dark:brightness-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                  );
                })}
             </div>
          </div>

          {/* Content */}
          <div className="relative min-h-[250px] flex flex-col justify-center">
            <div className="animate-pulse-glow">
              <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 border border-primary/50 text-primary text-[10px] font-mono rounded mb-4 uppercase tracking-widest font-bold">Project: {current.project}</span>
              <blockquote className="text-xl md:text-2xl font-display text-gray-800 dark:text-white leading-relaxed mb-6 uppercase font-bold tracking-tight">
                "{current.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-gray-400 dark:bg-gray-500"></div>
                <div>
                  <div className="text-gray-900 dark:text-white font-bold uppercase text-sm">{current.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 font-mono text-xs uppercase font-bold">{current.company}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white hover:text-black transition-all cursor-interactive">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button onClick={next} className="w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white hover:text-black transition-all cursor-interactive">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;