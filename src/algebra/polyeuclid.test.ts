import { Polynom } from './poly';
import { detailedPolyEuclid, reducePolynom } from './polyeuclid';

describe('Euclid utils', () => {
  it('should reduce polynoms', () => {
    const testcases = [
      [[1], [1]],
      [
        [2, 8],
        [1, 4],
      ],
      [
        [1, 8],
        [1, 8],
      ],
      [
        [1, 8, 3],
        [1, 8, 3],
      ],
    ];
    expect.assertions(testcases.length);
    for (let [coefficients, expected] of testcases) {
      expect(
        reducePolynom(Polynom.of(coefficients)).coefficients,
      ).toStrictEqual(expected);
    }
  });
  it('should reduce polynoms with negative coefficients', () => {
    const testcases = [
      [[-1], [-1]],
      [
        [-2, 8],
        [-1, 4],
      ],
      [
        [6, -8],
        [3, -4],
      ],
      [
        [6, -8, -64],
        [3, -4, -32],
      ],
    ];
    for (let [coefficients, expected] of testcases) {
      expect(() => reducePolynom(Polynom.of(coefficients))).not.toThrow();
      expect(
        reducePolynom(Polynom.of(coefficients)).coefficients,
      ).toStrictEqual(expected);
    }
  });
});

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
