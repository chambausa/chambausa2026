import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Licencias de Oficios por Estado en Estados Unidos | ChambaEnUSA',
  description: 'Guía completa de licencias de electricista, CDL, cosmetología y más en todos los estados de EE.UU. Encuentra requisitos, salarios y escuelas bilingües.',
  keywords: ['licencias por estado', 'certificaciones usa', 'empleos construction estados unidos']
}

const ALL_STATES = [
  { 
    name: 'Texas', 
    code: 'TX', 
    region: 'Southwest',
    population: '30M',
    hispanicPercent: '40%',
    icon: '🤠',
    highlights: ['Alta demanda de electricistas', 'Industria construcción en auge', '40% población hispana']
  },
  { 
    name: 'California', 
    code: 'CA', 
    region: 'West',
    population: '39M',
    hispanicPercent: '39%',
    icon: '🌴',
    highlights: ['Salarios más altos', 'CSLB requiere licencia', 'Gran mercado']
  },
  { 
    name: 'Florida', 
    code: 'FL', 
    region: 'Southeast',
    population: '22M',
    hispanicPercent: '27%',
    icon: '🌴',
    highlights: ['Crecimiento explosivo', 'Alta demanda CDL', 'Clima subtropical']
  },
  { 
    name: 'New York', 
    code: 'NY', 
    region: 'Northeast',
    population: '20M',
    hispanicPercent: '19%',
    icon: '🗽',
    highlights: ['Requisitos estrictos NYC', 'Salarios altos', 'Mercado grande']
  },
  { 
    name: 'Arizona', 
    code: 'AZ', 
    region: 'West',
    population: '7.5M',
    hispanicPercent: '31%',
    icon: '🏜️',
    highlights: ['Estado de mayor crecimiento', 'Alta demanda HVAC', 'Phoenix y Tucson']
  },
  { 
    name: 'Colorado', 
    code: 'CO', 
    region: 'West',
    population: '5.8M',
    hispanicPercent: '22%',
    icon: '🏔️',
    highlights: ['Mercado creciente', 'Requisitos estatales', 'Salarios competitivos']
  },
  { 
    name: 'Nevada', 
    code: 'NV', 
    region: 'West',
    population: '3.1M',
    hispanicPercent: '29%',
    icon: '🎰',
    highlights: ['Turismo y construcción', 'Licencias estatales', 'Las Vegas y Reno']
  },
  { 
    name: 'Georgia', 
    code: 'GA', 
    region: 'Southeast',
    population: '10.7M',
    hispanicPercent: '10%',
    icon: '� Peach',
    highlights: ['Mercado en crecimiento', 'Atlanta demanda alta', 'Requisitos moderados']
  },
  { 
    name: 'Pennsylvania', 
    code: 'PA', 
    region: 'Northeast',
    population: '12.8M',
    hispanicPercent: '8%',
    icon: '🔔',
    highlights: ['Industria establecida', 'Requisitos por condado', 'Filadelfia y Pittsburgh']
  },
  { 
    name: 'Illinois', 
    code: 'IL', 
    region: 'Midwest',
    population: '12.6M',
    hispanicPercent: '18%',
    icon: '� Windy',
    highlights: ['Chicago mercado grande', 'Requisitos locales', 'Demanda constante']
  },
  { 
    name: 'Washington', 
    code: 'WA', 
    region: 'West',
    population: '7.7M',
    hispanicPercent: '13%',
    icon: '☕',
    highlights: ['Tech y construcción', 'Requisitos estatales', 'Seattle y Tacoma']
  },
  { 
    name: 'Nuevo México', 
    code: 'NM', 
    region: 'Southwest',
    population: '2.1M',
    hispanicPercent: '48%',
    icon: '🌵',
    highlights: ['Mayoría hispana', 'Requisitos estatales', 'Albuquerque mercado']
  },
]

const REGIONS = {
  'Southwest': ['Texas', 'Arizona', 'Nuevo México'],
  'West': ['California', 'Colorado', 'Nevada', 'Washington'],
  'Southeast': ['Florida', 'Georgia'],
  'Northeast': ['New York', 'Pennsylvania'],
  'Midwest': ['Illinois'],
}

export default function EstadosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Licencias de Oficios por Estado</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Encuentra información completa sobre licencias de electricista, CDL, cosmetología y más 
          en todos los estados de Estados Unidos. Requisitos oficiales, salarios promedio y escuelas bilingües.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">50+</p>
          <p className="text-sm text-blue-800">Estados y Territorios</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-green-600">5</p>
          <p className="text-sm text-green-800">Oficios Principales</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">500+</p>
          <p className="text-sm text-purple-800">Páginas de Licencias</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-orange-600">40%</p>
          <p className="text-sm text-orange-800">Población Hispana</p>
        </div>
      </div>

      {/* Search by Region */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Buscar por Región</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(REGIONS).map(([region, states]) => (
            <div key={region} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">{region}</h3>
              <div className="space-y-2">
                {states.map((state) => {
                  const stateData = ALL_STATES.find(s => s.name === state)
                  return (
                    <Link
                      key={state}
                      href={`/estado/${state.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <span>{stateData?.icon}</span>
                      <span>{state}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All States Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Todos los Estados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_STATES.map((state) => (
            <Link
              key={state.code}
              href={`/estado/${state.name.toLowerCase().replace(' ', '-')}`}
              className="border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {state.icon} {state.name}
                  </h3>
                  <p className="text-sm text-gray-500">{state.region}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {state.code}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Población:</span>
                  <span className="font-medium">{state.population}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hispana:</span>
                  <span className="font-medium">{state.hispanicPercent}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-1">
                  {state.highlights.slice(0, 2).map((highlight, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-primary text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿No encuentras tu estado?</h2>
        <p className="mb-6 text-blue-100">
          Contáctanos y agregamos información sobre licencias en tu estado.
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
