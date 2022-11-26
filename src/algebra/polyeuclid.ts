import { gcd } from '../number-theory';
import { Polynom } from './poly';

interface PolyEuclidStep {
  upperCoef: number;
  lowerCoef: number;
  before: {
    upper: Polynom;
    lower: Polynom;
  };
  after: {
    upper: Polynom;
    lower: Polynom;
  };
}

export function reducePolynom(a: Polynom): Polynom {
  if (a.degree === 0) {
    return a;
  }
  let k = gcd(Math.abs(a.coefficients[0]), Math.abs(a.coefficients[1]));
  for (let i = 2; i <= a.degree; i += 1) {
    k = gcd(k, Math.abs(a.coefficients[i]));
    if (k == 1) {
      break;
    }
  }
  return a.scalarDiv(k);
}
export function detailedPolyEuclid(
  a: Polynom,
  b: Polynom,
): { steps: PolyEuclidStep[]; result: Polynom } {
  const steps: PolyEuclidStep[] = [];

  let upper = a.degree > b.degree ? a : b;
  let lower = a.degree > b.degree ? b : a;
  while (upper.degree > 0) {
    let upperSub =
      upper.coefficients[upper.degree] < 0
        ? upper.scalarMult(-1)
        : Polynom.of(upper.coefficients);
    let lowerSub = lower.xPower(a.degree - b.degree);
    if (lowerSub.coefficients[upper.degree] < 0) {
      lowerSub = lowerSub.scalarMult(-1);
    }

    const g = gcd(
      upper.coefficients[upper.degree],
      lowerSub.coefficients[upper.degree],
    );
    const upperCoef = lowerSub.coefficients[upper.degree] / g;
    const lowerCoef = upperSub.coefficients[upper.degree] / g;
    // Upper: [..., g*u'] * (l / g) -> [..., lcm(u, l)]
    // Lower: [..., g*l'] * (u / g) -> [..., lcm(u, l)]
    lowerSub = lowerSub.scalarMult(lowerCoef);
    upperSub = upperSub.scalarMult(upperCoef).sub(lowerSub);
    // Upper: [..., 0] -> now it becomes lower
    // Lower now becomes upper
    const before = { upper, lower };
    [upper, lower] = [lower, upperSub];
    const after = { upper, lower };
    steps.push({
      upperCoef,
      lowerCoef,
      before,
      after,
    });
  }
  return { steps, result: lower };
}
