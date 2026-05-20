'use client';

import { redirect } from 'next/navigation';

/** Store has moved — send legacy “new location” URL to the main location page. */
export default function NewLocationPage() {
  redirect('/location');
}
