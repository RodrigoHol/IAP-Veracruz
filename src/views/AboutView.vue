<script setup>
import AboutSection from '../components/AboutSection.vue'
import CouncilSection from '../components/CouncilSection.vue'
import OrganigramSection from '../components/OrganigramSection.vue'
</script>

<template>
  <div class="page">
    <header class="page-hero">
      <div class="page-shell">
        <p class="eyebrow">IAP Veracruz · Fundado en 1973</p>
        <h1>Conócenos</h1>
        <p class="hero-lead">
          Más de cinco décadas impulsando la profesionalización de las personas del sector público y el fortalecimiento de la gestión gubernamental en Veracruz.
        </p>

        <nav class="page-anchors" aria-label="Secciones de Conócenos">
          <a href="#instituto">
            <span>Instituto e instalaciones</span>
            <span class="material-icon" aria-hidden="true">south</span>
          </a>
          <a href="#consejo">
            <span>Consejo Directivo</span>
            <span class="material-icon" aria-hidden="true">south</span>
          </a>
          <a href="#organigrama">
            <span>Organigrama</span>
            <span class="material-icon" aria-hidden="true">south</span>
          </a>
        </nav>
      </div>
    </header>

    <AboutSection />
    <CouncilSection />
    <OrganigramSection />
  </div>
</template>

<style scoped>
.page-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.page-hero {
  padding: 5.2rem 0 4.6rem;
  color: #fff;
  background:
    radial-gradient(ellipse at 82% 10%, rgba(186, 134, 74, 0.18), transparent 35%),
    var(--color-green);
}

.eyebrow {
  margin: 0 0 0.85rem;
  color: #d6ad79;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.05em;
}

.hero-lead {
  max-width: 640px;
  margin: 1.15rem 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 1rem;
  line-height: 1.7;
}

.page-anchors {
  display: flex;
  margin-top: 2.2rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.page-anchors a {
  display: inline-flex;
  min-height: 40px;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 2px;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    border-color 180ms ease,
    color 180ms ease,
    background-color 180ms ease;
}

.page-anchors a:hover {
  border-color: #d4aa72;
  color: #e9c995;
  background: rgba(255, 255, 255, 0.1);
}

.page-anchors .material-icon {
  font-size: 1rem;
  color: #d4aa72;
}

@media (max-width: 650px) {
  .page-shell {
    width: calc(100% - 2rem);
  }

  .page-hero {
    padding: 3.7rem 0 3.6rem;
  }
}
</style>
