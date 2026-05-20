import type { Metadata } from 'next';
import { fondyCardShow, fondyCardShowMetaDescription } from '@/lib/fondyCardShowConfig';

export const metadata: Metadata = {
  title: 'Fondy Card Show - Trading Cards & Collectibles Event | VendiCards',
  description: fondyCardShowMetaDescription,
  keywords: [
    'Fondy Card Show',
    'Fond du Lac card show',
    'trading card show Wisconsin',
    'Pokemon card show',
    'sports card show',
    'TCG event Wisconsin',
    'trading cards Fond du Lac',
    `card show ${fondyCardShow.monthYearLabel}`,
    'VendiCards event',
    'trading card market',
    'collectibles shows',
    'card trading event',
  ],
  openGraph: {
    title: 'Fondy Card Show - Trading Cards & Collectibles Event',
    description: fondyCardShowMetaDescription,
    url: '/fondy-card-show',
    siteName: 'VendiCards',
    images: [
      {
        url: fondyCardShow.posterSrc,
        width: 1200,
        height: 1600,
        alt: fondyCardShow.posterAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fondy Card Show - Trading Cards & Collectibles Event',
    description: `${fondyCardShow.dateDisplayLong} | Free admission and parking | 100+ tables of Pokemon, sports cards, TCGs, and collectibles`,
    images: [fondyCardShow.posterSrc],
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
