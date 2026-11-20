export const programs = [
  {
    slug: 'doctorado',
    category: 'Doctorado',
    title: 'Doctorado',
    summary: 'Investigación avanzada para comprender y transformar las dinámicas gubernamentales.',
    availability: 'upcoming',
    modality: null,
    rvoeRequired: true,
    objective: null,
    duration: '4 ciclos académicos, de acuerdo con el plan de estudios 2025. El calendario en meses y los horarios están por confirmar.',
    admissionProfile: null,
    graduateProfile: null,
    curriculumTotals: { hoursWithInstructor: 288, independentHours: 1008, credits: 81 },
    cycles: [
      {
        name: 'Ciclo 1',
        subjects: [
          { name: 'Seminario: Teoría de la ciencia política', code: 'DCP101', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
          { name: 'Seminario: Metodología de investigación I', code: 'DIN102', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
          { name: 'Seminario: Teoría del Estado', code: 'DCP103', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
        ],
      },
      {
        name: 'Ciclo 2',
        subjects: [
          { name: 'Seminario: Marco jurídico de la administración pública', code: 'DDE204', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
          { name: 'Seminario: Teoría de la administración pública', code: 'DAP205', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
          { name: 'Seminario: Metodología de la investigación II', code: 'DIN206', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
        ],
      },
      {
        name: 'Ciclo 3',
        subjects: [
          { name: 'Seminario: Política económica y finanzas públicas de México', code: 'DEF307', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
          { name: 'Seminario: Políticas públicas', code: 'DAP308', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
          { name: 'Seminario: Protocolo de investigación', code: 'DIN309', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
        ],
      },
      {
        name: 'Ciclo 4',
        subjects: [
          { name: 'Seminario: Tópicos contemporáneos de la administración pública', code: 'DAP410', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
          { name: 'Proyectos de investigación - tutorial I', code: 'DIN411', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
          { name: 'Proyectos de investigación - tutorial II', code: 'DIN412', hoursWithInstructor: 24, independentHours: 84, credits: 6.75 },
        ],
      },
    ],
  },
  {
    slug: 'maestrias',
    category: 'Maestrías',
    title: 'Maestría en Administración Pública',
    summary: 'Herramientas estratégicas para innovar en la gestión estatal.',
    availability: 'available',
    modality: null,
    rvoeRequired: true,
    objective: 'Formar profesionales altamente capacitados para participar en la innovación y el desarrollo teórico-práctico de las ciencias Administrativas, profundizando específicamente en los problemas y retos que enfrenten en la actualidad la Administración Pública del Gobierno Estatal.',
    duration: '5 cuatrimestres académicos, de acuerdo con el plan de estudios 2025. El calendario y los horarios están por confirmar.',
    cycleUnit: 'cuatrimestres',
    admissionProfile: null,
    graduateProfile: [
      'Desarrollar aptitudes de sentido de organización, independencia de juicio, capacidad de interrelación, análisis, interpretación y argumentación de la legislación vigente.',
      'Emplear los conocimientos acordes a la utilización de nuevas tecnologías, estrategias y técnicas en Administración Pública Estatal, Municipal así como en campos específicos de su trabajo.',
      'Promover actitudes de cambio y de participación activa y propositiva ante su medio.',
      'Realizar su actividad profesional con un alto apego a su formación ética que permita su desarrollo y el de los demás, responsabilidad y compromiso ante sí mismo, su quehacer profesional y ante los usuarios de los servicios públicos.',
    ],
    curriculumTotals: { hoursWithInstructor: 492, independentHours: 708, credits: 75 },
    cycles: [
      {
        name: 'Cuatrimestre 1',
        subjects: [
          { name: 'Teoría de la ciencia política', code: 'MCP101', hoursWithInstructor: 24, independentHours: 36, credits: 3.75 },
          { name: 'Teoría del Estado', code: 'MCP102', hoursWithInstructor: 24, independentHours: 36, credits: 3.75 },
          { name: 'Marco jurídico de la administración pública', code: 'MAP103', hoursWithInstructor: 24, independentHours: 36, credits: 4.5 },
          { name: 'Metodología de la investigación', code: 'MIN104', hoursWithInstructor: 24, independentHours: 36, credits: 4.5 },
        ],
      },
      {
        name: 'Cuatrimestre 2',
        subjects: [
          { name: 'Teoría de la administración pública', code: 'MCP205', hoursWithInstructor: 24, independentHours: 36, credits: 3.75 },
          { name: 'Administración y dirección estratégica', code: 'MDE206', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
          { name: 'Ética y responsabilidades en el sector público', code: 'MAP207', hoursWithInstructor: 24, independentHours: 36, credits: 3.75 },
          { name: 'Finanzas públicas en México', code: 'MDE208', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
        ],
      },
      {
        name: 'Cuatrimestre 3',
        subjects: [
          { name: 'Diseño, análisis y evaluación de políticas públicas', code: 'MAP310', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
          { name: 'Planeación, programación y control presupuestal', code: 'MCO311', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
          { name: 'Contabilidad gubernamental', code: 'MCO312', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
        ],
      },
      {
        name: 'Cuatrimestre 4',
        subjects: [
          { name: 'Administración del capital humano en el sector público', code: 'MAP413', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
          { name: 'Administración de recursos materiales; adquisiciones y obra pública', code: 'MAP414', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
          { name: 'Evaluación y fiscalización de la cuenta pública', code: 'MCO415', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
        ],
      },
      {
        name: 'Cuatrimestre 5',
        subjects: [
          { name: 'Administración para resultados', code: 'MAP517', hoursWithInstructor: 24, independentHours: 36, credits: 3.75 },
          { name: 'Administración Pública Municipal', code: 'MAP518', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
          { name: 'Tópicos contemporáneos en la administración pública', code: 'MAP519', hoursWithInstructor: 30, independentHours: 42, credits: 4.5 },
          { name: 'Seminario de planeación y programas sociales', code: 'MFP520', hoursWithInstructor: 24, independentHours: 36, credits: 3.75 },
        ],
      },
    ],
  },
  {
    slug: 'diplomados',
    category: 'Diplomados',
    title: 'Diplomados',
    summary: 'Profundización en temas prioritarios mediante experiencias académicas aplicadas.',
    availability: 'upcoming',
    modality: null,
    rvoeRequired: false,
    objective: null,
    duration: null,
    admissionProfile: null,
    graduateProfile: null,
    cycles: [],
  },
  {
    slug: 'cursos',
    category: 'Cursos',
    title: 'Cursos',
    summary: 'Recursos concretos para atender las necesidades cotidianas del servicio público.',
    availability: 'upcoming',
    modality: null,
    rvoeRequired: false,
    objective: null,
    duration: null,
    admissionProfile: null,
    graduateProfile: null,
    cycles: [],
  },
]

export const getProgramBySlug = (slug) => programs.find((program) => program.slug === slug)
