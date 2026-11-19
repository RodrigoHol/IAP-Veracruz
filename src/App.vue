<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main-content">Saltar al contenido</a>
  <SiteHeader />
  <main id="main-content">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<style>
.skip-link {
  position: fixed;
  z-index: 50;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.7rem 0.9rem;
  color: #fff;
  background: var(--color-green);
  transform: translateY(-160%);
}

.skip-link:focus {
  transform: translateY(0);
}
</style>
