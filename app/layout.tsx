import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | AGC Home Renovation Burlington NC',
    default: 'AGC Home Renovation | Kitchen & Bathroom Remodeling Burlington NC'
  },
  description: 'Expert home renovation & handyman services in Burlington NC. Kitchen remodeling, bathroom renovation, flooring, fencing & shed construction. Free estimates. Call (336) 329-2502',
  keywords: ['home renovation Burlington NC', 'kitchen remodeling', 'bathroom renovation', 'handyman services', 'flooring installation', 'fence installation', 'shed construction', 'Greensboro', 'Durham', 'Chapel Hill'],
  authors: [{ name: 'AGC Home Renovation' }],
  creator: 'AGC Home Renovation',
  publisher: 'AGC Home Renovation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agchomerenovation.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AGC Home Renovation | Professional Renovation Services Burlington NC',
    description: 'Transform your home with AGC Home Renovation. Expert kitchen & bathroom remodeling, flooring, handyman services in Burlington NC. Free estimates available.',
    url: 'https://agchomerenovation.com',
    siteName: 'AGC Home Renovation',
    images: [
      {
        url: '/logo-small.png',
        width: 1200,
        height: 630,
        alt: 'AGC Home Renovation Logo - Burlington NC Home Renovation Services',
      },
      {
        url: '/kitchen-showcase.jpg',
        width: 1200,
        height: 630,
        alt: 'AGC Home Renovation - Kitchen Remodeling Burlington NC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGC Home Renovation | Professional Renovation Services Burlington NC',
    description: 'Transform your home with AGC Home Renovation. Expert kitchen & bathroom remodeling, flooring, handyman services in Burlington NC.',
    images: ['/kitchen-showcase.jpg'],
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
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo-small.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
      { url: '/logo-small.png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  )
}
