<script setup>
import { RouterLink } from 'vue-router'
import { programs } from '../data/programs'
</script>

<template>
  <section id="oferta" class="programs">
    <div class="section-shell">
      <div class="programs-heading">
        <div>
          <p class="section-kicker">Profesionalización</p>
          <h2>Aprendizaje con <em>sentido público.</em></h2>
        </div>
        <p class="heading-copy">Maestrías, doctorado y formación continua para fortalecer el servicio público.</p>
      </div>

      <div class="program-grid">
        <article v-for="(program, index) in programs" :key="program.slug" class="program-card">
          <span class="program-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="program-category">{{ program.category }}</span>
          <h3>{{ program.title }}</h3>
          <p>{{ program.summary }}</p>
          <RouterLink :to="{ name: 'program-detail', params: { slug: program.slug } }">
            Conocer el programa <span class="material-icon" aria-hidden="true">arrow_outward</span>
          </RouterLink>
        </article>
      </div>

      <RouterLink class="all-programs" to="/profesionalizacion">
        Ver toda la oferta académica <span class="material-icon" aria-hidden="true">arrow_forward</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.programs {
  padding: 6rem 0;
  background: var(--color-section);
}

.section-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.programs-heading {
  display: flex;
  margin-bottom: 2rem;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
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
  max-width: 320px;
  margin: 0 0 0.2rem;
  color: var(--color-muted);
  font-size: 0.88rem;
  line-height: 1.7;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.program-card {
  display: flex;
  min-height: 295px;
  padding: 1.35rem;
  flex-direction: column;
  border: 1px solid rgba(24, 51, 47, 0.09);
  background: var(--color-surface);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.program-card:hover {
  box-shadow: 0 15px 32px rgba(24, 51, 47, 0.09);
  transform: translateY(-3px);
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
  margin: 0.4rem 0;
  color: var(--color-green-text);
  font-size: 1.45rem;
  line-height: 1.15;
}

.program-card p {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.78rem;
  line-height: 1.65;
}

.program-card a {
  display: flex;
  margin-top: auto;
  padding-top: 1.2rem;
  justify-content: space-between;
  color: var(--color-primary-text);
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
}

.all-programs {
  display: inline-flex;
  margin-top: 1.8rem;
  padding-bottom: 0.35rem;
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

  .programs-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.8rem;
  }

  .program-grid {
    grid-template-columns: 1fr;
  }

  .program-card {
    min-height: 250px;
  }
}
</style>
