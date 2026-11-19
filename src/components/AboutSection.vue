<script setup>
import PhotoPlaceholder from './PhotoPlaceholder.vue'

const principles = [
  {
    number: '01',
    title: 'Misión',
    description: 'Profesionalizar el servicio público mediante conocimiento, formación y compromiso con la sociedad.',
  },
  {
    number: '02',
    title: 'Visión',
    description: 'Ser un referente en la preparación de personas capaces de generar valor público en Veracruz.',
  },
  {
    number: '03',
    title: 'Valores',
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
      <article v-for="principle in principles" :key="principle.number" class="principle-card">
        <span class="principle-number">{{ principle.number }}</span>
        <h4>{{ principle.title }}</h4>
        <p>{{ principle.description }}</p>
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
  min-height: 215px;
  padding: 1.5rem 1.5rem 1.7rem 0;
}

.principle-card + .principle-card {
  padding-left: 1.75rem;
  border-left: 1px solid var(--color-border);
}

.principle-number {
  color: var(--color-secondary-text);
  font-size: 0.69rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

h4 {
  margin: 1.5rem 0 0.5rem;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: 1.55rem;
  font-weight: 400;
}

.principle-card p {
  max-width: 310px;
  margin: 0;
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
  transition: transform 250ms ease;
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
    padding: 1.3rem 0 1.5rem;
  }

  .principle-card + .principle-card {
    padding-left: 0;
    border-top: 1px solid var(--color-border);
    border-left: 0;
  }

  h4 {
    margin-top: 0.8rem;
  }

  .principle-rule {
    display: none;
  }
}
</style>
