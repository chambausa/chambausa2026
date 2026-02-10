# Plan Integral de Migración - ChambaEnUSA v2.0

**Versión:** 2.0  
**Fecha:** 2026-02-05  
**Objetivo:** Migrar de WordPress a Next.js + Supabase con automatización IA completa

---

## 🎯 Visión del Proyecto

Crear el portal #1 en español para hispanos en EE.UU. que busca certificarse en oficios, con:
- **Escalabilidad:** Miles de páginas generadas automáticamente
- **SEO:** Posiciones top 3 para keywords de alto volumen
- **Conversión:** Sistema de leads integrado con CRM
- **Velocidad:** Core Web Vitals en verde (90+)

---

## 📊 Análisis Actual (WordPress)

### Métricas Actuales
| Métrica | Valor | Evaluación |
|---------|-------|------------|
| Impresiones | 18,923 | ✅ Buena base |
| Clics | 197 | ⚠️ Bajo CTR (1%) |
| Páginas indexadas | ~30 | ⚠️ Muy bajo potencial |
| Posición promedio | 8-10 | ⚠️ Cerca de página 1 |
| Países | 90% USA + hispanos | ✅ Mercado claro |

### Páginas con Mayor Potencial
1. `/licencia-cosmetologia-texas/` - 4,793 impressiones, pos 8.28
2. `/licencia-cdl-california/` - 2,679 impressiones, pos 10.46
3. `/licencia-electricista-new-york/` - 1,490 impressiones, pos 9.56

### Keywords con Alto Volumen (0 clics)
- "licencia de cosmetología" - 578 impressiones
- "tdlr que es" - 94 impressiones
- "licencia de electricista" - 257 impressiones

---

## 🏗️ Arquitectura Técnica

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                     │
│  Next.js 14 (App Router) + TailwindCSS + Shadcn/UI        │
│  • ISR para páginas de licencias (revalidate: 1 hour)     │
│  • SSR para dashboards y búsqueda                           │
│  • Static para páginas institucionales                     │
├─────────────────────────────────────────────────────────────┤
│                       CAPA API                              │
│  Vercel Edge Functions + Supabase RPC                      │
│  • /api/generate-license (Claude API)                      │
│  • /api/search-schools                                     │
│  • /api/lead-capture                                       │
├─────────────────────────────────────────────────────────────┤
│                     CAPA DE DATOS                           │
│  Supabase (PostgreSQL)                                      │
│  • Tablas: trades, states, requirements, schools, pages    │
│  • Vector search para contenido IA                         │
│  • Row Level Security para leads                           │
├─────────────────────────────────────────────────────────────┤
│                CAPA DE AUTORIZACIÓN                         │
│  Supabase Auth                                             │
│  • Admin dashboard                                         │
│  • Lead management                                         │
├─────────────────────────────────────────────────────────────┤
│                  CAPA DE AUTOMATIZACIÓN                     │
│  Python/Node Scripts + Claude API                          │
│  • Scraper de fuentes oficiales (.gov)                    │
│  • Generador de contenido Markdown                         │
│  • Updater monthly de cambios oficiales                    │
├─────────────────────────────────────────────────────────────┤
│                    CAPA EXTERNA                             │
│  • Vercel (hosting)                                        │
│  • Resend (email transaccional)                           │
│  • Airtable/HubSpot (CRM leads)                           │
│  • Google CSE (búsqueda de escuelas)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Base de Datos

### Tabla: `trades` (Oficios)
```sql
id: uuid (PK)
slug: text UNIQUE          -- 'electricista'
name_es: text              -- 'Electricista'
name_en: text               -- 'Electrician'
avg_salary: numeric         -- 55000
salary_unit: text           -- 'annual'
description_md: text         -- generado por IA
created_at: timestamptz
updated_at: timestamptz
```

### Tabla: `states` (Estados)
```sql
id: uuid (PK)
code: text UNIQUE           -- 'TX', 'CA'
name_es: text               -- 'Texas'
name_en: text               -- 'Texas'
region: text                -- 'southwest', 'northeast', etc.
```

### Tabla: `requirements` (Requisitos oficiales)
```sql
id: uuid (PK)
trade_id: uuid (FK)
state_id: uuid (FK)
age_min: int                -- 18
hours_required: int         -- 8000
fees_exam: numeric
fees_license: numeric
documents_required: text[]  -- ['SSN', 'GED', ...]
renewal_period_years: int
source_url: text            -- URL oficial .gov
source_updated_at: date
```

