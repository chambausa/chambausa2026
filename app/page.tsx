import Link from 'next/link'
import { ArrowRight, CheckCircle, MapPin, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Licencias y Certificaciones de Oficios en Estados Unidos
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Guía completa en español para hispanos. Aprende cómo obtener tu licencia de electricista, CDL, cosmetología, HVAC y más.
            </p>
            
            {/* Quick Search */}
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <select className="flex-1 px-4 py-3 border rounded-lg text-gray-800">
                  <option value="">Selecciona un oficio...</option>
                  <option value="electricista">Electricista</option>
                  <option value="cdl">CDL (Conductor Comercial)</option>
                  <option value="cosmetologia">Cosmetología</option>
                  <option value="hvac">HVAC</option>
                  <option value="plomero">Plomería</option>
                </select>
                <select className="flex-1 px-4 py-3 border rounded-lg text-gray-800">
                  <option value="">Selecciona un estado...</option>
                  <option value="TX">Texas</option>
                  <option value="CA">California</option>
                  <option value="FL">Florida</option>
                  <option value="NY">New York</option>
                  <option value="AZ">Arizona</option>
                </select>
                <Link 
                  href="/buscar"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90"
                >
                  <ArrowRight className="h-5 w-5 ml-2" />
                  Buscar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Oficios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Oficios Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electricista', icon: '⚡', slug: 'electricista', count: '50+' },
              { name: 'CDL', icon: '🚛', slug: 'cdl', count: '45+' },
              { name: 'Cosmetología', icon: '💄', slug: 'cosmetologia', count: '40+' },
              { name: 'HVAC', icon: '❄️', slug: 'hvac', count: '35+' },
            ].map((oficio) => (
              <Link
                key={oficio.slug}
                href={`/oficio/${oficio.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-4xl mb-4">{oficio.icon}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">
                  {oficio.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {oficio.count} páginas
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured States */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Estados con Más Información
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Texas', code: 'TX', licenses: '45+' },
              { name: 'California', code: 'CA', licenses: '40+' },
              { name: 'Florida', code: 'FL', licenses: '35+' },
              { name: 'New York', code: 'NY', licenses: '30+' },
              { name: 'Arizona', code: 'AZ', licenses: '25+' },
            ].map((state) => (
              <Link
                key={state.code}
                href={`/estado/${state.code.toLowerCase()}`}
                className="bg-white border rounded-lg p-4 hover:border-primary hover:text-primary transition-colors text-center"
              >
                <div className="font-bold text-xl mb-1">{state.code}</div>
                <div className="text-sm text-gray-600">{state.name}</div>
                <div className="text-xs text-gray-400 mt-1">{state.licenses} licencias</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por Qué ChambaEnUSA?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Información Verificada</h3>
              <p className="text-gray-600">
                Datos verificados directamente de fuentes oficiales (.gov) de cada estado.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Escuelas Bilingües</h3>
              <p className="text-gray-600">
                Encuentra escuelas que ofrecen programas en español cerca de ti.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Guías Paso a Paso</h3>
              <p className="text-gray-600">
                Proceso detallado para cada oficio y estado, sin tecnicismos confusos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas Ayuda Personalizada?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contáctanos y te conectamos con escuelas y programas que hablan español.
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contáctanos
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
