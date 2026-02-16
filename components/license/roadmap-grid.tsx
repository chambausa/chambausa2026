'use client';

import type { Roadmap, LicenseType } from '@/types/license-json.types';

interface RoadmapGridProps {
  roadmap: Roadmap;
  oficio?: string;
}

function LicenseTypeCard({ type }: { type: LicenseType }) {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
      style={{ borderTopColor: type.color_badge, borderTopWidth: '4px' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span
            className="inline-block px-2 py-1 text-xs font-medium rounded mb-2"
            style={{ backgroundColor: type.color_badge + '20', color: type.color_badge }}
          >
            {type.titulo_es}
          </span>
          <h3 className="text-xl font-bold text-gray-900">{type.titulo_en}</h3>
        </div>
        {type.es_principal && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Más Popular
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4">{type.descripcion_corta}</p>

      {/* Scope of Work */}
      {type.scope_of_work && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">¿Qué puedes hacer?</p>
          <p className="text-sm text-gray-600">{type.scope_of_work}</p>
        </div>
      )}

      {/* Requirements */}
      {type.requisitos && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Requisitos</h4>
          <ul className="text-sm space-y-1">
            {type.requisitos.edad_minima && (
              <li>📅 Edad mínima: <strong>{type.requisitos.edad_minima} años</strong></li>
            )}
            {type.requisitos.educacion_previa && (
              <li>🎓 Educación: {type.requisitos.educacion_previa}</li>
            )}
            {type.requisitos.horas_escuela !== undefined && (
              <li>⏱️ Horas de escuela: <strong>{type.requisitos.horas_escuela.toLocaleString()}</strong></li>
            )}
            {/* New generic fields */}
            {type.requisitos.experiencia && (
              <li>🔨 Experiencia: <strong>{type.requisitos.experiencia}</strong></li>
            )}
            {type.requisitos.licencia_previa && (
              <li>🆔 Licencia previa: {type.requisitos.licencia_previa}</li>
            )}
            {type.requisitos.examen_medico && (
              <li>⚕️ Examen médico: {type.requisitos.examen_medico}</li>
            )}
            {type.requisitos.examen && (
              <li>📝 Examen: {type.requisitos.examen}</li>
            )}

            {type.requisitos.horas_online_max && (
              <li>💻 Máximo {type.requisitos.horas_online_max} horas online</li>
            )}
          </ul>
        </div>
      )}

      {/* Exam Info */}
      {type.examen && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Examen</h4>
          <div className="flex flex-wrap gap-2">
            {type.examen.parte_1 && type.examen.parte_1.costo !== undefined && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                📝 Escrito: ${type.examen.parte_1.costo}
              </span>
            )}
            {type.examen.parte_1 && type.examen.parte_1.costo === undefined && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                📝 Escrito
              </span>
            )}
            {type.examen.parte_2 && type.examen.parte_2.costo !== undefined && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                ✂️ Práctico: ${type.examen.parte_2.costo}
              </span>
            )}
            {type.examen.parte_2 && type.examen.parte_2.costo === undefined && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                ✂️ Práctico
              </span>
            )}
            {type.examen.nombre && !type.examen.parte_1 && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {type.examen.nombre}
              </span>
            )}
          </div>
          {type.examen.parte_1?.idiomas && (
            <p className="text-xs text-gray-500 mt-2">
              Idiomas: {type.examen.parte_1?.idiomas.join(', ')}
            </p>
          )}
          {/* Generic Exam Languages if parts are not defined but languages list exists (custom handling if needed, or rely on parts) */}
          {type.examen.idiomas && !type.examen.parte_1 && (
            <p className="text-xs text-gray-500 mt-2">
              Idiomas: {type.examen.idiomas?.join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Costs */}
      {type.costos && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Costo total</p>
            <p className="text-xl font-bold text-gray-900">
              {type.costos.total_examenes_y_licencia !== undefined ? `$${type.costos.total_examenes_y_licencia}` : 'Variable'}
            </p>
          </div>
          <a
            href={type.como_aplicar?.url || '#'}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver Detalles
          </a>
        </div>
      )}
    </div>
  );
}

export function RoadmapGrid({ roadmap, oficio }: RoadmapGridProps) {
  return (
    <section id="roadmap" className="py-8">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Tipos de Licencia{oficio ? ` de ${oficio}` : ''}
        </h2>
        {roadmap.nota_general && (
          <p className="text-gray-600 max-w-2xl">
            {roadmap.nota_general}
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmap.tipos.map((tipo) => (
          <LicenseTypeCard key={tipo.id} type={tipo} />
        ))}
      </div>
    </section>
  );
}
