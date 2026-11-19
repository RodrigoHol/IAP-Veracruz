<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { programs } from '../data/programs'

const menuOpen = ref(false)
const programMenuOpen = ref(false)
const isDarkMode = ref(document.documentElement.dataset.theme === 'dark')

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  const theme = isDarkMode.value ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
  localStorage.setItem('iap-theme', theme)
}

const closeMenu = () => {
  menuOpen.value = false
  programMenuOpen.value = false
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (!menuOpen.value) programMenuOpen.value = false
}

const handlePointerEnter = (event) => {
  if (event.pointerType === 'mouse') programMenuOpen.value = true
}

const handlePointerLeave = (event) => {
  if (event.pointerType === 'mouse') programMenuOpen.value = false
}

const handleProgramFocusOut = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    programMenuOpen.value = false
  }
}
</script>

<template>

  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand" to="/" aria-label="IAP Veracruz, inicio" @click="closeMenu">
        <img src="/images/iap-logo-horizontal.png" alt="IAP Veracruz — Instituto de Administración Pública" />
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="toggleMenu"
      >
        <span class="material-icon" aria-hidden="true">{{ menuOpen ? 'close' : 'menu' }}</span>
      </button>

      <nav id="primary-navigation" class="navigation" :class="{ 'is-open': menuOpen }" aria-label="Navegación principal">
        <RouterLink to="/" @click="closeMenu">Inicio</RouterLink>
        <RouterLink :to="{ name: 'home', hash: '#instituto' }" @click="closeMenu">Conócenos</RouterLink>
        <div
          class="nav-dropdown"
          :class="{ 'is-expanded': programMenuOpen }"
          @pointerenter="handlePointerEnter"
          @pointerleave="handlePointerLeave"
          @focusin="programMenuOpen = true"
          @focusout="handleProgramFocusOut"
          @keydown.esc.stop.prevent="closeMenu"
        >
          <RouterLink class="nav-program-link" to="/profesionalizacion" @click="closeMenu">
            Profesionalización
          </RouterLink>
          <button
            class="dropdown-toggle"
            type="button"
            :aria-expanded="programMenuOpen"
            aria-controls="professionalization-menu"
            :aria-label="programMenuOpen ? 'Ocultar rutas de profesionalización' : 'Mostrar rutas de profesionalización'"
            @click="programMenuOpen = !programMenuOpen"
          >
            <span class="material-icon" aria-hidden="true">expand_more</span>
          </button>
          <div id="professionalization-menu" class="dropdown-panel">
            <div class="dropdown-panel-inner">
              <span class="dropdown-heading">Rutas de profesionalización</span>
              <RouterLink
                v-for="program in programs"
                :key="program.slug"
                class="submenu-link"
                :to="{ name: 'program-detail', params: { slug: program.slug } }"
                :aria-label="`Ver programa: ${program.title}`"
                @click="closeMenu"
              >
                <span>{{ program.category }}</span>
                <small>{{ program.title }}</small>
              </RouterLink>
            </div>
          </div>
        </div>
        <RouterLink to="/biblioteca" @click="closeMenu">Biblioteca</RouterLink>
        <RouterLink to="/contacto" @click="closeMenu">Contacto</RouterLink>
        <RouterLink class="nav-cta" :to="{ name: 'home', hash: '#convocatoria' }" @click="closeMenu">
          Convocatoria
          <span class="material-icon" aria-hidden="true">arrow_outward</span>
        </RouterLink>
        <button
          class="theme-toggle"
          type="button"
          role="switch"
          :aria-checked="isDarkMode"
          aria-label="Modo oscuro"
          :title="isDarkMode ? 'Desactivar modo oscuro' : 'Activar modo oscuro'"
          @click="toggleTheme"
        >
          <span class="theme-toggle-track" aria-hidden="true">
            <span class="theme-toggle-thumb">
              <span class="material-icon">{{ isDarkMode ? 'dark_mode' : 'light_mode' }}</span>
            </span>
          </span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.utility-bar {
  color: #f7f3ed;
  background: var(--color-green);
  font-size: 0.72rem;
  letter-spacing: 0.045em;
}

.utility-inner,
.header-inner {
  display: flex;
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
}

.utility-inner {
  min-height: 34px;
}

.utility-motto {
  color: #d9c8b2;
}

.site-header {
  position: sticky;
  z-index: 20;
  top: 0;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-header-background);
  backdrop-filter: blur(14px);
}

.header-inner {
  min-height: 86px;
}

.brand {
  display: inline-flex;
  width: 252px;
  flex: 0 0 auto;
  align-items: center;
}

.brand img {
  display: block;
  width: 100%;
  height: auto;
}

:root[data-theme="dark"] .brand img {
  filter: brightness(0) invert(1);
}

.navigation {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 2rem);
}

.navigation a {
  color: var(--color-ink);
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 180ms ease;
}

.navigation a:hover {
  color: var(--color-primary-text);
}

