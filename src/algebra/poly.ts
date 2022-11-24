import { Latexable } from '../util';
import { stripZeros } from './polyutils';

export class Polynom implements Latexable {
  private constructor(public coefficients: readonly number[]) {
    this.coefficients = stripZeros(coefficients);
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

  static sub(left: Polynom, right: Polynom): Polynom {
    return new Polynom(
      Array(Math.max(left.degree, right.degree))
        .fill(null)
        .map(
          (_, i) => (left.coefficients[i] ?? 0) - (right.coefficients[i] ?? 0),
        ),
    );
  }
  sub(right: Polynom): Polynom {
    return Polynom.sub(this, right);
  }

  scalarMult(scalar: number): Polynom {
    return new Polynom(this.coefficients.map((value) => value * scalar));
  }
  scalarDiv(scalar: number): Polynom {
    return new Polynom(this.coefficients.map((value) => value / scalar));
  }
}
