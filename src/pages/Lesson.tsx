import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { LESSONS } from '@/lib/content';
import { FigureView } from '@/components/Figures';
import { ArrowLeft, ArrowRight, Home as HomeIcon, Lightbulb, MessagesSquare } from 'lucide-react';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = LESSONS.find((l) => l.id === id);
  const [step, setStep] = useState(0);

  if (!lesson) return null;
  const current = lesson.steps[step];
  const isLast = step === lesson.steps.length - 1;

  return (
    <div className="min-h-screen bg-[#fcfbfa] flex flex-col">
      {/* Barra superior */}
      <header className="flex items-center justify-between px-6 py-4 sm:px-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 rounded-full border-[3px] border-[#21221f] bg-white px-5 py-2.5 font-display text-lg font-bold shadow-[3px_3px_0_#21221f] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
        >
          <HomeIcon className="h-5 w-5" /> Inicio
        </button>
        <h1 className="font-display text-xl font-bold text-[#21221f] sm:text-2xl">{lesson.title}</h1>
        <div className="flex gap-2">
          {lesson.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className="h-4 w-4 rounded-full border-2 border-[#21221f] transition-colors"
              style={{ backgroundColor: i <= step ? lesson.color : '#fff' }}
              aria-label={`Paso ${i + 1}`}
            />
          ))}
        </div>
      </header>

      {/* Contenido del paso */}
      <main className="flex flex-1 items-center px-6 pb-8 sm:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2"
          >
            <div className="order-2 lg:order-1">
              <p
                className="mb-3 inline-block rounded-full px-4 py-1 font-display text-base font-bold text-white"
                style={{ backgroundColor: lesson.color }}
              >
                Paso {step + 1} de {lesson.steps.length}
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight text-[#21221f] sm:text-5xl">
                {current.title}
              </h2>
              <p className="mt-5 text-2xl leading-relaxed text-[#21221f]/80">{current.text}</p>

              {current.tip && (
                <div className="mt-6 flex items-start gap-3 rounded-3xl border-[3px] border-dashed border-[#21221f]/40 bg-white px-5 py-4">
                  <Lightbulb className="mt-1 h-7 w-7 shrink-0 text-[#E48F15]" />
                  <p className="text-xl font-bold text-[#21221f]/75">{current.tip}</p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="flex min-h-[64px] items-center gap-2 rounded-full border-[3px] border-[#21221f] bg-white px-7 font-display text-xl font-bold shadow-[4px_4px_0_#21221f] disabled:opacity-30 active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  <ArrowLeft className="h-6 w-6" /> Atrás
                </button>
                {!isLast ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="flex min-h-[64px] items-center gap-2 rounded-full border-[3px] border-[#21221f] px-8 font-display text-xl font-bold text-white shadow-[4px_4px_0_#21221f] active:shadow-none active:translate-x-1 active:translate-y-1"
                    style={{ backgroundColor: lesson.color }}
                  >
                    Siguiente <ArrowRight className="h-6 w-6" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/descubrir/${lesson.id}`)}
                    className="flex min-h-[64px] items-center gap-2 rounded-full border-[3px] border-[#21221f] bg-[#21221f] px-8 font-display text-xl font-bold text-white shadow-[4px_4px_0_#ea4467] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    <MessagesSquare className="h-6 w-6" /> Ahora descúbrelo tú
                  </button>
                )}
              </div>
            </div>

            <div className="order-1 flex justify-center rounded-[2rem] border-[3px] border-[#21221f] bg-white p-6 sm:p-10 lg:order-2">
              <FigureView figure={current.figure} size={320} />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
