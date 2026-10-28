export type Booking = {
  id: string;
  customer: string;
  service: string;
  phone?: string;
  // Start time as an ISO string in UTC.
  startsAt: string;
};
