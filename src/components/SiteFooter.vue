<template>
  <footer class="site-footer">
    <div class="footer-main">
      <RouterLink class="footer-brand" to="/" aria-label="IAP Veracruz, volver al inicio">
        <img src="/images/iap-logo.png" alt="" />
        <span>Instituto de<br />Administración Pública<br />de Veracruz</span>
      </RouterLink>

      <nav class="footer-nav" aria-label="Navegación del pie de página">
        <RouterLink :to="{ name: 'home', hash: '#instituto' }">Conócenos</RouterLink>
        <RouterLink to="/profesionalizacion">Profesionalización</RouterLink>
        <RouterLink to="/biblioteca">Biblioteca</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </nav>

      <div class="footer-contact">
        <span>Atención exclusiva por llamadas telefónicas</span>
        <a href="tel:2282370893">228 237 0893</a>
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
  gap: 0.45rem;
  text-align: right;
}

.footer-contact span {
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.66rem;
}

.footer-contact a {
  color: #fff;
  font-size: 1.35rem;
  text-decoration: none;
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
    max-width: 145px;
  }

  .footer-contact span {
    font-size: 0.58rem;
  }

  .footer-contact a {
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
