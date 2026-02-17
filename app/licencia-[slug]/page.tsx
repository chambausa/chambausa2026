import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLicensePageBySlug, getAllPublishedPages } from '@/lib/db/queries'
import { LeadCaptureForm } from '@/components/lead-capture-form'
import { LicenseHeader } from '@/components/license/license-header'
import { RequirementsSection } from '@/components/license/requirements-section'
import { SchoolsTable } from '@/components/license/schools-table'
import { FAQSection } from '@/components/license/faq-section'
import { HeroSection } from '@/components/license/hero-section'
import { RoadmapGrid } from '@/components/license/roadmap-grid'
import { CalloutEspanol } from '@/components/license/callout-espanol'
import { CommonMistakes } from '@/components/license/common-mistakes'
import { SalarySection } from '@/components/license/salary-section'
import { RegulatoryAuthority } from '@/components/license/regulatory-authority'
import { OfficialLinks } from '@/components/license/official-links'
import { TableOfContents } from '@/components/license/table-of-contents'
import { RenewalSection } from '@/components/license/renewal-section'
import { ReciprocitySection } from '@/components/license/reciprocity-section'
import { ServicesWithoutLicense } from '@/components/license/services-without-license'
// import { SchemaMarkup } from '@/components/license/schema-markup' // Temporarily disabled
import { loadLicenseJSON } from '@/lib/json-loader'
import type { HeroSection as HeroType, Roadmap, FAQSection as FAQSectionType } from '@/types/license-json.types'

interface Props {
  params: Promise<{ slug: string }>
}

// ISR: Revalidate every hour
export const revalidate = 3600

// Generate static params for top pages
export async function generateStaticParams() {
  let dbSlugs: Array<{ slug: string }> = []

  try {
    const pages = await Promise.race<Awaited<ReturnType<typeof getAllPublishedPages>>>([
      getAllPublishedPages(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Supabase timeout')), 1500)
      ),
    ])
    dbSlugs = pages.slice(0, 50).map((page: { slug: string }) => ({
      slug: page.slug,
    }))
  } catch {
    dbSlugs = []
  }

  // All JSON-based pages (slug WITHOUT 'licencia-' prefix since it's in the route)
  const jsonSlugs = [
    { slug: 'electricista-texas' },
    { slug: 'electricista-california' },
    { slug: 'electricista-florida' },
    { slug: 'electricista-newyork' },
    { slug: 'electricista-new-york' },
    { slug: 'electricista-arizona' },
    { slug: 'cosmetologia-texas' },
    { slug: 'cosmetologia-california' },
    { slug: 'cosmetologia-florida' },
    { slug: 'cosmetologia-new-york' },
    { slug: 'cdl-california' },
    { slug: 'plomero-texas' },
    { slug: 'plomero-california' },
    { slug: 'plomero-florida' },
    { slug: 'hvac-texas' },
    { slug: 'hvac-california' },
    { slug: 'cdl-texas' },
    { slug: 'electricista-georgia' },
    { slug: 'electricista-pennsylvania' },
    { slug: 'electricista-washington' },
    { slug: 'electricista-colorado' },
    { slug: 'hvac-new-york' },
    { slug: 'electricista-nevada' },
    { slug: 'electricista-illinois' },
    { slug: 'electricista-minnesota' },
    { slug: 'electricista-oregon' },
    { slug: 'hvac-florida' },
    { slug: 'electricista-new-mexico' },
    { slug: 'hvac-arizona' },
    { slug: 'cdl-florida' },
    { slug: 'cdl-new-york' },
    { slug: 'plomero-new-york' },
  ]

  return [...dbSlugs, ...jsonSlugs]
}

// Load JSON content dynamically using the centralized loader
async function loadJSONContent(slug: string) {
  // slug arrives WITHOUT 'licencia-' prefix (e.g. 'cosmetologia-texas')
  // loadLicenseJSON handles both with and without the prefix
  return loadLicenseJSON(slug)
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  // Try JSON first
  const jsonData = await loadJSONContent(slug)
  
  if (jsonData) {
    const seo = (jsonData as Record<string, unknown>).page_seo as { title: string; meta_description: string; canonical_url: string; keywords_primary: string[]; keywords_secondary: string[]; keywords_long_tail: string[] }
    return {
      title: seo.title,
      description: seo.meta_description,
      openGraph: {
        title: seo.title,
        description: seo.meta_description,
        type: 'article',
      },
      alternates: {
        canonical: seo.canonical_url,
      },
      keywords: [
        ...seo.keywords_primary,
        ...seo.keywords_secondary,
        ...seo.keywords_long_tail,
      ].join(', '),
    }
  }

  // Fallback to Supabase
  const page = await getLicensePageBySlug(slug)
  
  if (!page) {
    return {
      title: 'Página no encontrada',
    }
  }

  const tradeName = page.trade?.name_es || 'Oficio'
  const stateName = page.state?.name_es || 'Estado'
  const year = new Date().getFullYear()

  return {
    title: `Licencia de ${tradeName} en ${stateName} ${year}: Requisitos y Escuelas`,
    description: page.meta_description || `Obtén información completa sobre los requisitos oficiales para obtener la licencia de ${tradeName} en ${stateName}. Encuentra escuelas bilingües y comienza tu carrera hoy.`,
    openGraph: {
      title: `Licencia de ${tradeName} en ${stateName}`,
      description: `Requisitos, costos y escuelas para ${tradeName} en ${stateName}.`,
      type: 'article',
      publishedTime: page.updated_at || undefined,
    },
    alternates: {
      canonical: `https://chambaenusa.com/${page.slug}`,
    },
  }
}

