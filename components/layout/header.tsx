import Link from 'next/link'
import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">ChambaEnUSA</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/oficio/electricista" className="text-sm font-medium hover:text-primary">
              Electricista
            </Link>
            <Link href="/oficio/cdl" className="text-sm font-medium hover:text-primary">
              CDL
            </Link>
            <Link href="/oficio/cosmetologia" className="text-sm font-medium hover:text-primary">
              Cosmetología
            </Link>
            <Link href="/oficio/hvac" className="text-sm font-medium hover:text-primary">
              HVAC
            </Link>
            <Link href="/estados" className="text-sm font-medium hover:text-primary">
              Estados
            </Link>
          </nav>

          {/* Search & CTA */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <Link 
              href="/contacto" 
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
