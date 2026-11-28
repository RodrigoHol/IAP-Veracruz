<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getProgramBySlug } from '../data/programs'
import { formatNumber, getCycleHours, getTotalSubjects } from '../utils/curriculum'
import PreEnrollmentForm from '../components/PreEnrollmentForm.vue'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const program = computed(() => getProgramBySlug(props.slug))
const cycleCount = computed(() => program.value?.cycleCount ?? program.value?.cycles?.length ?? 0)
const totalSubjects = computed(() => program.value?.subjectCount ?? getTotalSubjects(program.value?.cycles))
const isCurriculumHidden = computed(
  () => program.value?.showCurriculum === false && cycleCount.value > 0,
)
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
          <span v-if="program.period"><strong>Periodo</strong>{{ program.period }}</span>
          <span v-if="program.rvoe"><strong>RVOE</strong>{{ program.rvoe }}</span>
        </div>
        <a class="hero-link" href="#novedades">
          {{ isCurriculumHidden ? 'Solicitar plan de estudios' : 'Recibir novedades' }}
          <span class="material-icon" aria-hidden="true">south</span>
        </a>
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
          <ul v-if="Array.isArray(program.graduateProfile)">
            <li v-for="profile in program.graduateProfile" :key="profile">{{ profile }}</li>
          </ul>
          <p v-else-if="program.graduateProfile">{{ program.graduateProfile }}</p>
          <p v-else class="pending-copy">El perfil de egreso oficial se publicará cuando sea proporcionado por el Instituto.</p>
        </article>
      </section>

      <section v-if="program.cycles.length && program.showCurriculum !== false" class="curriculum">
        <div class="section-heading">
          <div>
            <p class="section-kicker">{{ program.curriculumTitle || 'Plan de estudios 2025' }}</p>
            <h2>Tira de materias</h2>
          </div>
          <p>{{ program.cycles.length }} {{ program.cycleUnit || 'ciclos' }} · {{ totalSubjects }} asignaturas</p>
        </div>

        <div class="cycles-grid">
          <article v-for="(cycle, index) in program.cycles" :key="cycle.name" class="cycle-card">
            <header class="cycle-card-header">
              <div class="cycle-title-group">
                <span class="cycle-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <h3>{{ cycle.name }}</h3>
              </div>
              <span class="cycle-count">{{ cycle.subjects.length }} asignaturas</span>
            </header>

            <div class="cycle-columns" aria-hidden="true">
              <span>Asignatura</span>
              <span>HD</span>
              <span>HI</span>
            </div>

            <ul class="subject-list">
              <li v-for="subject in cycle.subjects" :key="subject.code" class="subject-item">
                <span class="subject-name">{{ subject.name }}</span>
                <span class="subject-hour subject-hour--hd" :aria-label="`${subject.hoursWithInstructor} horas con docente`">
                  {{ subject.hoursWithInstructor }}
                </span>
                <span class="subject-hour subject-hour--hi" :aria-label="`${subject.independentHours} horas independientes`">
                  {{ subject.independentHours }}
                </span>
              </li>
            </ul>

            <footer class="cycle-subtotal">
              <strong>Subtotal del ciclo</strong>
              <strong class="subtotal-value subtotal-value--hd" :aria-label="`Subtotal ${getCycleHours(cycle).hd} horas con docente`">
                {{ formatNumber(getCycleHours(cycle).hd) }}
              </strong>
              <strong class="subtotal-value subtotal-value--hi" :aria-label="`Subtotal ${getCycleHours(cycle).hi} horas independientes`">
                {{ formatNumber(getCycleHours(cycle).hi) }}
              </strong>
            </footer>
          </article>
        </div>

        <div v-if="program.curriculumTotals" class="curriculum-total">
          <div class="curriculum-total-label">
            <strong>Total general del plan</strong>
            <span>{{ totalSubjects }} asignaturas en {{ program.cycles.length }} {{ program.cycleUnit || 'ciclos' }}</span>
          </div>
          <div class="curriculum-total-metrics">
            <span class="total-pill total-pill--hd">
              <strong>{{ formatNumber(program.curriculumTotals.hoursWithInstructor) }}</strong>
              <small>HD</small>
            </span>
            <span class="total-pill total-pill--hi">
              <strong>{{ formatNumber(program.curriculumTotals.independentHours) }}</strong>
              <small>HI</small>
            </span>
          </div>
        </div>
        <p class="table-legend">
          <span class="legend-hd"><strong>HD:</strong> horas con docente</span>
          <span class="legend-separator" aria-hidden="true">·</span>
          <span class="legend-hi"><strong>HI:</strong> horas independientes</span>
        </p>
      </section>

      <section v-else-if="isCurriculumHidden" class="curriculum-request">
        <p class="section-kicker">{{ program.curriculumTitle || 'Plan de estudios' }}</p>
        <h2>Estructura académica y tira de materias</h2>
        <div class="curriculum-highlights" aria-label="Resumen de estructura académica">
          <span>
            <span class="material-icon" aria-hidden="true">view_agenda</span>
            {{ cycleCount }} {{ program.cycleUnit || 'ciclos académicos' }}
          </span>
          <span>
            <span class="material-icon" aria-hidden="true">menu_book</span>
            {{ totalSubjects }} asignaturas
          </span>
          <span v-if="program.modality">
            <span class="material-icon" aria-hidden="true">apartment</span>
            Modalidad {{ program.modality.toLowerCase() }}
          </span>
          <span v-if="program.period">
            <span class="material-icon" aria-hidden="true">event</span>
            Inicio: {{ program.period }}
          </span>
        </div>
        <p class="curriculum-request-copy">
          La tira completa de materias y el desglose curricular de este posgrado se entregan al solicitar informes con el Instituto.
        </p>
        <div class="curriculum-request-actions">
          <a class="curriculum-cta-primary" href="#novedades">
            Solicitar plan de estudios e informes
            <span class="material-icon" aria-hidden="true">south</span>
          </a>
          <RouterLink class="curriculum-cta-secondary" to="/contacto">
            Atención directa en Contacto
            <span class="material-icon" aria-hidden="true">arrow_outward</span>
          </RouterLink>
        </div>
      </section>

      <section v-else class="curriculum-pending">
        <p class="section-kicker">Plan de estudios</p>
        <h2>Contenido académico en integración</h2>
        <p>El temario, los perfiles y la duración de este tipo de oferta se publicarán cuando el IAP confirme sus programas vigentes.</p>
      </section>

      <PreEnrollmentForm :key="program.slug" :program-title="program.title" :request-curriculum="isCurriculumHidden" />
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

