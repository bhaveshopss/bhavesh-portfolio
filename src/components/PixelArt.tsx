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

type SpriteProps = {
  seed: number;
  palette: string[];
  eyeColor?: string;
  size?: number;
  className?: string;
};

export function PixelSprite({ seed, palette, eyeColor = '#EFEFEA', size = 72, className = '' }: SpriteProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const G = 12;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const rand = mulberry32(seed);
    const half = G / 2;
    const cells: (number | null)[][] = Array.from({ length: G }, () => Array<number | null>(G).fill(null));

    for (let y = 2; y < G - 2; y++) {
      for (let x = 1; x < half; x++) {
        const edge = y === 2 || y === G - 3;
        if (rand() > (edge ? 0.55 : 0.22)) {
          const shade = rand() < 0.6 ? 0 : rand() < 0.75 ? 1 : 2;
          cells[y][x] = shade;
          cells[y][G - 1 - x] = shade;
        }
      }
    }

    const eyeY = 4 + Math.floor(rand() * 2);
    const eyeL = 2 + Math.floor(rand() * 2);
    cells[eyeY][eyeL] = null;
    cells[eyeY][G - 1 - eyeL] = null;
    cells[eyeY + 1][eyeL] = null;
    cells[eyeY + 1][G - 1 - eyeL] = null;

    const px = size / G;
    for (let y = 0; y < G; y++) {
      for (let x = 0; x < G; x++) {
        const shade = cells[y][x];
        if (shade === null) continue;
        ctx.fillStyle = palette[shade] ?? palette[0];
        ctx.fillRect(Math.floor(x * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px));
      }
    }

    ctx.fillStyle = eyeColor;
    ctx.fillRect(Math.floor(eyeL * px), Math.floor(eyeY * px), Math.ceil(px), Math.ceil(px));
    ctx.fillRect(Math.floor((G - 1 - eyeL) * px), Math.floor(eyeY * px), Math.ceil(px), Math.ceil(px));

    const footY = G - 2;
    ctx.fillStyle = palette[0];
    ctx.fillRect(Math.floor(2 * px), Math.floor(footY * px), Math.ceil(px * 2), Math.ceil(px));
    ctx.fillRect(Math.floor((G - 4) * px), Math.floor(footY * px), Math.ceil(px * 2), Math.ceil(px));
  }, [seed, palette, eyeColor, size]);

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
