# Plan de Correcciones — Sitio Web IAP Veracruz

Documento estructurado a partir de las notas levantadas en la última revisión con clientes. Las correcciones se organizan por **fase de ejecución**, **prioridad** y **complejidad técnica**, diferenciando los cambios implementables de inmediato de aquellos que permanecen en *backlog* hasta contar con el material oficial.

## Criterios de clasificación

### Prioridad

* **`P1 (Alta)`**: Correcciones inmediatas de identidad institucional, oferta académica vigente o captación de prospectos.

* **`P2 (Media-Alta)`**: Reestructuración de vistas institucionales y rediseño de la visualización del plan de estudios.

* **`P3 (Media / Condicional)`**: Mejoras complementarias o tareas **en pausa hasta indicación explícita**.

* **`P4 (Backlog futuro)`**: Bloqueado por falta de contenido/material del cliente (**no se implementa en esta sesión**).

### Complejidad

* **`Baja`**: Cambios puntuales de texto, metadatos, estilos o campos simples.

* **`Media`**: Ajustes de layout, grillas responsivas, componentes existentes o lógica de renderizado condicional.

* **`Alta`**: Creación de nuevas vistas, rutas, componentes complejos o arquitectura de información ampliada.

***

## Resumen maestro (ordenado por fase, prioridad y complejidad)

