<script setup>
import { RouterLink } from 'vue-router'
import { programs } from '../data/programs'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div class="page">
    <header class="page-hero">
      <div class="page-shell">
        <p class="eyebrow">Formación para el servicio público</p>
        <h1>Profesionalización</h1>
        <p>Conoce las rutas de formación disponibles y consulta los planes académicos publicados por el IAP Veracruz.</p>
      </div>
    </header>

    <section class="page-shell catalog">
      <div class="section-heading">
        <div>
          <p class="section-kicker">Oferta académica</p>
          <h2>Elige tu siguiente paso</h2>
        </div>
        <p>Los requisitos y convocatorias se actualizarán aquí cuando estén confirmados por el Instituto.</p>
      </div>

      <div class="program-grid">
        <article v-for="(program, index) in programs" :key="program.slug" class="program-card">
          <figure class="program-photo">
            <img
              :src="`${baseUrl}${program.image}`"
              :alt="program.imageAlt"
              :style="{ objectPosition: program.imagePosition || 'center' }"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div class="program-meta">
            <span class="program-type">{{ program.category }}</span>
            <span class="program-index">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <h3>{{ program.title }}</h3>
          <p>{{ program.summary }}</p>
          <RouterLink :to="{ name: 'program-detail', params: { slug: program.slug } }">
            Consultar programa <span class="material-icon" aria-hidden="true">arrow_outward</span>
          </RouterLink>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.page-hero {
  padding: 5.2rem 0 5.5rem;
  color: #fff;
  background:
    radial-gradient(ellipse at 82% 10%, rgba(186, 134, 74, 0.18), transparent 35%),
    var(--color-green);
}

.eyebrow,
.section-kicker {
  margin: 0 0 0.85rem;
  color: #d6ad79;
  font-size: 0.72rem;
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
  margin: 0;
  font-size: clamp(3rem, 6vw, 5rem);
  letter-spacing: -0.05em;
}

.page-hero .page-shell > p:last-child {
  max-width: 620px;
  margin: 1.15rem 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 1rem;
  line-height: 1.7;
}

.catalog {
  padding: 5rem 0 6rem;
}

.section-heading {
  display: flex;
  margin-bottom: 2rem;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.section-kicker {
  color: var(--color-secondary-text);
}

h2 {
  margin: 0;
  color: var(--color-green-text);
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.04em;
}

.section-heading > p {
  max-width: 340px;
  margin: 0 0 0.25rem;
  color: var(--color-muted);
  font-size: 0.87rem;
  line-height: 1.65;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
}

.program-card {
  position: relative;
  display: flex;
  min-height: 270px;
  padding: 1.8rem;
  flex-direction: column;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  transition: box-shadow 180ms ease, transform 180ms ease;
}

.program-card:hover {
  box-shadow: 0 15px 34px rgba(24, 51, 47, 0.09);
  transform: translateY(-3px);
}

.program-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.program-index {
  color: #c1a17b;
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
}

.program-photo {
  margin: -1.8rem -1.8rem 1.25rem;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-soft);
}

.program-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 360ms ease;
}

.program-card:hover .program-photo img {
  transform: scale(1.03);
}

.program-type {
  color: var(--color-primary-text);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h3 {
  margin: 1rem 0 0.5rem;
  color: var(--color-green-text);
  font-size: 1.8rem;
}

.program-card p {
  max-width: 450px;
  margin: 0;
  color: var(--color-muted);
  font-size: 0.87rem;
  line-height: 1.65;
}

.program-card a {
  display: flex;
  margin-top: auto;
  padding-top: 1.5rem;
  justify-content: space-between;
  color: var(--color-primary-text);
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 650px) {
  .page-shell {
    width: calc(100% - 2rem);
  }

  .page-hero {
    padding: 3.7rem 0 4rem;
  }

  .catalog {
    padding: 3.5rem 0 4.5rem;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
  }

  .program-grid {
    grid-template-columns: 1fr;
  }
}
</style>
