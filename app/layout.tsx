import type { Metadata } from 'next'
import './globals.css'

export const viewport = { width: 'device-width', initialScale: 1 }

export const metadata: Metadata = {
  title: 'WaffLia Sweet Kumpir',
  description: 'En tatli waffle ve kumpir burada - Bowl Waffle, Kare Waffle, Kumpir, Künefe, Katmer ve Sufle. 17:00 - 05:00 İstanbul, 30-45 dk teslimat.',
  metadataBase: new URL('https://waffliasweetkumpir.com'),
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'WaffLia Sweet Kumpir',
    description: 'En tatli waffle ve kumpir burada - Bowl Waffle, Kare Waffle, Kumpir, Künefe, Katmer ve Sufle.',
    url: 'https://waffliasweetkumpir.com',
    siteName: 'WaffLia Sweet Kumpir',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'WaffLia Sweet Kumpir' }],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WaffLia Sweet Kumpir',
    description: 'En tatli waffle ve kumpir burada',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, width: '100%', maxWidth: 'none' }}>
        {children}
      </body>
    </html>
  )
}