| ID    | Fase   | Corrección                                                                                                                                                    | Prioridad                     | Complejidad | Archivos principales                                                                                                                                      | Estado / Dependencia                   |
| :---- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| `1.1` | Fase 1 | Cambiar año de fundación `1978` → `1973` y agregar **53 años de excelencia** en `.visual-stamp`                                                               | `P1 (Alta)`                   | `Baja`      | `src/components/HeroSection.vue`, `src/components/AboutSection.vue`                                                                                       | Completado                             |
| `1.2` | Fase 1 | Aumentar tamaño de la barra de navegación y logotipo                                                                                                          | `P1 (Alta)`                   | `Baja`      | `src/components/SiteHeader.vue`, `src/router/index.js`                                                                                                    | Completado                             |
| `1.3` | Fase 1 | Cambiar **Cursos** a **Microcredenciales**                                                                                                                    | `P1 (Alta)`                   | `Baja`      | `src/data/programs.js`, `src/router/index.js`                                                                                                             | Completado                             |
| `2.1` | Fase 2 | Renombrar Doctorado existente a **Doctorado en Finanzas Públicas**, plan **`ESTRUCTURA CURRICULAR DEL PLAN DE ESTUDIOS DOCTORADO 2025`** y periodo **Agosto** | `P1 (Alta)`                   | `Baja`      | `src/data/programs.js`, `src/views/ProgramDetailView.vue`, `src/components/ProgramsSection.vue`, `src/components/AdmissionsNotice.vue`                    | Completado                             |
| `2.2` | Fase 2 | Metadatos de Maestría: modalidad **Presencial**, duración (`18 materias y 5 cuatrimestres en dos años`) y **RVOE**                                            | `P1 (Alta)`                   | `Baja`      | `src/data/programs.js`, `src/views/ProgramDetailView.vue`                                                                                                 | Completado (RVOE omitido por el momento) |
| `2.3` | Fase 2 | Preguntar medio de contacto preferido en formulario (**WhatsApp**, **Correo** o **Llamada**)                                                                  | `P1 (Alta)`                   | `Baja`      | `src/components/PreEnrollmentForm.vue`                                                                                                                    | Completado                             |
| `2.4` | Fase 2 | Generar texto de **Perfil de egreso** (uno para **Maestría** y otro para **Doctorado**)                                                                       | `P2 (Media-Alta)`             | `Baja`      | `src/data/programs.js`, `src/views/ProgramDetailView.vue`                                                                                                 | Completado                             |
| `3.1` | Fase 3 | Quitar **créditos** en la página/columnas y ocultar **clave** de asignatura                                                                                   | `P2 (Media-Alta)`             | `Baja`      | `src/views/ProgramDetailView.vue`                                                                                                                         | Completado                             |
| `3.2` | Fase 3 | Verificar horas **HI** y **HD** (y ajuste a **18 materias** en Maestría contra PDF oficial)                                                                   | `P2 (Media-Alta)`             | `Baja`      | `src/data/programs.js`, `src/views/ProgramDetailView.vue`                                                                                                 | Completado                             |
| `3.3` | Fase 3 | Reemplazar tabla de materias por **tarjetas por cada ciclo**                                                                                                  | `P2 (Media-Alta)`             | `Media`     | `src/views/ProgramDetailView.vue`                                                                                                                         | Completado                             |
| `3.4` | Fase 3 | **\[EN PAUSA — solo bajo indicación explícita]** Ocultar tira de materias en **Doctorado y Maestría** con llamado a contacto                                  | `P3 (Condicional / En pausa)` | `Baja`      | `src/data/programs.js`, `src/views/ProgramDetailView.vue`                                                                                                 | NO ejecutar hasta indicación explícita |
| `4.2` | Fase 4 | Mover **Organigrama** a la nueva vista **Conócenos**                                                                                                          | `P2 (Media-Alta)`             | `Baja`      | `src/views/HomeView.vue`, `src/views/AboutView.vue`, `src/components/OrganigramSection.vue`                                                               | Completado                             |
| `4.1` | Fase 4 | Crear vista específica de **Conócenos** y actualizar enlaces                                                                                                  | `P2 (Media-Alta)`             | `Media`     | `src/views/AboutView.vue`, `src/router/index.js`, `src/components/AboutSection.vue`, `src/components/SiteHeader.vue`, `src/components/SiteFooter.vue`, `src/components/HeroSection.vue`, `src/views/HomeView.vue` | Completado                             |
| `4.3` | Fase 4 | Crear sección **Consejo** en **Conócenos** (referencia `https://inap.mx/`)                                                                                    | `P2 (Media-Alta)`             | `Alta`      | `src/components/CouncilSection.vue`, `src/data/council.js`, `src/views/AboutView.vue`                                                                     | Completado (placeholders por definir)  |
| `F1`  | Futura | Footer y Contacto: agregar **YouTube**, **TikTok** y **WhatsApp Business**                                                                                    | `P4 (Backlog futuro)`         | `Baja`      | `src/components/SiteFooter.vue`, `src/views/ContactView.vue`                                                                                              | Bloqueado: faltan enlaces y número     |
| `F2`  | Futura | Renombrar **Biblioteca** a **Recursos de información** + repertorios e investigaciones                                                                        | `P4 (Backlog futuro)`         | `Media`     | `src/router/index.js`, `src/components/SiteHeader.vue`, `src/components/SiteFooter.vue`, `src/components/LibrarySection.vue`, `src/views/LibraryView.vue` | Bloqueado: falta contenido             |
| `F3`  | Futura | Nueva sección para la revista **Transformando Veracruz**                                                                                                      | `P4 (Backlog futuro)`         | `Media`     | Nueva sección/vista editorial                                                                                                                             | Bloqueado: falta contenido             |
| `F4`  | Futura | Pestaña de **Observatorio** y **Centro de Inteligencia**                                                                                                      | `P4 (Backlog futuro)`         | `Alta`      | `src/router/index.js`, `src/components/SiteHeader.vue`, nuevas vistas                                                                                     | Bloqueado: falta contenido             |
| `F5`  | Futura | Sección multimedia: **Podcast** (entrevistas, decisiones, revista y contenido didáctico)                                                                      | `P4 (Backlog futuro)`         | `Alta`      | Nueva vista/componentes multimedia                                                                                                                        | Bloqueado: falta contenido             |

***

## Puntos por confirmar con el cliente antes / durante la ejecución

Al contrastar las notas de revisión con el código fuente actual, se identificaron 5 definiciones clave que conviene confirmar para evitar retrabajo:

