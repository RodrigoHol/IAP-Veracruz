<script setup>
import {
  councilMeta,
  councilPresident,
  councilOfficers,
  councilVocals,
} from '../data/council'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <section id="consejo" class="council-section" aria-labelledby="council-title">
    <div class="section-shell">
      <div class="council-heading">
        <div>
          <p class="section-kicker">{{ councilMeta.kicker }}</p>
          <h2 id="council-title">{{ councilMeta.title }}</h2>
          <p class="council-description">{{ councilMeta.description }}</p>
        </div>
        <div class="council-status-note" role="note">
          <span class="status-dot" aria-hidden="true"></span>
          <span>{{ councilMeta.statusNote }}</span>
        </div>
      </div>

      <!-- Nivel 1: Presidencia -->
      <article class="council-president-card">
        <div class="member-portrait member-portrait--featured">
          <img
            v-if="councilPresident.photo"
            :src="`${baseUrl}${councilPresident.photo}`"
            :alt="`${councilPresident.role}: ${councilPresident.name}`"
            loading="lazy"
            decoding="async"
          />
          <div v-else class="portrait-placeholder">
            <span class="portrait-placeholder-badge">
              <span class="material-icon" aria-hidden="true">person</span>
            </span>
            <span class="portrait-placeholder-label">Fotografía pendiente</span>
          </div>
        </div>

        <div class="president-body">
          <div class="member-meta-row">
            <span class="member-role-label">{{ councilPresident.tier }} · {{ councilPresident.role }}</span>
            <span class="member-status-badge">{{ councilPresident.status }}</span>
          </div>
          <h3>{{ councilPresident.name }}</h3>
          <span class="president-rule" aria-hidden="true"></span>
          <p class="president-bio">{{ councilPresident.bio }}</p>
        </div>
      </article>

      <!-- Nivel 2: Mesa Directiva -->
      <div class="council-group">
        <div class="group-header">
          <h3>Mesa Directiva</h3>
          <span class="group-line" aria-hidden="true"></span>
        </div>

        <div class="officers-grid">
          <article v-for="officer in councilOfficers" :key="officer.id" class="officer-card">
            <div class="member-portrait member-portrait--officer">
              <img
                v-if="officer.photo"
                :src="`${baseUrl}${officer.photo}`"
                :alt="`${officer.role}: ${officer.name}`"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="portrait-placeholder portrait-placeholder--compact">
                <span class="portrait-placeholder-badge">
                  <span class="material-icon" aria-hidden="true">person</span>
                </span>
                <span class="portrait-placeholder-label">Fotografía pendiente</span>
              </div>
            </div>

            <div class="officer-body">
              <div class="member-meta-row">
                <span class="member-role-label">{{ officer.role }}</span>
                <span class="member-status-badge">{{ officer.status }}</span>
              </div>
              <h4>{{ officer.name }}</h4>
              <div class="member-bio">{{ officer.bio }}</div>
            </div>
          </article>
        </div>
      </div>

      <!-- Nivel 3: Vocales -->
      <div class="council-group">
        <div class="group-header">
          <h3>Vocales</h3>
          <span class="group-subtitle">Integración colegiada</span>
          <span class="group-line" aria-hidden="true"></span>
        </div>

        <div class="vocals-grid">
          <article v-for="vocal in councilVocals" :key="vocal.id" class="vocal-card">
            <div class="vocal-top">
              <div class="vocal-identity">
                <div class="vocal-avatar">
                  <img
                    v-if="vocal.photo"
                    :src="`${baseUrl}${vocal.photo}`"
                    :alt="`${vocal.role} ${vocal.index}: ${vocal.name}`"
                    loading="lazy"
                    decoding="async"
                  />
                  <span v-else class="material-icon" aria-hidden="true">person</span>
                </div>
                <span class="vocal-index">{{ vocal.index }}</span>
              </div>
              <span class="member-role-label">{{ vocal.role }}</span>
            </div>

            <h4>{{ vocal.name }}</h4>
            <div class="member-bio member-bio--compact">{{ vocal.bio }}</div>

            <div class="vocal-footer">
              <span class="member-status-badge">{{ vocal.status }}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.council-section {
  padding: 6rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-section);
}

.section-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.council-heading {
  display: grid;
  margin-bottom: 2.8rem;
  grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
  align-items: end;
  gap: 2rem;
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
  font-size: clamp(2rem, 3.6vw, 2.95rem);
  font-weight: 400;
  letter-spacing: -0.04em;
}

.council-description {
  max-width: 650px;
  margin: 0.9rem 0 0;
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.75;
}

