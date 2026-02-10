'use client';

interface ReciprocitySectionProps {
  reciprocidad: {
    ai_generated?: boolean;
    disponible: boolean;
    nombre_proceso?: string;
    requisitos?: string[];
    nota?: string;
    url?: string;
    experiencia_como_horas?: string;
    source?: string;
  };
}

export function ReciprocitySection({ reciprocidad }: ReciprocitySectionProps) {
  if (!reciprocidad.disponible) {
    return (
      <section className="py-8" id="reciprocidad">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🌎 Transferir Licencia de Otro Estado
          </h2>
        </div>
        <div className="bg-gray-50 border rounded-lg p-6">
          <p className="text-gray-700">
            Este estado no ofrece reciprocidad o transferencia de licencias de otros estados.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8" id="reciprocidad">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🌎 Transferir Licencia de Otro Estado
        </h2>
        <p className="text-gray-600">
          ¿Ya tienes licencia en otro estado? Puede que puedas transferirla
        </p>
      </div>

      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-lg overflow-hidden shadow-sm">
        {/* Process Name */}
        {reciprocidad.nombre_proceso && (
          <div className="bg-white border-b border-teal-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{reciprocidad.nombre_proceso}</h3>
                <p className="text-sm text-gray-600">Proceso oficial de transferencia</p>
              </div>
            </div>
          </div>
        )}

        {/* Requirements */}
        {reciprocidad.requisitos && reciprocidad.requisitos.length > 0 && (
          <div className="p-6 border-b border-teal-100 bg-white">
            <h4 className="font-bold text-lg mb-4 text-gray-900">📋 Requisitos</h4>
            <ul className="space-y-3">
              {reciprocidad.requisitos.map((req, index) => (
                <li key={index} className="flex items-start gap-3 bg-teal-50 rounded-lg p-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-800 flex-1">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Note */}
        {reciprocidad.nota && (
          <div className="p-6 border-b border-teal-100 bg-blue-50">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <p className="text-sm text-blue-900 leading-relaxed">
                {reciprocidad.nota}
              </p>
            </div>
          </div>
        )}

        {/* Experience as Hours */}
        {reciprocidad.experiencia_como_horas && (
          <div className="p-6 border-b border-teal-100 bg-white">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">⏱️</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Experiencia como Horas</h4>
                <p className="text-sm text-gray-700">{reciprocidad.experiencia_como_horas}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        {reciprocidad.url && (
          <div className="p-6 bg-gradient-to-r from-teal-500 to-cyan-500">
            <a
              href={reciprocidad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all group"
            >
              <span>Aplicar por Reciprocidad</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
