import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartContext';
import { SiteFlagsProvider } from '@/components/SiteFlagsContext';
import { isShopifyEnabled } from '@/lib/env';

/** Read Shopify flags on each request (not from a statically cached layout shell). */
export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "VendiCards - Premium Pokémon & One Piece Cards & Collectibles",
    template: "%s | VendiCards"
  },
  description:
    'VendiCards in Fond du Lac, WI — Pokémon and One Piece cards, sealed product, graded slabs, and collectibles. Visit us at 49 N Main St or shop online.',
  keywords: [
    'pokemon cards',
    'pokemon',
    'one piece cards',
    'one piece tcg',
    'trading cards',
    'grading preparation',
    'authentic cards',
    'collectibles',
    'tcg',
    'vendicards',
    'Fond du Lac',
    'Fond du Lac card shop',
    '49 N Main St',
  ],
  authors: [{ name: "VendiCards" }],
  creator: "VendiCards",
  publisher: "VendiCards",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/images/vendicards_logo3.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/vendicards_logo3.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/vendicards_logo3.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/images/vendicards_logo3.jpg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: "VendiCards - Premium Pokémon & One Piece Cards & Collectibles",
    description:
      'VendiCards in Fond du Lac, WI at 49 N Main St — sealed product, raw cards, graded gems, custom merch, and accessories.',
    siteName: "VendiCards",
    images: [
      {
        url: '/images/vendicards_logo3.jpg',
        width: 1200,
        height: 630,
        alt: "VendiCards - Premium Pokémon & One Piece Cards & Collectibles",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "VendiCards - Premium Pokémon & One Piece Cards & Collectibles",
    description:
      'Visit VendiCards at 49 N Main St, Fond du Lac, WI — Pokémon & One Piece cards and collectibles.',
    images: ['/images/vendicards_logo3.jpg'],
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SiteFlagsProvider shopifyEnabled={isShopifyEnabled()}>
          <CartProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </SiteFlagsProvider>
      </body>
    </html>
  );
}
