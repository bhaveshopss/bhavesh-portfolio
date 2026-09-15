export const identity = {
  name: 'Bhavesh Kumar Parmar',
  shortName: 'Bhavesh',
  role: "Technical Founder's Office",
  company: 'Shellkode',
  location: 'Bangalore, India',
  email: 'workwithbhaveshcc@gmail.com',
  phone: '+91 88905 69447',
  phoneHref: '+918890569447',
  linkedin: 'https://www.linkedin.com/in/bhaveshops/',
  github: 'https://github.com/bhaveshopss',
  resume: '/Bhavesh_Devops_Resume.pdf',
  positioning:
    'Building the systems, intelligence, and technical momentum behind ambitious products.',
  intro:
    'I moved from keeping infrastructure alive, to teaching it to heal itself, to deciding what gets built next. Three roles, one direction: more leverage per decision.',
}

export type TimelineStage = {
  id: string
  role: string
  company: string
  period: string
  start: string
  end: string
  focus: string
  description: string
  points: string[]
  tools: string[]
}

export const timeline: TimelineStage[] = [
  {
    id: 'devops',
    role: 'DevOps Engineer',
    company: 'Shellkode',
    period: 'Feb 2025 to Mar 2026',
    start: '2025-02',
    end: '2026-03',
    focus: 'Infrastructure reliability',
    description:
      'Ran multi-client cloud infrastructure as a managed service, the foundation everything else was built on.',
    points: [
      'Held 99.9% uptime across AWS, Azure, and GCP for managed service clients',
      'Operated 5+ Kubernetes clusters (EKS, GKE) running 50+ containerized microservices',
      'Managed 200+ cloud resources as code with Terraform across multi-tenant environments',
      'Raised deployment frequency 40% with GitOps: ArgoCD, Jenkins, GitHub Actions',
      'Cut cloud spend 20% through FinOps: rightsizing and auto-scaling policies',
      'Dropped MTTD 50% with Prometheus, Grafana, and Datadog observability stacks',
    ],
    tools: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'ArgoCD', 'Prometheus', 'Grafana'],
  },
  {
    id: 'aiops',
    role: 'AIOps Engineer',
    company: 'Shellkode',
    period: 'Mar 2026 to Jul 2026',
    start: '2026-03',
    end: '2026-07',
    focus: 'AI operations',
    description:
      'Turned the infrastructure knowledge into systems that detect, diagnose, and fix before a human opens a dashboard.',
    points: [
      'Deployed and maintained LLM & RAG infrastructure on high-performance compute, sustaining 1,000+ daily API requests for GenAI workloads',
      'Built an autonomous self-healing CI/CD platform: an agent that triages 80%+ of common pipeline errors without human touch',
      'Shipped an Anthropic MCP server for natural-language cloud operations across 15+ AWS accounts',
      'Reduced MTTR 30% by authoring SOPs and building knowledge-sharing loops inside the MSP team',
    ],
    tools: ['LangChain', 'RAG', 'Anthropic MCP', 'Gemini', 'Python', 'AWS Lambda', 'CloudWatch'],
  },
  {
    id: 'founders-office',
    role: "Technical Founder's Office",
    company: 'Shellkode',
    period: 'Aug 2026 to Present',
    start: '2026-08',
    end: 'present',
    focus: 'Technical strategy and execution',
    description:
      'Working at the intersection of technical judgment and company direction, taking the systems view from reliability and AI operations into what gets built, and why.',
    points: [
      'Technical strategy and execution directly alongside the founder',
      'Carrying the reliability and AI-operations lens into company-level decisions',
    ],
    tools: ['Systems architecture', 'Technical due diligence', 'AI strategy', 'Execution'],
  },
]

export type Project = {
  id: string
  index: string
  name: string
  tagline: string
  problem: string
  contribution: string
  impact: { value: string; label: string }[]
  stack: string[]
  link?: string
  linkLabel?: string
}

