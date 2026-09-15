import { useEffect, useRef } from 'react';

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* Hand-authored 12x12 role sprites. Every creature has eyes + feet.  */
/* ------------------------------------------------------------------ */

export type SpriteKind = 'server' | 'robot' | 'crown' | 'shield' | 'cloud' | 'gear';

const SPRITES: Record<SpriteKind, { palette: Record<string, string>; rows: string[] }> = {
  server: {
    palette: { K: '#131311', B: '#2B4BF2', L: '#9DB8FA', W: '#F7F7F4' },
    rows: [
      '............',
      '.KKKKKKKKKK.',
      '.KBBBBBBBBK.',
      '.KBWWBBWWBK.',
      '.KBWKBBKWBK.',
      '.KBBBBBBBBK.',
      '.KBKKKKKKBK.',
      '.KBBBBBBBBK.',
      '.KBLBBBBLBK.',
      '.KKKKKKKKKK.',
      '..KK....KK..',
      '............',
    ],
  },
  robot: {
    palette: { K: '#131311', B: '#4C6EF5', P: '#E879B9', W: '#F7F7F4' },
    rows: [
      '.....KK.....',
      '....KPPK....',
      '..KKKKKKKK..',
      '.KBBBBBBBBK.',
      '.KBWWBBWWBK.',
      '.KBWKBBKWBK.',
      '.KBBBBBBBBK.',
      '.KBKKKKKKBK.',
      '.KBBBBBBBBK.',
      '.KKKKKKKKKK.',
      '...KK..KK...',
      '............',
    ],
  },
  crown: {
    palette: { K: '#131311', P: '#E879B9', W: '#F7F7F4' },
    rows: [
      '............',
      '..KK.KK.KK..',
      '..KKKKKKKK..',
      '..KPPPPPPK..',
      '..KPWPPWPK..',
      '..KPKPPKPK..',
      '..KPPKKPPK..',
      '..KPPPPPPK..',
      '.KKKKKKKKKK.',
      '.KPPPPPPPPK.',
      '..KKK..KKK..',
      '............',
    ],
  },
  shield: {
    palette: { K: '#131311', B: '#2B4BF2', W: '#F7F7F4' },
    rows: [
      '............',
      '..KKKKKKKK..',
      '.KBBBBBBBBK.',
      '.KBWWBBWWBK.',
      '.KBWKBBKWBK.',
      '.KBBBBBBBBK.',
      '.KBWWKWWKBK.',
      '.KBBBBBBBBK.',
      '..KBBBBBBK..',
      '...KBBBBK...',
      '....KKKK....',
      '............',
    ],
  },
  cloud: {
    palette: { K: '#131311', L: '#9DB8FA', W: '#F7F7F4' },
    rows: [
      '............',
      '............',
      '....KKKK....',
      '...KLLLLK...',
      '..KLLLLLLK..',
      '.KLLLLLLLLK.',
      '.KLWWLLWWLK.',
      '.KLWKLLKWLK.',
      '.KLLLLLLLLK.',
      '.KKKKKKKKKK.',
      '...KK..KK...',
      '............',
    ],
  },
  gear: {
    palette: { K: '#131311', P: '#E879B9', W: '#F7F7F4' },
    rows: [
      '............',
      '...K.KK.K...',
      '..KKKKKKKK..',
      'KKKPPPPPPKKK',
      '.KPPWPPWPPK.',
      '.KPPPKKPPPK.',
      '.KPPKKKKPPK.',
      '.KPPPPPPPPK.',
      'KKKPPPPPPKKK',
      '..KKKKKKKK..',
      '...K.KK.K...',
      '............',
    ],
  },
};

type RoleIconProps = {
  kind: SpriteKind;
  size?: number;
  className?: string;
};

export function RoleIcon({ kind, size = 64, className = '' }: RoleIconProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sprite = SPRITES[kind];
    const G = 12;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const px = size / G;
    for (let y = 0; y < G; y++) {
      for (let x = 0; x < G; x++) {
        const ch = sprite.rows[y][x];
        if (ch === '.' || !sprite.palette[ch]) continue;
        ctx.fillStyle = sprite.palette[ch];
        ctx.fillRect(Math.floor(x * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px));
      }
    }
  }, [kind, size]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ width: size, height: size, imageRendering: 'pixelated' }}
      className={className}
    />
  );
}

const HERO_PALETTE: Record<string, string> = {
  K: '#131311',
  B: '#4C6EF5',
  C: '#9DB8FA',
  P: '#E879B9',
  S: '#E8C4A0',
  W: '#F7F7F4',
  D: '#2B4BF2',
};

