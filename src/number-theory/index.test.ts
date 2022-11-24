import { gcd } from './index';

describe('Number theory functions', () => {
  it('should compute gcd correctly', () => {
    expect(gcd(2, 3)).toBe(1);
    expect(gcd(2, 6)).toBe(2);
  });
});