export const projects: Project[] = [
  {
    id: 'self-healing-cicd',
    index: '01',
    name: 'Autonomous Self-Healing CI/CD',
    tagline: 'Pipelines that fix themselves',
    problem:
      'CI/CD failures stall delivery and burn engineering hours on repetitive triage: reading logs, guessing causes, rerunning builds.',
    contribution:
      'Built a Python agent using LangChain and Gemini Pro that reads build logs, classifies failures, and pushes corrective fixes automatically. Integrated with three CI/CD platforms, provisioned the Kubernetes runtime with Terraform, and shipped a real-time Next.js dashboard for the healing workflow.',
    impact: [
      { value: '80%+', label: 'of common pipeline errors auto-triaged' },
      { value: '94.2%', label: 'downtime reduction' },
      { value: '<2m', label: 'mean time to fix' },
    ],
    stack: ['Python', 'LangChain', 'Gemini', 'Kubernetes', 'Terraform', 'Next.js', 'GitHub Actions'],
    link: 'https://github.com/bhaveshopss/self-healing-cicd-ai-ops-integration',
    linkLabel: 'View repository',
  },
  {
    id: 'cloud-inventory-mcp',
    index: '02',
    name: 'Cloud Inventory Assistant',
    tagline: 'Natural language for 15+ AWS accounts',
    problem:
      'Answering "what do we actually run?" across a multi-account AWS estate meant consoles, scripts, and tribal knowledge.',
    contribution:
      'Engineered an Anthropic Model Context Protocol server that answers natural-language inventory questions across 15+ AWS accounts, with secure cross-account read-only IAM roles for auditing, plus a CLI integration for infrastructure teams.',
    impact: [
      { value: '90%', label: 'faster resource discovery' },
      { value: '15+', label: 'AWS accounts queryable' },
      { value: '100+', label: 'misconfigurations & idle resources flagged' },
    ],
    stack: ['Anthropic MCP', 'Python', 'AWS SDK (Boto3)', 'IAM'],
  },
  {
    id: 'ai-sre-command-center',
    index: '03',
    name: 'AI SRE Command Center',
    tagline: 'Incidents resolved before humans react',
    problem:
      'Production incidents on AWS recurred faster than on-call humans could diagnose them: disk fills, crashing pods, silent degradations.',
    contribution:
      'Wired CloudWatch alarms into Lambda incident handlers that run SSM diagnostics, consult Gemini for root cause, and execute the remediation automatically, with a real-time WebSocket dashboard showing every step.',
    impact: [
      { value: '<3m', label: 'mean time to restore' },
      { value: 'Auto', label: 'detection → diagnosis → remediation' },
      { value: 'Live', label: 'real-time incident dashboard' },
    ],
    stack: ['Python', 'Gemini', 'AWS Lambda', 'CloudWatch', 'SSM', 'WebSockets'],
    link: 'https://github.com/bhaveshopss/Ai-Incident-SRE',
    linkLabel: 'View repository',
  },
]

export type Credential = {
  name: string
  issuer: string
  date: string
  kind: 'certification' | 'award'
  note?: string
}

export const credentials: Credential[] = [
  {
    name: 'Claude Architect',
    issuer: 'Anthropic',
    date: '2026',
    kind: 'certification',
  },
  {
    name: 'Ignition Hackathon Winner',
    issuer: 'Shellkode internal hackathon',
    date: '2026',
    kind: 'award',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'May 2025',
    kind: 'certification',
  },
  {
    name: 'Oracle AI Vector Search Certified Professional',
    issuer: 'Oracle',
    date: 'Apr 2025',
    kind: 'certification',
  },
  {
    name: 'Ubuntu Linux Professional',
    issuer: 'Canonical',
    date: 'Mar 2025',
    kind: 'certification',
  },
  {
    name: 'OCI Foundations Associate',
    issuer: 'Oracle',
    date: 'Feb 2025',
    kind: 'certification',
  },
]

