import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight, HeartPulse, Sparkles } from "lucide-react"
import { SpecialtyCatalog } from "@/components/specialty-catalog"
import { categories } from "@/lib/content/care-guides"

export const metadata: Metadata = {
  title: "Especialidades | HappyHealth",
  description: "Explora las especialidades clínicas, quirúrgicas, médico-quirúrgicas y de urgencias, y de diagnóstico y laboratorio de HappyHealth.",
}

export default function SpecialtiesPage() {
  return (
    <div className="specialties-shell">
      <header className="specialties-header"><Link href="/" className="brand" aria-label="HappyHealth, volver a la bienvenida"><span className="brand-mark"><HeartPulse size={25} /></span>Happy<span>Health</span><b className="logo-dot">.</b></Link><Link href="/" className="back-home"><ArrowLeft size={16} /> Volver al inicio</Link></header>
      <main className="specialties-main">
        <section className="specialties-intro"><span className="specialties-eyebrow"><Sparkles size={14} /> CONOCE NUESTRAS ESPECIALIDADES</span><h1>Un mundo de cuidados,<br /><span>pensado para ti.</span></h1><p>Explora nuestras cuatro áreas de atención y descubre cómo cada una contribuye a tu bienestar.</p></section>
        <section className="specialties-grid" aria-label="Grupos de especialidades">{categories.map(category => <article className={`specialty-card ${category.color}`} id={category.id} key={category.id}>
          <div className="specialty-art"><span className="specialty-number">{category.number}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={category.image} alt={category.alt} width={720} height={480} loading="eager" />
          </div>
          <div className="specialty-copy"><h2>{category.title}</h2><p>{category.description}</p><a className="category-catalog-link" href={`#grupo-${category.id}`}>Ver especialidades <ArrowUpRight size={18} /></a></div>
        </article>)}</section>
        <aside className="specialties-note"><span><HeartPulse size={24} /></span><div><h2>Diferentes especialidades. El mismo compromiso.</h2><p>Autoasistencia, Confort, Seguridad y Estabilidad en cada paso.</p></div><Sparkles className="note-spark" size={24} /></aside>
        <SpecialtyCatalog />
      </main>
      <footer className="specialties-footer"><span>HappyHealth · Juntos, cuidamos mejor.</span><span>Tu bienestar nos inspira.</span></footer>
    </div>
  )
}