### Tabla: `schools` (Escuelas)
```sql
id: uuid (PK)
slug: text UNIQUE
name: text
city: text
state_id: uuid (FK)
phone: text
website: text
is_bilingual: boolean
accreditation: text
description_md: text
rating_google: numeric
lat: numeric
lng: numeric
```

### Tabla: `programs` (Programas de estudio)
```sql
id: uuid (PK)
school_id: uuid (FK)
trade_id: uuid (FK)
name: text                  -- 'Programa de Electricista'
duration_months: int
cost: numeric
modality: text              -- 'presencial', 'online', 'hibrido'
hours: int
```

### Tabla: `license_pages` (Páginas generadas)
```sql
id: uuid (PK)
slug: text UNIQUE           -- 'licencia-electricista-texas'
trade_id: uuid (FK)
state_id: uuid (FK)
meta_title: text
meta_description: text
content_md: text            -- Markdown generado
last_updated: date
is_published: boolean
views: int                  -- analytics
clicks: int                 -- GSC
```

### Tabla: `leads` (Captura de leads)
```sql
id: uuid (PK)
name: text
email: text
phone: text
state_id: uuid (FK)
trade_id: uuid (FK)
source_page: text
status: text                -- 'new', 'contacted', 'qualified', 'converted'
crm_id: text                -- Airtable/HubSpot ID
created_at: timestamptz
```

---

## 🚀 Plan de Implementación por Fases

### Fase 1: Fundamentos (Semanas 1-2)
#### 1.1 Setup del Proyecto
- [ ] Inicializar Next.js 14 con App Router
- [ ] Configurar TailwindCSS + Shadcn/UI
- [ ] Setup Supabase project
- [ ] Configurar Vercel deployment
- [ ] Setup CI/CD con GitHub Actions

#### 1.2 Migración de Contenido Existente
- [ ] Exportar páginas de WordPress (xml export ya disponible)
- [ ] Convertir HTML a Markdown
- [ ] Crear scripts de importación a Supabase
- [ ] Migrar páginas existentes manteniendo URLs

#### 1.3 Base de Datos
- [ ] Crear todas las tablas en Supabase
- [ ] Setup Row Level Security
- [ ] Crear índices para búsquedas rápidas
- [ ] Setup vector extension para embeddings

### Fase 2: Core Pages (Semanas 3-4)
#### 2.1 Página de Licencia (Plantilla)
```typescript
// app/licencia-[oficio]-[estado]/page.tsx
interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  // Generar params para ISR
  return pages.map(page => ({ slug: page.slug }))
}

export default async function LicensePage({ params }: Props) {
  const data = await getLicenseData(params.slug)
  
  return (
    <article className="prose prose-lg max-w-4xl mx-auto">
      <LicenseHeader data={data} />
      <RequirementsSection data={data.requirements} />
      <SchoolsTable data={data.schools} />
      <FAQSection faqs={data.faqs} />
      <LeadCaptureForm pageId={data.id} />
    </article>
  )
}
```

#### 2.2 Página de Escuela
```typescript
// app/escuela-[slug]/page.tsx
export default async function SchoolPage({ params }: Props) {
  const school = await getSchoolBySlug(params.slug)
  const programs = await getPrograms(school.id)
  
  return (
    <SchoolProfile 
      school={school} 
      programs={programs}
      relatedLicenses={getRelatedLicenses(school.state_id)}
    />
  )
}
```

#### 2.3 Homepage y Navegación
- [ ] Homepage con búsqueda por oficio/estado
- [ ] Landing pages por oficio (/electricista/, /cdl/, /cosmetologia/)
- [ ] Landing pages por estado (/texas/, /california/)
- [ ] sitemap.xml dinámico

### Fase 3: Automatización IA (Semanas 5-6)
#### 3.1 Sistema de Generación de Contenido

```
┌─────────────────────────────────────────────────────────┐
│              PIPELINE DE GENERACIÓN IA                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. INPUT: trade_id + state_id                         │
│     ↓                                                   │
│  2. SCRAPER: Fuentes oficiales (.gov, state agencies)  │
│     - Playwright para JS rendering                     │
│     - BeautifulSoup para HTML parsing                  │
│     ↓                                                   │
│  3. DATA: Requisitos extraídos                         │
│     { age, hours, fees, documents, exam_info }        │
│     ↓                                                   │
│  4. SCHOOLS: Google CSE + scraping de sitios           │
│     Filtrar: is_bilingual = true                       │
│     ↓                                                   │
│  5. CLAUDE API: Generate Markdown                       │
│     Prompt optimizado para SEO hispanohablantes       │
│     ↓                                                   │
│  6. VALIDATION: Zod schema validation                  │
│     ↓                                                   │
│  7. OUTPUT: license_pages + schools + programs        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 3.2 Prompt para Generación de Contenido
```python
SYSTEM_PROMPT = """
Eres un experto en licencias y certificaciones de oficios en EE.UU. 
Escribas para hispanohablantes que viven en Estados Unidos.

Reglas:
1. Tono: Profesional pero accesible, sin jerga excesiva
2. Formato: Markdown con headers claros, listas cuando sea útil
3. SEO: Incluir keywords naturalmente
4. Longitud: 1500-2500 palabras mínimo
5. Fuentes: Citar siempre las URLs oficiales
6. Cierre: CTA claro para lead capture
"""

