// แล็บ 1: รันด้วย `npm run lab:1` ทุกข้อต้องผ่าน
import {existsSync, readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';
import {queueLines} from '../src/queue-list';
import type {Booking} from '../src/types';

const bookings: Booking[] = [
  {id: 'b1', customer: 'Ploy', service: 'สระไดร์', startsAt: '2026-11-02T03:30:00Z'},
  {id: 'b2', customer: 'Mint', service: 'ตัดผม', startsAt: '2026-11-02T08:00:00Z'},
];

describe('ภารกิจ 2: CLAUDE.md และกฎของทีม', () => {
  it('มี CLAUDE.md ที่ root ของโปรเจกต์', () => {
    expect(existsSync('CLAUDE.md')).toBe(true);
  });
  it('CLAUDE.md มีหัวข้อกฎของทีม', () => {
    expect(readFileSync('CLAUDE.md', 'utf8')).toMatch(/กฎของทีม/);
  });
});

describe('ภารกิจ 3: ตัวกรองตามบริการ', () => {
  it('ส่งชื่อบริการมา ได้เฉพาะคิวของบริการนั้น', () => {
    const lines = queueLines(bookings, 'ตัดผม');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('Mint');
  });
  it('ไม่ส่งชื่อบริการ ได้ทุกคิวเหมือนเดิม', () => {
    expect(queueLines(bookings)).toHaveLength(2);
  });
});
