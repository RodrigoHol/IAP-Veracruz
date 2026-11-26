import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { councilOfficers, councilPresident, councilVocals } from '../src/data/council.js'
import { facilities, heroSlides } from '../src/data/institution.js'
import { getProgramBySlug, programs } from '../src/data/programs.js'
import { siteInfo, socialLinks } from '../src/data/site.js'
import { getCycleHours, getTotalSubjects } from '../src/utils/curriculum.js'
import { sanitizeExternalUrl } from '../src/utils/security.js'

const publicDir = resolve(process.cwd(), 'public')

test('Los programas tienen slugs únicos y getProgramBySlug valida entradas correctamente', () => {
  const slugs = programs.map((program) => program.slug)
  assert.equal(new Set(slugs).size, slugs.length)

  assert.equal(getProgramBySlug('maestrias')?.title, 'Maestría en Administración Pública')
  assert.equal(getProgramBySlug('doctorado')?.title, 'Doctorado en Finanzas Públicas')
  assert.equal(getProgramBySlug('microcredenciales')?.title, 'Microcredenciales')
  assert.equal(getProgramBySlug('inexistente'), undefined)
  assert.equal(getProgramBySlug(null), undefined)
  assert.equal(getProgramBySlug({}), undefined)
})

test('Las sumas reales de horas HD/HI y total de materias coinciden con curriculumTotals', () => {
  const doctorado = getProgramBySlug('doctorado')
  const maestria = getProgramBySlug('maestrias')

  assert.equal(getTotalSubjects(doctorado.cycles), 12)
  assert.equal(getTotalSubjects(maestria.cycles), 18)

  for (const program of [doctorado, maestria]) {
    const computed = program.cycles.reduce(
      (acc, cycle) => {
        const cycleHours = getCycleHours(cycle)
        return {
          hd: acc.hd + cycleHours.hd,
          hi: acc.hi + cycleHours.hi,
        }
      },
      { hd: 0, hi: 0 },
    )

    assert.equal(computed.hd, program.curriculumTotals.hoursWithInstructor, `${program.slug} HD`)
    assert.equal(computed.hi, program.curriculumTotals.independentHours, `${program.slug} HI`)
  }
})

test('Todas las imágenes referenciadas en los datos existen en public/', () => {
  const imagePaths = [
    ...programs.map((program) => program.image),
    ...heroSlides.map((slide) => slide.image),
    ...facilities.map((facility) => facility.image),
  ]

  for (const relativePath of imagePaths) {
    assert.equal(existsSync(resolve(publicDir, relativePath)), true, `Falta imagen: ${relativePath}`)
  }
})

test('Consejo Directivo conserva los cargos institucionales solicitados', () => {
  assert.equal(councilPresident.role, 'Presidenta')
  assert.deepEqual(
    councilOfficers.map((officer) => officer.role),
    ['Vicepresidente', 'Tesorero', 'Secretario Ejecutivo'],
  )
  assert.ok(councilVocals.length >= 1)
  assert.equal(councilVocals.every((vocal) => vocal.role === 'Vocal'), true)
})

test('Las URLs externas configuradas en site.js pasan la política de seguridad', () => {
  assert.ok(sanitizeExternalUrl(siteInfo.mapsDirectionsUrl))
  assert.ok(sanitizeExternalUrl(siteInfo.mapsEmbedUrl))
  for (const social of socialLinks) {
    assert.ok(sanitizeExternalUrl(social.href), `URL inválida en ${social.id}`)
  }
})
