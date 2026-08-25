import {
  identity,
  timeline,
  projects,
  credentials,
  skillGroups,
  posts,
  education,
} from '../data/content';

export type AgentAction =
  | { type: 'scroll'; target: string }
  | { type: 'openBlogList' }
  | { type: 'openBlogPost'; postId: string }
  | { type: 'openProject'; projectId: string }
  | { type: 'contact' };

export type ExternalLink = { label: string; url: string };

export type AgentReply = {
  text: string;
  action?: AgentAction;
  chips?: { label: string; action: AgentAction }[];
  external?: ExternalLink[];
};

export const currentStage = timeline[timeline.length - 1];

export const stageById = (id: string) => timeline.find((s) => s.id === id);
export const projectById = (id: string) => projects.find((p) => p.id === id);
export const postById = (id: string) => posts.find((p) => p.href === id);

export const knowledgeSummary = {
  now: `${identity.name.split(' ')[0]} works in the ${identity.role} at ${identity.company} — since August 2026. The path ran DevOps Engineer (until March 2026) → AIOps Engineer (March–July 2026) → Technical Founder's Office. The short version: infrastructure reliability, then AI operations, now technical strategy and execution alongside the founder.`,
  career: `Three stages at ${identity.company}: DevOps Engineer (Feb 2025 – Mar 2026) holding 99.9% uptime across AWS/Azure/GCP with 5+ Kubernetes clusters and 200+ Terraform-managed resources; AIOps Engineer (Mar – Jul 2026) running LLM & RAG infrastructure at 1,000+ daily requests and building self-healing systems; Technical Founder's Office (Aug 2026 – present) on technical strategy and execution.`,
  skills: `Four areas: Cloud & Infrastructure (AWS, GCP, Azure, Kubernetes, Terraform), DevOps & Platform Engineering (ArgoCD, GitOps, Jenkins, Vault), AI Operations (LangChain, RAG, Anthropic MCP, observability with Prometheus/Grafana/Datadog), and Programming (Python, Java, Bash, TypeScript).`,
  projects: `Three featured builds: the Autonomous Self-Healing CI/CD platform (auto-triages 80%+ of common pipeline errors), the Cloud Inventory Assistant on Anthropic MCP (natural-language queries across 15+ AWS accounts, 90% faster discovery), and the AI SRE Command Center (autonomous AWS incident remediation, sub-3-minute MTTR).`,
  credentials: `Claude Architect (Anthropic), winner of Ignition — Shellkode's internal hackathon — plus AWS Certified Cloud Practitioner, Oracle AI Vector Search Professional, Ubuntu Linux Professional, and OCI Foundations Associate.`,
  contact: `Email: ${identity.email} · Phone: ${identity.phone} · LinkedIn: in/bhaveshops · GitHub: bhaveshopss. Based in ${identity.location}.`,
  about: `${identity.name} — ${identity.role} at ${identity.company}, based in ${identity.location}. B.Tech in Computer Science from JIET Jodhpur (2020–2024). The through-line: find the constraint, build the system that removes it — from uptime and FinOps to self-healing agents to company-level technical decisions.`,
  fallback: `I don't have a verified answer for that yet — here's where you can explore more.`,
}

