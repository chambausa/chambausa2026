import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface School {
  id: string
  name: string
  city: string
  phone: string | null
  website: string | null
  is_bilingual: boolean | null
  programs: Program[]
}

interface Program {
  id: string
  name: string
  duration_months: number | null
  cost: number | null
  modality: string | null
}

interface Props {
  schools: School[]
  trade: string
  state: string
}

export function SchoolsTable({ schools, trade, state }: Props) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        Escuelas con Programas de {trade} en {state}
      </h2>
      
      {schools.length === 0 ? (
        <p className="text-gray-600">
          No encontramos escuelas bilingües para esta combinación. 
          Contáctanos para más información.
        </p>
      ) : (
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
                  <p className="text-gray-600 mb-2">
                    📍 {school.city}, {state}
                  </p>
                  {school.phone && (
                    <p className="text-gray-600 mb-2">
                      📞 {school.phone}
                    </p>
                  )}
                  {school.website && (
                    <a 
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      🌐 Visitar sitio web →
                    </a>
                  )}
                </div>
                
                <div className="text-right">
                  {school.programs.slice(0, 1).map((program) => (
                    <div key={program.id} className="text-sm">
                      {program.duration_months && (
                        <p className="text-gray-600">
                          ⏱️ {program.duration_months} meses
                        </p>
                      )}
                      {program.cost && (
                        <p className="font-semibold text-green-600">
                          💰 {formatCurrency(program.cost)}
                        </p>
                      )}
                      {program.modality && (
                        <p className="text-gray-500 capitalize">
                          {program.modality}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
