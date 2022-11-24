export function gcd(a: number, b: number) {
  if (a < 0 || b < 0 || Math.floor(a) !== a || Math.floor(b) !== b) {
    throw Error('a and b must be whole numbers');
  }
  while (a > 0 && b > 0) {
    if (a > b) {
      a %= b;
    } else {
      b %= a;
    }
  }
  return a + b;
}
