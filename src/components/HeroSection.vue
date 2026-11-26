<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL
const AUTOPLAY_MS = 20000

const heroSlides = [
  {
    image: 'images/fachada-1.webp',
    alt: 'Fachada principal del Instituto de Administración Pública de Veracruz',
    width: 1600,
    height: 900,
    position: '50% 25%',
    label: 'Fachada principal del IAP',
  },
  {
    image: 'images/area-comun-2.webp',
    alt: 'Jardín de acceso y placa institucional inaugural del IAP Veracruz',
    width: 1200,
    height: 900,
    position: '55% 55%',
    label: 'Acceso y placa institucional',
  },
]

const activeIndex = ref(0)
let rotationTimer = null

const clearRotation = () => {
  if (rotationTimer) {
    clearInterval(rotationTimer)
    rotationTimer = null
  }
}

const startRotation = () => {
  clearRotation()
  rotationTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % heroSlides.length
  }, AUTOPLAY_MS)
}

const goToSlide = (index) => {
  activeIndex.value = index
  startRotation()
}

const stepSlide = (offset) => {
  activeIndex.value = (activeIndex.value + offset + heroSlides.length) % heroSlides.length
  startRotation()
}

onMounted(() => {
  startRotation()
})

onBeforeUnmount(() => {
  clearRotation()
})
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
          <RouterLink class="text-link" to="/conocenos">Conoce el IAP <span class="material-icon" aria-hidden="true">arrow_outward</span></RouterLink>
        </div>
        <div class="hero-note">
          <span class="note-line" aria-hidden="true"></span>
          <span>Aprender. Profesionalizar. Servir.</span>
        </div>
      </div>

      <div class="hero-visual">
        <div
          class="hero-photo"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Fotografías de las instalaciones del IAP Veracruz"
        >
          <img
            v-for="(slide, index) in heroSlides"
            :key="slide.image"
            class="hero-slide"
            :class="{ 'is-active': activeIndex === index }"
            :src="`${baseUrl}${slide.image}`"
            :alt="slide.alt"
            :width="slide.width"
            :height="slide.height"
            :style="{ objectPosition: slide.position }"
            :fetchpriority="index === 0 ? 'high' : undefined"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :aria-hidden="activeIndex !== index"
            decoding="async"
          />

          <div class="hero-carousel-controls">
            <div class="hero-indicators" role="group" aria-label="Seleccionar fotografía">
              <button
                v-for="(slide, index) in heroSlides"
                :key="slide.image"
                class="hero-indicator"
                type="button"
                :aria-label="`Ver fotografía ${index + 1}: ${slide.label}`"
                :aria-pressed="activeIndex === index"
                @click="goToSlide(index)"
              ></button>
            </div>
            <div class="hero-carousel-nav">
              <button
                class="hero-nav-button"
                type="button"
                aria-label="Fotografía anterior"
                @click="stepSlide(-1)"
              >
                <span class="material-icon" aria-hidden="true">chevron_left</span>
              </button>
              <button
                class="hero-nav-button"
                type="button"
                aria-label="Siguiente fotografía"
                @click="stepSlide(1)"
              >
                <span class="material-icon" aria-hidden="true">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
        <div class="visual-stamp">
          <svg class="stamp-medal" viewBox="0 0 180 216" aria-hidden="true">
            <defs>
              <linearGradient id="medal-gold-outer" x1="12%" y1="8%" x2="88%" y2="92%">
                <stop offset="0%" stop-color="#f9e39e" />
                <stop offset="38%" stop-color="#dfb254" />
                <stop offset="72%" stop-color="#bd892f" />
                <stop offset="100%" stop-color="#8c5f18" />
              </linearGradient>
              <radialGradient id="medal-gold-face" cx="35%" cy="28%" r="72%">
                <stop offset="0%" stop-color="#fff6d6" />
                <stop offset="52%" stop-color="#f1cc76" />
                <stop offset="100%" stop-color="#cc9638" />
              </radialGradient>
              <linearGradient id="medal-ribbon" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#b98329" />
                <stop offset="55%" stop-color="#dca949" />
                <stop offset="100%" stop-color="#9e6d1d" />
              </linearGradient>
            </defs>

            <!-- Listones inferiores de premio (corte en V) -->
            <path
              d="M54 132 L34 208 L57 193 L75 210 L86 142 Z"
              fill="url(#medal-ribbon)"
              stroke="#7d5313"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M126 132 L146 208 L123 193 L105 210 L94 142 Z"
              fill="url(#medal-ribbon)"
              stroke="#7d5313"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path d="M62 145 L49 198" stroke="#f7e29e" stroke-opacity="0.55" stroke-width="1.5" />
            <path d="M118 145 L131 198" stroke="#f7e29e" stroke-opacity="0.55" stroke-width="1.5" />

            <!-- Roseta dorada festoneada de 16 pétalos -->
            <path
              d="M164.0 90.0 Q178.3 107.6 158.4 118.3 Q164.8 140.0 142.3 142.3 Q140.0 164.8 118.3 158.4 Q107.6 178.3 90.0 164.0 Q72.4 178.3 61.7 158.4 Q40.0 164.8 37.7 142.3 Q15.2 140.0 21.6 118.3 Q1.7 107.6 16.0 90.0 Q1.7 72.4 21.6 61.7 Q15.2 40.0 37.7 37.7 Q40.0 15.2 61.7 21.6 Q72.4 1.7 90.0 16.0 Q107.6 1.7 118.3 21.6 Q140.0 15.2 142.3 37.7 Q164.8 40.0 158.4 61.7 Q178.3 72.4 164.0 90.0 Z"
              fill="url(#medal-gold-outer)"
              stroke="#845714"
              stroke-width="1.5"
              stroke-linejoin="round"
            />

            <!-- Cara interior metálica + anillo grabado -->
            <circle cx="90" cy="90" r="65" fill="url(#medal-gold-face)" stroke="#8c5e18" stroke-width="1.5" />
            <circle cx="90" cy="90" r="59.5" fill="none" stroke="#7d5214" stroke-opacity="0.5" stroke-width="1" stroke-dasharray="3 2.5" />
          </svg>

          <div class="stamp-content">
            <strong class="stamp-years">
              <span class="stamp-number">53</span>
              <span class="stamp-unit">Años</span>
            </strong>
            <span class="stamp-divider" aria-hidden="true"></span>
            <span class="stamp-caption">de Excelencia</span>
          </div>
        </div>
        <span class="visual-index" aria-hidden="true">{{ String(activeIndex + 1).padStart(2, '0') }} / VER</span>
      </div>
    </div>
    <div class="hero-bottom">
      <span>Instituto de Administración Pública del Estado de Veracruz, A.C. · Fundado en 1973</span>
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

