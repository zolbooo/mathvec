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
});
