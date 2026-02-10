'use client';

interface ServicesWithoutLicenseProps {
  servicios: {
    ai_generated?: boolean;
    titulo: string;
    items: string[];
    requiere_licencia?: string[];
    source?: string;
  };
}

export function ServicesWithoutLicense({ servicios }: ServicesWithoutLicenseProps) {
  return (
    <section className="py-8" id="sin-licencia">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {servicios.titulo}
        </h2>
        <p className="text-gray-600">
          Conoce qué servicios puedes ofrecer sin necesidad de licencia
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Without License */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-green-900">Sin Licencia</h3>
              <p className="text-sm text-green-700">Puedes hacer estos servicios</p>
            </div>
          </div>

          <ul className="space-y-2">
            {servicios.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 bg-white rounded-lg p-3 shadow-sm">
                <span className="text-green-600 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-800 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* With License */}
        {servicios.requiere_licencia && servicios.requiere_licencia.length > 0 && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-red-900">Requiere Licencia</h3>
                <p className="text-sm text-red-700">NO puedes hacer esto sin licencia</p>
              </div>
            </div>

            <ul className="space-y-2">
              {servicios.requiere_licencia.map((item, index) => (
                <li key={index} className="flex items-start gap-2 bg-white rounded-lg p-3 shadow-sm border border-red-100">
                  <span className="text-red-600 mt-1 flex-shrink-0">✗</span>
                  <span className="text-gray-800 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Warning */}
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">⚡</span>
          <p className="text-sm text-yellow-900">
            <strong>Importante:</strong> Ofrecer servicios que requieren licencia sin tenerla puede resultar en multas severas y problemas legales. Verifica siempre los requisitos de tu estado.
          </p>
        </div>
      </div>

      {servicios.source && (
        <p className="text-xs text-gray-500 mt-4">
          Fuente: {servicios.source}
        </p>
      )}
    </section>
  );
}
