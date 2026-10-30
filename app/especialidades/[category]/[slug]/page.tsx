import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, CircleAlert, ExternalLink, HeartPulse, Lightbulb, ListChecks, MessageCircle, ShieldCheck, Sparkles, Users } from "lucide-react"
import { careGuides, categories, commonReferences, disciplines, getGuide, reviewedOn, sectionReferences, learningBoards, topicQuestions } from "@/lib/content/care-guides"
import { DisciplineSymbol } from "@/components/discipline-symbol"
import { LearningTools } from "@/components/learning-tools"
import { TopicDiagram } from "@/components/topic-diagram"
import { SelfCareActivities } from "@/components/self-care-activities"
import { getSelfCareActivities, selfCareReference } from "@/lib/content/self-care"

type Props = { params: Promise<{ category: string; slug: string }> }

export function generateStaticParams() {
  return careGuides.map(guide => ({ category: guide.category, slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const guide = getGuide(category, slug)
  return guide ? { title: `${guide.name}: ${guide.focus} | HappyHealth`, description: guide.overview } : { title: "Guía no encontrada | HappyHealth" }
}

export default async function CareGuidePage({ params }: Props) {
  const { category: categoryId, slug } = await params
  const guide = getGuide(categoryId, slug)
  if (!guide) notFound()
  const category = categories.find(item => item.id === guide.category)!
  const references = [...guide.references, ...commonReferences]
  const specialtySlug = guide.specialtySlug ?? guide.slug
  const siblings = careGuides.filter(item => (item.specialtySlug ?? item.slug) === specialtySlug)
  const related = careGuides.filter(item => item.category === guide.category && item.slug !== guide.slug).sort((a,b) => Number((b.specialtySlug ?? b.slug) === specialtySlug) - Number((a.specialtySlug ?? a.slug) === specialtySlug)).slice(0, 3)
  const educationCards = guide.education ? [
    { title: "Qué observar y comprender", text: guide.education.signs, icon: CircleAlert },
    { title: "Cómo se evalúa", text: guide.education.evaluation, icon: BookOpen },
    { title: "Cómo prepararte", text: guide.education.preparation, icon: ListChecks },
    { title: "Qué sigue después", text: guide.education.followup, icon: MessageCircle },
  ] : []
  return (
    <div className={`specialties-shell care-guide ${category.color}`}>
      <header className="specialties-header"><Link href="/" className="brand"><span className="brand-mark"><HeartPulse size={25} /></span>Happy<span>Health</span><b className="logo-dot">.</b></Link><Link href={`/especialidades#grupo-${category.id}`} className="back-home"><ArrowLeft size={16} /> Volver a especialidades</Link></header>
      <main className="care-main">
        <nav className="guide-breadcrumb" aria-label="Ruta de navegación"><Link href="/especialidades">Especialidades</Link><span>/</span><Link href={`/especialidades#grupo-${category.id}`}>{category.title}</Link><span>/</span><span aria-current="page">{guide.name}</span></nav>
        <nav className="topic-switcher" aria-label={`Temas de ${guide.name}`}><span>EN ESTA ESPECIALIDAD</span>{siblings.map(item => <Link key={item.slug} href={`/especialidades/${item.category}/${item.slug}`} aria-current={item.slug === guide.slug ? "page" : undefined}>{item.focus}</Link>)}</nav>
        <section className="guide-hero"><div className="guide-hero-copy"><span className="specialties-eyebrow"><BookOpen size={14} /> GUÍA PARA PACIENTES Y CUIDADORES</span><span className="guide-specialty">{guide.name}</span><h1>{guide.focus}</h1><p>{guide.overview}</p><div className="guide-audience"><Users size={18} /><span>{guide.audience}</span></div></div><figure className="guide-hero-image"><Image src={category.image} alt={category.alt} width={720} height={480} sizes="(max-width: 650px) 100vw, 45vw" preload /><figcaption>Ilustración del área de atención · HappyHealth</figcaption></figure></section>
        <aside className="guide-context"><ShieldCheck size={21} /><p><strong>Usa esta guía junto con tu equipo de salud.</strong> Las recomendaciones son educativas y se adaptan a tu diagnóstico, edad y procedimiento. Tu receta y hoja de alta tienen prioridad. No cambies dosis, ayuno, líquidos o ejercicios sin confirmar tu plan.</p></aside>
        <div className="guide-quick-links"><a href="#comprender"><BookOpen size={16} /> Comprende tu tema</a><a href="#disciplinas"><Users size={16} /> Las seis disciplinas</a><a href="#autoasistencia"><ListChecks size={16} /> Autoasistencia</a><a href="#material"><ListChecks size={16} /> Material didáctico</a><a href="#alertas"><CircleAlert size={16} /> Señales de alarma</a><a href="#referencias"><BookOpen size={16} /> Referencias</a></div>
        <section className="topic-education" id="comprender" aria-labelledby="understand-title"><div className="guide-section-title"><div><span className="section-kicker">INFORMACIÓN PARA ENTENDER Y DECIDIR</span><h2 id="understand-title">Comprende lo que está pasando</h2><p>Una explicación visual y cuatro puntos para preparar tu atención.</p></div></div><div className="topic-education-layout"><TopicDiagram specialty={specialtySlug} focus={guide.focus} /><div className="education-card-grid">{educationCards.map((card,index) => <article className={`education-card education-${index}`} key={card.title}><span><card.icon size={21} /></span><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div><p className="alert-reference">Información del tema: {guide.references.map((ref,index) => <a key={ref.url} href={`#ref-${index+1}`}>[{index+1}] </a>)}</p></section>
        <section className="guide-discipline-section" id="disciplinas" aria-labelledby="disciplines-title"><div className="guide-section-title"><div><span className="section-kicker">UN EQUIPO PARA CUIDAR DE TI</span><h2 id="disciplines-title">Las seis disciplinas te acompañan</h2><p>Consulta los cuidados de cada área. Cuando una intervención no se necesita de rutina, lo indicamos.</p></div><span className="guide-six">6 perspectivas<br /><strong>Un cuidado integral</strong></span></div>
          <nav className="discipline-nav" aria-label="Ir a una disciplina">{disciplines.map(discipline => <a className={discipline.color} key={discipline.id} href={`#${discipline.id}`}><DisciplineSymbol discipline={discipline.id} size={25} />{discipline.name}</a>)}</nav>
          <div className="discipline-panels">{disciplines.map((discipline, index) => <section className={`discipline-panel ${discipline.color}`} id={discipline.id} aria-labelledby={`${discipline.id}-title`} key={discipline.id}>
            <div className="discipline-panel-header"><span className="discipline-symbol"><DisciplineSymbol discipline={discipline.id} size={35} /></span><div><span className="discipline-step">DISCIPLINA 0{index + 1}</span><h3 id={`${discipline.id}-title`}>{discipline.name}</h3><p>{discipline.description}</p></div></div>
            <figure className="discipline-teaching-image"><Image src={`/images/disciplinas/${discipline.id}.webp`} alt={learningBoards[discipline.id].alt} width={960} height={640} sizes="(max-width: 650px) 100vw, 45vw" /><figcaption>{learningBoards[discipline.id].title} · Ilustración educativa</figcaption></figure>
            <p className="discipline-why">{learningBoards[discipline.id].why}</p>
            <h4 className="discipline-subtitle">Recomendaciones para este tema</h4>
            <ol className="care-recommendations">{guide.recommendations[discipline.id].map((recommendation, i) => <li key={recommendation}><span>{i + 1}</span><p>{recommendation}</p></li>)}</ol>
            <div className="discipline-practice"><h4><Lightbulb size={16} /> Así puedes prepararlo con tu equipo</h4><ol>{learningBoards[discipline.id].steps.map((step,i) => <li key={step}><span>{i+1}</span><p>{step}</p></li>)}</ol></div>
            <div className="topic-question"><MessageCircle size={18} /><div><span>PREGUNTA PARA TU CONSULTA</span><p>{topicQuestions[guide.slug]?.[index] ?? learningBoards[discipline.id].question}</p></div></div>
            <div className="discipline-source"><BookOpen size={13} /><span>Fuentes: {sectionReferences(guide, discipline.id).map((reference, i) => <span key={reference.url}>{i > 0 && ", "}<a href={`#ref-${references.findIndex(item => item.url === reference.url) + 1}`}>[{references.findIndex(item => item.url === reference.url) + 1}]</a></span>)}</span></div>
          </section>)}</div>
        </section>
        <section className="guide-alerts" id="alertas" aria-labelledby="alerts-title"><div className="guide-section-title"><div><span className="section-kicker">SABER CUÁNDO PEDIR AYUDA</span><h2 id="alerts-title">Señales que no debes ignorar</h2></div></div><div className="alert-grid"><article className="alert-emergency"><CircleAlert size={25} /><div><h3>Atención inmediata</h3><p>{guide.urgent}</p><small>Ante una emergencia, llama al número local de emergencias. No esperes a terminar esta guía.</small></div></article><article className="alert-contact"><MessageCircle size={25} /><div><h3>Contacta a tu equipo</h3><p>{guide.contact}</p><small>Estas señales no son una lista exhaustiva. Si hay deterioro rápido, busca atención urgente.</small></div></article></div><p className="alert-reference">Base del tema y señales de alarma: {guide.references.map((reference, i) => <a href={`#ref-${i + 1}`} key={reference.url}>[{i + 1}] </a>)}</p></section>
        <section className="guide-self-care" id="autoasistencia" aria-labelledby="self-care-title">
          <div className="guide-section-title"><div><span className="section-kicker">PEQUEÑAS ACCIONES PARA TU DÍA A DÍA</span><h2 id="self-care-title">Actividades de autoasistencia</h2><p>Prepara tu cuidado sobre {guide.focus.toLocaleLowerCase("es")} con pasos concretos. Realiza solo lo compatible con las indicaciones de tu equipo; las marcas sirven para organizarte, no para evaluar tu salud.</p></div></div>
          <SelfCareActivities key={guide.slug} activities={getSelfCareActivities(guide)} />
          <p className="alert-reference">Actividades educativas basadas en tu guía y en <a href={selfCareReference.url} target="_blank" rel="noreferrer">la preparación de la consulta de MedlinePlus</a>. Recursos de apoyo consultados el 30 de octubre de 2026.</p>
        </section>
        <section className="guide-material" id="material" aria-labelledby="material-title"><div className="guide-section-title"><div><span className="section-kicker">APRENDER TAMBIÉN ES CUIDARTE</span><h2 id="material-title">Material didáctico para llevar contigo</h2><p>Repasa las ideas, prepara preguntas y conserva una copia para conversar con tu equipo.</p></div><Lightbulb size={30} /></div>
          <figure className="care-roadmap"><figcaption>Tu ruta de autocuidado · {guide.focus}</figcaption><div>{guide.takeaways.map((takeaway, i) => <div className="roadmap-step" key={takeaway}><span>{i === 0 ? <BookOpen size={25} /> : i === 1 ? <CheckCircle2 size={25} /> : <MessageCircle size={25} />}</span><small>PASO 0{i + 1}</small><h3>{["Comprende", "Prepara", "Comparte"][i]}</h3><p>{takeaway}</p></div>)}</div><p className="roadmap-source">Ficha educativa de HappyHealth a partir de las fuentes de esta guía. Las imágenes son ilustrativas.</p></figure>
          <LearningTools focus={guide.focus} takeaways={guide.takeaways} nursingTip={guide.recommendations.enfermeria[0]} urgent={guide.urgent} sourceUrl={guide.references[0].url} />
          <details className="teach-back"><summary><MessageCircle size={18} /> Preguntas para conversar con mi equipo <span>+</span></summary><ul><li>¿Qué recomendaciones de esta guía se aplican a mi situación y cuáles cambian?</li><li>¿Qué debo hacer si los síntomas cambian, y a qué teléfono puedo llamar?</li><li>¿Cómo debo organizar medicamentos, alimentación y actividad en mi caso?</li><li>¿Podemos repasar el plan mientras lo explico con mis propias palabras?</li></ul></details>
        </section>
        <section className="guide-references" id="referencias" aria-labelledby="refs-title"><span className="section-kicker">PARA CONSULTAR Y SEGUIR APRENDIENDO</span><h2 id="refs-title"><BookOpen size={23} /> Referencias bibliográficas</h2><p>Fuentes institucionales consultadas el {reviewedOn}. Referencias del tema y recursos transversales de seguridad, rehabilitación y bienestar emocional. Síntesis educativa; no constituye una revisión clínica individual ni un protocolo hospitalario.</p><ol>{references.map((reference, index) => <li key={reference.url} id={`ref-${index + 1}`}><span>[{index + 1}]</span><div><strong>{reference.organization}.</strong> <a href={reference.url} target="_blank" rel="noreferrer">{reference.title} <ExternalLink size={12} /></a><small>Recurso en línea · consulta: {reviewedOn}{reference.organization === "Organización Mundial de la Salud" && reference.title.startsWith("Medication") ? " · en inglés" : ""}.</small></div></li>)}</ol></section>
        <section className="related-guides" aria-label="Otras guías del área"><h2>Sigue explorando</h2><div>{related.map(item => <Link key={item.slug} href={`/especialidades/${item.category}/${item.slug}`}><div><span>{item.name}</span><strong>{item.focus}</strong></div><ArrowRight size={18} /></Link>)}</div></section>
        <aside className="specialties-note"><span><HeartPulse size={24} /></span><div><h2>Cuidarte es un aprendizaje compartido.</h2><p>Autoasistencia, Confort, Seguridad y Estabilidad, con un equipo que te acompaña.</p></div><Sparkles className="note-spark" size={24} /></aside>
      </main>
      <footer className="specialties-footer"><span>HappyHealth · Educación para tu bienestar.</span><Link href="/especialidades">Volver al catálogo</Link></footer>
    </div>
  )
}
