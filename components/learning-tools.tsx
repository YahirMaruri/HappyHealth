"use client"

import { useState } from "react"
import { Check, CheckCircle2, ClipboardCheck, HelpCircle, Printer, RotateCcw } from "lucide-react"

export function LearningTools({ focus, takeaways, nursingTip, urgent, sourceUrl }: { focus: string; takeaways: string[]; nursingTip: string; urgent: string; sourceUrl: string }) {
  const [checked, setChecked] = useState<string[]>([])
  const [answer, setAnswer] = useState<number | null>(null)
  const [question, setQuestion] = useState(0)
  const questions = [
    { title: `En tu guía sobre ${focus.toLowerCase()}, ¿qué acción debes preparar?`, options: ["Aplicar el mismo plan que otra persona sin consultar.", takeaways[0], "Cambiar el tratamiento según lo que vea en redes."], correct: 1, explanation: nursingTip },
    { title: "Si aparece una señal de alarma de esta guía, ¿qué debes hacer?", options: ["Esperar siempre a la próxima cita.", "Buscar atención solo si la aplicación confirma un diagnóstico.", "Solicitar ayuda según la urgencia, sin esperar a completar la guía."], correct: 2, explanation: urgent },
    { title: "Antes de cambiar una dosis o suspender un medicamento…", options: ["Debo acordarlo con el equipo que conoce mi situación.", "Puedo seguir la indicación de un familiar para su propio tratamiento.", "No es necesario consultar si el medicamento es de venta libre."], correct: 0, explanation: "La indicación depende del diagnóstico, el procedimiento y otros tratamientos. Una guía educativa no reemplaza tu receta ni tus instrucciones individuales." },
  ]
  const current = questions[question]
  return <div className="learning-tools">
    <section className="learning-checklist" aria-labelledby="checklist-heading"><span className="learning-icon"><ClipboardCheck size={23} /></span><h3 id="checklist-heading">Mi lista para la consulta</h3><p>Marca lo que ya comprendiste y pregunta al equipo lo que falta. No es una evaluación clínica.</p><div className="learning-progress"><span style={{ width: `${checked.length / takeaways.length * 100}%` }} /></div><span className="learning-count" aria-live="polite">{checked.length} de {takeaways.length} puntos revisados</span><div className="learning-items">{takeaways.map(item => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={event => setChecked(current => event.target.checked ? [...current, item] : current.filter(value => value !== item))} /><span>{item}</span></label>)}</div><button className="print-guide" onClick={() => window.print()}><Printer size={17} /> Imprimir guía y material</button><small>Las marcas se reinician al salir. Puedes imprimir o guardar como PDF desde tu navegador.</small></section>
    <section className="learning-quiz" aria-labelledby="quiz-heading"><span className="learning-icon"><HelpCircle size={23} /></span><div className="quiz-title"><h3 id="quiz-heading">Ponlo en práctica</h3><span>{question + 1} / {questions.length}</span></div><fieldset><legend>{current.title}</legend><div className="quiz-options">{current.options.map((option, index) => <label className={answer === index ? "chosen" : ""} key={`${question}-${index}`}><input type="radio" name={`quiz-${question}`} checked={answer === index} onChange={() => setAnswer(index)} /><span>{option}</span>{answer === index && <Check size={15} />}</label>)}</div></fieldset>{answer !== null && <div className={`quiz-feedback ${answer === current.correct ? "correct" : "retry"}`} role="status"><strong><CheckCircle2 size={17} />{answer === current.correct ? "¡Muy bien!" : "Repasemos este punto"}</strong><p>{current.explanation}</p><a href={question === 2 ? "https://www.who.int/initiatives/medication-without-harm" : sourceUrl} target="_blank" rel="noreferrer">Consultar la fuente</a><button onClick={() => { setQuestion((question + 1) % questions.length); setAnswer(null) }}>{question === questions.length - 1 ? <><RotateCcw size={15} /> Volver a practicar</> : "Siguiente pregunta →"}</button></div>}</section>
  </div>
}