export function buildReplies(): Record<string, AgentReply> {
  return {
    current_role: {
      text: `Right now ${identity.shortName} is in the ${currentStage.role} at ${identity.company} — since August 2026. Before that: AIOps Engineer (Mar–Jul 2026) and DevOps Engineer (Feb 2025 – Mar 2026). The progression is intentional: reliability → AI operations → founder-office execution.`,
      action: { type: 'scroll', target: 'career' },
      chips: [
        { label: 'Show the full timeline', action: { type: 'scroll', target: 'career' } },
        { label: 'What does he work on?', action: { type: 'scroll', target: 'about' } },
      ],
    },
    career_timeline: {
      text: `Three stages, one direction:\n\n1 · DevOps Engineer — Feb 2025 to Mar 2026. 99.9% uptime across AWS, Azure, GCP; 5+ Kubernetes clusters; 200+ resources as code; deploy frequency +40%; cloud spend −20%.\n\n2 · AIOps Engineer — Mar to Jul 2026. LLM & RAG infrastructure at 1,000+ daily requests; self-healing CI/CD; MCP server for 15+ AWS accounts; MTTR −30%.\n\n3 · Technical Founder's Office — Aug 2026 to now. Technical strategy and execution alongside the founder.`,
      action: { type: 'scroll', target: 'career' },
      chips: [
        { label: 'Show DevOps stage', action: { type: 'scroll', target: 'career' } },
        { label: 'Show his projects', action: { type: 'openProject', projectId: projects[0].id } },
      ],
    },
    devops_stage: {
      text: `As DevOps Engineer at ${identity.company} (Feb 2025 – Mar 2026) he ran multi-client infrastructure: 99.9% uptime across AWS, Azure, and GCP; 5+ Kubernetes clusters (EKS, GKE) with 50+ microservices; 200+ Terraform-managed resources; GitOps raising deploy frequency 40%; FinOps cutting spend 20%; observability dropping MTTD 50%.`,
      action: { type: 'scroll', target: 'career' },
    },
    aiops_stage: {
      text: `As AIOps Engineer (Mar – Jul 2026) he deployed LLM & RAG infrastructure sustaining 1,000+ daily API requests for GenAI workloads, built the self-healing CI/CD agent and the Anthropic MCP inventory server, and cut MTTR 30% through SOPs and knowledge-sharing loops.`,
      action: { type: 'scroll', target: 'career' },
    },
    founders_office: {
      text: `Since August 2026 he's been in the Technical Founder's Office at ${identity.company} — technical strategy and execution directly alongside the founder, carrying the reliability and AI-operations lens into company-level decisions.`,
      action: { type: 'scroll', target: 'career' },
    },
    skills: {
      text: `Four areas of verified range:\n\n· Cloud & Infrastructure — AWS, GCP, Azure, Kubernetes, Docker, Helm\n· DevOps & Platform — Terraform, ArgoCD, FluxCD, Jenkins, Vault\n· AI Operations — LangChain, RAG, Anthropic MCP, Prometheus, Grafana, Datadog\n· Programming — Python, Java, Bash, TypeScript, PostgreSQL`,
      action: { type: 'scroll', target: 'range' },
      chips: [
        { label: 'What has he built with these?', action: { type: 'scroll', target: 'work' } },
      ],
    },
    projects: {
      text: `Three featured systems:\n\n01 · Autonomous Self-Healing CI/CD — auto-triages 80%+ of common pipeline errors, 94.2% downtime reduction.\n02 · Cloud Inventory Assistant (Anthropic MCP) — natural-language queries across 15+ AWS accounts, 90% faster discovery.\n03 · AI SRE Command Center — autonomous AWS incident remediation, MTTR under 3 minutes.`,
      action: { type: 'scroll', target: 'work' },
      chips: [
        { label: 'Open the first project', action: { type: 'openProject', projectId: projects[0].id } },
        { label: 'See his stack', action: { type: 'scroll', target: 'range' } },
      ],
    },
    certifications: {
      text: `Verified credentials: Claude Architect (Anthropic, 2026), AWS Certified Cloud Practitioner (May 2025), Oracle AI Vector Search Certified Professional (Apr 2025), Ubuntu Linux Professional (Mar 2025), and OCI Foundations Associate (Feb 2025).`,
      action: { type: 'scroll', target: 'credentials' },
    },
    hackathon: {
      text: `He won Ignition — ${identity.company}'s internal hackathon (2026), first place across the company. It's featured alongside his certifications in the credentials section.`,
      action: { type: 'scroll', target: 'credentials' },
      chips: [{ label: 'Show certifications', action: { type: 'scroll', target: 'credentials' } }],
    },
    recognition: {
      text: `Two highlights: winner of Ignition (Shellkode's internal hackathon, 2026) and Claude Architect certified by Anthropic (2026). Earlier: President of the JIET Student Council — led 150+ members and secured ₹20 Lakh in sponsorships.`,
      action: { type: 'scroll', target: 'credentials' },
    },
    blog_list: {
      text: `Three published field notes — opening them here:`,
      action: { type: 'openBlogList' },
    },
    contact: {
      text: `Direct lines:\n\n· Email — ${identity.email}\n· Phone — ${identity.phone}\n· Location — ${identity.location}\n\nHe's open to conversations around DevOps, AIOps, and technical founder-office work. Scrolling you to contact:`,
      action: { type: 'scroll', target: 'contact' },
      external: [
        { label: 'Email him', url: `mailto:${identity.email}` },
        { label: 'LinkedIn', url: identity.linkedin },
      ],
    },
    linkedin: {
      text: `His LinkedIn is linked below — it opens in a new tab once you click:`,
      external: [{ label: 'Open LinkedIn — in/bhaveshops', url: identity.linkedin }],
      chips: [{ label: 'Find his GitHub instead', action: { type: 'scroll', target: 'contact' } }],
    },
    github: {
      text: `His GitHub is @bhaveshopss — 20 public repositories including the AI SRE Command Center and the self-healing CI/CD platform. Opens in a new tab on your click:`,
      external: [{ label: 'Open GitHub — @bhaveshopss', url: identity.github }],
    },
    resume: {
      text: `His résumé (PDF, updated Feb 2026) opens in a new tab on your click:`,
      external: [{ label: 'Open résumé (PDF)', url: identity.resume }],
    },
    general_about: {
      text: `${identity.name} — ${identity.role} at ${identity.company}, based in ${identity.location}. B.Tech in Computer Science from JIET Jodhpur (2020–2024). The through-line across everything: find the constraint, build the system that removes it — from 99.9% uptime and FinOps, to self-healing agents, to company-level technical decisions.`,
      action: { type: 'scroll', target: 'about' },
      chips: [
        { label: 'Career journey', action: { type: 'scroll', target: 'career' } },
        { label: 'Selected projects', action: { type: 'scroll', target: 'work' } },
      ],
    },
    education: {
      text: `B.Tech in Computer Science from JIET Jodhpur (Aug 2020 – May 2024), GPA 8.8/10. Along the way: President of the Student Council (150+ members, ₹20 Lakh in sponsorships) and Secretary of the CSE Department.`,
      action: { type: 'scroll', target: 'range' },
    },
    fallback: {
      text: knowledgeSummary.fallback,
      chips: [
        { label: 'What is he doing now?', action: { type: 'scroll', target: 'career' } },
        { label: 'Show projects', action: { type: 'scroll', target: 'work' } },
        { label: 'Explore the blog', action: { type: 'openBlogList' } },
        { label: 'Contact', action: { type: 'scroll', target: 'contact' } },
      ],
    },
  };
}

