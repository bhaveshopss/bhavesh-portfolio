# Research Notes — Portfolio Rebuild (Aug 2026)

Only verified facts below. Each item carries its source. Gaps are listed at the end.

## Identity

| Fact | Value | Source |
|---|---|---|
| Name | Bhavesh Kumar Parmar | GitHub API, resume PDF, current site |
| Location | Bangalore, IN | GitHub API (`location: Bangalore`), resume header |
| Email (site/GitHub in use) | workwithbhavesh@gmail.com | current site footer/contact, mailto links |
| Email (resume) | workwithbhaveshcc@gmail.com | resume PDF header — ⚠ conflicts with site email |
| Phone | +918890569447 | resume PDF — not currently published on site; privacy default: omit |
| LinkedIn | https://www.linkedin.com/in/bhaveshops/ | current site, resume |
| GitHub | https://github.com/bhaveshopss | GitHub API, resume |
| Domain | https://bhaveshops.in | GitHub profile `blog` field, current site canonical |
| GitHub bio | "Universal Infrastructure as Code. Your Cloud, Your Language, Your Way" | GitHub API |
| Hireable flag | true | GitHub API |
| Public repos | 20 | GitHub API |

## Career timeline (user-provided, treated as authoritative)

1. **DevOps Engineer, Shellkode** — until March 2026 (joined Feb 2025 per resume)
2. **AIOps Engineer, Shellkode** — March 2026 – July 2026
3. **Technical Founder's Office, Shellkode** — August 2026 – present

Resume (updated Feb 2026) lists the current role as "Cloud Engineer" with scope below;
scope/outcomes are distributed across the three stages. Narrative: infrastructure
reliability → AI operations → founder-office technical strategy (user-mandated framing).

## Shellkode scope + outcomes (resume PDF, Feb 2026)

- Multi-client cloud infrastructure across AWS, Azure, GCP — 99.9% uptime, rapid incident response (MSP context)
- 5+ Kubernetes clusters (EKS, GKE) with Helm; 50+ containerized microservices in production
- Deployment frequency +40% via GitOps (ArgoCD, Jenkins, GitHub Actions, GCP Cloud Build)
- Terraform IaC managing 200+ cloud resources across multi-tenant environments
- Cost reduction 20% via FinOps (rightsizing, auto-scaling)
- Observability stacks: Prometheus, Grafana, Datadog — MTTD reduced 50%
- LLM & RAG infrastructure on high-performance compute — 1,000+ daily API requests for GenAI workloads
- MTTR reduced 30% via SOPs + knowledge sharing within MSP team

## Earlier experience (resume PDF)

- Independent Projects (Remote), Cloud Engineer — June 2024 – Jan 2025
  - 20+ AWS resources via Terraform (EC2, S3, Lambda, VPC)
  - 3+ K8s clusters (Kind, EKS); 10+ apps containerized (Docker, Helm)
  - Automation in Python, Java, Bash across 5+ AWS accounts

## Projects (verified — names/descriptions from resume + GitHub repos)

1. **Autonomous Self-Healing CI/CD Platform**
   - Resume: Python agent (LangChain + Gemini Pro) analyzing build logs; auto-triage for 80%+ of common CI/CD errors; multi-cloud CI/CD integration across 3 platforms (GitHub Actions, Jenkins, AWS CodePipeline); K8s via Terraform; real-time Next.js dashboard
   - GitHub: https://github.com/bhaveshopss/self-healing-cicd-ai-ops-integration ("autonomous DevOps platform… automatically submits code fixes via Pull Requests")
2. **Cloud Inventory Assistant (Anthropic MCP Server)**
   - Resume: MCP server for natural-language queries across 15+ AWS accounts; resource discovery time −90%; cross-account read-only IAM auditing; 100+ security group misconfigurations + idle resources detected; CLI integration
3. **AI SRE Command Center**
   - GitHub: https://github.com/bhaveshopss/Ai-Incident-SRE (6★): "AI-powered Self-Healing Infrastructure — automated incident detection, diagnosis, remediation on AWS using Gemini, Lambda, CloudWatch, real-time SRE Command Center dashboard"
   - Prior portfolio carried the same project (no live demo links existed)
