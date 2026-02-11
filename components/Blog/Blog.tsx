import React from 'react';
import { ProjectCard } from '../ui/ProjectCard';

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
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight">
              Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">Dump</span>
            </h2>
            <p className="font-mono text-sm text-gray-500 dark:text-gray-400 max-w-xl">
                  // LOGS.ARCHIVE_V1 <br />
              Thoughts on distributed systems, AI engineering, and digital entropy.
            </p>
          </div>

          <a href="#" className="hidden md:flex items-center gap-2 font-mono text-xs font-bold text-gray-900 dark:text-white border-b border-gray-900 dark:border-white pb-1 hover:text-primary dark:hover:text-primary hover:border-primary transition-all cursor-interactive group">
            VIEW_FULL_ARCHIVE
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <ProjectCard
              key={post.id}
              imgSrc={post.image}
              title={post.title}
              description={post.excerpt}
              link="#"
              linkText={`READ ARTICLE (${post.readTime})`}
              tags={post.tags}
              date={post.date}
            />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-gray-900 dark:text-white border-b border-gray-900 dark:border-white pb-1 hover:text-primary dark:hover:text-primary hover:border-primary transition-all">
            VIEW_FULL_ARCHIVE <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;