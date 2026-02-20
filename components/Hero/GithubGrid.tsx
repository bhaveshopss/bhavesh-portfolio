import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';

const MotionDiv = motion.div as any;

interface ContributionCell {
  level: number;
  count: number;
  date: Date;
  weekIndex: number;
  dayIndex: number;
}

const WEEKS = 24;
const GAP = 3;
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const SPRING_CONFIG = { stiffness: 150, damping: 20, mass: 0.5 };

function generateContributions(): ContributionCell[] {
  const today = new Date();
  const currentDay = today.getDay();
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - currentDay);
  const startDate = new Date(lastSunday);
  startDate.setDate(lastSunday.getDate() - (WEEKS - 1) * 7);

  const cells: ContributionCell[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const isBurstWeek = Math.random() > 0.65;
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);

      if (date > today) {
        cells.push({ level: 0, count: 0, date, weekIndex: w, dayIndex: d });
        continue;
      }

      const isWeekday = d >= 1 && d <= 5;
      const baseChance = isWeekday ? 0.7 : 0.3;
      const chance = isBurstWeek ? Math.min(baseChance + 0.25, 0.95) : baseChance;

      let count = 0;
      let level = 0;
      if (Math.random() < chance) {
        count = Math.floor(Math.random() * (isBurstWeek ? 14 : 8)) + 1;
        if (count <= 2) level = 1;
        else if (count <= 5) level = 2;
        else if (count <= 9) level = 3;
        else level = 4;
      }

      cells.push({ level, count, date, weekIndex: w, dayIndex: d });
    }
  }
  return cells;
}

function getMonthLabels(cells: ContributionCell[]): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  for (const cell of cells) {
    if (cell.dayIndex === 0) {
      const month = cell.date.getMonth();
      if (month !== lastMonth) {
        labels.push({
          label: cell.date.toLocaleString('en', { month: 'short' }),
          weekIndex: cell.weekIndex,
        });
        lastMonth = month;
      }
    }
  }
  return labels;
}

function getLevelColor(level: number): { bg: string; shadow: string; glow: string } {
  switch (level) {
    case 1: return { bg: '#0e4429', shadow: '#062616', glow: '#0e4429' };
    case 2: return { bg: '#006d32', shadow: '#00421e', glow: '#006d32' };
    case 3: return { bg: '#26a641', shadow: '#176327', glow: '#26a641' };
    case 4: return { bg: '#39d353', shadow: '#228633', glow: '#39d353' };
    default: return { bg: 'var(--block-empty)', shadow: 'var(--block-shadow)', glow: 'transparent' };
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

const CountUp: React.FC<{ target: number; suffix?: string; active: boolean }> = ({ target, suffix = '', active }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{count.toLocaleString()}{suffix}</>;
};

interface GridCellProps {
  cell: ContributionCell;
  hasAnimated: boolean;
  onHover: (cell: ContributionCell, e: React.MouseEvent) => void;
  onLeave: () => void;
}

const GridCell = React.memo<GridCellProps>(({ cell, hasAnimated, onHover, onLeave }) => {
  const colors = getLevelColor(cell.level);
  const entranceDelay = cell.weekIndex * 0.025 + cell.dayIndex * 0.008;
  const elevation = cell.level * 3;

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0 }}
      animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        delay: entranceDelay,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={(e: React.MouseEvent) => onHover(cell, e)}
      onMouseLeave={onLeave}
      className="relative cursor-interactive group/cell"
      style={{
        aspectRatio: '1',
        transformStyle: 'preserve-3d' as const,
      }}
    >
      {/* Main face */}
      <div
        className="w-full h-full transition-all duration-300 ease-out relative"
        style={{
          backgroundColor: colors.bg,
          transform: `translateZ(${elevation}px)`,
          boxShadow: cell.level >= 4
            ? `0 0 12px ${colors.glow}, 0 0 4px ${colors.glow}`
            : cell.level >= 3
              ? `0 0 6px ${colors.glow}`
              : 'none',
          borderRadius: 2,
        }}
      >
        {/* Hover highlight */}
        <div className="absolute inset-0 bg-white/30 opacity-0 group-hover/cell:opacity-100 transition-opacity duration-200 rounded-[2px]" />

        {/* Glow wave shimmer for high-activity cells */}
        {cell.level >= 3 && (
          <div
            className="absolute inset-0 rounded-[2px] pointer-events-none"
            style={{
              animation: 'contribution-shimmer 6s ease-in-out infinite',
              animationDelay: `${cell.weekIndex * 0.15 + cell.dayIndex * 0.05}s`,
            }}
          />
        )}
      </div>

      {/* 3D Side Faces */}
      {cell.level > 0 && (
        <>
          {/* Bottom face */}
          <div
            className="absolute left-0 w-full origin-top"
            style={{
              top: '100%',
              height: elevation,
              backgroundColor: colors.shadow,
              transform: `translateZ(${elevation}px) rotateX(-90deg)`,
              borderRadius: '0 0 2px 2px',
            }}
          />
          {/* Right face */}
          <div
            className="absolute top-0 h-full origin-right"
            style={{
              right: 0,
              width: elevation,
              backgroundColor: colors.shadow,
              transform: `translateZ(${elevation}px) rotateY(90deg)`,
              opacity: 0.8,
              borderRadius: '0 2px 2px 0',
            }}
          />
        </>
      )}
    </MotionDiv>
  );
});

