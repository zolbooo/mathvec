import { Polynom } from './poly';

describe('Polynoms', () => {
  it('should create polynoms with correct degree', () => {
    expect(Polynom.of(2, 3).degree).toBe(2);
  });
  it('should reduce degree of polynoms, if possible', () => {
    expect(Polynom.of([2, 4, 0, 0]).degree).toBe(2);
  });

  it('should add two polynoms properly', () => {
    const sum = Polynom.add(Polynom.of(2, 3), Polynom.of(5, -1));
    expect(sum.degree).toBe(2);
    expect(sum.coefficients).toStrictEqual([7, 2]);

    const sum2 = Polynom.of(0, 3, -5).add(Polynom.of(5));
    expect(sum2.degree).toBe(3);
    expect(sum2.coefficients).toStrictEqual([5, 3, -5]);
  });
  it('should subtract two polynoms properly', () => {
    const result = Polynom.sub(Polynom.of(2, 3), Polynom.of(5, -1));
    expect(result.degree).toBe(2);
    expect(result.coefficients).toStrictEqual([-3, 4]);

    const result2 = Polynom.of(0, 3, -5).sub(Polynom.of(5));
    expect(result2.degree).toBe(3);
    expect(result2.coefficients).toStrictEqual([-5, 3, -5]);
  });

  it('should perform scalar operations', () => {
    expect(Polynom.of(2, 3).scalarMult(6).coefficients).toStrictEqual([12, 18]);
    expect(Polynom.of(-4, -12, 12).scalarDiv(-4).coefficients).toStrictEqual([
      1,
      3,
      -3,
    ]);
  });

  it('should raise power of polynomial', () => {
    expect(Polynom.of(1, 100).xPower(3).coefficients).toStrictEqual([
      0,
      0,
      0,
      1,
      100,
    ]);
    expect(Polynom.of(1, 100).xPower(-3).coefficients).toStrictEqual([]);
    expect(Polynom.of(1, 100, 24, 43).xPower(-2).coefficients).toStrictEqual([
      24,
      43,
    ]);
  });

  it('should compare two polynoms', () => {
    expect(Polynom.of(2, 3).equals(Polynom.of(2, 3))).toBe(true);
    expect(Polynom.equals(Polynom.of(5, 1, 321), Polynom.of(1))).toBe(false);
  });

  it('should evaluate polynoms', () => {
    expect(Polynom.of(1, 1, 1, 1).evaluate(2)).toBe(1 + 2 + 4 + 8);
  });
});
