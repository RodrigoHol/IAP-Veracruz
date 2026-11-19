<template>
  <section id="convocatoria" class="admissions section-shell" aria-labelledby="admissions-title">
    <div class="admissions-card">
      <div class="admissions-marker">
        <span class="marker-dot"></span>
        <span>Admisiones</span>
      </div>
      <div class="admissions-copy">
        <p class="section-kicker">Fechas de inscripción</p>
        <h2 id="admissions-title">Prepárate para tu siguiente etapa profesional.</h2>
        <p>Las fechas de la próxima convocatoria se publicarán cuando el calendario oficial esté disponible.</p>
      </div>
      <div class="admissions-action">
        <span class="status-label">Próxima convocatoria</span>
        <span class="status-value">Próximamente</span>
        <RouterLink to="/contacto" class="admissions-link">Llamar para informes <span class="material-icon" aria-hidden="true">arrow_outward</span></RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.admissions {
  position: relative;
  z-index: 2;
  margin-top: -1px;
  padding-top: 2rem;
}

.admissions-card {
  display: grid;
  padding: 2rem 2.25rem;
  grid-template-columns: 0.7fr 1.7fr 0.9fr;
  align-items: center;
  gap: 2rem;
  border: 1px solid rgba(24, 51, 47, 0.09);
  background: var(--color-surface);
  box-shadow: 0 14px 42px rgba(24, 51, 47, 0.055);
}

.admissions-marker {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-primary-text);
  font-size: 0.77rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.marker-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-secondary);
  box-shadow: 0 0 0 4px rgba(186, 134, 74, 0.13);
}

.section-kicker {
  margin: 0 0 0.45rem;
  color: var(--color-secondary-text);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: clamp(1.45rem, 2.5vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.admissions-copy > p:last-child {
  margin: 0.65rem 0 0;
  color: var(--color-muted);
  font-size: 0.88rem;
  line-height: 1.55;
}

.admissions-action {
  display: flex;
  min-height: 93px;
  padding-left: 1.7rem;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--color-border);
}

.status-label {
  color: var(--color-muted);
  font-size: 0.72rem;
}

.status-value {
  margin-top: 0.25rem;
  color: var(--color-green-text);
  font-size: 0.89rem;
  font-weight: 700;
}

.admissions-link {
  margin-top: 0.8rem;
  color: var(--color-primary-text);
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
}

.admissions-link span {
  margin-left: 0.3rem;
}

@media (max-width: 900px) {
  .admissions-card {
    padding: 1.7rem;
    grid-template-columns: 1fr 2fr;
  }

  .admissions-marker {
    grid-column: 1 / -1;
  }
}

@media (max-width: 620px) {
  .section-shell {
    width: calc(100% - 2rem);
  }

  .admissions {
    padding-top: 1rem;
  }

  .admissions-card {
    padding: 1.5rem;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .admissions-action {
    min-height: unset;
    padding: 1.2rem 0 0;
    border-top: 1px solid var(--color-border);
    border-left: 0;
  }
}
</style>
