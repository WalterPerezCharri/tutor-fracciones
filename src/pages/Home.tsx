import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { LESSONS } from '@/lib/content';
import { BookOpen, MessagesSquare, Trophy } from 'lucide-react';

const MODES = [
  { key: 'aprender', label: 'Aprender', desc: 'Paso a paso con figuras', icon: BookOpen },
  { key: 'descubrir', label: 'Descubrir', desc: 'El tutor pregunta, tú piensas', icon: MessagesSquare },
  { key: 'quiz', label: 'Comprobar', desc: 'Quiz con feedback', icon: Trophy },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fcfbfa] px-6 py-10 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.25em] text-[#ea4467]">
            Tutor visual de matemáticas · Primaria
          </p>
          <h1 className="font-display text-5xl font-bold text-[#21221f] sm:text-6xl">
            Fracciones con figuras
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-[#21221f]/70">
            Elige una lección y un modo: explicación por pasos, descubrimiento guiado o quiz de comprobación.
          </p>
        </motion.header>

        <div className="flex flex-col gap-8">
          {LESSONS.map((lesson, li) => (
            <motion.section
              key={lesson.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 * li, type: 'spring', stiffness: 120, damping: 18 }}
              className="rounded-[2rem] border-[3px] border-[#21221f] p-6 sm:p-8"
              style={{ backgroundColor: lesson.soft }}
            >
              <div className="mb-6 flex items-center gap-4">
                <span
                  className="font-display flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-[#21221f] text-3xl font-bold text-white"
                  style={{ backgroundColor: lesson.color }}
                >
                  {li + 1}
                </span>
                <div>
                  <h2 className="font-display text-3xl font-bold text-[#21221f] sm:text-4xl">{lesson.title}</h2>
                  <p className="text-lg font-semibold text-[#21221f]/60">{lesson.subtitle}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {MODES.map((mode) => (
                  <motion.button
                    key={mode.key}
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/${mode.key}/${lesson.id}`)}
                    className="flex min-h-[96px] items-center gap-4 rounded-3xl border-[3px] border-[#21221f] bg-white px-5 py-4 text-left shadow-[4px_4px_0_#21221f] transition-shadow hover:shadow-[6px_6px_0_#21221f]"
                  >
                    <mode.icon className="h-9 w-9 shrink-0" style={{ color: lesson.color }} strokeWidth={2.4} />
                    <div>
                      <p className="font-display text-2xl font-bold leading-tight text-[#21221f]">{mode.label}</p>
                      <p className="text-base font-semibold text-[#21221f]/55">{mode.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <footer className="mt-12 text-center text-base font-semibold text-[#21221f]/40">
          Prototipo de enseñanza para pizarra interactiva · Toca, explora y comprueba
        </footer>
      </div>
    </div>
  );
}
