<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getProgramBySlug } from '../data/programs'
import PreEnrollmentForm from '../components/PreEnrollmentForm.vue'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const program = computed(() => getProgramBySlug(props.slug))
const listedCredits = computed(() => program.value?.cycles
  .flatMap((cycle) => cycle.subjects)
  .reduce((total, subject) => total + subject.credits, 0) ?? 0)
const hasCreditDiscrepancy = computed(() => program.value?.curriculumTotals
  ? Math.abs(listedCredits.value - program.value.curriculumTotals.credits) > 0.001
  : false)
</script>

<template>
  <div v-if="program" class="page">
    <header class="detail-hero">
      <div class="page-shell">
        <nav class="breadcrumbs" aria-label="Ruta de navegación">
          <RouterLink to="/">Inicio</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink to="/profesionalizacion">Profesionalización</RouterLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ program.category }}</span>
        </nav>
        <p class="eyebrow">{{ program.category }} · IAP Veracruz</p>
        <h1>{{ program.title }}</h1>
        <p class="detail-summary">{{ program.summary }}</p>
        <div class="detail-meta">
          <span><strong>Modalidad</strong>{{ program.modality || 'Por confirmar' }}</span>
          <span v-if="program.rvoeRequired"><strong>RVOE</strong>Dato oficial por confirmar</span>
        </div>
        <a class="hero-link" href="#novedades">Recibir novedades <span class="material-icon" aria-hidden="true">south</span></a>
      </div>
    </header>

    <section class="page-shell detail-content">
      <section v-if="program.objective" class="objective">
        <p class="section-kicker">Objetivo del programa</p>
        <p>{{ program.objective }}</p>
      </section>
      <section v-else class="objective objective-pending">
        <p class="section-kicker">Objetivo del programa</p>
        <p>La descripción oficial del objetivo se publicará cuando sea confirmada por el IAP.</p>
      </section>

      <section class="facts-grid" aria-label="Información del programa">
        <article class="fact-card">
          <div class="fact-heading">
            <h2>Duración</h2>
            <span class="material-icon fact-icon" aria-hidden="true">calendar_month</span>
          </div>
          <p>{{ program.duration || 'La duración y el calendario se confirmarán en la convocatoria oficial.' }}</p>
        </article>
        <article class="fact-card">
          <div class="fact-heading">
            <h2>Perfil de ingreso</h2>
            <span class="material-icon fact-icon" aria-hidden="true">person_search</span>
          </div>
          <p v-if="program.admissionProfile">{{ program.admissionProfile }}</p>
          <p v-else class="pending-copy">Los requisitos oficiales de ingreso están pendientes de confirmación por el IAP.</p>
        </article>
        <article class="fact-card">
          <div class="fact-heading">
            <h2>Perfil de egreso</h2>
            <span class="material-icon fact-icon" aria-hidden="true">school</span>
          </div>
          <ul v-if="program.graduateProfile">
            <li v-for="profile in program.graduateProfile" :key="profile">{{ profile }}</li>
          </ul>
          <p v-else class="pending-copy">El perfil de egreso oficial se publicará cuando sea proporcionado por el Instituto.</p>
        </article>
      </section>

      <section v-if="program.cycles.length" class="curriculum">
        <div class="section-heading">
          <div>
            <p class="section-kicker">Plan de estudios 2025</p>
            <h2>Tira de materias</h2>
          </div>
          <p>{{ program.cycles.length }} {{ program.cycleUnit || 'ciclos' }} · {{ program.curriculumTotals.credits.toFixed(3) }} créditos</p>
        </div>

        <div v-for="cycle in program.cycles" :key="cycle.name" class="cycle">
          <h3>{{ cycle.name }}</h3>
          <div class="table-wrap">
            <table>
              <colgroup>
                <col class="subject-column" />
                <col class="code-column" />
                <col class="hours-column" />
                <col class="hours-column" />
                <col class="credits-column" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Asignatura</th>
                  <th scope="col">Clave</th>
                  <th scope="col">HD</th>
                  <th scope="col">HI</th>
                  <th scope="col">Créditos</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="subject in cycle.subjects" :key="subject.code">
                  <th scope="row">{{ subject.name }}</th>
                  <td>{{ subject.code }}</td>
                  <td>{{ subject.hoursWithInstructor }}</td>
                  <td>{{ subject.independentHours }}</td>
                  <td>{{ subject.credits.toFixed(3) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="curriculum-total">
          <span>Total general indicado</span>
          <span>{{ program.curriculumTotals.hoursWithInstructor }} HD</span>
          <span>{{ program.curriculumTotals.independentHours }} HI</span>
          <strong>{{ program.curriculumTotals.credits.toFixed(3) }} créditos</strong>
        </div>
        <p v-if="hasCreditDiscrepancy" class="curriculum-warning" role="note">
          La suma de los créditos de las asignaturas es {{ listedCredits.toFixed(3) }}, pero el total general del documento indica
          {{ program.curriculumTotals.credits.toFixed(3) }}. El IAP debe confirmar la cifra oficial.
        </p>
        <p class="table-legend">
          <span class="legend-hd"><strong>HD:</strong> horas con docente</span>
          <span class="legend-separator" aria-hidden="true">·</span>
          <span class="legend-hi"><strong>HI:</strong> horas independientes</span>
        </p>
      </section>

      <section v-else class="curriculum-pending">
        <p class="section-kicker">Plan de estudios</p>
        <h2>Contenido académico en integración</h2>
        <p>El temario, los perfiles y la duración de este tipo de oferta se publicarán cuando el IAP confirme sus programas vigentes.</p>
      </section>

      <PreEnrollmentForm :program-title="program.title" />
    </section>
  </div>
</template>

<style scoped>
.page-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.detail-hero {
  padding: 2rem 0 4.5rem;
  color: #fff;
  background:
    radial-gradient(ellipse at 90% 20%, rgba(186, 134, 74, 0.19), transparent 33%),
    var(--color-primary);
}

.breadcrumbs {
  display: flex;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 0.55rem;
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.73rem;
}

.breadcrumbs a {
  color: #fff;
  text-decoration: none;
}

.eyebrow,
.section-kicker {
  margin: 0 0 0.75rem;
  color: #d4aa72;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
  font-weight: 400;
}

h1 {
  max-width: 900px;
  margin: 0;
  font-size: clamp(2.8rem, 5.8vw, 4.6rem);
  letter-spacing: -0.05em;
}

.detail-summary {
  max-width: 670px;
  margin: 1rem 0 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 1rem;
  line-height: 1.7;
}

.detail-meta {
  display: flex;
  margin-top: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.detail-meta span {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.75rem;
}

.detail-meta strong {
  color: #f0c991;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-link {
  display: inline-flex;
  margin-top: 1.5rem;
  gap: 1rem;
  color: #f0c991;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}

.detail-content {
  padding: 4rem 0 6rem;
}

.objective {
  max-width: 850px;
  margin-bottom: 3rem;
}

.objective > p:last-child {
  margin: 0;
  color: var(--color-ink);
  font-size: clamp(1.25rem, 2.3vw, 1.8rem);
  line-height: 1.55;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.fact-card {
  padding: 1.5rem 1.6rem 1.8rem 0;
}

.fact-card + .fact-card {
  padding-left: 1.6rem;
  border-left: 1px solid var(--color-border);
}

.fact-heading {
  display: flex;
  margin-bottom: 0.9rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.fact-icon {
  flex: 0 0 auto;
  padding-left: 0.75rem;
  border-left: 1px solid var(--color-border);
  color: var(--color-secondary-text);
  font-size: 1.7rem;
}

h2 {
  margin: 0.8rem 0 0.7rem;
  color: var(--color-green-text);
  font-size: 1.55rem;
}

.fact-heading h2 {
  margin: 0;
}

.fact-card p,
.fact-card li {
  color: var(--color-muted);
  font-size: 0.82rem;
  line-height: 1.65;
  text-align: justify;
}

.fact-card p {
  margin: 0;
}

.fact-card ul {
  margin: 0;
  padding-left: 1.1rem;
}

.fact-card li + li {
  margin-top: 0.5rem;
}

.pending-copy {
  font-style: italic;
}

.curriculum {
  padding-top: 4rem;
}

.section-heading {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.section-heading h2 {
  margin-top: 0;
  font-size: clamp(2rem, 3.5vw, 2.8rem);
}

.section-heading > p {
  margin: 0 0 0.45rem;
  color: var(--color-muted);
  font-size: 0.8rem;
}

.cycle {
  margin-top: 1rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.cycle h3 {
  margin: 0;
  padding: 0.9rem 1rem;
  color: var(--color-primary-text);
  background: var(--color-surface-soft);
  font-size: 1.15rem;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 720px;
  table-layout: fixed;
  border-collapse: collapse;
  color: var(--color-ink);
  font-size: 0.79rem;
  text-align: left;
}

.subject-column {
  width: 44%;
}

.code-column {
  width: 16%;
}

.hours-column {
  width: 11%;
}

.credits-column {
  width: 18%;
}

th,
td {
  padding: 0.75rem 0.9rem;
  border-top: 1px solid var(--color-border);
}

thead th {
  color: var(--color-muted);
  font-size: 0.68rem;
  font-weight: 700;
  white-space: nowrap;
}

thead th:not(:first-child),
tbody td {
  text-align: center;
  font-variant-numeric: tabular-nums;
}

tbody th {
  min-width: 230px;
  font-weight: 500;
}

tbody td {
  white-space: nowrap;
}

.curriculum-total {
  display: flex;
  margin-top: 1rem;
  padding: 1rem;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--color-green-text);
  background: var(--color-surface-muted);
  font-size: 0.8rem;
}

.curriculum-warning {
  margin: 0.75rem 0 0;
  padding: 0.85rem 1rem;
  border-left: 3px solid var(--color-secondary);
  color: var(--color-warning-ink);
  background: var(--color-warning-surface);
  font-size: 0.79rem;
  line-height: 1.6;
}

.table-legend {
  display: flex;
  margin: 0.8rem 0 0;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.65rem;
  color: var(--color-muted);
  font-size: 0.72rem;
}

.legend-hd,
.legend-hi {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.legend-hd strong,
.legend-hi strong {
  padding: 0.12rem 0.4rem;
  border-radius: 2px;
  font-size: 0.68rem;
}

.legend-hd strong {
  color: var(--color-primary-text);
  background: var(--color-warning-surface);
}

.legend-hi strong {
  color: var(--color-green-text);
  background: var(--color-surface-soft);
}

.curriculum-pending {
  margin-top: 3.5rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface-soft);
}

.curriculum-pending h2 {
  margin-top: 0;
}

.curriculum-pending > p:last-child {
  max-width: 700px;
  margin-bottom: 0;
  color: var(--color-muted);
  line-height: 1.7;
}

@media (max-width: 780px) {
  .facts-grid {
    grid-template-columns: 1fr;
  }

  .fact-card,
  .fact-card + .fact-card {
    padding: 1.25rem 0;
    border-left: 0;
  }

  .fact-card + .fact-card {
    border-top: 1px solid var(--color-border);
  }
}

@media (max-width: 600px) {
  .page-shell {
    width: calc(100% - 2rem);
  }

  .detail-hero {
    padding: 1.5rem 0 3.5rem;
  }

  .breadcrumbs {
    margin-bottom: 2rem;
  }

  .detail-content {
    padding: 3rem 0 4rem;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .curriculum-total {
    flex-wrap: wrap;
  }
}
</style>
