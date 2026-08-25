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
  size?: number;
  className?: string;
};

export function PixelSprite({ seed, palette, size = 72, className = '' }: SpriteProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grid = 10;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const rand = mulberry32(seed);
    const half = Math.ceil(grid / 2);
    const cells: boolean[][] = Array.from({ length: grid }, () => Array(grid).fill(false));

    for (let y = 1; y < grid - 1; y++) {
      for (let x = 0; x < half; x++) {
        const edge = y === 1 || y === grid - 2;
        const fill = rand() > (edge ? 0.62 : 0.34);
        if (fill) {
          cells[y][x] = true;
          cells[y][grid - 1 - x] = true;
        }
      }
    }

    const px = size / grid;
    for (let y = 0; y < grid; y++) {
      for (let x = 0; x < grid; x++) {
        if (!cells[y][x]) continue;
        const roll = rand();
        const color =
          roll < 0.55
            ? palette[0]
            : roll < 0.8
              ? (palette[1] ?? palette[0])
              : (palette[2] ?? palette[0]);
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px));
      }
    }
  }, [seed, palette, size]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ width: size, height: size, imageRendering: 'pixelated' }}
      className={className}
    />
  );
}

type SceneProps = {
  seed?: number;
  className?: string;
  sky?: string;
  layers?: string[];
  accent?: string;
  density?: number;
};

export function PixelScene({
  seed = 7,
  className = '',
  sky = '#EFEFEA',
  layers = ['#9DB8FA', '#4C6EF5', '#1F3AC2', '#0E1E66'],
  accent = '#E879B9',
  density = 0.5,
}: SceneProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const px = 6;
    let cols = 0;
    let rows = 0;

    const rand = mulberry32(seed);
    const heights = layers.map((_, li) => {
      const arr: number[] = [];
      let h = 0.25 + li * 0.16;
      for (let c = 0; c < 400; c++) {
        h += (rand() - 0.5) * (0.06 + li * 0.035);
        h = Math.max(0.12 + li * 0.1, Math.min(0.95, h));
        arr.push(h);
      }
      return arr;
    });

    const draw = (t: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      cols = Math.ceil(rect.width / px) + 1;
      rows = Math.ceil(rect.height / px) + 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, rect.width, rect.height);

      const jitter = reduced ? 0 : Math.sin(t * 0.0004) * 0.5;

      for (let c = 0; c < cols; c++) {
        const sample = Math.floor((c / cols) * 399);
        for (let li = 0; li < layers.length; li++) {
          const shore = heights[li][sample] * rect.height + (li === layers.length - 1 ? jitter * px : 0);
          for (let r = Math.floor(shore / px); r < rows; r++) {
            const depth = (r - shore / px) / (rows - shore / px || 1);
            const dith = rand();
            const threshold = 0.15 + depth * 0.75;
            if (dith > threshold * (1.25 - density * 0.5)) continue;
            ctx.fillStyle = layers[li];
            ctx.fillRect(c * px, r * px, px, px);
          }
        }
      }

      for (let i = 0; i < 90; i++) {
        const c = Math.floor(rand() * cols);
        const r = Math.floor(rand() * rows * 0.7);
        if (rand() > 0.4) {
          ctx.fillStyle = accent;
          ctx.fillRect(c * px, r * px, px, px);
        }
      }
    };

    draw(0);
    if (!reduced) {
      let last = 0;
      const loop = (t: number) => {
        if (t - last > 400) {
          draw(t);
          last = t;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => draw(0));
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [seed, sky, layers, accent, density]);

  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
