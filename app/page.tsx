import Link from 'next/link'
import { ArrowRight, CheckCircle, MapPin, BookOpen } from 'lucide-react'
import { QuickSearch } from '@/components/home/quick-search'

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
            <QuickSearch />
          </div>
        </div>
      </section>

      {/* Popular Oficios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Oficios Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Electricista', icon: '⚡', slug: 'electricista', count: '14 estados' },
              { name: 'CDL', icon: '🚛', slug: 'cdl', count: '4 estados' },
              { name: 'Cosmetología', icon: '💄', slug: 'cosmetologia', count: '4 estados' },
              { name: 'HVAC', icon: '❄️', slug: 'hvac', count: '5 estados' },
              { name: 'Plomería', icon: '🔧', slug: 'plomero', count: '4 estados' },
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
                  {oficio.count}
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
              { name: 'Texas', slug: 'texas', code: 'TX', licenses: 5 },
              { name: 'California', slug: 'california', code: 'CA', licenses: 5 },
              { name: 'Florida', slug: 'florida', code: 'FL', licenses: 5 },
              { name: 'New York', slug: 'new-york', code: 'NY', licenses: 5 },
              { name: 'Arizona', slug: 'arizona', code: 'AZ', licenses: 3 },
              { name: 'Georgia', slug: 'georgia', code: 'GA', licenses: 1 },
              { name: 'Colorado', slug: 'colorado', code: 'CO', licenses: 1 },
              { name: 'Nevada', slug: 'nevada', code: 'NV', licenses: 1 },
              { name: 'Illinois', slug: 'illinois', code: 'IL', licenses: 1 },
              { name: 'Washington', slug: 'washington', code: 'WA', licenses: 1 },
            ].map((state) => (
              <Link
                key={state.code}
                href={`/estado/${state.slug}`}
                className="bg-white border rounded-lg p-4 hover:border-primary hover:text-primary transition-colors text-center"
              >
                <div className="font-bold text-xl mb-1">{state.code}</div>
                <div className="text-sm text-gray-600">{state.name}</div>
                <div className="text-xs text-gray-400 mt-1">{state.licenses} {state.licenses === 1 ? 'licencia' : 'licencias'}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/estados" className="text-primary font-medium hover:underline">
              Ver todos los estados &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Most Popular Pages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Guías Más Consultadas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Licencia de Electricista en Texas', slug: 'licencia-electricista-texas', tag: 'Electricista', tagColor: 'bg-yellow-100 text-yellow-800' },
              { title: 'Licencia de Cosmetología en Texas', slug: 'licencia-cosmetologia-texas', tag: 'Cosmetología', tagColor: 'bg-pink-100 text-pink-800' },
              { title: 'Licencia CDL en California', slug: 'licencia-cdl-california', tag: 'CDL', tagColor: 'bg-blue-100 text-blue-800' },
              { title: 'Licencia de Electricista en Arizona', slug: 'licencia-electricista-arizona', tag: 'Electricista', tagColor: 'bg-yellow-100 text-yellow-800' },
              { title: 'Licencia de Electricista en New York', slug: 'licencia-electricista-new-york', tag: 'Electricista', tagColor: 'bg-yellow-100 text-yellow-800' },
              { title: 'Licencia HVAC en New York', slug: 'licencia-hvac-new-york', tag: 'HVAC', tagColor: 'bg-cyan-100 text-cyan-800' },
            ].map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow group"
              >
                <span className={`inline-block text-xs font-medium px-2 py-1 rounded mb-3 ${page.tagColor}`}>
                  {page.tag}
                </span>
                <h3 className="font-semibold group-hover:text-primary">
                  {page.title}
                </h3>
                <span className="text-sm text-primary mt-2 inline-flex items-center">
                  Ver guía completa <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
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
              <h3 className="font-semibold text-lg mb-2">Todo en Español</h3>
              <p className="text-gray-600">
                Guías completas en español para la comunidad hispana en Estados Unidos.
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
            31 Guías de Licencias Disponibles
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Electricista, CDL, Cosmetología, HVAC y Plomería en los estados con más demanda.
          </p>
          <Link
            href="/estados"
            className="inline-flex items-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explorar por Estado
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
