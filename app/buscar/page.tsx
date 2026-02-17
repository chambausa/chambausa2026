'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'

const OFICIOS = [
  { value: 'electricista', label: 'Electricista' },
  { value: 'cdl', label: 'CDL (Conductor Comercial)' },
  { value: 'cosmetologia', label: 'Cosmetología' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'plomero', label: 'Plomería' },
]

const ESTADOS = [
  { value: 'texas', label: 'Texas' },
  { value: 'california', label: 'California' },
  { value: 'florida', label: 'Florida' },
  { value: 'new-york', label: 'New York' },
  { value: 'arizona', label: 'Arizona' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'pennsylvania', label: 'Pennsylvania' },
  { value: 'colorado', label: 'Colorado' },
  { value: 'nevada', label: 'Nevada' },
  { value: 'illinois', label: 'Illinois' },
  { value: 'washington', label: 'Washington' },
  { value: 'oregon', label: 'Oregon' },
  { value: 'minnesota', label: 'Minnesota' },
  { value: 'new-mexico', label: 'New Mexico' },
]

// Map of available license pages (oficio-estado combinations that exist)
const AVAILABLE_PAGES: Record<string, string[]> = {
  electricista: ['texas', 'california', 'florida', 'new-york', 'arizona', 'georgia', 'pennsylvania', 'washington', 'colorado', 'nevada', 'illinois', 'minnesota', 'oregon', 'new-mexico'],
  cosmetologia: ['texas', 'california', 'florida', 'new-york'],
  cdl: ['california', 'texas', 'florida', 'new-york'],
  hvac: ['texas', 'california', 'new-york', 'florida', 'arizona'],
  plomero: ['texas', 'california', 'florida', 'new-york'],
}

export default function BuscarPage() {
  const router = useRouter()
  const [oficio, setOficio] = useState('')
  const [estado, setEstado] = useState('')

  const isAvailable = oficio && estado && AVAILABLE_PAGES[oficio]?.includes(estado)
  const selectedOficioLabel = OFICIOS.find(o => o.value === oficio)?.label || ''
  const selectedEstadoLabel = ESTADOS.find(s => s.value === estado)?.label || ''

  function handleSearch() {
    if (oficio && estado) {
      router.push(`/licencia-${oficio}-${estado}`)
    } else if (oficio) {
      router.push(`/oficio/${oficio}`)
    } else if (estado) {
      router.push(`/estado/${estado}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Search className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Buscar Licencia</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Selecciona un oficio y estado para encontrar la guía de licencia que necesitas.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Oficio</label>
            <select
              className="w-full px-4 py-3 border rounded-lg text-gray-800"
              value={oficio}
              onChange={(e) => setOficio(e.target.value)}
            >
              <option value="">Selecciona un oficio...</option>
              {OFICIOS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <select
              className="w-full px-4 py-3 border rounded-lg text-gray-800"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Selecciona un estado...</option>
              {ESTADOS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearch}
            disabled={!oficio && !estado}
            className="w-full inline-flex items-center justify-center bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buscar
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>

        {/* Result preview */}
        {oficio && estado && (
          <div className="mt-8">
            {isAvailable ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  Guía disponible
                </h2>
                <p className="text-green-700 mb-4">
                  Tenemos una guía completa de <strong>{selectedOficioLabel}</strong> en <strong>{selectedEstadoLabel}</strong>.
                </p>
                <Link
                  href={`/licencia-${oficio}-${estado}`}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Ver guía completa
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                  Guía no disponible aún
                </h2>
                <p className="text-yellow-700 mb-4">
                  Todavía no tenemos una guía de <strong>{selectedOficioLabel}</strong> en <strong>{selectedEstadoLabel}</strong>.
                  Puedes explorar otras opciones:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/oficio/${oficio}`}
                    className="inline-flex items-center px-4 py-2 bg-white border border-yellow-300 rounded-lg hover:bg-yellow-100 text-sm font-medium"
                  >
                    Ver todos los estados para {selectedOficioLabel}
                  </Link>
                  <Link
                    href={`/estado/${estado}`}
                    className="inline-flex items-center px-4 py-2 bg-white border border-yellow-300 rounded-lg hover:bg-yellow-100 text-sm font-medium"
                  >
                    Ver todos los oficios en {selectedEstadoLabel}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick links */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Guías más consultadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Electricista en Texas', slug: 'licencia-electricista-texas' },
              { title: 'Cosmetología en Texas', slug: 'licencia-cosmetologia-texas' },
              { title: 'CDL en California', slug: 'licencia-cdl-california' },
              { title: 'Electricista en New York', slug: 'licencia-electricista-new-york' },
              { title: 'HVAC en Texas', slug: 'licencia-hvac-texas' },
              { title: 'Plomería en California', slug: 'licencia-plomero-california' },
            ].map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 group"
              >
                <span className="font-medium group-hover:text-primary">{page.title}</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
