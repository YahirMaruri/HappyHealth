import type { CareGuide, DisciplineId } from "./care-guides"

export type SelfCareActivity = {
  id: string
  title: string
  when: string
  outcome: string
  steps: string[]
}

export const selfCareReference = {
  title: "Hablando con su doctor: preparar preguntas, síntomas y seguimiento",
  organization: "Biblioteca Nacional de Medicina de EE. UU. · MedlinePlus en español",
  url: "https://medlineplus.gov/spanish/talkingwithyourdoctor.html",
}

export const extraRecommendations: Record<DisciplineId, string[]> = {
  enfermeria: [
    "Cuando necesites una técnica de cuidado, pide que te la demuestren y luego practícala con supervisión hasta aclarar tus dudas.",
    "Prepara los materiales indicados y comprueba si necesitas ayuda para ver, leer, sujetar objetos o recordar los pasos.",
    "Anota qué cuidados puedes realizar por ti mismo y cuáles requieren apoyo; acuerda quién te ayudará y cómo contactarlo.",
  ],
  medicina: [
    "Elige una dificultad de tu vida diaria como objetivo de la consulta y pregunta cómo reconocer una mejoría relevante para ti.",
    "Repite el plan con tus propias palabras: qué harás, durante cuánto tiempo y cuándo debes volver. Pide aclarar cualquier diferencia.",
    "Confirma quién dará seguimiento a cada resultado pendiente; si no llega en la fecha acordada, contacta al servicio.",
  ],
  farmacia: [
    "Pregunta qué hacer ante una dosis olvidada, qué efectos debes comunicar y qué medicamentos no conviene combinar en tu caso.",
    "Revisa que puedes leer las etiquetas y utilizar el dispositivo de administración; solicita una demostración si necesitas apoyo.",
    "Antes de quedarte sin tratamiento, revisa existencias, receta y acceso a la farmacia; informa si el costo o el horario dificultan seguirlo.",
  ],
  nutricion: [
    "Registra dificultades para comprar, preparar, masticar o tragar alimentos, y compártelas para adaptar el apoyo nutricional.",
    "Convierte las indicaciones recibidas en una lista de compras o un menú sencillo compatible con tu presupuesto y costumbres.",
    "Si recibes recomendaciones alimentarias diferentes de varios servicios, solicita que las revisen juntas antes de combinar restricciones.",
  ],
  fisioterapia: [
    "Escoge una tarea cotidiana que quieras recuperar y pide que valoren qué ayuda, adaptación o entrenamiento necesitas para hacerla con seguridad.",
    "Si tienes una rutina prescrita, confirma la técnica, frecuencia, descansos y señales para detenerte; no aumentes la carga por completar una lista.",
    "Organiza los objetos de uso frecuente a tu alcance y solicita ayuda para las tareas que excedan tus restricciones o capacidad actual.",
  ],
  psicologia: [
    "Identifica una persona con quien puedas hablar y una tarea concreta en la que su apoyo te resulte útil.",
    "Reserva un momento para una actividad agradable que sea compatible con tus indicaciones, sin exigirte alcanzar una meta física.",
    "Comunica si la preocupación, la tristeza o los problemas de sueño están dificultando tu vida diaria o seguir el plan de atención.",
  ],
}

