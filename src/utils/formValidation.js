import {
  containsUnsafeMarkup,
  isValidEmail,
  isValidPhone,
  sanitizeText,
} from './security.js'

export const FIELD_LIMITS = {
  name: 120,
  email: 150,
  phone: 20,
  agency: 150,
}

export const EDUCATION_OPTIONS = [
  'Licenciatura',
  'Especialidad',
  'Maestría',
  'Doctorado',
  'Otro',
]

export const CONTACT_OPTIONS = [
  { value: 'whatsapp', label: 'WhatsApp', icon: 'chat' },
  { value: 'correo', label: 'Correo electrónico', icon: 'mail' },
  { value: 'llamada', label: 'Llamada telefónica', icon: 'call' },
]

export const SUBMIT_COOLDOWN_MS = 5000

const ALLOWED_EDUCATION = new Set(EDUCATION_OPTIONS)
const ALLOWED_CONTACT_METHODS = new Set(CONTACT_OPTIONS.map((option) => option.value))

/** Sanitize and validate all pre-enrollment form fields against strict allowlists. */
export const validatePreEnrollmentForm = (rawInput = {}) => {
  const honeypot = sanitizeText(rawInput.website ?? '', 64)
  if (honeypot.length > 0) {
    return { valid: false, isBot: true, errors: {}, sanitized: null }
  }

  const sanitized = {
    name: sanitizeText(rawInput.name ?? '', FIELD_LIMITS.name),
    email: sanitizeText(rawInput.email ?? '', FIELD_LIMITS.email),
    phone: sanitizeText(rawInput.phone ?? '', FIELD_LIMITS.phone),
    agency: sanitizeText(rawInput.agency ?? '', FIELD_LIMITS.agency),
    education: sanitizeText(rawInput.education ?? '', 40),
    contactMethod: sanitizeText(rawInput.contactMethod ?? '', 30),
  }

  const errors = {}

  if (!sanitized.name || sanitized.name.length < 2) {
    errors.name = 'Ingresa tu nombre completo.'
  } else if (containsUnsafeMarkup(sanitized.name)) {
    errors.name = 'El nombre contiene caracteres no permitidos.'
  }

  if (!sanitized.email || containsUnsafeMarkup(sanitized.email) || !isValidEmail(sanitized.email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }

  if (!sanitized.phone || !isValidPhone(sanitized.phone)) {
    errors.phone = 'Ingresa un número telefónico válido de al menos 10 dígitos.'
  }

  if (!sanitized.agency || sanitized.agency.length < 2) {
    errors.agency = 'Indica tu dependencia o institución de procedencia.'
  } else if (containsUnsafeMarkup(sanitized.agency)) {
    errors.agency = 'El campo de dependencia contiene caracteres no permitidos.'
  }

  if (!ALLOWED_EDUCATION.has(sanitized.education)) {
    errors.education = 'Selecciona una opción válida de grado de estudios.'
  }

  if (!ALLOWED_CONTACT_METHODS.has(sanitized.contactMethod)) {
    errors.contactMethod = 'Selecciona el medio de contacto de tu preferencia.'
  }

  const valid = Object.keys(errors).length === 0
  return {
    valid,
    isBot: false,
    errors,
    sanitized: valid ? sanitized : null,
  }
}
