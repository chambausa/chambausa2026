'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

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

export function QuickSearch() {
  const router = useRouter()
  const [oficio, setOficio] = useState('')
  const [estado, setEstado] = useState('')

  function handleSearch() {
    if (oficio && estado) {
      router.push(`/licencia-${oficio}-${estado}`)
    } else if (oficio) {
      router.push(`/oficio/${oficio}`)
    } else if (estado) {
      router.push(`/estado/${estado}`)
    } else {
      router.push('/buscar')
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg max-w-xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          className="flex-1 px-4 py-3 border rounded-lg text-gray-800"
          value={oficio}
          onChange={(e) => setOficio(e.target.value)}
        >
          <option value="">Selecciona un oficio...</option>
          {OFICIOS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          className="flex-1 px-4 py-3 border rounded-lg text-gray-800"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Selecciona un estado...</option>
          {ESTADOS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90"
        >
          Buscar
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  )
}
