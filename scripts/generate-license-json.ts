/**
 * Script para generar contenido JSON de licencias usando la API de Claude
 *
 * Uso:
 *   npx tsx scripts/generate-license-json.ts <oficio> <estado>
 *
 * Ejemplo:
 *   npx tsx scripts/generate-license-json.ts plomero texas
 *   npx tsx scripts/generate-license-json.ts hvac florida
 *   npx tsx scripts/generate-license-json.ts cdl texas
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load env from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const OFICIOS_VALIDOS = ['electricista', 'cosmetologia', 'cdl', 'hvac', 'plomero'] as const
const ESTADOS_VALIDOS = ['texas', 'california', 'florida', 'new-york', 'arizona', 'illinois', 'nevada', 'colorado', 'georgia', 'north-carolina'] as const

// Map oficios to example files (pick the most similar existing one)
const EXAMPLE_MAP: Record<string, string> = {
  electricista: 'electricista-texas.json',
  cosmetologia: 'cosmetologia-texas.json',
  cdl: 'cdl-california.json',
  hvac: 'electricista-texas.json',    // closest trade
  plomero: 'electricista-texas.json', // closest trade
}

function printUsage() {
  console.log(`
╔══════════════════════════════════════════════════════╗
║   Generador de Contenido JSON - ChambaEnUSA         ║
║   Usa la API de Claude (Sonnet) para generar         ║
║   páginas de licencias completas                     ║
╚══════════════════════════════════════════════════════╝

Uso:
  npx tsx scripts/generate-license-json.ts <oficio> <estado>

Oficios disponibles:
  ${OFICIOS_VALIDOS.join(', ')}

Estados disponibles:
  ${ESTADOS_VALIDOS.join(', ')}

Ejemplo:
  npx tsx scripts/generate-license-json.ts plomero texas
  npx tsx scripts/generate-license-json.ts hvac florida
`)
}

function loadSchema(): string {
  const schemaPath = path.join(process.cwd(), 'types', 'license-json.types.ts')
  return fs.readFileSync(schemaPath, 'utf-8')
}

function loadExample(oficio: string): string {
  const exampleFile = EXAMPLE_MAP[oficio] || 'cdl-california.json'
  const examplePath = path.join(process.cwd(), 'archivos_json', exampleFile)
  return fs.readFileSync(examplePath, 'utf-8')
}

function buildPrompt(oficio: string, estado: string, schema: string, example: string): string {
  const year = new Date().getFullYear()
  const estadoCapitalized = estado.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const oficioCapitalized = oficio.charAt(0).toUpperCase() + oficio.slice(1)

  return `Genera un archivo JSON completo para la página de licencia de ${oficioCapitalized} en ${estadoCapitalized}, USA.

## INSTRUCCIONES CRÍTICAS

1. **INVESTIGA datos reales**: Busca en tu conocimiento las fuentes oficiales (.gov) del estado de ${estadoCapitalized} para la licencia de ${oficioCapitalized}. Incluye URLs reales de sitios .gov cuando las conozcas.

2. **Sigue EXACTAMENTE este schema TypeScript**:
\`\`\`typescript
${schema}
\`\`\`

3. **Aquí tienes un EJEMPLO COMPLETO** de otro oficio/estado para que copies la estructura exacta:
\`\`\`json
${example}
\`\`\`

4. **Reglas del JSON**:
   - \`_meta.schema_version\` debe ser "2.0"
   - \`_meta.oficio\` debe ser "${oficio}" (lowercase)
   - \`_meta.estado\` debe ser "${estado}" (lowercase)
   - \`_meta.last_verified\` debe ser "${year}-02-16"
   - \`_meta.verified_by\` debe ser "Claude AI - requiere verificación humana"
   - \`page_seo.slug\` debe ser "licencia-${oficio}-${estado}"
   - \`page_seo.canonical_url\` debe ser "https://chambaenusa.com/licencia-${oficio}-${estado}/"
   - Marca \`ai_generated: true\` en TODAS las secciones
   - Incluye al menos 3-4 tipos de licencia en el roadmap (si aplica al oficio)
   - Incluye al menos 6-8 FAQs relevantes para hispanohablantes
   - Incluye datos de salarios del BLS (Bureau of Labor Statistics)
   - Incluye sección de errores comunes (errores_comunes)
   - Incluye sección de links oficiales (links_oficiales)
   - Las keywords deben ser en español, enfocadas en hispanohablantes en USA
   - El tono debe ser profesional pero accesible para hispanohablantes

5. **Secciones requeridas** (TODAS deben estar presentes):
   - _meta
   - page_seo
   - hero
   - callout_espanol (si el examen está disponible en español, destacarlo; si no, advertirlo)
   - autoridad_reguladora
   - roadmap (con tipos de licencia)
   - calculadora_inversion
   - renovacion
   - reciprocidad
   - salarios
   - errores_comunes
   - faqs
   - links_oficiales
   - enlaces_utiles

6. **IMPORTANTE**: Responde SOLO con el JSON válido. Sin texto antes ni después. Sin markdown code fences. Solo el JSON puro.`
}

function extractJSON(response: string): Record<string, unknown> {
  // Try direct parse first
  let text = response.trim()

  // Remove markdown code fences if present
  if (text.startsWith('```json')) {
    text = text.slice(7)
  } else if (text.startsWith('```')) {
    text = text.slice(3)
  }
  if (text.endsWith('```')) {
    text = text.slice(0, -3)
  }
  text = text.trim()

  return JSON.parse(text)
}

function validateJSON(json: Record<string, unknown>, oficio: string, estado: string): string[] {
  const errors: string[] = []
  const requiredSections = ['_meta', 'page_seo', 'hero', 'roadmap', 'faqs', 'salarios']

  for (const section of requiredSections) {
    if (!json[section]) {
      errors.push(`Falta sección requerida: ${section}`)
    }
  }

  // Validate _meta
  const meta = json._meta as Record<string, unknown> | undefined
  if (meta) {
    if (meta.oficio !== oficio) errors.push(`_meta.oficio debería ser "${oficio}", es "${meta.oficio}"`)
    if (meta.estado !== estado) errors.push(`_meta.estado debería ser "${estado}", es "${meta.estado}"`)
  }

  // Validate roadmap has tipos
  const roadmap = json.roadmap as Record<string, unknown> | undefined
  if (roadmap) {
    const tipos = roadmap.tipos as unknown[] | undefined
    if (!tipos || tipos.length === 0) {
      errors.push('roadmap.tipos está vacío')
    }
  }

  // Validate FAQs
  const faqs = json.faqs as Record<string, unknown> | undefined
  if (faqs) {
    const items = faqs.items as unknown[] | undefined
    if (!items || items.length < 3) {
      errors.push(`faqs.items tiene ${items?.length || 0} preguntas (mínimo 3)`)
    }
  }

  return errors
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2 || args.includes('--help') || args.includes('-h')) {
    printUsage()
    process.exit(args.includes('--help') || args.includes('-h') ? 0 : 1)
  }

  const oficio = args[0].toLowerCase()
  const estado = args[1].toLowerCase()

  // Validate inputs
  if (!OFICIOS_VALIDOS.includes(oficio as typeof OFICIOS_VALIDOS[number])) {
    console.error(`\n❌ Oficio "${oficio}" no válido. Opciones: ${OFICIOS_VALIDOS.join(', ')}`)
    process.exit(1)
  }

  // Check API key
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('\n❌ ANTHROPIC_API_KEY no encontrada en .env.local')
    process.exit(1)
  }

  // Check if file already exists
  const outputPath = path.join(process.cwd(), 'archivos_json', `${oficio}-${estado}.json`)
  if (fs.existsSync(outputPath)) {
    console.log(`\n⚠️  El archivo ${oficio}-${estado}.json ya existe.`)
    console.log('   Sobrescribiendo...\n')
  }

  console.log(`\n🚀 Generando contenido para: ${oficio} en ${estado}`)
  console.log(`   Modelo: claude-sonnet-4-5-20250929`)
  console.log(`   Ejemplo base: ${EXAMPLE_MAP[oficio] || 'cdl-california.json'}`)
  console.log('')

  // Load schema and example
  const schema = loadSchema()
  const example = loadExample(oficio)

  // Build prompt
  const prompt = buildPrompt(oficio, estado, schema, example)

  console.log(`📤 Enviando prompt (${Math.round(prompt.length / 1024)}KB) a Claude API...`)
  console.log('   Esto puede tomar 30-60 segundos...\n')

  const client = new Anthropic({ apiKey })

  const startTime = Date.now()

  const message = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 16000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`✅ Respuesta recibida en ${elapsed}s`)

  // Extract text
  const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

  if (!responseText) {
    console.error('❌ La respuesta está vacía')
    process.exit(1)
  }

  // Parse JSON
  console.log('🔍 Parseando JSON...')
  let json: Record<string, unknown>
  try {
    json = extractJSON(responseText)
  } catch (e) {
    console.error('❌ Error parseando JSON:', (e as Error).message)
    // Save raw response for debugging
    const debugPath = path.join(process.cwd(), 'archivos_json', `${oficio}-${estado}.debug.txt`)
    fs.writeFileSync(debugPath, responseText)
    console.error(`   Respuesta raw guardada en: ${debugPath}`)
    process.exit(1)
  }

  // Validate
  console.log('✔️  Validando estructura...')
  const errors = validateJSON(json, oficio, estado)
  if (errors.length > 0) {
    console.warn('\n⚠️  Advertencias de validación:')
    errors.forEach(err => console.warn(`   - ${err}`))
    console.warn('')
  }

  // Save
  const formatted = JSON.stringify(json, null, 4)
  fs.writeFileSync(outputPath, formatted, 'utf-8')
  console.log(`\n💾 Guardado: archivos_json/${oficio}-${estado}.json (${Math.round(formatted.length / 1024)}KB)`)

  // Usage stats
  console.log(`\n📊 Tokens usados:`)
  console.log(`   Input:  ${message.usage.input_tokens.toLocaleString()}`)
  console.log(`   Output: ${message.usage.output_tokens.toLocaleString()}`)

  // Instructions for next steps
  const slug = `${oficio}-${estado}`
  console.log(`
╔══════════════════════════════════════════════════════╗
║   ✅ Archivo generado exitosamente                   ║
╚══════════════════════════════════════════════════════╝

Próximos pasos:

1. REVISA el contenido generado:
   archivos_json/${oficio}-${estado}.json

2. AGREGA el import a lib/json-loader.ts:
   '${slug}': () => import('@/archivos_json/${slug}.json'),

3. AGREGA a generateStaticParams en app/licencia-[slug]/page.tsx:
   { slug: '${slug}' },

4. AGREGA a generateStaticParams en app/[slug]/page.tsx:
   { slug: 'licencia-${slug}' },

5. PRUEBA en el navegador:
   http://localhost:3001/licencia-${slug}
`)
}

main().catch((err) => {
  console.error('\n❌ Error fatal:', err.message || err)
  process.exit(1)
})