4. **Additional real repos (available for "more work" links):**
   - https://github.com/bhaveshopss/idp-platform — "AI-Native Internal Developer Platform — Backstage, EKS, ArgoCD, Gemini, OPA Gatekeeper"
   - https://github.com/bhaveshopss/ai-code-monitor — "Real-time monitoring dashboard for AI coding agents — tokens, costs, latency for Claude Code, OpenCode" (5★, MIT)
   - https://github.com/bhaveshopss/RCA-Agent — root cause analysis agent (no description)

## Credentials

| Credential | Date | Source |
|---|---|---|
| Claude Architect | 2026 (date TBD) | user statement — issuer/URL unverified |
| Ignition Hackathon — Winner (internal Shellkode hackathon) | date TBD | user statement |
| AWS Certified Cloud Practitioner | May 2025 | resume + prior portfolio |
| Oracle AI Vector Professional Certified | Apr 2025 | resume + prior portfolio |
| Ubuntu Linux Professional | Mar 2025 | prior portfolio (cert PDF links were broken; no link) |
| OCI Foundations Associate | Feb 2025 | prior portfolio (cert PDF links were broken; no link) |

## Education & leadership (resume PDF)

- B.Tech, Computer Science, JIET Jodhpur — **Aug 2020 – May 2024** per resume
  ⚠ prior portfolio said "2021 – 2025" — conflict to resolve
- President, JIET Student Council — Apr 2023 – May 2024; led 150+ members; ₹20 Lakh corporate sponsorships
  ⚠ prior portfolio said "Team of 50+" — conflict (resume wins unless user says otherwise)
- Secretary, CSE Department — Apr 2022 – Mar 2023; organized large-scale technical hackathons, +40% student engagement

## Skills (resume PDF — full verified matrix)

- Cloud: AWS (EC2, EKS, Lambda, S3, IAM, VPC, RDS, CloudFormation), GCP (GKE, Cloud Storage, Cloud Build, IAM), Azure
- Containers: Kubernetes, Docker, Helm, Karpenter, ECR, Docker Compose
- CI/CD & GitOps: Jenkins, GitHub Actions, ArgoCD, FluxCD, Terraform, Ansible
- Networking: VPC, DNS, Load Balancing, VPN, CloudFront, Nginx
- Observability: Prometheus, Grafana, Datadog, OpenTelemetry, Loki, CloudWatch
- DevSecOps: Trivy, SonarQube, HashiCorp Vault, OPA, Checkov
- Databases: PostgreSQL, DynamoDB, Redis
- AIOps: LangChain, RAG Pipelines, Anthropic MCP, Vector Databases, Ollama
- Programming: Python, Java, Bash, YAML, JSON, Linux Administration

## Blog posts (existing, real — current site /blog/*.html)

1. Kubernetes at the Edge: Latency Lessons — 2024.03.15
2. Building Resilient LLM Chains — 2024.02.28
3. The Death of the Staging Environment — 2024.01.10

## Zamp.ai design research (inspiration only — no copying)

- Giant lowercase kinetic wordmark filling viewport; short bold tagline directly under it
- Fixed nav: backdrop-blur, tiny 15px/medium/-2% tracking links, two pill CTAs (ghost + solid), mono font (Geist Mono) on buttons
- Massive whitespace; editorial rhythm; minimal borders; content-first
- One saturated accent used in large blocks; otherwise near-monochrome
- Dark-mode pairings observed: #F5F5F5 text / #302F37 secondary / black surfaces

## Gaps / conflicts to confirm with owner

1. Email: workwithbhavesh@gmail.com (site) vs workwithbhaveshcc@gmail.com (resume)
2. Education dates: Aug 2020 – May 2024 (resume) vs 2021 – 2025 (old portfolio); GPA 8.8/10 appears only on old portfolio
3. Claude Architect: issuer (Anthropic?), issue date, credential URL
4. Ignition Hackathon: winning project name / date (optional)
5. Phone number: publish or omit (default omit)

## Resolutions (owner confirmed, Aug 2026)

1. Email: **workwithbhaveshcc@gmail.com** (resume version) — feature this
2. Education: **Aug 2020 – May 2024** (resume); GPA 8.8/10 retained from old portfolio
3. Claude Architect: issuer **Anthropic**, no credential link shown
4. Phone: **include** +91 88905 69447
