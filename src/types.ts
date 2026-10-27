export type Booking = {
  id: string;
  customer: string;
  service: string;
  // Start time as an ISO string in UTC.
  startsAt: string;
};
