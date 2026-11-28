<script setup>
defineProps({
  network: {
    type: String,
    required: true,
    validator: (value) => ['instagram', 'facebook', 'tiktok'].includes(value),
  },
})
</script>

<template>
  <svg v-if="network === 'instagram'" class="social-icon instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle class="instagram-dot" cx="17.5" cy="6.5" r="1" />
  </svg>
  <svg v-else-if="network === 'facebook'" class="social-icon facebook-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
  <svg v-else-if="network === 'tiktok'" class="social-icon tiktok-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
</template>

<style scoped>
.social-icon {
  display: block;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
}

.instagram-icon {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}

.instagram-dot {
  fill: currentColor;
  stroke: none;
}

.facebook-icon,
.tiktok-icon {
  fill: currentColor;
}
</style>