export type SkillGroup = {
  id: string
  title: string
  caption: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    caption: 'Multi-client estates, multi-cloud',
    skills: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'EKS / GKE', 'Docker', 'Helm', 'Karpenter', 'VPC', 'Nginx', 'CloudFront'],
  },
  {
    id: 'platform',
    title: 'DevOps & Platform Engineering',
    caption: 'Ship faster, break less',
    skills: ['Terraform', 'ArgoCD', 'FluxCD', 'Jenkins', 'GitHub Actions', 'Ansible', 'GitOps', 'Vault', 'Trivy', 'OPA'],
  },
  {
    id: 'aiops',
    title: 'AI Operations & Automation',
    caption: 'Systems that operate systems',
    skills: ['LangChain', 'RAG Pipelines', 'Anthropic MCP', 'Vector Databases', 'Ollama', 'Gemini', 'Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry'],
  },
  {
    id: 'engineering',
    title: 'Programming & Data',
    caption: 'The hands behind the leverage',
    skills: ['Python', 'Java', 'Bash', 'TypeScript', 'PostgreSQL', 'DynamoDB', 'Redis', 'Linux Administration'],
  },
]

export const education = {
  school: 'JIET Jodhpur',
  degree: 'B.Tech, Computer Science',
  period: 'Aug 2020 to May 2024',
  gpa: '8.8 / 10',
  leadership: [
    {
      role: 'President, JIET Student Council',
      period: 'Apr 2023 to May 2024',
      detail: 'Led 150+ members; secured ₹20 Lakh in corporate sponsorships.',
    },
    {
      role: 'Secretary, CSE Department',
      period: 'Apr 2022 to Mar 2023',
      detail: 'Organized large-scale technical hackathons; +40% student engagement.',
    },
  ],
}

export type Post = {
  title: string
  date: string
  tags: string[]
  readTime: string
  excerpt: string
  href: string
}

export const posts: Post[] = [
  {
    title: 'Kubernetes at the Edge: Latency Lessons',
    date: 'Jun 2026',
    tags: ['K8s', 'Edge'],
    readTime: '5 min',
    excerpt:
      'Running K3s clusters across distant regions teaches you that the speed of light is the only hard limit when coordinating distributed state.',
    href: '/blog/kubernetes-edge-latency.html',
  },
  {
    title: 'Building Resilient LLM Chains',
    date: 'May 2026',
    tags: ['AI', 'Architecture'],
    readTime: '8 min',
    excerpt:
      'Handling hallucination loops, JSON parsing errors, and context overflow when chaining multiple agents for production reasoning tasks.',
    href: '/blog/resilient-llm-chains.html',
  },
  {
    title: 'The Death of the Staging Environment',
    date: 'Apr 2026',
    tags: ['CI/CD', 'Culture'],
    readTime: '6 min',
    excerpt:
      'Why ephemeral preview environments for every PR accelerated deployment velocity by 40% while reducing regression bugs.',
    href: '/blog/death-of-staging.html',
  },
]

export const aboutParagraphs = [
  'I work in the Technical Founder\'s Office at Shellkode. The path here ran through two disciplines that most companies keep separate: running infrastructure that cannot go down, and building AI systems that operate it.',
  'On the reliability side, I ran multi-client estates across AWS, Azure, and GCP with 99.9% uptime, 200+ resources as code, and FinOps discipline that cut spend 20%. On the AI side, I shipped LLM and RAG infrastructure carrying 1,000+ daily requests, and built agents that triage pipeline failures and resolve incidents before a human opens a dashboard.',
  'The move to the founder\'s office is the same instinct at company altitude: find the constraint, build the system that removes it, and make the decision obvious with evidence. Systems thinking, applied to what gets built, not just how it runs.',
]

export const faqs = [
  {
    q: 'What is Bhavesh Kumar Parmar doing now?',
    a: "He works in the Technical Founder's Office at Shellkode (since August 2026), after moving from DevOps Engineering through AIOps Engineering.",
  },
  {
    q: "What is Bhavesh's career journey at Shellkode?",
    a: "DevOps Engineer until March 2026, AIOps Engineer from March to July 2026, and Technical Founder's Office from August 2026: an intentional progression from infrastructure reliability to AI operations to founder-office execution.",
  },
  {
    q: 'Is Bhavesh available for new roles or freelance work?',
    a: 'He is open to conversations around DevOps, AIOps, and technical founder-office work. Reach him at workwithbhaveshcc@gmail.com or +91 88905 69447.',
  },
  {
    q: 'Which certifications does Bhavesh hold?',
    a: "Claude Architect (Anthropic), AWS Certified Cloud Practitioner (May 2025), Oracle AI Vector Search Certified Professional (Apr 2025), Ubuntu Linux Professional (Mar 2025), and OCI Foundations Associate (Feb 2025). He also won the Ignition Hackathon, Shellkode's internal hackathon.",
  },
  {
    q: 'What projects has Bhavesh built?',
    a: 'An Autonomous Self-Healing CI/CD Platform (LangChain + Gemini agent that auto-triages 80%+ of common pipeline errors), a Cloud Inventory Assistant built on the Anthropic MCP protocol (natural-language queries across 15+ AWS accounts, 90% faster discovery), and an AI SRE Command Center for autonomous AWS incident remediation with sub-3-minute MTTR.',
  },
]