.navigation a.router-link-active:not(.nav-cta) {
  color: var(--color-primary-text);
}

.nav-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-program-link {
  padding: 0.5rem 0;
}

.dropdown-toggle {
  display: grid;
  width: 26px;
  height: 32px;
  padding: 0;
  place-items: center;
  border: 0;
  color: var(--color-ink);
  background: transparent;
  cursor: pointer;
}

.dropdown-toggle .material-icon {
  font-size: 1.2rem;
  transition: transform 180ms ease;
}

.nav-dropdown.is-expanded .dropdown-toggle .material-icon {
  transform: rotate(180deg);
}

.dropdown-panel {
  position: absolute;
  z-index: 3;
  top: 100%;
  left: -1rem;
  display: none;
  width: 292px;
  padding-top: 0.8rem;
}

.nav-dropdown.is-expanded .dropdown-panel {
  display: block;
  animation: dropdown-in 160ms ease both;
}

.dropdown-panel-inner {
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 16px 34px rgba(24, 51, 47, 0.16);
}

.dropdown-heading {
  display: block;
  padding: 0.55rem 0.65rem 0.75rem;
  color: var(--color-muted);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.navigation .submenu-link {
  display: flex;
  padding: 0.7rem 0.65rem;
  flex-direction: column;
  gap: 0.2rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-green-text);
  text-decoration: none;
  transition: background 160ms ease, color 160ms ease;
}

.navigation .submenu-link:hover,
.navigation .submenu-link.router-link-active {
  color: var(--color-primary-text);
  background: var(--color-surface-muted);
}

.submenu-link > span {
  font-size: 0.78rem;
  font-weight: 700;
}

.submenu-link small {
  color: var(--color-muted);
  font-size: 0.68rem;
  font-weight: 400;
}

.navigation .nav-cta {
  display: inline-flex;
  min-height: 46px;
  padding: 0 1.1rem;
  align-items: center;
  gap: 0.7rem;
  border-radius: 3px;
  color: #fff;
  background: var(--color-primary);
}

.navigation .nav-cta:hover {
  color: #fff;
  background: #61112b;
}

.theme-toggle {
  display: grid;
  width: 58px;
  height: 36px;
  padding: 0;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.theme-toggle-track {
  position: relative;
  width: 58px;
  height: 32px;
  border-radius: 999px;
  background: var(--color-toggle-track);
  transition: background-color 180ms ease;
}

.theme-toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 50%;
  color: var(--color-toggle-icon);
  background: var(--color-toggle-thumb);
  transition: transform 180ms ease;
}

.theme-toggle[aria-checked="true"] .theme-toggle-thumb {
  transform: translateX(26px);
}

.theme-toggle .material-icon {
  font-size: 1rem;
}

.theme-toggle:hover .theme-toggle-track {
  filter: brightness(0.94);
}

.menu-toggle {
  display: none;
}

@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1100px) {
  .brand {
    width: 220px;
  }

  .menu-toggle {
    display: grid;
    width: 46px;
    height: 46px;
    padding: 0;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: 3px;
    background: transparent;
    cursor: pointer;
  }

  .menu-toggle .material-icon {
    font-size: 1.75rem;
  }

  .navigation {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    display: none;
    padding: 1rem 1.5rem 1.5rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-background);
    box-shadow: 0 18px 24px rgba(24, 51, 47, 0.09);
  }

  .navigation.is-open {
    display: flex;
  }

  .navigation a {
    padding: 0.9rem 0.25rem;
  }

  .navigation .nav-cta {
    margin-top: 0.65rem;
    justify-content: center;
  }

  .navigation .theme-toggle {
    align-self: flex-start;
    margin: 0.75rem 0 0.25rem;
  }

  .nav-dropdown {
    display: grid;
    width: 100%;
    grid-template-columns: minmax(0, 1fr) 42px;
    column-gap: 0;
  }

  .nav-program-link {
    display: flex;
    min-height: 48px;
    align-items: center;
  }

  .dropdown-toggle {
    width: 42px;
    height: 48px;
  }

  .dropdown-panel {
    position: static;
    display: none;
    width: auto;
    padding: 0 0 0.5rem;
    grid-column: 1 / -1;
  }

  .nav-dropdown.is-expanded .dropdown-panel {
    display: block;
  }

  .dropdown-panel-inner {
    padding: 0.4rem 0.75rem;
    border: 0;
    border-left: 2px solid var(--color-secondary);
    background: transparent;
    box-shadow: none;
  }

  .dropdown-heading {
    padding: 0.6rem 0.5rem;
  }

  .navigation .submenu-link {
    padding: 0.7rem 0.5rem;
  }
}

@media (max-width: 560px) {
  .utility-inner,
  .header-inner {
    width: calc(100% - 2rem);
  }

  .utility-inner {
    min-height: 31px;
    font-size: 0.62rem;
  }

  .utility-motto {
    display: none;
  }

  .header-inner {
    min-height: 72px;
  }

  .brand {
    width: 190px;
  }
}
</style>
