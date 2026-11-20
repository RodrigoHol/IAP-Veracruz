<script setup>
import { computed, ref } from 'vue'

const notices = [
  {
    id: 'admissions',
    category: 'Admisiones',
    kicker: 'Fechas de inscripción',
    title: 'Prepárate para tu siguiente etapa profesional.',
    description: 'Las fechas de la próxima convocatoria se publicarán cuando el calendario oficial esté disponible.',
    statusLabel: 'Próxima convocatoria',
    statusValue: 'Próximamente',
    linkLabel: 'Llamar para informes',
    linkTo: '/contacto',
  },
  {
    id: 'general',
    category: 'Avisos generales',
    kicker: 'Información institucional',
    title: 'Avisos del Instituto',
    description: 'En este espacio encontrarás comunicados, fechas importantes y avisos generales del IAP Veracruz.',
    statusLabel: 'Información',
    statusValue: 'Se publicará aquí',
    linkLabel: 'Visitar redes oficiales',
    linkTo: '/contacto',
  },
  {
    id: 'news',
    category: 'Noticias',
    kicker: 'Actualizaciones',
    title: 'Novedades para la comunidad',
    description: 'Aquí se compartirán noticias sobre programas, actividades y servicios del Instituto.',
    statusLabel: 'Novedades',
    statusValue: 'Próximamente',
    linkLabel: 'Explorar oferta académica',
    linkTo: '/profesionalizacion',
  },
]

const activeIndex = ref(0)
const activeNotice = computed(() => notices[activeIndex.value])

const showNotice = (index) => {
  activeIndex.value = index
}

const moveNotice = (offset) => {
  activeIndex.value = (activeIndex.value + offset + notices.length) % notices.length
}
</script>

<template>
  <section id="convocatoria" class="admissions section-shell" :aria-labelledby="`notice-title-${activeNotice.id}`">
    <div class="notice-carousel" role="region" aria-roledescription="carrusel" aria-label="Avisos del Instituto">
      <Transition name="notice-transition" mode="out-in">
        <article
          :key="activeNotice.id"
          class="admissions-card"
          aria-live="polite"
          aria-roledescription="diapositiva"
          :aria-label="`Aviso ${activeIndex + 1} de ${notices.length}`"
        >
          <div class="admissions-marker">
            <span class="marker-dot"></span>
            <span>{{ activeNotice.category }}</span>
          </div>
          <div class="admissions-copy">
            <p class="section-kicker">{{ activeNotice.kicker }}</p>
            <h2 :id="`notice-title-${activeNotice.id}`">{{ activeNotice.title }}</h2>
            <p>{{ activeNotice.description }}</p>
          </div>
          <div class="admissions-action">
            <span class="status-label">{{ activeNotice.statusLabel }}</span>
            <span class="status-value">{{ activeNotice.statusValue }}</span>
            <RouterLink :to="activeNotice.linkTo" class="admissions-link">
              {{ activeNotice.linkLabel }}
              <span class="material-icon" aria-hidden="true">arrow_outward</span>
            </RouterLink>
          </div>
        </article>
      </Transition>

      <div class="notice-controls">
        <div class="notice-indicators" role="group" aria-label="Seleccionar aviso">
          <button
            v-for="(notice, index) in notices"
            :key="notice.id"
            class="notice-indicator"
            type="button"
            :aria-label="`Ver aviso ${index + 1}: ${notice.title}`"
            :aria-pressed="activeIndex === index"
            @click="showNotice(index)"
          ></button>
        </div>
        <div class="notice-navigation">
          <span class="notice-count" aria-live="polite">{{ activeIndex + 1 }} / {{ notices.length }}</span>
          <button class="notice-control" type="button" aria-label="Aviso anterior" @click="moveNotice(-1)">
            <span class="material-icon" aria-hidden="true">chevron_left</span>
          </button>
          <button class="notice-control" type="button" aria-label="Aviso siguiente" @click="moveNotice(1)">
            <span class="material-icon" aria-hidden="true">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.admissions {
  position: relative;
  z-index: 2;
  margin-top: -1px;
  padding-top: 2rem;
}

.admissions-card {
  display: grid;
  min-height: 190px;
  padding: 2rem 2.25rem;
  grid-template-columns: 0.7fr 1.7fr 0.9fr;
  align-items: center;
  gap: 2rem;
  border: 1px solid rgba(24, 51, 47, 0.09);
  background: var(--color-surface);
  box-shadow: 0 14px 42px rgba(24, 51, 47, 0.055);
}

.admissions-marker {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-primary-text);
  font-size: 0.77rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.marker-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-secondary);
  box-shadow: 0 0 0 4px rgba(186, 134, 74, 0.13);
}

.section-kicker {
  margin: 0 0 0.45rem;
  color: var(--color-secondary-text);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: clamp(1.45rem, 2.5vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.admissions-copy > p:last-child {
  margin: 0.65rem 0 0;
  color: var(--color-muted);
  font-size: 0.88rem;
  line-height: 1.55;
}

.admissions-action {
  display: flex;
  min-height: 93px;
  padding-left: 1.7rem;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--color-border);
}

.status-label {
  color: var(--color-muted);
  font-size: 0.72rem;
}

.status-value {
  margin-top: 0.25rem;
  color: var(--color-green-text);
  font-size: 0.89rem;
  font-weight: 700;
}

.admissions-link {
  margin-top: 0.8rem;
  color: var(--color-primary-text);
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
}

.admissions-link span {
  margin-left: 0.3rem;
}

.notice-controls {
  display: flex;
  padding: 0.75rem 0.25rem 0;
  align-items: center;
  justify-content: space-between;
}

.notice-indicators,
.notice-navigation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.notice-indicator {
  width: 0.55rem;
  height: 0.55rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--color-border);
  cursor: pointer;
  transition: width 180ms ease, background-color 180ms ease;
}

.notice-indicator[aria-pressed="true"] {
  width: 1.5rem;
  background: var(--color-primary);
}

.notice-navigation {
  gap: 0.65rem;
}

.notice-count {
  min-width: 2rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  text-align: center;
}

.notice-control {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  place-items: center;
  border: 1px solid var(--color-border);
  color: var(--color-green-text);
  background: var(--color-surface);
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease, background-color 180ms ease;
}

.notice-control:hover {
  border-color: var(--color-primary);
  color: var(--color-primary-text);
  background: var(--color-surface-soft);
}

.notice-transition-enter-active,
.notice-transition-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.notice-transition-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.notice-transition-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 900px) {
  .admissions-card {
    padding: 1.7rem;
    grid-template-columns: 1fr 2fr;
  }

  .admissions-marker {
    grid-column: 1 / -1;
  }
}

@media (max-width: 620px) {
  .section-shell {
    width: calc(100% - 2rem);
  }

  .admissions {
    padding-top: 1rem;
  }

  .admissions-card {
    padding: 1.5rem;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .admissions-action {
    min-height: unset;
    padding: 1.2rem 0 0;
    border-top: 1px solid var(--color-border);
    border-left: 0;
  }
}
</style>
