import React from 'react';

const Contact: React.FC = () => {
  return (
    <>
      <section className="relative z-10 py-12 overflow-hidden bg-gradient-to-b from-transparent to-gray-200 dark:to-black transition-colors duration-500" id="contact">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-5xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter uppercase opacity-100">
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">BUILD</span>
          </h2>
          <a href="mailto:workwithbhavesh@gmail.com" className="cursor-interactive px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all inline-block mb-10 shadow-lg">
            Launch Command
          </a>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
            <a href="https://www.linkedin.com/in/bhaveshops/" target="_blank" rel="noopener noreferrer" className="cursor-interactive flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/20 rounded-lg text-gray-700 dark:text-text-high-contrast hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] transition-all font-mono text-sm font-bold tracking-widest uppercase shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
              LINKEDIN_CONNECT
            </a>
            <a href="mailto:workwithbhavesh@gmail.com" className="cursor-interactive flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/20 rounded-lg text-gray-700 dark:text-text-high-contrast hover:text-white hover:bg-red-600 hover:border-red-500 hover:shadow-[0_0_20px_rgba(234,67,53,0.4)] transition-all font-mono text-sm font-bold tracking-widest uppercase shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"></path></svg>
              GMAIL_INIT
            </a>
            <a href="https://github.com/bhaveshopss" target="_blank" rel="noopener noreferrer" className="cursor-interactive flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/20 rounded-lg text-gray-700 dark:text-text-high-contrast hover:text-white hover:bg-gray-800 hover:border-gray-600 hover:shadow-[0_0_20px_rgba(100,100,100,0.4)] transition-all font-mono text-sm font-bold tracking-widest uppercase shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.89 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
              GITHUB_REPO
            </a>
          </div>
        </div>
      </section>
      <footer className="relative z-10 bg-gray-100 dark:bg-black py-6 border-t border-gray-200 dark:border-white/10 transition-colors duration-500">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">© 2024 Bhaveshops — Built for the Void</p>
        </div>
      </footer>
    </>
  );
};

export default Contact;