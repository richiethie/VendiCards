import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fondy Card Show - Trading Cards & Collectibles Event | VendiCards',
  description: 'Join us at the Fondy Card Show on Sunday, March 15th, 2026! Free admission and parking. 60+ tables of Pokemon, sports cards, TCGs, and collectibles. Buy, sell, and trade at the Radisson Hotel & Conference Center in Fond du Lac, WI. Hosted by VendiCards.',
  keywords: [
    'Fondy Card Show',
    'Fond du Lac card show',
    'trading card show Wisconsin',
    'Pokemon card show',
    'sports card show',
    'TCG event Wisconsin',
    'trading cards Fond du Lac',
    'card show March 2026',
    'VendiCards event',
    'trading card market',
    'collectibles shows',
    'card trading event'
  ],
  openGraph: {
    title: 'Fondy Card Show - Trading Cards & Collectibles Event',
    description: 'Join us on Sunday, March 15th, 2026! Free admission and parking. 60+ tables of Pokemon, sports cards, TCGs, and collectibles at the Radisson Hotel in Fond du Lac, WI.',
    url: '/fondy-card-show',
    siteName: 'VendiCards',
    images: [
      {
        url: '/images/fondy-card-show.png',
        width: 1200,
        height: 1600,
        alt: 'Fondy Card Show Event Poster',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fondy Card Show - Trading Cards & Collectibles Event',
    description: 'Sunday, March 15th, 2026 | Free admission and parking | 60+ tables of Pokemon, sports cards, TCGs, and collectibles',
    images: ['/images/fondy-card-show.png'],
  },
  alternates: {
    canonical: '/fondy-card-show',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FondyCardShowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

