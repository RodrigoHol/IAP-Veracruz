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
import {
  buildSubmissionPayload,
  isValidGoogleScriptUrl,
  submitToGoogleSheets,
} from '../utils/formSubmission'

const props = defineProps({
  programTitle: {
    type: String,
    required: true,
  },
  requestCurriculum: {
    type: Boolean,
    default: false,
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
const isSubmitting = ref(false)
const endpointUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.agency = ''
  form.education = ''
  form.contactMethod = ''
  form.website = ''
}

const clearFieldError = (field) => {
  if (errors.value[field]) {
    const nextErrors = { ...errors.value }
    delete nextErrors[field]
    errors.value = nextErrors
  }
}

const handleSubmit = async () => {
  if (isSubmitting.value) return

  const now = Date.now()
  if (now - lastSubmitAt.value < SUBMIT_COOLDOWN_MS) {
    noticeType.value = 'error'
    notice.value = 'Espera unos segundos antes de intentar nuevamente.'
    return
  }

  const result = validatePreEnrollmentForm({
    ...form,
    program: props.programTitle,
  })

  if (result.isBot) {
    lastSubmitAt.value = now
    errors.value = {}
    resetForm()
    noticeType.value = 'success'
    notice.value = props.requestCurriculum
      ? '¡Solicitud registrada! El equipo del IAP Veracruz te compartirá el plan de estudios e informes por el medio que elegiste.'
      : '¡Registro recibido! Te mantendremos al tanto de las próximas convocatorias y novedades del programa.'
    return
  }

  if (!result.valid) {
    errors.value = result.errors
    noticeType.value = 'error'
    notice.value = 'Revisa los campos marcados antes de continuar.'
    return
  }

  if (!isValidGoogleScriptUrl(endpointUrl)) {
    lastSubmitAt.value = now
    errors.value = {}
    noticeType.value = 'info'
    notice.value = `El registro en línea se habilitará en breve. Para solicitar informes o el plan de estudios ahora mismo, comunícate al ${siteInfo.phoneDisplay}.`
    return
  }

  isSubmitting.value = true
  errors.value = {}
  notice.value = ''

  try {
    const payload = buildSubmissionPayload(result.sanitized, {
      programTitle: props.programTitle,
      requestCurriculum: props.requestCurriculum,
    })
    const response = await submitToGoogleSheets(payload, { endpointUrl })

    lastSubmitAt.value = Date.now()

    if (response.ok) {
      resetForm()
      noticeType.value = 'success'
      notice.value = props.requestCurriculum
        ? '¡Solicitud registrada! El equipo del IAP Veracruz te compartirá el plan de estudios e informes por el medio que elegiste.'
        : '¡Registro recibido! Te mantendremos al tanto de las próximas convocatorias y novedades del programa.'
      return
    }

    noticeType.value = 'error'
    notice.value = `No pudimos completar el envío en este momento. Intenta de nuevo en unos segundos o llámanos al ${siteInfo.phoneDisplay}.`
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="novedades" class="pre-enrollment">
    <div class="form-intro">
      <p class="section-kicker">{{ requestCurriculum ? 'Informes y plan de estudios' : 'Noticias y convocatorias' }}</p>
      <h2>{{ requestCurriculum ? 'Solicita informes y el plan de estudios' : 'Mantente al tanto de las novedades' }}</h2>
      <p>
        {{
          requestCurriculum
            ? 'Comparte tus datos para solicitar la tira de materias, fechas de convocatoria e información detallada del programa.'
            : 'Comparte tus datos para recibir primero avisos sobre nuevas convocatorias, fechas y noticias del programa.'
        }}
      </p>
      <p class="privacy-note">
        Tus datos serán utilizados únicamente por el IAP Veracruz para brindarte informes académicos y dar seguimiento a tu solicitud.
      </p>
    </div>

    <form class="enrollment-form" :class="{ 'is-submitting': isSubmitting }" novalidate @submit.prevent="handleSubmit">
      <Transition name="submit-fade">
        <div v-if="isSubmitting" class="submit-overlay" role="status" aria-live="polite">
          <div class="submit-progress" aria-hidden="true">
            <span class="submit-progress-bar"></span>
          </div>
          <div class="submit-loader-card">
            <span class="submit-spinner" aria-hidden="true"></span>
            <div class="submit-loader-copy">
              <strong>Registrando tu solicitud…</strong>
              <span>Enviando tus datos de forma segura al IAP Veracruz.</span>
            </div>
          </div>
        </div>
      </Transition>

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
          :disabled="isSubmitting"
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
          :disabled="isSubmitting"
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
          :disabled="isSubmitting"
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
          :disabled="isSubmitting"
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
          :disabled="isSubmitting"
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
        :disabled="isSubmitting"
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

      <button type="submit" :disabled="isSubmitting" :aria-busy="isSubmitting">
        <span>
          {{
            isSubmitting
              ? 'Enviando solicitud…'
              : requestCurriculum
                ? 'Solicitar plan de estudios'
                : 'Quiero recibir novedades'
          }}
        </span>
        <span v-if="isSubmitting" class="button-spinner" aria-hidden="true"></span>
        <span v-else class="material-icon" aria-hidden="true">arrow_outward</span>
      </button>

      <Transition name="notice-fade">
        <div
          v-if="notice"
          class="form-notice"
          :class="{ 'is-error': noticeType === 'error', 'is-success': noticeType === 'success' }"
          role="status"
        >
          <span class="material-icon notice-icon" aria-hidden="true">
            {{ noticeType === 'success' ? 'check_circle' : noticeType === 'error' ? 'error' : 'info' }}
          </span>
          <p>{{ notice }}</p>
        </div>
      </Transition>
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
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.submit-overlay {
  position: absolute;
  inset: -0.5rem;
  z-index: 5;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(252, 251, 248, 0.82);
  background: color-mix(in srgb, var(--color-section) 82%, transparent);
  backdrop-filter: blur(2.5px);
}

.submit-progress {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  overflow: hidden;
  background: var(--color-border);
}

.submit-progress-bar {
  display: block;
  width: 45%;
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-primary));
  animation: progressSlide 1.25s ease-in-out infinite;
}

.submit-loader-card {
  display: flex;
  width: 100%;
  max-width: 380px;
  padding: 1.35rem 1.5rem;
  align-items: center;
  gap: 1.1rem;
  border: 1px solid var(--color-border);
  border-top: 3px solid var(--color-primary);
  background: var(--color-surface);
  box-shadow: 0 16px 36px rgba(24, 51, 47, 0.14);
}

.submit-spinner {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  flex: 0 0 auto;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-right-color: var(--color-secondary);
  border-radius: 50%;
  animation: spinLoader 0.85s linear infinite;
}

.submit-loader-copy strong {
  display: block;
  color: var(--color-green-text);
  font-family: var(--font-heading);
  font-size: 1.08rem;
  font-weight: 400;
}

.submit-loader-copy span {
  display: block;
  margin-top: 0.2rem;
  color: var(--color-muted);
  font-size: 0.78rem;
  line-height: 1.45;
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

button:hover:not(:disabled) {
  background: #61112b;
}

button:disabled {
  opacity: 0.78;
  cursor: wait;
}

.button-spinner {
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spinLoader 0.75s linear infinite;
}

.form-notice {
  grid-column: 1 / -1;
  display: flex;
  margin: 0;
  padding: 0.9rem 1rem;
  align-items: flex-start;
  gap: 0.65rem;
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-secondary);
  background: var(--color-surface);
  color: var(--color-green-text);
}

.form-notice p {
  margin: 0;
  font-size: 0.8rem !important;
  line-height: 1.55 !important;
}

.notice-icon {
  flex: 0 0 auto;
  margin-top: 0.05rem;
  color: var(--color-secondary-text);
  font-size: 1.15rem;
}

.form-notice.is-success {
  border-left-color: var(--color-green-text);
  font-weight: 600;
}

.form-notice.is-success .notice-icon {
  color: var(--color-green-text);
}

.form-notice.is-error {
  border-left-color: var(--color-primary);
  color: var(--color-primary-text);
  font-weight: 600;
}

.form-notice.is-error .notice-icon {
  color: var(--color-primary-text);
}

.submit-fade-enter-active,
.submit-fade-leave-active,
.notice-fade-enter-active,
.notice-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.submit-fade-enter-from,
.submit-fade-leave-to,
.notice-fade-enter-from,
.notice-fade-leave-to {
  opacity: 0;
}

.notice-fade-enter-from {
  transform: translateY(4px);
}

@keyframes spinLoader {
  to {
    transform: rotate(360deg);
  }
}

@keyframes progressSlide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(320%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .submit-progress-bar,
  .submit-spinner,
  .button-spinner {
    animation-duration: 2.5s;
  }

  .submit-fade-enter-active,
  .submit-fade-leave-active,
  .notice-fade-enter-active,
  .notice-fade-leave-active {
    transition: opacity 1ms linear;
  }
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
