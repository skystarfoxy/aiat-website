import type { Metadata, Viewport } from 'next';
import { Syne, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';

/* ============================================
   FONT CONFIGURATION
   ============================================ */
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

/* ============================================
   METADATA
   ============================================ */
export const metadata: Metadata = {
  metadataBase: new URL('https://aiat.ro'),
  title: {
    default: 'AI Transilvania — Asociația de Inteligență Artificială Transilvania',
    template: '%s | AI Transilvania',
  },
  description:
    'Asociația de Inteligență Artificială Transilvania — organizație nonprofit dedicată cercetării, educației și inovației în domeniul inteligenței artificiale din România și Europa. CUI 52944303, Dumbrăveni, Jud. Sibiu.',
  keywords: [
    'inteligenta artificiala',
    'AI Romania',
    'machine learning',
    'cercetare AI',
    'educatie AI',
    'Transilvania',
    'Sibiu',
    'Dumbraveni',
    'asociatie nonprofit',
  ],
  authors: [{ name: 'AI Transilvania' }],
  creator: 'Asociația de Inteligență Artificială Transilvania',
  publisher: 'Asociația de Inteligență Artificială Transilvania',
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: 'AI Transilvania',
    title: 'AI Transilvania — Asociația de Inteligență Artificială Transilvania',
    description:
      'Cercetare, educație și inovație în inteligența artificială — fondată în Dumbrăveni, Jud. Sibiu.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Transilvania — Asociația de Inteligență Artificială Transilvania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Transilvania — Asociația de Inteligență Artificială Transilvania',
    description:
      'Cercetare, educație și inovație în AI din România și Europa.',
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
  alternates: {
    canonical: 'https://aiat.ro',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#F8FAFC',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/* ============================================
   JSON-LD ORGANIZATION SCHEMA
   ============================================ */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Asociația de Inteligență Artificială Transilvania',
  url: 'https://aiat.ro',
  logo: 'https://aiat.ro/logo.svg',
  description:
    'Asociație nonprofit dedicată promovării, cercetării și educației în domeniul inteligenței artificiale din România.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Erou Bumbea Nr. 10',
    addressLocality: 'Dumbrăveni',
    addressRegion: 'Sibiu',
    postalCode: '555100',
    addressCountry: 'RO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'asociatia@ia-transilvania.eu',
    availableLanguage: ['Romanian', 'English'],
  },
  foundingDate: '2025-11-18',
  areaServed: ['Romania', 'Europa'],
  knowsAbout: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'NLP'],
};

/* ============================================
   ROOT LAYOUT
   ============================================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      className={`${syne.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-text-primary font-grotesk antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Skip navigation for accessibility */}
        <a href="#main-content" className="skip-nav">
          Sari la conținut principal
        </a>

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main id="main-content">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
