'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  pageId: string
  tradeId: string
  stateId: string
  trade: string
  state: string
}

export function LeadCaptureForm({ pageId, tradeId, stateId, trade, state }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      pageId,
      tradeId,
      stateId,
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-semibold text-lg mb-2">¡Gracias!</h3>
        <p className="text-green-700">
          Hemos recibido tu información. Un asesor te contactará pronto.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-primary p-4 text-white">
        <h3 className="font-semibold text-lg">
          ¿Necesitas ayuda para empezar?
        </h3>
        <p className="text-blue-100 text-sm mt-1">
          Te conectamos con escuelas que hablan español
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Tu nombre"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="tu@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Teléfono (opcional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="(555) 123-4567"
          />
        </div>

        <input type="hidden" name="pageId" value={pageId} />
        <input type="hidden" name="tradeId" value={tradeId} />
        <input type="hidden" name="stateId" value={stateId} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Enviando...' : 'Solicitar Información'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Sin compromiso. Tu información está segura.
        </p>
      </form>
    </div>
  )
}
