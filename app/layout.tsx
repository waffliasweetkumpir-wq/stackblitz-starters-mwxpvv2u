import type { Metadata } from 'next'
import './globals.css'

export const viewport = { width: 'device-width', initialScale: 1 }

export const metadata: Metadata = {
  title: 'WaffLia Sweet Kumpir',
  description: 'En tatli waffle ve kumpir burada',
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
