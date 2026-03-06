import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: string;
  color: string;
  description: string;
}

const metrics: Metric[] = [
  { label: 'Deployments', value: 520, suffix: '+', icon: 'rocket_launch', color: '#6366f1', description: 'Production deploys this year' },
  { label: 'Uptime SLA', value: 99.97, suffix: '%', icon: 'verified', color: '#10b981', description: 'Across all managed services' },
  { label: 'MTTR', value: 2.8, suffix: 'min', prefix: '<', icon: 'speed', color: '#f59e0b', description: 'Mean time to recovery' },
  { label: 'Pipelines', value: 48, suffix: '+', icon: 'conversion_path', color: '#3b82f6', description: 'Automated CI/CD workflows' },
  { label: 'Cost Optimized', value: 40, suffix: '%', icon: 'savings', color: '#a855f7', description: 'Infrastructure cost reduction' },
  { label: 'Auto-Healed', value: 85, suffix: '%', icon: 'healing', color: '#ef4444', description: 'Incidents resolved without human intervention' },
];

const incidents = [
  { time: '03:42:18', type: 'RESOLVED', message: 'Pod CrashLoopBackOff auto-remediated', service: 'api-gateway', color: '#10b981' },
  { time: '03:38:05', type: 'ALERT', message: 'CPU spike detected on node-pool-3', service: 'k8s-cluster', color: '#f59e0b' },
  { time: '03:35:51', type: 'DEPLOY', message: 'Canary v2.14.3 promoted to stable', service: 'payment-svc', color: '#6366f1' },
  { time: '03:31:22', type: 'SCALED', message: 'HPA scaled replicas 3 -> 8', service: 'auth-service', color: '#3b82f6' },
  { time: '03:28:44', type: 'RESOLVED', message: 'Certificate renewal completed', service: 'ingress-nginx', color: '#10b981' },
  { time: '03:24:10', type: 'ALERT', message: 'Disk usage 87% on logging-vol', service: 'elk-stack', color: '#f59e0b' },
  { time: '03:21:33', type: 'DEPLOY', message: 'Terraform plan applied (12 changes)', service: 'infra-prod', color: '#6366f1' },
  { time: '03:18:07', type: 'RESOLVED', message: 'Memory leak patched, pods recycled', service: 'worker-queue', color: '#10b981' },
];

const CountUp: React.FC<{ target: number; suffix: string; prefix?: string; active: boolean; decimals?: number }> = ({ target, suffix, prefix, active, decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return <>{prefix}{display}{suffix}</>;
};

const MetricsDashboard: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative z-10 py-16 md:py-24 bg-gray-50 dark:bg-[#050505] border-t border-gray-200 dark:border-white/5" id="ops" ref={ref}>
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
            Operations <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-green to-accent-green">Dashboard</span>
          </MotionH2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="text-gray-600 dark:text-text-high-contrast max-w-2xl mx-auto font-medium text-base font-mono mt-4"
          >
            Real-world impact metrics from production infrastructure.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="w-24 h-1 bg-gradient-to-r from-terminal-green/50 via-accent-green to-terminal-green/50 mx-auto mt-6 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

          {/* Metrics Grid */}
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {metrics.map((metric) => (
              <MotionDiv
                key={metric.label}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="group relative bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-card-lg p-5 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${metric.color}08, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ color: metric.color }}
                    >
                      {metric.icon}
                    </span>
                    <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                      {metric.label}
                    </span>
                  </div>

                  <div className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 tabular-nums">
                    <CountUp
                      target={metric.value}
                      suffix={metric.suffix}
                      prefix={metric.prefix}
                      active={isInView}
                      decimals={metric.value % 1 !== 0 ? 2 : 0}
                    />
                  </div>

                  <p className="font-mono text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                    {metric.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)` }}
                />
              </MotionDiv>
            ))}
          </MotionDiv>

          {/* Live Incident Feed */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-4"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-card-lg overflow-hidden h-full flex flex-col">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 font-bold tracking-widest uppercase">incident_feed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse"></div>
                  <span className="font-mono text-[10px] text-terminal-green font-bold tracking-widest">LIVE</span>
                </div>
              </div>

              {/* Feed */}
              <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

                <div className="h-full max-h-[400px] overflow-hidden">
                  <div className="animate-scroll-log space-y-0 p-3">
                    {[...incidents, ...incidents].map((incident, i) => (
                      <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                        <span className="font-mono text-[9px] text-gray-600 whitespace-nowrap mt-0.5 tabular-nums">
                          {incident.time}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className="font-mono text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                              style={{
                                color: incident.color,
                                backgroundColor: `${incident.color}15`,
                              }}
                            >
                              {incident.type}
                            </span>
                            <span className="font-mono text-[9px] text-gray-600 truncate">
                              {incident.service}
                            </span>
                          </div>
                          <p className="font-mono text-[10px] text-gray-400 truncate">
                            {incident.message}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center text-terminal-green py-2">
                      <span className="font-mono text-[10px] mr-1">{'>'}</span>
                      <span className="animate-pulse font-mono text-[10px]">_</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] flex justify-between items-center">
                <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">Last 24h</span>
                <span className="font-mono text-[9px] text-terminal-green font-bold uppercase tracking-wider">All Systems Nominal</span>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Status Bar */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {[
            { label: 'AWS', status: 'Operational', color: '#10b981' },
            { label: 'GCP', status: 'Operational', color: '#10b981' },
            { label: 'Kubernetes', status: 'Healthy', color: '#10b981' },
            { label: 'CI/CD', status: 'Running', color: '#6366f1' },
            { label: 'Monitoring', status: 'Active', color: '#f59e0b' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                {item.label}:
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: item.color }}>
                {item.status}
              </span>
            </div>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

export default MetricsDashboard;
