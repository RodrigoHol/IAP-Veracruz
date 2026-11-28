<script setup>
import SocialIcon from '../components/SocialIcon.vue'
import { siteInfo, socialLinks } from '../data/site'
</script>

<template>
  <div class="page">
    <header class="contact-hero">
      <div class="page-shell">
        <p class="eyebrow">IAP Veracruz</p>
        <h1>Estamos para orientarte.</h1>
        <p>Comunícate con el Instituto para recibir información sobre los programas y servicios.</p>
      </div>
    </header>

    <section class="page-shell contact-content">
      <div class="contact-details">
        <section class="contact-card">
          <div class="contact-card-heading">
            <span class="material-icon contact-icon" aria-hidden="true">call</span>
            <span class="card-label">Teléfono</span>
          </div>
          <a :href="siteInfo.phoneHref" class="phone" :aria-label="`Llamar al ${siteInfo.phoneDisplay}`">
            {{ siteInfo.phoneDisplay }}
          </a>
          <p>{{ siteInfo.phoneNote }}.</p>
        </section>
        <section class="contact-card">
          <div class="contact-card-heading">
            <span class="material-icon contact-icon" aria-hidden="true">location_on</span>
            <span class="card-label">Visítanos</span>
          </div>
          <address>
            {{ siteInfo.addressLines[0] }}<br />
            {{ siteInfo.addressLines[1] }}
          </address>
          <a
            class="directions-link"
            :href="siteInfo.mapsDirectionsUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="material-icon" aria-hidden="true">directions</span>
            Abrir indicaciones
          </a>
        </section>
        <section class="contact-card social-card">
          <div class="contact-card-heading">
            <span class="material-icon contact-icon" aria-hidden="true">share</span>
            <span class="card-label">Redes sociales</span>
          </div>
          <p>Síguenos en nuestras cuentas oficiales.</p>
          <div class="contact-socials">
            <a
              v-for="social in socialLinks"
              :key="social.id"
              class="contact-social-link"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.ariaLabel"
            >
              <SocialIcon :network="social.id" />
              <span>{{ social.label }}</span>
              <span class="material-icon social-arrow" aria-hidden="true">arrow_outward</span>
            </a>
          </div>
        </section>
      </div>

      <section class="map-section" aria-labelledby="map-title">
        <div class="map-heading">
          <div class="map-title">
            <span class="material-icon map-icon" aria-hidden="true">map</span>
            <div>
              <p class="section-kicker">Ubicación</p>
              <h2 id="map-title">Cómo llegar al IAP</h2>
            </div>
          </div>
          <span>{{ siteInfo.city }}</span>
        </div>
        <iframe
          :title="`Mapa de Google Maps: ${siteInfo.addressLines.join(' ')}`"
          :src="siteInfo.mapsEmbedUrl"
          loading="lazy"
          referrerpolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          allowfullscreen
        ></iframe>
      </section>

      <p class="schedule-note">Los horarios de atención y correos institucionales por área se publicarán al confirmarse.</p>
    </section>
  </div>
</template>

<style scoped>
.page-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.contact-hero {
  padding: 5rem 0;
  color: #fff;
  background:
    radial-gradient(ellipse at 82% 12%, rgba(186, 134, 74, 0.18), transparent 35%),
    var(--color-green);
}

.eyebrow,
.section-kicker {
  margin: 0 0 0.75rem;
  color: #d6ad79;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1,
h2 {
  font-family: var(--font-heading);
  font-weight: 400;
  letter-spacing: -0.05em;
}

h1 {
  margin: 0;
  font-size: clamp(3rem, 5.5vw, 4.6rem);
}

.contact-hero .page-shell > p:last-child {
  max-width: 560px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
}

.contact-content {
  padding: 4rem 0 5.5rem;
}

.contact-details {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.contact-card {
  display: flex;
  min-height: 220px;
  padding: 1.5rem;
  flex-direction: column;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.contact-card-heading {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.contact-icon,
.map-icon {
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 3px;
  color: var(--color-primary-text);
  background: var(--color-surface-soft);
  font-size: 1.3rem;
}

.card-label {
  color: var(--color-secondary-text);
  font-size: 0.69rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.phone {
  display: inline-flex;
  margin-top: 1.2rem;
  align-items: center;
  color: var(--color-primary-text);
  font-size: clamp(1.7rem, 2.2vw, 2rem);
  text-decoration: none;
}

.contact-card p {
  margin: 0.35rem 0 0;
  color: var(--color-muted);
  font-size: 0.8rem;
}

address {
  margin-top: 1.2rem;
  color: var(--color-green-text);
  font-size: 1rem;
  font-style: normal;
  line-height: 1.65;
}

.directions-link {
  display: inline-flex;
  margin-top: auto;
  padding-top: 0.8rem;
  align-items: center;
  gap: 0.45rem;
  color: var(--color-primary-text);
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
}

.social-card > p {
  margin: 0.9rem 0 1rem;
  color: var(--color-muted);
  font-size: 0.82rem;
}

.contact-socials {
  display: grid;
  margin-top: auto;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.contact-social-link:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}

.contact-social-link {
  display: flex;
  min-width: 0;
  min-height: 2.8rem;
  padding: 0.55rem 0.65rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  color: var(--color-green-text);
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    border-color 180ms ease,
    color 180ms ease,
    background-color 180ms ease;
}

.contact-social-link:hover {
  border-color: var(--color-secondary-text);
  color: var(--color-primary-text);
  background: var(--color-surface-soft);
}

.social-arrow {
  margin-left: auto;
  font-size: 1rem;
}

.map-section {
  margin-top: 3rem;
}

.map-heading {
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.section-kicker {
  color: var(--color-secondary-text);
}

h2 {
  margin: 0;
  color: var(--color-green-text);
  font-size: clamp(2rem, 3.5vw, 2.8rem);
}

.map-heading > span {
  color: var(--color-muted);
  font-size: 0.78rem;
}

.map-title {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.map-title .section-kicker {
  margin-bottom: 0.45rem;
}

iframe {
  display: block;
  width: 100%;
  height: 420px;
  border: 0;
  background: var(--color-surface-muted);
}

.schedule-note {
  margin: 1rem 0 0;
  color: var(--color-muted);
  font-size: 0.78rem;
}

@media (max-width: 960px) {
  .contact-details {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-card:last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 650px) {
  .page-shell {
    width: calc(100% - 2rem);
  }

  .contact-hero {
    padding: 3.7rem 0;
  }

  .contact-content {
    padding: 3rem 0 4rem;
  }

  .contact-details {
    grid-template-columns: 1fr;
  }

  .contact-card {
    min-height: 190px;
  }

  .contact-card:last-child {
    grid-column: auto;
  }

  .map-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.3rem;
  }

  iframe {
    height: 330px;
  }
}

@media (max-width: 480px) {
  .contact-socials {
    grid-template-columns: 1fr;
  }

  .contact-social-link:last-child:nth-child(odd) {
    grid-column: auto;
  }
}
</style>
