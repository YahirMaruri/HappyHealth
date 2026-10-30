import Link from "next/link"
import { ArrowRight, HeartPulse, Sparkles, HandHeart, Smile, ShieldCheck, Activity } from "lucide-react"

const values = [
  { label: "Autoasistencia", icon: HandHeart, color: "teal" },
  { label: "Confort", icon: Smile, color: "coral" },
  { label: "Seguridad", icon: ShieldCheck, color: "purple" },
  { label: "Estabilidad", icon: Activity, color: "gold" },
]

export default function Page() {
  return (
    <main className="splash-screen happy-splash">
      <div className="splash-values" aria-label="Nuestros pilares">{values.map(value => <span className={`value-pill ${value.color}`} key={value.label}><value.icon size={16} />{value.label}</span>)}</div>
      <div className="splash-content">
        <div className="emblem-frame"><span className="emblem-spark spark-left"><Sparkles size={26} /></span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="splash-emblem" src="/images/happyhealth-emblema-alegre.png" alt="Emblema de colores alegres con lámpara de enfermería, báculo de Esculapio, copa de Higía, manzana y trigo, figura en movimiento y letra psi, alrededor de un corazón" fetchPriority="high" width={480} height={480} />
          <span className="emblem-spark spark-right"><Sparkles size={20} /></span>
        </div>
        <h1 className="splash-logo">Happy<span>Health</span><span className="logo-dot">.</span></h1>
        <p className="splash-tagline">Seis disciplinas. Un mismo corazón.</p>
        <div className="splash-disciplines" aria-label="Disciplinas del equipo"><span>Enfermería</span><span>Medicina</span><span>Farmacia</span><span>Nutrición</span><span>Fisioterapia</span><span>Psicología</span></div>
        <Link className="primary-button splash-start" href="/especialidades">Iniciar <ArrowRight size={19} /></Link>
        <p className="splash-footnote">Un nuevo camino para cuidar de ti.</p>
      </div>
      <span className="splash-bottom"><HeartPulse size={16} /> Atención integral, humana y cercana</span>
    </main>
  )
}
