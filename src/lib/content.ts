// ─── Tipos del modelo pedagógico ────────────────────────────────────────────

export type Figure =
  | { kind: 'circle'; parts: number; shaded: number; interactive?: boolean }
  | { kind: 'bars'; rows: { parts: number; shaded: number; label?: string }[] }
  | { kind: 'sum'; a: number; b: number; parts: number }
  | { kind: 'none' };

export interface LessonStep {
  title: string;
  text: string;
  figure: Figure;
  tip?: string; // "pregunta de control" al final del paso
}

export interface SocraticNode {
  question: string;
  figure: Figure;
  options: { label: string; correct: boolean; feedback: string }[];
  insight: string; // lo que el alumno descubre al acertar
}

export interface QuizQuestion {
  question: string;
  figure: Figure;
  options: string[];
  answer: number; // índice correcto
  explain: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  color: string;      // color de acento de la lección
  soft: string;       // fondo suave
  steps: LessonStep[];
  socratic: SocraticNode[];
  quiz: QuizQuestion[];
}

// ─── Lección 1: ¿Qué es una fracción? ───────────────────────────────────────

const queEs: Lesson = {
  id: 'que-es',
  title: '¿Qué es una fracción?',
  subtitle: 'Partes iguales de un todo',
  color: '#ea4467',
  soft: '#fdecef',
  steps: [
    {
      title: 'Repartir en partes IGUALES',
      text: 'Imagina una pizza entre 4 amigos. Para que nadie se enoje, la cortamos en 4 partes exactamente iguales. Eso es lo primero: una fracción solo existe cuando las partes son iguales.',
      figure: { kind: 'circle', parts: 4, shaded: 0 },
      tip: '¿Crees que importa que las partes sean iguales? ¿Por qué?',
    },
    {
      title: 'El denominador: ¿en cuántas partes?',
      text: 'El número de abajo se llama denominador y dice en cuántas partes iguales dividimos el todo. Aquí dividimos en 4, así que el denominador es 4.',
      figure: { kind: 'circle', parts: 4, shaded: 0 },
    },
    {
      title: 'El numerador: ¿cuántas tomamos?',
      text: 'El número de arriba se llama numerador y cuenta cuántas partes tomamos o coloreamos. Si me como 1 pedazo de 4, escribimos 1/4 y se lee "un cuarto".',
      figure: { kind: 'circle', parts: 4, shaded: 1 },
    },
    {
      title: '¡Tú puedes leer cualquier fracción!',
      text: 'Si coloreamos 3 pedazos de 4, tenemos 3/4, "tres cuartos". Arriba: cuántas partes tomamos. Abajo: en cuántas partes se dividió el todo. ¡Eso es todo el secreto!',
      figure: { kind: 'circle', parts: 4, shaded: 3, interactive: true },
      tip: 'Toca las porciones de la pizza para colorearlas y probar.',
    },
  ],
  socratic: [
    {
      question: 'Mira esta pizza. Antes de colorear nada: ¿en cuántas partes iguales está dividida?',
      figure: { kind: 'circle', parts: 6, shaded: 0 },
      options: [
        { label: '4 partes', correct: false, feedback: 'Cuenta despacio, con el dedo sobre la pizarra. Hay más partes de las que parece.' },
        { label: '6 partes', correct: true, feedback: '¡Exacto! Contaste cada porción.' },
        { label: '5 partes', correct: false, feedback: 'Casi. Vuelve a contar señalando cada porción una por una.' },
      ],
      insight: 'El número de partes iguales es el denominador. Aquí sería 6.',
    },
    {
      question: 'Ahora coloreé algunas porciones. ¿Qué fracción de la pizza está coloreada?',
      figure: { kind: 'circle', parts: 6, shaded: 2 },
      options: [
        { label: '6/2', correct: false, feedback: 'Ojo: el total de partes va ABAJO. ¿En cuántas partes se dividió la pizza?' },
        { label: '2/6', correct: true, feedback: '¡Muy bien! 2 partes coloreadas de 6 en total.' },
        { label: '2/4', correct: false, feedback: 'Coloreaste bien el 2, pero mira de nuevo en cuántas partes está dividida la pizza completa.' },
      ],
      insight: 'Arriba va lo que tomamos (2), abajo el total de partes (6): 2/6.',
    },
    {
      question: 'Última: si me como TODA la pizza, ¿qué fracción me comí?',
      figure: { kind: 'circle', parts: 6, shaded: 6 },
      options: [
        { label: '6/6, ¡la pizza entera!', correct: true, feedback: '¡Correcto! Cuando numerador y denominador son iguales, tienes el todo completo.' },
        { label: '1/6', correct: false, feedback: '1/6 sería solo un pedacito. Pero me comí TODO, no un pedazo.' },
        { label: '6/1', correct: false, feedback: 'Recuerda: abajo va el total de partes en que se dividió. ¿En cuántas se dividió?' },
      ],
      insight: 'Descubrimiento: 6/6 = 1 pizza completa. Una fracción con números iguales vale 1.',
    },
  ],
  quiz: [
    {
      question: '¿Qué fracción de la pizza está coloreada?',
      figure: { kind: 'circle', parts: 8, shaded: 3 },
      options: ['3/8', '8/3', '3/5', '5/8'],
      answer: 0,
      explain: 'Hay 3 partes coloreadas de 8 en total: 3/8. Arriba lo coloreado, abajo el total.',
    },
    {
      question: '¿Qué fracción representa esta barra?',
      figure: { kind: 'bars', rows: [{ parts: 5, shaded: 2 }] },
      options: ['5/2', '2/5', '2/3', '3/5'],
      answer: 1,
      explain: 'La barra se dividió en 5 partes iguales y 2 están coloreadas: 2/5.',
    },
    {
      question: 'Para que sea una fracción de verdad, las partes deben ser…',
      figure: { kind: 'circle', parts: 4, shaded: 1 },
      options: ['Grandes', 'Iguales', 'Pequeñas', 'Redondas'],
      answer: 1,
      explain: '¡La regla de oro! Las fracciones solo cuentan partes IGUALES.',
    },
    {
      question: '¿Qué fracción muestra la pizza completa (todo coloreado)?',
      figure: { kind: 'circle', parts: 4, shaded: 4 },
      options: ['1/4', '4/1', '4/4', '2/4'],
      answer: 2,
      explain: 'Las 4 partes de 4 están coloreadas: 4/4 = 1 entero.',
    },
  ],
};