// Prompts organize the person's existing care plan; they do not prescribe a
// dose, diet, exercise or monitoring schedule for an entire specialty.
const specialtyPrompts: Record<string, string> = {
  cardiologia: "Si te indicaron medir presión o pulso, reúne el registro y anota dudas sobre la técnica y tus límites personales.",
  endocrinologia: "Reúne los análisis hormonales o registros de glucosa que correspondan a tu diagnóstico y señala las fechas de cambios de tratamiento.",
  neumologia: "Si usas un inhalador u otro equipo respiratorio, prepara su nombre y las dudas de uso para revisarlas con el equipo.",
  neurologia: "Describe un episodio o cambio de función con su hora, duración y efecto en tus actividades; un síntoma súbito de alarma requiere atención inmediata.",
  nefrologia: "Reúne tu plan renal y verifica qué indicaciones personales existen sobre líquidos, medicamentos y controles.",
  gastroenterologia: "Describe cómo cambian tus molestias con las comidas o evacuaciones, sin iniciar dietas de exclusión por cuenta propia.",
  reumatologia: "Elige una actividad limitada por dolor o rigidez y explica qué movimiento resulta difícil para valorar adaptaciones.",
  hematologia: "Organiza tus resultados de sangre por fecha y prepara las instrucciones que hayas recibido sobre sangrado o infecciones.",
  oncologia: "Prepara un calendario de citas y un listado de efectos que quieres comentar, junto con el teléfono de tu unidad de tratamiento.",
  infectologia: "Revisa las indicaciones que recibiste sobre duración del tratamiento, controles y medidas de prevención para tus contactos.",
  geriatria: "Acuerda con la persona mayor una tarea que desea mantener y qué apoyo acepta para realizarla.",
  pediatria: "Organiza con el cuidador las indicaciones según edad y peso, y pide una demostración si se requiere administrar un medicamento o usar un dispositivo.",
  "cirugia-general": "Si tienes una cirugía programada o reciente, reúne las instrucciones específicas de preparación, herida, alimentación y revisión.",
  "traumatologia-ortopedia": "Anota exactamente qué apoyo de peso, ayuda para caminar y movimientos te autorizaron; deja pendientes las dudas para el equipo.",
  neurocirugia: "Si hay una intervención, revisa el plan de vigilancia neurológica y los cuidados específicos del acceso o herida indicados al alta.",
  "cirugia-cardiaca": "Reúne el plan de recuperación y las instrucciones del implante, herida o rehabilitación que correspondan a tu operación.",
  "angiologia-cirugia-vascular": "Confirma qué cuidados circulatorios, del acceso o de la herida aplican; no incorpores compresión sin indicación individual.",
  "cirugia-toracica": "Si llevas drenaje o tienes una operación reciente, identifica las instrucciones del dispositivo y el contacto del servicio.",
  "cirugia-plastica-reconstructiva": "Si existe una zona reconstruida, localiza las instrucciones de protección y qué cambios debes comunicar al equipo.",
  coloproctologia: "Anota dificultades para evacuar o cuidar una ostomía, si la tienes, y prepara preguntas sobre los materiales indicados.",
  ginecologia: "Si hay sangrado o dolor, describe cuándo aparece y su impacto; lleva tus resultados y las preguntas que quieras tratar con privacidad.",
  obstetricia: "Organiza el expediente de embarazo o posparto y confirma el lugar de atención y transporte ante las señales de alarma de tu plan.",
  urologia: "Describe los cambios urinarios y, solo si lo indicaron, reúne tu registro miccional o las instrucciones de cuidado de una sonda.",
  otorrinolaringologia: "Anota cómo los síntomas afectan audición, equilibrio, respiración nasal o voz, según tu problema concreto.",
  oftalmologia: "Si usas colirios, reúne nombres y horarios para revisar su técnica; una pérdida visual súbita requiere atención inmediata.",
  dermatologia: "Prepara una lista de productos aplicados en la piel y anota qué zonas cambian, sin probar nuevos tratamientos para completar la actividad.",
  "medicina-urgencias": "Después de recibir atención, repasa la hoja de alta, los estudios pendientes y las razones para regresar. Si la emergencia está ocurriendo, solicita ayuda ahora.",
  "laboratorio-clinico": "Verifica qué muestra se necesita, cómo identificarla y entregarla, y si tu solicitud concreta exige preparación.",
  "radiologia-imagen": "Reúne la solicitud y estudios anteriores e informa al servicio sobre embarazo posible, implantes o reacciones previas cuando corresponda.",
  "anatomia-patologica": "Confirma quién explicará el resultado de la muestra y qué hacer si no está disponible en el plazo previsto.",
  "medicina-nuclear": "Solicita las instrucciones de tu estudio y trazador concreto, incluidas las que correspondan a embarazo o lactancia.",
  "genetica-medica": "Prepara las dudas sobre alcance, privacidad y resultados inciertos; comparte solo antecedentes familiares que conozcas y puedas comunicar.",
  neurofisiologia: "Confirma el nombre exacto de la prueba y las instrucciones sobre sueño, piel o medicamentos que correspondan al registro solicitado.",
}

