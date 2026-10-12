import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LESSONS } from '@/lib/content';
import { FigureView } from '@/components/Figures';
import { Home as HomeIcon, Sparkles, Trophy } from 'lucide-react';

export default function Socratic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = LESSONS.find((l) => l.id === id);
  const [node, setNode] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [showInsight, setShowInsight] = useState(false);
  const [done, setDone] = useState(false);

  if (!lesson) return null;

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfbfa] px-6 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 14 }}>
          <Sparkles className="mx-auto mb-6 h-20 w-20 text-[#E48F15]" />
          <h1 className="font-display text-5xl font-bold text-[#21221f]">¡Lo descubriste tú solito!</h1>
          <p className="mx-auto mt-4 max-w-xl text-2xl text-[#21221f]/70">
            Respondiste las {lesson.socratic.length} preguntas guía de «{lesson.title}». Ahora comprueba lo aprendido.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate(`/quiz/${lesson.id}`)}
              className="flex min-h-[64px] items-center gap-2 rounded-full border-[3px] border-[#21221f] bg-[#21221f] px-8 font-display text-xl font-bold text-white shadow-[4px_4px_0_#ea4467] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <Trophy className="h-6 w-6" /> Ir al quiz
            </button>
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

  const current = lesson.socratic[node];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (current.options[i].correct) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: [lesson.color, '#E48F15', '#47A0A0', '#21221f'] });
      setTimeout(() => setShowInsight(true), 700);
    }
  };

  const next = () => {
    if (node + 1 >= lesson.socratic.length) setDone(true);
    else setNode((n) => n + 1);
    setPicked(null);
    setShowInsight(false);
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
        <p className="font-display text-xl font-bold text-[#21221f]">
          Modo descubrir · Pregunta {node + 1} de {lesson.socratic.length}
        </p>
        <div className="w-24" />
      </header>

      <main className="flex flex-1 items-center px-6 pb-10 sm:px-10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
          {/* Burbuja del tutor + opciones */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={node}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ type: 'spring', stiffness: 160, damping: 20 }}
              >
                <div className="relative rounded-[2rem] border-[3px] border-[#21221f] bg-white p-6 sm:p-8">
                  <span
                    className="absolute -top-5 left-6 rounded-full border-[3px] border-[#21221f] px-4 py-1 font-display text-base font-bold text-white"
                    style={{ backgroundColor: lesson.color }}
                  >
                    El tutor pregunta…
                  </span>
                  <p className="mt-2 text-2xl font-bold leading-relaxed text-[#21221f] sm:text-[1.7rem]">
                    {current.question}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  {current.options.map((opt, i) => {
                    const isPicked = picked === i;
                    const revealed = picked !== null;
                    let style: React.CSSProperties = { backgroundColor: '#fff' };
                    if (revealed && opt.correct) style = { backgroundColor: '#e7fec7', borderColor: '#21221f' };
                    if (isPicked && !opt.correct) style = { backgroundColor: '#fdecef' };
                    return (
                      <motion.button
                        key={i}
                        whileTap={picked === null ? { scale: 0.97 } : undefined}
                        animate={isPicked && !opt.correct ? { x: [0, -10, 10, -6, 6, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        onClick={() => pick(i)}
                        className="min-h-[64px] rounded-3xl border-[3px] border-[#21221f] px-6 py-4 text-left font-display text-2xl font-bold text-[#21221f] shadow-[4px_4px_0_#21221f] disabled:cursor-default"
                        style={style}
                        disabled={picked !== null}
                      >
                        {opt.label}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {picked !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-3xl border-[3px] border-[#21221f] p-5"
                      style={{
                        backgroundColor: current.options[picked].correct ? '#e7fec7' : '#fdf3e2',
                      }}
                    >
                      <p className="text-xl font-bold text-[#21221f]">{current.options[picked].feedback}</p>
                      {!current.options[picked].correct && (
                        <button
                          onClick={() => setPicked(null)}
                          className="mt-4 min-h-[56px] rounded-full border-[3px] border-[#21221f] bg-white px-6 font-display text-lg font-bold shadow-[3px_3px_0_#21221f] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                        >
                          Intentar otra vez
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Insight + siguiente */}
                <AnimatePresence>
                  {showInsight && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      className="mt-6 rounded-3xl border-[3px] border-[#21221f] bg-[#21221f] p-6"
                    >
                      <p className="font-display text-lg font-bold uppercase tracking-wide text-[#E48F15]">
                        Lo que acabas de descubrir
                      </p>
                      <p className="mt-1 text-2xl font-bold text-white">{current.insight}</p>
                      <button
                        onClick={next}
                        className="mt-5 min-h-[56px] rounded-full border-[3px] border-white bg-white px-8 font-display text-xl font-bold text-[#21221f] shadow-[3px_3px_0_#ea4467] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                      >
                        {node + 1 >= lesson.socratic.length ? 'Ver mi logro' : 'Siguiente pregunta'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Figura */}
          <div className="flex justify-center rounded-[2rem] border-[3px] border-[#21221f] bg-white p-6 sm:p-10">
            <FigureView figure={current.figure} size={300} />
          </div>
        </div>
      </main>
    </div>
  );
}
