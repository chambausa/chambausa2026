import { Metadata } from 'next'
import Link from 'next/link'

// Datos expandidos por estado
const ESTADOS_DATA: Record<string, {
  name: string
  code: string
  region: string
  population: string
  hispanicPercent: string
  topCities: { name: string; population: string }[]
  laborData: {
    electricista: { salary: string; growth: string; demand: string }
    cdl: { salary: string; growth: string; demand: string }
    cosmetologia: { salary: string; growth: string; demand: string }
    hvac: { salary: string; growth: string; demand: string }
    plomero: { salary: string; growth: string; demand: string }
  }
  licenses: { oficio: string; slug: string; requirements: string }[]
  overview: string
  keywords: string[]
}> = {
  texas: {
    name: 'Texas',
    code: 'TX',
    region: 'Southwest',
    population: '30M',
    hispanicPercent: '40%',
    topCities: [
      { name: 'Houston', population: '2.3M' },
      { name: 'San Antonio', population: '1.5M' },
      { name: 'Dallas', population: '1.3M' },
      { name: 'Austin', population: '1.0M' },
      { name: 'Fort Worth', population: '1.0M' },
    ],
    laborData: {
      electricista: { salary: '$55,000 - $75,000', growth: '9%', demand: 'Alta' },
      cdl: { salary: '$50,000 - $70,000', growth: '8%', demand: 'Muy Alta' },
      cosmetologia: { salary: '$30,000 - $50,000', growth: '11%', demand: 'Media-Alta' },
      hvac: { salary: '$48,000 - $65,000', growth: '6%', demand: 'Alta' },
      plomero: { salary: '$50,000 - $70,000', growth: '5%', demand: 'Media' },
    },
    licenses: [
      { oficio: 'Electricista', slug: 'licencia-electricista-texas', requirements: '8,000 horas + examen' },
      { oficio: 'CDL', slug: 'licencia-cdl-texas', requirements: 'Examen teórico + práctico' },
      { oficio: 'Cosmetología', slug: 'licencia-cosmetologia-texas', requirements: '1,500 horas + examen' },
      { oficio: 'HVAC', slug: 'licencia-hvac-texas', requirements: 'EPA 608 + examen estatal' },
      { oficio: 'Plomería', slug: 'licencia-plomeria-texas', requirements: ' licensing opcional por ciudad' },
    ],
    overview: `Texas es el segundo estado más grande de EE.UU. con una población de más de 30 millones de habitantes. Con un 40% de población hispana, hay una alta demanda de servicios y licencias en español. La industria de la construcción está en auge, especialmente en ciudades como Houston, Dallas y Austin, creando oportunidades para electricistas, plomeros y técnicos HVAC.`,
    keywords: ['licencias texas', 'certificaciones texas', 'empleos construction texas', 'trabajos hispanos texas']
  },
  california: {
    name: 'California',
    code: 'CA',
    region: 'West',
    population: '39M',
    hispanicPercent: '39%',
    topCities: [
      { name: 'Los Angeles', population: '4.0M' },
      { name: 'San Diego', population: '1.4M' },
      { name: 'San Jose', population: '1.0M' },
      { name: 'San Francisco', population: '875K' },
      { name: 'Fresno', population: '542K' },
    ],
    laborData: {
      electricista: { salary: '$60,000 - $85,000', growth: '8%', demand: 'Muy Alta' },
      cdl: { salary: '$55,000 - $75,000', growth: '7%', demand: 'Alta' },
      cosmetologia: { salary: '$35,000 - $55,000', growth: '10%', demand: 'Media-Alta' },
      hvac: { salary: '$52,000 - $70,000', growth: '5%', demand: 'Alta' },
      plomero: { salary: '$55,000 - $75,000', growth: '4%', demand: 'Media-Alta' },
    },
    licenses: [
      { oficio: 'Electricista', slug: 'licencia-electricista-california', requirements: 'CSLB + examen + seguro' },
      { oficio: 'CDL', slug: 'licencia-cdl-california', requirements: 'DMV + examen médico' },
      { oficio: 'Cosmetología', slug: 'licencia-cosmetologia-california', requirements: '1,600 horas + examen' },
      { oficio: 'HVAC', slug: 'licencia-hvac-california', requirements: 'Contractor license opcional' },
      { oficio: 'Plomería', slug: 'licencia-plomeria-california', requirements: 'Contractor license' },
    ],
    overview: `California tiene la economía más grande de EE.UU. y una alta demanda de trabajadores especializados. Los salarios son algunos de los más altos del país, pero también el costo de vida es elevado. El estado requiere licencias específicas a través del CSLB (Contractors State License Board) para muchos oficios.`,
    keywords: ['licencias california', 'csjb california', 'empleos construction california', 'contratistas california']
  },
  florida: {
    name: 'Florida',
    code: 'FL',
    region: 'Southeast',
    population: '22M',
    hispanicPercent: '27%',
    topCities: [
      { name: 'Jacksonville', population: '950K' },
      { name: 'Miami', population: '455K' },
      { name: 'Tampa', population: '400K' },
      { name: 'Orlando', population: '310K' },
      { name: 'St. Petersburg', population: '265K' },
    ],
    laborData: {
      electricista: { salary: '$48,000 - $65,000', growth: '10%', demand: 'Muy Alta' },
      cdl: { salary: '$48,000 - $65,000', growth: '9%', demand: 'Muy Alta' },
      cosmetologia: { salary: '$28,000 - $45,000', growth: '12%', demand: 'Alta' },
      hvac: { salary: '$45,000 - $60,000', growth: '7%', demand: 'Alta' },
      plomero: { salary: '$45,000 - $60,000', growth: '6%', demand: 'Media-Alta' },
    },
    licenses: [
      { oficio: 'Electricista', slug: 'licencia-electricista-florida', requirements: 'Licencia estatal + examen' },
      { oficio: 'CDL', slug: 'licencia-cdl-florida', requirements: 'DHSMV + examen médico' },
      { oficio: 'Cosmetología', slug: 'licencia-cosmetologia-florida', requirements: '1,200 horas + examen' },
      { oficio: 'HVAC', slug: 'licencia-hvac-florida', requirements: 'EPA 608 obligatorio' },
      { oficio: 'Plomería', slug: 'licencia-plomeria-florida', requirements: 'License por condado' },
    ],
    overview: `Florida experimentó un crecimiento explosivo en los últimos años, especialmente en construcción y servicios. El clima subtropical crea demanda constante para HVAC y plomería. Hay muchas oportunidades para hispanohablantes, especialmente en el sur del estado donde la comunidad hispana es más grande.`,
    keywords: ['licencias florida', 'empleos florida', 'trabajos construction florida', 'dbc florida']
  },
  'new-york': {
    name: 'New York',
    code: 'NY',
    region: 'Northeast',
    population: '20M',
    hispanicPercent: '19%',
    topCities: [
      { name: 'New York City', population: '8.4M' },
      { name: 'Buffalo', population: '278K' },
      { name: 'Rochester', population: '211K' },
      { name: 'Yonkers', population: '211K' },
      { name: 'Syracuse', population: '148K' },
    ],
    laborData: {
      electricista: { salary: '$65,000 - $90,000', growth: '7%', demand: 'Alta' },
      cdl: { salary: '$55,000 - $75,000', growth: '5%', demand: 'Media' },
      cosmetologia: { salary: '$32,000 - $50,000', growth: '8%', demand: 'Media' },
      hvac: { salary: '$50,000 - $70,000', growth: '4%', demand: 'Media' },
      plomero: { salary: '$60,000 - $85,000', growth: '5%', demand: 'Media-Alta' },
    },
    licenses: [
      { oficio: 'Electricista', slug: 'licencia-electricista-new-york', requirements: 'Licencia de ciudad + estatal' },
      { oficio: 'CDL', slug: 'licencia-cdl-new-york', requirements: 'DMV + Medical Card' },
      { oficio: 'Cosmetología', slug: 'licencia-cosmetologia-new-york', requirements: '1,000 horas + examen' },
      { oficio: 'HVAC', slug: 'licencia-hvac-new-york', requirements: 'EPA 608 + licencia NYC' },
      { oficio: 'Plomería', slug: 'licencia-plomeria-new-york', requirements: 'Licencia NYC FDNY' },
    ],
    overview: `Nueva York tiene algunos de los requisitos más estrictos del país, especialmente en la ciudad de Nueva York. Los salarios son altos, pero el costo de vida también. La demanda es constante debido a la gran cantidad de edificios y la industria de servicios.`,
    keywords: ['licencias new york', 'nyc fdny', 'empleos new york', 'construction new york']
  },
  arizona: {
    name: 'Arizona',
    code: 'AZ',
    region: 'West',
    population: '7.5M',
    hispanicPercent: '31%',
    topCities: [
      { name: 'Phoenix', population: '1.7M' },
      { name: 'Tucson', population: '545K' },
      { name: 'Mesa', population: '504K' },
      { name: 'Chandler', population: '279K' },
      { name: 'Scottsdale', population: '517K' },
    ],
    laborData: {
      electricista: { salary: '$50,000 - $68,000', growth: '11%', demand: 'Muy Alta' },
      cdl: { salary: '$48,000 - $65,000', growth: '10%', demand: 'Muy Alta' },
      cosmetologia: { salary: '$28,000 - $45,000', growth: '13%', demand: 'Alta' },
      hvac: { salary: '$45,000 - $60,000', growth: '8%', demand: 'Muy Alta' },
      plomero: { salary: '$48,000 - $65,000', growth: '7%', demand: 'Alta' },
    },
    licenses: [
      { oficio: 'Electricista', slug: 'licencia-electricista-arizona', requirements: 'Licencia estatal + examen' },
      { oficio: 'CDL', slug: 'licencia-cdl-arizona', requirements: 'MVD + Medical Card' },
      { oficio: 'HVAC', slug: 'licencia-hvac-arizona', requirements: 'EPA 608 + licencia estatal' },
    ],
    overview: `Arizona es uno de los estados de mayor crecimiento en EE.UU., con una industria de construcción en auge. El clima desértico crea alta demanda constante para HVAC. Phoenix y Tucson ofrecen muchas oportunidades para trabajadores hispanohablantes.`,
    keywords: ['licencias arizona', 'empleos arizona', 'construction phoenix', 'trabajos arizona']
  }
}

