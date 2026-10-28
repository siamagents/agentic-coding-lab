// โจทย์ปิดคอร์ส: รันด้วย `npm run lab:final` ทุกข้อต้องผ่าน
// สเปก: cancelBooking(booking, now) ใน src/cancel.ts คืนการจองที่ status เป็น 'cancelled'
// ถ้าเหลือเวลาอย่างน้อย 2 ชั่วโมง ถ้าไม่ถึงให้ throw. หน้ารายการคิวไม่แสดงคิวที่ยกเลิก
// ไฟล์ส่งออกเพิ่มคอลัมน์ status ไว้ท้ายสุด (การจองที่ไม่มี status ถือเป็น 'booked')
import {describe, expect, it} from 'vitest';
import {cancelBooking} from '../src/cancel';
import {exportCsv} from '../src/export-csv';
import {queueLines} from '../src/queue-list';
import type {Booking} from '../src/types';

const booking: Booking = {id: 'b1', customer: 'Ploy', service: 'สระไดร์', startsAt: '2026-11-02T03:30:00Z'};
const at = (iso: string) => new Date(iso);

describe('ยกเลิกคิว', () => {
  it('เหลือ 2 ชั่วโมงพอดี ยกเลิกได้', () => {
    expect(cancelBooking(booking, at('2026-11-02T01:30:00Z')).status).toBe('cancelled');
  });
  it('เหลือ 1 ชั่วโมง 59 นาที ยกเลิกไม่ได้', () => {
    expect(() => cancelBooking(booking, at('2026-11-02T01:31:00Z'))).toThrow();
  });
  it('ไม่แก้ object เดิม', () => {
    cancelBooking(booking, at('2026-11-01T00:00:00Z'));
    expect(booking.status).toBeUndefined();
  });
});

describe('หน้ารายการคิวและไฟล์ส่งออก', () => {
  const cancelled = cancelBooking(booking, at('2026-11-01T00:00:00Z'));
  const other: Booking = {id: 'b2', customer: 'Mint', service: 'ตัดผม', startsAt: '2026-11-02T08:00:00Z'};
  it('คิวที่ยกเลิกไม่แสดงในหน้ารายการ', () => {
    const lines = queueLines([cancelled, other]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('Mint');
  });
  it('ไฟล์ส่งออกยังมีคิวที่ยกเลิก พร้อมคอลัมน์ status ท้ายสุด', () => {
    expect(exportCsv([cancelled, other]).split('\n')).toEqual([
      'id,time,customer,service,status',
      'b1,10:30,Ploy,สระไดร์,cancelled',
      'b2,15:00,Mint,ตัดผม,booked',
    ]);
  });
});
