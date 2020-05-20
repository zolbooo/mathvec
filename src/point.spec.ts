import { Vec } from './vector';
import { Point } from './point';

describe('Point', () => {
  it('should calculate vector properly', () => {
    const a = Point(1, 1, 1);
    const b = Point(2, 2, 2);
    expect(a.to(b).coordinates).toStrictEqual([1, 1, 1]);
  });
  it('should find correct middle point', () => {
    const a = Point(1, 1, 1);
    const b = Point(3, 3, 3);
    expect(a.mid(b).coordinates).toStrictEqual([2, 2, 2]);
  });
  it('should apply vector correctly', () => {
    const a = Point(0, 0, 0, 0);
    const v = Vec(1, 1, -3, 5);
    expect(a.apply(v).coordinates).toStrictEqual([1, 1, -3, 5]);
  });
  it('should check points for equality properly', () => {
    const a = Point(1, 2);
    const b = Point(2, 3);
    expect(a.equal(b)).toBe(false);
    expect(a.equal(a)).toBe(true);
  });
});
