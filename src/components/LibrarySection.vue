<script setup>
import PhotoPlaceholder from './PhotoPlaceholder.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="biblioteca" class="library section-shell">
    <div class="library-photo">
      <PhotoPlaceholder label="Espacio bibliográfico y sala de lectura" variant="library" />
      <span class="library-photo-note">Conocimiento para una mejor gestión pública</span>
    </div>

    <div class="library-copy">
      <p class="section-kicker">Biblioteca virtual</p>
      <h2>Ideas que abren <em>nuevos caminos.</em></h2>
      <p>
        Un espacio para consultar publicaciones y recursos sobre administración pública, gestión municipal y derecho administrativo.
      </p>
      <RouterLink class="library-link" to="/biblioteca">
        Explorar biblioteca
        <span class="material-icon" aria-hidden="true">arrow_outward</span>
      </RouterLink>
      <span class="library-index" aria-hidden="true">02 — RECURSOS</span>
    </div>
  </section>
</template>

<style scoped>
.section-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.library {
  display: grid;
  padding: 7rem 0;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: clamp(3rem, 8vw, 7rem);
}

.library-photo {
  position: relative;
  padding: 0 1rem 1rem 0;
}

.library-photo::before {
  position: absolute;
  top: 1rem;
  right: 0;
  bottom: 0;
  left: 1rem;
  border: 1px solid #d4c6b0;
  content: "";
}

.library-photo :deep(.photo-placeholder) {
  min-height: 360px;
}

.library-photo-note {
  position: absolute;
  right: 2rem;
  bottom: 1.9rem;
  left: 1.25rem;
  color: #fff;
  font-size: 1.1rem;
  font-style: italic;
  text-align: right;
  text-shadow: 0 1px 5px rgba(24, 51, 47, 0.55);
}

.library-copy {
  position: relative;
  padding-bottom: 2rem;
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
  font-size: clamp(2.5rem, 4.4vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 1.02;
}

h2 em {
  color: var(--color-primary-text);
  font-weight: 400;
}

.library-copy > p:not(.section-kicker) {
  max-width: 410px;
  margin: 1.2rem 0 0;
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.8;
}

.library-link {
  display: inline-flex;
  margin-top: 1.5rem;
  padding: 0.85rem 0;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 1px solid var(--color-primary);
  color: var(--color-primary-text);
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}

.library-index {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #96978e;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
}

@media (max-width: 760px) {
  .library {
    padding: 5rem 0;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .library-photo :deep(.photo-placeholder) {
    min-height: 280px;
  }

  .library-copy {
    padding-bottom: 2.5rem;
  }
}

@media (max-width: 600px) {
  .section-shell {
    width: calc(100% - 2rem);
  }
}
</style>
