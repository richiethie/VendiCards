import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "VendiCards - Premium Pokémon Cards & Repair Services",
    template: "%s | VendiCards"
  },
  description: 'From sealed product and raw cards to graded gems, custom merch, and slick accessories — VendiCards has everything you need to Catch \'em All! We specialize in card repair and restoration.',
  keywords: ['pokemon cards', 'pokemon', 'trading cards', 'card repair', 'card restoration', 'grading preparation', 'authentic cards', 'collectibles', 'tcg', 'vendicards'],
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
      { url: '/images/vendicards_logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/vendicards_logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/vendicards_logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/vendicards_logo.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: "VendiCards - Premium Pokémon Cards & Repair Services",
    description: 'From sealed product and raw cards to graded gems, custom merch, and slick accessories — VendiCards has everything you need to Catch \'em All!',
    siteName: "VendiCards",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "VendiCards - Premium Pokémon Cards & Repair Services",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "VendiCards - Premium Pokémon Cards & Repair Services",
    description: 'From sealed product and raw cards to graded gems, custom merch, and slick accessories — VendiCards has everything you need to Catch \'em All!',
    images: ['/og-image.jpg'],
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
      <body className={`${inter.className} h-full flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