export function getSelfCareActivities(guide: CareGuide): SelfCareActivity[] {
  const specialty = guide.specialtySlug ?? guide.slug
  return [
    { id: "observar", title: "Prepara tu registro de cambios", when: "Antes de la consulta o cuando notes un cambio", outcome: "Una descripción clara para compartir con tu equipo.", steps: [
      "Escribe qué cambió, cuándo comenzó y qué actividad te dificulta. Si no tienes síntomas, anota el motivo de la consulta o estudio.",
      "Añade las mediciones únicamente si ya forman parte de tu plan. No hace falta comprar un dispositivo para completar esta actividad.",
      "Compara lo observado con las señales de alarma de esta guía. Si aparece una, pide ayuda sin esperar a terminar el registro.",
    ] },
    { id: "tratamiento", title: "Organiza tu tratamiento", when: "Antes de una consulta o tras un cambio de receta", outcome: "Una lista actualizada de lo que tomas y las dudas pendientes.", steps: [
      "Copia de tus envases o receta el nombre, dosis, horario y motivo de uso. Incluye suplementos y alergias conocidas.",
      "Señala lo que no entiendes, las tomas difíciles y cualquier diferencia entre recetas para revisarlo con medicina o farmacia.",
      "Prepara recordatorios solo para las indicaciones confirmadas. Si no usas medicamentos, anota esa información para la consulta.",
    ] },
    { id: "alimentacion", title: "Prepara una comida compatible con tu plan", when: "Al organizar compras o comidas", outcome: "Una opción práctica y las necesidades de apoyo identificadas.", steps: [
      "Revisa primero si tienes ayuno, restricciones de líquidos, alergias o indicaciones sobre textura. Si falta una instrucción, consúltala.",
      "Elige con los alimentos disponibles una comida que respete tu plan; si debes estar en ayuno, organiza la comida para cuando te autoricen reanudarla.",
      "Anota si necesitas ayuda para comprar, cocinar o comer. No improvises texturas ante dificultad para tragar: solicita valoración.",
    ] },
    { id: "autonomia", title: "Adapta una tarea cotidiana", when: "Al preparar tu día", outcome: "Una tarea con apoyos y límites claros.", steps: [
      "Escoge una tarea como vestirte, asearte o preparar tus objetos personales; revisa las restricciones que ya te indicaron.",
      "Deja lo necesario a tu alcance y pide ayuda si existe riesgo de caída, dolor o dificultad para realizar la tarea.",
      "Anota qué adaptación funcionó y qué debes consultar. Esta actividad no sustituye ni añade ejercicios a tu rehabilitación prescrita.",
    ] },
    { id: "bienestar", title: "Haz espacio para tu bienestar", when: "En un momento tranquilo", outcome: "Una acción de apoyo que puedas repetir sin presión.", steps: [
      "Pon en palabras cómo te sientes y elige una preocupación que quieras compartir.",
      "Dedica un momento a una actividad agradable compatible con tu situación, como escuchar música, leer o conversar.",
      "Pide una ayuda concreta a alguien de confianza. Si el malestar afecta tu vida diaria, coméntalo con el equipo de salud.",
    ] },
    { id: "tema", title: `Prepara tu cuidado en ${guide.name}`, when: "Al revisar esta guía con tu equipo", outcome: `Una duda resuelta o anotada sobre ${guide.focus.toLocaleLowerCase("es")}.`, steps: [
      specialtyPrompts[specialty] ?? "Reúne las indicaciones y resultados relacionados con tu tema para revisarlos en consulta.",
      `Repasa esta recomendación de tu guía: ${guide.recommendations.enfermeria[0]}`,
      "Explica con tus propias palabras qué parte se aplica a ti y pide una demostración si requiere una técnica. Deja sin realizar lo que aún no te hayan indicado.",
    ] },
    { id: "consulta", title: "Ensaya tu próxima consulta", when: "Antes de tu cita", outcome: "Tres preguntas prioritarias y una fecha de seguimiento.", steps: [
      "Elige tus tres dudas principales y lleva resultados y notas relacionados con ellas.",
      "Practica explicar qué esperas mejorar. Si lo deseas, pide a una persona de confianza que te acompañe y tome notas.",
      "Al terminar, confirma el siguiente paso, su fecha y quién te dará los resultados pendientes. Pide instrucciones por escrito.",
    ] },
    { id: "ayuda", title: "Deja preparado cómo pedir ayuda", when: "Con anticipación, cuando te encuentres estable", outcome: "Contactos y señales de alarma accesibles.", steps: [
      `Lee las señales de atención inmediata de tu tema: ${guide.urgent}`,
      "Ubica el número local de emergencias, el contacto de tu servicio y una persona que pueda ayudarte. Déjalos en un lugar accesible.",
      "Comparte con tu acompañante cuándo llamar a cada contacto. Completar estas actividades no determina si estás clínicamente estable.",
    ] },
  ]
}
