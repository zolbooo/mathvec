import { Latexable } from '@/util';

export class Polynom implements Latexable {
  private constructor(public coefficients: readonly number[]) {
    this.coefficients = coefficients;
  }

  static of(coefficients: number[]): Polynom;
  static of(...coefficients: number[]): Polynom;
  static of(...coefficients: (number | number[])[]) {
    return new Polynom(
      Array.isArray(coefficients[0])
        ? coefficients[0]
        : (coefficients as number[]),
    );
  }

  public get degree(): number {
    return this.coefficients.length;
  }

  static add(a: Polynom, b: Polynom): Polynom {
    return new Polynom(
      Array(Math.max(a.degree, b.degree))
        .fill(null)
        .map((_, i) => (a.coefficients[i] ?? 0) + (b.coefficients[i] ?? 0)),
    );
  }
  add(p: Polynom): Polynom {
    return Polynom.add(this, p);
  }
}
