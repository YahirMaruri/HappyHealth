import { Activity, Apple, Baby, Bone, Brain, CircleDot, Dna, Droplets, Ear, Eye, FlaskConical, HeartPulse, Microscope, PersonStanding, Pill, Ribbon, Scan, Scissors, ShieldCheck, Stethoscope, Wind, type LucideIcon } from "lucide-react"

const icons: Record<string, LucideIcon> = {
  cardiologia: HeartPulse, endocrinologia: Droplets, neumologia: Wind, neurologia: Brain,
  nefrologia: Droplets, gastroenterologia: Apple, reumatologia: Bone, hematologia: Droplets,
  oncologia: Ribbon, infectologia: ShieldCheck, geriatria: PersonStanding, pediatria: Baby,
  "cirugia-general": Scissors, "traumatologia-ortopedia": Bone, neurocirugia: Brain,
  "cirugia-cardiaca": HeartPulse, "angiologia-cirugia-vascular": Activity, "cirugia-toracica": Wind,
  "cirugia-plastica-reconstructiva": Scissors, coloproctologia: CircleDot, ginecologia: PersonStanding,
  obstetricia: Baby, urologia: Droplets, otorrinolaringologia: Ear, oftalmologia: Eye,
  dermatologia: ShieldCheck, "medicina-urgencias": HeartPulse, "laboratorio-clinico": FlaskConical,
  "radiologia-imagen": Scan, "anatomia-patologica": Microscope, "medicina-nuclear": Pill,
  "genetica-medica": Dna, neurofisiologia: Activity,
}

export function GuideIcon({ slug, size = 22 }: { slug: string; size?: number }) {
  const Icon = icons[slug] ?? Stethoscope
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />
}