const HERO_FIGURE: string[] = [
  '............................................',
  '..............KKKK..........................',
  '.............KSSSSK.........................',
  '.............KSSSSK.........................',
  '.............KKSSKK.........................',
  '..............KSSK..........................',
  '............KKKKKKKK........................',
  '...........KBBBBBBBBK.......P...............',
  '..........KBBBBBBBBBBK.....P.P..............',
  '.........KBBBKKKKKBBBK....P...P.............',
  '.........KBBK.WWWWKBBK...P.....P............',
  '.........KBBK.WWWWKBBK..P.P.P.P.P...........',
  '........KBBK..WWWW.KBBK...P...P.............',
  '........KBK...WWWW..KBK.....P...............',
  '........KBK...WWWW..KBK.....................',
  '........KBK.KKKKKKKKKBK.....................',
  '........KBK.KCCCCCCCKBK.....................',
  '.......KBBKKCCCCCCCCKBBK....................',
  '......KBBBK..KKKKKK..KBBK...................',
  '.....KBBK.....K..K.....KBBK.................',
  '....KKKK....KK...KK....KKKK.................',
  '..KKKKKK..KKK.....KKK..KKKKKK...............',
  '.KKKKKKKKKKK.......KKKKKKKKKKK.............',
  '............................................',
];

type FigureProps = {
  cell?: number;
  className?: string;
  palette?: Record<string, string>;
};

export function PixelFigure({ cell = 5, className = '', palette = HERO_PALETTE }: FigureProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rows = HERO_FIGURE.length;
    const cols = HERO_FIGURE[0].length;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cols * cell * dpr;
    canvas.height = rows * cell * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const ch = HERO_FIGURE[y][x];
        if (ch === '.' || !palette[ch]) continue;
        ctx.fillStyle = palette[ch];
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }, [cell, palette]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ imageRendering: 'pixelated', width: '100%', height: 'auto' }}
      className={className}
    />
  );
}

type RidgeProps = {
  seed?: number;
  className?: string;
  sky?: string;
  layers?: string[];
  accent?: string;
};

export function PixelRidge({
  seed = 42,
  className = '',
  sky = '#EFEFEA',
  layers = ['#9DB8FA', '#4C6EF5', '#2B4BF2', '#0E1E66'],
  accent = '#E879B9',
}: RidgeProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const px = 7;
      const cols = Math.ceil(rect.width / px);
      const rows = Math.ceil(rect.height / px);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, rect.width, rect.height);

      const rand = mulberry32(seed);

      // pixel sun
      const sunC = Math.floor(cols * 0.82);
      const sunR = Math.floor(rows * 0.14);
      const sunRadius = 3.2;
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          if (dx * dx + dy * dy <= sunRadius * sunRadius) {
            ctx.fillStyle = accent;
            ctx.fillRect((sunC + dx) * px, (sunR + dy) * px, px, px);
          }
        }
      }

      // faint stars
      for (let i = 0; i < Math.floor(cols * 0.35); i++) {
        const c = Math.floor(rand() * cols);
        const r = Math.floor(rand() * rows * 0.35);
        ctx.fillStyle = 'rgba(19, 19, 17, 0.14)';
        ctx.fillRect(c * px, r * px, px, px);
      }

      const ridges = layers.map((_, li) => {
        const arr: number[] = [];
        let h = 0.2 + li * 0.17;
        for (let c = 0; c <= cols; c++) {
          h += (rand() - 0.5) * (0.05 + li * 0.03);
          h = Math.max(0.15 + li * 0.12, Math.min(0.92, h));
          arr.push(h);
        }
        return arr;
      });

      for (let c = 0; c < cols; c++) {
        for (let li = 0; li < layers.length; li++) {
          const shore = ridges[li][c] * rows;
          for (let r = Math.floor(shore); r < rows; r++) {
            const depth = (r - shore) / (rows - shore || 1);
            if (rand() > 0.2 + depth * 0.72) continue;
            ctx.fillStyle = layers[li];
            ctx.fillRect(c * px, r * px, px, px);
          }
        }
      }

      for (let i = 0; i < Math.floor(cols * 0.6); i++) {
        const c = Math.floor(rand() * cols);
        const r = Math.floor(rand() * rows * 0.55);
        if (rand() > 0.45) {
          ctx.fillStyle = accent;
          ctx.fillRect(c * px, r * px, px, px);
        }
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [seed, sky, layers, accent]);

  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
