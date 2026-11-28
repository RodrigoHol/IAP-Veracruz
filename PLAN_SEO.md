# Plan de Posicionamiento SEO — `https://iapveracruz.edu.mx`

Hoja de ruta con las pautas técnicas, institucionales y de contenido para posicionar el portal oficial del **Instituto de Administración Pública del Estado de Veracruz, A.C.** (`https://iapveracruz.edu.mx`) en los primeros resultados de Google y otros buscadores.

---

## 1. Propósito y Mapa de Palabras Clave Objetivo

El dominio **`.edu.mx`** otorga por sí solo una alta autoridad institucional frente a sitios `.com` o redes sociales. El objetivo es consolidar esa ventaja asociando sin ambigüedad la marca, la sigla y la oferta académica del IAP Veracruz con `https://iapveracruz.edu.mx`.

| Nivel | Búsquedas objetivo | Meta realista | Factor decisivo |
| :--- | :--- | :--- | :--- |
| **Nivel 1 — Marca exacta** | `IAP Veracruz`, `Instituto de Administración Pública de Veracruz`, `Instituto de Administración Pública del Estado de Veracruz` | **#1 nacional** | Indexación en Search Console + `Schema.org` + dominio `.edu.mx` |
| **Nivel 2 — Sigla y búsqueda geolocalizada** | `IAP`, `IAP Xalapa`, `Instituto de Administración Pública` | **#1 en Xalapa y Veracruz** | Ficha de Google Maps (Google Business Profile) + consistencia NAP |
| **Nivel 3 — Oferta académica** | `Maestría en Administración Pública Veracruz`, `Maestría en Administración Pública Xalapa`, `Doctorado en Administración Pública Veracruz`, `Diplomados administración pública Veracruz`, `Microcredenciales servicio público` | **Top 3 en Veracruz** | Metadatos por ruta + contenido semántico + enlaces institucionales |

---

## 2. Fase 1 — SEO Técnico en nuestro Código *(rama `develop` → `main`)*

Acciones implementables directamente en el repositorio antes de la siguiente subida a Hostinger:

- [ ] **Crear `public/robots.txt`** permitiendo el rastreo completo y declarando el mapa del sitio:
  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://iapveracruz.edu.mx/sitemap.xml
  ```
- [ ] **Crear `public/sitemap.xml`** con las 9 rutas públicas canónicas del sitio:
  - `https://iapveracruz.edu.mx/`
  - `https://iapveracruz.edu.mx/conocenos`
  - `https://iapveracruz.edu.mx/profesionalizacion`
  - `https://iapveracruz.edu.mx/profesionalizacion/doctorado`
  - `https://iapveracruz.edu.mx/profesionalizacion/maestrias`
  - `https://iapveracruz.edu.mx/profesionalizacion/diplomados`
  - `https://iapveracruz.edu.mx/profesionalizacion/microcredenciales`
  - `https://iapveracruz.edu.mx/biblioteca`
  - `https://iapveracruz.edu.mx/contacto`
- [ ] **Metadatos dinámicos y Canonical por ruta (`src/router/index.js` y `index.html`):**
  - Además de actualizar `document.title` en `router.afterEach`, actualizar dinámicamente `<meta name="description">` y `<link rel="canonical" href="https://iapveracruz.edu.mx/...">` según cada vista y programa.
- [ ] **Datos estructurados JSON-LD (`Schema.org`):**
  - Integrar `EducationalOrganization` en `index.html` con:
    - `name`: `"Instituto de Administración Pública del Estado de Veracruz, A.C."`
    - `alternateName`: `["IAP Veracruz", "IAP"]`
    - `url`: `"https://iapveracruz.edu.mx"`
    - `foundingDate`: `"1973"`
    - `telephone`: `"+52-228-237-0893"`
    - `address`: Colmerillo No. 3, Nuevo Xalapa, CP `91097`, Xalapa-Enríquez, Veracruz, México.
    - `sameAs`: enlaces oficiales a Instagram, Facebook y TikTok.
  - Integrar `EducationalOccupationalProgram` / `Course` en las fichas de **Maestría en Administración Pública** y **Doctorado en Administración Pública**.
- [ ] **Etiquetas Open Graph y Twitter Cards (`index.html`):**
  - Configurar `og:type`, `og:title`, `og:description`, `og:url`, `og:locale="es_MX"` y `og:image` (`1200×630`) para que al compartir cualquier enlace en WhatsApp, Facebook o LinkedIn se muestre una tarjeta institucional limpia.
- [ ] **Evolución recomendada (v1.1) — Pre-renderizado estático (*Prerendering / SSG*):**
  - Compilar HTML estático por cada ruta durante `npm run build` para que Google y WhatsApp reciban desde el primer milisegundo el `<h1>`, `<title>`, descripción y contenido real sin esperar a que se ejecute JavaScript (y evitar respuestas tipo *Soft 404* en rutas inexistentes).

---

## 3. Fase 2 — Configuración de Dominio e Indexación Directa

Ejecutar en cuanto termine la propagación DNS y `https://iapveracruz.edu.mx` muestre el candado SSL en verde:

- [ ] **Consolidar URL canónica única en Hostinger:**
  - Verificar que `http://iapveracruz.edu.mx`, `http://www.iapveracruz.edu.mx` y `https://www.iapveracruz.edu.mx` redirijan con código `301` hacia `https://iapveracruz.edu.mx` (evita dividir la autoridad entre variantes con y sin `www`).
  - Confirmar que **Forzar HTTPS** esté activo en **Seguridad → SSL** de Hostinger.
