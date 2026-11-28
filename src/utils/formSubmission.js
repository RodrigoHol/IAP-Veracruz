import { FIELD_LIMITS } from './formValidation.js'
import { sanitizeText, stripControlChars } from './security.js'

export const CONTACT_METHOD_LABELS = {
  whatsapp: 'WhatsApp',
  correo: 'Correo electrónico',
  llamada: 'Llamada telefónica',
}

const GOOGLE_SCRIPT_PATH_REGEX = /^\/macros\/s\/[A-Za-z0-9_-]{16,}\/exec$/

/** Validate that an endpoint URL points strictly to a published Google Apps Script Web App. */
export const isValidGoogleScriptUrl = (url) => {
  const cleaned = stripControlChars(url).trim()
  if (!cleaned || cleaned.includes('REEMPLAZAR')) return null

  try {
    const parsed = new URL(cleaned)
    if (parsed.protocol !== 'https:' || parsed.hostname !== 'script.google.com') {
      return null
    }
    if (!GOOGLE_SCRIPT_PATH_REGEX.test(parsed.pathname)) {
      return null
    }
    return parsed.href
  } catch {
    return null
  }
}

/** Build the sanitized JSON payload expected by the Google Apps Script endpoint. */
export const buildSubmissionPayload = (
  sanitized,
  { programTitle = '', requestCurriculum = false } = {},
) => ({
  program: sanitizeText(programTitle, FIELD_LIMITS.program),
  requestType: requestCurriculum ? 'Plan de estudios e informes' : 'Novedades y convocatorias',
  name: sanitized.name,
  email: sanitized.email,
  phone: sanitized.phone,
  agency: sanitized.agency,
  education: sanitized.education,
  contactMethod: CONTACT_METHOD_LABELS[sanitized.contactMethod] || sanitized.contactMethod,
  website: '',
  submittedAtClient: new Date().toISOString(),
})

/** Submit a validated pre-enrollment payload to Google Sheets via Apps Script Web App. */
export async function submitToGoogleSheets(
  payload,
  {
    endpointUrl = import.meta.env?.VITE_GOOGLE_SCRIPT_URL,
    fetchImpl = globalThis.fetch,
    timeoutMs = 15000,
  } = {},
) {
  const validUrl = isValidGoogleScriptUrl(endpointUrl)
  if (!validUrl) {
    return { ok: false, reason: 'unconfigured' }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    // text/plain avoids a CORS preflight OPTIONS request, which Apps Script does not handle.
    const response = await fetchImpl(validUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) {
      return { ok: false, reason: 'http_error' }
    }

    const data = await response.json()
    return {
      ok: Boolean(data?.ok),
      reason: data?.ok ? null : (data?.error || 'server_rejected'),
    }
  } catch (error) {
    return {
      ok: false,
      reason: error?.name === 'AbortError' ? 'timeout' : 'network_error',
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
