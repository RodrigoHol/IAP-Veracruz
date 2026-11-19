<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found">
    <p class="section-kicker">404 · Página no encontrada</p>
    <h1>Este camino no está disponible.</h1>
    <RouterLink to="/">Volver al inicio</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  display: flex;
  min-height: 55vh;
  padding: 3rem 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.section-kicker {
  color: var(--color-secondary-text);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

h1 {
  max-width: 650px;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 400;
}

a {
  padding: 0.85rem 1rem;
  color: #fff;
  background: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}
</style>
