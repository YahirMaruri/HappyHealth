"use client"

import { useState } from "react"
import { ClipboardCheck, Printer, RotateCcw } from "lucide-react"
import type { SelfCareActivity } from "@/lib/content/self-care"

export function SelfCareActivities({ activities }: { activities: SelfCareActivity[] }) {
  const [checked, setChecked] = useState<string[]>([])
  const [notes, setNotes] = useState({ goal: "", observations: "", questions: "" })
  const fields = [
    { id: "goal", label: "Mi objetivo de autoasistencia", placeholder: "Una tarea que quiero preparar o realizar con el apoyo indicado…" },
    { id: "observations", label: "Lo que observé y el apoyo que necesito", placeholder: "Qué cambió, cuándo y qué dificultad encontré…" },
    { id: "questions", label: "Mis preguntas para el equipo", placeholder: "Qué necesito aclarar antes de seguir…" },
  ] as const

  return <div className="self-care-workspace">
    <div className="self-care-status">
      <div><strong aria-live="polite">{checked.length} de {activities.length} actividades revisadas</strong><p>Elige las que se apliquen a ti; no necesitas completarlas todas.</p></div>
      <button type="button" disabled={!checked.length} onClick={() => setChecked([])}><RotateCcw size={16} /> Reiniciar marcas</button>
    </div>
    <progress className="self-care-progress" value={checked.length} max={activities.length} aria-label="Actividades de autoasistencia revisadas" />
    <div className="self-care-grid">{activities.map((activity, index) => <article className="self-care-card" key={activity.id}>
      <span className="self-care-number">ACTIVIDAD {String(index + 1).padStart(2, "0")}</span>
      <h3>{activity.title}</h3><p className="self-care-when">{activity.when}</p>
      <ol>{activity.steps.map(step => <li key={step}>{step}</li>)}</ol>
      <p className="self-care-outcome"><strong>Para llevarte:</strong> {activity.outcome}</p>
      <label className="self-care-check"><input type="checkbox" checked={checked.includes(activity.id)} onChange={event => setChecked(previous => event.target.checked ? [...previous, activity.id] : previous.filter(id => id !== activity.id))} /><span>He revisado: {activity.title.toLocaleLowerCase("es")}</span></label>
    </article>)}</div>
    <section className="self-care-notes" aria-labelledby="self-care-notes-title">
      <h3 id="self-care-notes-title"><ClipboardCheck size={22} /> Mi hoja de autoasistencia</h3>
      <p id="self-care-privacy">Estas notas y marcas solo permanecen mientras estás en esta página. No se envían a tu equipo de salud. Puedes imprimirlas antes de salir.</p>
      <div className="self-care-note-fields">{fields.map(field => <label key={field.id} htmlFor={`self-care-${field.id}`}>{field.label}<textarea id={`self-care-${field.id}`} rows={4} maxLength={2000} aria-describedby="self-care-privacy" value={notes[field.id]} placeholder={field.placeholder} onChange={event => setNotes(previous => ({ ...previous, [field.id]: event.target.value }))} /><span className="self-care-print-note">{notes[field.id] || "________________________________________________________________"}</span></label>)}</div>
      <button type="button" className="print-guide" onClick={() => window.print()}><Printer size={17} /> Imprimir guía y mis notas</button>
    </section>
  </div>
}