// ─── Lección 2: Fracciones equivalentes ─────────────────────────────────────

const equivalentes: Lesson = {
  id: 'equivalentes',
  title: 'Fracciones equivalentes',
  subtitle: 'Distintos nombres, misma cantidad',
  color: '#47A0A0',
  soft: '#e9f4f4',
  steps: [
    {
      title: 'Media pizza es media pizza',
      text: 'Corta una pizza en 2 y toma 1 pedazo: tienes 1/2. Ahora corta otra pizza igual en 4 y toma 2 pedazos: tienes 2/4. Mira las barras… ¡comiste exactamente lo mismo!',
      figure: { kind: 'bars', rows: [{ parts: 2, shaded: 1, label: '1/2' }, { parts: 4, shaded: 2, label: '2/4' }] },
      tip: '¿Cuál barra tiene más color? Míralas con atención.',
    },
    {
      title: 'Se llaman equivalentes',
      text: 'Cuando dos fracciones tapan la misma cantidad, decimos que son equivalentes: son nombres distintos para la misma porción. 1/2 y 2/4 son equivalentes.',
      figure: { kind: 'bars', rows: [{ parts: 2, shaded: 1, label: '1/2' }, { parts: 4, shaded: 2, label: '2/4' }, { parts: 8, shaded: 4, label: '4/8' }] },
    },
    {
      title: 'El truco: multiplicar arriba y abajo',
      text: 'Si multiplicas el numerador y el denominador por el mismo número, obtienes una fracción equivalente. 1/2 × 2 = 2/4. 1/2 × 4 = 4/8. ¡Funciona siempre!',
      figure: { kind: 'bars', rows: [{ parts: 3, shaded: 1, label: '1/3' }, { parts: 6, shaded: 2, label: '2/6' }] },
    },
    {
      title: '¿Por qué no cambia la cantidad?',
      text: 'Porque multiplicar arriba y abajo por lo mismo es como cortar cada pedazo en pedazos más chicos: tienes más pedazos, pero más pequeños. La cantidad total no cambia.',
      figure: { kind: 'circle', parts: 8, shaded: 4, interactive: true },
      tip: 'Toca la pizza: ¿4/8 se ve igual que la mitad?',
    },
  ],
  socratic: [
    {
      question: 'Observa las dos barras. Una muestra 1/2 y otra 2/4. ¿Cuál tiene MÁS parte coloreada?',
      figure: { kind: 'bars', rows: [{ parts: 2, shaded: 1, label: '1/2' }, { parts: 4, shaded: 2, label: '2/4' }] },
      options: [
        { label: 'La de 1/2', correct: false, feedback: 'Mira con atención el largo de la parte coloreada en ambas. ¿De verdad una es más larga?' },
        { label: 'La de 2/4', correct: false, feedback: 'Tiene más pedazos coloreados, sí… pero fíjate en el LARGO total coloreado, no en el número de pedazos.' },
        { label: '¡Son iguales!', correct: true, feedback: '¡Eso es! Distinto nombre, misma cantidad coloreada.' },
      ],
      insight: 'Acabas de descubrir las fracciones equivalentes: 1/2 = 2/4.',
    },
    {
      question: '¿Por qué número multipliqué arriba y abajo para pasar de 1/3 a 2/6?',
      figure: { kind: 'bars', rows: [{ parts: 3, shaded: 1, label: '1/3' }, { parts: 6, shaded: 2, label: '2/6' }] },
      options: [
        { label: 'Por 2', correct: true, feedback: '¡Correcto! 1×2 = 2 y 3×2 = 6.' },
        { label: 'Por 3', correct: false, feedback: 'Si fuera por 3, abajo tendríamos 9, no 6. Prueba: 1×? = 2.' },
        { label: 'Por 6', correct: false, feedback: 'Por 6 sería demasiado. Piensa: 1 por ¿qué número da 2?' },
      ],
      insight: 'Multiplicar arriba y abajo por el mismo número crea equivalentes.',
    },
    {
      question: '¿Cuál de estas fracciones es equivalente a 1/2?',
      figure: { kind: 'bars', rows: [{ parts: 2, shaded: 1, label: '1/2' }] },
      options: [
        { label: '2/3', correct: false, feedback: 'Comprueba: ¿2 ÷ 2 = 1 y 3 ÷ 2 = 2? No sale. Busca una donde arriba y abajo se multipliquen por lo mismo.' },
        { label: '3/6', correct: true, feedback: '¡Sí! 1×3 = 3 y 2×3 = 6. Misma cantidad, otro nombre.' },
        { label: '1/4', correct: false, feedback: '1/4 es más pequeño que 1/2: es un pedazo de cuatro, no la mitad.' },
      ],
      insight: '1/2 = 2/4 = 3/6 = 4/8… ¡hay infinitos nombres para la mitad!',
    },
  ],
  quiz: [
    {
      question: '¿Qué fracción es equivalente a 2/4?',
      figure: { kind: 'bars', rows: [{ parts: 4, shaded: 2, label: '2/4' }] },
      options: ['1/2', '1/4', '3/4', '2/8'],
      answer: 0,
      explain: '2/4 y 1/2 tapan la misma cantidad: la mitad.',
    },
    {
      question: 'Para pasar de 1/3 a 3/9 multipliqué arriba y abajo por…',
      figure: { kind: 'bars', rows: [{ parts: 3, shaded: 1, label: '1/3' }, { parts: 9, shaded: 3, label: '3/9' }] },
      options: ['2', '3', '6', '9'],
      answer: 1,
      explain: '1×3 = 3 y 3×3 = 9. Multipliqué por 3.',
    },
    {
      question: '¿Cuál par NO es equivalente?',
      figure: { kind: 'bars', rows: [{ parts: 2, shaded: 1, label: '1/2' }, { parts: 6, shaded: 3, label: '3/6' }] },
      options: ['1/2 y 3/6', '1/2 y 4/8', '2/3 y 4/6', '1/3 y 2/4'],
      answer: 3,
      explain: '1/3 y 2/4 no tapan lo mismo: 2/4 = 1/2, que es más grande que 1/3.',
    },
    {
      question: '¿Qué fracción muestra la misma parte coloreada que 4/8?',
      figure: { kind: 'circle', parts: 8, shaded: 4 },
      options: ['1/4', '1/2', '3/4', '8/4'],
      answer: 1,
      explain: '4 de 8 es exactamente la mitad: 4/8 = 1/2.',
    },
  ],
};