export type RoleCard = {
  id: string
  title: string
  sprite: 'server' | 'robot' | 'crown' | 'shield' | 'cloud' | 'gear'
  strengths: string
  bestUsed: string
  output: string
}

export const roleCards: RoleCard[] = [
  {
    id: 'devops',
    title: 'DevOps Engineer',
    sprite: 'server',
    strengths:
      'Multi-client cloud estates on AWS, Azure, and GCP. Kubernetes (EKS/GKE) operations, Terraform at 200+ resources, GitOps pipelines with ArgoCD and GitHub Actions.',
    bestUsed:
      'Teams that need production to stay at 99.9% uptime while deployment frequency keeps climbing, without headcount growing with it.',
    output:
      'Golden-path pipelines, infrastructure as code, observability stacks, and FinOps policies that cut spend 20%.',
  },
  {
    id: 'aiops',
    title: 'AIOps Engineer',
    sprite: 'robot',
    strengths:
      'LLM & RAG infrastructure on high-performance compute, agentic workflows with LangChain and Gemini, Anthropic MCP servers for safe tool execution.',
    bestUsed:
      'Operations that drown humans, like log triage, incident diagnosis, and cloud inventory, turned into systems that resolve themselves.',
    output:
      'Self-healing CI/CD (80%+ of common errors auto-triaged), AI SRE command center with sub-3-minute MTTR, 1,000+ daily GenAI requests served.',
  },
  {
    id: 'founders-office',
    title: "Technical Founder's Office",
    sprite: 'crown',
    strengths:
      'Systems-level judgment formed across reliability and AI operations. Translates ambiguity into build decisions with evidence.',
    bestUsed:
      'Founders who need technical strategy and execution in the same seat: architecture calls, vendor and build-or-buy, momentum on what matters.',
    output:
      'Decision memos, architecture direction, and shipped work that compounds, not slide decks.',
  },
  {
    id: 'sre',
    title: 'Site Reliability Engineer',
    sprite: 'shield',
    strengths:
      'SLO-driven operations: Prometheus, Grafana, Datadog, OpenTelemetry. Incident response playbooks and postmortems that actually change outcomes.',
    bestUsed:
      'Environments where MTTD and MTTR are board-level numbers: MTTD cut 50%, MTTR cut 30% through SOPs and knowledge loops.',
    output:
      'Alerting that pages only when it matters, dashboards people trust, incident processes the whole team can run.',
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    sprite: 'cloud',
    strengths:
      'Well-architected multi-cloud design across AWS, GCP, and Azure: networking, IAM, VPC, load balancing, CDN, disaster recovery.',
    bestUsed:
      'Greenfield platforms and multi-tenant estates that must be secure, auditable, and cost-modelled from day one.',
    output:
      'Reference architectures, Terraform modules, and security baselines (Vault, Trivy, OPA) ready for audit.',
  },
  {
    id: 'automation',
    title: 'Automation Engineer',
    sprite: 'gear',
    strengths:
      'Python, Java, and Bash tooling that removes toil, across 5+ AWS accounts and every layer from DNS to deploy.',
    bestUsed:
      'Any workflow a team does more than twice a week by hand: provisioning, auditing, reporting, cleanup.',
    output:
      'CLI tools and background agents that quietly do the boring work, like natural-language inventory across 15+ AWS accounts, 90% faster.',
  },
]

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
] as const

export const navLinks = sections.filter((s) => s.id !== 'contact')
