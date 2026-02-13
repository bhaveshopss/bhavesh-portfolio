import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  // Cast motion components to any to avoid strict type issues
  const MotionDiv = motion.div as any;
  const MotionH2 = motion.h2 as any;

  return (
    <section className="relative z-10 py-16 bg-white dark:bg-[#080808] border-t border-gray-200 dark:border-gray-800 transition-colors duration-500" id="about">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Profile Card */}
          <div className="lg:col-span-4 relative sticky top-24">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-card-dark rounded-none border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none z-10"></div>
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-black contrast-125 filter grayscale hover:grayscale-0 transition-all duration-700">
                {/* Experience Log Photo */}
                <img
                  alt="Bhavesh Kumar Parmar - Profile"
                  className="object-cover object-top w-full h-full opacity-100 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="/bhavesh-profile-optimized.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black relative z-30">

                <h3 className="text-gray-900 dark:text-white font-display text-3xl uppercase font-bold tracking-tighter mb-1 mt-2">Bhavesh K. Parmar</h3>
                <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3"></div>
                <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-display">DevOps Engineer</p>

                <div className="mt-6 w-full group transform transition-transform duration-300 hover:scale-102">
                  <a href="/Bhavesh_Devops_Resume.pdf" target="_blank" rel="noopener noreferrer" className="block w-full text-center relative overflow-hidden rounded bg-gray-100 dark:bg-[rgba(30,30,30,0.8)] border border-gray-300 dark:border-terminal-green/40 hover:border-terminal-green p-3 transition-colors duration-300 cursor-interactive">
                    <div className="relative z-10 flex items-center justify-center gap-2 font-mono text-xs text-terminal-green font-bold tracking-widest">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span>View Resume</span>
                    </div>
                    <div className="absolute inset-0 bg-terminal-green/5 group-hover:bg-terminal-green/10 transition-colors duration-300"></div>
                  </a>
                </div>

                {/* Certificates in Sidebar */}
                <div className="mt-8">
                  <h4 className="font-display text-sm text-gray-900 dark:text-white uppercase font-bold tracking-wider mb-4 border-l-2 border-primary pl-3">Licenses & Certifications</h4>

                  <div className="space-y-3">
                    {/* Cert 1: AWS */}
                    <div className="group relative border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary/50 transition-colors bg-gray-50/50 dark:bg-white/5">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 shrink-0 bg-white rounded p-1 flex items-center justify-center border border-gray-200 dark:border-transparent">
                          <img src="/Amazon_Web_Services-Logo.wine.svg" alt="AWS" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display text-xs text-gray-900 dark:text-white font-bold leading-tight line-clamp-2">AWS Certified Cloud Practitioner</h5>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-mono text-[9px] text-gray-700 dark:text-gray-400 uppercase">May 2025</span>
                          </div>
                        </div>
                      </div>
                      <p className="font-mono text-[9px] text-gray-700 dark:text-gray-400 mt-2 truncate font-medium">Skills: AWS Auto Scaling, AWS Lambda +5</p>
                    </div>

                    {/* Cert 2: Oracle AI */}
                    <div className="group relative border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary/50 transition-colors bg-gray-50/50 dark:bg-white/5">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 shrink-0 bg-white rounded p-1 flex items-center justify-center border border-gray-200 dark:border-transparent">
                          <img src="https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg" alt="Oracle" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display text-xs text-gray-900 dark:text-white font-bold leading-tight line-clamp-2">Oracle AI Vector Search CP</h5>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-mono text-[9px] text-gray-700 dark:text-gray-400 uppercase">Apr 2025</span>
                            <a href="/certificates/Oracle_AI_Vector_Search_Certified_Professional.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[14px]">visibility</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p className="font-mono text-[9px] text-gray-700 dark:text-gray-400 mt-2 truncate font-medium">Skills: Oracle Cloud, GenAI Studio +3</p>
                    </div>



                    {/* Cert 4: Ubuntu */}
                    <div className="group relative border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary/50 transition-colors bg-gray-50/50 dark:bg-white/5">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 shrink-0 bg-white rounded p-1 flex items-center justify-center border border-gray-200 dark:border-transparent">
                          <img src="https://www.vectorlogo.zone/logos/ubuntu/ubuntu-icon.svg" alt="Ubuntu" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display text-xs text-gray-900 dark:text-white font-bold leading-tight line-clamp-2">Ubuntu Linux Professional</h5>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-mono text-[9px] text-gray-700 dark:text-gray-400 uppercase">Mar 2025</span>
                            <a href="/certificates/Ubuntu_Linux_Professional_Certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[14px]">visibility</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p className="font-mono text-[9px] text-gray-700 dark:text-gray-400 mt-2 truncate font-medium">Skills: Linux Admin, CLI +3</p>
                    </div>

                    {/* Cert 5: Oracle */}
                    <div className="group relative border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary/50 transition-colors bg-gray-50/50 dark:bg-white/5">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 shrink-0 bg-white rounded p-1 flex items-center justify-center border border-gray-200 dark:border-transparent">
                          <img src="https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg" alt="Oracle" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display text-xs text-gray-900 dark:text-white font-bold leading-tight line-clamp-2">OCI Foundations Associate</h5>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-mono text-[9px] text-gray-700 dark:text-gray-400 uppercase">Feb 2025</span>
                            <a href="/certificates/Oracle_Foundations_Associate_Certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[14px]">visibility</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p className="font-mono text-[9px] text-gray-700 dark:text-gray-400 mt-2 truncate font-medium">Skills: OCI, Oracle +3</p>
                    </div>

                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Details */}
          <div className="lg:col-span-8 space-y-12">

            {/* Experience */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <MotionH2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="font-display text-2xl md:text-4xl text-gray-900 dark:text-white uppercase font-bold tracking-tight"
                >
                  Experience_Log
                </MotionH2>
                <div className="h-px flex-grow bg-gray-300 dark:bg-gray-700"></div>
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">v2025.02</span>
              </div>

              <div className="relative pl-8 border-l border-gray-300 dark:border-gray-700 space-y-12">
                {/* Job 1 */}
                <MotionDiv
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -left-[37px] top-2 w-4 h-4 bg-white dark:bg-black border border-primary rounded-full group-hover:bg-primary group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300 z-10"></div>
                  <div className="absolute -left-[37px] top-2 w-4 h-4 bg-primary/50 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="font-display text-2xl text-gray-900 dark:text-white font-bold uppercase tracking-wide group-hover:text-primary transition-colors">Shellkode</h3>
                    <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded uppercase tracking-wider font-bold">Feb 2025 - Present</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-mono mb-4 uppercase tracking-wider font-bold">Cloud Engineer</div>
                  <ul className="space-y-2 font-mono text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-primary mt-1 font-bold group-hover/item:translate-x-1 transition-transform">›</span>
                      <span>Achieved <span className="text-gray-900 dark:text-white font-bold">99.9% Uptime</span> for critical production workloads through proactive monitoring.</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-primary mt-1 font-bold group-hover/item:translate-x-1 transition-transform">›</span>
                      <span>Engineered automated scaling policies resulting in <span className="text-gray-900 dark:text-white font-bold">20% Cost Reduction</span> on AWS infrastructure.</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-primary mt-1 font-bold group-hover/item:translate-x-1 transition-transform">›</span>
                      <span>Deployed self-healing Kubernetes clusters with ArgoCD GitOps workflow.</span>
                    </li>
                  </ul>
                </MotionDiv>

                {/* Job 2 */}
                <MotionDiv
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute -left-[37px] top-2 w-4 h-4 bg-white dark:bg-black border border-gray-400 dark:border-gray-500 rounded-full group-hover:border-gray-900 dark:group-hover:border-white group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-300 z-10"></div>

                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="font-display text-2xl text-gray-900 dark:text-white font-bold uppercase tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">Independent Projects</h3>
                    <span className="font-mono text-xs text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-2 py-1 rounded uppercase tracking-wider font-bold">June 2024 - Jan 2025</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-mono mb-4 uppercase tracking-wider font-bold">Cloud Engineer</div>
                  <ul className="space-y-2 font-mono text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-gray-400 mt-1 font-bold group-hover/item:translate-x-1 transition-transform">›</span>
                      <span>Provisioned and managed AWS infrastructure using Terraform, deploying 20+ resources including EC2, S3, Lambda, and VPC for cloud projects.</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-gray-400 mt-1 font-bold group-hover/item:translate-x-1 transition-transform">›</span>
                      <span>Deployed 3+ Kubernetes clusters (Kind, EKS) and containerized 10+ applications using Docker and Helm charts.</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-gray-400 mt-1 font-bold group-hover/item:translate-x-1 transition-transform">›</span>
                      <span>Developed automation tools using Python, Java, and Bash to streamline cloud resource management across 5+ AWS accounts.</span>
                    </li>
                  </ul>
                </MotionDiv>
              </div>
            </div>

            {/* Education & Leadership Bento */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <MotionH2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-2xl md:text-3xl text-gray-900 dark:text-white uppercase font-bold tracking-tight"
                >
                  Education & Leadership
                </MotionH2>
                <div className="h-px flex-grow bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="grid grid-cols-1 gap-6">

                {/* Education Card - Wide */}
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative group overflow-hidden bg-gray-50 dark:bg-[#111111]/80 border border-gray-200 dark:border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-white group-hover:text-primary transition-colors">school</span>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h3 className="font-display text-xl text-gray-900 dark:text-white font-bold uppercase tracking-tight group-hover:text-primary transition-colors">B.Tech in Computer Science</h3>
                          <p className="font-mono text-sm text-gray-700 dark:text-gray-400 font-medium mt-1">JIET Jodhpur • 2021 - 2025</p>
                        </div>
                        <span className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                          GPA: 8.8/10
                        </span>
                      </div>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded border border-gray-200 dark:border-white/5">
                          <div className="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-2">Specialization</div>
                          <p className="text-xs text-gray-900 dark:text-gray-200 font-medium">Cloud Computing & Distributed Systems</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded border border-gray-200 dark:border-white/5">
                          <div className="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-2">Relevant Coursework</div>
                          <p className="text-xs text-gray-900 dark:text-gray-200 font-medium">Data Structures, OS, DBMS, Computer Networks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionDiv>

                {/* Leadership Card - Wide */}
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative group overflow-hidden bg-gray-50 dark:bg-[#111111]/80 border border-gray-200 dark:border-white/10 p-6 rounded-2xl hover:border-accent-green/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-white group-hover:text-accent-green transition-colors">diversity_3</span>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h3 className="font-display text-xl text-gray-900 dark:text-white font-bold uppercase tracking-tight group-hover:text-accent-green transition-colors">Student Council President</h3>
                          <p className="font-mono text-sm text-gray-700 dark:text-gray-400 font-medium mt-1">University Chapter • Elected Leadership</p>
                        </div>
                        <span className="font-mono text-[10px] text-accent-green bg-accent-green/10 border border-accent-green/20 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                          Team of 50+
                        </span>
                      </div>

                      <div className="mt-6 flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-xs text-gray-700 dark:text-gray-300 font-medium">
                          <span className="material-symbols-outlined text-sm text-accent-green">check_circle</span>
                          <span>Secured <span className="text-gray-900 dark:text-white font-bold">₹20 Lakh+</span> in corporate sponsorships for tech summits.</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-700 dark:text-gray-300 font-medium">
                          <span className="material-symbols-outlined text-sm text-accent-green">check_circle</span>
                          <span>Orchestrated 3 major hackathons with <span className="text-gray-900 dark:text-white font-bold">500+ participants</span> nationwide.</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-700 dark:text-gray-300 font-medium">
                          <span className="material-symbols-outlined text-sm text-accent-green">check_circle</span>
                          <span>Lead liaison between student body and university administration.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionDiv>

              </div>
            </div>



          </div>
        </div>
      </div>
    </section>
  );
};

export default About;