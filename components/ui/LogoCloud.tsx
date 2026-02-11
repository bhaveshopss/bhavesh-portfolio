import React from "react";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const row1 = [
  { name: "AWS", src: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg", color: "#FF9900" },
  { name: "Google Cloud", src: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg", color: "#4285F4" },
  { name: "Azure", src: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg", color: "#0078D4" },
  { name: "Kubernetes", src: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg", color: "#326CE5" },
  { name: "Docker", src: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg", color: "#2496ED" },
  { name: "Linux", src: "https://www.vectorlogo.zone/logos/linux/linux-icon.svg", color: "#FCC624" },
  { name: "OpenShift", src: "https://www.vectorlogo.zone/logos/openshift/openshift-icon.svg", color: "#EE0000" },
];

const row2 = [
  { name: "Terraform", src: "https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg", color: "#7B42BC" },
  { name: "Vault", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vault/vault-original.svg", color: "#FFEC6E" },
  { name: "Helm", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg", color: "#0F1689" },
  { name: "ArgoCD", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg", color: "#EF7B4D" },
  { name: "Jenkins", src: "https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg", color: "#D24939" },
  { name: "GitLab", src: "https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg", color: "#FC6D26" },
  { name: "Ansible", src: "https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg", color: "#EE0000" },
];

const row3 = [
  { name: "Python", src: "https://www.vectorlogo.zone/logos/python/python-icon.svg", color: "#3776AB" },
  { name: "Go", src: "https://www.vectorlogo.zone/logos/golang/golang-official.svg", color: "#00ADD8" },
  { name: "Prometheus", src: "https://www.vectorlogo.zone/logos/prometheusio/prometheusio-icon.svg", color: "#E6522C" },
  { name: "Grafana", src: "https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg", color: "#F46800" },
  { name: "Anthropic", src: "https://cdn.simpleicons.org/anthropic/D9B791", color: "#D9B791" },
  { name: "PostgreSQL", src: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg", color: "#336791" },
  { name: "Elastic", src: "https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg", color: "#00C1DE" },
];

const row4 = [
  { name: "TypeScript", src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg", color: "#3178C6" },
  { name: "React", src: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg", color: "#61DAFB" },
  { name: "Node.js", src: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg", color: "#339933" },
  { name: "MongoDB", src: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg", color: "#47A248" },
  { name: "Redis", src: "https://www.vectorlogo.zone/logos/redis/redis-icon.svg", color: "#DC382D" },
  { name: "Kafka", src: "https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg", color: "#231F20" },
  { name: "Nginx", src: "https://www.vectorlogo.zone/logos/nginx/nginx-icon.svg", color: "#009639" },
];

export function LogoCloud({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden border-y border-gray-200 dark:border-white/5 bg-white/50 dark:bg-white/5 flex flex-col", className)}>
      {/* Side Gradients for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-[#030303] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-[#030303] to-transparent z-20 pointer-events-none" />

      <MarqueeRow logos={row1} duration="40s" />
      <MarqueeRow logos={row2} duration="35s" reverse />
      <MarqueeRow logos={row3} duration="45s" />
      <MarqueeRow logos={row4} duration="30s" reverse />

      {/* Decorative Corners */}
      <PlusIcon className="absolute -top-1.5 -left-1.5 w-3 h-3 text-gray-400 dark:text-gray-600 z-30" />
      <PlusIcon className="absolute -top-1.5 -right-1.5 w-3 h-3 text-gray-400 dark:text-gray-600 z-30" />
      <PlusIcon className="absolute -bottom-1.5 -left-1.5 w-3 h-3 text-gray-400 dark:text-gray-600 z-30" />
      <PlusIcon className="absolute -bottom-1.5 -right-1.5 w-3 h-3 text-gray-400 dark:text-gray-600 z-30" />
    </div>
  );
}

function MarqueeRow({ logos, duration, reverse }: { logos: { name: string; src: string; color?: string }[], duration: string, reverse?: boolean }) {
  return (
    <div
      className="flex w-full group border-b last:border-b-0 border-gray-200 dark:border-white/5"
    >
      <div
        className="flex animate-marquee min-w-full shrink-0 items-center gap-0 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {logos.map((logo, i) => (
          <LogoCard key={i} logo={logo} />
        ))}
      </div>
      <div
        className="flex animate-marquee min-w-full shrink-0 items-center gap-0 group-hover:[animation-play-state:paused]"
        aria-hidden="true"
        style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {logos.map((logo, i) => (
          <LogoCard key={`dup-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  )
}

function LogoCard({ logo }: { key?: string | number; logo: { name: string; src: string; color?: string } }) {
  // Cast motion.div to any to avoid type errors
  const MotionDiv = motion.div as any;
  const hoverColor = logo.color || "#00ff41";

  return (
    <div
      className="relative flex h-24 w-32 flex-col items-center justify-center border-r border-gray-200 dark:border-white/5 transition-colors hover:bg-white dark:hover:bg-white/10 shrink-0 group/card"
      style={{ "--hover-color": hoverColor } as React.CSSProperties}
    >
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
        className="flex items-center justify-center w-full h-full relative"
      >
        {/* Pulsing Background Glow */}
        <div className="absolute inset-0 bg-[var(--hover-color)] opacity-0 group-hover/card:opacity-10 blur-xl group-hover/card:animate-pulse transition-opacity duration-500 rounded-full" />

        <img
          src={logo.src}
          alt={logo.name}
          loading="lazy"
          decoding="async"
          width="32"
          height="32"
          className="h-8 w-auto grayscale opacity-40 transition-all duration-300 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-110 group-hover/card:drop-shadow-[0_0_8px_var(--hover-color)] cursor-pointer relative z-10"
        />
      </MotionDiv>
    </div>
  );
}
