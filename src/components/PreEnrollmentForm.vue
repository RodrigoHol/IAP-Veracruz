<script setup>
import { ref } from 'vue'

defineProps({
  programTitle: {
    type: String,
    required: true,
  },
})

const notice = ref('')
const contactMethod = ref('')

const contactOptions = [
  { value: 'whatsapp', label: 'WhatsApp', icon: 'chat' },
  { value: 'correo', label: 'Correo electrónico', icon: 'mail' },
  { value: 'llamada', label: 'Llamada telefónica', icon: 'call' },
]

const handleSubmit = () => {
  notice.value = 'Esta vista previa no envía tus datos ni activa una suscripción. Para recibir información oficial, llama al 228 237 0893.'
}
</script>

<template>
  <section id="novedades" class="pre-enrollment">
    <div class="form-intro">
      <p class="section-kicker">Noticias y convocatorias</p>
      <h2>Mantente al tanto de las novedades</h2>
      <p>Comparte tus datos para recibir primero avisos sobre nuevas convocatorias, fechas y noticias del programa.</p>
      <p class="privacy-note">Esta versión de demostración no envía ni almacena datos. No ingreses información personal.</p>
    </div>

    <form class="enrollment-form" @submit.prevent="handleSubmit">
      <label>
        Nombre completo
        <input name="name" autocomplete="name" required />
      </label>
      <label>
        Correo electrónico
        <input name="email" type="email" autocomplete="email" required />
      </label>
      <label>
        Teléfono
        <input name="phone" type="tel" autocomplete="tel" required />
      </label>
      <label>
        Dependencia de procedencia
        <input name="agency" autocomplete="organization" required />
      </label>
      <label>
        Grado de estudios
        <select name="education" required>
          <option value="" disabled selected>Selecciona una opción</option>
          <option>Licenciatura</option>
          <option>Especialidad</option>
          <option>Maestría</option>
          <option>Doctorado</option>
          <option>Otro</option>
        </select>
      </label>
      <label>
        Programa de interés
        <input name="program" :value="programTitle" readonly />
      </label>
      <fieldset class="contact-preference">
        <legend>¿Por dónde prefieres que te contactemos?</legend>
        <div class="contact-options">
          <label
            v-for="option in contactOptions"
            :key="option.value"
            class="contact-option"
            :class="{ 'is-selected': contactMethod === option.value }"
          >
            <input
              v-model="contactMethod"
              type="radio"
              name="contactMethod"
              :value="option.value"
              required
            />
            <span class="material-icon" aria-hidden="true">{{ option.icon }}</span>
            <span>{{ option.label }}</span>
          </label>
        </div>
      </fieldset>
      <button type="submit">Quiero recibir novedades <span class="material-icon" aria-hidden="true">arrow_outward</span></button>
      <p v-if="notice" class="form-notice" role="status">{{ notice }}</p>
    </form>
  </section>
</template>

<style scoped>
.pre-enrollment {
  display: grid;
  margin-top: 5rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  grid-template-columns: 0.8fr 1.2fr;
  gap: 3rem;
  background: var(--color-section);
}

.section-kicker {
  margin: 0 0 0.75rem;
  color: var(--color-secondary-text);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 400;
  letter-spacing: -0.04em;
}

.form-intro > p:not(.section-kicker) {
  color: var(--color-muted);
  font-size: 0.86rem;
  line-height: 1.65;
}

.privacy-note {
  padding-left: 0.8rem;
  border-left: 2px solid var(--color-secondary);
  font-size: 0.75rem !important;
}

.enrollment-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--color-green-text);
  font-size: 0.75rem;
  font-weight: 700;
}

input,
select {
  width: 100%;
  min-height: 46px;
  padding: 0 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  color: var(--color-ink);
  background: var(--color-surface);
  font: inherit;
  font-weight: 400;
}

input[readonly] {
  color: var(--color-muted);
  background: var(--color-surface-muted);
}

.contact-preference {
  grid-column: 1 / -1;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.contact-preference legend {
  margin-bottom: 0.5rem;
  padding: 0;
  color: var(--color-green-text);
  font-size: 0.75rem;
  font-weight: 700;
}

.contact-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.contact-option {
  position: relative;
  display: flex;
  min-height: 46px;
  padding: 0.55rem 0.8rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  color: var(--color-ink);
  background: var(--color-surface);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;
}

.contact-option input {
  position: absolute;
  width: 1px;
  height: 1px;
  min-height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  pointer-events: none;
}

.contact-option:hover {
  border-color: var(--color-secondary-text);
}

.contact-option:focus-within {
  outline: 3px solid var(--color-secondary);
  outline-offset: 2px;
}

.contact-option.is-selected {
  border-color: var(--color-primary);
  color: var(--color-primary-text);
  background: var(--color-surface-soft);
  font-weight: 700;
}

button {
  display: inline-flex;
  min-height: 48px;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
  border: 0;
  color: #fff;
  background: var(--color-primary);
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
}

button:hover {
  background: #61112b;
}

.form-notice {
  margin: 0;
  align-self: center;
  color: var(--color-green-text);
  font-size: 0.75rem;
  line-height: 1.5;
}

@media (max-width: 760px) {
  .pre-enrollment {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

@media (max-width: 540px) {
  .enrollment-form {
    grid-template-columns: 1fr;
  }

  .contact-options {
    grid-template-columns: 1fr;
  }

  .contact-option {
    justify-content: flex-start;
  }
}
</style>
