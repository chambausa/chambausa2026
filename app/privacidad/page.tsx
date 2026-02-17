import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de ChambaEnUSA.',
}

export default function PrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <h1>Política de Privacidad</h1>
        <p className="text-lg text-gray-600">
          Última actualización: Febrero 2026
        </p>

        <h2>1. Información que Recopilamos</h2>
        <p>
          ChambaEnUSA es un sitio informativo que no requiere registro de usuarios.
          La información que podemos recopilar incluye:
        </p>
        <ul>
          <li>Datos de navegación anónimos (páginas visitadas, tiempo en el sitio)</li>
          <li>Información técnica del dispositivo (tipo de navegador, sistema operativo)</li>
          <li>Dirección IP anonimizada</li>
        </ul>

        <h2>2. Uso de Cookies</h2>
        <p>
          Utilizamos cookies esenciales para el funcionamiento del sitio y cookies de análisis
          (Google Analytics) para entender cómo los visitantes usan nuestro sitio. Estas cookies
          no recopilan información personal identificable.
        </p>

        <h2>3. Uso de la Información</h2>
        <p>La información recopilada se utiliza para:</p>
        <ul>
          <li>Mejorar el contenido y la experiencia del usuario</li>
          <li>Analizar tendencias de uso del sitio</li>
          <li>Identificar qué guías son más consultadas para priorizar nuevo contenido</li>
        </ul>

        <h2>4. Compartir Información</h2>
        <p>
          No vendemos, comercializamos ni transferimos información personal a terceros.
          Los datos analíticos agregados pueden ser procesados por Google Analytics según
          sus propias políticas de privacidad.
        </p>

        <h2>5. Enlaces Externos</h2>
        <p>
          Nuestro sitio contiene enlaces a sitios web gubernamentales (.gov) y otros recursos externos.
          No somos responsables de las prácticas de privacidad de estos sitios. Te recomendamos
          revisar la política de privacidad de cada sitio que visites.
        </p>

        <h2>6. Seguridad</h2>
        <p>
          Implementamos medidas de seguridad razonables para proteger la información recopilada.
          Sin embargo, ningún método de transmisión por Internet es 100% seguro.
        </p>

        <h2>7. Cambios a Esta Política</h2>
        <p>
          Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento.
          Los cambios serán publicados en esta página con la fecha de actualización correspondiente.
        </p>

        <h2>8. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en{' '}
          <a href="mailto:contacto@chambaenusa.com" className="text-primary hover:underline">
            contacto@chambaenusa.com
          </a>.
        </p>
      </div>
    </div>
  )
}
