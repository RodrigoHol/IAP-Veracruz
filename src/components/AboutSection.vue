<script setup>
import { ref } from 'vue'
import PhotoPlaceholder from './PhotoPlaceholder.vue'

const openPrinciple = ref(null)
const hoveredPrinciple = ref(null)
const isPrincipleOpen = (number) =>
  openPrinciple.value === number || hoveredPrinciple.value === number

const principles = [
  {
    number: '01',
    title: 'Misión',
    icon: 'flag',
    description: 'Profesionalizar el servicio público mediante conocimiento, formación y compromiso con la sociedad.',
  },
  {
    number: '02',
    title: 'Visión',
    icon: 'visibility',
    description: 'Ser un referente en la preparación de personas capaces de generar valor público en Veracruz.',
  },
  {
    number: '03',
    title: 'Valores',
    icon: 'verified_user',
    description: 'Ética pública, transparencia, responsabilidad y vocación de servicio como guía cotidiana.',
  },
]
</script>

<template>
  <section id="instituto" class="about section-shell">
    <div class="about-intro">
      <div class="about-copy">
        <p class="section-kicker">Conócenos</p>
        <h2>Profesionalización para mejorar <em>lo público.</em></h2>
        <p class="lead">
          El Instituto de Administración Pública del Estado de Veracruz, A.C. es una asociación civil fundada en 1978, dedicada a la profesionalización de las personas del sector público y a la mejora de la gestión gubernamental en el estado.
        </p>
        <RouterLink class="about-link" to="/contacto">Acércate al Instituto <span class="material-icon" aria-hidden="true">arrow_outward</span></RouterLink>
      </div>
      <div class="about-photo">
        <PhotoPlaceholder label="Áreas comunes y recepción" />
        <span class="photo-index">IAP · VERACRUZ</span>
      </div>
    </div>

    <div class="principles-heading">
      <div>
        <p class="section-kicker">Nuestro propósito</p>
        <h3>Principios que nos orientan</h3>
      </div>
      <div class="principles-photo">
        <PhotoPlaceholder label="Detalle del logotipo o placa institucional" variant="detail" />
      </div>
    </div>

    <div class="principles-grid">
      <article
        v-for="principle in principles"
        :key="principle.number"
        class="principle-card"
        @mouseenter="hoveredPrinciple = principle.number"
        @mouseleave="hoveredPrinciple = null"
      >
        <button
          class="principle-toggle"
          :class="{ 'is-open': isPrincipleOpen(principle.number) }"
          type="button"
          :aria-expanded="isPrincipleOpen(principle.number)"
          :aria-controls="`principle-description-${principle.number}`"
          @click="openPrinciple = openPrinciple === principle.number ? null : principle.number"
        >
          <span class="principle-title">{{ principle.title }}</span>
          <span class="material-icon principle-symbol" aria-hidden="true">{{ principle.icon }}</span>
        </button>
        <div
          :id="`principle-description-${principle.number}`"
          class="principle-description"
          :class="{ 'is-open': isPrincipleOpen(principle.number) }"
          :aria-hidden="!isPrincipleOpen(principle.number)"
          :inert="!isPrincipleOpen(principle.number)"
        >
          <div class="principle-description-inner">
            <p>{{ principle.description }}</p>
          </div>
        </div>
        <span class="principle-rule" aria-hidden="true"></span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.section-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.about {
  padding: 7rem 0 6rem;
}

.about-intro {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  align-items: center;
  gap: clamp(3rem, 9vw, 8rem);
}

.about-copy {
  max-width: 470px;
}

.section-kicker {
  margin: 0 0 0.8rem;
  color: var(--color-secondary-text);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: clamp(2.4rem, 4.4vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 1.04;
}

h2 em {
  color: var(--color-primary-text);
  font-weight: 400;
}

.lead {
  margin: 1.4rem 0 0;
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.about-link {
  display: inline-flex;
  margin-top: 1.65rem;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-primary-text);
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
}

.about-link span {
  transition: transform 180ms ease;
}

.about-link:hover span {
  transform: translate(3px, -3px);
}

.about-photo {
  position: relative;
  padding: 0 0 1.3rem 1.3rem;
}

.about-photo::before {
  position: absolute;
  top: 1.3rem;
  right: -1rem;
  bottom: 0;
  left: 0;
  border: 1px solid var(--color-border);
  content: "";
}

.about-photo :deep(.photo-placeholder) {
  min-height: 370px;
}

.photo-index {
  position: absolute;
  right: 0;
  bottom: -0.7rem;
  color: var(--color-muted);
  font-size: 0.63rem;
  letter-spacing: 0.15em;
}

.principles-heading {
  display: flex;
  margin: 6rem 0 1.7rem;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

h3 {
  margin: 0;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 3.2vw, 2.7rem);
  font-weight: 400;
  letter-spacing: -0.04em;
}

.principles-photo :deep(.photo-placeholder) {
  width: 270px;
  min-height: 190px;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.principle-card {
  position: relative;
  min-height: 110px;
  padding: 1.1rem 1.5rem 1.5rem 0;
}

.principle-card + .principle-card {
  padding-left: 1.5rem;
  border-left: 1px solid var(--color-border);
}

.principle-toggle {
  display: grid;
  width: 100%;
  padding: 0;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.8rem;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.principle-number {
  grid-column: 1 / -1;
  color: var(--color-secondary-text);
  font-size: 0.69rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.principle-title {
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: 1.55rem;
  font-weight: 400;
}

.principle-symbol {
  display: grid;
  width: 2.7rem;
  height: 2.7rem;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-secondary-text);
  background: var(--color-surface-soft);
  font-size: 1.3rem;
  transition:
    color 320ms ease,
    background-color 320ms ease,
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.principle-card:hover .principle-symbol,
.principle-toggle.is-open .principle-symbol {
  transform: scale(1.08);
  color: var(--color-primary-text);
}

.principle-description {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 360ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 280ms ease;
}

.principle-description.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.principle-description-inner {
  min-height: 0;
  overflow: hidden;
}

.principle-description p {
  max-width: 310px;
  margin: 0;
  padding-top: 0.75rem;
  color: var(--color-muted);
  font-size: 0.86rem;
  line-height: 1.65;
}

.principle-rule {
  position: absolute;
  right: 1.5rem;
  bottom: -1px;
  left: 0;
  height: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.principle-card:hover .principle-rule {
  transform: scaleX(1);
}

@media (max-width: 760px) {
  .about {
    padding: 5rem 0 4.5rem;
  }

  .about-intro {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .about-copy {
    max-width: 560px;
  }

  .about-photo {
    margin-right: 0.8rem;
  }

  .about-photo :deep(.photo-placeholder) {
    min-height: 300px;
  }

  .principles-heading {
    margin-top: 4.5rem;
  }
}

@media (max-width: 600px) {
  .section-shell {
    width: calc(100% - 2rem);
  }

  .principles-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.7rem;
  }

  .principles-photo,
  .principles-photo :deep(.photo-placeholder) {
    width: 100%;
  }

  .principles-photo :deep(.photo-placeholder) {
    min-height: 180px;
  }

  .principles-grid {
    grid-template-columns: 1fr;
  }

  .principle-card {
    min-height: unset;
    padding: 1.3rem 0 1.1rem;
  }

  .principle-card + .principle-card {
    padding-left: 0;
    border-top: 1px solid var(--color-border);
    border-left: 0;
  }

  .principle-rule {
    display: none;
  }
}
</style>
