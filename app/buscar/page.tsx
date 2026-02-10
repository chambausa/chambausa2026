import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default function BuscarPage({
  searchParams,
}: {
  searchParams: { oficio?: string; estado?: string }
}) {
  const oficio = searchParams.oficio
  const estado = searchParams.estado

  // If we have both params, redirect to the license page
  // Note: redirect() should be called in a Server Action or during rendering
  // For simplicity, we'll show links if params are present

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Buscar Licencia</h1>
      
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8">
          Selecciona un oficio y estado para encontrar información sobre licencias.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Oficio</label>
            <select 
              name="oficio" 
              className="w-full px-4 py-3 border rounded-lg"
              defaultValue={oficio || ''}
            >
              <option value="">Selecciona un oficio...</option>
              <option value="electricista">Electricista</option>
              <option value="cdl">CDL (Conductor Comercial)</option>
              <option value="cosmetologia">Cosmetología</option>
              <option value="hvac">HVAC</option>
              <option value="plomero">Plomería</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <select 
              name="estado" 
              className="w-full px-4 py-3 border rounded-lg"
              defaultValue={estado || ''}
            >
              <option value="">Selecciona un estado...</option>
              <option value="TX">Texas</option>
              <option value="CA">California</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="AZ">Arizona</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Buscar
          </button>
        </form>

        {oficio && !estado && (
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800">
              Por favor selecciona un estado para ver las licencias disponibles.
            </p>
          </div>
        )}

        {oficio && estado && (
          <div className="mt-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800">
                Resultados de búsqueda
              </h2>
              <p className="text-green-700 mb-4">
                Encontramos información para: <strong>{oficio}</strong> en <strong>{estado}</strong>
              </p>
              <Link 
                href={`/licencia-${oficio}-${estado.toLowerCase()}`}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Ver página de licencia
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
