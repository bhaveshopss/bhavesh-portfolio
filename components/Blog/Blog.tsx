import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../ui/ProjectCard';

const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;
const MotionA = motion.a as any;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Kubernetes at the Edge: Latency Lessons",
    excerpt: "Deploying lightweight K3s clusters across 50+ geographic locations taught us that the speed of light is the only hard limit when coordinating distributed state.",
    date: "2024.03.15",
    tags: ["K8S", "EDGE", "DEVOPS"],
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Building Resilient LLM Chains",
    excerpt: "How to handle hallucination loops, JSON parsing errors, and context overflow when chaining multiple agents for complex reasoning tasks in production.",
    date: "2024.02.28",
    tags: ["AI", "LLM", "ARCH"],
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Death of the Staging Environment",
    excerpt: "Why we moved to ephemeral preview environments for every PR and how it accelerated our deployment velocity by 40% while reducing regression bugs.",
    date: "2024.01.10",
    tags: ["CI/CD", "CULTURE"],
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2071&auto=format&fit=crop"
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="relative z-10 py-24 bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <MotionH2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight"
            >
              Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">Dump</span>
            </MotionH2>
            <MotionP
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="font-mono text-sm text-gray-500 dark:text-gray-400 max-w-xl"
            >
                  // LOGS.ARCHIVE_V1 <br />
              Thoughts on distributed systems, AI engineering, and digital entropy.
            </MotionP>
            <MotionDiv
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent-purple mt-4 rounded-full origin-left"
            />
          </div>

          <MotionA
            href="#"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ x: 3 }}
            className="hidden md:flex items-center gap-2 font-mono text-xs font-bold text-gray-900 dark:text-white border-b border-gray-900 dark:border-white pb-1 hover:text-primary dark:hover:text-primary hover:border-primary transition-all cursor-interactive group"
          >
            VIEW_FULL_ARCHIVE
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </MotionA>
        </div>

        {/* Grid */}
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <MotionDiv
              key={post.id}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <ProjectCard
                imgSrc={post.image}
                title={post.title}
                description={post.excerpt}
                link="#"
                linkText={`READ ARTICLE (${post.readTime})`}
                tags={post.tags}
                date={post.date}
              />
            </MotionDiv>
          ))}
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mt-12 text-center md:hidden"
        >
          <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-gray-900 dark:text-white border-b border-gray-900 dark:border-white pb-1 hover:text-primary dark:hover:text-primary hover:border-primary transition-all">
            VIEW_FULL_ARCHIVE <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Blog;