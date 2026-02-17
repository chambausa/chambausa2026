import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold text-primary">
              ChambaEnUSA
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Tu guía completa en español para obtener licencias y certificaciones de oficios en Estados Unidos.
            </p>
          </div>

          {/* Oficios */}
          <div>
            <h3 className="font-semibold mb-4">Oficios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/oficio/electricista" className="text-gray-600 hover:text-primary">
                  Electricista
                </Link>
              </li>
              <li>
                <Link href="/oficio/cdl" className="text-gray-600 hover:text-primary">
                  CDL (Conductor Comercial)
                </Link>
              </li>
              <li>
                <Link href="/oficio/cosmetologia" className="text-gray-600 hover:text-primary">
                  Cosmetología
                </Link>
              </li>
              <li>
                <Link href="/oficio/hvac" className="text-gray-600 hover:text-primary">
                  HVAC
                </Link>
              </li>
              <li>
                <Link href="/oficio/plomero" className="text-gray-600 hover:text-primary">
                  Plomería
                </Link>
              </li>
            </ul>
          </div>

          {/* Estados Populares */}
          <div>
            <h3 className="font-semibold mb-4">Estados</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/estado/texas" className="text-gray-600 hover:text-primary">
                  Texas
                </Link>
              </li>
              <li>
                <Link href="/estado/california" className="text-gray-600 hover:text-primary">
                  California
                </Link>
              </li>
              <li>
                <Link href="/estado/florida" className="text-gray-600 hover:text-primary">
                  Florida
                </Link>
              </li>
              <li>
                <Link href="/estado/new-york" className="text-gray-600 hover:text-primary">
                  New York
                </Link>
              </li>
              <li>
                <Link href="/estados" className="text-gray-600 hover:text-primary font-medium">
                  Ver todos &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contacto" className="text-gray-600 hover:text-primary">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-600 hover:text-primary">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} ChambaEnUSA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