.hero-photo {
  position: relative;
  height: 470px;
  margin: 0;
  overflow: hidden;
  border-radius: 3px;
  background: #1e2d29;
  box-shadow: 18px 22px 0 rgba(186, 134, 74, 0.24);
}

.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 600ms ease;
  pointer-events: none;
}

.hero-slide.is-active {
  opacity: 1;
}

.hero-carousel-controls {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  padding: 2.2rem 1rem 0.9rem;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(0deg, rgba(18, 42, 39, 0.72), transparent);
}

.hero-indicators,
.hero-carousel-nav {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.hero-indicator {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: width 180ms ease, background-color 180ms ease;
}

.hero-indicator[aria-pressed="true"] {
  width: 1.5rem;
  background: #d4a669;
}

.hero-nav-button {
  display: grid;
  width: 2rem;
  height: 2rem;
  padding: 0;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 2px;
  color: #fff;
  background: rgba(18, 42, 39, 0.55);
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease, background-color 180ms ease;
}

.hero-nav-button:hover {
  border-color: #e4bd83;
  color: #e4bd83;
  background: rgba(18, 42, 39, 0.8);
}

.visual-stamp {
  position: absolute;
  z-index: 3;
  top: 22px;
  left: -48px;
  width: 174px;
  transform: rotate(-7deg);
  filter: drop-shadow(0 14px 26px rgba(18, 22, 20, 0.34));
  pointer-events: none;
  user-select: none;
}

.stamp-medal {
  display: block;
  width: 100%;
  height: auto;
}

.stamp-content {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 83.333%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.05rem;
  text-align: center;
}

.stamp-years {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5d0e27;
  font-family: var(--font-heading);
  line-height: 0.92;
  text-shadow: 0 1px 0 rgba(255, 248, 220, 0.7);
}

.stamp-number {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.stamp-unit {
  margin-top: 0.08rem;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.stamp-divider {
  width: 44px;
  height: 1px;
  margin: 0.22rem 0 0.2rem;
  background: rgba(93, 14, 39, 0.35);
}

.stamp-caption {
  color: #462a07;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.15;
  white-space: nowrap;
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
    top: 16px;
    left: -28px;
    width: 144px;
  }

  .stamp-content {
    padding: 0.65rem 0.85rem;
  }

  .stamp-number {
    font-size: 2.45rem;
  }

  .stamp-unit {
    font-size: 1rem;
  }

  .stamp-caption {
    font-size: 0.68rem;
  }
}

@media (max-width: 760px) {
  .hero-photo {
    height: 340px;
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
    top: 12px;
    left: -24px;
    width: 132px;
  }

  .stamp-content {
    padding: 0.55rem 0.8rem;
  }

  .stamp-number {
    font-size: 2.25rem;
  }

  .stamp-unit {
    font-size: 0.92rem;
  }

  .stamp-caption {
    font-size: 0.62rem;
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