export default async function LicensePage({ params }: Props) {
  const { slug } = await params

  console.log('[LicensePage] Slug received:', slug)

  // Try JSON first
  const jsonData = await loadJSONContent(slug)
  console.log('[LicensePage] JSON Data loaded:', jsonData ? 'YES' : 'NO')

  // If JSON exists, render JSON-based page
  if (jsonData) {
    const json = jsonData as Record<string, unknown>
    const _meta = json._meta as { estado: string; oficio: string }
    const hero = json.hero as HeroType
    const roadmap = json.roadmap as Roadmap
    const faqsData = json.faqs as FAQSectionType
    const faqs = faqsData?.items?.map(item => ({ question: item.pregunta, answer: item.respuesta })) || []

    const estado = _meta.estado.charAt(0).toUpperCase() + _meta.estado.slice(1)
    const oficio = _meta.oficio.charAt(0).toUpperCase() + _meta.oficio.slice(1)

    // Extract all sections from JSON
    const calloutEspanol = json.callout_espanol as any
    const erroresComunes = json.errores_comunes as any
    const salarios = json.salarios as any
    const autoridadReguladora = json.autoridad_reguladora as any
    const linksOficiales = json.links_oficiales as any
    const renovacion = json.renovacion as any
    const reciprocidad = json.reciprocidad as any
    const serviciosSinLicencia = json.servicios_sin_licencia as any

    // Debug logs
    console.log('[DEBUG] Sections loaded:', {
      calloutEspanol: !!calloutEspanol,
      erroresComunes: !!erroresComunes,
      salarios: !!salarios,
      autoridadReguladora: !!autoridadReguladora,
      linksOficiales: !!linksOficiales,
      renovacion: !!renovacion,
      reciprocidad: !!reciprocidad,
      serviciosSinLicencia: !!serviciosSinLicencia,
    })

    // Table of contents items
    const tocItems = [
      { id: 'hero', title: 'Resumen', icon: '📋' },
      { id: 'roadmap', title: 'Tipos de Licencia', icon: '🎯' },
      calloutEspanol && { id: 'examen-espanol', title: 'Examen en Español', icon: '💬' },
      salarios && { id: 'salarios', title: 'Salarios', icon: '💰' },
      autoridadReguladora && { id: 'autoridad-reguladora', title: 'Autoridad Reguladora', icon: '🏛️' },
      erroresComunes && { id: 'errores-comunes', title: 'Errores Comunes', icon: '⚠️' },
      serviciosSinLicencia && { id: 'sin-licencia', title: 'Sin Licencia', icon: '✅' },
      renovacion && { id: 'renovacion', title: 'Renovación', icon: '🔄' },
      reciprocidad && { id: 'reciprocidad', title: 'Transferencia', icon: '🌎' },
      { id: 'faqs', title: 'Preguntas Frecuentes', icon: '❓' },
      linksOficiales && { id: 'enlaces-oficiales', title: 'Enlaces Oficiales', icon: '🔗' },
    ].filter(Boolean) as Array<{ id: string; title: string; icon: string }>

    return (
      <article className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <a href="/" className="hover:text-primary">Inicio</a>
          <span className="mx-2">/</span>
          <a href={`/oficio/${_meta.oficio}`} className="hover:text-primary">{oficio}</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{estado}</span>
        </nav>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <TableOfContents items={tocItems} />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Hero Section from JSON */}
            <div id="hero">
              <HeroSection hero={hero} />
            </div>

            {/* Callout Español - High priority */}
            {calloutEspanol && (
              <CalloutEspanol callout={calloutEspanol} />
            )}

            {/* Roadmap Grid from JSON */}
            <div className="mt-12" id="roadmap">
              <RoadmapGrid roadmap={roadmap} oficio={oficio} />
            </div>

            {/* Salarios */}
            {salarios && (
              <div className="mt-12">
                <SalarySection salarios={salarios} />
              </div>
            )}

            {/* Regulatory Authority */}
            {autoridadReguladora && (
              <div className="mt-12">
                <RegulatoryAuthority autoridad={autoridadReguladora} />
              </div>
            )}

            {/* Common Mistakes */}
            {erroresComunes && (
              <div className="mt-12">
                <CommonMistakes mistakes={erroresComunes} />
              </div>
            )}

            {/* Services Without License */}
            {serviciosSinLicencia && (
              <div className="mt-12">
                <ServicesWithoutLicense servicios={serviciosSinLicencia} />
              </div>
            )}

            {/* Renewal */}
            {renovacion && (
              <div className="mt-12">
                <RenewalSection renovacion={renovacion} />
              </div>
            )}

            {/* Reciprocity */}
            {reciprocidad && (
              <div className="mt-12">
                <ReciprocitySection reciprocidad={reciprocidad} />
              </div>
            )}

            {/* FAQs from JSON */}
            {faqs && faqs.length > 0 && (
              <div className="mt-12" id="faqs">
                <FAQSection faqs={faqs} oficio={oficio} estado={estado} />
              </div>
            )}

            {/* Official Links */}
            {linksOficiales && (
              <div className="mt-12">
                <OfficialLinks links={linksOficiales} />
              </div>
            )}

            {/* Lead Capture Form */}
            <div className="mt-12">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  ¿Listo para comenzar?
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Te conectamos con escuelas bilingües que pueden ayudarte
                </p>
                <LeadCaptureForm
                  pageId={slug}
                  tradeId={_meta.oficio}
                  stateId={_meta.estado}
                  trade={oficio}
                  state={estado}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Schema Markup for SEO - Temporarily disabled due to hydration issues */}
        {/* TODO: Move to metadata or fix hydration */}
        {/* <SchemaMarkup
          pageUrl={`https://chambaenusa.com/${slug}`}
          title={hero.headline}
          description={hero.subheadline}
          breadcrumbs={[
            { name: 'Inicio', url: 'https://chambaenusa.com/' },
            { name: oficio, url: `https://chambaenusa.com/oficio/${_meta.oficio}` },
            { name: `${oficio} en ${estado}`, url: `https://chambaenusa.com/${slug}` },
          ]}
          faqs={faqs}
          howToSteps={roadmap.tipos[0]?.como_aplicar?.pasos?.map((paso, index) => ({
            name: `Paso ${index + 1}`,
            text: paso,
          }))}
          organization={autoridadReguladora ? {
            name: autoridadReguladora.nombre,
            url: autoridadReguladora.web,
            telephone: autoridadReguladora.telefono?.toll_free || autoridadReguladora.telefono?.local,
            address: autoridadReguladora.direccion ? {
              streetAddress: autoridadReguladora.direccion.calle,
              addressLocality: autoridadReguladora.direccion.ciudad,
              addressRegion: autoridadReguladora.direccion.estado,
              postalCode: autoridadReguladora.direccion.cp,
            } : undefined,
          } : undefined}
        /> */}
      </article>
    )
  }

  // Fallback to Supabase-based page
  const page = await getLicensePageBySlug(slug)
  
  if (!page) {
    notFound()
  }

  const tradeName = page.trade?.name_es || 'Oficio'
  const stateName = page.state?.name_es || 'Estado'

  // Parse content for FAQ extraction
  const faqs = extractFAQs(page.content_md || '')

  return (
    <article className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary">Inicio</a>
        <span className="mx-2">/</span>
        <a href={`/oficio/${page.trade?.slug}`} className="hover:text-primary">{tradeName}</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{stateName}</span>
      </nav>

      {/* Header */}
      <LicenseHeader 
        trade={tradeName}
        state={stateName}
        lastUpdated={page.last_updated || undefined}
      />

      {/* Main Content with sidebar */}
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Requirements */}
          {page.requirements && (
            <RequirementsSection 
              requirements={page.requirements}
              trade={tradeName}
              state={stateName}
            />
          )}

          {/* Schools */}
          {page.schools && page.schools.length > 0 && (
            <SchoolsTable 
              schools={page.schools}
              trade={tradeName}
              state={stateName}
            />
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <FAQSection 
              faqs={faqs}
            />
          )}

          {/* Source */}
          {page.requirements?.source_url && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm">
              <p className="font-semibold mb-2">Fuente oficial:</p>
              <a 
                href={page.requirements.source_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {page.requirements.source_url}
              </a>
              <p className="text-gray-500 mt-2">
                Última actualización: {page.requirements.source_updated_at || 'Desconocida'}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar - Lead Capture */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <LeadCaptureForm 
              pageId={page.id}
              tradeId={page.trade_id}
              stateId={page.state_id}
              trade={tradeName}
              state={stateName}
            />
          </div>
        </aside>
      </div>
    </article>
  )
}

// Helper to extract FAQs from markdown
function extractFAQs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  const faqRegex = /### (.+?)\n([\s\S]*?)(?=### |## |\z)/g
  let match
  
  while ((match = faqRegex.exec(content)) !== null) {
    if (match[1].toLowerCase().includes('pregunta') || match[1].toLowerCase().includes('faq')) {
      faqs.push({
        question: match[1].replace(/pregunta \d+:|faq:/i, '').trim(),
        answer: match[2].trim(),
      })
    }
  }
  
  return faqs
}