.council-status-note {
  display: flex;
  padding: 0.95rem 1.1rem;
  align-items: flex-start;
  gap: 0.7rem;
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-secondary);
  color: var(--color-muted);
  background: var(--color-surface);
  font-size: 0.82rem;
  line-height: 1.5;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.38rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--color-secondary);
}

/* Nivel 1: Presidencia */
.council-president-card {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  border: 1px solid var(--color-border);
  border-top: 3px solid var(--color-primary);
  background: var(--color-surface);
  box-shadow: 0 12px 30px rgba(24, 51, 47, 0.05);
}

.member-portrait {
  position: relative;
  overflow: hidden;
  background: var(--color-surface-soft);
}

.member-portrait--featured {
  aspect-ratio: 4 / 5;
  border-right: 1px solid var(--color-border);
}

.member-portrait--officer {
  aspect-ratio: 16 / 10;
  border-bottom: 1px solid var(--color-border);
}

.member-portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.portrait-placeholder {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  background:
    radial-gradient(circle at 50% 36%, rgba(186, 134, 74, 0.14), transparent 62%),
    var(--color-surface-soft);
  text-align: center;
}

.portrait-placeholder::before {
  position: absolute;
  inset: 0.75rem;
  border: 1px dashed var(--color-border);
  content: "";
  pointer-events: none;
}

.portrait-placeholder-badge {
  position: relative;
  display: grid;
  width: 4.1rem;
  height: 4.1rem;
  place-items: center;
  border: 1px solid var(--color-secondary);
  border-radius: 50%;
  color: var(--color-primary-text);
  background: var(--color-surface);
}

.portrait-placeholder--compact .portrait-placeholder-badge {
  width: 3.3rem;
  height: 3.3rem;
}

.portrait-placeholder-badge .material-icon {
  font-size: 1.85rem;
}

.portrait-placeholder--compact .portrait-placeholder-badge .material-icon {
  font-size: 1.5rem;
}

.portrait-placeholder-label {
  position: relative;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.president-body {
  display: flex;
  padding: 2.2rem 2.4rem;
  flex-direction: column;
  justify-content: center;
}

.member-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.member-role-label {
  color: var(--color-primary-text);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.member-status-badge {
  display: inline-flex;
  padding: 0.22rem 0.6rem;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-muted);
  background: var(--color-surface-muted);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.president-body h3 {
  margin: 0.85rem 0 0;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: clamp(1.65rem, 2.8vw, 2.2rem);
  font-weight: 400;
  letter-spacing: -0.03em;
}

.president-rule {
  width: 56px;
  height: 2px;
  margin: 1.05rem 0;
  background: var(--color-secondary);
}

.president-bio {
  max-width: 600px;
  margin: 0;
  color: var(--color-muted);
  line-height: 1.75;
}

/* Niveles 2 y 3 */
.council-group {
  margin-top: 3.5rem;
}

.group-header {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: center;
  gap: 1rem;
}

.group-header h3 {
  margin: 0;
  flex: 0 0 auto;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 2.4vw, 1.85rem);
  font-weight: 400;
  letter-spacing: -0.03em;
}

.group-subtitle {
  flex: 0 0 auto;
  color: var(--color-secondary-text);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.group-line {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.officers-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.officer-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-top: 2px solid var(--color-secondary);
  background: var(--color-surface);
}

.officer-body {
  display: flex;
  padding: 1.35rem 1.4rem 1.5rem;
  flex: 1;
  flex-direction: column;
}

.officer-body h4,
.vocal-card h4 {
  margin: 0.7rem 0 0;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.member-bio {
  margin-top: 0.65rem;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.member-bio--compact {
  font-size: 0.86rem;
  line-height: 1.6;
}

.vocals-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.1rem;
}

.vocal-card {
  display: flex;
  padding: 1.25rem;
  flex-direction: column;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.vocal-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.vocal-identity {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.vocal-avatar {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-secondary-text);
  background: var(--color-surface-soft);
}

.vocal-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.vocal-avatar .material-icon {
  font-size: 1.25rem;
}

.vocal-index {
  color: var(--color-secondary-text);
  font-size: 0.82rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.vocal-footer {
  margin-top: auto;
  padding-top: 1rem;
}

@media (max-width: 1040px) {
  .council-heading {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .vocals-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .officers-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .council-president-card {
    grid-template-columns: 1fr;
  }

  .member-portrait--featured {
    aspect-ratio: 4 / 3;
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }

  .president-body {
    padding: 1.5rem;
  }
}

@media (max-width: 650px) {
  .council-section {
    padding: 4.5rem 0;
  }

  .section-shell {
    width: calc(100% - 2rem);
  }
}

@media (max-width: 600px) {
  .vocals-grid {
    grid-template-columns: 1fr;
  }

  .group-subtitle {
    display: none;
  }
}
</style>
