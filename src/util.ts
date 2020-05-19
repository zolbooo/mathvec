/** Interface representing object that can be converted to LaTeX expression */
export interface Latexable {
  /** Convert object to LaTeX expression */
  toString(name: string): string;
}

/** Interface representing object that has coordinates */
interface WithCoordinates {
  magnitude: number;
  coordinates: readonly number[];
}

/** Create structure containing angle either in degrees and radians */
export function Angle(rad: number) {
  return { rad, deg: (rad / Math.PI) * 180 };
}

/** Check if two elements have same magnitude. Runs only in development mode */
export function checkCoordinates(a: WithCoordinates, b: WithCoordinates) {
  if (process.env.NODE_ENV === 'production') return;

  if (a.magnitude !== b.magnitude) {
    throw Error(
      `Cannot perform action on elements with coordinates ${JSON.stringify(
        a.coordinates,
      )} and ${JSON.stringify(b.coordinates)}`,
    );
  }
}
