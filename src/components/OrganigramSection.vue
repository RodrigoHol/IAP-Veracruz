<template>
  <section id="organigrama" class="organigram-section">
    <div class="section-shell">
      <div class="organigram-heading">
        <p class="section-kicker">Estructura institucional</p>
        <h2>Organigrama</h2>
        <p class="organigram-intro">Esquema ilustrativo; los nombres de las áreas están por confirmarse.</p>
      </div>

      <div
        class="organigram-scroll"
        role="region"
        aria-label="Organigrama ilustrativo. Desplázate horizontalmente para ver toda la estructura."
        tabindex="0"
      >
        <div class="organigram-chart">
          <svg class="organigram-connectors" viewBox="0 0 1000 480" preserveAspectRatio="none" aria-hidden="true">
            <path d="M500 58 V105 M185 105 H815 M185 105 V160 M500 105 V160 M815 105 V160" />
            <path d="M185 218 V280 M500 218 V280 M815 218 V280 M500 338 V400" />
            <path class="support-connector" d="M815 105 H840" />
          </svg>

          <div class="org-node org-root">Área 1</div>
          <div class="org-frame">
            <div class="org-node org-support">Área 2</div>
            <div class="org-branches">
              <div class="org-branch">
                <div class="org-node">Área 3</div>
                <div class="org-node">Área 6</div>
              </div>
              <div class="org-branch">
                <div class="org-node">Área 4</div>
                <div class="org-node">Área 7</div>
                <div class="org-node">Área 9</div>
              </div>
              <div class="org-branch">
                <div class="org-node">Área 5</div>
                <div class="org-node">Área 8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.organigram-section {
  padding: 6rem 0;
  background: var(--color-surface-muted);
}

.section-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.organigram-heading {
  max-width: 760px;
  margin-bottom: 2rem;
}

.section-kicker {
  margin: 0 0 0.75rem;
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
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 400;
  letter-spacing: -0.04em;
}

.organigram-intro {
  margin: 0.85rem 0 0;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.organigram-scroll {
  overflow-x: auto;
  padding: 0.25rem 0.25rem 1rem;
  scrollbar-color: var(--color-secondary) var(--color-surface-soft);
}

.organigram-scroll:focus-visible {
  outline: 3px solid var(--color-secondary);
  outline-offset: 3px;
}

.organigram-chart {
  position: relative;
  width: 100%;
  min-width: 760px;
  height: 480px;
}

.organigram-connectors {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  pointer-events: none;
  stroke: var(--color-border);
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}

.support-connector {
  stroke: var(--color-secondary-text);
  stroke-dasharray: 4 4;
}

.org-frame {
  position: absolute;
  top: 130px;
  right: 0;
  bottom: 8px;
  left: 0;
  z-index: 1;
  padding: 30px 5% 24px;
  border: 1px dashed var(--color-secondary-text);
}

.org-node {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: 3.6rem;
  padding: 0.75rem 1rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  color: var(--color-green-text);
  background: var(--color-surface);
  box-shadow: 0 5px 16px rgba(24, 51, 47, 0.055);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
}

.org-root {
  position: absolute;
  top: 0;
  left: 39%;
  width: 22%;
  border-top: 3px solid var(--color-primary);
}

.org-support {
  position: absolute;
  top: -54px;
  left: 84%;
  width: 14%;
  border-style: dashed;
  border-color: var(--color-secondary-text);
  color: var(--color-primary-text);
}

.org-branches {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 5%;
}

.org-branch {
  display: flex;
  flex-direction: column;
  gap: 3.875rem;
}

@media (max-width: 650px) {
  .organigram-section {
    padding: 4.5rem 0;
  }

  .section-shell {
    width: calc(100% - 2rem);
  }
}
</style>