USER_PROMPT = """
Genera el contenido para la página de licencia de {trade} en {state}.

Datos oficiales scrapeados:
{scrape_data}

Escuelas bilingües encontradas:
{schools_data}

Estructura requerida:
1. ## Introducción (contexto para hispanos)
2. ## Requisitos Oficiales (edad, horas, documentos, fees)
3. ## Proceso Paso a Paso
4. ## Escuelas con Programas en Español
5. ## Preguntas Frecuentes (5-7 preguntas basadas en GSC)
6. ## Fuentes Oficiales
7. ## ¿Necesitas Ayuda?
"""

#### 3.3 Scheduler de Actualización
```python
# scripts/monthly_update.py
def monthly_update():
    """Actualiza contenido cuando hay cambios oficiales"""
    for state in states:
        for trade in trades:
            # Checkear si hay updates en fuentes oficiales
            if has_official_updates(state.code, trade.slug):
                new_data = scrape_official_sources(state.code, trade.slug)
                if new_data != current_data:
                    regenerate_content(new_data)
                    trigger_revalidate(state.trade_slug)
```

### Fase 4: SEO Técnico (Semanas 7-8)
#### 4.1 Meta Tags Dinámicos
```typescript
// app/licencia-[slug]/generateMetadata.ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getLicensePage(params.slug)
  
  return {
    title: `Licencia de ${page.trade_name} en ${page.state_name} ${new Date().getFullYear()}: Requisitos y Escuelas`,
    description: page.meta_description,
    openGraph: {
      title: page.meta_title,
      description: page.meta_description,
      type: 'article',
      publishedTime: page.updated_at,
    },
    other: {
      'script:ld+json': generateFAQSchema(page.faqs),
    }
  }
}
```

#### 4.2 Sitemap Dinámico
```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPublishedPages()
  
  return pages.map(page => ({
    url: `https://chambaenusa.com/${page.slug}`,
    lastModified: page.updated_at,
    changeFrequency: 'weekly',
    priority: calculatePriority(page),
  }))
}
```

#### 4.3 Structured Data (Schema.org)
- [ ] FAQPage schema en todas las páginas
- [ ] BreadcrumbList schema
- [ ] LocalBusiness schema para escuelas
- [ ] Article schema para contenido

### Fase 5: Lead Capture y CRM (Semanas 9-10)
#### 5.1 Sistema de Leads
```
┌─────────────────────────────────────────────────────────┐
│              FLOW DE CAPTURA DE LEADS                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Usuario llega a página                                 │
│     ↓                                                   │
│  Interactúa con contenido (scroll 50%)                  │
│     ↓                                                   │
│  Muestra inline form o popup contextual                │
│     ↓                                                   │
│  Captura: nombre, email, tel, estado, oficio           │
│     ↓                                                   │
│  Valida y guarda en Supabase + Airtable                │
│     ↓                                                   │
│  Email confirmación vía Resend                         │
│     ↓                                                   │
│  Drip campaign según oficio/estado                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 5.2 Form Components
```typescript
// components/LeadCaptureForm.tsx
'use client'

export function LeadCaptureForm({ pageId, trade, state }: Props) {
  const [step, setStep] = useState(1)
  
  return (
    <Card>
      {step === 1 && (
        <Form
          fields={['nombre', 'email', 'telefono']}
          onSubmit={handleSubmit}
          trade={trade}
          state={state}
          sourcePage={pageId}
        />
      )}
      {step === 2 && <Confirmation />}
    </Card>
  )
}
```

#### 5.3 Integración CRM
- [ ] Setup Airtable base para leads
- [ ] Integración con Resend para emails
- [ ] Drip campaigns según triggers
- [ ] Dashboard de leads en admin

