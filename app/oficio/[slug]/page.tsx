import { Metadata } from 'next'
import Link from 'next/link'

// Mock data for demo purposes
const OFICIOS = {
  electricista: {
    name: 'Electricista',
    description: 'Los electricistas instalan, mantienen y reparan sistemas eléctricos en hogares, edificios comerciales e industrias.',
    salary: '$55,000 - $75,000',
    growth: '9%',
    licenses: [
      { state: 'Texas', slug: 'licencia-electricista-texas' },
      { state: 'California', slug: 'licencia-electricista-california' },
      { state: 'Florida', slug: 'licencia-electricista-florida' },
      { state: 'New York', slug: 'licencia-electricista-new-york' },
      { state: 'Arizona', slug: 'licencia-electricista-arizona' },
    ]
  },
  cdl: {
    name: 'Licencia CDL',
    description: 'La licencia de conducir comercial (CDL) es requerida para operar vehículos de gran tamaño como camiones y autobuses.',
    salary: '$50,000 - $70,000',
    growth: '8%',
    licenses: [
      { state: 'California', slug: 'licencia-cdl-california' },
      { state: 'Texas', slug: 'licencia-cdl-texas' },
      { state: 'Florida', slug: 'licencia-cdl-florida' },
    ]
  },
  cosmetologia: {
    name: 'Cosmetología',
    description: 'Los cosmetólogos ofrecen servicios de belleza como cortes de cabello, coloración, maquillaje y cuidado de la piel.',
    salary: '$30,000 - $50,000',
    growth: '11%',
    licenses: [
      { state: 'Texas', slug: 'licencia-cosmetologia-texas' },
      { state: 'California', slug: 'licencia-cosmetologia-california' },
      { state: 'Florida', slug: 'licencia-cosmetologia-florida' },
      { state: 'New York', slug: 'licencia-cosmetologia-new-york' },
    ]
  },
  hvac: {
    name: 'Técnico HVAC',
    description: 'Los técnicos HVAC instalan, mantienen y reparan sistemas de calefacción, ventilación y aire acondicionado.',
    salary: '$45,000 - $65,000',
    growth: '6%',
    licenses: [
      { state: 'Texas', slug: 'licencia-hvac-texas' },
      { state: 'California', slug: 'licencia-hvac-california' },
      { state: 'Florida', slug: 'licencia-hvac-florida' },
    ]
  },
  plomero: {
    name: 'Plomero',
    description: 'Los plomeros instalan y reparan sistemas de tuberías, accesorios y equipos relacionados con agua y drenaje.',
    salary: '$50,000 - $70,000',
    growth: '5%',
    licenses: [
      { state: 'Texas', slug: 'licencia-plomeria-texas' },
      { state: 'California', slug: 'licencia-plomeria-california' },
    ]
  }
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const oficio = OFICIOS[params.slug as keyof typeof OFICIOS]

  if (!oficio) {
    return { title: 'Oficio no encontrado' }
  }

  return {
    title: `Licencia de ${oficio.name} - Requisitos y Cómo Obtenerla`,
    description: oficio.description,
  }
}

export default function OficioPage({ params }: Props) {
  const oficio = OFICIOS[params.slug as keyof typeof OFICIOS]

  if (!oficio) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Oficio no encontrado</h1>
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
        <span className="text-gray-900">{oficio.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Licencia de {oficio.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{oficio.description}</p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 mb-1">Salario Promedio</p>
            <p className="text-xl font-bold text-blue-800">{oficio.salary}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">Crecimiento Laboral</p>
            <p className="text-xl font-bold text-green-800">{oficio.growth} (próximos 10 años)</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-600 mb-1">Estados Disponibles</p>
            <p className="text-xl font-bold text-purple-800">{oficio.licenses.length}</p>
          </div>
        </div>
      </div>

      {/* States List */}
      <h2 className="text-2xl font-bold mb-6">Licencias por Estado</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {oficio.licenses.map((lic) => (
          <Link
            key={lic.slug}
            href={`/${lic.slug}`}
            className="border rounded-lg p-4 hover:shadow-md hover:border-primary transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{lic.state}</span>
              <span className="text-primary">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-primary text-white rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar tu carrera como {oficio.name}?</h3>
        <p className="mb-6 text-blue-100">
          Encuentra escuelas bilingües y comienza tu camino hoy.
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
  return Object.keys(OFICIOS).map((slug) => ({ slug }))
}
