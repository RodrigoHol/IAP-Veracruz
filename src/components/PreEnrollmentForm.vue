<script setup>
import { reactive, ref } from 'vue'
import { siteInfo } from '../data/site'
import {
  CONTACT_OPTIONS,
  EDUCATION_OPTIONS,
  FIELD_LIMITS,
  SUBMIT_COOLDOWN_MS,
  validatePreEnrollmentForm,
} from '../utils/formValidation'

defineProps({
  programTitle: {
    type: String,
    required: true,
  },
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  agency: '',
  education: '',
  contactMethod: '',
  website: '',
})

const errors = ref({})
const notice = ref('')
const noticeType = ref('info')
const lastSubmitAt = ref(0)

const demoMessage = `Esta vista previa no envía tus datos ni activa una suscripción. Para recibir información oficial, llama al ${siteInfo.phoneDisplay}.`

const clearFieldError = (field) => {
  if (errors.value[field]) {
    const nextErrors = { ...errors.value }
    delete nextErrors[field]
    errors.value = nextErrors
  }
}

const handleSubmit = () => {
  const now = Date.now()
  if (now - lastSubmitAt.value < SUBMIT_COOLDOWN_MS) {
    noticeType.value = 'error'
    notice.value = 'Espera unos segundos antes de intentar nuevamente.'
    return
  }

  const result = validatePreEnrollmentForm(form)

  if (result.isBot) {
    lastSubmitAt.value = now
    errors.value = {}
    noticeType.value = 'info'
    notice.value = demoMessage
    return
  }

  if (!result.valid) {
    errors.value = result.errors
    noticeType.value = 'error'
    notice.value = 'Revisa los campos marcados antes de continuar.'
    return
  }

  lastSubmitAt.value = now
  errors.value = {}
  noticeType.value = 'info'
  notice.value = demoMessage
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

    <form class="enrollment-form" novalidate @submit.prevent="handleSubmit">
      <div class="hp-field" aria-hidden="true">
        <label>
          Sitio web
          <input v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off" />
        </label>
      </div>

      <label>
        Nombre completo
        <input
          v-model="form.name"
          name="name"
          autocomplete="name"
          :maxlength="FIELD_LIMITS.name"
          :aria-invalid="Boolean(errors.name)"
          :aria-describedby="errors.name ? 'error-name' : undefined"
          required
          @input="clearFieldError('name')"
        />
        <span v-if="errors.name" id="error-name" class="field-error" role="alert">{{ errors.name }}</span>
      </label>

      <label>
        Correo electrónico
        <input
          v-model="form.email"
          name="email"
          type="email"
          autocomplete="email"
          :maxlength="FIELD_LIMITS.email"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'error-email' : undefined"
          required
          @input="clearFieldError('email')"
        />
        <span v-if="errors.email" id="error-email" class="field-error" role="alert">{{ errors.email }}</span>
      </label>

      <label>
        Teléfono
        <input
          v-model="form.phone"
          name="phone"
          type="tel"
          autocomplete="tel"
          :maxlength="FIELD_LIMITS.phone"
          :aria-invalid="Boolean(errors.phone)"
          :aria-describedby="errors.phone ? 'error-phone' : undefined"
          required
          @input="clearFieldError('phone')"
        />
        <span v-if="errors.phone" id="error-phone" class="field-error" role="alert">{{ errors.phone }}</span>
      </label>

      <label>
        Dependencia de procedencia
        <input
          v-model="form.agency"
          name="agency"
          autocomplete="organization"
          :maxlength="FIELD_LIMITS.agency"
          :aria-invalid="Boolean(errors.agency)"
          :aria-describedby="errors.agency ? 'error-agency' : undefined"
          required
          @input="clearFieldError('agency')"
        />
        <span v-if="errors.agency" id="error-agency" class="field-error" role="alert">{{ errors.agency }}</span>
      </label>

      <label>
        Grado de estudios
        <select
          v-model="form.education"
          name="education"
          :aria-invalid="Boolean(errors.education)"
          :aria-describedby="errors.education ? 'error-education' : undefined"
          required
          @change="clearFieldError('education')"
        >
          <option value="" disabled>Selecciona una opción</option>
          <option v-for="option in EDUCATION_OPTIONS" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <span v-if="errors.education" id="error-education" class="field-error" role="alert">{{ errors.education }}</span>
      </label>

      <label>
        Programa de interés
        <input name="program" :value="programTitle" readonly />
      </label>

      <fieldset
        class="contact-preference"
        :aria-invalid="Boolean(errors.contactMethod)"
        :aria-describedby="errors.contactMethod ? 'error-contact-method' : undefined"
      >
        <legend>¿Por dónde prefieres que te contactemos?</legend>
        <div class="contact-options">
          <label
            v-for="option in CONTACT_OPTIONS"
            :key="option.value"
            class="contact-option"
            :class="{ 'is-selected': form.contactMethod === option.value }"
          >
            <input
              v-model="form.contactMethod"
              type="radio"
              name="contactMethod"
              :value="option.value"
              required
              @change="clearFieldError('contactMethod')"
            />
            <span class="material-icon" aria-hidden="true">{{ option.icon }}</span>
            <span>{{ option.label }}</span>
          </label>
        </div>
        <span v-if="errors.contactMethod" id="error-contact-method" class="field-error" role="alert">
          {{ errors.contactMethod }}
        </span>
      </fieldset>

      <button type="submit">Quiero recibir novedades <span class="material-icon" aria-hidden="true">arrow_outward</span></button>
      <p v-if="notice" class="form-notice" :class="{ 'is-error': noticeType === 'error' }" role="status">
        {{ notice }}
      </p>
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

.hp-field {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
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

input[aria-invalid="true"],
select[aria-invalid="true"] {
  border-color: var(--color-primary);
}

input[readonly] {
  color: var(--color-muted);
  background: var(--color-surface-muted);
}

.field-error {
  color: var(--color-primary-text);
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.4;
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

.contact-preference .field-error {
  display: block;
  margin-top: 0.45rem;
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

.form-notice.is-error {
  color: var(--color-primary-text);
  font-weight: 600;
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
