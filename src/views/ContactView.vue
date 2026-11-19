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
          <span class="card-label">Atención exclusiva por llamadas telefónicas</span>
          <a href="tel:2282370893" class="phone">228 237 0893</a>
          <p>Teléfono IAP</p>
        </section>
        <section class="contact-card">
          <span class="card-label">Visítanos</span>
          <address>
            Colmerillo No. 3, Nuevo Xalapa,<br />
            91097 Xalapa-Enríquez, Veracruz.
          </address>
          <a
            class="directions-link"
            href="https://www.google.com/maps/search/?api=1&query=Colmerillo+No.+3%2C+Nuevo+Xalapa%2C+91097+Xalapa-Enr%C3%ADquez%2C+Veracruz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir indicaciones <span class="material-icon" aria-hidden="true">arrow_outward</span>
          </a>
        </section>
      </div>

      <section class="map-section" aria-labelledby="map-title">
        <div class="map-heading">
          <div>
            <p class="section-kicker">Ubicación</p>
            <h2 id="map-title">Cómo llegar al IAP</h2>
          </div>
          <span>Xalapa-Enríquez, Veracruz</span>
        </div>
        <iframe
          title="Mapa de Google Maps: Colmerillo No. 3, Nuevo Xalapa, Xalapa-Enríquez, Veracruz"
          src="https://maps.google.com/maps?q=Colmerillo%20No.%203%2C%20Nuevo%20Xalapa%2C%2091097%20Xalapa-Enr%C3%ADquez%2C%20Veracruz&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
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
  grid-template-columns: 0.8fr 1.2fr;
  gap: 1rem;
}

.contact-card {
  min-height: 190px;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.card-label {
  color: var(--color-secondary-text);
  font-size: 0.69rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.phone {
  display: block;
  margin-top: 1rem;
  color: var(--color-primary-text);
  font-size: 2rem;
  text-decoration: none;
}

.contact-card p {
  margin: 0.35rem 0 0;
  color: var(--color-muted);
  font-size: 0.8rem;
}

address {
  margin-top: 1rem;
  color: var(--color-green-text);
  font-size: 1rem;
  font-style: normal;
  line-height: 1.65;
}

.directions-link {
  display: inline-block;
  margin-top: 0.65rem;
  color: var(--color-primary-text);
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
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

  .map-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.3rem;
  }

  iframe {
    height: 330px;
  }
}
</style>
