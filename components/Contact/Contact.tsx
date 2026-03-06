import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const MotionA = motion.a as any;
const MotionH2 = motion.h2 as any;
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

const headingWordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:workwithbhavesh@gmail.com?subject=Contact from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`)}`;
    window.location.href = mailto;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="relative z-10 py-12 overflow-hidden bg-gradient-to-b from-transparent to-gray-200 dark:to-black" id="contact">
        <div className="container mx-auto px-4 text-center">
          <MotionH2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter uppercase"
          >
            <MotionSpan
              variants={headingWordVariants}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="inline-block mr-2 sm:mr-4"
            >
              LET'S
            </MotionSpan>
            <MotionSpan
              variants={headingWordVariants}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple"
            >
              BUILD
            </MotionSpan>
          </MotionH2>

          <MotionDiv
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-24 h-1 bg-gradient-to-r from-primary via-accent-purple to-primary mx-auto mb-10 rounded-full"
          />

          {/* Contact Form */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-lg mx-auto mb-10"
          >
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-card font-mono text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-card font-mono text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-card font-mono text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  placeholder="What should we build together?"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="cursor-interactive px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-button hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all inline-block shadow-lg hover:shadow-glow-primary hover:scale-105 active:scale-95"
                >
                  {submitted ? 'Opening Mail Client...' : 'Launch Command'}
                </button>
              </div>
            </form>
          </MotionDiv>

          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ staggerChildren: 0.12, delayChildren: 0.5 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8"
          >
            <MotionA
              href="https://www.linkedin.com/in/bhaveshops/"
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-interactive flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/20 rounded-card text-gray-700 dark:text-text-high-contrast hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] transition-all font-mono text-sm font-bold tracking-widest uppercase shadow-sm"
              aria-label="Connect on LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
              LINKEDIN_CONNECT
            </MotionA>
            <MotionA
              href="mailto:workwithbhavesh@gmail.com"
              variants={linkVariants}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-interactive flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/20 rounded-card text-gray-700 dark:text-text-high-contrast hover:text-white hover:bg-red-600 hover:border-red-500 hover:shadow-[0_0_20px_rgba(234,67,53,0.4)] transition-all font-mono text-sm font-bold tracking-widest uppercase shadow-sm"
              aria-label="Send email via Gmail"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"></path></svg>
              GMAIL_INIT
            </MotionA>
            <MotionA
              href="https://github.com/bhaveshopss"
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-interactive flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/20 rounded-card text-gray-700 dark:text-text-high-contrast hover:text-white hover:bg-gray-800 hover:border-gray-600 hover:shadow-[0_0_20px_rgba(100,100,100,0.4)] transition-all font-mono text-sm font-bold tracking-widest uppercase shadow-sm"
              aria-label="View GitHub profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.89 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
              GITHUB_REPO
            </MotionA>
          </MotionDiv>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-100 dark:bg-black py-8 border-t border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left - Brand */}
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                Bhavesh<span className="text-primary">ops</span>
              </span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">DevOps & AIOps</span>
            </div>

            {/* Center - Quick Links */}
            <nav className="flex items-center gap-6" aria-label="Footer navigation">
              {['Work', 'Stack', 'About', 'Blog'].map((item) => (
                <a
                  key={item}
                  href={`#${item === 'Stack' ? 'infrastructure' : item.toLowerCase()}`}
                  className="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold hover:text-primary transition-colors cursor-interactive"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right - Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/bhaveshops/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors cursor-interactive" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
              </a>
              <a href="https://github.com/bhaveshopss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors cursor-interactive" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.89 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
              </a>
              <a href="mailto:workwithbhavesh@gmail.com" className="text-gray-400 hover:text-primary transition-colors cursor-interactive" aria-label="Email">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"></path></svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/5 text-center">
            <p className="text-gray-500 dark:text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">
              &copy; {new Date().getFullYear()} Bhaveshops &mdash; Built for the Void
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
