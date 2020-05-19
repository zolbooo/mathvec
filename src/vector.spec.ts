import { Vec } from './vector';

describe('Vector', () => {
  it('should create vector properly', () => {
    const i = Vec(1, 0, 0);
    expect(i.length).toBe(1);
    expect(i.magnitude).toBe(3);
    expect(i.coordinates).toStrictEqual([1, 0, 0]);

    const v = Vec(1, 3, 9);
    expect(v.length).toBe(Math.sqrt(91));
  });
  it('should create negative vector properly', () => {
    const v = Vec(3, -4, -11);
    const v1 = v.neg();
    expect(v1.coordinates).toStrictEqual([-3, 4, 11]);
    expect(v1.neg().coordinates).toStrictEqual(v.coordinates);
  });
  it('should add vectors properly', () => {
    const a = Vec(6, 11, 6);
    const b = Vec(0, -4, 6);
    expect(a.add(b).coordinates).toStrictEqual([6, 7, 12]);
  });
  it('should subtract properly', () => {
    const a = Vec(-1, 6, 18);
    const b = Vec(-6, 23, -2);
    expect(a.sub(b).coordinates).toStrictEqual([5, -17, 20]);
  });
  it('should multiply vector by scalar properly', () => {
    const a = Vec(-3, 7, 12);
    expect(a.mul(4).coordinates).toStrictEqual([-12, 28, 48]);
  });
  it('should produce correct dot product', () => {
    const a = Vec(2, 2, 1);
    const b = Vec(1, 0, 9);
    expect(a.dot(b)).toBe(11);
  });
  it('should compare vectors properly', () => {
    const a = Vec(2, 0, 0);
    const b = Vec(5, 1, 7);
    expect(a.equal(b)).toBe(false);
    expect(a.neg().neg().equal(a)).toBe(true);
  });
  it('should find angle between two vectors properly', () => {
    const j = Vec(0, 1, 0);
    const k = Vec(0, 0, 1);
    expect(j.angle(j)).toStrictEqual({ deg: 0, rad: 0 });
    expect(j.angle(k)).toStrictEqual({ deg: 90, rad: Math.PI / 2 });
  });
});