- [ ] **Registrar en Google Search Console ([search.google.com/search-console](https://search.google.com/search-console)):**
  - Dar de alta la propiedad de tipo **Dominio** (`iapveracruz.edu.mx`) mediante verificación `TXT` en la zona DNS de Hostinger.
  - Enviar `https://iapveracruz.edu.mx/sitemap.xml` en el apartado **Sitemaps**.
  - Usar **Inspección de URLs → Solicitar indexación** para la portada (`/`), `/conocenos`, `/profesionalizacion`, `/profesionalizacion/maestrias`, `/profesionalizacion/doctorado` y `/contacto`.
- [ ] **Registrar en Bing Webmaster Tools ([bing.com/webmasters](https://www.bing.com/webmasters)):**
  - Importar el sitio en 1 clic desde Google Search Console (cubre búsquedas en Bing, Microsoft Edge, DuckDuckGo y asistentes como Copilot).

---

## 4. Fase 3 — SEO Local en Xalapa y Veracruz *(clave para ganar `"IAP"`)*

Cuando alguien busca una sigla corta como `"IAP"` desde Veracruz o Xalapa, Google prioriza resultados locales vinculados a **Google Maps**:

- [ ] **Reclamar o actualizar el Perfil de Negocio de Google (*Google Business Profile*):**
  - Verificar la ficha en Google Maps ubicada en *Colmerillo No. 3, Nuevo Xalapa, 91097 Xalapa-Enríquez, Veracruz*.
  - Establecer `https://iapveracruz.edu.mx` como **Sitio web** oficial.
- [ ] **Consistencia exacta NAP (*Name, Address, Phone*):**
  - Mantener exactamente el mismo nombre institucional, dirección y teléfono (`228 237 0893`) en Google Maps, en `src/data/site.js`, en el pie de página y en el JSON-LD de `index.html`.
- [ ] **Completar la ficha local:**
  - Seleccionar categoría principal acorde (*Instituto de educación superior* / *Centro de formación*).
  - Subir fotografías reales en buena resolución de la fachada, jardín de acceso, sala de seminarios y aulas.
  - Mantener actualizados los horarios de atención telefónica y presencial.

---

## 5. Fase 4 — Autoridad Institucional y Enlaces Externos (*Backlinks*)

Para Google, un enlace desde un dominio gubernamental o universitario vale mucho más que decenas de directorios comerciales:

- [ ] **Redes sociales oficiales:**
  - Colocar `https://iapveracruz.edu.mx` en la biografía/información de **Facebook**, **Instagram** y **TikTok** (y en **YouTube** / **LinkedIn** cuando se habiliten).
- [ ] **Directorio nacional del INAP (`inap.mx`):**
  - Solicitar la actualización de la ficha del IAP Veracruz en el portal del INAP para que apunte a `https://iapveracruz.edu.mx`.
- [ ] **Convenios y aliados (`.gob.mx` y `.edu.mx`):**
  - Procurar que las páginas de convenios, convocatorias o boletines de dependencias estatales, ayuntamientos, **UV** y **COLVER** enlacen hacia `https://iapveracruz.edu.mx`.
- [ ] **Comunicación institucional cotidiana:**
  - Incluir `https://iapveracruz.edu.mx` en firmas de correos institucionales `@iapveracruz.edu.mx`, comunicados oficiales, lonas/carteles (con QR hacia la ruta específica del programa) y convocatorias en PDF.

---

## 6. Fase 5 — Contenido Semántico, Rendimiento y Seguimiento

Pautas para las siguientes etapas de crecimiento del sitio (Fase 6: *Servicios Especializados*, *Revista Transforma Veracruz*, *Observatorio* y *Recursos de información*):

- [ ] **Jerarquía limpia por página:** un solo `<h1>` descriptivo con las palabras clave principales de la vista y subtítulos ordenados (`<h2>`, `<h3>`).
- [ ] **Texto real rastreable (no solo imágenes):** nunca publicar convocatorias, fechas o descripciones únicamente dentro de un flyer PNG/JPG; acompañar siempre con texto HTML claro.
- [ ] **Atributos `alt` descriptivos:** mantener textos alternativos específicos en cada fotografía nueva (`public/images/`).
- [ ] **Imágenes ligeras y Core Web Vitals:** conservar formatos `.webp` optimizados y dimensiones explícitas (`width`/`height`) para sostener `LCP < 2.5s`, `CLS < 0.1` e `INP < 200ms`.
- [ ] **Revisión mensual en Search Console:** monitorear qué consultas generan impresiones y clics, corregir errores de cobertura/rastreo y solicitar re-indexación cada vez que se publique una nueva sección o convocatoria importante.

---

## 7. Orden sugerido de ejecución inmediata

1. Esperar confirmación de propagación DNS y **SSL en verde** en `https://iapveracruz.edu.mx`.
2. Configurar redirección `www` → sin `www` + **Forzar HTTPS** en Hostinger.
3. Registrar y verificar el dominio en **Google Search Console** y vincular `https://iapveracruz.edu.mx` en **Google Maps**.
4. Implementar la **Fase 1** (`robots.txt`, `sitemap.xml`, `canonical`, `Schema.org` y Open Graph) sobre la rama `develop`, compilar `dist/`, subir a Hostinger, fusionar a `main` y enviar el `sitemap.xml` en Search Console.
