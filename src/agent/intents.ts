import { posts, projects } from '../data/content';

export type Intent =
  | 'current_role'
  | 'career_timeline'
  | 'devops_stage'
  | 'aiops_stage'
  | 'founders_office'
  | 'skills'
  | 'projects'
  | 'project_details'
  | 'certifications'
  | 'recognition'
  | 'hackathon'
  | 'blog_list'
  | 'blog_post'
  | 'contact'
  | 'linkedin'
  | 'github'
  | 'resume'
  | 'education'
  | 'general_about'
  | 'fallback';

const patterns: { intent: Intent; weight: number; terms: string[] }[] = [
  { intent: 'current_role', weight: 3, terms: ['now', 'currently', 'current role', 'current work', 'doing now', 'right now', 'today', 'these days', 'present role', 'working on now', 'what does he do'] },
  { intent: 'hackathon', weight: 4, terms: ['hackathon', 'ignition', 'won', 'winner', 'winning', 'competition'] },
  { intent: 'recognition', weight: 3, terms: ['recognition', 'award', 'achievement', 'honors', 'honours', 'accolade'] },
  { intent: 'certifications', weight: 4, terms: ['certification', 'certified', 'certifications', 'certificate', 'credential', 'claude architect', 'aws certified', 'oracle'] },
  { intent: 'blog_post', weight: 3, terms: ['kubernetes at the edge', 'latency lessons', 'llm chains', 'resilient llm', 'death of the staging', 'staging environment', 'edge latency'] },
  { intent: 'blog_list', weight: 3, terms: ['blog', 'blogs', 'writing', 'articles', 'posts', 'read', 'field notes'] },
  { intent: 'linkedin', weight: 4, terms: ['linkedin'] },
  { intent: 'github', weight: 4, terms: ['github', 'repo', 'repositories', 'git hub', 'open source'] },
  { intent: 'resume', weight: 4, terms: ['resume', 'résumé', 'cv', 'curriculum'] },
  { intent: 'contact', weight: 3, terms: ['contact', 'reach', 'email', 'phone', 'call', 'talk to', 'get in touch', 'hire', 'available', 'message him'] },
  { intent: 'project_details', weight: 2, terms: ['self-healing', 'self healing', 'cicd', 'ci/cd', 'pipeline', 'mcp', 'inventory', 'sre', 'command center', 'healing cicd'] },
  { intent: 'projects', weight: 3, terms: ['project', 'projects', 'work', 'portfolio', 'built', 'builds', 'case study', 'show his projects'] },
  { intent: 'skills', weight: 3, terms: ['skill', 'skills', 'stack', 'tech', 'technologies', 'tools', 'range', 'help with', 'good at', 'expertise'] },
  { intent: 'aiops_stage', weight: 3, terms: ['aiops', 'ai ops', 'ai operations', 'llm infra', 'rag infra'] },
  { intent: 'devops_stage', weight: 3, terms: ['devops experience', 'devops engineer', 'devops stage', 'devops role', 'infrastructure experience', 'reliability'] },
  { intent: 'founders_office', weight: 3, terms: ["founder's office", 'founders office', 'founder office', 'strategy'] },
  { intent: 'career_timeline', weight: 3, terms: ['career', 'journey', 'timeline', 'experience', 'path', 'progression', 'history', 'background', 'summarise his career', 'summarize his career'] },
  { intent: 'education', weight: 3, terms: ['education', 'college', 'university', 'degree', 'btech', 'b.tech', 'jiet', 'study', 'studied', 'gpa'] },
  { intent: 'general_about', weight: 2, terms: ['about', 'who is', 'who', 'himself', 'bio'] },
];

export function detectProjectId(input: string): string | null {
  const q = input.toLowerCase();
  const matches: [string, RegExp][] = [
    [projects[0].id, /self.?healing|ci.?cd|pipeline/],
    [projects[1].id, /mcp|inventory|cloud assistant/],
    [projects[2].id, /sre|command center|incident/],
  ];
  for (const [id, re] of matches) {
    if (re.test(q)) return id;
  }
  return null;
}

export function detectPostHref(input: string): string | null {
  const q = input.toLowerCase();
  const matches: [string, RegExp][] = [
    [posts[0].href, /kubernetes.*(edge|latency)|edge.*kubernetes|latency lesson/],
    [posts[1].href, /llm chain|resilient llm/],
    [posts[2].href, /staging/],
  ];
  for (const [href, re] of matches) {
    if (re.test(q)) return href;
  }
  return null;
}

export function routeIntent(input: string): Intent {
  const q = ` ${input.toLowerCase().trim()} `;

  const projectId = detectProjectId(q);
  if (projectId && /detail|about|tell|show|open|what|explain|more/.test(q)) {
    return 'project_details';
  }

  const postHref = detectPostHref(q);
  if (postHref) return 'blog_post';

  let best: { intent: Intent; score: number } = { intent: 'fallback', score: 0 };
  for (const { intent, weight, terms } of patterns) {
    let score = 0;
    for (const term of terms) {
      if (q.includes(term)) score += weight + (term.includes(' ') ? 1 : 0);
    }
    if (score > best.score) best = { intent, score };
  }

  if (best.intent === 'fallback' && projectId) return 'project_details';

  if (best.intent === 'projects' && projectId) return 'project_details';

  return best.intent;
}
