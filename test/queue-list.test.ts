import {describe, expect, it} from 'vitest';
import {queueLines} from '../src/queue-list';

describe('queueLines', () => {
  it('sorts by start time and shows Bangkok time', () => {
    const lines = queueLines([
      {id: 'b2', customer: 'Mint', service: 'ตัดผม', startsAt: '2026-11-02T08:00:00Z'},
      {id: 'b1', customer: 'Ploy', service: 'สระไดร์', startsAt: '2026-11-02T03:30:00Z'},
    ]);
    expect(lines).toEqual(['10:30  Ploy · สระไดร์', '15:00  Mint · ตัดผม']);
  });
});
