import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, ArrowUpRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react"
import { SpecialtyCatalog } from "@/components/specialty-catalog"
import { categories } from "@/lib/content/care-guides"
import { CareOnboarding } from "@/components/care-onboarding"
import { HealthVideos } from "@/components/health-videos"

export const metadata: Metadata = {
  title: "Especialidades | HappyHealth",
  description: "Explora las especialidades clínicas, quirúrgicas, médico-quirúrgicas y de urgencias, y de diagnóstico y laboratorio de HappyHealth.",
}

export default function SpecialtiesPage() {
  return (
    <div className="specialties-shell">
      <header className="specialties-header"><Link href="/" className="brand" aria-label="HappyHealth, volver a la bienvenida"><span className="brand-mark"><HeartPulse size={25} /></span>Happy<span>Health</span><b className="logo-dot">.</b></Link><Link href="/" className="back-home"><ArrowLeft size={16} /> Volver al inicio</Link></header>
      <main className="specialties-main">
        <section className="specialties-intro"><span className="specialties-eyebrow"><Sparkles size={14} /> CUIDADO Y ORIENTACIÓN DESPUÉS DEL ALTA</span><h1>Tu recuperación en casa,<br /><span>con más claridad.</span></h1><p>HappyHealth reúne información para personas que continúan su recuperación fuera del hospital, así como para quienes les acompañan. Revisa dudas habituales relacionadas con tu plan, aprende cuidados generales y prepara preguntas para el equipo desde casa. Si necesitas valoración, consulta con el servicio que te atendió si ofrece orientación por teléfono o telesalud.</p><a className="primary-button" href="#busqueda-guiada">Encuentra lo que necesitas <ArrowRight size={17} /></a></section>
        <section className="aftercare-mission" aria-labelledby="aftercare-title"><div className="aftercare-heading"><span className="section-kicker">NUESTRO COMPROMISO CONTIGO</span><h2 id="aftercare-title">Autonomía, confort y tranquilidad después del hospital.</h2><p>El alta es el comienzo de otra etapa de cuidado. Queremos que te sientas acompañado al entender qué hacer en casa, qué dudas llevar al equipo y cuándo pedir ayuda. Para preguntas no urgentes, la información puede ayudarte a preparar una conversación a distancia cuando tu servicio ofrezca esa opción.</p></div><div className="mission-card-grid"><article><span>MISIÓN</span><h3>Acompañar tu cuidado en casa</h3><p>Ofrecer información clara, recursos prácticos y orientación para que pacientes y cuidadores puedan comprender y seguir las indicaciones recibidas al salir del hospital.</p></article><article><span>VISIÓN</span><h3>Más confianza en cada paso</h3><p>Contribuir a que la recuperación fuera del hospital se viva con seguridad, confort, autonomía y espacio para la felicidad cotidiana.</p></article><article><span>OBJETIVO</span><h3>Ayudarte a encontrar el siguiente paso</h3><p>Conectar tus preguntas con guías relevantes y ayudarte a organizar dudas, cuidados e información para tu seguimiento.</p></article></div><aside className="aftercare-safety"><ShieldCheck size={22} /><p><strong>Esta aplicación ofrece información general, no una valoración clínica.</strong> No diagnostica, no determina que una complicación sea leve y no reemplaza las instrucciones para cuidarte en casa ni las indicaciones de tu equipo. La búsqueda solo adapta las guías sugeridas; no envía ni almacena tus respuestas. Si algo empeora, contacta al profesional o servicio que te atendió; ante dificultad para respirar, desmayo, sangrado abundante, dolor intenso o un cambio súbito, busca atención de emergencia. Algunas situaciones requieren exploración presencial, análisis u otros estudios.</p></aside><p className="aftercare-source">Prepara tu consulta con <a href="https://medlineplus.gov/spanish/ency/patientinstructions/000867.htm" target="_blank" rel="noreferrer">esta guía de MedlinePlus para organizar la salida del hospital</a> y revisa <a href="https://medlineplus.gov/spanish/telehealth.html" target="_blank" rel="noreferrer">cuándo puede servir la telesalud</a>.</p></section>
        <CareOnboarding />
        <HealthVideos />
        <section className="specialties-directory-intro"><span className="section-kicker">EXPLORA POR ÁREA DE ATENCIÓN</span><h2>Guías para cada etapa de tu cuidado</h2><p>Elige una especialidad o busca un tema directamente en el catálogo.</p></section>
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
      <footer className="specialties-footer"><span>HappyHealth · Juntos, cuidamos mejor.</span><span>Tu bienestar nos inspira.</span><small>Created by Dr. Odai Yahir Maruri García</small></footer>
    </div>
  )
}
