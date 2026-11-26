<script setup>
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <RouterLink class="footer-brand" to="/" aria-label="IAP Veracruz, volver al inicio">
        <img :src="`${baseUrl}images/iap-logo.png`" alt="" />
        <span>Instituto de<br />Administración Pública<br />de Veracruz</span>
      </RouterLink>

      <nav class="footer-nav" aria-label="Navegación del pie de página">
        <RouterLink to="/conocenos">Conócenos</RouterLink>
        <RouterLink to="/profesionalizacion">Profesionalización</RouterLink>
        <RouterLink to="/biblioteca">Biblioteca</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </nav>

      <div class="footer-contact">
        <p class="footer-contact-note">Atención exclusiva por llamadas telefónicas</p>
        <a class="footer-phone" href="tel:2282370893" aria-label="Llamar al 228 237 0893">
          <span class="material-icon phone-icon" aria-hidden="true">call</span>
          <span>228 237 0893</span>
        </a>
        <div class="footer-socials">
          <span class="footer-socials-label">Redes oficiales</span>
          <a
            class="social-link"
            href="https://www.instagram.com/iap.veracruz?jplx=ZHdheXRvaDd2aW9v"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram oficial del IAP Veracruz"
          >
            <svg class="social-icon instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle class="instagram-dot" cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>
          <a
            class="social-link"
            href="https://www.facebook.com/IAP.Veracruz.Oficial/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook oficial del IAP Veracruz"
          >
            <svg class="social-icon facebook-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} Instituto de Administración Pública de Veracruz</span>
      <details class="privacy-disclosure">
        <summary>Aviso de privacidad</summary>
        <p>El aviso oficial se publicará al confirmar su versión institucional.</p>
      </details>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  color: #fff;
  background: #122a27;
}

.footer-main,
.footer-bottom {
  display: flex;
  width: min(var(--content-width), calc(100% - 3rem));
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
}

.footer-main {
  min-height: 178px;
  gap: 2rem;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  color: #e8e1d5;
  font-size: 0.8rem;
  line-height: 1.35;
  text-decoration: none;
}

.footer-brand img {
  width: 67px;
  height: 67px;
  object-fit: contain;
}

:root[data-theme="dark"] .footer-brand img {
  filter: brightness(0) invert(1);
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.9rem, 2vw, 1.8rem);
}

.footer-nav a,
.footer-bottom a {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.74rem;
  text-decoration: none;
  transition: color 160ms ease;
}

.footer-nav a:hover,
.footer-bottom a:hover {
  color: #e2bf8f;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.45rem;
  text-align: right;
}

.footer-contact-note {
  max-width: 280px;
  margin: 0;
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.82rem;
  line-height: 1.4;
}

.footer-phone {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #fff;
  font-size: 1.35rem;
  text-decoration: none;
}

.phone-icon {
  color: #e2bf8f;
  font-size: 1.2em;
}

.footer-socials {
  display: flex;
  margin-top: 0.25rem;
  align-items: center;
  gap: 0.55rem;
}

.footer-socials-label {
  margin-right: 0.15rem;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.74rem;
}

.social-link {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.88);
  transition:
    border-color 180ms ease,
    color 180ms ease,
    background-color 180ms ease,
    transform 180ms ease;
}

.social-link:hover {
  transform: translateY(-2px);
  border-color: #e2bf8f;
  color: #e2bf8f;
  background: rgba(255, 255, 255, 0.06);
}

.social-icon {
  width: 1rem;
  height: 1rem;
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

.facebook-icon {
  fill: currentColor;
}

.footer-bottom {
  min-height: 55px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.52);
  font-size: 0.67rem;
}

.footer-bottom a {
  font-size: inherit;
}

.privacy-disclosure {
  position: relative;
}

.privacy-disclosure summary {
  color: rgba(255, 255, 255, 0.72);
  cursor: pointer;
  font-size: inherit;
}

.privacy-disclosure summary:hover {
  color: #e2bf8f;
}

.privacy-disclosure:not([open]) p {
  display: none;
}

.privacy-disclosure[open] p {
  display: block;
  position: absolute;
  right: 0;
  bottom: calc(100% + 0.8rem);
  width: min(280px, 80vw);
  margin: 0;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  background: #18332f;
  font-size: 0.74rem;
  line-height: 1.5;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

@media (max-width: 820px) {
  .footer-main {
    padding: 2rem 0;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .footer-nav {
    order: 1;
    width: 100%;
  }
}

@media (max-width: 560px) {
  .footer-main,
  .footer-bottom {
    width: calc(100% - 2rem);
  }

  .footer-main {
    gap: 1.5rem;
  }

  .footer-brand img {
    width: 54px;
    height: 54px;
  }

  .footer-brand {
    font-size: 0.68rem;
  }

  .footer-contact {
    width: 100%;
    align-items: flex-start;
    text-align: left;
  }

  .footer-contact-note {
    max-width: 100%;
    font-size: 0.74rem;
  }

  .footer-phone {
    font-size: 1.1rem;
  }

  .footer-nav {
    gap: 0.7rem 1rem;
  }

  .privacy-disclosure {
    width: 100%;
  }

  .privacy-disclosure[open] p {
    right: auto;
    left: 0;
  }

  .footer-bottom {
    min-height: 65px;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    gap: 0.35rem;
  }
}
</style>
