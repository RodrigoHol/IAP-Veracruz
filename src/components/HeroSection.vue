<script setup>
import PhotoPlaceholder from './PhotoPlaceholder.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> Veracruz · Servicio público</p>
        <h1>Formación que fortalece <em>lo público.</em></h1>
        <p class="hero-description">
          Somos una institución dedicada a la profesionalización de las personas del sector público, para fortalecer la gestión gubernamental en Veracruz.
        </p>
        <div class="hero-actions">
          <RouterLink class="button button--gold" to="/profesionalizacion">
            Explorar oferta académica
            <span class="material-icon" aria-hidden="true">arrow_outward</span>
          </RouterLink>
          <RouterLink class="text-link" to="/#instituto">Conoce el IAP <span class="material-icon" aria-hidden="true">south</span></RouterLink>
        </div>
        <div class="hero-note">
          <span class="note-line" aria-hidden="true"></span>
          <span>Aprender. Profesionalizar. Servir.</span>
        </div>
      </div>

      <div class="hero-visual">
        <PhotoPlaceholder label="Fachada principal del IAP" variant="hero" />
        <div class="visual-stamp" aria-hidden="true">
          <span>INSTITUTO DE</span>
          <strong>ADMINISTRACIÓN<br />PÚBLICA</strong>
          <span>VERACRUZ</span>
        </div>
        <span class="visual-index" aria-hidden="true">01 / VER</span>
      </div>
    </div>
    <div class="hero-bottom">
      <span>Instituto de Administración Pública del Estado de Veracruz, A.C. · Fundado en 1978</span>
      <RouterLink :to="{ name: 'home', hash: '#convocatoria' }">Ver convocatoria <span class="material-icon" aria-hidden="true">south</span></RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(ellipse at 2% 12%, rgba(186, 134, 74, 0.14), transparent 32%),
    var(--color-primary);
}

.hero::before {
  position: absolute;
  top: -25%;
  left: 42%;
  width: 1px;
  height: 160%;
  background: rgba(255, 255, 255, 0.09);
  content: "";
  transform: rotate(23deg);
}

.hero-inner {
  display: grid;
  width: min(var(--content-width), calc(100% - 3rem));
  min-height: 570px;
  margin: 0 auto;
  padding: 4.6rem 0 5.2rem;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: clamp(3rem, 8vw, 7rem);
}

.hero-copy {
  position: relative;
  z-index: 1;
  animation: rise-in 700ms both;
}

.eyebrow {
  display: flex;
  margin: 0 0 1.5rem;
  align-items: center;
  gap: 0.7rem;
  color: #e9c995;
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.eyebrow span {
  width: 27px;
  height: 1px;
  background: var(--color-secondary);
}

h1 {
  max-width: 620px;
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3.2rem, 5.6vw, 5.4rem);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 0.99;
}

h1 em {
  color: #e4bd83;
  font-weight: 400;
}

.hero-description {
  max-width: 440px;
  margin: 1.65rem 0 0;
  color: rgba(255, 255, 255, 0.77);
  font-size: 1.05rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  margin-top: 2rem;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.button {
  display: inline-flex;
  min-height: 54px;
  padding: 0 1.25rem;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  border-radius: 2px;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 180ms ease, background 180ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button--gold {
  color: #2a231c;
  background: #d4a669;
}

.button--gold:hover {
  background: #e0b77e;
}

.text-link {
  color: #fff;
  font-size: 0.87rem;
  font-weight: 500;
  text-decoration: none;
}

.text-link span {
  margin-left: 0.35rem;
  color: #e4bd83;
}

.hero-note {
  display: flex;
  margin-top: 4rem;
  align-items: center;
  gap: 0.8rem;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.73rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.note-line {
  width: 35px;
  height: 1px;
  background: rgba(255, 255, 255, 0.45);
}

.hero-visual {
  position: relative;
  padding: 0 1.2rem 1.2rem 0;
  animation: rise-in 850ms 120ms both;
}

.visual-stamp {
  position: absolute;
  top: 38px;
  left: -42px;
  display: flex;
  width: 132px;
  height: 132px;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(232, 225, 213, 0.8);
  border-radius: 50%;
  color: var(--color-green);
  background: #e8e1d5;
  font-size: 0.56rem;
  letter-spacing: 0.09em;
  line-height: 1.5;
  text-align: center;
  transform: rotate(-9deg);
}

.visual-stamp strong {
  margin: 0.25rem 0;
  color: var(--color-primary);
  font-size: 0.82rem;
  letter-spacing: 0.02em;
  line-height: 1.1;
}

.visual-index {
  position: absolute;
  right: 0.8rem;
  bottom: -0.4rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
}

.hero-bottom {
  display: flex;
  min-height: 58px;
  padding: 0 max(calc((100vw - var(--content-width)) / 2), 1.5rem);
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.73rem;
}

.hero-bottom a {
  color: #fff;
  font-weight: 500;
  text-decoration: none;
}

.hero-bottom a span {
  margin-left: 0.5rem;
  color: #e4bd83;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .hero-inner {
    min-height: unset;
    padding: 4rem 0 4.5rem;
    grid-template-columns: 1fr 0.92fr;
    gap: 2.4rem;
  }

  h1 {
    font-size: clamp(3rem, 7vw, 4.5rem);
  }

  .visual-stamp {
    left: -26px;
    width: 108px;
    height: 108px;
  }
}

@media (max-width: 680px) {
  .hero-inner {
    width: calc(100% - 2rem);
    padding: 3.2rem 0 3.7rem;
    grid-template-columns: 1fr;
    gap: 2.8rem;
  }

  h1 {
    max-width: 520px;
    font-size: clamp(3.25rem, 14vw, 5rem);
  }

  .hero-description {
    font-size: 0.98rem;
  }

  .hero-note {
    margin-top: 2rem;
  }

  .hero-visual {
    margin: 0 0.4rem 0 1.5rem;
  }

  .visual-stamp {
    top: 20px;
    left: -30px;
  }

  .hero-bottom {
    min-height: 54px;
    padding: 0 1rem;
    font-size: 0.66rem;
  }
}

@media (max-width: 410px) {
  .hero-bottom span {
    max-width: 62%;
  }
}
</style>
