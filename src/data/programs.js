// RVOE compartido por Maestría y Doctorado (sustituir por el número oficial cuando el cliente lo proporcione)
const SHARED_RVOE = null

export const programs = [
  {
    slug: 'doctorado',
    category: 'Doctorado',
    title: 'Doctorado en Finanzas Públicas',
    summary: 'Investigación avanzada para comprender y transformar las dinámicas gubernamentales.',
    image: 'images/salon-4.webp',
    imageAlt: 'Docente impartiendo sesión académica del Doctorado en Finanzas Públicas en el IAP Veracruz',
    imagePosition: '50% 20%',
    availability: 'upcoming',
    period: 'Agosto',
    modality: null,
    rvoe: SHARED_RVOE,
    curriculumTitle: 'ESTRUCTURA CURRICULAR DEL PLAN DE ESTUDIOS DOCTORADO 2025',
    objective: null,
    duration: '4 ciclos académicos, de acuerdo con el plan de estudios 2025. Próximo periodo: agosto.',
    admissionProfile: null,
    graduateProfile:
      'Al concluir el Doctorado en Finanzas Públicas, la persona egresada será capaz de generar investigación original y conocimiento de alto nivel sobre la política económica, las finanzas públicas y la gestión gubernamental en los ámbitos federal, estatal y municipal. Contará con el rigor metodológico, jurídico y analítico necesario para evaluar marcos fiscales, formular propuestas innovadoras de política pública y asesorar decisiones estratégicas en instituciones públicas, academia y organismos especializados, contribuyendo con ética y responsabilidad social a la sostenibilidad y eficacia del sector público.',
    curriculumTotals: { hoursWithInstructor: 288, independentHours: 1008 },
    cycles: [
      {
        name: 'Ciclo 1',
        subjects: [
          { name: 'Seminario: Teoría de la ciencia política', code: 'DCP101', hoursWithInstructor: 24, independentHours: 84 },
          { name: 'Seminario: Metodología de investigación I', code: 'DIN102', hoursWithInstructor: 24, independentHours: 84 },
          { name: 'Seminario: Teoría del Estado', code: 'DCP103', hoursWithInstructor: 24, independentHours: 84 },
        ],
      },
      {
        name: 'Ciclo 2',
        subjects: [
          { name: 'Seminario: Marco jurídico de la administración pública', code: 'DDE204', hoursWithInstructor: 24, independentHours: 84 },
          { name: 'Seminario: Teoría de la administración pública', code: 'DAP205', hoursWithInstructor: 24, independentHours: 84 },
          { name: 'Seminario: Metodología de la investigación II', code: 'DIN206', hoursWithInstructor: 24, independentHours: 84 },
        ],
      },
      {
        name: 'Ciclo 3',
        subjects: [
          { name: 'Seminario: Política económica y finanzas públicas de México', code: 'DEF307', hoursWithInstructor: 24, independentHours: 84 },
          { name: 'Seminario: Políticas públicas', code: 'DAP308', hoursWithInstructor: 24, independentHours: 84 },
          { name: 'Seminario: Protocolo de investigación', code: 'DIN309', hoursWithInstructor: 24, independentHours: 84 },
        ],
      },
      {
        name: 'Ciclo 4',
        subjects: [
          { name: 'Seminario: Tópicos contemporáneos de la administración pública', code: 'DAP410', hoursWithInstructor: 24, independentHours: 84 },
          { name: 'Proyectos de investigación - tutorial I', code: 'DIN411', hoursWithInstructor: 24, independentHours: 84 },
          { name: 'Proyectos de investigación - tutorial II', code: 'DIN412', hoursWithInstructor: 24, independentHours: 84 },
        ],
      },
    ],
  },
  {
    slug: 'maestrias',
    category: 'Maestrías',
    title: 'Maestría en Administración Pública',
    summary: 'Herramientas estratégicas para innovar en la gestión estatal.',
    image: 'images/salon-5.webp',
    imageAlt: 'Estudiante de Maestría participando en clase en el IAP Veracruz',
    imagePosition: '50% 22%',
    availability: 'available',
    modality: 'Presencial',
    rvoe: SHARED_RVOE,
    objective:
      'Formar profesionales altamente capacitados para participar en la innovación y el desarrollo teórico-práctico de las ciencias Administrativas, profundizando específicamente en los problemas y retos que enfrenten en la actualidad la Administración Pública del Gobierno Estatal.',
    duration: '18 materias y 5 cuatrimestres en dos años.',
    cycleUnit: 'cuatrimestres',
    admissionProfile: null,
    graduateProfile:
      'Al concluir la Maestría en Administración Pública, la persona egresada contará con una formación teórico-práctica sólida para analizar, diseñar y evaluar políticas públicas, presupuestos y procesos de gestión estatal y municipal con estricto apego al marco jurídico vigente. Será capaz de liderar estrategias de modernización administrativa, fiscalización y administración para resultados mediante nuevas tecnologías y herramientas de planeación, ejerciendo el servicio público con sentido de organización, independencia de juicio, vocación propositiva y un alto compromiso ético hacia la ciudadanía.',
    curriculumTotals: { hoursWithInstructor: 492, independentHours: 708 },
    cycles: [
      {
        name: 'Cuatrimestre 1',
        subjects: [
          { name: 'Teoría de la ciencia política', code: 'MCP101', hoursWithInstructor: 24, independentHours: 36 },
          { name: 'Teoría del Estado', code: 'MCP102', hoursWithInstructor: 24, independentHours: 36 },
          { name: 'Marco jurídico de la administración pública', code: 'MAP103', hoursWithInstructor: 24, independentHours: 36 },
          { name: 'Metodología de la investigación', code: 'MIN104', hoursWithInstructor: 24, independentHours: 36 },
        ],
      },
      {
        name: 'Cuatrimestre 2',
        subjects: [
          { name: 'Teoría de la administración pública', code: 'MCP205', hoursWithInstructor: 24, independentHours: 36 },
          { name: 'Administración y dirección estratégica', code: 'MDE206', hoursWithInstructor: 30, independentHours: 42 },
          { name: 'Ética y responsabilidades en el sector público', code: 'MAP207', hoursWithInstructor: 24, independentHours: 36 },
          { name: 'Finanzas públicas en México', code: 'MDE208', hoursWithInstructor: 30, independentHours: 42 },
        ],
      },
      {
        name: 'Cuatrimestre 3',
        subjects: [
          { name: 'Diseño, análisis y evaluación de políticas públicas', code: 'MAP310', hoursWithInstructor: 30, independentHours: 42 },
          { name: 'Planeación, programación y control presupuestal', code: 'MCO311', hoursWithInstructor: 30, independentHours: 42 },
          { name: 'Contabilidad gubernamental', code: 'MCO312', hoursWithInstructor: 30, independentHours: 42 },
        ],
      },
      {
        name: 'Cuatrimestre 4',
        subjects: [
          { name: 'Administración del capital humano en el sector público', code: 'MAP413', hoursWithInstructor: 30, independentHours: 42 },
          { name: 'Administración de recursos materiales; adquisiciones y obra pública', code: 'MAP414', hoursWithInstructor: 30, independentHours: 42 },
          { name: 'Evaluación y fiscalización de la cuenta pública', code: 'MCO415', hoursWithInstructor: 30, independentHours: 42 },
        ],
      },
      {
        name: 'Cuatrimestre 5',
        subjects: [
          { name: 'Administración para resultados', code: 'MAP517', hoursWithInstructor: 24, independentHours: 36 },
          { name: 'Administración Pública Municipal', code: 'MAP518', hoursWithInstructor: 30, independentHours: 42 },
          { name: 'Tópicos contemporáneos en la administración pública', code: 'MAP519', hoursWithInstructor: 30, independentHours: 42 },
          { name: 'Seminario de planeación y programas sociales', code: 'MFP520', hoursWithInstructor: 24, independentHours: 36 },
        ],
      },
    ],
  },
  {
    slug: 'diplomados',
    category: 'Diplomados',
    title: 'Diplomados',
    summary: 'Profundización en temas prioritarios mediante experiencias académicas aplicadas.',
    image: 'images/salon-6.webp',
    imageAlt: 'Participante en sesión académica de Diplomados en el IAP Veracruz',
    imagePosition: '50% 20%',
    availability: 'upcoming',
    modality: null,
    objective: null,
    duration: null,
    admissionProfile: null,
    graduateProfile: null,
    cycles: [],
  },
  {
    slug: 'microcredenciales',
    category: 'Microcredenciales',
    title: 'Microcredenciales',
    summary: 'Recursos concretos para atender las necesidades cotidianas del servicio público.',
    image: 'images/salon-2.webp',
    imageAlt: 'Aula equipada para microcredenciales de profesionalización en el IAP Veracruz',
    imagePosition: '50% 50%',
    availability: 'upcoming',
    modality: null,
    objective: null,
    duration: null,
    admissionProfile: null,
    graduateProfile: null,
    cycles: [],
  },
]

export const getProgramBySlug = (slug) =>
  typeof slug === 'string' ? programs.find((program) => program.slug === slug) : undefined