1. **Número oficial de RVOE (`2.2`):**
   Actualmente `src/data/programs.js` solo define `rvoeRequired: true` y `src/views/ProgramDetailView.vue` imprime `"Dato oficial por confirmar"`. Se necesita el número exacto de RVOE proporcionado por el cliente y confirmar a qué programas aplica (*"RVOE es el mismo número"* — validar si aplica tanto a la Maestría en Administración Pública como al Doctorado en Finanzas Públicas).

2. **Verificación de materias y horas `HI`/`HD` (`2.2` y `3.2` — Resuelto):**
   Al contrastar `src/data/programs.js` contra el documento oficial 2025, se confirmó que los valores de `HD` (492 en Maestría, 288 en Doctorado) e `HI` (708 en Maestría, 1,008 en Doctorado) coinciden al 100%, y se ajustó la duración de la Maestría a **18 materias y 5 cuatrimestres en dos años**.

3. **Confirmación del periodo Agosto en Doctorado (`2.1`):**
   Dado que el doctorado ya publicado adopta formalmente el nombre **Doctorado en Finanzas Públicas** (y no se agrega un segundo doctorado), confirmar si la anotación previa *"periodo agosto"* aplica directamente a este programa.

4. **Integrantes del Consejo y áreas del Organigrama (`4.2`** **y** **`4.3`):**
   Los nombres, semblanzas, fotografías y títulos específicos del Consejo Directivo (Presidenta, Vicepresidente, Tesorero, Secretario Ejecutivo y Vocales) y de las áreas del organigrama siguen por definirse. Se implementará la estructura visual completa con *placeholders* institucionales limpios y fáciles de actualizar.

5. **Ortografía y ruta de "Microcredenciales" (`1.3`):**
   Confirmar si la etiqueta visible debe escribirse junta (`"Microcredenciales"`) o separada (`"Micro credenciales"`), y si el `slug` en `src/data/programs.js` cambiará de `cursos` a `microcredenciales` (dejando redirección desde `/profesionalizacion/cursos` si ya se compartieron enlaces).

***

## Fase 1 — Identidad Institucional, Navegación y Ajustes Rápidos

> **Prioridad:** `P1 (Alta)` · **Complejidad:** `Baja` · **Objetivo:** Corregir de inmediato los datos históricos, la presencia de marca en el encabezado y la nomenclatura base de la oferta.

### 1.1 Actualizar año de fundación (`1978` → `1973`) y agregar "53 años de excelencia"

* **Prioridad:** `P1 (Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/components/HeroSection.vue` (bloque `.visual-stamp` en líneas 140–144 y `.hero-bottom` en línea 149)

  * `src/components/AboutSection.vue` (párrafo introductorio en línea 87)

* **Tareas:**

  * [x] Reemplazar `Fundado en 1978` por `Fundado en 1973` en la franja inferior del hero (`src/components/HeroSection.vue`).

  * [x] Reemplazar `fundada en 1978` por `fundada en 1973` en la descripción institucional (`src/components/AboutSection.vue`).

  * [x] Actualizar el contenido y proporciones de `class="visual-stamp"` en `src/components/HeroSection.vue` para integrar la leyenda **"53 años de excelencia"** (desde 1973), verificando legibilidad en desktop, tablet y móvil.

### 1.2 Aumentar tamaño de la barra de navegación y logotipo

* **Prioridad:** `P1 (Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/components/SiteHeader.vue`

  * `src/router/index.js` (`scrollBehavior` para el `top` de anclas)

* **Tareas:**

  * [x] Incrementar la altura de `.header-inner` (actualmente `min-height: 86px` en desktop y `72px` en móvil).

  * [x] Incrementar el ancho del contenedor `.brand` (actualmente `252px` en desktop, `220px` en `<= 1100px` y `190px` en `<= 560px`) para dar mayor jerarquía al logotipo horizontal sin romper el menú en pantallas medianas.

  * [x] Ajustar ligeramente tamaño/espaciado de enlaces en `.navigation` y actualizar el offset `top` en `scrollBehavior` de `src/router/index.js` (actualmente `96`) acorde a la nueva altura del header *sticky*.

