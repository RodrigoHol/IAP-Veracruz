<script setup>
import { RouterLink } from 'vue-router'
import { programs } from '../data/programs'

const isUpcoming = (program) => program.availability === 'upcoming'
</script>

<template>
  <section id="oferta" class="programs">
    <div class="section-shell">
      <div class="programs-heading">
        <div>
          <p class="section-kicker">Profesionalización</p>
          <h2>Conocimiento que impulsa <em>el cambio.</em></h2>
          <p class="heading-copy">
            Posgrados y rutas de especialización diseñados para los desafíos de las instituciones.
          </p>
        </div>
      </div>

      <div class="program-grid">
        <article
          v-for="program in programs"
          :key="program.slug"
          class="program-card"
          :class="{ 'is-upcoming': isUpcoming(program) }"
        >
          <span v-if="isUpcoming(program)" class="program-ribbon">
            <span>Próximamente</span>
          </span>
          <div class="program-card-status">
            <span v-if="!isUpcoming(program)" class="program-status">
              <span class="material-icon" aria-hidden="true">check_circle</span>
              Oferta vigente
            </span>
          </div>
          <h3>{{ program.title }}</h3>
          <p>{{ program.summary }}</p>
          <RouterLink :to="{ name: 'program-detail', params: { slug: program.slug } }">
            {{ isUpcoming(program) ? 'Ver información' : 'Consultar programa' }}
            <span class="material-icon" aria-hidden="true">arrow_outward</span>
          </RouterLink>
        </article>
      </div>

      <RouterLink class="all-programs" to="/profesionalizacion">
        Explorar el catálogo académico <span class="material-icon" aria-hidden="true">arrow_forward</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.programs {
  padding: 6.5rem 0;
  background: var(--color-section);
}

.section-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.programs-heading {
  margin-bottom: 2.5rem;
}

.programs-heading > div {
  max-width: 780px;
}

.section-kicker {
  margin: 0 0 0.75rem;
  color: var(--color-secondary-text);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h2,
h3 {
  font-family: var(--font-heading);
  font-weight: 400;
}

h2 {
  margin: 0;
  color: var(--color-green-text);
  font-size: clamp(2.4rem, 4.3vw, 3.8rem);
  letter-spacing: -0.05em;
  line-height: 1.06;
}

h2 em {
  color: var(--color-primary-text);
  font-weight: 400;
}

.heading-copy {
  max-width: 630px;
  margin: 1.15rem 0 0;
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.program-card {
  position: relative;
  isolation: isolate;
  display: flex;
  min-height: 305px;
  padding: 1.6rem 1.5rem 1.35rem;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background: var(--color-surface);
  box-shadow: 0 4px 16px rgba(24, 51, 47, 0.035);
  transition:
    border-color 280ms ease,
    box-shadow 280ms ease,
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.program-card::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-secondary), transparent 82%);
  content: "";
}

.program-card:hover,
.program-card:focus-within {
  border-color: var(--color-secondary-text);
  box-shadow: 0 14px 30px rgba(24, 51, 47, 0.09);
  transform: translateY(-3px);
}

.program-card-status {
  min-height: 1.65rem;
  margin-bottom: 0.55rem;
}

.program-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-primary-text);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.program-status .material-icon {
  font-size: 1rem;
}

.program-ribbon {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.program-ribbon span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160%;
  padding: 0.65rem 0;
  transform: translate(-50%, -50%) rotate(-45deg);
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(122, 23, 55, 0.94);
  box-shadow: 0 2px 6px rgba(24, 51, 47, 0.18);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
}

.program-number {
  color: var(--color-secondary-text);
  font-size: 1.15rem;
}

.program-category {
  margin-top: 1.4rem;
  color: var(--color-primary-text);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h3 {
  margin: 0.15rem 0 0.65rem;
  color: var(--color-green-text);
  font-size: 1.55rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.program-card p {
  margin: 0 0 1.25rem;
  color: var(--color-muted);
  font-size: 0.87rem;
  line-height: 1.7;
}

.program-card a {
  display: flex;
  margin-top: auto;
  padding-top: 0.95rem;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
  color: var(--color-primary-text);
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 180ms ease;
}

.program-card a:hover {
  color: var(--color-green-text);
}

.program-card a .material-icon {
  transition: transform 220ms ease;
}

.program-card a:hover .material-icon {
  transform: translate(2px, -2px);
}

.all-programs {
  display: inline-flex;
  margin-top: 1.8rem;
  padding-bottom: 0.35rem;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--color-primary);
  color: var(--color-primary-text);
  font-size: 0.83rem;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 920px) {
  .program-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .programs {
    padding: 4.5rem 0;
  }

  .section-shell {
    width: calc(100% - 2rem);
  }

  .program-grid {
    grid-template-columns: 1fr;
  }

  .program-card {
    min-height: 250px;
  }
}
</style>
