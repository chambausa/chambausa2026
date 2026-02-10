import { Metadata } from 'next'
import { LeadCaptureForm } from '@/components/lead-capture-form'
import { formatCurrency } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Licencia de Electricista en Texas 2026: Requisitos y Escuelas Bilingües',
  description: 'Todo sobre la licencia de electricista en Texas: requisitos, costos, exámenes y escuelas bilingües. Aprende cómo obtener tu licencia en TX.',
}

// Mock data for demo
const LICENSE_DATA = {
  trade: 'Electricista',
  state: 'Texas',
  stateCode: 'TX',
  lastUpdated: '2026-01-15',
  requirements: {
    age_min: 18,
    hours_required: 8000,
    fees_exam: 75,
    fees_license: 50,
    renewal_period_years: 2,
    documents_required: ['SSN', 'GED o diploma de high school', 'Identificación válida', 'Comprobante de experiencia'],
  },
  schools: [
    {
      id: '1',
      name: 'IEC Dallas',
      city: 'Dallas',
      phone: '(214) 555-0123',
      website: 'https://iecdallas.edu',
      is_bilingual: true,
      programs: [{ id: '1', name: 'Programa de Electricista', duration_months: 12, cost: 8500, modality: 'presencial' }]
    },
    {
      id: '2',
      name: 'Skillpoint Alliance',
      city: 'Austin',
      phone: '(512) 555-0456',
      website: 'https://skillpoint.org',
      is_bilingual: true,
      programs: [{ id: '2', name: 'Pre-Apprenticeship Eléctrico', duration_months: 6, cost: 3500, modality: 'presencial' }]
    },
    {
      id: '3',
      name: 'Eastfield College',
      city: 'Mesquite',
      phone: '(972) 555-0789',
      website: 'https://eastfield.edu',
      is_bilingual: true,
      programs: [{ id: '3', name: 'Técnico en Electricidad', duration_months: 18, cost: 12000, modality: 'hibrido' }]
    }
  ],
  faqs: [
    {
      question: '¿Cuánto tiempo toma obtener la licencia de electricista en Texas?',
      answer: 'El proceso completo puede tomar entre 2-4 años. Esto incluye completar las 8,000 horas de experiencia requerida y aprobar el examen de licencia.'
    },
    {
      question: '¿Necesito hablar inglés para el examen?',
      answer: 'El examen está disponible en español. Sin embargo, muchas agencias requieren comunicación en inglés para ciertos trámites. IEC Dallas y otras escuelas ofrecen preparación completa en español.'
    },
    {
      question: '¿Cuánto cuesta el proceso completo?',
      answer: 'El costo total incluye: solicitud ($50), examen ($75), licencia inicial ($50), y renovación cada 2 años ($50). Además, el programa de formación puede costar entre $3,500-$12,000 dependiendo la escuela.'
    },
    {
      question: '¿Puedo trabajar mientras estudio?',
      answer: 'Sí, puedes trabajar como aprendiz electricista mientras completas tus horas. Muchos empleadores ofrecen programas de apprenticeship donde ganas mientras aprendes.'
    },
    {
      question: '¿Qué agencia emite la licencia en Texas?',
      answer: 'El TDLR (Texas Department of Licensing and Regulation) es la agencia responsible de emitir las licencias de electricista en Texas. Su sitio web ofrece recursos en español.'
    }
  ]
}

export default function LicensePageDemo() {
  const { trade, state, lastUpdated, requirements, schools, faqs } = LICENSE_DATA

  return (
    <article className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary">Inicio</a>
        <span className="mx-2">/</span>
        <a href="/oficio/electricista" className="hover:text-primary">{trade}</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{state}</span>
      </nav>

      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Licencia de {trade} en {state}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Guía completa en español: requisitos oficiales, proceso y escuelas bilingües
        </p>
        <p className="text-sm text-gray-500">
          Última actualización: {lastUpdated}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          {/* Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Requisitos para Licencia de {trade} en {state}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎂</span>
                  <h3 className="font-semibold text-blue-800">Edad Mínima</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">{requirements.age_min} años</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⏱️</span>
                  <h3 className="font-semibold text-green-800">Horas Requeridas</h3>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {requirements.hours_required.toLocaleString()} horas
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📝</span>
                  <h3 className="font-semibold text-yellow-800">Costo del Examen</h3>
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(requirements.fees_exam)}
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💳</span>
                  <h3 className="font-semibold text-purple-800">Costo de Licencia</h3>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(requirements.fees_license)}
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔄</span>
                  <h3 className="font-semibold text-orange-800">Renovación</h3>
                </div>
                <p className="text-2xl font-bold text-orange-600">
                  Cada {requirements.renewal_period_years} años
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">Documentos Necesarios</h3>
              <ul className="grid md:grid-cols-2 gap-2">
                {requirements.documents_required.map((doc, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Schools */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Escuelas con Programas de {trade} en {state}
            </h2>
            
            <div className="space-y-4">
              {schools.map((school) => (
                <div 
                  key={school.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{school.name}</h3>
                        {school.is_bilingual && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            🗣️ Español
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">📍 {school.city}, {state}</p>
                      <p className="text-gray-600 mb-2">📞 {school.phone}</p>
                      <a 
                        href={school.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        🌐 Visitar sitio web →
                      </a>
                    </div>
                    
                    <div className="text-right">
                      {school.programs.slice(0, 1).map((program) => (
                        <div key={program.id} className="text-sm">
                          {program.duration_months && (
                            <p className="text-gray-600">⏱️ {program.duration_months} meses</p>
                          )}
                          {program.cost && (
                            <p className="font-semibold text-green-600">💰 {formatCurrency(program.cost)}</p>
                          )}
                          {program.modality && (
                            <p className="text-gray-500 capitalize">{program.modality}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Preguntas Frecuentes sobre Licencia de {trade} en {state}
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="px-4 py-3 bg-gray-50">
                    <p className="font-medium">{index + 1}. {faq.question}</p>
                  </div>
                  <div className="px-4 py-3 bg-white border-t">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Source */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm">
            <p className="font-semibold mb-2">Fuente oficial:</p>
            <a 
              href="https://www.tdlr.texas.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              https://www.tdlr.texas.gov/
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="bg-primary p-4 text-white">
                <h3 className="font-semibold text-lg">
                  ¿Necesitas ayuda para empezar?
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  Te conectamos con escuelas que hablan español
                </p>
              </div>
              
              <form className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre completo</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Solicitar Información
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Sin compromiso. Tu información está segura.
                </p>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
