import { stripZeros } from './polyutils';

describe('Polynomial utils', () => {
  it('should strip zero coefficients from end', () => {
    expect(stripZeros([])).toStrictEqual([]);
    expect(stripZeros([0, 0, 0])).toStrictEqual([]);
    expect(stripZeros([0, 1, -2, 0])).toStrictEqual([0, 1, -2]);
  });
});
