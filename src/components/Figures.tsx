import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Figure } from '@/lib/content';

const SHADE = '#ea4467';
const SHADE_ALT = '#E48F15';

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function slicePath(cx: number, cy: number, r: number, start: number, end: number) {
  const [x1, y1] = polar(cx, cy, r, start);
  const [x2, y2] = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

/** Pizza/círculo de fracciones. Si interactive, el alumno toca porciones para colorear. */
export function FractionCircle({
  parts,
  shaded,
  interactive = false,
  size = 300,
}: {
  parts: number;
  shaded: number;
  interactive?: boolean;
  size?: number;
}) {
  const [taps, setTaps] = useState<boolean[]>(() => Array(parts).fill(false));
  const cx = 100;
  const cy = 100;
  const r = 92;
  const step = 360 / parts;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox="0 0 200 200"
        style={{ width: size, height: size, touchAction: 'manipulation' }}
        className="drop-shadow-sm select-none"
      >
        {Array.from({ length: parts }).map((_, i) => {
          const isShaded = interactive ? taps[i] : i < shaded;
          return (
            <motion.path
              key={i}
              d={slicePath(cx, cy, r, i * step, (i + 1) * step)}
              stroke="#21221f"
              strokeWidth={2.5}
              initial={false}
              animate={{ fill: isShaded ? SHADE : '#ffffff' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{ cursor: interactive ? 'pointer' : 'default', transformOrigin: '100px 100px' }}
              whileTap={interactive ? { scale: 0.94 } : undefined}
              onClick={
                interactive
                  ? () => setTaps((t) => t.map((v, j) => (j === i ? !v : v)))
                  : undefined
              }
            />
          );
        })}
      </svg>
      {interactive && (
        <p className="text-xl font-bold text-[#21221f]/70">
          Coloreaste <span className="font-display text-3xl text-[#ea4467]">{taps.filter(Boolean).length}</span> de{' '}
          <span className="font-display text-3xl">{parts}</span> partes
        </p>
      )}
    </div>
  );
}

/** Barras apiladas para comparar fracciones (equivalencias). */
export function FractionBars({
  rows,
  width = 560,
}: {
  rows: { parts: number; shaded: number; label?: string }[];
  width?: number;
}) {
  return (
    <div className="flex flex-col gap-5 items-center w-full" style={{ maxWidth: width }}>
      {rows.map((row, ri) => (
        <div key={ri} className="flex items-center gap-4 w-full">
          <div className="flex flex-1 rounded-2xl overflow-hidden border-[3px] border-[#21221f] h-16 sm:h-20 bg-white">
            {Array.from({ length: row.parts }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-full"
                style={{
                  borderLeft: i === 0 ? 'none' : '3px solid #21221f',
                }}
                initial={false}
                animate={{ backgroundColor: i < row.shaded ? SHADE : '#ffffff' }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
              />
            ))}
          </div>
          {row.label && (
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#21221f] w-20 text-center">
              {row.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Visualización de suma: a + b pedazos sobre el mismo entero. */
export function SumFigure({ a, b, parts }: { a: number; b: number; parts: number }) {
  return (
    <div className="flex flex-col items-center gap-4 w-full" style={{ maxWidth: 620 }}>
      <div className="flex w-full rounded-2xl overflow-hidden border-[3px] border-[#21221f] h-16 sm:h-20 bg-white">
        {Array.from({ length: parts }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-full"
            style={{ borderLeft: i === 0 ? 'none' : '3px solid #21221f' }}
            initial={false}
            animate={{
              backgroundColor: i < a ? SHADE : i < a + b ? SHADE_ALT : '#ffffff',
            }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
          />
        ))}
      </div>
      <p className="font-display text-3xl sm:text-4xl font-bold text-[#21221f]">
        <span style={{ color: SHADE }}>{a}/{parts}</span>
        {' + '}
        <span style={{ color: SHADE_ALT }}>{b}/{parts}</span>
        {' = '}
        <span className="underline decoration-wavy underline-offset-4">{a + b}/{parts}</span>
      </p>
    </div>
  );
}

/** Renderiza cualquier figura del modelo de contenido. */
export function FigureView({ figure, size }: { figure: Figure; size?: number }) {
  if (figure.kind === 'none') return null;
  if (figure.kind === 'circle')
    return (
      <FractionCircle parts={figure.parts} shaded={figure.shaded} interactive={figure.interactive} size={size} />
    );
  if (figure.kind === 'bars') return <FractionBars rows={figure.rows} />;
  return <SumFigure a={figure.a} b={figure.b} parts={figure.parts} />;
}
