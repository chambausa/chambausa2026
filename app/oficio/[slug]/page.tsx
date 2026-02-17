import type { Metadata } from 'next'
import Link from 'next/link'

const OFICIOS: Record<string, {
  name: string
  icon: string
  description: string
  overview: string
  licenses: { state: string; stateCode: string; slug: string; highlight: string }[]
}> = {
  electricista: {
    name: 'Electricista',
    icon: '⚡',
    description: 'Guía completa de licencias de electricista en Estados Unidos para hispanos.',
    overview: 'La licencia de electricista es una de las más demandadas en EE.UU. Los requisitos varían por estado, pero generalmente incluyen horas de experiencia supervisada y aprobar un examen. Los salarios son competitivos y la demanda sigue creciendo.',
    licenses: [
      { state: 'Texas', stateCode: 'TX', slug: 'licencia-electricista-texas', highlight: '8,000 horas + examen' },
      { state: 'California', stateCode: 'CA', slug: 'licencia-electricista-california', highlight: 'CSLB + examen + seguro' },
      { state: 'Florida', stateCode: 'FL', slug: 'licencia-electricista-florida', highlight: 'Licencia estatal + examen' },
      { state: 'New York', stateCode: 'NY', slug: 'licencia-electricista-new-york', highlight: 'Licencia de ciudad + estatal' },
      { state: 'Arizona', stateCode: 'AZ', slug: 'licencia-electricista-arizona', highlight: 'Licencia estatal + examen' },
      { state: 'Georgia', stateCode: 'GA', slug: 'licencia-electricista-georgia', highlight: 'Licencia estatal + examen' },
      { state: 'Pennsylvania', stateCode: 'PA', slug: 'licencia-electricista-pennsylvania', highlight: 'Licencia municipal + estatal' },
      { state: 'Washington', stateCode: 'WA', slug: 'licencia-electricista-washington', highlight: 'L&I + examen + experiencia' },
      { state: 'Colorado', stateCode: 'CO', slug: 'licencia-electricista-colorado', highlight: 'DORA + examen estatal' },
      { state: 'Nevada', stateCode: 'NV', slug: 'licencia-electricista-nevada', highlight: 'Licencia estatal + examen' },
      { state: 'Illinois', stateCode: 'IL', slug: 'licencia-electricista-illinois', highlight: 'Licencia estatal + Chicago' },
      { state: 'Minnesota', stateCode: 'MN', slug: 'licencia-electricista-minnesota', highlight: 'Licencia estatal + examen' },
      { state: 'Oregon', stateCode: 'OR', slug: 'licencia-electricista-oregon', highlight: 'BCD + examen + experiencia' },
      { state: 'New Mexico', stateCode: 'NM', slug: 'licencia-electricista-new-mexico', highlight: 'CID + examen + experiencia' },
    ],
  },
  cosmetologia: {
    name: 'Cosmetología',
    icon: '💄',
    description: 'Guía completa de licencias de cosmetología en Estados Unidos para hispanos.',
    overview: 'La licencia de cosmetología te permite trabajar en salones de belleza, spas y de forma independiente. Los requisitos incluyen horas de escuela aprobada y aprobar exámenes teóricos y prácticos. Varios estados ofrecen el examen en español.',
    licenses: [
      { state: 'Texas', stateCode: 'TX', slug: 'licencia-cosmetologia-texas', highlight: '1,500 horas + examen' },
      { state: 'California', stateCode: 'CA', slug: 'licencia-cosmetologia-california', highlight: '1,600 horas + examen' },
      { state: 'Florida', stateCode: 'FL', slug: 'licencia-cosmetologia-florida', highlight: '1,200 horas + examen' },
      { state: 'New York', stateCode: 'NY', slug: 'licencia-cosmetologia-new-york', highlight: '1,000 horas + examen' },
    ],
  },
  cdl: {
    name: 'CDL (Licencia Comercial)',
    icon: '🚛',
    description: 'Guía completa de licencias CDL para conductores comerciales hispanos.',
    overview: 'La licencia CDL (Commercial Driver\'s License) es esencial para manejar camiones y vehículos comerciales. La demanda de conductores es muy alta en todo el país y los salarios son competitivos desde el inicio.',
    licenses: [
      { state: 'California', stateCode: 'CA', slug: 'licencia-cdl-california', highlight: 'DMV + examen médico' },
      { state: 'Texas', stateCode: 'TX', slug: 'licencia-cdl-texas', highlight: 'DPS + examen CDL + médico' },
      { state: 'Florida', stateCode: 'FL', slug: 'licencia-cdl-florida', highlight: 'DHSMV + examen CDL + médico' },
      { state: 'New York', stateCode: 'NY', slug: 'licencia-cdl-new-york', highlight: 'DMV + examen CDL + médico' },
    ],
  },
  hvac: {
    name: 'HVAC',
    icon: '❄️',
    description: 'Guía completa de licencias HVAC en Estados Unidos para hispanos.',
    overview: 'Los técnicos HVAC instalan y reparan sistemas de calefacción, ventilación y aire acondicionado. La certificación EPA 608 es obligatoria a nivel federal. Algunos estados requieren licencias adicionales.',
    licenses: [
      { state: 'Texas', stateCode: 'TX', slug: 'licencia-hvac-texas', highlight: 'TDLR + EPA 608 + examen' },
      { state: 'California', stateCode: 'CA', slug: 'licencia-hvac-california', highlight: 'CSLB + EPA 608 + C-20' },
      { state: 'New York', stateCode: 'NY', slug: 'licencia-hvac-new-york', highlight: 'NYC + EPA 608 + licencia local' },
      { state: 'Florida', stateCode: 'FL', slug: 'licencia-hvac-florida', highlight: 'Licencia estatal + EPA 608' },
      { state: 'Arizona', stateCode: 'AZ', slug: 'licencia-hvac-arizona', highlight: 'ROC + EPA 608 + licencia' },
    ],
  },
  plomero: {
    name: 'Plomería',
    icon: '🔧',
    description: 'Guía completa de licencias de plomería en Estados Unidos para hispanos.',
    overview: 'La plomería es un oficio con alta demanda y buenos salarios. Los requisitos varían significativamente por estado y a veces por ciudad. Generalmente se requiere experiencia como aprendiz y aprobar un examen.',
    licenses: [
      { state: 'Texas', stateCode: 'TX', slug: 'licencia-plomero-texas', highlight: 'TSBPE + examen + experiencia' },
      { state: 'California', stateCode: 'CA', slug: 'licencia-plomero-california', highlight: 'CSLB + C-36 + examen' },
      { state: 'Florida', stateCode: 'FL', slug: 'licencia-plomero-florida', highlight: 'CILB + examen + experiencia' },
      { state: 'New York', stateCode: 'NY', slug: 'licencia-plomero-new-york', highlight: 'NYC DOB + examen + experiencia' },
    ],
  },
}

