'use client';

interface Mistake {
  error: string;
  por_que_importa: string;
  solucion: string;
}

interface CommonMistakesProps {
  mistakes: {
    ai_generated?: boolean;
    items: Mistake[];
  };
}

export function CommonMistakes({ mistakes }: CommonMistakesProps) {
  return (
    <section className="py-8" id="errores-comunes">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ⚠️ Errores Comunes que Debes Evitar
        </h2>
        <p className="text-gray-600">
          Aprende de los errores de otros para ahorrar tiempo, dinero y frustración.
        </p>
      </div>

      <div className="space-y-4">
        {mistakes.items.map((mistake, index) => (
          <div
            key={index}
            className="bg-white border border-red-100 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {mistake.error}
                </h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3">
                  <p className="text-sm font-medium text-yellow-900 mb-1">
                    ⚡ Por qué importa:
                  </p>
                  <p className="text-sm text-yellow-800">
                    {mistake.por_que_importa}
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <p className="text-sm font-medium text-green-900 mb-1">
                    ✅ Solución:
                  </p>
                  <p className="text-sm text-green-800">
                    {mistake.solucion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
