import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: {
    default: 'ChambaEnUSA - Licencias y Certificaciones de Oficios en Estados Unidos',
    template: '%s | ChambaEnUSA',
  },
  description: 'Guía completa en español para hispanos sobre licencias de electricista, CDL, cosmetología, HVAC y más en EE.UU. Requisitos, escuelas bilingües y cómo obtener tu certificación.',
  keywords: ['licencias de oficios', 'certificaciones estados unidos', 'electricista licencia', 'CDL licencia', 'cosmetología licencia', 'escuelas bilingües'],
  authors: [{ name: 'ChambaEnUSA' }],
  creator: 'ChambaEnUSA',
  openGraph: {
    type: 'website',
    locale: 'es_US',
    url: 'https://chambaenusa.com',
    siteName: 'ChambaEnUSA',
    title: 'ChambaEnUSA - Licencias y Certificaciones de Oficios en Estados Unidos',
    description: 'Guía completa en español para hispanos sobre licencias de oficios en EE.UU.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ChambaEnUSA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChambaEnUSA',
    description: 'Licencias y certificaciones de oficios en EE.UU. en español',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
