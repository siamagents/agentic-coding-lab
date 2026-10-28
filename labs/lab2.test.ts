// แล็บ 2: รันด้วย `npm run lab:2` ทุกข้อต้องผ่าน
import {existsSync, readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';
import {exportCsv} from '../src/export-csv';
import {queueLines} from '../src/queue-list';
import type {Booking} from '../src/types';

const ploy: Booking = {id: 'b1', customer: 'Ploy', service: 'สระไดร์', startsAt: '2026-11-02T03:30:00Z'};

describe('ภารกิจ 2: หน้าจอมี น. แต่ไฟล์ส่งออกเหมือนเดิม', () => {
  it('หน้ารายการคิวแสดงเวลาแบบ 10:30 น.', () => {
    expect(queueLines([ploy])[0]).toMatch(/^10:30 น\./);
  });
  it('ไฟล์ส่งออกยังเป็นรูปแบบเดิม ไม่มี น.', () => {
    const [header, row] = exportCsv([ploy]).split('\n');
    expect(header).toMatch(/^id,time,customer,service(,|$)/);
    expect(row).toMatch(/^b1,10:30,Ploy,สระไดร์(,|$)/);
  });
});

describe('ภารกิจ 3: บักชื่อที่มีลูกน้ำ', () => {
  it('ชื่อที่มีลูกน้ำถูกครอบด้วยเครื่องหมายคำพูด คอลัมน์ไม่เลื่อน', () => {
    const csv = exportCsv([{...ploy, customer: 'Ploy, Jr.'}]);
    expect(csv.split('\n')[1]).toMatch(/^b1,10:30,"Ploy, Jr\.",สระไดร์(,|$)/);
  });
});

describe('ภารกิจ 3 (เสริม): บักเวลาเขียนหลายแบบ', () => {
  it('คิว 9 โมงเวลาไทยขึ้นก่อนคิว 10 โมงครึ่ง แม้เขียนเวลาคนละแบบ', () => {
    const nine: Booking = {id: 'b0', customer: 'Fah', service: 'ตัดผม', startsAt: '2026-11-02T09:00:00+07:00'};
    const lines = queueLines([ploy, nine]);
    expect(lines[0]).toContain('Fah');
  });
});

describe('ภารกิจ 4: กันไฟล์ความลับ', () => {
  it('.claude/settings.json ห้ามอ่าน .env', () => {
    expect(existsSync('.claude/settings.json')).toBe(true);
    const settings = JSON.parse(readFileSync('.claude/settings.json', 'utf8'));
    expect(settings.permissions?.deny ?? []).toContain('Read(./.env)');
  });
});