// ─── Lección 3: Sumar fracciones ────────────────────────────────────────────

const sumar: Lesson = {
  id: 'sumar',
  title: 'Sumar fracciones',
  subtitle: 'Con el mismo denominador',
  color: '#E48F15',
  soft: '#fdf3e2',
  steps: [
    {
      title: 'Sumar pedazos del mismo tamaño',
      text: 'Me comí 1/4 de pizza en el almuerzo y 2/4 en la cena. ¿Cuánta pizza comí en total? Como los pedazos son del mismo tamaño (cuartos), solo tengo que contarlos.',
      figure: { kind: 'sum', a: 1, b: 2, parts: 4 },
      tip: '¿Cuántos cuartos comí en total? Cuéntalos en la figura.',
    },
    {
      title: 'Se suman solo los numeradores',
      text: 'Cuando el denominador es el mismo, la regla es facilísima: suma los numeradores y deja el denominador igual. 1/4 + 2/4 = 3/4. ¡El denominador NO se suma!',
      figure: { kind: 'sum', a: 1, b: 2, parts: 4 },
    },
    {
      title: '¿Por qué no se suma el denominador?',
      text: 'El denominador dice el TAMAÑO de los pedazos: cuartos. Al sumar no cambia el tamaño, solo juntamos más pedazos. 1 cuarto + 2 cuartos = 3 cuartos, no "3 octavos".',
      figure: { kind: 'circle', parts: 4, shaded: 3 },
    },
    {
      title: 'Una más para celebrar',
      text: '2/6 + 3/6 = 5/6. Dos sextos más tres sextos son cinco sextos. Ya puedes sumar cualquier fracción con el mismo denominador. ¡Pruébalo tocando la figura!',
      figure: { kind: 'circle', parts: 6, shaded: 5, interactive: true },
      tip: '¿Cuánto falta para completar la pizza entera?',
    },
  ],
  socratic: [
    {
      question: 'Tengo 2/8 de chocolate y mi hermana me regala 3/8 más. ¿Cuántos octavos tengo ahora? Piénsalo antes de responder.',
      figure: { kind: 'sum', a: 2, b: 3, parts: 8 },
      options: [
        { label: '5/8', correct: true, feedback: '¡Perfecto! Sumaste los pedazos: 2 + 3 = 5 octavos.' },
        { label: '5/16', correct: false, feedback: 'Cuidado: sumaste también los denominadores. ¿Cambia el tamaño de los pedazos al juntarlos?' },
        { label: '6/8', correct: false, feedback: 'Casi: multiplicaste en vez de sumar. Solo junta los pedazos: 2 + 3.' },
      ],
      insight: 'Con igual denominador, solo se suman los numeradores: 2/8 + 3/8 = 5/8.',
    },
    {
      question: 'Tu amigo dice que 1/4 + 1/4 = 2/8. Sin decirle la respuesta todavía… ¿qué está mal en su idea?',
      figure: { kind: 'sum', a: 1, b: 1, parts: 4 },
      options: [
        { label: 'Nada, está bien', correct: false, feedback: 'Mmm, mira la figura: dos cuartos juntos. ¿Se ven como 2/8 o como la mitad?' },
        { label: 'Sumó el denominador', correct: true, feedback: '¡Ese es el error! Los pedazos siguen siendo cuartos; solo hay más de ellos.' },
        { label: 'Restó en vez de sumar', correct: false, feedback: 'No restó: fíjate qué hizo con el número de abajo, el denominador.' },
      ],
      insight: '1/4 + 1/4 = 2/4 = 1/2. El denominador marca el tamaño, no se suma.',
    },
    {
      question: 'Si tengo 5/6 de pizza, ¿cuánto me falta para la pizza entera?',
      figure: { kind: 'circle', parts: 6, shaded: 5 },
      options: [
        { label: '1/6', correct: true, feedback: '¡Exacto! 5/6 + 1/6 = 6/6 = la pizza completa.' },
        { label: '1/5', correct: false, feedback: 'Cuenta los espacios vacíos de la figura. ¿Cuántos sextos faltan?' },
        { label: '6/5', correct: false, feedback: 'Eso sería MÁS que una pizza. Solo falta el pedacito vacío que ves.' },
      ],
      insight: '¡Descubriste el complemento! Lo que falta para 6/6 es 1/6.',
    },
  ],
  quiz: [
    {
      question: '1/5 + 2/5 = ?',
      figure: { kind: 'sum', a: 1, b: 2, parts: 5 },
      options: ['3/5', '3/10', '2/5', '1/5'],
      answer: 0,
      explain: 'Mismo denominador: suma arriba (1+2=3) y conserva el 5: 3/5.',
    },
    {
      question: '3/8 + 4/8 = ?',
      figure: { kind: 'sum', a: 3, b: 4, parts: 8 },
      options: ['7/16', '7/8', '12/8', '1/8'],
      answer: 1,
      explain: '3 + 4 = 7 octavos. El denominador no se suma: 7/8.',
    },
    {
      question: '¿Cuál suma está MAL hecha?',
      figure: { kind: 'sum', a: 2, b: 2, parts: 6 },
      options: ['2/6 + 2/6 = 4/6', '1/4 + 2/4 = 3/4', '1/3 + 1/3 = 2/6', '2/8 + 5/8 = 7/8'],
      answer: 2,
      explain: '1/3 + 1/3 = 2/3, no 2/6. ¡Nunca sumes los denominadores!',
    },
    {
      question: 'Tengo 4/7 de una barra y me dan 2/7 más. ¿Cuánto tengo?',
      figure: { kind: 'sum', a: 4, b: 2, parts: 7 },
      options: ['6/14', '6/7', '8/7', '2/7'],
      answer: 1,
      explain: '4 + 2 = 6 séptimos: 6/7. ¡Ya casi tienes la barra entera!',
    },
  ],
};

export const LESSONS: Lesson[] = [queEs, equivalentes, sumar];