### 1.3 Cambiar "Cursos" a "Microcredenciales"

* **Prioridad:** `P1 (Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/data/programs.js` (objeto con `slug: 'cursos'`)

  * `src/router/index.js` (opcional: redirección si se cambia el slug)

* **Tareas:**

  * [x] Actualizar `category`, `title`, `summary` e `imageAlt` del programa `cursos` a **Microcredenciales** en `src/data/programs.js`.

  * [x] Definir si el `slug` cambia a `microcredenciales` (en caso afirmativo, agregar redirección de `/profesionalizacion/cursos` hacia `/profesionalizacion/microcredenciales`).

  * [x] Verificar propagación automática en el menú desplegable de `SiteHeader.vue`, tarjetas de `ProgramsSection.vue`, catálogo de `ProfessionalizationView.vue` y vista de detalle `ProgramDetailView.vue`.

***

## Fase 2 — Oferta Académica y Formulario de Contacto

> **Prioridad:** `P1 (Alta)` – `P2 (Media-Alta)` · **Complejidad:** `Baja` · **Objetivo:** Actualizar el nombre y plan del Doctorado existente, completar metadatos de la oferta vigente y mejorar la captación de prospectos.

### 2.1 Actualizar Doctorado existente a "Doctorado en Finanzas Públicas" (plan 2025 y periodo Agosto)

* **Prioridad:** `P1 (Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/data/programs.js`

  * `src/views/ProgramDetailView.vue`

  * `src/components/ProgramsSection.vue`

  * `src/components/AdmissionsNotice.vue` (revisión de avisos)

* **Tareas:**

  * [x] Renombrar el programa existente (`slug: 'doctorado'`) formalmente a **`Doctorado en Finanzas Públicas`** (no se agrega un 5.º programa; se conservan los 4 programas actuales y el grid de 4 columnas en `ProgramsSection.vue`).

  * [x] Incorporar la denominación oficial del plan de estudios: **`ESTRUCTURA CURRICULAR DEL PLAN DE ESTUDIOS DOCTORADO 2025`** en `src/data/programs.js` y mostrarla en el encabezado de la sección de plan de estudios en `src/views/ProgramDetailView.vue`.

  * [x] Mantener `availability: 'upcoming'` (Próximamente) y reflejar el periodo de inicio **Agosto** (previa confirmación de que aplica a este doctorado).

### 2.2 Metadatos de Maestría: modalidad Presencial, duración y RVOE

* **Prioridad:** `P1 (Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/data/programs.js`

  * `src/views/ProgramDetailView.vue`

* **Tareas:**

  * [x] Establecer `modality: 'Presencial'` en la Maestría en Administración Pública (`slug: 'maestrias'`).

  * [x] Actualizar `duration` a: **`18 materias y 5 cuatrimestres en dos años`** (revisando congruencia con el listado de materias).

  * [x] Soportar el campo `rvoe` (`SHARED_RVOE`) en `src/data/programs.js` y ocultarlo en `src/views/ProgramDetailView.vue` mientras no exista número oficial *(RVOE omitido por el momento)*.

### 2.3 Preguntar medio de contacto preferido en el formulario

* **Prioridad:** `P1 (Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/components/PreEnrollmentForm.vue`

* **Tareas:**

  * [x] Agregar en `.enrollment-form` el campo obligatorio *"¿Por dónde prefieres que te contactemos?"* con las tres opciones solicitadas:
    * **WhatsApp**

    * **Correo electrónico**

    * **Llamada telefónica**

  * [x] Implementar la selección de forma clara y accesible (radio group estilizado), conservando la armonía de la grilla de 2 columnas en desktop y 1 columna en móvil.

### 2.4 Generar textos de Perfil de Egreso (Maestría y Doctorado)

* **Prioridad:** `P2 (Media-Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/data/programs.js`

  * `src/views/ProgramDetailView.vue`

