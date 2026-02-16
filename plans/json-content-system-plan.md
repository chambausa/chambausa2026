# Plan: Sistema de Contenido Basado en JSON

## Objetivo
Construir componentes React genéricos que lean data estructurada desde archivos JSON verificados para páginas de licencias.

## Archivos de Entrada
- Ubicación: `archivos_json/`
- Formato: `[{oficio}-{estado}].json` (ej: `cosmetologia-texas.json`)
- Estructura: Meta datos SEO, hero, roadmap, costos, FAQs, links oficiales

## Componentes a Construir

### 1. LicensePageJSON (page.tsx)
- Lee el JSON según el slug de la URL
- Renderiza componentes genéricos según la estructura del JSON
- Maneja campos `ai_generated: true` para generación dinámica

### 2. HeroSection (components/hero-section.tsx)
```typescript
interface HeroProps {
  badge: string;
  headline: string;
  subheadline: string;
  key_stats: {
    label: string;
    value: string;
    detail: string;
    source: string;
    source_name: string;
  }[];
  cta_primary: { text: string; anchor: string };
  cta_secondary: { text: string; anchor: string };
}
```

### 3. RoadmapGrid (components/roadmap-grid.tsx)
- Grid de tarjetas para tipos de licencia
- Muestra: título, descripción, requisitos, costos, exámenes
- Colores dinámicos según `color_badge`

### 4. CostCalculator (components/cost-calculator.tsx)
- Escenarios interactivos por tipo de licencia
- Muestra inversión total, tiempo, ROI

### 5. FAQSection (components/faq-section.tsx)
- Lee FAQs del JSON
- Accordion collapsible

### 6. AuthorityInfo (components/authority-info.tsx)
- Datos de la autoridad reguladora (TDLR, etc.)
- Links oficiales, teléfono, verificación

## Estructura del JSON
```json
{
  "_meta": { "schema_version", "page_id", "oficio", "estado", "verified_by" },
  "page_seo": { "title", "meta_description", "slug", "keywords" },
  "hero": { "badge", "headline", "subheadline", "key_stats", "cta" },
  "roadmap": { "layout", "tipos": [{ "id", "titulo", "requisitos", "costos", "examen" }] },
  "calculadora_inversion": { "escenarios": [{ "id", "inversion", "tiempo", "salario" }] },
  "faqs": [ { "question", "answer" } ],
  "autoridad_reguladora": { "nombre", "telefono", "web", "verificar_licencia" }
}
```

## Campos AI-Generated
- `callout_espanol.content` - contenido explicativo generado
- `ingresos_reales.factores_adicionales` - detalles adicionales
- Cualquier campo con `"ai_generated": true`

## Próximos Pasos
1. Crear carpeta `components/license/`
2. Implementar tipos TypeScript en `types/license-json.ts`
3. Crear componentes genéricos
4. Actualizar page.tsx para leer JSON
5. Agregar más archivos JSON para otras licencias
