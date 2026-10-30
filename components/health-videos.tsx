type Video = { title: string; description: string; topic: string[]; file: string; page: string }

const videos: Video[] = [
  { title: "Sistema cardiovascular", description: "Animación sobre el corazón y los vasos sanguíneos.", topic: ["cardio", "corazon", "vascular", "presion arterial", "hipertension"], file: "200081", page: "000023" },
  { title: "Presión arterial", description: "Conoce cómo circula la sangre y qué significa la presión arterial.", topic: ["presion", "hipertension"], file: "200079", page: "000013" },
  { title: "Enfermedad de las arterias coronarias", description: "Animación sobre las arterias que llevan sangre al corazón.", topic: ["coronaria", "cardiaca", "infarto", "angina"], file: "200082", page: "000037" },
  { title: "Respiración", description: "Recorrido animado del aire y el intercambio de oxígeno en el cuerpo.", topic: ["respir", "pulmon", "asma", "epoc", "neumon"], file: "200020", page: "000018" },
  { title: "Cataratas", description: "Animación que explica cómo una catarata afecta la visión.", topic: ["catarata", "oftalm", "ocular", "vista", "vision"], file: "200046", page: "000024" },
  { title: "Osteoporosis", description: "Animación sobre los cambios en los huesos asociados con la osteoporosis.", topic: ["osteoporosis", "hueso", "fractura", "ortoped", "reuma"], file: "200027", page: "000093" },
  { title: "Componentes del cerebro", description: "Ilustración de las principales partes del cerebro.", topic: ["cerebr", "neurolog", "parkinson", "epilep", "demencia"], file: "200008", page: "000016" },
]

function matches(video: Video, query: string) {
  const normalized = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  return video.topic.some(topic => normalized.includes(topic))
}

export function HealthVideos({ topic, compact = false }: { topic?: string; compact?: boolean }) {
  const selected = topic ? videos.filter(video => matches(video, topic)).slice(0, 2) : videos
  const searchUrl = `https://medlineplus.gov/spanish/search/?query=${encodeURIComponent(topic ?? "videos de salud")}`
  return (
    <section className={`health-videos ${compact ? "health-videos-compact" : ""}`} id={compact ? undefined : "videos"} aria-labelledby={compact ? "related-videos-title" : "health-videos-title"}>
      <div className="guide-section-title"><div><span className="section-kicker">VIDEOS EDUCATIVOS EN ESPAÑOL</span><h2 id={compact ? "related-videos-title" : "health-videos-title"}>{compact ? "Video relacionado" : "Aprende con videos"}</h2><p>{compact ? "Recurso audiovisual de MedlinePlus relacionado con este tema." : "Reproduce animaciones breves de MedlinePlus. Selecciona uno para cargarlo; requiere conexión a internet."}</p></div></div>
      {selected.length ? <div className="health-video-grid">{selected.map(video => {
        const file = `https://medlineplus.gov/spanish/ency/videos/mov/${video.file}_esp.mp4`
        const page = `https://medlineplus.gov/spanish/ency/anatomyvideos/${video.page}.htm`
        return <article className="health-video-card" key={video.file}>
          <video controls preload="none" playsInline width="640" height="360" aria-label={`Video educativo: ${video.title}`}><source src={file} type="video/mp4" />Tu navegador no puede reproducir este video. <a href={file}>Abrir el archivo de video</a>.</video>
          <div className="health-video-copy"><h3>{video.title}</h3><p>{video.description}</p><a href={page} target="_blank" rel="noreferrer">Ver ficha y descripción en MedlinePlus ↗</a></div>
        </article>
      })}</div> : topic ? <article className="health-video-search"><div><span className="section-kicker">RECURSO PARA ESTE TEMA</span><h3>Busca un video sobre {topic}</h3><p>La biblioteca consultada no tiene un video específico verificado para esta guía. Busca este tema en MedlinePlus para encontrar recursos audiovisuales disponibles.</p><a href={searchUrl} target="_blank" rel="noreferrer">Buscar “{topic}” en MedlinePlus ↗</a></div></article> : <p className="health-videos-empty">Explora la biblioteca completa de videos en español de MedlinePlus.</p>}
      {!compact && <p className="health-videos-source">Videos y descripciones: <a href="https://medlineplus.gov/spanish/videos-de-medlineplus/" target="_blank" rel="noreferrer">Biblioteca de videos de MedlinePlus</a>, Biblioteca Nacional de Medicina de EE. UU.</p>}
    </section>
  )
}
