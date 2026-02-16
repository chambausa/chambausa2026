# ChambaEnUSA - PRD (Product Requirements Document)

**Versión 1.0**  
**Fecha:** 2026-01-26  
**Responsable:** Jonatan Villarral  

---

## 🌟 Objetivo del Proyecto
Crear el portal #1 en español para hispanos en EE.UU. que buscan certificarse en oficios como electricista, CDL, cosmetología, etc. El sitio debe automatizar la generación de contenido para cada estado y oficio, capturar leads para escuelas, y escalar a miles de páginas.

---

## 🔄 Arquitectura General

- **Frontend:** Next.js 14 (App Router) + TailwindCSS
- **Backend/API:** Supabase (PostgreSQL), edge functions de Vercel
- **Automatización:** Python/Node.js scripts + Claude API
- **Hosting:** Vercel (con ISR habilitado)
- **Lead Capture:** Formularios con validación + CRM (HubSpot o Airtable)
- **Email:** Resend + Loops

---

## 👨‍💻 Páginas Dinámicas

### Licencias de Oficios
- URL: `/licencia-[oficio]-[estado]/`
- Render: Markdown generado con requisitos oficiales + tabla de escuelas + FAQ
- Metadata: SEO optimizada por oficio/estado

### Fichas de Escuelas
- URL: `/escuela-[slug]/`
- Slug basado en nombre limpio y único de la escuela
- Contenido: Descripción, ciudad, estado, programas, acreditaciones, formulario

---

## 🔗 Estructura de Datos

### Tabla: `trades`
- id, slug, name_es, avg_salary

### Tabla: `states`
- id, code (TX), name_es

### Tabla: `requirements`
- trade_id, state_id, hours_required, age_min, fees, exam_info, source_url

### Tabla: `schools`
- id, slug, name, city, state_id, phone, website, is_bilingual, accreditation, description_md

### Tabla: `programs`
- school_id, trade_id, name, duration, cost, modality

### Tabla: `pages`
- slug, trade_id, state_id, content_md, meta_title, meta_description, last_updated

---

## 🌐 URLs Principales

```txt
/licencia-cdl-california/
/licencia-cosmetologia-texas/
/escuela-texas-beauty-institute/
/escuela-instituto-latino-cdl/
```

---

## 🔹 Contenido Markdown por Página de Licencia

- Introducción con contexto hispano
- Requisitos oficiales (edad, horas, fees, docs)
- Proceso paso a paso
- Tabla de escuelas (nombre, ciudad, tel, bilingüe, link a ficha)
- FAQs generadas por IA + GSC
- Fuente .gov oficial + fecha actualización

---

## 🔹 Contenido Markdown por Escuela

- Nombre, ciudad, estado
- Oficios que ofrece (de la tabla `programs`)
- Datos de contacto, acreditación, sitio web
- Descripción generada por IA
- Tabla de programas (duración, costo, modalidad)
- CTA de contacto / formulario
- Reseñas externas (opcional)

---

## ⌛ Automatización Paso a Paso

1. Cargar `trades` y `states`
2. Por combinación:
    - Scrape datos oficiales (Playwright)
    - Buscar escuelas (Google CSE + scraping)
    - Validar idioma ("hablamos español")
    - Generar markdown con Claude API
    - Validar con Zod
    - Guardar en `pages` y `schools`
3. Generar páginas con ISR
4. Enlazar automáticamente entre licencias y escuelas

---

## 🔢 Meta Titles y Descriptions

### Licencias
- Title: `Licencia de {{Oficio}} en {{Estado}} {{Año}}: Requisitos y Escuelas Bilingüe`
- Desc: `Requisitos oficiales, costos reales y escuelas bilingües para {{oficio}} en {{estado}}. Guía para hispanos.`

### Escuelas
- Title: `{{Nombre de Escuela}} en {{Ciudad}}, {{Estado}} | ChambaEnUSA`
- Desc: `Descubre programas de {{oficios}} en {{nombre escuela}}, una escuela {{bilingüe}} en {{ciudad}}, {{estado}}.`

---

## ❌ Fuera de Alcance (v1)
- Registro de usuarios
- Comparadores y quizzes
- Reviews manuales
- Pagos en línea
- Chatbots o AI interactivo

---

## 🔄 Actualización mensual
- Cron job que re-scrapea datos .gov
- Regenera contenido si hay cambios
- Webhook que revalida rutas ISR

---

## ✉️ Lead Capture
- Formulario en páginas de escuela y licencia
- Captura: nombre, email, tel, estado, oficio
- Se guarda en Airtable/HubSpot
- Email de confirmación vía Resend
- Integración opcional con Loops para drip campaigns

---

## 📊 KPIs esperados (6 meses)
- 50 páginas indexadas
- 10 leads diarios
- CTR > 3%
- Tiempo promedio en sitio > 1:30 min

---

## ✅ Listo para construir
Este PRD ya está limpio para pasarse a Antigravity o cualquier equipo de desarrollo para ejecución inmediata.

