import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ITZFIZZ - Neon Horizon',
  description: 'The future is now. Scroll-driven hero animation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
