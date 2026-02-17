import type { Metadata } from 'next'
import { Mail, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos para preguntas sobre licencias y certificaciones de oficios en Estados Unidos.',
}

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contacto</h1>
        <p className="text-lg text-gray-600 mb-8">
          ¿Tienes preguntas sobre licencias de oficios en Estados Unidos? Estamos aquí para ayudarte.
        </p>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg mb-1">Correo Electrónico</h2>
                <p className="text-gray-600 mb-2">
                  Escríbenos y te responderemos lo antes posible.
                </p>
                <a
                  href="mailto:contacto@chambaenusa.com"
                  className="text-primary font-medium hover:underline"
                >
                  contacto@chambaenusa.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 shrink-0">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg mb-1">Sugerencias de Contenido</h2>
                <p className="text-gray-600">
                  ¿Necesitas información sobre un oficio o estado que aún no cubrimos? Cuéntanos y lo agregaremos a nuestra lista de prioridades.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-2">Aviso Importante</h2>
          <p className="text-sm text-gray-600">
            ChambaEnUSA es un sitio informativo. No somos una agencia gubernamental ni proporcionamos servicios legales.
            La información publicada es recopilada de fuentes oficiales (.gov) pero te recomendamos siempre verificar
            directamente con la agencia correspondiente de tu estado.
          </p>
        </div>
      </div>
    </div>
  )
}
