/**
 * Respaldo interno de las tiras de materias completas (no importado en el bundle público
 * mientras `showCurriculum: false` esté activo en `programs.js`).
 */
export const archivedCurricula = {
  doctorado: {
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
  maestrias: {
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
}
