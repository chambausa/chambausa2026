'use client';

interface RenewalSectionProps {
  renovacion: {
    ai_generated?: boolean;
    frecuencia: string;
    metodo?: string;
    url_renovacion?: string;
    costo_renovacion: number;
    ce_requerida?: {
      menos_15_años_licencia?: {
        horas_totales: number;
        desglose: string[];
      };
      mas_15_años_licencia?: {
        horas_totales: number;
        desglose: string[];
        cambio?: string;
      };
      costo_cursos_ce_online?: string;
      url_proveedores?: string;
    };
    consecuencias_no_renovar?: {
      [key: string]: string;
    };
    nota_tdlr?: string;
    source?: string;
  };
}

export function RenewalSection({ renovacion }: RenewalSectionProps) {
  return (
    <section className="py-8" id="renovacion">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🔄 Renovación de Licencia
        </h2>
        <p className="text-gray-600">
          Mantén tu licencia activa y cumple con los requisitos de educación continua
        </p>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        {/* Main Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Frecuencia</p>
              <p className="text-2xl font-bold text-primary">{renovacion.frecuencia}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Costo de Renovación</p>
              <p className="text-2xl font-bold text-green-600">${renovacion.costo_renovacion}</p>
            </div>
            {renovacion.metodo && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Método</p>
                <p className="text-lg font-semibold text-gray-900">{renovacion.metodo}</p>
              </div>
            )}
          </div>
          {renovacion.url_renovacion && (
            <a
              href={renovacion.url_renovacion}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Renovar Ahora
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* CE Requirements */}
        {renovacion.ce_requerida && (
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>📚</span>
              <span>Educación Continua (CE) Requerida</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {renovacion.ce_requerida.menos_15_años_licencia && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Con menos de 15 años de licencia
                  </h4>
                  <p className="text-3xl font-bold text-blue-600 mb-3">
                    {renovacion.ce_requerida.menos_15_años_licencia.horas_totales} horas
                  </p>
                  <ul className="space-y-1 text-sm text-blue-800">
                    {renovacion.ce_requerida.menos_15_años_licencia.desglose.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {renovacion.ce_requerida.mas_15_años_licencia && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Con 15+ años de licencia
                  </h4>
                  <p className="text-3xl font-bold text-green-600 mb-3">
                    {renovacion.ce_requerida.mas_15_años_licencia.horas_totales} horas
                  </p>
                  <ul className="space-y-1 text-sm text-green-800">
                    {renovacion.ce_requerida.mas_15_años_licencia.desglose.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {renovacion.ce_requerida.mas_15_años_licencia.cambio && (
                    <p className="text-xs text-green-700 mt-2 italic">
                      {renovacion.ce_requerida.mas_15_años_licencia.cambio}
                    </p>
                  )}
                </div>
              )}
            </div>

            {renovacion.ce_requerida.costo_cursos_ce_online && (
              <p className="text-sm text-gray-600 mt-4">
                💰 Costo estimado de cursos CE online: <strong>{renovacion.ce_requerida.costo_cursos_ce_online}</strong>
              </p>
            )}
            {renovacion.ce_requerida.url_proveedores && (
              <a
                href={renovacion.ce_requerida.url_proveedores}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2"
              >
                Ver proveedores aprobados de CE
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Consequences */}
        {renovacion.consecuencias_no_renovar && (
          <div className="p-6 border-b bg-red-50">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-900">
              <span>⚠️</span>
              <span>¿Qué pasa si no renuevas a tiempo?</span>
            </h3>
            <div className="space-y-2">
              {Object.entries(renovacion.consecuencias_no_renovar).map(([periodo, consecuencia], index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-red-200">
                  <span className="text-red-600 font-bold text-sm mt-0.5">{index + 1}</span>
                  <div>
                    <p className="font-semibold text-sm text-red-900">{formatPeriodo(periodo)}</p>
                    <p className="text-sm text-gray-700">{consecuencia}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note */}
        {renovacion.nota_tdlr && (
          <div className="p-6 bg-yellow-50">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <p className="text-sm text-yellow-900">
                <strong>Nota importante:</strong> {renovacion.nota_tdlr}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function formatPeriodo(periodo: string): string {
  const formatos: Record<string, string> = {
    '0_90_dias': '0-90 días tarde',
    '90_dias_a_18_meses': '90 días a 18 meses',
    '18_meses_a_3_años': '18 meses a 3 años',
    'mas_3_años': 'Más de 3 años',
  };
  return formatos[periodo] || periodo.replace(/_/g, ' ');
}
