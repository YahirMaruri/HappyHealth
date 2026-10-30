"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Search, X } from "lucide-react"
import { careGuides, categories, specialties } from "@/lib/content/care-guides"
import { GuideIcon } from "@/components/guide-icon"

const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

export function SpecialtyCatalog() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("todas")
  const matches = careGuides.filter(guide => (filter === "todas" || guide.category === filter) && normalize(`${guide.name} ${guide.description} ${guide.focus}`).includes(normalize(query.trim())))
  return (
    <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
      <div className="catalog-heading"><div><span className="section-kicker">APRENDE A CUIDARTE, PASO A PASO</span><h2 id="catalog-title">Encuentra tu especialidad</h2><p>{specialties.length} especialidades, {careGuides.length} temas de salud y seis disciplinas para acompañarte.</p></div><span className="catalog-total"><BookOpen size={17} />{careGuides.length} guías ilustradas</span></div>
      <div className="catalog-controls"><label className="catalog-search"><Search size={18} /><span className="sr-only">Buscar especialidad, patología o procedimiento</span><input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Busca, por ejemplo: diabetes, cadera o resonancia" /></label><label className="catalog-filter"><span className="sr-only">Filtrar por grupo de especialidades</span><select value={filter} onChange={event => setFilter(event.target.value)}><option value="todas">Todas las especialidades</option>{categories.map(category => <option value={category.id} key={category.id}>{category.title}</option>)}</select></label></div>
      <p className="catalog-count" aria-live="polite">{matches.length} {matches.length === 1 ? "guía disponible" : "guías disponibles"}{query.trim() ? ` para “${query.trim()}”` : ""}</p>
      {matches.length === 0 && <div className="catalog-empty"><Search size={30} /><h3>No encontramos esa búsqueda</h3><p>Prueba con el nombre de una especialidad o de su tema de cuidado.</p><button onClick={() => {setQuery(""); setFilter("todas")}}><X size={15} /> Limpiar filtros</button></div>}
      {categories.map(category => {
        const group = specialties.filter(specialty => specialty.category === category.id && matches.some(guide => (guide.specialtySlug ?? guide.slug) === specialty.slug))
        if (!group.length) return null
        return <section className={`catalog-group ${category.color}`} key={category.id} id={`grupo-${category.id}`} aria-labelledby={`titulo-${category.id}`}>
          <div className="catalog-group-heading"><div className="catalog-group-image"><Image src={category.image} alt={category.alt} width={96} height={72} sizes="75px" /></div><div><span>ÁREA {category.number} · {group.length} ESPECIALIDADES</span><h3 id={`titulo-${category.id}`}>{category.title}</h3></div></div>
          <div className="subspecialty-grid">{group.map(specialty => <article className="subspecialty-card" key={specialty.slug}><span className="subspecialty-icon"><GuideIcon slug={specialty.slug} /></span><h4>{specialty.name}</h4><p>{specialty.description}</p><div className="specialty-topic-list">{matches.filter(guide => (guide.specialtySlug ?? guide.slug) === specialty.slug).map(guide => <div className="specialty-topic-item" key={guide.slug}><div className="guide-topic"><BookOpen size={15} /><div><span>ENFERMEDAD O PROCEDIMIENTO</span><strong>{guide.focus}</strong></div></div><Link href={`/especialidades/${guide.category}/${guide.slug}`} className="explore-link" aria-label={`Explorar ${specialty.name}: ${guide.focus}`}>Explorar <ArrowRight size={17} /></Link></div>)}</div></article>)}</div>
        </section>
      })}
      <p className="catalog-scope">Organización orientativa de especialidades y subespecialidades. Algunas pertenecen a más de un grupo. Cada tema abre una guía propia con explicaciones, esquemas, cuidados, material didáctico y referencias; el catálogo no es exhaustivo.</p>
    </section>
  )
}