export const dynamic = 'force-static'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(OFICIOS).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const oficio = OFICIOS[params.slug]
  return {
    title: oficio ? `Licencia de ${oficio.name} en USA - Guía en Español | ChambaEnUSA` : 'Oficio no encontrado',
    description: oficio?.description || 'Página de oficio',
  }
}

export default function OficioPage({ params }: Props) {
  const oficio = OFICIOS[params.slug]

  if (!oficio) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Oficio no encontrado</h1>
        <Link href="/" className="text-blue-600 underline">Volver al inicio</Link>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{oficio.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{oficio.icon}</span>
          <h1 className="text-4xl font-bold">Licencia de {oficio.name}</h1>
        </div>
        <p className="text-xl text-gray-600 leading-relaxed">{oficio.overview}</p>
      </div>

      {/* Licenses by State */}
      {oficio.licenses.length > 0 ? (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Guías por Estado ({oficio.licenses.length} disponibles)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {oficio.licenses.map((lic) => (
              <Link
                key={lic.slug}
                href={`/${lic.slug}`}
                className="border rounded-lg p-5 hover:shadow-md hover:border-primary transition-all group bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">
                      {lic.stateCode}
                    </span>
                    <span className="font-semibold text-lg">{lic.state}</span>
                  </div>
                  <span className="text-primary group-hover:translate-x-1 transition-transform text-xl">
                    &rarr;
                  </span>
                </div>
                <p className="text-sm text-gray-500">{lic.highlight}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="mb-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800 font-medium">
              Estamos preparando guías detalladas para {oficio.name}. ¡Pronto estarán disponibles!
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="bg-primary text-white rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">
          ¿Necesitas ayuda con tu licencia de {oficio.name}?
        </h3>
        <p className="mb-6 text-blue-100">
          Te conectamos con escuelas y programas en español.
        </p>
        <Link
          href="/buscar"
          className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100"
        >
          Buscar Escuelas
        </Link>
      </div>
    </main>
  )
}