interface Props {
  params: { slug: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const estado = ESTADOS_DATA[params.slug]
  
  if (!estado) {
    return { title: 'Estado no encontrado' }
  }

  return {
    title: `Licencias y Certificaciones de Oficios en ${estado.name} | ChambaEnUSA`,
    description: `Guía completa sobre licencias de electricista, CDL, cosmetología y más en ${estado.name}. Requisitos, salarios y escuelas bilingües.`,
    keywords: estado.keywords.join(', '),
  }
}

export default function EstadoPage({ params }: Props) {
  const estado = ESTADOS_DATA[params.slug as keyof typeof ESTADOS_DATA]

  if (!estado) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Estado no encontrado</h1>
        <Link href="/" className="text-primary hover:underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{estado.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold">{estado.name}</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
            {estado.code}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
            {estado.region}
          </span>
        </div>
        <p className="text-xl text-gray-600 mb-6">{estado.overview}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 mb-1">Población Total</p>
          <p className="text-2xl font-bold text-blue-800">{estado.population}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 mb-1">Población Hispana</p>
          <p className="text-2xl font-bold text-green-800">{estado.hispanicPercent}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 mb-1">Ciudades Principales</p>
          <p className="text-2xl font-bold text-purple-800">{estado.topCities.length}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-600 mb-1">Licencias Disponibles</p>
          <p className="text-2xl font-bold text-orange-800">{estado.licenses.length}</p>
        </div>
      </div>

      {/* Labor Data by Trade */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Salarios y Demanda por Oficio en {estado.name}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-3 text-left font-semibold">Oficio</th>
                <th className="border px-4 py-3 text-left font-semibold">Salario Anual</th>
                <th className="border px-4 py-3 text-left font-semibold">Crecimiento (10 años)</th>
                <th className="border px-4 py-3 text-left font-semibold">Demanda</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(estado.laborData).map(([oficio, data]) => (
                <tr key={oficio} className="hover:bg-gray-50">
                  <td className="border px-4 py-3 font-medium capitalize">{oficio}</td>
                  <td className="border px-4 py-3">{data.salary}</td>
                  <td className="border px-4 py-3">{data.growth}</td>
                  <td className="border px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.demand === 'Muy Alta' ? 'bg-red-100 text-red-800' :
                      data.demand === 'Alta' ? 'bg-orange-100 text-orange-800' :
                      data.demand === 'Media-Alta' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {data.demand}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top Cities */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Ciudades con Mayor Demanda en {estado.name}</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {estado.topCities.map((city, index) => (
            <div key={city.name} className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🏙️</div>
              <p className="font-semibold">{city.name}</p>
              <p className="text-sm text-gray-500">{city.population}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Licenses List */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Licencias Disponibles en {estado.name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {estado.licenses.map((lic) => (
            <Link
              key={lic.slug}
              href={`/${lic.slug}`}
              className="border rounded-lg p-4 hover:shadow-md hover:border-primary transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{lic.oficio}</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-sm text-gray-500">{lic.requirements}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-primary text-white rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">¿Buscas escuelas en {estado.name}?</h3>
        <p className="mb-6 text-blue-100">
          Encuentra programas de formación en español y comienza tu carrera hoy.
        </p>
        <Link 
          href="/contacto"
          className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100"
        >
          Contáctanos
        </Link>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(ESTADOS_DATA).map((slug) => ({ slug }))
}
