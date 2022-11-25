import { Latexable } from '../util';
import { stripZeros } from './polyutils';

export class Polynom implements Latexable {
  private constructor(public coefficients: readonly number[]) {
    this.coefficients = stripZeros(coefficients);
    if (this.coefficients.length === 0) {
      this.coefficients = [0];
    }
  }

  static zero = new Polynom([0]);

  static of(coefficients: readonly number[]): Polynom;
  static of(...coefficients: readonly number[]): Polynom;
  static of(...coefficients: (number | readonly number[])[]) {
    return new Polynom(
      Array.isArray(coefficients[0])
        ? coefficients[0]
        : (coefficients as number[]),
    );
  }

  public get degree(): number {
    return this.coefficients.length - 1;
  }

  static add(a: Polynom, b: Polynom): Polynom {
    return new Polynom(
      Array(Math.max(a.degree, b.degree) + 1)
        .fill(null)
        .map((_, i) => (a.coefficients[i] ?? 0) + (b.coefficients[i] ?? 0)),
    );
  }

  add(p: Polynom): Polynom {
    return Polynom.add(this, p);
  }

  static sub(left: Polynom, right: Polynom): Polynom {
    return new Polynom(
      Array(Math.max(left.degree, right.degree) + 1)
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

  /**
   * @summary Multiply polynomial by power of x
   * @example Polynom(x^3).xPower(2) -> Polynom(x^5)
   * */
  xPower(x_exp: number): Polynom {
    if (x_exp !== Math.floor(x_exp)) {
      throw Error('Polynoms can be raised to the whole power');
    }
    if (x_exp > 0) {
      return new Polynom([...Array(x_exp).fill(0), ...this.coefficients]);
    }
    return new Polynom(this.coefficients.slice(-x_exp));
  }

  static equals(a: Polynom, b: Polynom): boolean {
    return (
      a.degree === b.degree &&
      a.coefficients.every((coef, i) => coef === b.coefficients[i])
    );
  }

  equals(p: Polynom): boolean {
    return Polynom.equals(this, p);
  }

  evaluate(n: number): number {
    let x = 1;
    let result = 0;
    for (let i = 0; i <= this.degree; i += 1) {
      result += x * (this.coefficients[i] ?? 0);
      x *= n;
    }
    return result;
  }
}
