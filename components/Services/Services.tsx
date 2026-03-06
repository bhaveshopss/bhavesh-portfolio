import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;

const services = [
  {
    icon: 'rocket_launch',
    title: 'CI/CD Automation',
    description: 'Zero-downtime deployments with self-healing pipelines. GitHub Actions, Jenkins, ArgoCD with automated rollback and canary releases.',
    tags: ['GitHub Actions', 'Jenkins', 'ArgoCD'],
    color: '#6366f1',
    stat: '50+ Pipelines',
  },
  {
    icon: 'deployed_code',
    title: 'Infrastructure as Code',
    description: 'Reproducible, version-controlled infrastructure. Multi-cloud provisioning with drift detection and policy-as-code guardrails.',
    tags: ['Terraform', 'Ansible', 'CloudFormation'],
    color: '#a855f7',
    stat: '200+ Resources',
  },
  {
    icon: 'view_in_ar',
    title: 'Container Orchestration',
    description: 'Production-grade Kubernetes clusters with auto-scaling, service mesh, and GitOps-driven deployments across hybrid environments.',
    tags: ['Kubernetes', 'Docker', 'Helm', 'Istio'],
    color: '#3b82f6',
    stat: '99.9% Uptime',
  },
  {
    icon: 'cloud_circle',
    title: 'Cloud Architecture',
    description: 'Multi-cloud solutions on AWS, GCP, and Azure. Cost-optimized, well-architected designs with disaster recovery built in.',
    tags: ['AWS', 'GCP', 'Azure', 'VPC'],
    color: '#10b981',
    stat: '40% Cost Saved',
  },
  {
    icon: 'monitoring',
    title: 'Observability & SRE',
    description: 'Full-stack observability with metrics, logs, and traces. SLO-driven alerting with automated incident response and postmortems.',
    tags: ['Prometheus', 'Grafana', 'ELK', 'PagerDuty'],
    color: '#f59e0b',
    stat: '<3min MTTR',
  },
  {
    icon: 'shield_lock',
    title: 'DevSecOps',
    description: 'Security baked into every pipeline stage. SAST/DAST scanning, secrets management, vulnerability remediation, and compliance automation.',
    tags: ['Vault', 'Trivy', 'OPA', 'RBAC'],
    color: '#ef4444',
    stat: 'Zero Breaches',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/** Lightweight 3D tilt card — uses refs + direct DOM, zero re-renders */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.08), transparent 60%)`;
      glowRef.current.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {/* Dynamic light reflection layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-card-lg pointer-events-none z-20 transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-white dark:bg-[#080808] border-t border-gray-200 dark:border-white/5" id="services">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <MotionH2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-3xl md:text-5xl text-gray-900 dark:text-white uppercase font-bold tracking-tight"
          >
            What I <span className="text-primary">Engineer</span>
          </MotionH2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="text-gray-600 dark:text-text-high-contrast max-w-2xl mx-auto font-medium text-base font-mono mt-4"
          >
            End-to-end reliability engineering — from code commit to production observability.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="w-24 h-1 bg-gradient-to-r from-primary via-accent-purple to-primary mx-auto mt-6 rounded-full"
          />
        </div>

        {/* Grid */}
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {services.map((service) => (
            <MotionDiv
              key={service.title}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <TiltCard
                className="group relative overflow-hidden bg-gray-50 dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-card-lg p-6 hover:border-gray-300 dark:hover:border-white/20 cursor-interactive h-full"
              >
                {/* Hover glow from service color */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}08, transparent 70%)` }}
                />

                <div className="relative z-10">
                  {/* Icon + Stat */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-card flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        backgroundColor: `${service.color}10`,
                        borderColor: `${service.color}30`,
                        boxShadow: `0 0 0px ${service.color}00`,
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ color: service.color }}
                      >
                        {service.icon}
                      </span>
                    </div>
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-badge border"
                      style={{
                        color: service.color,
                        backgroundColor: `${service.color}10`,
                        borderColor: `${service.color}25`,
                      }}
                    >
                      {service.stat}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg text-gray-900 dark:text-white font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-mono text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                />
              </TiltCard>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

export default Services;
