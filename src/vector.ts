import { checkCoordinates, Latexable, Angle } from './util';

/** Structure representing N-dimensional vector */
export interface Vector extends Latexable {
  /** Length of vector. */
  length: number;
  /** Magnitude of vector. */
  magnitude: number;
  /** Coordinates of vector. */
  coordinates: readonly number[];

  /** Add two vectors. Returns new vector. */
  add(b: Vector): Vector;
  /** Subtract two vectors. Returns new vector. */
  sub(b: Vector): Vector;
  /** Multiply vector by scalar. Returns new vector. */
  mul(b: number): Vector;
  /** Find dot product of two vectors. */
  dot(b: Vector): number;
  /** Find angle between two vectors. */
  angle(b: Vector): ReturnType<typeof Angle>;

  /** Create new vector with opposite direction with same length. */
  neg(): Vector;
  /** Check if two vectors are equal. */
  equal(v2: Vector): boolean;
}

export function Vec(...coordinates: number[]): Vector {
  if (process.env.NODE_ENV !== 'production') {
    if (
      !coordinates ||
      !Array.isArray(coordinates) ||
      !coordinates.every((x) => typeof x === 'number')
    )
      throw Error(
        `Invalid Vec is being created: ${JSON.stringify(coordinates)}`,
      );
  }

  return {
    length: Math.sqrt(coordinates.reduce((acc, curr) => acc + curr ** 2, 0)),
    magnitude: coordinates.length,
    coordinates,
    add(b) {
      checkCoordinates(this, b);
      return Vec(...coordinates.map((n, i) => n + b.coordinates[i]));
    },
    sub(b) {
      checkCoordinates(this, b);
      return Vec(...coordinates.map((n, i) => n - b.coordinates[i]));
    },
    mul(b) {
      return Vec(...coordinates.map((x) => x * b));
    },
    neg() {
      return Vec(...coordinates.map((x) => -x));
    },
    dot(b) {
      checkCoordinates(this, b);
      return coordinates.reduce(
        (acc, curr, i) => acc + curr * b.coordinates[i],
        0,
      );
    },
    angle(b) {
      checkCoordinates(this, b);
      return Angle(Math.acos(this.dot(b) / (this.length * b.length)));
    },
    equal(v2) {
      checkCoordinates(this, v2);
      return coordinates.every((n, i) => n === v2.coordinates[i]);
    },
    toString(name) {
      return `\\vec{${name}} = (${coordinates
        .map((x) => x.toString())
        .join(', ')})`;
    },
  };
}
