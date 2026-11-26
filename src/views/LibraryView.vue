<script setup>
import { computed, ref } from 'vue'
import PhotoPlaceholder from '../components/PhotoPlaceholder.vue'
import { sanitizeExternalUrl, sanitizeText } from '../utils/security'

const searchQuery = ref('')
const selectedTopic = ref('Todos')
const topics = ['Todos', 'Administración Pública', 'Gestión Municipal', 'Derecho Administrativo', 'Revistas IAP']
const publications = []

const filteredPublications = computed(() => {
  const query = sanitizeText(searchQuery.value, 120).toLocaleLowerCase('es-MX')
  return publications
    .filter((publication) => {
      const matchesTopic = selectedTopic.value === 'Todos' || publication.topic === selectedTopic.value
      const matchesQuery = !query || `${publication.title} ${publication.author}`.toLocaleLowerCase('es-MX').includes(query)
      return matchesTopic && matchesQuery
    })
    .map((publication) => ({
      ...publication,
      safePdf: sanitizeExternalUrl(publication.pdf),
    }))
})
</script>

<template>
  <div class="page">
    <header class="library-hero">
      <div class="page-shell library-hero-inner">
        <div>
          <p class="eyebrow">Biblioteca virtual IAP</p>
          <h1>Conocimiento para transformar la gestión pública.</h1>
          <p>Publicaciones y recursos sobre administración pública, gestión municipal y derecho administrativo.</p>
        </div>
        <PhotoPlaceholder label="Espacio bibliográfico y sala de lectura" variant="library" />
      </div>
    </header>

    <section class="page-shell library-content">
      <div class="catalog-heading">
        <div>
          <p class="section-kicker">Catálogo</p>
          <h2>Explora las publicaciones</h2>
        </div>
        <span>{{ filteredPublications.length }} títulos</span>
      </div>

      <div class="catalog-tools">
        <label class="search-field">
          <span class="visually-hidden">Buscar por título o autor</span>
          <span class="material-icon search-icon" aria-hidden="true">search</span>
          <input v-model="searchQuery" type="search" maxlength="120" placeholder="Buscar por título o autor" />
        </label>
        <label class="topic-select">
          <span class="visually-hidden">Filtrar por eje temático</span>
          <select v-model="selectedTopic">
            <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
          </select>
        </label>
      </div>

      <div v-if="filteredPublications.length" class="publication-grid">
        <article v-for="publication in filteredPublications" :key="publication.title" class="publication-card">
          <img :src="publication.cover" :alt="`Portada de ${publication.title}`" loading="lazy" decoding="async" />
          <span>{{ publication.topic }} · {{ publication.year }}</span>
          <h3>{{ publication.title }}</h3>
          <p>{{ publication.author }}</p>
          <a v-if="publication.safePdf" :href="publication.safePdf" target="_blank" rel="noopener noreferrer">Consultar publicación <span class="material-icon" aria-hidden="true">arrow_outward</span></a>
        </article>
      </div>

      <div v-else class="catalog-empty" role="status">
        <span class="empty-mark"><span class="material-icon" aria-hidden="true">add</span></span>
        <h3>{{ searchQuery || selectedTopic !== 'Todos' ? 'No encontramos títulos con esos filtros.' : 'El catálogo está en preparación.' }}</h3>
        <p>
          El listado oficial de títulos, autores, años y archivos de consulta aún no se ha integrado.
          En cuanto esté disponible, podrás buscar y filtrar aquí las publicaciones del IAP.
        </p>
        <button v-if="searchQuery || selectedTopic !== 'Todos'" type="button" @click="searchQuery = ''; selectedTopic = 'Todos'">
          Limpiar búsqueda
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-shell {
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
}

.library-hero {
  padding: 5.2rem 0;
  color: #fff;
  background: var(--color-green);
}

.library-hero-inner {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 3rem;
}

.library-hero-inner :deep(.photo-placeholder) {
  min-height: 300px;
}

.eyebrow,
.section-kicker {
  margin: 0 0 0.75rem;
  color: #d4aa72;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
  font-weight: 400;
}

h1 {
  max-width: 850px;
  margin: 0;
  font-size: clamp(2.7rem, 5.6vw, 4.7rem);
  letter-spacing: -0.05em;
  line-height: 1.05;
}

.library-hero .page-shell > p:last-child {
  max-width: 620px;
  margin: 1rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
}

.library-content {
  padding: 4.5rem 0 6rem;
}

.catalog-heading {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
}

.section-kicker {
  color: var(--color-secondary-text);
}

h2 {
  margin: 0;
  color: var(--color-green-text);
  font-size: clamp(2rem, 4vw, 3rem);
}

.catalog-heading > span {
  color: var(--color-muted);
  font-size: 0.8rem;
}

.catalog-tools {
  display: flex;
  margin-bottom: 2rem;
  gap: 0.8rem;
}

.search-field,
.topic-select {
  display: flex;
  min-height: 48px;
  align-items: center;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.search-field {
  flex: 1;
  padding: 0 0.8rem;
  gap: 0.65rem;
}

.search-field .search-icon {
  font-size: 1.25rem;
  flex: 0 0 auto;
  color: var(--color-muted);
}

input,
select {
  min-width: 0;
  border: 0;
  color: var(--color-ink);
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
}

.search-field input {
  width: 100%;
  height: 44px;
}

.topic-select {
  width: min(280px, 42%);
  padding: 0 0.8rem;
}

.topic-select select {
  width: 100%;
  height: 44px;
}

.catalog-empty {
  display: flex;
  min-height: 310px;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--color-border);
  background: var(--color-surface-soft);
  text-align: center;
}

.empty-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--color-secondary);
  border-radius: 50%;
  color: var(--color-primary-text);
}

.empty-mark .material-icon {
  font-size: 1.5rem;
}

.catalog-empty h3 {
  margin: 1rem 0 0.45rem;
  color: var(--color-green-text);
  font-size: 1.6rem;
}

.catalog-empty p {
  max-width: 620px;
  margin: 0;
  color: var(--color-muted);
  font-size: 0.86rem;
  line-height: 1.7;
}

.catalog-empty button {
  margin-top: 1rem;
  padding: 0.65rem 0.9rem;
  border: 0;
  color: #fff;
  background: var(--color-primary);
  cursor: pointer;
}

@media (max-width: 600px) {
  .page-shell {
    width: calc(100% - 2rem);
  }

  .library-hero {
    padding: 3.7rem 0;
  }

  .library-hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .library-hero-inner :deep(.photo-placeholder) {
    min-height: 240px;
  }

  .library-content {
    padding: 3.5rem 0 4.5rem;
  }

  .catalog-tools {
    flex-direction: column;
  }

  .topic-select {
    width: 100%;
  }

  .catalog-empty {
    min-height: 270px;
    padding: 1.5rem;
  }
}
</style>
