'use client';

interface SalaryData {
  nacional_2024?: {
    mediana: string;
    por_hora_mediana: string;
    percentil_10?: string;
    percentil_90?: string;
    crecimiento_proyectado?: string;
    source?: string;
  };
  texas?: {
    promedio_anual: string;
    promedio_hora: string;
    top_earners?: string;
    source?: string;
  };
  por_ciudad_texas?: Array<{
    ciudad: string;
    salario_medio: string;
    top_earners?: string;
    source?: string;
  }>;
  nota_importante?: string;
  ingresos_reales?: {
    nota?: string;
    factores_adicionales?: string[];
    estimado_realista?: {
      recien_licenciada?: string;
      '3_5_años_experiencia'?: string;
      especialista_o_independiente?: string;
      dueña_salon?: string;
    };
  };
}

interface SalarySectionProps {
  salarios: SalaryData;
}

export function SalarySection({ salarios }: SalarySectionProps) {
  return (
    <section className="py-8" id="salarios">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          💰 ¿Cuánto Puedes Ganar?
        </h2>
        {salarios.nota_importante && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Importante:</strong> {salarios.nota_importante}
            </p>
          </div>
        )}
      </div>

      {/* National Stats */}
      {salarios.nacional_2024 && (
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-xl mb-4">📊 Salarios a Nivel Nacional (2024)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Mediana Anual</p>
              <p className="text-2xl font-bold text-primary">{salarios.nacional_2024.mediana}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Por Hora</p>
              <p className="text-2xl font-bold text-primary">{salarios.nacional_2024.por_hora_mediana}</p>
            </div>
            {salarios.nacional_2024.percentil_10 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Inicial (10%)</p>
                <p className="text-xl font-bold text-gray-700">{salarios.nacional_2024.percentil_10}</p>
              </div>
            )}
            {salarios.nacional_2024.percentil_90 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Top (90%)</p>
                <p className="text-xl font-bold text-green-600">{salarios.nacional_2024.percentil_90}</p>
              </div>
            )}
          </div>
          {salarios.nacional_2024.crecimiento_proyectado && (
            <p className="text-sm text-gray-600 mt-3">
              📈 Crecimiento proyectado: <strong>{salarios.nacional_2024.crecimiento_proyectado}</strong> (2024-2034)
            </p>
          )}
        </div>
      )}

      {/* Texas Stats */}
      {salarios.texas && (
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h3 className="font-bold text-xl mb-4">🌟 Salarios en Texas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Promedio Anual</p>
              <p className="text-2xl font-bold text-primary">{salarios.texas.promedio_anual}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Promedio por Hora</p>
              <p className="text-2xl font-bold text-primary">{salarios.texas.promedio_hora}</p>
            </div>
            {salarios.texas.top_earners && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Top Earners</p>
                <p className="text-2xl font-bold text-green-600">{salarios.texas.top_earners}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* By City */}
      {salarios.por_ciudad_texas && salarios.por_ciudad_texas.length > 0 && (
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h3 className="font-bold text-xl mb-4">🏙️ Salarios por Ciudad en Texas</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Ciudad</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Salario Medio</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Top Earners</th>
                </tr>
              </thead>
              <tbody>
                {salarios.por_ciudad_texas.map((ciudad, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{ciudad.ciudad}</td>
                    <td className="py-3 px-4 text-primary font-semibold">{ciudad.salario_medio}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">{ciudad.top_earners || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Real Income Expectations */}
      {salarios.ingresos_reales && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
          <h3 className="font-bold text-xl mb-3">💎 Ingresos Reales (Incluyendo Propinas y Extras)</h3>
          {salarios.ingresos_reales.nota && (
            <p className="text-gray-700 mb-4">{salarios.ingresos_reales.nota}</p>
          )}

          {salarios.ingresos_reales.factores_adicionales && (
            <div className="mb-4">
              <p className="font-semibold text-gray-900 mb-2">Factores que aumentan tus ingresos:</p>
              <ul className="space-y-1">
                {salarios.ingresos_reales.factores_adicionales.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {salarios.ingresos_reales.estimado_realista && (
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-3">Expectativas realistas de ingreso:</p>
              <div className="space-y-2 text-sm">
                {salarios.ingresos_reales.estimado_realista.recien_licenciada && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">👶 Recién licenciada:</span>
                    <span className="font-bold text-primary">{salarios.ingresos_reales.estimado_realista.recien_licenciada}</span>
                  </div>
                )}
                {salarios.ingresos_reales.estimado_realista['3_5_años_experiencia'] && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">💪 3-5 años experiencia:</span>
                    <span className="font-bold text-green-600">{salarios.ingresos_reales.estimado_realista['3_5_años_experiencia']}</span>
                  </div>
                )}
                {salarios.ingresos_reales.estimado_realista.especialista_o_independiente && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">⭐ Especialista/Independiente:</span>
                    <span className="font-bold text-green-600">{salarios.ingresos_reales.estimado_realista.especialista_o_independiente}</span>
                  </div>
                )}
                {salarios.ingresos_reales.estimado_realista.dueña_salon && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">👑 Dueña de salón:</span>
                    <span className="font-bold text-green-700">{salarios.ingresos_reales.estimado_realista.dueña_salon}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
