import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LESSONS } from '@/lib/content';
import { FigureView } from '@/components/Figures';
import { Home as HomeIcon, RotateCcw, Trophy } from 'lucide-react';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = LESSONS.find((l) => l.id === id);
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!lesson) return null;

  const restart = () => {
    setQ(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const total = lesson.quiz.length;
    const great = score === total;
    const ok = score >= total - 1;
    if (great) confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 }, colors: [lesson.color, '#E48F15', '#47A0A0'] });
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfbfa] px-6 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 14 }}>
          <Trophy className="mx-auto mb-6 h-20 w-20" style={{ color: lesson.color }} />
          <h1 className="font-display text-5xl font-bold text-[#21221f]">
            {great ? '¡Puntaje perfecto!' : ok ? '¡Muy bien!' : '¡Buen intento!'}
          </h1>
          <p className="mt-4 font-display text-7xl font-bold" style={{ color: lesson.color }}>
            {score}/{total}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-2xl text-[#21221f]/70">
            {great
              ? `Dominaste «${lesson.title}». Puedes pasar a la siguiente lección.`
              : ok
                ? 'Casi perfecto. Repasa la explicación del paso que fallaste y vuelve a intentarlo.'
                : 'Te recomiendo repasar la lección paso a paso y volver al quiz.'}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={restart}
              className="flex min-h-[64px] items-center gap-2 rounded-full border-[3px] border-[#21221f] bg-[#21221f] px-8 font-display text-xl font-bold text-white shadow-[4px_4px_0_#ea4467] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <RotateCcw className="h-6 w-6" /> Repetir quiz
            </button>
            {!great && (
              <button
                onClick={() => navigate(`/aprender/${lesson.id}`)}
                className="flex min-h-[64px] items-center gap-2 rounded-full border-[3px] border-[#21221f] bg-white px-8 font-display text-xl font-bold shadow-[4px_4px_0_#21221f] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                Repasar la lección
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="flex min-h-[64px] items-center gap-2 rounded-full border-[3px] border-[#21221f] bg-white px-8 font-display text-xl font-bold shadow-[4px_4px_0_#21221f] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <HomeIcon className="h-6 w-6" /> Inicio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const current = lesson.quiz[q];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.answer) {
      setScore((s) => s + 1);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.75 }, colors: [lesson.color, '#E48F15'] });
    }
  };

  const next = () => {
    if (q + 1 >= lesson.quiz.length) setDone(true);
    else setQ((n) => n + 1);
    setPicked(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfbfa]">
      <header className="flex items-center justify-between px-6 py-4 sm:px-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 rounded-full border-[3px] border-[#21221f] bg-white px-5 py-2.5 font-display text-lg font-bold shadow-[3px_3px_0_#21221f] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
        >
          <HomeIcon className="h-5 w-5" /> Inicio
        </button>
        <div className="flex items-center gap-3">
          <div className="h-4 w-40 overflow-hidden rounded-full border-2 border-[#21221f] bg-white sm:w-56">
            <motion.div
              className="h-full"
              style={{ backgroundColor: lesson.color }}
              animate={{ width: `${((q + (picked !== null ? 1 : 0)) / lesson.quiz.length) * 100}%` }}
            />
          </div>
          <span className="font-display text-lg font-bold text-[#21221f]">
            {q + 1}/{lesson.quiz.length}
          </span>
        </div>
        <div className="flex items-center gap-2 font-display text-xl font-bold text-[#21221f]">
          <Trophy className="h-6 w-6" style={{ color: lesson.color }} /> {score}
        </div>
      </header>

      <main className="flex flex-1 items-center px-6 pb-10 sm:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={q}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2"
          >
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight text-[#21221f] sm:text-4xl">
                {current.question}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {current.options.map((opt, i) => {
                  let style: React.CSSProperties = { backgroundColor: '#fff' };
                  if (picked !== null) {
                    if (i === current.answer) style = { backgroundColor: '#e7fec7' };
                    else if (i === picked) style = { backgroundColor: '#fdecef' };
                    else style = { backgroundColor: '#fff', opacity: 0.5 };
                  }
                  return (
                    <motion.button
                      key={i}
                      whileTap={picked === null ? { scale: 0.96 } : undefined}
                      animate={picked === i && i !== current.answer ? { x: [0, -10, 10, -6, 6, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={() => pick(i)}
                      disabled={picked !== null}
                      className="min-h-[88px] rounded-3xl border-[3px] border-[#21221f] px-6 font-display text-3xl font-bold text-[#21221f] shadow-[4px_4px_0_#21221f]"
                      style={style}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {picked !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-3xl border-[3px] border-[#21221f] p-5"
                    style={{ backgroundColor: picked === current.answer ? '#e7fec7' : '#fdf3e2' }}
                  >
                    <p className="font-display text-xl font-bold text-[#21221f]">
                      {picked === current.answer ? '¡Correcto! ' : 'No era esa. '}
                      <span className="font-body font-semibold">{current.explain}</span>
                    </p>
                    <button
                      onClick={next}
                      className="mt-4 min-h-[56px] rounded-full border-[3px] border-[#21221f] bg-[#21221f] px-8 font-display text-xl font-bold text-white shadow-[3px_3px_0_#ea4467] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                    >
                      {q + 1 >= lesson.quiz.length ? 'Ver resultado' : 'Siguiente'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center rounded-[2rem] border-[3px] border-[#21221f] bg-white p-6 sm:p-10">
              <FigureView figure={current.figure} size={300} />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
