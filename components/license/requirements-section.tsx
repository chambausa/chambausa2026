import { formatCurrency } from '@/lib/utils'

interface Requirement {
  age_min: number | null
  hours_required: number | null
  fees_exam: number | null
  fees_license: number | null
  documents_required: string[] | null
  renewal_period_years: number | null
}

interface Props {
  requirements: Requirement
  trade: string
  state: string
}

export function RequirementsSection({ requirements, trade, state }: Props) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        Requisitos para Licencia de {trade} en {state}
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Age */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎂</span>
            <h3 className="font-semibold text-blue-800">Edad Mínima</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {requirements.age_min || 18} años
          </p>
        </div>

        {/* Hours */}
        {requirements.hours_required && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⏱️</span>
              <h3 className="font-semibold text-green-800">Horas Requeridas</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {requirements.hours_required.toLocaleString()} horas
            </p>
          </div>
        )}

        {/* Exam Fee */}
        {requirements.fees_exam && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📝</span>
              <h3 className="font-semibold text-yellow-800">Costo del Examen</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {formatCurrency(requirements.fees_exam)}
            </p>
          </div>
        )}

        {/* License Fee */}
        {requirements.fees_license && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💳</span>
              <h3 className="font-semibold text-purple-800">Costo de Licencia</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {formatCurrency(requirements.fees_license)}
            </p>
          </div>
        )}

        {/* Renewal */}
        {requirements.renewal_period_years && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔄</span>
              <h3 className="font-semibold text-orange-800">Renovación</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              Cada {requirements.renewal_period_years} años
            </p>
          </div>
        )}
      </div>

      {/* Documents */}
      {requirements.documents_required && requirements.documents_required.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">
            Documentos Necesarios
          </h3>
          <ul className="grid md:grid-cols-2 gap-2">
            {requirements.documents_required.map((doc, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
