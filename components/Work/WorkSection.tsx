import React from 'react';
import CodeXRay from './CodeXRay';
import LiveTerminal from './LiveTerminal';
import { XRayNode } from '../../types';

const WorkSection: React.FC = () => {
  // Project 1 Data
  const nodes1: XRayNode[] = [
    { id: '1', label: 'DEVELOPER', subLabel: 'Input', type: 'developer', x: 15, y: 50, codeLanguage: 'python', codeSnippet: `def trigger_event(payload):\n  if payload.status != 'ok':\n    logger.error('Anomaly detected')\n    return initiate_protocol(payload)` },
    { id: '2', label: 'GITHUB REPO', subLabel: 'Source', type: 'default', x: 35, y: 50, codeLanguage: 'yaml', codeSnippet: `name: CI/CD Pipeline\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3` },
    { id: '3', label: 'CI/CD PIPELINE', subLabel: 'Process', type: 'process', x: 55, y: 30, codeLanguage: 'groovy', codeSnippet: `pipeline {\n    agent any\n    stages {\n        stage('Build') {\n            steps {\n                sh 'make build'\n            }\n        }\n    }\n}` },
    { id: '4', label: 'AI BRAIN', subLabel: 'Gemini 3 Pro', type: 'ai', x: 75, y: 50, codeLanguage: 'python', codeSnippet: `import google.generativeai as genai\n\nmodel = genai.GenerativeModel('gemini-pro')\nresponse = model.generate_content(\n    'Analyze this log and suggest a fix'\n)\nprint(response.text)` },
    { id: '5', label: 'AUTO-HEAL JOB', subLabel: 'Action', type: 'developer', x: 55, y: 70, codeLanguage: 'bash', codeSnippet: `#!/bin/bash\n# Auto-remediation script\nkubectl rollout restart deployment/api\necho 'Deployment restarted'` },
  ];

  const logs1 = (
    <>
      <p className="text-gray-400">INITIALIZING LOG_STREAM...</p>
      <p className="text-gray-500">FETCHING CLOUD_METRICS...</p>
      <p className="text-accent-blue font-bold">K8S_POD: RESTARTING...</p>
      <p className="text-gray-400">GEMINI_PRO: ANALYZING ROOT_CAUSE...</p>
      <p className="text-terminal-green font-bold">FIX_DEPLOYED: SUCCESS</p>
      <p className="text-gray-300">MCP_PROTOCOL: TOOL_CALL SUCCESSFUL</p>
      <p className="text-gray-500">UPLOADING TELEMETRY...</p>
      <p className="text-gray-400">WAITING FOR NEXT TRIGGER...</p>
      <p>FETCHING CLOUD_METRICS...</p>
      <p className="text-accent-blue font-bold">K8S_POD: RESTARTING...</p>
      <p>GEMINI_PRO: ANALYZING ROOT_CAUSE...</p>
    </>
  );

  const connections1 = (
    <>
      {/* Dev -> Repo */}
      <path className="animate-flow-dash text-gray-500 dark:text-white/60" d="M15,50 L35,50" fill="none" stroke="currentColor" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
      {/* Repo -> Pipeline */}
      <path className="animate-flow-dash" d="M35,50 L55,30" fill="none" stroke="rgba(59, 130, 246, 0.9)" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
      {/* Pipeline -> AI */}
      <path className="animate-flow-dash" d="M55,30 L75,50" fill="none" stroke="rgba(168, 85, 247, 0.9)" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
      {/* AI -> Action */}
      <path className="animate-flow-dash" d="M75,50 Q65,60 55,70" fill="none" stroke="rgba(168, 85, 247, 0.9)" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
      {/* Action -> Repo (Feedback) */}
      <path className="animate-flow-dash" d="M55,70 L35,50" fill="none" stroke="rgba(16, 185, 129, 0.8)" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
    </>
  );

  // Project 2 Data - Aligned to 10, 30, 50, 70, 90 grid for perfect distribution
  const nodes2: XRayNode[] = [
    { id: '1', label: 'USER', subLabel: 'Local', type: 'developer', x: 10, y: 50, codeLanguage: 'json', codeSnippet: `{\n  "user": "admin",\n  "role": "architect",\n  "permissions": ["read", "execute"]\n}` },
    { id: '2', label: 'AI ASSISTANT', subLabel: 'Desktop', type: 'process', x: 30, y: 50, codeLanguage: 'javascript', codeSnippet: `const assistant = new Assistant({\n  model: 'claude-3-opus',\n  temperature: 0.2,\n  tools: [mcpClient]\n});` },
    { id: '3', label: 'MCP PROTOCOL', subLabel: 'Protocol', type: 'process', x: 50, y: 50, codeLanguage: 'typescript', codeSnippet: `interface MCPRequest {\n  jsonrpc: '2.0';\n  method: string;\n  params: unknown;\n  id: number | string;\n}` },
    { id: '4', label: 'AWS MCP SERVER', subLabel: 'Compute', type: 'server', x: 70, y: 50, codeLanguage: 'python', codeSnippet: `@mcp.tool()\ndef query_database(sql: str):\n    '''Execute SQL safely'''\n    with db.connect() as conn:\n        return conn.execute(sql)` },
    { id: '5', label: 'AWS CLOUD', subLabel: 'Provider', type: 'cloud', x: 90, y: 50, codeLanguage: 'hcl', codeSnippet: `resource "aws_vpc" "main" {\n  cidr_block = "10.0.0.0/16"\n  tags = {\n    Name = "mcp-production"\n  }\n}` },
  ];

  const logs2 = (
    <>
      <p className="text-gray-400">LISTENING FOR TOOL_CALLS...</p>
      <p className="text-gray-500">MCP_PROTOCOL: HANDSHAKE INITIATED</p>
      <p className="text-accent-green font-bold">AWS_SERVER: REQUEST_RECEIVED</p>
      <p className="text-gray-400">GEMINI_PRO: ANALYZING ROOT_CAUSE...</p>
      <p className="text-accent-blue font-bold">mTLS_AUTH: VERIFIED</p>
      <p className="text-gray-300">MCP_PROTOCOL: TOOL_CALL SUCCESSFUL</p>
      <p className="text-gray-500">QUERYING RDS_DATABASE...</p>
      <p className="text-gray-300">RESPONSE_READY: DATA_PACKED</p>
    </>
  );

  const connections2 = (
    <>
      <path className="animate-flow-dash" d="M10,50 L30,50" fill="none" stroke="rgba(59, 130, 246, 0.9)" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
      <path className="animate-flow-dash" d="M30,50 L50,50" fill="none" stroke="rgba(59, 130, 246, 0.9)" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
      <path className="animate-flow-dash" d="M50,50 L70,50" fill="none" stroke="rgba(16, 185, 129, 0.9)" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
      <path className="animate-flow-dash" d="M70,50 L90,50" fill="none" stroke="rgba(52, 211, 153, 0.9)" strokeDasharray="5,5" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
    </>
  );


  return (
    <main className="relative z-10 container mx-auto px-4 py-8" id="work">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Tech Blobs */}
        <div className="absolute top-[10%] right-[0%] w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px] animate-pulse-slow mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[20%] left-[0%] w-[400px] h-[400px] bg-accent-green/5 rounded-full blur-[120px] animate-pulse-slow delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
        {/* Faint Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          color: 'gray'
        }}></div>
      </div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="font-display text-3xl md:text-5xl text-gray-900 dark:text-white uppercase font-bold tracking-tight">Architectural Highlights</h2>
      </div>

      {/* Project 1 */}
      <div className="mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7">
            <CodeXRay
              id="p1"
              nodes={nodes1}
              connections={connections1}
              title="Self-Healing CI/CD"
              version="SYSTEM ARCHITECTURE V4.0.2"
              logLines={logs1}
            />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-accent-blue/10 dark:bg-accent-blue/15 border border-accent-blue/40 text-accent-blue text-xs font-mono font-bold rounded mb-4 uppercase tracking-widest">Technical Project</span>
              <h3 className="font-display text-2xl md:text-3xl mb-4 text-gray-900 dark:text-white uppercase font-bold">Self-Healing CI/CD</h3>
              <p className="font-body text-gray-700 dark:text-text-high-contrast text-base leading-relaxed font-medium">
                Redefining failure as a stage of progress. This architecture captures build/test logs via Python agents, sends them to Gemini 3 Pro for root cause analysis, and automatically pushes corrective PRs back to the repository.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 rounded-2xl">
                  <div className="font-mono text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Downtime Reduction</div>
                  <div className="font-display text-xl text-gray-900 dark:text-white font-bold">94.2%</div>
                </div>
                <div className="p-3 border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 rounded-2xl">
                  <div className="font-mono text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Mean Time to Fix</div>
                  <div className="font-display text-xl text-gray-900 dark:text-white font-bold">&lt;2m</div>
                </div>
              </div>
              <LiveTerminal logLines={logs1} />
            </div>
          </div>
        </div>
      </div>

      {/* Project 2 */}
      <div className="mb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 space-y-6 lg:order-2">
            <div>
              <span className="inline-block px-3 py-1 bg-accent-green/10 dark:bg-accent-green/15 border border-accent-green/40 text-accent-green text-xs font-mono font-bold rounded mb-4 uppercase tracking-widest">Technical Project</span>
              <h3 className="font-display text-2xl md:text-3xl mb-4 text-gray-900 dark:text-white uppercase font-bold">Anthropic MCP Server</h3>
              <p className="font-body text-gray-700 dark:text-text-high-contrast text-base leading-relaxed font-medium">
                Built a robust Model Context Protocol server enabling secure communication between Claude and internal enterprise databases on AWS. High-fidelity architectural implementation focusing on protocol isolation and secure tool execution.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 rounded-2xl">
                  <div className="font-mono text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Latency</div>
                  <div className="font-display text-xl text-gray-900 dark:text-white font-bold">&lt;150ms</div>
                </div>
                <div className="p-3 border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 rounded-2xl">
                  <div className="font-mono text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Security</div>
                  <div className="font-display text-xl text-gray-900 dark:text-white font-bold">mTLS v1.3</div>
                </div>
              </div>
              <LiveTerminal logLines={logs2} />
            </div>
          </div>
          <div className="lg:col-span-7 lg:order-1">
            <CodeXRay
              id="p2"
              nodes={nodes2}
              connections={connections2}
              title="MCP Architecture"
              version="MCP ARCH V2.1.0"
              logLines={logs2}
            />
          </div>
        </div>
      </div>

    </main>
  );
};

export default WorkSection;