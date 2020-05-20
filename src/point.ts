import { Vector, Vec } from './vector';
import { checkCoordinates, Latexable } from './util';

/** Interface representing point on the n-dimensional plane */
export interface TPoint extends Latexable {
  /** Magnitude of point */
  magnitude: number;
  /** Coordinates of point */
  coordinates: readonly number[];

  /** Calculate vector between two points */
  to(p2: TPoint): Vector;
  /** Get middle of two points */
  mid(p2: TPoint): TPoint;
  /** Apply vector transformation on point */
  apply(vec: Vector): TPoint;
  /** Check if two points are equal. */
  equal(p2: TPoint): boolean;
}

/** Create point using coordinates */
export function Point(...coordinates: number[]): TPoint {
  if (process.env.NODE_ENV !== 'production') {
    if (
      !coordinates ||
      !Array.isArray(coordinates) ||
      !coordinates.every((x) => typeof x === 'number')
    )
      throw TypeError(
        `Invalid Point is being created: ${JSON.stringify(coordinates)}`,
      );
  }

  return {
    magnitude: coordinates.length,
    coordinates,
    to(p2) {
      checkCoordinates(this, p2);
      return Vec(...p2.coordinates.map((n, i) => n - coordinates[i]));
    },
    mid(p2) {
      checkCoordinates(this, p2);
      return this.apply(this.to(p2).mul(1 / 2));
    },
    apply(vec) {
      checkCoordinates(this, vec);
      return Point(...coordinates.map((n, i) => n + vec.coordinates[i]));
    },
    equal(p2) {
      checkCoordinates(this, p2);
      return coordinates.every((n, i) => n === p2.coordinates[i]);
    },
    toString(name) {
      return `${name}(${coordinates.map((x) => x.toString()).join(', ')})`;
    },
  };
}