* **Tareas:**

  * [x] Redactar e integrar un texto institucional de **Perfil de egreso** para la **Maestría en Administración Pública** (sustituyendo o unificando las 4 viñetas actuales en formato de texto continuo) y otro texto específico para el **Doctorado en Finanzas Públicas** (actualmente `null`).

  * [x] Ajustar `ProgramDetailView.vue` para que `graduateProfile` renderice correctamente textos en párrafo (`string`) y mantenga compatibilidad si algún programa utiliza viñetas (`array`).

***

## Fase 3 — Plan de Estudios / Tira de Materias

> **Prioridad:** `P2 (Media-Alta)` – `P3 (Condicional)` · **Complejidad:** `Baja` – `Media` · **Objetivo:** Depurar campos no requeridos, validar cargas horarias y transformar la presentación por ciclos.

### 3.1 Quitar créditos y ocultar la clave de asignatura

* **Prioridad:** `P2 (Media-Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/views/ProgramDetailView.vue`

* **Tareas:**

  * [x] Eliminar la columna y totales de **Créditos** en el encabezado de `.curriculum`, en los ciclos, en `.curriculum-total` y eliminar el cálculo/alerta `listedCredits` / `hasCreditDiscrepancy`.

  * [x] Ocultar en la interfaz la **Clave** de cada materia (`subject.code`), manteniendo `code` únicamente como identificador interno en `programs.js` si resulta útil como `:key`.

### 3.2 Verificar las horas HI y HD

* **Prioridad:** `P2 (Media-Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/data/programs.js`

  * `src/views/ProgramDetailView.vue`

* **Tareas:**

  * [x] Auditar las cifras de **HD** (`hoursWithInstructor`) e **HI** (`independentHours`) por materia y en `curriculumTotals` en `src/data/programs.js` frente al documento oficial 2025.

  * [x] Resolver junto con el cliente la diferencia entre **18 materias capturadas** y **20 materias indicadas** en la nota de Maestría (ajustado a **18 materias**).

  * [x] Asegurar que la leyenda `.table-legend` (`HD: horas con docente` / `HI: horas independientes`) y los encabezados coincidan con los valores reales.

### 3.3 Reemplazar formato de tabla por tarjetas por cada ciclo

* **Prioridad:** `P2 (Media-Alta)` | **Complejidad:** `Media`

* **Archivos afectados:**

  * `src/views/ProgramDetailView.vue`

* **Tareas:**

  * [x] Sustituir el diseño actual basado en `<table>` (`.table-wrap`) por una **grilla de tarjetas por ciclo/cuatrimestre**, donde cada tarjeta represente un ciclo (por ejemplo *Cuatrimestre 1* … *Cuatrimestre 5* o *Ciclo 1* … *Ciclo 4*) con la lista limpia de asignaturas, sus horas `HD` / `HI` y subtotal por ciclo (sin clave ni créditos).

  * [x] Cuidar consistencia visual con las tarjetas del sitio (variables `--color-surface`, `--color-border`, modo claro/oscuro y diseño responsivo en 1–2 columnas).

### 3.4 \[EN PAUSA — solo bajo indicación explícita] Ocultar materias en Doctorado y Maestría y dirigir a contacto

* **Prioridad:** `P3 (Condicional / En pausa)` | **Complejidad:** `Baja` | **Estado:** **NO ejecutar hasta que el usuario lo indique explícitamente.**

* **Archivos afectados:**

  * `src/data/programs.js`

  * `src/views/ProgramDetailView.vue`

* **Tareas (diferidas hasta confirmación explícita):**

  * [ ] Cuando se autorice, incorporar un control explícito (p. ej. `showCurriculum: false`) en **Doctorado** y **Maestría** para ocultar el listado de asignaturas.

  * [ ] Mostrar en su lugar un bloque claro e institucional invitando a las personas interesadas a **ponerse en contacto** (enlace directo al formulario `#novedades` y/o a `/contacto`).

***

## Fase 4 — Nueva Vista "Conócenos", Organigrama y Consejo Directivo

