import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  tags?: string[];
  date?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, title, description, link, linkText = "View Project", tags, date, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-card border border-border-light dark:border-white/10 bg-card-light dark:bg-card-dark text-gray-900 dark:text-white shadow-card transition-all duration-400 ease-smooth hover:-translate-y-2 hover:shadow-card-hover hover:shadow-glow-primary hover:border-primary/50",
          className
        )}
        {...props}
      >
        <a href={link} className="absolute inset-0 z-20 focus:outline-none" aria-label={`Read ${title}`}></a>

        {/* Card Image Section */}
        <div className="aspect-video overflow-hidden relative z-10">
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-110 grayscale group-hover:grayscale-0"
            loading="lazy"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

          {/* Date Badge */}
          {date && (
            <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
              <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest">{date}</span>
            </div>
          )}
        </div>

        {/* Card Content Section */}
        <div className="flex flex-1 flex-col p-6 relative z-10">
          <div className="flex flex-wrap gap-2 mb-3">
             {tags?.map((tag, i) => (
               <span key={i} className="font-mono text-[9px] font-bold text-primary uppercase tracking-wider border border-primary/20 bg-primary/5 px-2 py-0.5 rounded">
                 {tag}
               </span>
             ))}
          </div>

          <h3 className="text-xl font-display font-bold transition-colors duration-300 group-hover:text-primary uppercase tracking-tight mb-2 leading-tight">
            {title}
          </h3>
          <p className="flex-1 text-sm text-gray-600 dark:text-gray-400 font-mono leading-relaxed mb-6">
            {description}
          </p>
          
          {/* Card Link/CTA */}
          <div
            className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white transition-all duration-300 group-hover:text-primary group-hover:gap-3"
          >
            {linkText}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };