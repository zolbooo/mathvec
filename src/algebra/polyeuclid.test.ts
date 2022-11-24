import { Polynom } from './poly';
import { detailedPolyEuclid } from './polyeuclid';

describe('Euclid on polynomials', () => {
  it('should stop if one of polynoms is zero', () => {
    expect(detailedPolyEuclid(Polynom.zero, Polynom.zero)).toMatchObject({
      result: Polynom.zero,
      steps: [],
    });
  });
  it('should perform a single step', () => {
    const { result, steps } = detailedPolyEuclid(
      Polynom.of(2, 3),
      Polynom.of(3),
    );
    expect(result.coefficients).toStrictEqual([2]);
    expect(steps).toMatchObject([
      {
        upperCoef: 1,
        lowerCoef: 1,
        before: {
          upper: { coefficients: [2, 3] },
          lower: { coefficients: [3] },
        },
        after: {
          upper: { coefficients: [3] },
          lower: { coefficients: [2] },
        },
      },
    ]);
  });
});
