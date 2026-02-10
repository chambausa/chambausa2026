interface Props {
  trade: string
  state: string
  lastUpdated?: string
}

export function LicenseHeader({ trade, state, lastUpdated }: Props) {
  return (
    <div className="border-b pb-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
        Licencia de {trade} en {state}
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Guía completa en español: requisitos oficiales, proceso y escuelas bilingües
      </p>
      {lastUpdated && (
        <p className="text-sm text-gray-500">
          Última actualización: {lastUpdated}
        </p>
      )}
    </div>
  )
}
