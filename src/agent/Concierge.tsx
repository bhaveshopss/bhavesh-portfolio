import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Sparkle, X } from 'lucide-react';
import { posts, projects, identity } from '../data/content';
import {
  buildReplies,
  greeting,
  postById,
  projectById,
  projectReply,
  promptChips,
  type AgentAction,
  type AgentReply,
} from './knowledge';
import { intentTabs } from './knowledge';
import { routeIntent, type Intent } from './intents';
import { EASE } from '../components/Reveal';

type Message = {
  id: number;
  role: 'user' | 'agent';
  text: string;
  chips?: { label: string; action: AgentAction }[];
  external?: { label: string; url: string }[];
};

type View =
  | { kind: 'chat' }
  | { kind: 'blog-list' }
  | { kind: 'blog-post'; href: string }
  | { kind: 'project'; projectId: string };

const STORAGE_KEY = 'bhavesh-concierge-session-v1';
const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToSection(target: string) {
  const el = document.getElementById(target);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(-20) : [];
  } catch {
    return [];
  }
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2" aria-label="Concierge is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-mid motion-safe:animate-pulse"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </div>
  );
}

function MessageBlock({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={reducedMotion() ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={isUser ? 'flex justify-end' : 'flex flex-col gap-2.5'}
    >
      {!isUser && (
        <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-low">
          <Sparkle className="h-2.5 w-2.5 text-signal" /> Concierge
        </span>
      )}
      <div
        className={`max-w-[92%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed whitespace-pre-line ${
          isUser
            ? 'rounded-br-md bg-ink text-cream'
            : 'rounded-bl-md glass text-ink/90'
        }`}
      >
        {message.text}
      </div>

      {!isUser && (message.chips?.length || message.external?.length) && (
        <div className="flex max-w-[95%] flex-wrap gap-1.5">
          {message.chips?.map((chip) => (
            <Chip key={chip.label} label={chip.label} action={chip.action} />
          ))}
          {message.external?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal-dim px-3 py-1.5 font-mono text-[11px] text-signal transition-colors duration-300 hover:bg-signal hover:text-white"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function Chip({ label, action, onRun }: { label: string; action: AgentAction; onRun?: (a: AgentAction) => void }) {
  return (
    <button
      onClick={() => onRun?.(action)}
      className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-ink-mid transition-colors duration-300 hover:border-signal/50 hover:bg-signal-dim hover:text-ink"
    >
      {label}
    </button>
  );
}

export function Concierge({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>(() =>
    loadHistory().length ? loadHistory() : [{ id: 0, role: 'agent', text: greeting }]
  );
  const [typing, setTyping] = useState(false);
  const [view, setView] = useState<View>({ kind: 'chat' });
  const [input, setInput] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const replies = useMemo(() => buildReplies(), []);
  const idRef = useRef(messages.length);

  useEffect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
      } catch {
        /* storage unavailable: session-only history */
      }
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement;
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => {
      clearTimeout(t);
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing, view]);

  const runAction = useCallback(
    (action: AgentAction) => {
      const isMobile = window.innerWidth < 768;
      const closeDelay = reducedMotion() ? 400 : 1600;
      switch (action.type) {
        case 'contact':
          if (isMobile) setTimeout(onClose, closeDelay);
          setTimeout(() => scrollToSection('contact'), reducedMotion() ? 0 : isMobile ? 250 : 120);
          break;
        case 'scroll':
          if (isMobile) setTimeout(onClose, closeDelay);
          setTimeout(
            () => scrollToSection(action.target),
            reducedMotion() ? 0 : isMobile ? 250 : 120
          );
          break;
        case 'openBlogList':
          setView({ kind: 'blog-list' });
          break;
        case 'openBlogPost':
          setView({ kind: 'blog-post', href: action.postId });
          break;
        case 'openProject':
          setView({ kind: 'project', projectId: action.projectId });
          break;
      }
    },
    [onClose]
  );

  const respond = useCallback(
    (userText: string) => {
      const intent = routeIntent(userText);
      let reply: AgentReply;
      const scrollTab = intentTabs[intent as Intent];
      if (intent === 'project_details') {
        const pid = /self.?healing|ci.?cd|pipeline/.test(userText.toLowerCase())
          ? projects[0].id
          : /mcp|inventory/.test(userText.toLowerCase())
            ? projects[1].id
            : projects[2].id;
        reply = projectReply(pid) ?? replies.fallback;
      } else if (intent === 'blog_post') {
        const post =
          postById(
            /kubernetes|edge|latency/.test(userText.toLowerCase())
              ? posts[0].href
              : /llm|chain/.test(userText.toLowerCase())
                ? posts[1].href
                : posts[2].href
          ) ?? posts[0];
        reply = {
          text: `Opening "${post.title}" (${post.date} · ${post.readTime} read). You can also read the full article on its page.`,
          action: { type: 'openBlogPost', postId: post.href },
          external: [{ label: 'Open full article', url: post.href }],
        };
      } else {
        reply = replies[intent] ?? replies.fallback;
      }

      setTyping(true);
      const delay = reducedMotion() ? 150 : 550 + Math.min(reply.text.length * 2, 700);
      setTimeout(() => {
        setTyping(false);
        idRef.current += 1;
        setMessages((prev) => [
          ...prev,
          { id: idRef.current, role: 'agent', text: reply.text, chips: reply.chips, external: reply.external },
        ]);
        if (reply.action) {
          if (reply.action.type === 'openBlogList' || reply.action.type === 'openBlogPost' || reply.action.type === 'openProject') {
            setView(
              reply.action.type === 'openBlogList'
                ? { kind: 'blog-list' }
                : reply.action.type === 'openBlogPost'
                  ? { kind: 'blog-post', href: (reply.action as { postId: string }).postId }
                  : { kind: 'project', projectId: (reply.action as { projectId: string }).projectId }
            );
          } else if (reply.action.type === 'scroll' && scrollTab) {
            window.dispatchEvent(new CustomEvent('bhavesh:set-tab', { detail: scrollTab }));
            runAction(reply.action);
          } else {
            runAction(reply.action);
          }
        }
      }, delay);
    },
    [replies, runAction, onClose]
  );

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    idRef.current += 1;
    setMessages((prev) => [...prev, { id: idRef.current, role: 'user', text: trimmed }]);
    setInput('');
    setView({ kind: 'chat' });
    respond(trimmed);
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit(input);
  };

  const viewTitle =
    view.kind === 'blog-list'
      ? 'Blog'
      : view.kind === 'blog-post'
        ? postById(view.href)?.title ?? 'Article'
        : view.kind === 'project'
          ? projectById(view.projectId)?.name ?? 'Project'
          : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Bhavesh's AI concierge"
            initial={reducedMotion() ? { opacity: 0 } : { x: '100%', opacity: 0.6 }}
            animate={reducedMotion() ? { opacity: 1 } : { x: 0, opacity: 1 }}
            exit={reducedMotion() ? { opacity: 0 } : { x: '100%', opacity: 0.4 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed bottom-0 left-1/2 z-50 flex h-[88dvh] w-full -translate-x-1/2 flex-col overflow-hidden rounded-t-2xl glass-deep shadow-[0_-8px_60px_rgba(19,19,17,0.18)] md:bottom-4 md:left-auto md:right-4 md:top-4 md:h-auto md:w-[420px] md:translate-x-0 md:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                {view.kind !== 'chat' && (
                  <button
                    onClick={() => setView({ kind: 'chat' })}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-mid transition-colors hover:border-signal/50 hover:text-ink"
                    aria-label="Back to conversation"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                )}
                <div className="min-w-0">
                  <p className="truncate font-display text-[14px] font-semibold text-ink">
                    {viewTitle ?? "Bhavesh's concierge"}
                  </p>
                  <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-low">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                    {view.kind === 'chat' ? 'Local · verified answers' : 'Portfolio knowledge'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close concierge"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-mid transition-colors hover:border-signal/50 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {view.kind === 'chat' && (
              <>
                <div ref={scrollRef} className="panel-scroll flex-1 space-y-5 overflow-y-auto px-5 py-5">
                  {messages.map((message) => (
                    <MessageBlock key={message.id} message={message} />
                  ))}
                  {typing && <TypingDots />}
                </div>

                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-1.5 border-t border-line px-5 py-3.5">
                    {promptChips.map((chip) => (
                      <Chip key={chip.label} label={chip.label} action={chip.action} onRun={runAction} />
                    ))}
                  </div>
                )}

                <div className="border-t border-line p-3.5">
                  <div className="flex items-center gap-2 rounded-full border border-line bg-cream py-1.5 pl-4 pr-1.5 focus-within:border-signal/50">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onInputKey}
                      placeholder="Ask about Bhavesh's work…"
                      aria-label="Ask the concierge"
                      className="h-9 flex-1 bg-transparent font-mono text-[12.5px] text-ink outline-none placeholder:text-ink-low"
                    />
                    <button
                      onClick={() => submit(input)}
                      disabled={!input.trim() || typing}
                      aria-label="Send question"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream transition-all duration-300 hover:bg-signal disabled:opacity-30"
                    >
                      <ArrowUpRight className="h-4 w-4 -rotate-45" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {view.kind === 'blog-list' && (
              <div ref={scrollRef} className="panel-scroll flex-1 overflow-y-auto px-5 py-5">
                <div className="flex flex-col">
                  {posts.map((post) => (
                    <button
                      key={post.href}
                      onClick={() => setView({ kind: 'blog-post', href: post.href })}
                      className="group border-b border-line py-4 text-left transition-colors last:border-0"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] text-ink-low">{post.date}</span>
                        <span className="font-mono text-[10px] text-signal/70">{post.readTime}</span>
                      </div>
                      <p className="mt-1.5 font-display text-[15px] font-semibold text-ink transition-colors group-hover:text-signal">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-mid">{post.excerpt}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {view.kind === 'blog-post' && <BlogPostView href={view.href} />}

            {view.kind === 'project' && (
              <div ref={scrollRef} className="panel-scroll flex-1 overflow-y-auto px-5 py-5">
                {(() => {
                  const project = projects.find((p) => p.id === view.projectId);
                  if (!project) return null;
                  return (
                    <div className="space-y-6">
                      <div>
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-signal">
                          {project.tagline}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                          {project.name}
                        </h3>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-low">Problem</p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-mid">{project.problem}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-low">Contribution</p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink/85">{project.contribution}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {project.impact.map((m) => (
                          <div key={m.label} className="rounded-xl border border-ink/10 bg-cream p-3">
                            <p className="font-display text-lg font-bold text-ink">{m.value}</p>
                            <p className="mt-0.5 font-mono text-[9px] leading-snug text-ink-low">{m.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-ink-mid">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 rounded-full border border-signal/40 bg-signal-dim py-2.5 font-mono text-[12px] text-signal transition-colors hover:bg-signal hover:text-white"
                        >
                          {project.linkLabel ?? 'View repository'}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function BlogPostView({ href }: { href: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setContent(null);
    setFailed(false);
    fetch(href)
      .then((res) => (res.ok ? res.text() : Promise.reject()))
      .then((html) => {
        if (cancelled) return;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const article = doc.querySelector('article') ?? doc.body;
        article.querySelectorAll('script, style, nav, header, footer').forEach((el) => el.remove());
        setContent(article.innerHTML);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [href]);

  const post = postById(href);

  return (
    <div ref={scrollRef} className="panel-scroll flex-1 overflow-y-auto px-5 py-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-low">
        {post?.date} · {post?.readTime} read
      </p>
      {failed && (
        <p className="mt-6 rounded-xl border border-line bg-paper p-4 text-[13px] text-ink-mid">
          The in-panel preview could not load. Open the full article instead:
          <a href={href} className="mt-2 block font-mono text-[12px] text-signal underline">
            {post?.title}
          </a>
        </p>
      )}
      {!content && !failed && <TypingDots />}
      {content && (
        <article
          className="prose-concierge mt-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}

export { scrollToSection };
export { identity };
