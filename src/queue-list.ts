import {formatTime} from './format';
import type {Booking} from './types';

// Lines shown on the shop's queue screen, earliest first.
export function queueLines(bookings: Booking[]): string[] {
  return [...bookings]
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .map((b) => `${formatTime(b.startsAt)}  ${b.customer} · ${b.service}`);
}
