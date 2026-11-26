const CONTROL_AND_BIDI_REGEX = /[\u0000-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g
const MULTISPACE_REGEX = /\s+/g
const UNSAFE_HTML_OR_SCRIPT_REGEX =
  /<[^>]*>|javascript\s*:|vbscript\s*:|data\s*:\s*text\/html|on[a-z]+\s*=/i
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/
const SAFE_PHONE_CHARS_REGEX = /^[+\d()\s.-]+$/
const SCHEME_PREFIX_REGEX = /^([a-zA-Z][a-zA-Z0-9+.-]*):/

/** Remove ASCII control characters and invisible bidirectional/zero-width marks. */
export const stripControlChars = (value) =>
  typeof value === 'string' ? value.replace(CONTROL_AND_BIDI_REGEX, '') : ''

/** Normalize whitespace, strip control characters, and enforce a maximum length. */
export const sanitizeText = (value, maxLength = 255) => {
  const cleaned = stripControlChars(value).replace(MULTISPACE_REGEX, ' ').trim()
  return cleaned.slice(0, maxLength)
}

/** Detect common HTML/script injection payloads in user-provided text. */
export const containsUnsafeMarkup = (value) =>
  typeof value === 'string' && UNSAFE_HTML_OR_SCRIPT_REGEX.test(value)

/** Validate and normalize an external or relative URL against an allowlist of schemes. */
export const sanitizeExternalUrl = (url) => {
  const cleaned = stripControlChars(url).trim()
  if (!cleaned) return null

  const schemeMatch = cleaned.match(SCHEME_PREFIX_REGEX)
  if (schemeMatch) {
    const protocol = schemeMatch[1].toLowerCase()
    if (protocol !== 'https' && protocol !== 'http') return null
    try {
      const parsed = new URL(cleaned)
      return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : null
    } catch {
      return null
    }
  }

  if (cleaned.startsWith('//')) return null
  return cleaned.startsWith('/') || !cleaned.includes(':') ? cleaned : null
}

/** Validate email format conservatively within RFC 5321 length limits. */
export const isValidEmail = (value) => {
  const cleaned = sanitizeText(value, 254)
  return cleaned.length <= 254 && EMAIL_REGEX.test(cleaned)
}

/** Validate phone strings containing between 10 and 15 real digits. */
export const isValidPhone = (value) => {
  const cleaned = sanitizeText(value, 25)
  if (!SAFE_PHONE_CHARS_REGEX.test(cleaned)) return false
  const digits = cleaned.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}
