/**
 * Fondy Card Show — update this file when scheduling a new show.
 */

export const fondyCardShow = {
  name: 'Fondy Card Show',

  /** Shown on the event page (Date & Time section) */
  dateDisplay: 'Sunday, August 23rd',
  /** Used in metadata and long-form copy */
  dateDisplayLong: 'Sunday, August 23, 2026',
  monthYearLabel: 'August 2026',

  /** Home page announcement ticker (keep short for mobile) */
  announcementBannerText: 'FONDY CARD SHOW — AUGUST 23',
  announcementBannerHref: '/fondy-card-show',

  /** Event hours (display only) */
  publicHoursDisplay: '9AM – 4PM',
  vendorSetupDisplay: 'Vendor Setup: 8AM',

  /** Schema.org Event start/end (America/Chicago offset on event day) */
  startDateTime: '2026-08-23T09:00:00-05:00',
  endDateTime: '2026-08-23T16:00:00-05:00',

  /** ShowUp vendor table application URL */
  vendorBookingUrl:
    'https://app.joinshowup.io/apply/the-fondy-card-show-hosted-by-vendicards-august-23rd-1780969293348',

  /**
   * Vendor signup unlocks at 8:00 AM Central on this date.
   * July 22, 2026 8:00 AM CDT = 13:00 UTC.
   */
  vendorSignupGoLiveUtc: '2026-07-22T13:00:00.000Z',
  vendorSignupGoLiveDisplay: '8:00 AM CT on July 22, 2026',

  /** Event poster under /public/images */
  posterSrc: '/images/fondy-card-show-august-2026.png',
  posterAlt:
    'Fondy Card Show Event Poster - Sunday August 23rd, 2026 at Radisson Hotel Fond du Lac - Trading Cards & Collectibles',

  location: {
    name: 'Radisson Hotel & Conference Center',
    city: 'Fond du Lac',
    region: 'WI',
    mapsQuery: 'Radisson Hotel Conference Center Fond du Lac WI',
  },
} as const;

export function getVendorSignupGoLiveDate(): Date {
  return new Date(fondyCardShow.vendorSignupGoLiveUtc);
}

export function isVendorSignupLive(now: Date = new Date()): boolean {
  return now.getTime() >= getVendorSignupGoLiveDate().getTime();
}

export function formatCountdown(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export const fondyCardShowMetaDescription =
  `Join us at the Fondy Card Show on ${fondyCardShow.dateDisplayLong}! Free admission and parking. 100+ tables of Pokemon, sports cards, TCGs, and collectibles. Buy, sell, and trade at the Radisson Hotel & Conference Center in Fond du Lac, WI. Hosted by VendiCards.`;