> **Prioridad:** `P2 (Media-Alta)` · **Complejidad:** `Media` – `Alta` · **Objetivo:** Dar entidad propia a la sección institucional, reubicar el organigrama e incorporar el Consejo Directivo siguiendo la referencia de `https://inap.mx/`.

### 4.1 Crear vista específica "Conócenos"

* **Prioridad:** `P2 (Media-Alta)` | **Complejidad:** `Media`

* **Archivos afectados:**

  * Nueva vista `src/views/AboutView.vue`

  * `src/router/index.js`

  * `src/components/AboutSection.vue`, `src/components/SiteHeader.vue`, `src/components/SiteFooter.vue`, `src/components/HeroSection.vue`

  * `src/views/HomeView.vue`

* **Tareas:**

  * [x] Crear la vista dedicada `/conocenos` en `src/router/index.js` con título de página `Conócenos | IAP Veracruz`.

  * [x] Integrar en la nueva vista la presentación institucional, principios (Misión, Visión, Valores), instalaciones (`AboutSection.vue`), el **Consejo** y el **Organigrama**.

  * [x] Actualizar los enlaces de navegación en `SiteHeader.vue`, `SiteFooter.vue` y el enlace `Conoce el IAP` en `HeroSection.vue` para dirigir a `/conocenos` (en lugar de `/#instituto`).

  * [x] Evaluar en `HomeView.vue` cómo mantener un resumen ligero o acceso directo hacia `/conocenos` sin duplicar toda la página (`<AboutSection compact />`).

### 4.2 Mover el Organigrama a la vista "Conócenos"

* **Prioridad:** `P2 (Media-Alta)` | **Complejidad:** `Baja`

* **Archivos afectados:**

  * `src/views/HomeView.vue`

  * `src/components/OrganigramSection.vue`

  * `src/views/AboutView.vue`

* **Tareas:**

  * [x] Retirar `<OrganigramSection />` de `src/views/HomeView.vue`.

  * [x] Integrar `<OrganigramSection />` dentro de la vista `Conócenos`, manteniendo la estructura administrativa y su nota de áreas por confirmar.

### 4.3 Agregar sección "Consejo" en "Conócenos" (referencia `https://inap.mx/`)

* **Prioridad:** `P2 (Media-Alta)` | **Complejidad:** `Alta`

* **Archivos afectados:**

  * Nuevo componente `src/components/CouncilSection.vue` y archivo de datos `src/data/council.js`

  * `src/views/AboutView.vue`

* **Tareas:**

  * [x] Analizar la estructura visual y jerarquía del apartado de Consejo en `https://inap.mx/` y adaptarla al sistema de diseño editorial del IAP Veracruz (tipografía `Lora`/`Inter`, paleta institucional y soporte modo oscuro).

  * [x] Estructurar los cargos solicitados con estado inicial *por definir* (placeholders para nombre, fotografía y reseña corta):
    1. **Presidenta**
    2. **Vicepresidente**
    3. **Tesorero**
    4. **Secretario Ejecutivo**
    5. **Vocales** (lista/grilla flexible para múltiples integrantes)

  * [x] Centralizar los datos en una estructura fácil de editar cuando el cliente entregue nombres y fotografías oficiales.

***

## Fase Futura — Backlog (NO implementar en esta sesión)

> **Prioridad:** `P4 (Backlog futuro)` · **Estado:** **En espera de material oficial del cliente.** Estas solicitudes se documentan para planeación, pero **no deben implementarse** hasta recibir los contenidos, URLs y lineamientos definitivos.

### F1. Redes sociales y canales en Footer / Contacto (`Prioridad futura: Alta` · `Complejidad: Baja`)

* **Archivos previstos:** `src/components/SiteFooter.vue`, `src/views/ContactView.vue`

* **Alcance:**

  * [ ] Agregar íconos y enlaces a **YouTube** y **TikTok** en redes oficiales.

  * [ ] Integrar canal de **WhatsApp Business** (actualizando la leyenda actual de *"Atención exclusiva por llamadas telefónicas"* cuando corresponda).

