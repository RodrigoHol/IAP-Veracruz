import assert from 'node:assert/strict'
import test from 'node:test'
import {
  containsUnsafeMarkup,
  isValidEmail,
  isValidPhone,
  sanitizeExternalUrl,
  sanitizeText,
  stripControlChars,
} from '../src/utils/security.js'
import {
  FIELD_LIMITS,
  validatePreEnrollmentForm,
} from '../src/utils/formValidation.js'

const validPayload = {
  name: 'María José Hernández López',
  email: 'maria.hernandez@veracruz.gob.mx',
  phone: '228 237 0893',
  agency: 'Secretaría de Finanzas y Planeación',
  education: 'Maestría',
  contactMethod: 'whatsapp',
  website: '',
}

test('stripControlChars y sanitizeText eliminan caracteres de control, bidi y normalizan espacios', () => {
  assert.equal(stripControlChars('Hola\u0000\u202EMundo\u200B'), 'HolaMundo')
  assert.equal(sanitizeText('   Juan   Pérez \n\t ', 50), 'Juan Pérez')
  assert.equal(sanitizeText('a'.repeat(500), 20).length, 20)
})

test('containsUnsafeMarkup detecta payloads XSS comunes', () => {
  const payloads = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    'javascript:alert(document.cookie)',
    'vbscript:msgbox(1)',
    'data:text/html,<svg onload=alert(1)>',
    'onclick=alert(1)',
  ]

  for (const payload of payloads) {
    assert.equal(containsUnsafeMarkup(payload), true, `Debió detectar: ${payload}`)
  }

  assert.equal(containsUnsafeMarkup('Lic. Ana María Sánchez — SEFIPLAN'), false)
})

test('sanitizeExternalUrl permite solo https/http/relativas seguras y bloquea esquemas peligrosos', () => {
  assert.equal(sanitizeExternalUrl('https://iapveracruz.org.mx/doc.pdf'), 'https://iapveracruz.org.mx/doc.pdf')
  assert.equal(sanitizeExternalUrl('http://ejemplo.gob.mx/recurso'), 'http://ejemplo.gob.mx/recurso')
  assert.equal(sanitizeExternalUrl('/docs/guia.pdf'), '/docs/guia.pdf')

  const dangerous = [
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    '//evil.example.com/phish',
    '   ',
    null,
  ]

  for (const url of dangerous) {
    assert.equal(sanitizeExternalUrl(url), null, `Debió bloquear URL: ${url}`)
  }
})

test('isValidEmail e isValidPhone validan formatos reales y rechazan abusos', () => {
  assert.equal(isValidEmail('servidor.publico@iap.edu.mx'), true)
  assert.equal(isValidEmail('sin-arroba.com'), false)
  assert.equal(isValidEmail('a@b'), false)
  assert.equal(isValidEmail(`${'a'.repeat(250)}@ejemplo.com`), false)

  assert.equal(isValidPhone('2282370893'), true)
  assert.equal(isValidPhone('+52 (228) 237-0893'), true)
  assert.equal(isValidPhone('12345'), false)
  assert.equal(isValidPhone('2282370893abc'), false)
})

test('validatePreEnrollmentForm acepta datos legítimos en español y recorta límites', () => {
  const result = validatePreEnrollmentForm({
    ...validPayload,
    name: `  ${validPayload.name}  `,
  })

  assert.equal(result.valid, true)
  assert.equal(result.isBot, false)
  assert.deepEqual(result.errors, {})
  assert.equal(result.sanitized.name, validPayload.name)
})

test('validatePreEnrollmentForm detecta bots vía campo honeypot', () => {
  const result = validatePreEnrollmentForm({
    ...validPayload,
    website: 'https://spam-bot.example',
  })

  assert.equal(result.valid, false)
  assert.equal(result.isBot, true)
  assert.equal(result.sanitized, null)
})

test('validatePreEnrollmentForm rechaza payloads XSS y manipulación de listas blancas', () => {
  const xssAttempt = validatePreEnrollmentForm({
    ...validPayload,
    name: '<script>alert(1)</script>',
    agency: 'Dependencia <img src=x onerror=alert(1)>',
    education: 'NivelInventado',
    contactMethod: 'telegram',
  })

  assert.equal(xssAttempt.valid, false)
  assert.ok(xssAttempt.errors.name)
  assert.ok(xssAttempt.errors.agency)
  assert.ok(xssAttempt.errors.education)
  assert.ok(xssAttempt.errors.contactMethod)
})

test('validatePreEnrollmentForm respeta límites máximos y rechaza entradas vacías o sobredimensionadas', () => {
  const emptyResult = validatePreEnrollmentForm({})
  assert.equal(emptyResult.valid, false)
  assert.ok(emptyResult.errors.name)
  assert.ok(emptyResult.errors.email)
  assert.ok(emptyResult.errors.phone)
  assert.ok(emptyResult.errors.agency)
  assert.ok(emptyResult.errors.education)
  assert.ok(emptyResult.errors.contactMethod)

  const oversized = validatePreEnrollmentForm({
    ...validPayload,
    name: 'A'.repeat(12000),
    agency: 'B'.repeat(12000),
  })
  assert.equal(oversized.valid, true)
  assert.equal(oversized.sanitized.name.length, FIELD_LIMITS.name)
  assert.equal(oversized.sanitized.agency.length, FIELD_LIMITS.agency)
})