const GithubGrid: React.FC = () => {
  const cells = useMemo(() => generateContributions(), []);
  const monthLabels = useMemo(() => getMonthLabels(cells), [cells]);

  const stats = useMemo(() => {
    const total = cells.reduce((sum, c) => sum + c.count, 0);
    const activeDays = cells.filter(c => c.count > 0).length;
    const activePct = Math.round((activeDays / cells.filter(c => c.date <= new Date()).length) * 100);
    let streak = 0;
    let maxStreak = 0;
    for (const c of cells) {
      if (c.date > new Date()) continue;
      if (c.count > 0) { streak++; maxStreak = Math.max(maxStreak, streak); }
      else { streak = 0; }
    }
    return { total, maxStreak, activePct };
  }, [cells]);

  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), SPRING_CONFIG);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), SPRING_CONFIG);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [tooltip, setTooltip] = useState<{ cell: ContributionCell; x: number; y: number } | null>(null);

  const handleCellHover = useCallback((cell: ContributionCell, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      cell,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  }, []);

  const handleCellLeave = useCallback(() => setTooltip(null), []);

  return (
    <div className="relative w-full max-w-2xl mt-16 mb-16 group" style={{ perspective: 1000 }}>

      {/* Label */}
      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="font-mono text-[10px] text-terminal-green font-bold uppercase tracking-[0.2em]">
          <span className="animate-pulse">●</span> Contribution_Matrix_v3.0
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-terminal-green/50 to-transparent mx-auto mt-1"></div>
      </MotionDiv>

      {/* 3D Container */}
      <MotionDiv
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' as const }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative p-6 md:p-8 bg-white/80 dark:bg-[#0a0a0a]/90 border border-black/5 dark:border-white/10 rounded-card-lg backdrop-blur-sm"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-green/5 to-transparent pointer-events-none rounded-card-lg"></div>

        {/* Month Labels */}
        <div style={{ paddingLeft: 32 }}>
          <div
            className="grid mb-1"
            style={{
              gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`,
              gap: GAP,
              height: 16,
            }}
          >
            {monthLabels.map(({ label, weekIndex }) => (
              <span
                key={`${label}-${weekIndex}`}
                className="text-[9px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase leading-none"
                style={{ gridColumn: weekIndex + 1 }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Grid + Day Labels */}
        <div className="flex gap-1">
          {/* Day Labels */}
          <div
            className="flex-shrink-0 grid"
            style={{
              gridTemplateRows: `repeat(7, minmax(0, 1fr))`,
              gap: GAP,
              width: 28,
            }}
          >
            {DAY_LABELS.map((label, i) => (
              <span
                key={i}
                className="flex items-center text-[9px] font-mono text-gray-400 dark:text-gray-500 font-bold leading-none"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Contribution Grid */}
          <div
            ref={gridRef}
            className="relative flex-1 min-w-0"
            style={{ transformStyle: 'preserve-3d' as const }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`,
                gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                gridAutoFlow: 'column',
                gap: GAP,
                transformStyle: 'preserve-3d' as const,
              }}
            >
              {cells.map((cell, i) => (
                <GridCell
                  key={i}
                  cell={cell}
                  hasAnimated={hasAnimated}
                  onHover={handleCellHover}
                  onLeave={handleCellLeave}
                />
              ))}
            </div>

            {/* Scan Line */}
            <MotionDiv
              className="absolute top-0 bottom-0 w-[2px] pointer-events-none z-20"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(0,255,65,0.6), transparent)',
                filter: 'blur(0.5px)',
              }}
              animate={{ left: ['-2%', '102%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'linear' }}
            />

            {/* Glow Wave Overlay */}
            <MotionDiv
              className="absolute inset-0 pointer-events-none z-10 rounded-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.06) 40%, rgba(0,255,65,0.12) 50%, rgba(0,255,65,0.06) 60%, transparent 100%)',
                backgroundSize: '300% 100%',
              }}
              animate={{ backgroundPosition: ['-150% 0', '250% 0'] }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Stats Bar */}
        <MotionDiv
          initial={{ opacity: 0, y: 15 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-black/5 dark:border-white/5"
        >
          <div className="text-center p-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-badge">
            <div className="font-mono text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-1">
              Contributions
            </div>
            <div className="font-mono text-lg md:text-xl text-gray-900 dark:text-terminal-green font-bold tabular-nums">
              <CountUp target={stats.total} active={hasAnimated} />
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-badge">
            <div className="font-mono text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-1">
              Best Streak
            </div>
            <div className="font-mono text-lg md:text-xl text-gray-900 dark:text-terminal-green font-bold tabular-nums">
              <CountUp target={stats.maxStreak} suffix="d" active={hasAnimated} />
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-badge">
            <div className="font-mono text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-1">
              Active Days
            </div>
            <div className="font-mono text-lg md:text-xl text-gray-900 dark:text-terminal-green font-bold tabular-nums">
              <CountUp target={stats.activePct} suffix="%" active={hasAnimated} />
            </div>
          </div>
        </MotionDiv>

        {/* Legend */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-black/5 dark:border-white/5 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-widest">
            {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">Less</span>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map(level => {
                const colors = getLevelColor(level);
                return (
                  <div
                    key={level}
                    className="border border-black/5 dark:border-white/5"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: colors.bg,
                      borderRadius: 2,
                      boxShadow: level === 4 ? `0 0 6px ${colors.glow}` : 'none',
                    }}
                  />
                );
              })}
            </div>
            <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">More</span>
          </div>
        </div>
      </MotionDiv>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <MotionDiv
            key={`${tooltip.cell.weekIndex}-${tooltip.cell.dayIndex}`}
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none z-[9999]"
            style={{
              position: 'fixed',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="px-3 py-2 bg-gray-900 dark:bg-black text-white text-[11px] font-mono rounded-badge shadow-lg border border-white/10 whitespace-nowrap">
              <span className="font-bold text-terminal-green">{tooltip.cell.count} contribution{tooltip.cell.count !== 1 ? 's' : ''}</span>
              <span className="text-gray-400 ml-1">on {formatDate(tooltip.cell.date)}</span>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Floor Reflection/Glow */}
      <div className="absolute -bottom-10 left-0 right-0 h-24 bg-terminal-green/10 blur-[60px] transform rotate-x-[60deg] opacity-40 pointer-events-none"></div>

      {/* Description Text */}
      <div className="mt-12 text-center relative z-10 px-4">
        <p className="max-w-xl mx-auto text-base md:text-lg text-gray-600 dark:text-text-high-contrast font-medium font-mono leading-relaxed transition-colors duration-500">
          Bhavesh Kumar Parmar, DevOps & AIOps Engineer constructing self-healing infrastructures and intelligent pipelines.
        </p>
      </div>
    </div>
  );
};

export default GithubGrid;
