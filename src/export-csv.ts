import {formatTime} from './format';
import type {Booking} from './types';

// Daily export that the shop imports into its POS every evening.
export function exportCsv(bookings: Booking[]): string {
  const rows = bookings.map((b) => [b.id, formatTime(b.startsAt), b.customer, b.service].join(','));
  return ['id,time,customer,service', ...rows].join('\n');
}