.cycles-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.cycle-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-top: 2px solid var(--color-primary);
  background: var(--color-surface);
}

.cycle-card-header {
  display: flex;
  padding: 1rem 1.15rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-soft);
}

.cycle-title-group {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.cycle-index {
  color: var(--color-secondary-text);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

.cycle-card-header h3 {
  margin: 0;
  color: var(--color-green-text);
  font-size: 1.22rem;
  line-height: 1.2;
}

.cycle-count {
  flex: 0 0 auto;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 500;
}

.cycle-columns,
.subject-item,
.cycle-subtotal {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 3.4rem 3.4rem;
  gap: 0.75rem;
}

.cycle-columns {
  padding: 0.55rem 1.15rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.cycle-columns span:not(:first-child) {
  text-align: center;
}

.subject-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.subject-item {
  padding: 0.72rem 1.15rem;
  align-items: baseline;
}

.subject-item + .subject-item {
  border-top: 1px solid var(--color-border);
}

.subject-name {
  color: var(--color-ink);
  font-size: 0.86rem;
  line-height: 1.45;
}

.subject-hour {
  font-size: 0.84rem;
  font-weight: 600;
  line-height: 1.45;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.subject-hour--hd {
  color: var(--color-primary-text);
}

.subject-hour--hi {
  color: var(--color-green-text);
}

.cycle-subtotal {
  margin-top: auto;
  padding: 0.75rem 1.15rem;
  align-items: center;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-muted);
  color: var(--color-green-text);
  font-size: 0.78rem;
}

.subtotal-value {
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.subtotal-value--hd {
  color: var(--color-primary-text);
}

.subtotal-value--hi {
  color: var(--color-green-text);
}

.curriculum-total {
  display: flex;
  margin-top: 1.25rem;
  padding: 1.1rem 1.25rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface-muted);
}

.curriculum-total-label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.curriculum-total-label strong {
  color: var(--color-green-text);
  font-size: 0.88rem;
}

.curriculum-total-label span {
  color: var(--color-muted);
  font-size: 0.74rem;
}

.curriculum-total-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.total-pill {
  display: inline-flex;
  min-width: 96px;
  padding: 0.45rem 0.85rem;
  align-items: baseline;
  justify-content: center;
  gap: 0.4rem;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  font-variant-numeric: tabular-nums;
}

.total-pill strong {
  font-size: 1rem;
}

.total-pill small {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.total-pill--hd {
  color: var(--color-primary-text);
  background: var(--color-warning-surface);
}

.total-pill--hi {
  color: var(--color-green-text);
  background: var(--color-surface);
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

.curriculum-request {
  margin-top: 3.5rem;
  padding: 2.25rem;
  border: 1px solid var(--color-border);
  border-top: 2px solid var(--color-primary);
  background: var(--color-surface);
}

.curriculum-request .section-kicker {
  color: var(--color-secondary-text);
}

.curriculum-request h2 {
  margin: 0 0 1.25rem;
  font-size: clamp(1.75rem, 3vw, 2.35rem);
}

.curriculum-highlights {
  display: flex;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.65rem 1.25rem;
}

.curriculum-highlights > span {
  display: inline-flex;
  padding: 0.45rem 0.75rem;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  color: var(--color-green-text);
  background: var(--color-surface-soft);
  font-size: 0.82rem;
  font-weight: 600;
}

.curriculum-highlights .material-icon {
  color: var(--color-secondary-text);
  font-size: 1.05rem;
}

.curriculum-request-copy {
  max-width: 720px;
  margin: 0 0 1.5rem;
  color: var(--color-muted);
  line-height: 1.7;
}

.curriculum-request-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
}

.curriculum-cta-primary,
.curriculum-cta-secondary {
  display: inline-flex;
  min-height: 44px;
  padding: 0 1.15rem;
  align-items: center;
  gap: 0.6rem;
  border-radius: 2px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
}

.curriculum-cta-primary {
  border: 1px solid var(--color-primary);
  color: #fff;
  background: var(--color-primary);
}

.curriculum-cta-primary:hover {
  background: #61112b;
  border-color: #61112b;
}

.curriculum-cta-secondary {
  border: 1px solid var(--color-border);
  color: var(--color-primary-text);
  background: var(--color-surface-soft);
}

.curriculum-cta-secondary:hover {
  border-color: var(--color-secondary-text);
  color: var(--color-green-text);
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

@media (max-width: 820px) {
  .cycles-grid {
    grid-template-columns: 1fr;
  }
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

  .cycle-columns,
  .subject-item,
  .cycle-subtotal {
    grid-template-columns: minmax(0, 1fr) 2.8rem 2.8rem;
    gap: 0.5rem;
  }

  .curriculum-total {
    flex-direction: column;
    align-items: flex-start;
  }

  .curriculum-request {
    padding: 1.5rem;
  }

  .curriculum-request-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .curriculum-cta-primary,
  .curriculum-cta-secondary {
    justify-content: space-between;
  }
}
</style>