* **Material pendiente del cliente:** URLs oficiales de YouTube y TikTok, número de WhatsApp Business y mensaje de bienvenida/horario.

### F2. Renombrar "Biblioteca" a "Recursos de información" y ampliar apartados (`Prioridad futura: Alta` · `Complejidad: Media`)

* **Archivos previstos:** `src/router/index.js`, `src/components/SiteHeader.vue`, `src/components/SiteFooter.vue`, `src/components/LibrarySection.vue`, `src/views/LibraryView.vue`

* **Alcance:**

  * [ ] Cambiar la denominación **"Biblioteca"** por **"Recursos de información"** en menú, footer, home y encabezados (evaluando cambio de ruta `/biblioteca` → `/recursos-de-informacion` con redirección).

  * [ ] Incorporar los siguientes apartados dentro de la sección:
    * **Repertorio histórico (revista)**

    * **Revista bimestral**

    * **Apartado de investigaciones** vinculado con el **Observatorio**

* **Material pendiente del cliente:** Acervo inicial (títulos, autores, portadas, fechas y PDFs) y taxonomía de categorías.

### F3. Sección para la revista "Transformando Veracruz" (`Prioridad futura: Media` · `Complejidad: Media`)

* *(Consolidada a partir de dos anotaciones repetidas en la revisión).*

* **Alcance:**

  * [ ] Crear una sección o página dedicada a la revista **Transformando Veracruz** (números publicados, edición destacada, descarga/lectura en línea), vinculada con *Recursos de información*.

* **Material pendiente del cliente:** Identidad gráfica de la revista, ejemplares en PDF, portadas y sinopsis.

### F4. Pestaña de Observatorio y Centro de Inteligencia (`Prioridad futura: Media` · `Complejidad: Alta`)

* **Archivos previstos:** `src/router/index.js`, `src/components/SiteHeader.vue`, nueva vista/componentes de Observatorio y Centro de Inteligencia

* **Alcance:**

  * [ ] Agregar pestaña en la barra de navegación principal para **Observatorio** y **Centro de Inteligencia**.

  * [ ] Conectar este espacio con el apartado de **investigaciones** ubicado en *Recursos de información*.

* **Material pendiente del cliente:** Estructura de indicadores/tableros, documentos de investigación, líneas temáticas y objetivos de ambos centros.

### F5. Sección multimedia: Podcast y contenido didáctico (`Prioridad futura: Media` · `Complejidad: Alta`)

* **Archivos previstos:** Nueva vista/componentes multimedia

* **Alcance:**

  * [ ] Crear sección para contenido multimedia con categorías para:
    * **Podcast de entrevistas**

    * **Decisiones**

    * **Revista**

    * **Contenido didáctico**

* **Material pendiente del cliente:** Enlaces/embeds (YouTube, Spotify o archivos de audio/video), títulos, descripciones e invitados.

***

## Orden recomendado de ejecución y verificación

1. **Bloque inmediato (`Fase 1`):** Ejecutar `1.1`, `1.2` y `1.3` en una sola iteración rápida.
2. **Confirmación rápida con el cliente:** Aclarar los puntos `1`, `2`, `3` y `5` de la sección de hallazgos antes de cerrar `Fase 2` y `Fase 3`.
3. **Bloque académico (`Fase 2`** **+** **`Fase 3`):** Implementar oferta de programas, textos de perfil de egreso, formulario y ajustes al plan de estudios en tarjetas (`3.1`–`3.3`). El punto `3.4` (ocultar materias en Doctorado y Maestría) permanece **en pausa hasta indicación explícita**.
4. **Bloque institucional (`Fase 4`):** Construir la vista **Conócenos**, reubicar el **Organigrama** e implementar la sección **Consejo**.
5. **Verificación técnica tras cada fase:**

   * Compilar con `npm run build` (y `npm run build:pages` si se actualizará la carpeta `docs/` de GitHub Pages).

   * Validar navegación completa, anclas, diseño responsivo (desktop, tablet y móvil) y contraste en modo claro y modo oscuro.