export function projectReply(projectId: string): AgentReply | null {
  const project = projectById(projectId);
  if (!project) return null;
  const impact = project.impact.map((m) => `${m.value} ${m.label}`).join(' · ');
  return {
    text: `${project.name} — ${project.tagline}.\n\nProblem: ${project.problem}\n\nContribution: ${project.contribution}\n\nImpact: ${impact}\n\nStack: ${project.stack.join(', ')}.`,
    action: { type: 'scroll', target: 'work' },
    external: project.link
      ? [{ label: project.linkLabel ?? 'View repository', url: project.link }]
      : undefined,
    chips: [
      ...(projects.find((p) => p.id !== projectId)
        ? [{ label: 'Next project', action: { type: 'openProject', projectId: projects.find((p) => p.id !== projectId)!.id } as AgentAction }]
        : []),
      { label: 'See all projects', action: { type: 'scroll', target: 'work' } },
    ],
  };
}

export const promptChips = [
  { label: 'What is Bhavesh doing now?', action: { type: 'scroll', target: 'career' } as AgentAction },
  { label: 'Show selected projects', action: { type: 'scroll', target: 'work' } as AgentAction },
  { label: 'Explore the blog', action: { type: 'openBlogList' } as AgentAction },
  { label: 'Tell me about the hackathon', action: { type: 'scroll', target: 'credentials' } as AgentAction },
  { label: 'How can I contact him?', action: { type: 'scroll', target: 'contact' } as AgentAction },
];

export const greeting =
  "Hi, I'm Bhavesh's digital concierge. Ask about his work, projects, certifications, or career journey.";

export { education };