### Fase 6: Contenido Adicional (Semanas 11-12)
#### 6.1 Calculadoras Interactivas
- [ ] Calculadora de costos totales (licencia + escuela + examenes)
- [ ] Estimador de tiempo para completar requisitos
- [ ] Comparador de requisitos entre estados

#### 6.2 Herramientas SEO
- [ ] Generador de contenido para páginas longue tail
- [ ] Templates para contenido deoficio (hub pages)
- [ ] Templates para guías paso a paso

#### 6.3 Blog/Recursos
- [ ] Sección de guías generales
- [ ] Calculator de salarios por oficio/estado
- [ ] Comparativas entre oficios

---

## 📈 Estrategia SEO Detallada

### Keywords Prioritarias (por volumen)

| Keyword | Volumen | Dificultad | Prioridad |
|---------|---------|------------|-----------|
| licencia de cosmetología | 578 | Media | 🔴 Alta |
| licencia de electricista | 257 | Media | 🔴 Alta |
| tdlr que es | 94 | Baja | 🟡 Media |
| licencia cdl | 56 | Alta | 🔴 Alta |
| como sacar licencia electricista | 36 | Baja | 🔴 Alta |
| licencia electricista florida | 39 | Media | 🟡 Media |

### Optimización de Titles

| Página | Title Actual | Title Optimizado |
|--------|--------------|------------------|
| Cosmetología TX | default WP | Licencia de Cosmetología en Texas 2026: Requisitos y Escuelas Bilingües |
| Electricista AZ | default WP | Licencia de Electricista en Arizona: Requisitos Oficiales y Programas en Español |
| CDL CA | default WP | Licencia CDL en California 2026: Requisitos, Costos y Cómo Obtenerla |

### Internal Linking Strategy
```
Homepage
├── /oficio/electricista/ (hub page)
│   ├── /licencia-electricista-texas/
│   ├── /licencia-electricista-california/
│   ├── /licencia-electricista-florida/
│   └── /licencia-electricista-new-york/
├── /oficio/cdl/
├── /oficio/cosmetologia/
└── /oficio/hvac/
```

---

## 🔄 Migración de WordPress a Next.js

### Checklist de Migración

- [ ] Backup completo de WordPress (ya tienes los exports XML)
- [ ] Configurar dominio en Vercel
- [ ] Setup redirects 301 para todas las URLs
- [ ] Mantener mismo slugs: `/licencia-[oficio]-[estado]/`
- [ ] Exportar imágenes a Vercel Blob o AWS S3
- [ ] Crear script de import de contenido WP a Supabase
- [ ] Test de redirects con CheckMyNames
- [ ] Verificar canonical URLs

### URLs a Mantener
```
WordPress: /licencia-cosmetologia-texas/
Next.js:   /licencia-cosmetologia-texas/ (mismo slug)
```

---

## 📊 Métricas de Éxito (3 meses)

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Páginas indexadas | ~30 | 500+ |
| CTR promedio | 1% | 5% |
| Posición promedio | 8.5 | 3 |
| Leads diarios | ? | 20 |
| Core Web Vitals | ? | 90+ |
| Velocidad TTFB | ? | <500ms |

---

## 🛠️ Stack de Desarrollo

### Herramientas Requeridas
```
Core:
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Shadcn/UI
- Supabase
- Vercel

AI:
- Claude API (Anthropic)
- OpenAI Embeddings (opcional)

Scraping:
- Playwright
- BeautifulSoup
- Cheerio

CRM/Email:
- Airtable (o HubSpot)
- Resend
- Loops (opcional)

Analytics:
- Google Analytics 4
- Google Search Console
- Vercel Analytics
```

---

## 📅 Timeline General

| Fase | Duración | Entregables |
|------|----------|-------------|
| 1. Fundamentos | 2 semanas | Proyecto setup, DB, migración contenido |
| 2. Core Pages | 2 semanas | Templates de licencia y escuela |
| 3. Automatización IA | 2 semanas | Pipeline de generación de contenido |
| 4. SEO Técnico | 2 semanas | Meta tags, sitemap, schema |
| 5. Leads/CRM | 2 semanas | Sistema de captura y dashboard |
| 6. Extras | 2 semanas | Calculadoras, blog, optimización |
| **Total** | **12 semanas** | **MVP completo** |

---

## 🎯 Próximos Pasos Inmediatos

1. **Esta semana:** Aprobación del plan
2. **Semana 1:** Setup del proyecto y base de datos
3. **Semana 2:** Migración de contenido existente
4. **Semana 3-4:** Templates y páginas core
5. **Semana 5-6:** Automatización IA

---

*Plan creado el 2026-02-05 basado en analytics del sitio WordPress actual.*
