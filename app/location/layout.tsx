import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Location',
  description:
    'Visit VendiCards at 49 N Main St, Fond du Lac, WI 54935. Store hours are Monday–Friday 11am–7pm or by appointment.',
  openGraph: {
    title: 'VendiCards Location - 49 N Main St, Fond du Lac',
    description:
      'Find VendiCards in downtown Fond du Lac at 49 N Main St. Call ahead or stop in during store hours.',
    url: '/location',
  },
  twitter: {
    title: 'VendiCards Location - Fond du Lac, WI',
    description: '49 N Main St, Fond du Lac, WI 54935',
  },
  alternates: {
    canonical: '/location',
  },
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
