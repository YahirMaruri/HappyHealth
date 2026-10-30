"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Search, Sparkles, X } from "lucide-react"
import { careGuides } from "@/lib/content/care-guides"

const intents = [
  { id: "alta", title: "Estoy en casa después del alta", detail: "Encontrar orientaciones para el cuidado y la recuperación en casa.", suggestions: ["herida", "medicamentos", "cadera", "ostomía", "fractura", "rehabilitación"], priority: ["quirurgicas", "clinicas", "urgencias"] },
  { id: "condicion", title: "Quiero entender una enfermedad", detail: "Explorar un diagnóstico, sus cuidados y qué conversar en consulta.", suggestions: ["diabetes", "presión", "asma", "artritis", "migraña", "riñón"], priority: ["clinicas", "urgencias", "quirurgicas"] },
  { id: "procedimiento", title: "Tengo un procedimiento o estudio", detail: "Prepararme y saber qué preguntas hacer al equipo.", suggestions: ["biopsia", "resonancia", "colonoscopia", "catarata", "cirugía", "análisis"], priority: ["quirurgicas", "diagnostico", "urgencias"] },
  { id: "acompanante", title: "Acompaño a alguien en su cuidado", detail: "Consultar ideas para apoyar a una persona en casa.", suggestions: ["cuidados en casa", "pediatría", "demencia", "caídas", "medicamentos", "bienestar"], priority: ["clinicas", "quirurgicas", "urgencias", "diagnostico"] },
] as const

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es")

export function CareOnboarding() {
  const [intentId, setIntentId] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const intent = intents.find(option => option.id === intentId)
  const matching = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) return []
    return careGuides
      .filter(guide => normalize(`${guide.focus} ${guide.name} ${guide.description} ${guide.overview} ${guide.audience}`).includes(term))
      .sort((a, b) => {
        const rank = (category: string) => {
          if (!intent) return 0
          const index = (intent.priority as readonly string[]).indexOf(category)
          return index < 0 ? intent.priority.length : index
        }
        return rank(a.category) - rank(b.category)
      })
      .slice(0, 6)
  }, [intent, query])

  return <section className="care-onboarding" id="busqueda-guiada" aria-labelledby="onboarding-title">
    <div className="onboarding-heading"><span className="specialties-eyebrow"><Sparkles size={15} /> EMPIEZA POR LO QUE NECESITAS</span><h2 id="onboarding-title">¿Cómo podemos acompañarte?</h2><p>Elige lo que mejor describe tu situación y explora temas para preparar tu cuidado en casa.</p></div>
    <div className="onboarding-intents" role="group" aria-label="Elige qué necesitas hoy">{intents.map(option => <button type="button" aria-pressed={intentId === option.id} className={`onboarding-intent ${intentId === option.id ? "selected" : ""}`} onClick={() => { setIntentId(option.id); setQuery("") }} key={option.id}><strong>{option.title}</strong><span>{option.detail}</span></button>)}</div>
    {intent && <div className="onboarding-search-panel" aria-live="polite"><div className="onboarding-personalized"><span>PARA TI</span><p>{intent.detail} Prueba con una búsqueda o elige un tema para empezar.</p></div>
      <label className="catalog-search onboarding-search"><Search size={19} /><span className="sr-only">Busca una enfermedad, procedimiento o síntoma</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ej.: herida, diabetes, catarata…" /><button type="button" aria-label="Limpiar búsqueda" disabled={!query} onClick={() => setQuery("")}><X size={17} /></button></label>
      <div className="onboarding-suggestions" aria-label="Temas sugeridos">{intent.suggestions.map(suggestion => <button type="button" key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>)}</div>
      {query.trim() && <div className="onboarding-results" aria-live="polite"><h3>{matching.length ? `Temas que podrían ayudarte (${matching.length})` : "No encontramos coincidencias"}</h3>{matching.length ? <div className="onboarding-result-grid">{matching.map(guide => <article key={guide.slug}><span>{guide.name}</span><strong>{guide.focus}</strong><p>{guide.overview}</p><Link href={`/especialidades/${guide.category}/${guide.slug}`}>Ver guía <ArrowRight size={16} /></Link></article>)}</div> : <p className="onboarding-no-results">Prueba otro término o revisa el <a href="#catalogo">catálogo completo</a>.</p>}</div>}
    </div>}
  </section>
}
