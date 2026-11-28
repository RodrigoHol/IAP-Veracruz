import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { councilOfficers, councilPresident, councilVocals } from '../src/data/council.js'
import { archivedCurricula } from '../src/data/curriculaArchive.js'
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
  assert.equal(getProgramBySlug('doctorado')?.title, 'Doctorado en Administración Pública')
  assert.equal(getProgramBySlug('microcredenciales')?.title, 'Microcredenciales')
  assert.equal(getProgramBySlug('inexistente'), undefined)
  assert.equal(getProgramBySlug(null), undefined)
  assert.equal(getProgramBySlug({}), undefined)
})

test('Los posgrados tienen oculta la tira pública de materias y no se expone en el catálogo público', () => {
  const doctorado = getProgramBySlug('doctorado')
  const maestria = getProgramBySlug('maestrias')

  assert.equal(doctorado.showCurriculum, false)
  assert.equal(maestria.showCurriculum, false)
  assert.equal(doctorado.cycles.length, 0)
  assert.equal(maestria.cycles.length, 0)
  assert.equal(doctorado.cycleCount, archivedCurricula.doctorado.cycles.length)
  assert.equal(doctorado.subjectCount, getTotalSubjects(archivedCurricula.doctorado.cycles))
  assert.equal(maestria.cycleCount, archivedCurricula.maestrias.cycles.length)
  assert.equal(maestria.subjectCount, getTotalSubjects(archivedCurricula.maestrias.cycles))
})

test('Las sumas reales de horas HD/HI y total de materias coinciden con curriculumTotals', () => {
  const doctorado = archivedCurricula.doctorado
  const maestria = archivedCurricula.maestrias

  assert.equal(getTotalSubjects(doctorado.cycles), 12)
  assert.equal(getTotalSubjects(maestria.cycles), 18)

  for (const [slug, program] of Object.entries({ doctorado, maestrias: maestria })) {
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

    assert.equal(computed.hd, program.curriculumTotals.hoursWithInstructor, `${slug} HD`)
    assert.equal(computed.hi, program.curriculumTotals.independentHours, `${slug} HI`)
  }
})

test('La URL de Material Symbols Outlined mantiene icon_names ordenados alfabéticamente', () => {
  const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
  const match = html.match(/icon_names=([^&"]+)/)
  assert.ok(match, 'Falta parámetro icon_names en index.html')

  const names = match[1].split(',')
  assert.ok(names.length >= 25)
  assert.deepEqual(names, [...names].sort())
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
  assert.equal(socialLinks.some((social) => social.id === 'tiktok'), true)
})

test('El archivo public/.htaccess existe e incluye ruteo SPA y cabeceras de seguridad', () => {
  const htaccessPath = resolve(publicDir, '.htaccess')
  assert.equal(existsSync(htaccessPath), true)

  const content = readFileSync(htaccessPath, 'utf8')
  assert.ok(content.includes('RewriteRule ^ index.html [L]'))
  assert.ok(content.includes('(?!well-known/)'))
  assert.ok(content.includes("frame-ancestors 'none'"))
})
